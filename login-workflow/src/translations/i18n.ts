/* eslint-disable @typescript-eslint/camelcase */
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

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: translations.english,
            fr: translations.french,
            fr_US: translations.french,
            fr_CA: translations.french,
            fr_FR: translations.french,
        },
        lng: deviceLocale,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
