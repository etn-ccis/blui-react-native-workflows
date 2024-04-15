import React from 'react';
import { AuthContextProvider, ResetPasswordScreen } from '@brightlayer-ui/react-native-auth-workflow';
import { useApp } from '../contexts/AppContextProvider';
import { useNavigation } from '@react-navigation/native';
import { ProjectAuthUIActions } from '../actions/AuthUIActions';
import i18nAppInstance from '../../translations/i18n';

type PasswordRequirement = {
    /**
     * The description of the password requirement
     */
    description: string;

    /**
     * The regex to validate the password
     */
    regex: RegExp;
};

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

export const ResetPasswordScreenBaseExample: React.FC = () => {
    const app = useApp();
    const navigation = useNavigation();
    // const { t } = useTranslation();

    // const [passwordInput, setPasswordInput] = useState('');
    // const [confirmInput, setConfirmInput] = useState('');
    // const [showSuccess, setShowSuccess] = useState(false);
    // const passwordRef = useRef(null);
    // const confirmRef = useRef(null);

    // const updateFields = useCallback(
    //     (fields: { password: string; confirm: string }) => {
    //         setPasswordInput(fields.password);
    //         setConfirmInput(fields.confirm);
    //     },
    //     [setPasswordInput, setConfirmInput]
    // );

    // const passwordReqs = defaultPasswordRequirements(t);

    // const areValidMatchingPasswords = useCallback((): boolean => {
    //     if (passwordReqs?.length === 0) {
    //         return confirmInput === passwordInput;
    //     }
    //     for (let i = 0; i < passwordReqs.length; i++) {
    //         if (!new RegExp(passwordReqs[i].regex).test(passwordInput)) return false;
    //     }
    //     return confirmInput === passwordInput;
    // }, [passwordReqs, passwordInput, confirmInput]);

    return (
        <AuthContextProvider
            language={app.language}
            actions={ProjectAuthUIActions(app)}
            i18n={i18nAppInstance}
            navigate={(destination: -1 | string) => {
                if (typeof destination === 'string') {
                    navigation.navigate(destination);
                } else {
                    navigation.goBack();
                }
            }}
            routeConfig={{
                LOGIN: 'Home',
                FORGOT_PASSWORD: undefined,
                RESET_PASSWORD: undefined,
                REGISTER_INVITE: undefined,
                REGISTER_SELF: undefined,
                SUPPORT: undefined,
            }}
        >
            {/* <ResetPasswordScreenBase
                WorkflowCardHeaderProps={{
                    title: 'Reset Password',
                    onIconPress: () => navigation.navigate('Home'),
                }}
                WorkflowCardInstructionProps={{
                    instructions:
                        'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
                }}
                WorkflowCardActionsProps={{
                    showPrevious: true,
                    previousLabel: 'Back',
                    showNext: true,
                    nextLabel: 'Next',
                    canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
                    totalSteps: 0,
                    onPrevious: () => navigation.navigate('Home'),
                    onNext: () => setShowSuccess(true),
                }}
                PasswordProps={{
                    passwordRef,
                    confirmRef,
                    onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
                        updateFields(passwordData);
                    },
                    onSubmit: (): void => {
                        if (areValidMatchingPasswords()) {
                            setShowSuccess(true);
                        }
                    },
                }}
                SuccessScreenProps={{
                    EmptyStateProps: {
                        icon: { name: 'check-circle' },
                        title: t('bluiAuth:PASSWORD_RESET.SUCCESS_MESSAGE'),
                        description: t('bluiAuth:CHANGE_PASSWORD.SUCCESS_MESSAGE'),
                    },
                    WorkflowCardActionsProps: {
                        showPrevious: false,
                        fullWidthButton: true,
                        showNext: true,
                        nextLabel: t('bluiCommon:ACTIONS.DONE'),
                        onNext: (): void => {
                            navigation.navigate('Home');
                            setShowSuccess(false);
                        },
                    },
                }}
                showSuccessScreen={showSuccess}
            /> */}
            <ResetPasswordScreen />
        </AuthContextProvider>
    );
};
