import { DialogProps } from 'react-native-paper';

export type BasicDialogProps = Omit<DialogProps, 'visible' | 'children'> & {
    /**
     * @param {string} [title] - The title for the screen
     *
     */
    title?: string;

    /**
     * @param {string} [body] - The text to show in the main dialog body
     *
     */
    body?: string;

    /**
     * @param {() => void} [onDismiss] - The function to call when the close button is clicked
     *
     */
    onDismiss?: () => void;

    /**
     * @param {string} [dismissButtonText] - The text to show in the close button
     *
     */
    dismissButtonText?: string;

    /**
     * @param {boolean} [open=false] - Set the open / closed state of the dialog
     *
     */
    open?: boolean;
};
