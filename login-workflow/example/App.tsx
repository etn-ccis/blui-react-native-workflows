/**
 Copyright (c) 2021-present, Eaton

 All rights reserved.

 This code is licensed under the BSD-3 license found in the LICENSE file in the root directory of this source tree and at https://opensource.org/licenses/BSD-3-Clause.
 **/
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider as ThemeProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainRouter } from './src/navigation';
import { ThemeContext, ThemeType } from './src/context/ThemeContext';
import { blue, blueDark } from '@brightlayer-ui/react-native-themes';
import i18nAppInstance from './translations/i18n';
import { RegistrationDictionaries, SharedDictionaries } from '@brightlayer-ui/react-native-auth-workflow';
import { I18nextProvider } from 'react-i18next';
export const App = (): JSX.Element => {
    const [theme, setTheme] = useState<ThemeType>('light');
    i18nAppInstance.addResourceBundle(
        'zh',
        'bluiRegistration',
        RegistrationDictionaries.chinese.translation,
        true,
        false
    );
    i18nAppInstance.addResourceBundle('zh', 'bluiCommon', SharedDictionaries.chinese.translation, true, false);
    i18nAppInstance.addResourceBundle(
        'en',
        'bluiRegistration',
        RegistrationDictionaries.english.translation,
        true,
        false
    );
    i18nAppInstance.addResourceBundle('en', 'bluiCommon', SharedDictionaries.english.translation, true, false);
    i18nAppInstance.addResourceBundle(
        'fr',
        'bluiRegistration',
        RegistrationDictionaries.french.translation,
        true,
        false
    );
    i18nAppInstance.addResourceBundle('fr', 'bluiCommon', SharedDictionaries.french.translation, true, false);
    i18nAppInstance.addResourceBundle(
        'pt',
        'bluiRegistration',
        RegistrationDictionaries.portuguese.translation,
        true,
        false
    );
    i18nAppInstance.addResourceBundle('pt', 'bluiCommon', SharedDictionaries.portuguese.translation, true, false);
    i18nAppInstance.addResourceBundle(
        'es',
        'bluiRegistration',
        RegistrationDictionaries.spanish.translation,
        true,
        false
    );
    i18nAppInstance.addResourceBundle('es', 'bluiCommon', SharedDictionaries.spanish.translation, true, false);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <I18nextProvider i18n={i18nAppInstance}>
                <ThemeProvider theme={theme === 'light' ? blue : blueDark}>
                    <SafeAreaProvider>
                        <MainRouter />
                    </SafeAreaProvider>
                </ThemeProvider>
            </I18nextProvider>
        </ThemeContext.Provider>
    );
};

export default App;
