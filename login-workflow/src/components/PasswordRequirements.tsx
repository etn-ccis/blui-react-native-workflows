/**
 * @packageDocumentation
 * @module Components
 */

import React from 'react';

import { View, StyleProp, ViewStyle } from 'react-native';

// Components
import { RequirementCheck } from '../components/RequirementCheck';

// Shared Auth Logic
import {
    // Constants
    SPECIAL_CHAR_REGEX,
    LENGTH_REGEX,
    NUMBERS_REGEX,
    UPPER_CASE_REGEX,
    LOWER_CASE_REGEX,
    // Types
    PasswordRequirement,
    // Hooks
    useInjectedUIContext,
    useLanguageLocale,
} from '@brightlayer-ui/react-auth-shared';

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
            description: t('blui:PASSWORD_REQUIREMENTS.LENGTH'),
        },
        {
            regex: NUMBERS_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.NUMBERS'),
        },
        {
            regex: UPPER_CASE_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.UPPER'),
        },
        {
            regex: LOWER_CASE_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.LOWER'),
        },
        {
            regex: SPECIAL_CHAR_REGEX,
            description: t('blui:PASSWORD_REQUIREMENTS.SPECIAL'),
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
