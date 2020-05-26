/**
 * @packageDocumentation
 * @module Helpers
 */

import { Platform } from 'react-native';
import { blue as BlueTheme } from '@pxblue/react-native-themes';
import { configureFonts, DefaultTheme, Theme } from 'react-native-paper';

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
const fallbackFont = Platform.OS === 'ios' ? 'System' : 'Roboto';

/**
 * Maps pxblue fonts to react-native-paper font objects for theming elements using React Native Paper.
 */
const defaultFontConfig = {
    regular: {
        fontFamily: BlueTheme.fonts.regular.fontFamily || fallbackFont,
        fontWeight: '400' as FontWeight,
    },
    medium: {
        fontFamily: BlueTheme.fonts.medium.fontFamily || fallbackFont,
        fontWeight: '500' as FontWeight,
    },
    light: {
        fontFamily: BlueTheme.fonts.light.fontFamily || fallbackFont,
        fontWeight: '300' as FontWeight,
    },
    thin: {
        fontFamily: BlueTheme.fonts.light.fontFamily || fallbackFont,
        fontWeight: '100' as FontWeight,
    },
};

/**
 * @ignore
 */
const fontConfig = {
    default: defaultFontConfig,
    ios: defaultFontConfig,
    android: defaultFontConfig,
};

/**
 * React Native Paper theme built from pxblue's React Native Elements theme (fonts and colours).
 */
export const paperBlueTheme: Theme = {
    ...DefaultTheme,
    roundness: BlueTheme.roundness,
    fonts: configureFonts(fontConfig),
    colors: {
        ...DefaultTheme.colors,
        primary: BlueTheme.colors.primary,
        accent: BlueTheme.colors.accent,
        background: BlueTheme.colors.background,
        surface: BlueTheme.colors.surface,
        text: BlueTheme.colors.text,
        backdrop: 'rgba(0, 0, 0, 0.4)', // Transparent overlay
        error: BlueTheme.colors.error,
    },
};
