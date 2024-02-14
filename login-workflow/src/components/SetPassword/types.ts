import { MutableRefObject } from 'react';
import { ViewProps } from 'react-native';
import { TextInputProps } from 'react-native-paper';

/**
 * Parameters for dynamic password strength requirements.
 */
export type PasswordRequirement = {
    /**
     * @param {string} description - The description of the password requirement
     *
     */
    description: string;

    /**
     * @param {RegExp} regex - The regex to validate the password
     *
     */
    regex: RegExp;
};

export type PasswordRequirementsProps = ViewProps & {
    /**
     * @param {string} passwordText - The string to conduct the complexity checks against
     *
     */
    passwordText: string;

    /**
     * @param {PasswordRequirement[]} [passwordRequirements] - Optional requirements to set password
     *
     */
    passwordRequirements?: PasswordRequirement[];
};

export type PasswordRequirementsCheckProps = {
    /**
     * @param {boolean} isChecked - True if the line item should have a blue check (false for gray)
     *
     */
    isChecked: boolean;

    /**
     * @param {string} label - The text to display beside the check icon
     *
     */
    label: string;
};

export type SetPasswordProps = {
    /**
     * Function called when the new password or confirm new password fields value changes
     * @param {string} password - new password value
     * @param {string} confirm - confirm password value
     * @returns void
     */
    onPasswordChange?: (passwords: { password: string; confirm: string }) => void;

    /**
     *
     * @param {string} [newPasswordLabel='Password'] - The label for the new password field
     */
    newPasswordLabel?: string;

    /**
     *
     * @param {string} [initialNewPasswordValue] - The initial value for the new password field
     */
    initialNewPasswordValue?: string;

    /**
     *
     * @param {string} [confirmPasswordLabel='Confirm'] - The label for the confirm password field
     */
    confirmPasswordLabel?: string;

    /**
     *
     * @param {string} [initialConfirmPasswordValue] - The initial value for the confirm password
     */
    initialConfirmPasswordValue?: string;

    /**
     *
     * @param {PasswordRequirement[]} [passwordRequirements] - A list of password complexity requirements
     */
    passwordRequirements?: PasswordRequirement[];

    /**
     *
     * @param {MutableRefObject<any>} [passwordRef] - The ref to forward to the password input
     */
    passwordRef?: MutableRefObject<any>;

    /**
     *
     * @param {MutableRefObject<any>} [confirmRef] - The ref to forward to the confirm password input
     */
    confirmRef?: MutableRefObject<any>;

    /**
     * The text for showing message when passwords do not match
     */
    passwordNotMatchError?: string;

    /**
     * @param {() => void} [onSubmit] - The function to call when the form is submitted
     * @returns void
     */
    onSubmit?: () => void;

    /**
     * @param {TextInputProps} [passwordTextFieldProps] - The props to pass to the password field.
     * See React Native Paper [TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/) for more details.
     */
    passwordTextFieldProps?: TextInputProps;

    /**
     * @param {TextInputProps} [confirmPasswordTextFieldProps] - The props to pass to the confirm password field.
     * See React Native Paper [TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/) for more details.
     */
    confirmPasswordTextFieldProps?: TextInputProps;
};
