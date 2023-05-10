import * as React from 'react';
import type { FC } from 'react';
import { useAtom } from 'jotai';
import {
	randomWord as randomWordAtom,
	principalPart as principalPartAtom,
	showParsing as showParsingAtom,
	parsing as parsingAtom
} from "../atoms";

const Parsing: FC = () => {
	const [randomWord] = useAtom(randomWordAtom);
	const [principalPart] = useAtom(principalPartAtom);
	const [showParsing, setShowParsing] = useAtom(showParsingAtom);
	const [parsing] = useAtom(parsingAtom);
	function toggleParsing() {
		console.log('showParsing', showParsing, 'changing to', !showParsing);
		setShowParsing(!showParsing);
	}
	return (
		<div style={{ fontSize: '1.25em', cursor: 'pointer' }} onClick={toggleParsing}>
			<div>{randomWord.state == 'hasData' && randomWord.data?.rmac} {principalPart && `(PP${principalPart})`}</div>
			{showParsing && <div>{parsing.state == 'hasData' ? parsing.data : 'loading...'}</div>}
		</div>
	);
}
export default Parsing;