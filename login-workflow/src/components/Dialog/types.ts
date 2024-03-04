import { DialogProps } from 'react-native-paper';

export type BasicDialogProps = Omit<DialogProps, 'visible' | 'children'> & {
    /**
     * The title to display in the dialog
     */
    title?: string;

    /**
     * The content to display in the body of the dialog
     */
    body?: string;

    /**
     * The function to call when the close button is clicked
     * @returns {void}
     */
    onDismiss?: () => void;

    /**
     * The text to display in the close button.
     *
     */
    dismissButtonText?: string;

    /**
     * Set the open / closed state of the dialog
     */
    open?: boolean;
};
