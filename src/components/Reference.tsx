import * as React from 'react';
import type { FC } from 'react';
import type { DisplayLang } from './../types';
import { HighlightParsing } from '.';
import {
	highlightWord as highlightWordAtom,
	reference as referenceAtom
} from "../atoms";
import { useAtom } from 'jotai';

interface ReferenceProps {
	lang: DisplayLang;
};
const Reference: FC<ReferenceProps> = ({ lang }) => {
	const [highlightWord] = useAtom(highlightWordAtom);
	const [reference] = useAtom(referenceAtom);
	// show reference, unless a word is highlightened, then show that word's parsing
	const contents = highlightWord ?
		<HighlightParsing word={highlightWord} lang={lang} /> :
		reference;
	return (
		<div className="parsing">
			{contents}
		</div>
	);
}
export default Reference;