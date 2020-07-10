import i18n from 'i18next';
import * as Highcharts from 'highcharts';
export declare const getChartsLanguage: () => Highcharts.LangOptions | undefined;
export declare const getChartsAxisDateTimeLabelFormats: () => Highcharts.AxisDateTimeLabelFormatsOptions | undefined;
declare type FormatStrings = {
    day: string;
    hour: string;
    millisecond: string;
    second: string;
    minute: string;
    month: string;
    year: string;
    week: string;
};
export declare const getChartsTooltipDateTimeLabelFormats: () => FormatStrings | undefined;
export declare const dateLocale: Locale;
export default i18n;
