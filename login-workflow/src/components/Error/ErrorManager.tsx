import React, { useCallback } from 'react';
import { BasicDialog } from '../Dialog/BasicDialog';
import { ErrorMessageBox } from './ErrorMessageBox';
import { ErrorManagerProps } from './types';

/**
 * Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither
 *
 * @param {ErrorManagerProps} props - Props of Error Manager
 *
 * @category Component
 */

export const ErrorManager: React.FC<React.PropsWithChildren<ErrorManagerProps>> = (props) => {
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
        t = (key: string): string => key,
    } = props;

    const ErrorDialogWithProps = useCallback(
        (): JSX.Element => (
            <BasicDialog
                testID="basic-dialog"
                open={error.length > 0}
                title={t(dialogConfig?.title ?? title ?? 'Error')}
                body={t(error)}
                onDismiss={onClose}
                dismissButtonText={t(dialogConfig?.dismissLabel ?? 'Okay')}
                style={dialogConfig?.style}
            />
        ),
        [dialogConfig, title, error, onClose, t]
    );

    const ErrorMessageBoxWithProps = useCallback((): JSX.Element => {
        const { dismissible = true, fontColor, backgroundColor, style } = messageBoxConfig;

        return (
            <ErrorMessageBox
                title={t(messageBoxConfig?.title ?? title ?? 'Error')}
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
