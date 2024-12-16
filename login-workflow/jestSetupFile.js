import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
    ...jest.requireActual('react-i18next'),
}));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('react-native-webview', () => {
    const { View } = require('react-native');
    return {
        WebView: View,
    };
});
jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');

    RN.NativeModules.SettingsManager = {
        settings: {
            AppleLocale: 'en-US',
            AppleLanguages: ['fr-FR', 'en-US'],
        },
    };
    return RN;
});
jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@okta/okta-react-native', () => ({
    createConfig: jest.fn().mockImplementation(() => {
        return Promise.resolve();
    }),
}));
