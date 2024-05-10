import { MutableRefObject } from 'react';
import { ViewProps } from 'react-native';
import { TextInputProps } from 'react-native-paper';

/**
 * Props for dynamic password strength requirements.
 */
export type PasswordRequirement = {
    /**
     * The description of the password requirement
     */
    description: string;

    /**
     * The regex to validate the password
     */
    regex: RegExp;
};

/**
 * Props for PasswordRequirements component.
 */
export type PasswordRequirementsProps = ViewProps & {
    /**
     * The string to conduct the complexity checks against
     */
    passwordText: string;

    /**
     * Optional requirements to set password
     */
    passwordRequirements?: PasswordRequirement[];
};

/**
 * Props for PasswordRequirementsCheck component shows whether the status of the password matches the requirements.
 */
export type PasswordRequirementsCheckProps = {
    /**
     * True if the line item should have a blue check (false for gray)
     *
     */
    isChecked: boolean;

    /**
     * The text to display beside the check icon
     *
     */
    label: string;
};

/**
 * Props for SetPassword component that renders a change password form with a new password and confirm password inputs.
 */
export type SetPasswordProps = {
    /**
     * Function called when the new password or confirm new password fields value changes
     * @param {string} password - new password value
     * @param {string} confirm - confirm password value
     * @returns {void}
     */
    onPasswordChange?: (passwords: { password: string; confirm: string }) => void;

    /**
     * The label for the new password field
     */
    newPasswordLabel?: string;

    /**
     * The initial value for the new password field
     */
    initialNewPasswordValue?: string;

    /**
     * The label for the confirm password field
     */
    confirmPasswordLabel?: string;

    /**
     * The initial value for the confirm password
     */
    initialConfirmPasswordValue?: string;

    /**
     * A list of password complexity requirements
     */
    passwordRequirements?: PasswordRequirement[];

    /**
     * The ref to forward to the password input
     */
    passwordRef?: MutableRefObject<any>;

    /**
     * The ref to forward to the confirm password input
     */
    confirmRef?: MutableRefObject<any>;

    /**
     * The text for showing message when passwords do not match
     */
    passwordNotMatchError?: string;

    /**
     * The function to call when the form is submitted
     * @returns {void}
     */
    onSubmit?: () => void;

    /**
     * The props to pass to the password field.
     * See React Native Paper [TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/) for more details.
     */
    passwordTextFieldProps?: TextInputProps;

    /**
     * The props to pass to the confirm password field.
     * See React Native Paper [TextInputProps API](https://callstack.github.io/react-native-paper/docs/components/TextInput/) for more details.
     */
    confirmPasswordTextFieldProps?: TextInputProps;
};
