import React, { createContext, useContext } from 'react';

type AltThemeContextType = {
    theme?: ReactNativePaper.Theme;
};

export const AltThemeContext = createContext<AltThemeContextType>({});

export const useAltTheme = (): ReactNativePaper.Theme | undefined => {
    const context = useContext(AltThemeContext);
    if (context === null) {
        throw new Error('useSelectedIcon must be used within a SelectedIconContextProvider');
    }
    return context.theme;
};

export const AltThemeProvider: React.FC<AltThemeContextType> = (props) => {
    const { theme: altTheme } = props;
    return <AltThemeContext.Provider value={{ theme: altTheme }}>{props.children}</AltThemeContext.Provider>;
};
