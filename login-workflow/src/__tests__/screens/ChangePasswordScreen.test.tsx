import React from 'react';
import { cleanup, fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from '../../contexts';
import { authContextProviderProps } from '../../testUtils';
import { ChangePasswordScreen, ChangePasswordScreenProps } from '../../screens/ChangePasswordScreen';
import '@testing-library/react-native/extend-expect';

const passwordRequirements = [
    {
        description: 'Check 1',
        regex: /^.{3,5}$/,
    },
    {
        description: 'Check 2',
        regex: /[a-z]+/,
    },
];

afterEach(cleanup);

describe('Change Password tests', () => {
    let updateFields: any;
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        updateFields = jest.fn();
    });

    const renderer = (props?: ChangePasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <SafeAreaProvider>
                    <ChangePasswordScreen {...props} />
                </SafeAreaProvider>
            </AuthContextProvider>
        );

    it('renders without crashing', () => {
        renderer({
            currentPasswordLabel: 'Current Password',
        });
        const currentPasswordInput = screen.getAllByText('Current Password')[0];
        expect(currentPasswordInput).toBeOnTheScreen();
    });

    it('should display input field with passed prop', () => {
        renderer();
        const currentPasswordInput = screen.getByTestId('blui-change-password-current-password-text-field');
        expect(currentPasswordInput).toHaveDisplayValue('');
        fireEvent.changeText(currentPasswordInput, 'Abc@2023');
        expect(currentPasswordInput).toHaveDisplayValue('Abc@2023');
    });

    it('should display input fields with passed props', () => {
        renderer({
            PasswordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: updateFields,
                passwordRequirements: [],
            },
        });

        const newPasswordInput = screen.getByTestId('blui-set-password-password-text-field');
        expect(newPasswordInput).toHaveDisplayValue('');
        const confirmPasswordInput = screen.getByTestId('blui-set-password-confirm-password-text-field');
        expect(confirmPasswordInput).toHaveDisplayValue('');
        fireEvent.changeText(newPasswordInput, 'Abc@1234');
        expect(newPasswordInput).toHaveDisplayValue('Abc@1234');
        fireEvent.changeText(confirmPasswordInput, 'Abc@1234');
        expect(confirmPasswordInput).toHaveDisplayValue('Abc@1234');
    });

    it('should show success screen, when okay button is clicked', async () => {
        renderer({
            showSuccessScreen: true,
            PasswordProps: {
                newPasswordLabel: 'New Password',
                confirmPasswordLabel: 'Confirm New Password',
                onPasswordChange: updateFields,
                passwordRequirements: [],
            },
        });

        const currentPasswordInput = screen.getByTestId('blui-change-password-current-password-text-field');
        fireEvent.changeText(currentPasswordInput, 'Abc@1234');
        const newPasswordInput = screen.getByTestId('blui-set-password-password-text-field');
        const confirmPasswordInput = screen.getByTestId('blui-set-password-confirm-password-text-field');
        fireEvent.changeText(newPasswordInput, 'Abc@1234');
        expect(newPasswordInput).toHaveDisplayValue('Abc@1234');
        fireEvent.changeText(confirmPasswordInput, 'Abc@1234');
        expect(confirmPasswordInput).toHaveDisplayValue('Abc@1234');
        expect(screen.getByText('Submit')).toBeEnabled();
        fireEvent.press(screen.getByText('Submit'));

        await waitFor(() => expect(screen.getByText('Your password was successfully reset.')));
    });

    it('should enable next button, when passwordRequirements prop is empty', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: [],
                onSubmit: jest.fn(),
            },
        });

        const passwordField = screen.getByTestId('blui-set-password-password-text-field');
        const confirmPasswordField = screen.getByTestId('blui-set-password-confirm-password-text-field');

        fireEvent.changeText(passwordField, 'A');
        fireEvent.changeText(confirmPasswordField, 'A');

        expect(passwordField).toHaveDisplayValue('A');
        expect(confirmPasswordField).toHaveDisplayValue('A');
    });

    it('should call onNext, when Next button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                passwordRequirements: passwordRequirements,
                onPasswordChange: jest.fn(),
            },
            currentPasswordLabel: 'Current Label',
        });

        const currentPasswordField = screen.getByTestId('blui-change-password-current-password-text-field');
        const passwordField = screen.getByTestId('blui-set-password-password-text-field');
        const confirmPasswordField = screen.getByTestId('blui-set-password-confirm-password-text-field');
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(currentPasswordField, 'ab');
        fireEvent.changeText(passwordField, 'ab123');
        fireEvent.changeText(confirmPasswordField, 'ab123');

        fireEvent.press(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
    });

    it('should disable the Next button when passwords do not match', () => {
        renderer({
            WorkflowCardActionsProps: {
                onNext: mockOnNext(),
                showNext: true,
                nextLabel: 'Next',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                passwordRequirements: passwordRequirements,
                onPasswordChange: jest.fn(),
            },
            currentPasswordLabel: 'Current Label',
        });

        const passwordField = screen.getByTestId('blui-set-password-password-text-field');
        const confirmPasswordField = screen.getByTestId('blui-set-password-confirm-password-text-field');
        const nextButton = screen.getByText('Next');

        fireEvent.changeText(passwordField, 'Password@123A');
        fireEvent.changeText(confirmPasswordField, 'Password@123B');

        expect(nextButton).toBeDisabled();
    });

    it('should call onFinish when showSuccessScreen prop is false', () => {
        const mockOnFinish = jest.fn();

        const { getByTestId } = renderer({
            showSuccessScreen: false,
            onFinish: mockOnFinish(),
        });

        const currentPasswordField = getByTestId('blui-change-password-current-password-text-field');
        const passwordField = getByTestId('blui-set-password-password-text-field');
        const confirmPasswordField = getByTestId('blui-set-password-confirm-password-text-field');
        const nextButton = screen.getByText('Submit');

        fireEvent.changeText(currentPasswordField, 'Password');
        fireEvent.changeText(passwordField, 'Password@123A');
        fireEvent.changeText(confirmPasswordField, 'Password@123A');
        fireEvent.press(nextButton);

        expect(mockOnFinish).toHaveBeenCalled();
    });

    it('should call onIconPress, when cross button pressed on header', () => {
        const mockOnIconPress = jest.fn();
        renderer({
            WorkflowCardHeaderProps: {
                onIconPress: mockOnIconPress(),
            },
        });

        const crossButton = screen.getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(crossButton);
        expect(mockOnIconPress).toHaveBeenCalled();
    });
});
