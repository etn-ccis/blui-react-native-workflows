import { createContext, useContext } from 'react';

export type ThemeType = 'light' | 'dark';

type ThemeContextType = {
    theme: ThemeType;
    setTheme: (themeName: ThemeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => {},
});

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);
