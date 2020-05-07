/**
 * @packageDocumentation
 * @module Helpers
 */

/**
 * A string accompanied by a style tag.
 */
export type ParsedJSXText = {
    tag: string;
    text: string;
};

/**
 * @ignore
 */
const tagRegex = /^<(?<tag>\w+)>(?<text>.+?)<\/\k<tag>>/s;
/**
 * @ignore
 */
const beforeTagRegex = /^(?<text>.+?)(?=<\w+?>)/s;

/**
 * Creates an array of [[ParsedJSXText]] from a string, separating the string into substrings accompanied by a tag.
 */
function parseNextChunk(textToParse: string): ParsedJSXText[] {
    const tagMatch = tagRegex.exec(textToParse);
    const beforeTagMatch = beforeTagRegex.exec(textToParse);

    let tag = 'none';
    let text = '';
    let nextIndex = textToParse.length;

    if (tagMatch) {
        tag = tagMatch.groups?.tag ?? '';
        text = tagMatch.groups?.text ?? '';
        nextIndex = tagMatch[0].length;
    } else if (beforeTagMatch) {
        text = beforeTagMatch.groups?.text ?? '';
        nextIndex = beforeTagMatch[0].length;
    } else {
        text = textToParse;
    }

    const result = [{ tag, text }];
    if (textToParse.length > 0) {
        return [...result, ...parseNextChunk(textToParse.substring(nextIndex))];
    }
    return result;
}

const parseTextForJSX = (parseableText: string): ParsedJSXText[] => parseNextChunk(parseableText);

export default parseTextForJSX;
