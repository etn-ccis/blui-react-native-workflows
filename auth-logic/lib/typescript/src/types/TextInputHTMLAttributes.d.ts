import { InputHTMLAttributes } from 'react';
/**
 * Extends InputHTMLAttributes by adding an `onChangeText` function so TS Linting doesn't complain in the tests.
 */
export declare type TextInputHTMLAttributes = InputHTMLAttributes<HTMLInputElement> & {
    onChangeText?: (((text: string) => void) & Function) | undefined;
};
