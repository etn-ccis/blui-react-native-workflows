/**
 * @packageDocumentation
 * @module Helpers
 */
/**
 * A string accompanied by a style tag.
 */
export declare type ParsedJSXText = {
    tag: string;
    text: string;
};
export declare const parseTextForJSX: (parseableText: string) => ParsedJSXText[];
