/* eslint-disable @typescript-eslint/camelcase */
import { Platform, NativeModules } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslations from './english';
import frenchTranslations from './french';
import { frCA, enUS } from 'date-fns/locale';
import * as Highcharts from 'highcharts';

// for getting the device's language locale
// 'en' is default deviceLocale
const AppleLocaleSettings = NativeModules.SettingsManager?.settings;
const AndroidLocaleSettings = NativeModules.I18nManager;
let deviceLocale = 'en';
if (AppleLocaleSettings && Platform.OS === 'ios') {
    deviceLocale = AppleLocaleSettings.AppleLocale /* < iOS 13 */ || AppleLocaleSettings.AppleLanguages[0]; /* iOS 13 */
} else if (AndroidLocaleSettings && Platform.OS === 'android') {
    deviceLocale = AndroidLocaleSettings.localeIdentifier;
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: englishTranslations,
            fr: frenchTranslations,
            fr_US: frenchTranslations,
            fr_CA: frenchTranslations,
        },
        lng: deviceLocale,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

const getDateLocale = (): Locale => {
    switch (i18n.language) {
        case 'fr':
            return frCA;
        default:
            return enUS;
    }
};

export const getChartsLanguage = (): Highcharts.LangOptions | undefined => {
    switch (i18n.language) {
        case 'fr':
            return {
                loading: 'Chargement...',
                months: [
                    'janvier',
                    'février',
                    'mars',
                    'avril',
                    'mai',
                    'juin',
                    'juillet',
                    'août',
                    'septembre',
                    'octobre',
                    'novembre',
                    'décembre',
                ],
                weekdays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
                shortMonths: ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'aoû', 'sep', 'oct', 'nov', 'déc'],
                rangeSelectorFrom: 'Du',
                rangeSelectorTo: 'au',
                rangeSelectorZoom: 'Période',
                downloadPNG: 'Télécharger en PNG',
                downloadJPEG: 'Télécharger en JPEG',
                downloadPDF: 'Télécharger en PDF',
                downloadSVG: 'Télécharger en SVG',
                resetZoom: 'Réinitialiser le zoom',
                resetZoomTitle: 'Réinitialiser le zoom',
                thousandsSep: ' ',
                decimalPoint: ',',
            };
        default:
            return undefined;
    }
};

export const getChartsAxisDateTimeLabelFormats = (): Highcharts.AxisDateTimeLabelFormatsOptions | undefined => {
    switch (i18n.language) {
        case 'fr': // default to built-in locale until a native French speaker can specify
            return undefined;

        case 'en': // assume US English
            return {
                day: '%m/%d',
                hour: '%l:%M %P',
                millisecond: '%l:%M:%S %P', // '%l:%M:%S.%L %P'
                second: '%l:%M:%S %P',
                minute: '%l:%M',
                month: '%b, %Y',
                year: '%Y',
                week: '%b %e',
            };

        default:
            return undefined;
    }
};

type FormatStrings = {
    day: string;
    hour: string;
    millisecond: string;
    second: string;
    minute: string;
    month: string;
    year: string;
    week: string;
};
export const getChartsTooltipDateTimeLabelFormats = (): FormatStrings | undefined => {
    switch (i18n.language) {
        case 'fr': // default to built-in locale until a native French speaker can specify
            return undefined;

        case 'en': {
            // assume US English
            const format = '%m/%d/%Y %l:%M:%S %P';

            return {
                day: format,
                hour: format,
                millisecond: format,
                second: format,
                minute: format,
                month: format,
                year: format,
                week: format,
            };
        }

        default:
            return undefined;
    }
};

export const dateLocale = getDateLocale();

export default i18n;
