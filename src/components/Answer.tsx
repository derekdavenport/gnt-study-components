import * as React from 'react';
import type { FC } from 'react';
import { useAtom } from 'jotai';
import { lexeme as lexemeAtom } from "../atoms";
import { DefinitionSource } from 'types';

interface AnswerProps {
	declension: string;
	gloss: string;
}

const Answer: FC<AnswerProps> = ({ declension, gloss }) => {
	const [lexeme] = useAtom(lexemeAtom);
	return (
		<div style={{ fontSize: '1.5em' }}>
			{lexeme}{declension && `, ${declension}`} ‘{gloss}’
		</div>
	);
}
export default Answer;