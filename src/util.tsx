import { Answer, Definition, Parsing, PrincipalParts, Reference, Translation } from "components";
import { Displayable, Language } from "types";
import React from 'react';

//export const range = (start: number, end: number) => Array<number>(end - start + 1).fill(start).map((n, i) => n + i);
export const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const sources = {
	'EN': {
		"tbesg": 'Translators Brief lexicon of Extended Strongs for Greek',
		"dodsonFull": "Dodson Greek-English Lexicon",
		"dodsonBrief": "Dodson Greek-English Lexicon (short)", // TODO: change to dodsonAbbr later?
		"strong": "Strong's Exhaustive Concordance",
	},
	'ES': {
		'stepES': 'STEP Bible',
	},
} as const satisfies Record<Language, Record<string, string>>;
export type Source = {
	[K in keyof typeof sources]: {[K2 in K]: (keyof typeof sources)[K2]}
}[keyof typeof sources]
type J = (typeof sources)[keyof typeof sources]
type K = J[keyof J]

type allSubTypesOfUnionType<T> = T extends any ? keyof T : never
type L = allSubTypesOfUnionType<J>

// for Node
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

export const displayableToComponent = (display: Displayable) => {
	switch (display.type) {
		case 'translation':
			return <Translation lang={display.lang} />;
		case 'reference':
			return <Reference lang={display.lang} />;
		case 'answer':
			return <Answer declension={display.declension} gloss={display.gloss} />;
		case 'definition':
			return <Definition />
		case 'parsing':
			return <Parsing />;
		case 'principalParts':
			return <PrincipalParts text={display.text} />;
		case 'hr':
			return <hr />;
	}
}