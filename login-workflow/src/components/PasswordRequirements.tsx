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

    const hasValidLength = new RegExp(LENGTH_REGEX).test(props.passwordText);
    const hasValidNumbers = new RegExp(NUMBERS_REGEX).test(props.passwordText);
    const hasValidUpperCase = new RegExp(UPPER_CASE_REGEX).test(props.passwordText);
    const hasValidLowerCase = new RegExp(LOWER_CASE_REGEX).test(props.passwordText);
    const hasValidSpecialCharacters = new RegExp(SPECIAL_CHAR_REGEX).test(props.passwordText);

    return (
        <View style={props.style}>
            <RequirementCheck text={t('PASSWORD_REQUIREMENTS.LENGTH')} isChecked={hasValidLength} />
            <RequirementCheck text={t('PASSWORD_REQUIREMENTS.NUMBERS')} isChecked={hasValidNumbers} />
            <RequirementCheck text={t('PASSWORD_REQUIREMENTS.UPPER')} isChecked={hasValidUpperCase} />
            <RequirementCheck text={t('PASSWORD_REQUIREMENTS.LOWER')} isChecked={hasValidLowerCase} />
            <RequirementCheck text={t('PASSWORD_REQUIREMENTS.SPECIAL')} isChecked={hasValidSpecialCharacters} />
        </View>
    );
};
