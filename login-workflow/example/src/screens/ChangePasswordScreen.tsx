import React, { useCallback, useRef, useState } from 'react';
import {
    useAuthContext,
    ChangePasswordScreenBase,
    ChangePasswordScreenProps,
    PasswordRequirement,
} from '@brightlayer-ui/react-native-auth-workflow';
import { useTranslation } from 'react-i18next';

export const SPECIAL_CHAR_REGEX = /[!"#$%&'()*+,-._/:;<=>?@[\]^`{|}~]+/;
export const LENGTH_REGEX = /^.{8,16}$/;
export const NUMBERS_REGEX = /[0-9]+/;
export const UPPER_CASE_REGEX = /[A-Z]+/;
export const LOWER_CASE_REGEX = /[a-z]+/;
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

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = (props) => {
    const { t } = useTranslation();
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const {
        currentPasswordLabel = t('bluiCommon:LABELS.CURRENT_PASSWORD'),
        PasswordProps,
        WorkflowCardBaseProps,
        WorkflowCardHeaderProps,
        WorkflowCardInstructionProps,
        WorkflowCardActionsProps,
        currentPasswordTextInputProps,
        onFinish,
        slots = {},
        slotProps = {},
    } = props;

    const [currentInput, setCurrentInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);
    const { actions, navigate } = useAuthContext();

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
            } catch (_error) {
                // TODO: Add error handling using triggerError, when moved to library
                // eslint-disable-next-line no-console
                console.log(_error as Error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [checkPasswords, currentInput, passwordInput, actions, setIsLoading, onFinish, props.showSuccessScreen]);

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

    const onNext = async (): Promise<void> => {
        await changePasswordSubmit();
    };

    const workflowCardBaseProps = {
        loading: isLoading,
        ...WorkflowCardBaseProps,
    };

    const workflowCardHeaderProps = {
        title: t('bluiAuth:CHANGE_PASSWORD.PASSWORD'),
        onIconPress: () => navigate(-1),
        ...WorkflowCardHeaderProps,
    };

    const workflowCardInstructionProps = {
        instructions: t('bluiAuth:CHANGE_PASSWORD.PASSWORD_INFO'),
        ...WorkflowCardInstructionProps,
    };

    const workflowCardActionsProps = {
        showNext: true,
        nextLabel: t('bluiCommon:ACTIONS.OKAY'),
        showPrevious: true,
        previousLabel: t('bluiCommon:ACTIONS.BACK'),
        canGoPrevious: true,
        canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
        ...WorkflowCardActionsProps,
        onNext: (): void => {
            void onNext();
            WorkflowCardActionsProps?.onNext?.();
        },
        onPrevious: (): void => {
            WorkflowCardActionsProps?.onPrevious?.();
        },
    };

    return (
        <ChangePasswordScreenBase
            WorkflowCardBaseProps={workflowCardBaseProps}
            WorkflowCardHeaderProps={workflowCardHeaderProps}
            WorkflowCardInstructionProps={workflowCardInstructionProps}
            WorkflowCardActionsProps={workflowCardActionsProps}
            currentPasswordLabel={currentPasswordLabel}
            currentPasswordChange={(currentPwd): void => {
                setCurrentInput(currentPwd);
                props?.currentPasswordChange?.(currentPwd);
            }}
            enableButton={checkPasswords}
            PasswordProps={passwordProps}
            currentPasswordTextInputProps={currentPasswordTextInputProps}
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
