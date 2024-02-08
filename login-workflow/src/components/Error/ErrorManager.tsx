import React, { useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BasicDialog } from '../Dialog/BasicDialog';
import { ErrorMessageBox } from './ErrorMessageBox';
import { useTranslation } from 'react-i18next';

export type AuthError = { cause: { title: string; errorMessage: string } };

export type ErrorManagerProps = {
    /**
     * Determines whether to display a dialog, a message box, or neither
     */
    mode?: 'dialog' | 'message-box' | 'none';

    /**
     * Title to display in message box and dialog
     */
    title?: string;

    /**
     * The function to call when the close/dismiss button is clicked
     * @returns void
     */
    onClose?: () => void;

    /**
     * The error text to display
     */
    error?: string;

    /**
     * Configuration options when using mode='dialog'
     * @param {string} dialogConfig.title - The title used in the dialog header
     * @param {string} dialogConfig.dismissLabel - The label on the dismiss button.
     */
    dialogConfig?: {
        dismissLabel?: string;
        title?: string;
        style?: StyleProp<ViewStyle>;
    };
    messageBoxConfig?: {
        title?: string;
        dismissible?: boolean;
        position?: 'top' | 'bottom';
        fontColor?: string;
        backgroundColor?: string;
        style?: StyleProp<ViewStyle>;
    };
    children?: React.ReactNode;
};

/**
 * Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither.
 *
 * @param mode determines whether to display a dialog, a message box, or neither
 * @param onClose function to call when the close/dismiss button is clicked
 * @param error error text to display
 * @param dialogConfig configuration for the error dialog
 * @param dialogConfig.title text to show in the title of the dialog
 * @param dialogConfig.dismissLabel text to show in the close button
 * @param dialogConfig.style style styles passed to the underlying root(Dialog) component
 * @param messageBoxConfig configuration for the error message box
 * @param messageBoxConfig.dismissible whether the message box can be dismissed
 * @param messageBoxConfig.position determines whether the message box should be displayed at the top or bottom of the screen
 * @param messageBoxConfig.fontColor the font color of the text inside the message box
 * @param messageBoxConfig.backgroundColor the background color of the message box
 * @param messageBoxConfig.style style styles passed to the underlying root(Box) component
 *
 * @category Component
 */

export const ErrorManager: React.FC<React.PropsWithChildren<ErrorManagerProps>> = (props) => {
    const { t } = useTranslation();
    const {
        children,
        mode = 'dialog',
        title,
        error = '',
        onClose = (): void => {},
        dialogConfig,
        messageBoxConfig = {
            position: 'top',
        },
    } = props;

    const ErrorDialogWithProps = useCallback(
        (): JSX.Element => (
            <BasicDialog
                testID="basic-dialog"
                open={error.length > 0}
                title={dialogConfig?.title ?? title ?? t('bluiCommon:MESSAGES.ERROR')}
                body={t(error)}
                onDismiss={onClose}
                dismissButtonText={dialogConfig?.dismissLabel}
                style={dialogConfig?.style}
            />
        ),
        [dialogConfig, title, error, onClose, t]
    );

    const ErrorMessageBoxWithProps = useCallback((): JSX.Element => {
        const { dismissible = true, fontColor, backgroundColor, style } = messageBoxConfig;

        return (
            <ErrorMessageBox
                title={messageBoxConfig?.title ?? title ?? t('bluiCommon:MESSAGES.ERROR')}
                errorMessage={t(error)}
                dismissible={dismissible}
                style={style}
                backgroundColor={backgroundColor}
                fontColor={fontColor}
                onClose={onClose}
            />
        );
    }, [error, title, t, messageBoxConfig, onClose]);

    return mode === 'dialog' && error.length > 0 ? (
        <>
            {children}
            <ErrorDialogWithProps />
        </>
    ) : mode === 'message-box' && error.length > 0 ? (
        <>
            {messageBoxConfig.position !== 'bottom' && <ErrorMessageBoxWithProps />}
            {children}
            {messageBoxConfig.position === 'bottom' && <ErrorMessageBoxWithProps />}
        </>
    ) : (
        <>{children}</>
    );
};