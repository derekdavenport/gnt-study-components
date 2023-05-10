import * as React from 'react';
import type { FC } from 'react';
import { Greek } from '.';
import { useAtom } from 'jotai';
import {
	randomWord as randomWordAtom,
	lexeme as lexemeAtom,
	principalPart as principalPartAtom,
	showAllClauses as showAllClausesAtom,
} from "../atoms";

interface FrontProps {
	lexeme: string;
	principalPart: string;
};

const Front: FC<FrontProps> = (props) => {
	console.log('render Front', props);
	const [randomWord, fetchNewRandomWord] = useAtom(randomWordAtom);
	const [lexeme, setLexeme] = useAtom(lexemeAtom);
	const [principalPart, setPrincipalPart] = useAtom(principalPartAtom);
	const [showAllClauses, setShowAllClauses] = useAtom(showAllClausesAtom);
	// way to not have init function? default values with normal state and props?
	function init() {
		console.log('Front init', randomWord, lexeme, principalPart);
		fetchNewRandomWord();
	}

	/**
	 * check if lexeme or pp have changed (new card)
	 * */
	function isNewCard() {
		return lexeme !== props.lexeme || principalPart !== props.principalPart;
	}
	function fetchWord() {
		init();
	}
	function toggleClauses() {
		setShowAllClauses(!showAllClauses);
	}
	if (isNewCard()) {
		console.log('is new card', props);
		setLexeme(props.lexeme);
		setPrincipalPart(props.principalPart);
		init();
	}
	return <>
		<div>
			<button onClick={fetchWord} disabled={randomWord.state == 'loading'}>
				↻
			</button>
		</div>
		<a id="answer" />
		<div>
			<Greek />
			<button onClick={toggleClauses}>
				{showAllClauses ? '×' : '↔️'}
			</button>
		</div>
		{/* <pre>{window.location.href}</pre>
        props: <pre>{JSON.stringify(props)}</pre> */}

	</>;
};
export default Front;