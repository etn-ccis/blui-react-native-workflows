import React from 'react';
import { Paragraph, Dialog, Portal, Button, DialogProps } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';

/**
 * Component that renders a basic dialog with a title, body description, and a close button.
 *
 * @param title to show text in the title
 * @param body text to show in the body
 * @param onClose function to call when the close button is clicked
 * @param props all other props will be spread to the underlying Dialog component
 * @param dismissButtonText text to show in the close button
 *
 * @category Component
 */

const makeStyles = (): StyleSheet.NamedStyles<{
    basicDialog: ViewStyle;
    actions: ViewStyle;
}> =>
    StyleSheet.create({
        basicDialog: {
            minWidth: 300,
            maxWidth: 600,
            alignSelf: 'center',
        },
        actions: {
            flexGrow: 0,
        },
    });

export type BasicDialogProps = Omit<DialogProps, 'visible' | 'children'> & {
    /**
     * The title for the screen
     */
    title?: string;

    /**
     * The text to show in the main dialog body
     */
    body?: string;

    /**
     * The function to call when the close button is clicked
     * @returns void
     */
    onDismiss?: () => void;

    /**
     * The text to show in the close button
     */
    dismissButtonText?: string;

    /**
     * Set the open / closed state of the dialog
     * @default false
     */
    open?: boolean;
};

export const BasicDialog: React.FC<BasicDialogProps> = (props) => {
    const { title, body, dismissButtonText, open = false, onDismiss, style, ...otherDialogProps } = props;
    const defaultStyles = makeStyles();

    return (
        <Portal>
            <Dialog visible={open} dismissable={false} style={[defaultStyles.basicDialog, style]} {...otherDialogProps}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{body}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions style={[defaultStyles.actions]}>
                    <Button
                        onPress={(): void => {
                            onDismiss?.();
                        }}
                    >
                        {dismissButtonText || 'Okay'}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
