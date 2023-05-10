import * as React from 'react';
import type { FC } from 'react';

interface PrincipalPartsProps {
	text: string;
};
/**
 * Render text prop as HTML (Dangerous!)
 */
const PrincipalParts: FC<PrincipalPartsProps> = ({ text }) => {
	return !text ? <></> : <p>
		{text}
	</p>;
}
export default PrincipalParts;