import * as React from 'react';
import type { FC } from 'react';
import type { Word as TWord, DisplayLang } from './../types';
import { useAtom } from 'jotai';
import { highlightWord as highlightWordAtom } from "../atoms";

interface HighlightParsingProps {
	word: TWord;
	lang: DisplayLang;
}
const HighlightParsing: FC<HighlightParsingProps> = ({ word, lang }) => {
	const [highlightWord, setHighlightWord] = useAtom(highlightWordAtom);
	function closeParsing() {
		setHighlightWord(null);
	}
	// TODO: allow more choice
	const translation = lang == 'ES' ? highlightWord?.Español : highlightWord?.TBESG;
	return <>
		{word.lexeme} ‘{translation}’ {word.rmac}
		&nbsp;
		<button onClick={closeParsing}>
			×
		</button>
	</>;
}
export default HighlightParsing;