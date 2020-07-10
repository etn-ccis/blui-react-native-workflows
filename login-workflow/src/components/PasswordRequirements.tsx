/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

import { View, StyleProp, ViewStyle } from 'react-native';
import { useLanguageLocale } from '@pxblue/react-auth-logic';
import {
    SPECIAL_CHAR_REGEX,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
} from '@pxblue/react-auth-logic';

// Components
import { RequirementCheck } from '../components/RequirementCheck';
import { useInjectedUIContext } from '@pxblue/react-auth-logic';
import { PasswordRequirement } from '@pxblue/react-auth-logic';

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
export const PasswordRequirements: React.FC<PasswordRequirementsProps> = (props) => {
    const { passwordText, style } = props;
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
        <View style={style}>
            {passwordRequirements.map((req, ind) => (
                <RequirementCheck
                    key={`password_requirement_${ind}`}
                    text={req.description}
                    isChecked={new RegExp(req.regex).test(passwordText)}
                />
            ))}
        </View>
    );
};
