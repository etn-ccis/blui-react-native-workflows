import { StyleProp, ViewStyle } from 'react-native';

export type AuthError = { cause: { title: string; errorMessage: string } };

export type ErrorManagerProps = {
    /**
     * @param {string} [mode='dialog' | 'message-box' | 'none'='dialog'] - Determines whether to display a dialog, a message box, or neither
     *
     */
    mode?: 'dialog' | 'message-box' | 'none';

    /**
     * @param {string} [title] - Title to display in message box and dialog
     *
     */
    title?: string;

    /**
     * @param {() => void} [onClose] - on press functionality for the icon
     * @returns void
     */
    onClose?: () => void;

    /**
     * @param {string} [error] - The error text to display
     *
     */
    error?: string;

    /**
     * Configuration options when using mode='dialog'
     * @param {string} [dialogConfig.title='t('bluiCommon:MESSAGES.ERROR')'] - The title used in the dialog header
     * @param {string} [dialogConfig.dismissLabel='t('bluiCommon:ACTIONS.CLOSE')'] - The label on the dismiss button
     * @param {StyleProp<ViewStyle>} style - Apply style to dialog
     */
    dialogConfig?: {
        dismissLabel?: string;
        title?: string;
        style?: StyleProp<ViewStyle>;
    };
    /**
     * Configuration options when using mode='message-box'
     * @param {string} [messageBoxConfig.title='t('bluiCommon:MESSAGES.ERROR')'] - The title used in the dialog header
     * @param {boolean} [messageBoxConfig.dismissible=true] - The label on the dismiss button
     * @param {string} [messageBoxConfig.position='top'] - Determines whether the message box should be displayed before or after children elements
     * @param {string} [messageBoxConfig.fontColor='error.contrastText'] - The font color of the text inside the message box.
     * @param {string} [messageBoxConfig.backgroundColor='error.main'] - The background color of the message box
     * @param {StyleProp<ViewStyle>} [style] - Apply style to message box
     */
    messageBoxConfig?: {
        title?: string;
        dismissible?: boolean;
        position?: 'top' | 'bottom';
        fontColor?: string;
        backgroundColor?: string;
        style?: StyleProp<ViewStyle>;
    };
    /**
     * @param {React.ReactNode} children - Message box errors will appear before or after content passed as children
     *
     */
    children?: React.ReactNode;
};

export type ErrorMessageBoxProps = {
    /**
     * @param {string} title - The text to show in the title
     *
     */
    title: string;
    /**
     * @param {string} errorMessage - The text to show in the message
     *
     */
    errorMessage: string;
    /**
     * @param {string} [backgroundColor] - The background color of the message box
     *
     */
    backgroundColor?: string;

    /**
     *
     * @param {boolean} [dismissible=true] - Boolean whether the message box can be dismissed
     * @default true
     */
    dismissible?: boolean;

    /**
     *
     * @param {string} [fontColor] - The font color of the text inside the message box
     * @default true
     */
    fontColor?: string;

    /**
     * @param {() => void} [onClose] - The function to call when the close button is clicked
     * @returns {void}
     */
    onClose?: () => void;

    /**
     *
     * @param {StyleProp<ViewStyle>} [style] - Styles passed to the underlying root component
     */
    style?: StyleProp<ViewStyle>;
};
