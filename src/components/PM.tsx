import * as React from 'react';
import type { FC } from 'react';

interface PMProps {
	text: string;
};
/**
 * Render text prop as HTML (Dangerous!)
 */
const PM: FC<PMProps> = ({ text }) => {
	return !text ? <></> : <span
		// eslint-disable-next-line react/no-danger
		dangerouslySetInnerHTML={{ __html: text }} />;
}
export default PM;