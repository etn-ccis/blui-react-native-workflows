/* eslint-disable @typescript-eslint/naming-convention */
import { Platform, NativeModules } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '@brightlayer-ui/react-auth-shared';

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

void i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        ns: ['app', 'blui'],
        defaultNS: 'app',
        fallbackNS: 'blui',
        resources: {
            // English
            en: {
                blui: translations.english.translation,
                app: {},
            },
            // French
            fr: {
                blui: translations.french.translation,
                app: {},
            },
            // Spanish
            es: {
                blui: translations.spanish.translation,
                app: {},
            },
            // Chinese
            zh: {
                blui: translations.chinese.translation,
                app: {},
            },
        },
        lng: deviceLocale.substr(0, 2),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
