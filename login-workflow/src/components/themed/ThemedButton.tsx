import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import { useAltTheme } from '../../contexts/AltThemeProvider/AltThemeProvider';

export const ThemedButton: typeof Button = (props) => {
    const theme = useTheme(props.theme);
    const altTheme = useAltTheme();
    return (
        <Button
            {...props}
            theme={props.mode === 'contained' && theme.dark ? Object.assign({}, altTheme, props.theme) : {}}
        />
    );
};
