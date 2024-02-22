import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
    ...jest.requireActual('react-i18next'),
}));
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);
jest.mock('@react-navigation/native');
