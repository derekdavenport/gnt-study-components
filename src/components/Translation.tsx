import * as React from 'react';
import type { FC } from 'react';
import type { DisplayLang } from './../types';
import { Clauses } from '.';
import { useAtom } from 'jotai';
import { translation as translationAtom } from "../atoms";

interface TranslationProps {
	lang: DisplayLang;
};
const Translation: FC<TranslationProps> = ({ lang }) => {
	const [translation] = useAtom(translationAtom);
	// console.log(translation);
	if (!translation) {
		return null;
	}
	return <Clauses clauses={translation} lang={lang} />;
}
export default Translation