import { atom } from 'jotai';
import { loadable } from "jotai/utils"
import type { RandomWord, Clauses as TClauses, Word as TWord } from '../types';
import { books, host } from '../consts';
import { range } from '../util';

export const isSSR = typeof window === "undefined";

const nullStorage: Storage = {
	length: 0,
	clear: () => void 0,
	/* eslint-disable @typescript-eslint/no-unused-vars */
	getItem: (_key: string) => null,
	key: (_index: number) => null,
	removeItem: (_key: string) => void 0,
	setItem: (_key: string, _value: string) => void 0,
	/* eslint-enable @typescript-eslint/no-unused-vars */
}
const store = isSSR ? nullStorage : localStorage || sessionStorage;

function getValueFromStore<T>(key: string, initialValue: T | null = null) {
	// check if something in storage
	const json = store.getItem(key);
	let value: T | null = initialValue === undefined ? null : initialValue;
	if (typeof json == 'string') {
		try {
			value = JSON.parse(json) as T;
		}
		catch (e) {
			store.removeItem(key);
		}
	}
	return value;
}

function atomWithStore<T>(key: string, initialValue: T | null = null) {
	const value = getValueFromStore(key, initialValue);
	const valueAtom = atom(value);
	return atom(
		get => get(valueAtom),
		(_, set, newValue: T | null) => {
			set(valueAtom, newValue);
			store.setItem(key, JSON.stringify(newValue));
		}
	);
}

function valueToPromise<T>(value: T) {
	return (async () => value)();
}

const b = Promise.resolve(null);

function asyncAtomWithStore<T>(key: string, initialValue: T | null = null) {
	const value = getValueFromStore(key, initialValue);
	const valueAtom = atom(value as Promise<typeof value>);
	return atom(
		async get => await get(valueAtom),
		async (_, set, newValue: Promise<T | null>) => {
			set(valueAtom, newValue);
			// await then set
			// TODO: make cancelable?
			store.setItem(key, JSON.stringify(await newValue));
		}
	);
}

export const lexeme = atomWithStore<string>('lexeme');
export const principalPart = atomWithStore<string>('principalPart');
export const showAllClauses = atomWithStore('show', false);

async function fetchRandomWord(lexeme: string, principalPart: string) {
	const resp = await fetch(`${host}/random?${new URLSearchParams({
		lexeme,
		principalPart,
	})}`);
	if (resp.ok) {
		return await resp.json() as RandomWord;
	}
	return null; // null means error
}

const randomWordAtom = asyncAtomWithStore<RandomWord | null>('word');
//const asyncRandomWordAtom = atom(async get => await get(randomWordAtom));
const loadableRandomWordAtom = loadable(randomWordAtom)
export const randomWord = atom(
	(get) => get(loadableRandomWordAtom),
	// fetch new
	async (get, set) => {
		const [lexemeValue, principalPartValue] = [get(lexeme), get(principalPart)];
		console.log('fetch word', lexemeValue, principalPartValue);
		// don't run if we have a word (ie. set to null to run)
		// or if not lexeme or pp
		if (lexemeValue === null || principalPartValue === null) {
			return;
		}
		// set(randomWordAtom, null);
		set(clausesAtom, Promise.resolve(null));
		set(showAllClauses, false);
		set(highlightWord, null);
		// for network error like cors
		// TODO: this doesn't seem to work when no connection

		const randomWordPromise = fetchRandomWord(lexemeValue, principalPartValue);
		set(randomWordAtom, randomWordPromise);
		// set(wordError, true);
		await randomWordPromise;
		// get new clauses
		set(clauses);
	}
);

async function fetchClauses(referenceStartClauseID: number, referenceEndClauseID: number) {
	const resp = await fetch(`${host}/clauses`, {
		method: 'POST',
		body: JSON.stringify(range(referenceStartClauseID, referenceEndClauseID)),
	});
	if (resp.ok) {
		return resp.json() as Promise<TClauses>;
	}
	return null; // or return or throw error
}

const clausesAtom = asyncAtomWithStore<TClauses>('clauses');
const loadableClausesAtom = loadable(clausesAtom);
export const clauses = atom(
	get => get(loadableClausesAtom),
	// fetch new
	async (get, set) => {
		const [randomWordValue, clausesValue] = [await get(randomWordAtom), await get(clausesAtom)];
		// if word not loaded or matches clauses, no need to fetch
		console.log('fetch clauses', randomWordValue, clausesValue);
		if (!randomWordValue || wordMatchesClauses(randomWordValue, clausesValue)) {
			return;
		}
		set(clausesAtom, Promise.resolve(null));
		const clausesPromise = fetchClauses(randomWordValue.referenceStartClauseID, randomWordValue.referenceEndClauseID)
		set(clausesAtom, clausesPromise);
	}
);

export const highlightWord = atom<TWord | null>(null);
export const isTranslationVisible = atom(false);
export const wordError = atom(false);

export const showParsing = atom(false);

const parsingAtom = atom(null);
const loadableParsingAtom = loadable(parsingAtom);
export const parsing = loadable(atom(async get => {
	console.log('load parsing')
	const randomWordValue = await get(randomWordAtom);
	console.log(randomWordValue, get(showParsing));
	if (randomWordValue && get(showParsing)) {
		const rmacs = await import('../_rmac.json');
		console.log('rmac loaded', rmacs);
		return rmacs.default[randomWordValue.rmac].toLowerCase();
	}
	else {
		return null;
	}
}));

function wordMatchesClauses(word: RandomWord, clauses: TClauses | null) {
	return word.referenceStartClauseID == clauses?.[0][0].referenceStartClauseID;
}

export const reference = atom(get => {
	const clausesValue = get(clauses);
	if (clausesValue.state !== 'hasData') {
		return;
	}
	return clausesValue.data?.[0][0].reference.replace(/(\d+)\.(.*)/, (_, b, r) => `${books[b - 40]} ${r}`);
});

export const hasClausesBefore = atom<boolean | null>(get => {
	const randomWordValue = get(randomWord);
	if (randomWordValue.state != 'hasData' || !randomWordValue.data) {
		return null;
	}
	return randomWordValue.data.referenceStartClauseID < randomWordValue.data.clauseID;
});
export const hasClausesAfter = atom<boolean | null>((get) => {
	const randomWordValue = get(randomWord);
	if (randomWordValue.state != 'hasData' || !randomWordValue.data) {
		return null;
	}
	return randomWordValue.data.referenceEndClauseID < randomWordValue.data.clauseID;
});

export const translation = atom<TClauses | null | undefined>((get) => {
	const clausesValue = get(clauses);
	if (clausesValue.state !== 'hasData') {
		return null;
	}
	return clausesValue.data?.map(clause => clause.map(w => {
		// replace ending b with .5, ie 100b -> 100.5
		return { sort: parseFloat(w.LTsortI.replace(/b$/, '.5')), ...w };
	}).sort((a, b) => a.sort - b.sort)); // now can sort
	// .filter(v => v !== '-')
});
