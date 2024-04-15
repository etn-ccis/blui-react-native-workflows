import React from 'react';
import { Paragraph, Dialog, Portal, Button } from 'react-native-paper';
import { StyleSheet, ViewStyle } from 'react-native';
import { BasicDialogProps } from './types';

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

/**
 * Component that renders a basic dialog with a title, body description, and a close button.
 *
 * @param {BasicDialogProps} props - Basic props of Dialog
 *
 * @category Component
 */

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
                        testID="blui-basic-dialog-dismiss-button"
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
