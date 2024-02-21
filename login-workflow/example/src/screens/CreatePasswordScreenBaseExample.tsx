import React, { useCallback, useState } from 'react';
import { CreatePasswordScreenBase } from '@brightlayer-ui/react-native-auth-workflow';

export const SPECIAL_CHAR_REGEX = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/;
export const LENGTH_REGEX = /^.{8,16}$/;
export const NUMBERS_REGEX = /[0-9]+/;
export const UPPER_CASE_REGEX = /[A-Z]+/;
export const LOWER_CASE_REGEX = /[a-z]+/;

export const passwordRequirements = [
    {
        regex: LENGTH_REGEX,
        description: 'minimum 8 and maximum 16 characters',
    },
    {
        regex: NUMBERS_REGEX,
        description: 'should include numbers',
    },
    {
        regex: UPPER_CASE_REGEX,
        description: 'should include capital letter',
    },
    {
        regex: LOWER_CASE_REGEX,
        description: 'should include small letter',
    },
    {
        regex: SPECIAL_CHAR_REGEX,
        description: 'should include special characters',
    },
];
const CreatePasswordScreenBaseExample: React.FC<React.PropsWithChildren> = () => {
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');

    const updateFields = useCallback(
        (fields: { password: string; confirm: string }) => {
            setPasswordInput(fields.password);
            setConfirmInput(fields.confirm);
        },
        [setPasswordInput, setConfirmInput]
    );

    const areValidMatchingPasswords = useCallback((): boolean => {
        if (passwordRequirements?.length === 0) {
            return confirmInput === passwordInput;
        }
        for (let i = 0; i < passwordRequirements.length; i++) {
            if (!new RegExp(passwordRequirements[i].regex).test(passwordInput)) return false;
        }
        return confirmInput === passwordInput;
    }, [passwordInput, confirmInput]);

    const passwordProps = {
        onPasswordChange: (passwordData: { password: string; confirm: string }): void => {
            updateFields(passwordData);
        },
    };

    return (
        <CreatePasswordScreenBase
            WorkflowCardHeaderProps={{
                title: 'Create Password',
            }}
            WorkflowCardInstructionProps={{
                instructions:
                    'Please select a password. Make sure that your password meets the necessary complexity requirements outlined below.',
            }}
            WorkflowCardActionsProps={{
                showPrevious: true,
                showNext: true,
                canGoPrevious: true,
                canGoNext: passwordInput !== '' && confirmInput !== '' && areValidMatchingPasswords(),
                previousLabel: 'Back',
                nextLabel: 'Next',
            }}
            PasswordProps={passwordProps}
        />
    );
};

export default CreatePasswordScreenBaseExample;
