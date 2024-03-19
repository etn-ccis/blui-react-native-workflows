import React, { useCallback, useRef, useState } from 'react';
import { useAuthContext, ChangePasswordDialogBase, ChangePasswordDialogProps, PasswordRequirement} from '@brightlayer-ui/react-native-auth-workflow';
import { useTranslation } from 'react-i18next';
import { LENGTH_REGEX, LOWER_CASE_REGEX, NUMBERS_REGEX, SPECIAL_CHAR_REGEX, UPPER_CASE_REGEX } from './CreatePasswordScreenBaseExample';
export const defaultPasswordRequirements = (t: (input: string) => string): PasswordRequirement[] => [
    {
        regex: LENGTH_REGEX,
        description: t('bluiCommon:PASSWORD_REQUIREMENTS.LENGTH'),
    },
    {
        regex: NUMBERS_REGEX,
        description: t('bluiCommon:PASSWORD_REQUIREMENTS.NUMBERS'),
    },
    {
        regex: UPPER_CASE_REGEX,
        description: t('bluiCommon:PASSWORD_REQUIREMENTS.UPPER'),
    },
    {
        regex: LOWER_CASE_REGEX,
        description: t('bluiCommon:PASSWORD_REQUIREMENTS.LOWER'),
    },
    {
        regex: SPECIAL_CHAR_REGEX,
        description: t('bluiCommon:PASSWORD_REQUIREMENTS.SPECIAL'),
    },
];

/**
 * Component that renders a dialog with textField to enter current password and a change password form with a new password and confirm password inputs.
 * It includes callbacks so you can respond to changes in the inputs.
 *
 * @param dialogTitle title to display in the dialog
 * @param dialogDescription description to display in the dialog
 * @param currentPasswordLabel label to display for the current password field
 * @param previousLabel label to display for the previous button
 * @param nextLabel label to display for the next button
 * @param currentPasswordChange called when the current password field changes
 * @param enableButton boolean to enable and disable the button
 * @param onFinish function called when the button is clicked on success screen
 * @param onSubmit Callback function to call when the form is submitted
 * @param onPrevious called when the previous button is clicked
 * @param loading boolean that indicates whether the loading spinner should be displayed
 * @param currentPasswordTextFieldProps props to pass to the current password field.
 * @param showSuccessScreen boolean that determines whether to show the success screen or not
 * @param slots used for ChangePasswordDialog SuccessScreen props
 * @param slotProps props that will be passed to the SuccessScreen component
 *
 * @category Component
 */

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = (props) => {
    const { t } = useTranslation();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const {
        visible,
        dialogTitle = t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        dialogDescription = t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        previousLabel = t('bluiCommon:ACTIONS.BACK'),
        nextLabel = t('bluiCommon:ACTIONS.OKAY'),
        onPrevious,
        onFinish,
        PasswordProps,
        ErrorDialogProps,
        loading = false,
        currentPasswordTextInputProps,
        slots = {},
        slotProps = {},
    } = props;

    const [currentInput, setCurrentInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(loading);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { actions } = useAuthContext();

    const passwordRequirements = defaultPasswordRequirements(t);

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const areValidMatchingPasswords = useCallback((): boolean => {
        if (PasswordProps?.passwordRequirements?.length === 0) {
            return confirmInput === passwordInput;
        }
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [PasswordProps?.passwordRequirements?.length, passwordRequirements, passwordInput, confirmInput]);

    const checkPasswords =
        currentInput !== '' && passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords();

    const changePasswordSubmit = useCallback(async () => {
        if (checkPasswords) {
            try {
                setIsLoading(true);
                await actions.changePassword(currentInput, passwordInput);
                if (props.showSuccessScreen === false) {
                    onFinish?.();
                }
                setShowSuccessScreen(true);
            } catch {
                setShowErrorDialog(true);
            } finally {
                setIsLoading(false);
            }
        }
    }, [
        checkPasswords,
        currentInput,
        passwordInput,
        actions,
        setIsLoading,
        setShowErrorDialog,
        onFinish,
        props.showSuccessScreen,
    ]);

    const passwordProps = {
        newPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.NEW_PASSWORD'),
        confirmPasswordLabel: t('bluiAuth:CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD'),
        passwordRef,
        confirmRef,
        initialNewPasswordValue: passwordInput,
        initialConfirmPasswordValue: confirmInput,
        passwordRequirements,
        passwordNotMatchError: t('bluiCommon:FORMS.PASS_MATCH_ERROR'),
        ...PasswordProps,
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
            PasswordProps?.onPasswordChange?.(passwordData);
        },
        onSubmit: async (): Promise<void> => {
            await changePasswordSubmit();
            PasswordProps?.onSubmit?.();
        },
    };

    const errorDialogProps = {
        open: showErrorDialog,
        title: t('bluiCommon:MESSAGES.ERROR'),
        body: t('bluiAuth:CHANGE_PASSWORD.PROBLEM_OCCURRED'),
        dismissButtonText: t('bluiCommon:ACTIONS.OKAY'),
        ...ErrorDialogProps,
        onClose: (): void => setShowErrorDialog(false),
    };

    return (
        <ChangePasswordDialogBase
            visible={visible}
            loading={isLoading}
            dialogTitle={dialogTitle}
            dialogDescription={dialogDescription}
            currentPasswordLabel={currentPasswordLabel}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            currentPasswordChange={(currentPwd): void => {
                setCurrentInput(currentPwd);
                props?.currentPasswordChange?.(currentPwd);
            }}
            enableButton={checkPasswords}
            onPrevious={onPrevious}
            PasswordProps={passwordProps}
            ErrorDialogProps={errorDialogProps}
            currentPasswordTextInputProps={currentPasswordTextInputProps}
            onSubmit={async (): Promise<void> => {
                await changePasswordSubmit();
            }}
            slots={slots}
            slotProps={{
                SuccessScreen: {
                    icon: { family: 'material', name: 'check-circle' },
                    messageTitle: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                    message: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    onDismiss: (): void => {
                        onFinish?.();
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            onFinish?.();
                        },
                    },
                    ...slotProps.SuccessScreen,
                },
            }}
            showSuccessScreen={showSuccessScreen}
        />
    );
};
