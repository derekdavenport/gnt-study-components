import * as React from 'react';
import type { FC } from 'react';
import type { Config, Displayable } from './../types';
import { useAtom } from 'jotai';
import { isTranslationVisible as isTranslationVisibleAtom } from "../atoms";
import { Answer, Parsing, Reference, Translation } from '.';
import { displayableToComponent } from 'util';

const Back: FC<Config> = ({ content }) => {
	const [_, setIsTranslationVisible] = useAtom(isTranslationVisibleAtom);
	setIsTranslationVisible(true);

	const out = content.map(displayableToComponent);

	return <>
		<hr />
		{out}
		{/* <h5>out</h5>
        props: <pre>{JSON.stringify({ declension, gloss })}</pre>
        lexeme: <pre>{JSON.stringify(lexeme.value)}</pre>
        pp: <pre>{JSON.stringify(principalPart.value)}</pre>
        showAllClauses: <pre>{JSON.stringify(showAllClauses.value)}</pre>
        isTranslationVisible: <pre>{JSON.stringify(isTranslationVisible.value)}</pre>
        highlightWord: <pre>{JSON.stringify(highlightWord.value)}</pre>
        randomWord: <pre>{JSON.stringify(randomWord.value)}</pre>
        translation: <pre>{JSON.stringify(translation.value)}</pre>
        clauses: <pre>{JSON.stringify(clauses.value)}</pre> */}
	</>;
}
export default Back;