/* eslint-disable @typescript-eslint/naming-convention */
import { Platform, NativeModules } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '@pxblue/react-auth-shared';

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
        resources: {
            resources: {
                // English
                en: translations.english,
                // French
                fr: translations.french,
                fr_US: translations.french,
                fr_CA: translations.french,
                fr_FR: translations.french,
                // Spanish
                es: translations.spanish,
                es_US: translations.spanish,
                es_MX: translations.spanish,
                es_ES: translations.spanish,
            },
        },
        lng: deviceLocale,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
