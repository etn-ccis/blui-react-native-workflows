/**
 * @packageDocumentation
 * @module Hooks
 * @internal
 */
import { TFunction } from 'i18next';
import { FirstArgument, ThirdArgument } from '../types/general';
declare type TFunctionWithNoDataDefault = (key: FirstArgument<TFunction>, options?: ThirdArgument<TFunction>) => string;
export declare const useLanguageLocale: () => {
    t: TFunctionWithNoDataDefault;
    formatDateTime: (dateTime: string | undefined | null) => string;
    formatMonthLong: (dateTime: string | undefined | null) => string;
    formatDate: (dateTime: string | undefined | null) => string;
    formatDateShort: (dateTime: string | undefined | null) => string;
    formatTime: (dateTime: string | undefined | null) => string;
    formatTimeShort: (dateTime: string | undefined | null) => string;
    timeSince: (dateTime: string | undefined | null) => string;
};
export declare type LanguageLocale = ReturnType<typeof useLanguageLocale>;
export {};
