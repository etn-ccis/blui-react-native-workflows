import React from 'react';
import { StyleProp, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { ExtendedTheme, useExtendedTheme } from '@brightlayer-ui/react-native-themes';
import Icon from 'react-native-vector-icons/MaterialIcons';

export type ErrorMessageBoxProps = {
    /**
     * The text to show in the title
     */
    title: string;
    /**
     * The text to show in the message
     */
    errorMessage: string;

    /**
     * The background color of the message box
     */
    backgroundColor?: string;

    /**
     * Boolean whether the message box can be dismissed
     * @default true
     */
    dismissible?: boolean;

    /**
     * The font color of the text inside the message box
     */
    fontColor?: string;

    /**
     * The function to call when the close button is clicked
     * @returns void
     */
    onClose?: () => void;

    /**
     * Styles passed to the underlying root component
     */
    style?: StyleProp<ViewStyle>;
};

/**
 * Component that renders a basic message box with an error message and a configurable dismiss button.
 *
 * @param text to show as the title
 * @param errorMessage text to show in the message
 * @param backgroundColor the background color of the message box
 * @param dismissible whether the message box can be dismissed
 * @param fontColor the font color of the text inside the message box
 * @param onClose function to call when the close button is clicked
 * @param style styles passed to the underlying root component
 *
 * @category Component
 */

const makeStyles = (
    theme: ExtendedTheme,
    props: ErrorMessageBoxProps
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
            flexDirection: 'row-reverse',
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

export const ErrorMessageBox = (props: ErrorMessageBoxProps): JSX.Element => {
    const { title, errorMessage, dismissible = true, onClose = (): void => {}, style } = props;
    const theme = useExtendedTheme();
    const defaultStyles = makeStyles(theme, props);

    return (
        <View style={[defaultStyles.errorMessageBox, style]}>
            {dismissible && (
                <Icon
                    name={'close'}
                    size={20}
                    style={[defaultStyles.icon]}
                    onPress={(): void => {
                        onClose();
                    }}
                />
            )}
            <View>
                <Text style={[defaultStyles.title]} variant="titleSmall">
                    {title}
                </Text>
                <Text style={[defaultStyles.message]} variant="bodySmall">
                    {errorMessage}
                </Text>
            </View>
        </View>
    );
};
