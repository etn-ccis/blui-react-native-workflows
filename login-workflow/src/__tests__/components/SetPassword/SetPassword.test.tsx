import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import { SetPassword } from 'src/components';
import PasswordRequirements from 'src/components/SetPassword/PasswordRequirements';
import { PasswordRequirementsCheck } from 'src/components/SetPassword/PasswordRequirementsCheck';
import { PasswordTextField } from 'src/components/SetPassword/PasswordTextField';

describe('Set Password Test', () => {
    it('renders with initial props', () => {
        render(<SetPassword />);
        expect(render).toBeTruthy();
    });
    it('renders with custom props', () => {
        const onSubmitMock = jest.fn();
        const { getByTestId } = render(
            <SetPassword
                passwordTextFieldProps={{ onChangeText: jest.fn() }}
                confirmPasswordTextFieldProps={{ onChangeText: jest.fn() }}
                initialNewPasswordValue="password123"
                initialConfirmPasswordValue="password123"
                passwordRequirements={[
                    { regex: /^.{8,}$/, description: 'Password must be at least 8 characters long' },
                ]}
                onSubmit={onSubmitMock}
                passwordNotMatchError="Passwords do not match"
            />
        );

        const passwordInput = getByTestId('blui-set-password-password-text-field');
        const confirmInput = getByTestId('blui-set-password-confirm-password-text-field');
        fireEvent.changeText(passwordInput, 'Password@123');
        fireEvent.changeText(confirmInput, 'Password@123');
        expect(render).toBeTruthy();
    });
    it('renders with custom props and failing passwordCondition', () => {
        const onSubmitMock = jest.fn();
        const passwordRef = { current: null };
        const confirmRef = { current: null };
        const { getByTestId } = render(
            <SetPassword
                passwordRef={passwordRef}
                confirmRef={confirmRef}
                initialNewPasswordValue="password123"
                initialConfirmPasswordValue="password123"
                passwordRequirements={[{ regex: /^.{8,}$/, description: 'check1' }]}
                onSubmit={onSubmitMock}
                passwordNotMatchError="Passwords do not match"
            />
        );

        const passwordInput = getByTestId('blui-set-password-password-text-field');
        const confirmInput = getByTestId('blui-set-password-confirm-password-text-field');
        fireEvent.changeText(passwordInput, 'Pass');
        fireEvent.changeText(confirmInput, 'Pass');
        expect(render).toBeTruthy();
    });
    it('PasswordRequirements renders correctly', () => {
        const rendered = render(<PasswordRequirements passwordText={'PasswordText'} />).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('RequirementsCheck renders correctly', () => {
        const rendered = render(<PasswordRequirementsCheck label={'text'} isChecked={true} />).toJSON();
        expect(rendered).toBeTruthy();
    });

    it('PasswordtextField toggles visibility', () => {
        const { getByTestId } = render(<PasswordTextField />);
        const toggleButton = getByTestId('blui-password-text-field-toggle-button');
        const textfield = getByTestId('blui-password-text-field');
        fireEvent.press(toggleButton);
        expect(textfield.props.secureTextEntry).toBe(false);
    });
});
