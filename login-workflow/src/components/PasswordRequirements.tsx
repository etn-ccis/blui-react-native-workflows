/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

import { View, StyleProp, ViewStyle } from 'react-native';
import { useLanguageLocale } from '../hooks/language-locale-hooks';
import {
    SPECIAL_CHAR_REGEX,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
} from '../constants/index';

// Components
import { RequirementCheck } from '../components/RequirementCheck';
import { useInjectedUIContext } from '../contexts/AuthUIContextProvider';
import { PasswordRequirement } from '../types/ResetPasswordParams';

/**
 * @param passwordText  The password to be used for checking.
 * @param style  (Optional) Custom style to style the password requirements.
 */
type PasswordRequirementsProps = {
    passwordText: string;
    style?: StyleProp<ViewStyle>;
};

/**
 * Creates a view to be shown under a password input field. Shows indication
 * if the password meets a number of validation checks: hasValidLength, hasValidNumbers,
 * hasValidUpperCase, hasValidLowerCase, and hasValidSpecialCharacters.
 *
 * @category Component
 */
export const PasswordRequirements = (props: PasswordRequirementsProps): JSX.Element => {
    const { t } = useLanguageLocale();
    const defaultRequirements: PasswordRequirement[] = [
        {
            regex: LENGTH_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LENGTH'),
        },
        {
            regex: NUMBERS_REGEX,
            description: t('PASSWORD_REQUIREMENTS.NUMBERS'),
        },
        {
            regex: UPPER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.UPPER'),
        },
        {
            regex: LOWER_CASE_REGEX,
            description: t('PASSWORD_REQUIREMENTS.LOWER'),
        },
        {
            regex: SPECIAL_CHAR_REGEX,
            description: t('PASSWORD_REQUIREMENTS.SPECIAL'),
        },
    ];

    const { passwordRequirements = defaultRequirements } = useInjectedUIContext();

    return (
        <View style={props.style}>
            {passwordRequirements.map((req, ind) => (
                <RequirementCheck
                    key={`password_requirement_${ind}`}
                    text={req.description}
                    isChecked={new RegExp(req.regex).test(props.passwordText)}
                />
            ))}
        </View>
    );
};
