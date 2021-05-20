/**
 * General docs
 *
 * @packageDocumentation
 * @module  @etn-sst/react-native-auth-ui
 * @preferred
 */

export { AuthNavigationContainer } from './screens/AuthNavigationContainer';
export type { AccountDetailInformation } from './subScreens/AccountDetails';
/** @ignore */
export { ChangePassword } from './screens/ChangePassword';
export { LoginHeaderSplash } from './components/LoginHeaderSplash';

export { DismissKeyboardView } from './components/DismissKeyboardView';
export { default as i18n } from './translations/i18n';

export * from './contexts/AltThemeProvider/AltThemeProvider';

export * from '@pxblue/react-auth-shared';
