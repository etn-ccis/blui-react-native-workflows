/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

// Components
import { Button, Paragraph, Dialog, Portal, Theme } from 'react-native-paper';

// Hooks
import { useLanguageLocale } from '../hooks/language-locale-hooks';

/**
 * @param isVisible  If the dialog box should be shown.
 * @param onDismiss  The function to handle the on dismiss action.
 * @param title  The title text of the dialog box.
 * @param bodyText  The body text of the dialog box.
 * @param theme (Optional) react-native-paper theme partial to style the component.
 */
type SimpleDialogProps = {
    isVisible: boolean;
    onDismiss: Function;
    title: string;
    bodyText: string | null;
    theme?: Theme;
};

/**
 * Creates a simple acknowledgement dialog box (with one button, "Okay").
 *
 * @category Component
 */
export const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
    const { t } = useLanguageLocale();
    return (
        <Portal>
            <Dialog visible={props.isVisible} dismissable={false}>
                <Dialog.Title>{props.title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{props.bodyText ?? t('MESSAGES.REQUEST_ERROR')}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        uppercase={false}
                        onPress={(): void => {
                            props.onDismiss();
                        }}
                    >
                        {t('ACTIONS.OKAY')}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};
