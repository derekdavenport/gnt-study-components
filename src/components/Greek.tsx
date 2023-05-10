import * as React from 'react';
import type { FC } from 'react';
import { Word, Clauses } from '.';
import { useAtom } from 'jotai';
import {
	randomWord as randomWordAtom,
	wordError as wordErrorAtom,
	lexeme as lexemeAtom,
	clauses as clausesAtom,
	isSSR,
} from "../atoms";

const Greek: FC = () => {
	const [randomWord] = useAtom(randomWordAtom);
	const [wordError] = useAtom(wordErrorAtom);
	const [lexeme] = useAtom(lexemeAtom);
	const [clauses] = useAtom(clausesAtom);
	console.log('render Greek', 'randomWord:', randomWord);
	// if word not loaded
	if (isSSR || randomWord.state != 'hasData' || !randomWord.data) {
		// could not load
		if (randomWord.state == 'hasError') { //(wordError) {
			// just show the lexical form for offline study
			return <>{lexeme}</>;
		}
		return <>loading...</>;
	}
	// if clauses not loaded just show word
	if (clauses.state !== 'hasData' || !clauses.data) {
		return <>
			<Word word={{ ...randomWord.data, PMpWord: '', PMfWord: '', LT: '', Español: '' }} lang="EL" />
		</>;
	}
	return <Clauses clauses={clauses.data} lang="EL" />;
}
export default Greek;