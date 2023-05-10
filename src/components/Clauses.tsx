import * as React from 'react';
import type { FC } from 'react';
import type { DisplayLang, Clauses as TClauses } from '../types';
import { Word } from '.';

interface ClausesProps {
	clauses: TClauses,
	lang: 'EL' | DisplayLang,
};
const Clauses: FC<ClausesProps> = ({ clauses, lang }) => {
	return <>
		{clauses.map(clause =>
			clause.map(word =>
				<Word word={word} lang={lang} key={word.OGNTsort} />
			)
		)}
	</>;
}
export default Clauses;