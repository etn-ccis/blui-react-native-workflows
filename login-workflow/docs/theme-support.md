# Theme Support

This package will support a variety of React Native Paper compatible themes, but we recommend using a theme from the [@pxblue/react-native-themes](https://www.npmjs.com/package/@pxblue/react-native-themes) package.

# Using PX Blue Themes

## Light Theme

Using the PX Blue light theme for react native is very straightforward. You simply need to wrap your application contents in a `Provider` component from React Native paper and everything will be styled appropriately:

```tsx
import { Provider as ThemeProvider } from 'react-native-paper';
import * as PXBThemes from '@pxblue/react-native-themes';

<ThemeProvider theme={PXBThemes.blue}>
    {/* Application Contents */}
<ThemeProvider>
```

## Dark Theme

There are two PX Blue dark themes (`blueDark` and `blueDarkAlt`) that need to be supplied to different components to achieve the desired overall look and feel. If you would like to use the dark theme for your application, you will need to wrap your application contents in an additional `AltThemeProvider` to make the secondary theme available to the components that require it:

```tsx
import { Provider as ThemeProvider } from 'react-native-paper';
import { AltThemeProvider } from '@pxblue/react-native-auth-workflow';
import * as PXBThemes from '@pxblue/react-native-themes';

<AltThemeProvider theme={PXBThemes.blueDarkAlt}>
    <ThemeProvider theme={PXBThemes.blue}>
        {/* Application Contents */}
    <ThemeProvider>
</AltThemeProvider>
```

> **NOTE:** The `AltThemeProvider` MUST come before the `ThemeProvider` from React Native Paper. RNP uses the Provider as a target for `Portal` elements, if you don't set this up properly, some elements such as dialogs and modals will not have access to the alternate theme.

### Dark Component Wrappers

When using the PX Blue dark themes, you will need to create wrappers around some of the default React Native Paper components so that they have the correct styles in your application content. You can read more about this in the [themes documentation](https://github.com/pxblue/themes/tree/master/react-native#dark-theme). A future update to PX Blue will provide these wrapper elements in a shared library.

## Supporting Multiple Themes

If you are supporting multiple themes for your application and at least one of them is the PX Blue dark theme, you will need to include the `AltThemeProvider` described above. For the light theme, or dark themes that do not require an alternate theme, you can set the theme property to `undefined`.

```tsx
<AltThemeProvider theme={isPXBDarkTheme(currentTheme) ? PXBTheme.blueDarkAlt : undefined}>
    <ThemeProvider theme={currentTheme}>
        {/* Application Contents */}
    <ThemeProvider>
</AltThemeProvider>
```
