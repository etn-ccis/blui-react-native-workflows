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
import { I18nextProvider } from 'react-i18next';
import { AppContext } from '../example/src/context/AppContextProvider';

export const App = (): JSX.Element => {
    const [theme, setTheme] = useState<ThemeType>('light');

    const [language, setLanguage] = useState('en');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <I18nextProvider i18n={i18nAppInstance}>
                <AppContext.Provider value={{ language, setLanguage }}>
                    <ThemeProvider theme={theme === 'light' ? blue : blueDark}>
                        <SafeAreaProvider>
                            <MainRouter />
                        </SafeAreaProvider>
                    </ThemeProvider>
                </AppContext.Provider>
            </I18nextProvider>
        </ThemeContext.Provider>
    );
};

export default App;
