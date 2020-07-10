declare const formatDateTime: (dateTime: string | undefined | null, locales?: string | string[] | undefined) => string;
declare const formatMonthLong: (dateTime: string | undefined | null, locales?: string | string[] | undefined) => string;
declare const formatDate: (dateTime: string | undefined | null, locales?: string | string[] | undefined) => string;
declare const formatDateShort: (dateTime: string | undefined | null, locales?: string | string[] | undefined) => string;
declare const formatTime: (dateTime: string | undefined | null, locales?: string | string[] | undefined) => string;
declare const formatTimeShort: (dateTime: string | undefined | null, locales?: string | string[] | undefined) => string;
declare const timeSince: (dateTime: string | undefined | null) => string;
export { formatDateTime, formatMonthLong, formatDate, formatDateShort, formatTime, formatTimeShort, timeSince };
