import React from 'react';
import { render, cleanup, RenderResult, screen, fireEvent } from '@testing-library/react-native';
import { ChangePasswordScreenBase } from '../../screens/ChangePasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@testing-library/react-native/extend-expect';

afterEach(cleanup);

describe('Change Password Screen Base', () => {
    const currentPasswordChange = jest.fn();
    const renderer = (): RenderResult =>
        render(
            <SafeAreaProvider>
                <ChangePasswordScreenBase
                    WorkflowCardHeaderProps={{ title: 'Change Password' }}
                    currentPasswordLabel="Current Password"
                    currentPasswordChange={currentPasswordChange}
                    PasswordProps={{
                        onPasswordChange: (): void => {},
                        newPasswordLabel: 'New Password',
                        initialNewPasswordValue: '',
                        confirmPasswordLabel: 'Confirm Password',
                        initialConfirmPasswordValue: '',
                        passwordRequirements: [],
                        passwordRef: undefined,
                        confirmRef: undefined,
                        onSubmit: function (): void {
                            throw new Error('Function not implemented.');
                        },
                    }}
                />
            </SafeAreaProvider>
        );

    it('renders without crashing', () => {
        expect(renderer).toBeTruthy();
    });

    it('should display the password fields', () => {
        renderer();

        const currentPasswordInput = screen.getAllByText('Current Password')[0];
        const passwordInput = screen.getByTestId('blui-set-password-password-text-field');
        const confirmInput = screen.getByTestId('blui-set-password-confirm-password-text-field');

        expect(currentPasswordInput).toBeOnTheScreen();
        expect(passwordInput).toBeOnTheScreen();
        expect(confirmInput).toBeOnTheScreen();
    });

    it('input onChange callBack', () => {
        renderer();

        const currentPasswordInput = screen.getByTestId('blui-change-password-current-password-text-field');
        fireEvent.changeText(currentPasswordInput, 'Password@123A');
        expect(currentPasswordInput).toHaveDisplayValue('Password@123A');
    });
});
