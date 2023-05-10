import * as React from 'react';
import type { FC } from 'react';
import { useAtom } from 'jotai';
import { lexeme as lexemeAtom } from "../atoms";
import type { DefinitionConfig, DefinitionSource, ENSource, ESSource } from 'types';
import type { Source } from 'util';


type Sources = ENSource | ESSource;

function sourceToName(source: Source) {
	switch (source) {
		case 'tbesg':
			return 'TBESG';
		case 'dodsonFull':
			return 'Dodson';
		case 'dodsonAbbr':
			return 'Dodson (abbr)';
		case 'STEP':
			return 'STEP';
	}
}

interface DefinitionProps extends DefinitionConfig {

}

const Definition: FC<DefinitionProps> = ({ def, source }) => {

	return (
		<div style={{ fontSize: '1em' }}>
			{sourceToName(source)}
		</div>
	);
}
Definition.displayName = 'Definition';
export default Definition;