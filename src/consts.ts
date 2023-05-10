export const host = 'https://npaohzt9cd.execute-api.us-east-2.amazonaws.com';
export const books = [
	'Matthew',
	'Mark',
	'Luke',
	'John',
	'Acts',
	'Romans',
	'1 Corinthians',
	'2 Corinthians',
	'Galatians',
	'Ephesians',
	'Philippians',
	'Colossians',
	'1 Thessalonians',
	'2 Thessalonians',
	'1 Timothy',
	'2 Timothy',
	'Titus',
	'Philemon',
	'Hebrews',
	'James',
	'1 Peter',
	'2 Peter',
	'1 John',
	'2 John',
	'3 John',
	'Jude',
	'Revelation',
];

export const partsOfSpeech = {
	A: 'adj',// Adjective
	C: 'recip pron',// reCiprocal pronoun
	D: 'denom pron',// Demonstrative pronoun
	F: 'refl pron',// reFlexive pronoun
	I: 'inter pron',// Interrogative pronoun
	K: 'cor pron', //corRelative pronoun
	N: 'n', // noun
	T: 'def art', // definite arTicle
	X: 'indef pron', // indefinite pronoun
	P: 'poses pron', // personal pronoun
	Q: 'cor/inter pronoun',
	R: 'rel pron',
	S: 'poses pron', // poSessive pronoun
	V: 'v',
	ADV: 'adv',
	COND: 'conditional', // CONDitional particle or conjunction
	INJ: 'interjection',
	PREP: 'prep',
	PRT: 'particle',
	ARAM: 'Aramaic',
	HEB: 'Hebrew',
};
//type PartOfSpeechKey = keyof typeof partsOfSpeech;

export const cases = {
	N: 'nom',
	G: 'gen',
	D: 'dat',
	A: 'acc',
	V: 'voc',
};
export type CaseKey = keyof typeof cases;

export const numbers = {
	S: 'sg',
	P: 'pl',
};
export type NumberKey = keyof typeof numbers;

export const persons = {
	1: '1ˢᵗ',
	2: '2ⁿᵈ',
	3: '3ʳᵈ',
};
export type PersonKey = keyof typeof persons;

export const genders = {
	M: 'masc',
	F: 'fem',
	N: 'neut',
};
export type GenderKey = keyof typeof genders;

export const tenses = {
	P: 'pres', // present
	I: 'imperf',
	F: 'fut',
	A: 'aor',
	R: 'perf',
	L: 'pluperf',
	X: 'none',
};
export type TenseKey = keyof typeof tenses;

export const voices = {
	A: 'act',
	M: 'mid', // middle',
	D: 'mid',
	E: 'mid',
	N: 'mid',
	P: 'pas',
	O: 'pas',
};
export type VoiceKey = keyof typeof voices;

export const moods = {
	I: 'ind', // indicative
	S: 'sub', // subjunctive
	N: 'inf', // infinitive
	M: 'imp', // imperative
	O: 'opt', // optative
	P: 'part', //iciple
};
export type MoodKey = keyof typeof moods;
export type FiniteMoodKey = Exclude<MoodKey, 'P' | 'N'>;

export const adverbTypes = {
	I: 'interrogative',
	C: 'contracted',
	N: 'negative',
	S: 'superlative',
	K: 'do not show',
};
export type AdverbKey = keyof typeof adverbTypes;
// "top": "rmac.ADV",
// 	"def": "ADVerb or adverb and particle combined"
// },
// {
// 	"top": "rmac.ADV-C",
// 		"def": "ADVerb, Contracted form"
// },
// {
// 	"top": "rmac.ADV-I",
// 		"def": "ADVerb, Interrogative"
// },
// {
// 	"top": "rmac.ADV-K",
// 		"def": "ADVerb, Kai"
// },
// {
// 	"top": "rmac.ADV-N",
// 		"def": "ADVerb, Negative"
// },
// {
// 	"top": "rmac.ADV-S",
// 		"def": "ADVerb, Superlative"
// },

export type AN = ['A' | 'C' | 'D' | 'F' | 'I' | 'K' | 'N' | 'Q' | 'R' | 'T' | 'X', undefined, undefined, CaseKey, NumberKey, GenderKey];
export type PersonalPronoun = ['P', undefined, undefined, PersonKey, CaseKey, NumberKey];
export type PosessivePronoun = ['S', PersonKey, NumberKey, CaseKey, NumberKey, GenderKey];
export type FiniteVerb = ['V', undefined, undefined, TenseKey, VoiceKey, FiniteMoodKey, PersonKey, NumberKey];
export type Participle = ['V', undefined, undefined, TenseKey, VoiceKey, 'P', CaseKey, NumberKey, GenderKey];
export type Infinitive = ['V', undefined, undefined, TenseKey, VoiceKey, 'N'];
export type Verb = FiniteVerb | Participle | Infinitive;
export type Adverb = ['ADV', undefined, undefined, AdverbKey | undefined]
export type OtherPOS = ['COND' | 'INJ' | 'PREP' | 'PRT' | 'ARAM' | 'HEB'];