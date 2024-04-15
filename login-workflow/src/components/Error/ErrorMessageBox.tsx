import React from 'react';
import { View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ErrorMessageBoxProps } from './types';

const makeStyles = (
    theme: ExtendedTheme,
    props: ErrorMessageBoxProps,
    dismissible: boolean
): StyleSheet.NamedStyles<{
    errorMessageBox: ViewStyle;
    title: TextStyle;
    message: TextStyle;
    icon: TextStyle;
}> =>
    StyleSheet.create({
        errorMessageBox: {
            width: '100%',
            backgroundColor: props.backgroundColor || theme.colors.error,
            borderRadius: 16,
            padding: 16,
            marginVertical: 8,
            display: 'flex',
            flexDirection: dismissible ? 'row-reverse' : undefined,
            justifyContent: 'space-between',
        },
        title: {
            color: props.fontColor || theme.colors.onError,
        },
        message: {
            color: props.fontColor || theme.colors.onError,
        },
        icon: {
            color: props.fontColor || theme.colors.onError,
        },
    });

/**
 * Component that renders a basic message box with an error message and a configurable dismiss button
 *
 * @param {ErrorMessageBoxProps} props - Props of Error Message Box
 *
 * @category Component
 */
export const ErrorMessageBox = (props: ErrorMessageBoxProps): JSX.Element => {
    const { title, errorMessage, dismissible = true, onClose = (): void => {}, style } = props;
    const theme = useExtendedTheme();
    const defaultStyles = makeStyles(theme, props, dismissible);

    return (
        <View style={[defaultStyles.errorMessageBox, style]}>
            {dismissible && (
                <Icon
                    testID="blui-error-message-box-close-icon"
                    name={'close'}
                    size={20}
                    style={[defaultStyles.icon]}
                    onPress={(): void => {
                        onClose();
                    }}
                />
            )}
            <View>
                <Text style={[defaultStyles.title]} variant="titleMedium">
                    {title}
                </Text>
                <Text style={[defaultStyles.message]} variant="bodyMedium">
                    {errorMessage}
                </Text>
            </View>
        </View>
    );
};
