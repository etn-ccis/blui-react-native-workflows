import { TFunction, TOptions } from 'i18next';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props of AuthError
 */
export type AuthError = {
    cause: { title: string; errorMessage: string; errorOptions?: TOptions; titleOptions?: TOptions };
};

/**
 * Props of ErrorManager Component that manages the display of error messages.
 *
 */
export type ErrorManagerProps = {
    /**
     * Determines whether to display a dialog, a message box, or neither
     * @default 'dialog'
     */
    mode?: 'dialog' | 'message-box' | 'none';

    /**
     * Title to display in message box and dialog
     *
     */
    title?: string;

    /**
     * Function to call when the close/dismiss button is clicked
     * @returns {void}
     */
    onClose?: () => void;

    /**
     * Error text to display. If string is empty, the error will not be shown
     *
     */
    error?: string;

    /**
     * Interpolate string with a dynamic value to pass values using t function for message
     */
    errorOptions?: TOptions;

    /**
     * Interpolate string with a dynamic value to pass values using t function for title
     */
    titleOptions?: TOptions;

    /**
     * Translate function to translate error related text
     */
    t?: TFunction;

    /**
     * Configuration options when using mode='dialog'
     */
    dialogConfig?: {
        /**
         * Label to show in the close button
         * @default t('bluiCommon:ACTIONS.CLOSE')
         */
        dismissLabel?: string;
        /**
         * Text to show in the title of the dialog
         * @default t('bluiCommon:MESSAGES.ERROR')
         */
        title?: string;
        /**
         * Style overrides object
         *
         */
        style?: StyleProp<ViewStyle>;
    };

    /**
     * Configuration options when using mode='message-box'
     */
    messageBoxConfig?: {
        /**
         * The title used in the dialog header
         * @default t('bluiCommon:MESSAGES.ERROR')
         */
        title?: string;

        /**
         * The label on the dismiss button
         * @default true
         */
        dismissible?: boolean;

        /**
         * Determines whether the message box should be displayed before or after children elements
         * @default 'top'
         */
        position?: 'top' | 'bottom';

        /**
         * The font color of the text inside the message box.
         * @default error.contrastText
         */
        fontColor?: string;

        /**
         * The background color of the message box
         * @default error.main
         */
        backgroundColor?: string;

        /**
         * Apply style to message box
         */
        style?: StyleProp<ViewStyle>;
    };

    /**
     * Message box errors will appear before or after content passed as children
     */
    children?: React.ReactNode;
};

/**
 * Props of ErrorMessageBox to error messages.
 *
 */
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
     * @default theme.colors.error
     */
    backgroundColor?: string;

    /**
     *
     * Boolean whether the message box can be dismissed
     * @default true
     */
    dismissible?: boolean;

    /**
     *
     * The font color of the text inside the message box
     * @default theme.colors.onError
     */
    fontColor?: string;

    /**
     * The function to call when the close button is clicked
     * @returns {void}
     */
    onClose?: () => void;

    /**
     *
     * Styles passed to the underlying root component
     */
    style?: StyleProp<ViewStyle>;
};
