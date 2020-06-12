/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

/**
 * @param visible  If the dialog box should be shown.
 * @param onDismiss  The function to handle the on dismiss action.
 * @param title  The title text of the dialog box.
 * @param bodyText  The body text of the dialog box.
 */
type SimpleDialogProps = {
    visible: boolean;
    onDismiss: Function;
    title: string;
    bodyText: string | null;
};

/**
 * Creates a simple acknowledgement dialog box (with one button, "Okay").
 *
 * @category Component
 */
export const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
    const { visible, onDismiss, title, bodyText } = props;
    const { t } = useLanguageLocale();
    return (
        <Portal>
            <Dialog visible={visible} dismissable={false}>
                {/* 
                // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{bodyText ?? t('MESSAGES.REQUEST_ERROR')}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    {/* 
                    // @ts-ignore waiting for 4.0.0 of react-native-paper to fix these typings https://github.com/callstack/react-native-paper/issues/1920 */}
                    <Button
                        uppercase={false}
                        onPress={(): void => {
                            onDismiss();
                        }}
                    >
                        {t('ACTIONS.OKAY')}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
