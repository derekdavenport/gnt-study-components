import * as React from 'react';
import type { FC } from 'react';
import type { DisplayLang, RandomWord, Word as TWord } from './../types';
import { useAtom } from 'jotai';
import { 
	randomWord as randomWordAtom,
	isTranslationVisible as isTranslationVisibleAtom,
	highlightWord as highlightWordAtom,
	showAllClauses as showAllClausesAtom
} from "../atoms";
import { PM } from ".";

interface WordProps {
	word: RandomWord & Pick<TWord, 'PMpWord' | 'PMfWord' | 'LT' | 'Español'>,
	lang: 'EL' | DisplayLang,
};
const Word: FC<WordProps> = ({ word, lang }) => {
	const [randomWord] = useAtom(randomWordAtom);
	const [isTranslationVisible] = useAtom(isTranslationVisibleAtom);
	const [highlightWord, setHighlightWord] = useAtom(highlightWordAtom);
	const [showAllClauses] = useAtom(showAllClausesAtom);

	const { clauseID, PMpWord, OGNTsort, PMfWord, OGNTa, LT, Español } = word;
	const isRandomWord = randomWord.state == 'hasData' && OGNTsort == randomWord.data?.OGNTsort;
	const canHighlight = !isRandomWord && isTranslationVisible;
	const isHighlight = canHighlight && OGNTsort == highlightWord?.OGNTsort;

	// console.log(lang, Español);

	function handleHover() {
		if (canHighlight) {
			setHighlightWord(word as TWord);
		}
	}

	function handleClick() {
		if (canHighlight) {
			// toggle
			setHighlightWord(!isHighlight ? word as TWord : null);
		}
	}
	const isMainClause = randomWord.state == 'hasData' && randomWord.data?.clauseID == clauseID;
	if (!showAllClauses && !isMainClause) {
		return <></>;
	}

	const classes = [];
	canHighlight && classes.push('pointer');
	isRandomWord && classes.push('word');
	isHighlight && classes.push('highlight');

	switch (lang) {
		case 'EL':
			return <><PM text={PMpWord} /> <span className={classes.join(' ')} onMouseEnter={handleHover} onClick={handleClick}>{OGNTa}</span><PM text={PMfWord} /> </>;
		case 'ES':
			return <><span className={classes.join(' ')} onMouseEnter={handleHover} onClick={handleClick}>{Español}</span> </>;
		case 'EN':
			return <><span className={classes.join(' ')} onMouseEnter={handleHover} onClick={handleClick}>{LT}</span> </>;
	}
	const nev: never = lang;
	return <>Word.tsx has a non exhaustive switch statement. Handle: {String(nev)}</>;
}
export default Word;