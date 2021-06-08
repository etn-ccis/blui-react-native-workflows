import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useAltTheme } from '../../contexts/AltThemeProvider/AltThemeProvider';

export const ThemedActivityIndicator: typeof ActivityIndicator = (props) => {
    const theme = useTheme(props.theme);
    const altTheme = useAltTheme();

    return <ActivityIndicator {...props} theme={theme.dark ? Object.assign({}, altTheme, props.theme) : {}} />;
};
