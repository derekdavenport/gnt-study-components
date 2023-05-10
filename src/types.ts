const rmacs = await import('./_rmac.json').then(mod => mod.default);
export type Rmac = keyof typeof rmacs;

export type Word = {
	clauseID: number,
	referenceStartClauseID: number,
	referenceEndClauseID: number,
	OGNTsort: number,
	OGNTa: string,
	rmac: Rmac,
	lexeme: string,
	MounceEntry: string,
	Book: number,
	Chapter: number,
	Verse: number,
	reference: string,
	EDNTentry: string,
	Español: string,
	FEATURESsort1: number,
	GoodrickKohlenberger: number,
	IT: string,
	LT: string,
	LTsortI: string,
	BGBsortI: string,
	PMfWord: string,
	PMpWord: string,
	ST: string,
	STsortI: string,
	TANTTsort: number,
	TBESG: string,
	BDAGentry: string,
	strongs: number,
	'LN-LouwNidaNumbers': string,
	uuid: string,
};

export type RandomWord = Pick<Word, 'clauseID' | 'referenceStartClauseID' | 'referenceEndClauseID' | 'OGNTsort' | 'OGNTa' | 'rmac'>;

export type Clause = Word[];

export type Clauses = Clause[];

export type DisplayLang = 'EN' | 'ES';
export type Language = 'EN' | 'ES';
export type GlossSource = 'tbesg' | 'STEPes';
export type ENSource = "tbesg" | "dodsonFull" | "dodsonAbbr" | "strong";
export type ESSource = 'STEP';
export type DefinitionSource = { EN: ENSource } | { ES: ESSource };

export interface Div {
	type: 'div';
	content: Displayable[];
}

export interface Translation {
	type: 'translation';
	lang: DisplayLang;
}

export interface Reference {
	type: 'reference';
	lang: DisplayLang;
}

export interface AnswerConfig {
	type: 'answer';
	gloss: string;
	declension: string;
	source: GlossSource;
}

export interface ParsingConfig {
	type: 'parsing';
}

export interface PrincipalPartsConfig {
	type: 'principalParts';
	text: string;
}

export interface DefinitionConfig {
	type: 'definition';
	def: string;
	source: DefinitionSource;
}

export interface DerivationConfig {
	type: 'derivation';
}

export interface HRConfig {
	type: 'hr';
}

export type Displayable = Translation | Reference | AnswerConfig | ParsingConfig | PrincipalPartsConfig | DefinitionConfig | DerivationConfig | HRConfig;

export type Config = {
	translation: '',
	declension: string,
	gloss: string,
	lang: DisplayLang,
	content: Displayable[],
};