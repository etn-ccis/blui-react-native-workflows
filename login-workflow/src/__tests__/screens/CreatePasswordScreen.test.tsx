import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { cleanup, render, screen, fireEvent, RenderResult, waitFor } from '@testing-library/react-native';
import { CreatePasswordScreen, CreatePasswordScreenProps } from '../../screens';
import { RegistrationContextProvider } from '../../contexts';
import { RegistrationWorkflow } from '../../components';
import { registrationContextProviderProps } from '../../testUtils';
import { PaperProvider } from 'react-native-paper';

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

describe('Create Password Screen', () => {
    let mockOnNext: any;
    let mockOnPrevious: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
        mockOnPrevious = jest.fn();
    });

    const renderer = (props?: CreatePasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <CreatePasswordScreen {...props} />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

    it('renders without crashing', () => {
        renderer();
        expect(screen.getByText('Create Password')).toBeOnTheScreen();
    });

    it('clicking on close Icon test', () => {
        renderer();
        const closeIcon = screen.getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(closeIcon);
        expect(render).toBeTruthy();
    });

    it('should call onNext, when Next button clicked', async () => {
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
        });

        const passwordField = screen.getByTestId('blui-set-password-password-text-field');
        const confirmPasswordField = screen.getByTestId('blui-set-password-confirm-password-text-field');
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(passwordField, 'ab123');
        fireEvent.changeText(confirmPasswordField, 'ab123');
        expect(nextButton).toBeEnabled();

        fireEvent.press(nextButton);
        expect(mockOnNext).toHaveBeenCalled();
        await waitFor(() => expect(screen.getByTestId('blui-spinner')).toBeOnTheScreen());
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

    it('should call onPrevious, when Back button clicked', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockOnPrevious(),
                showPrevious: true,
                previousLabel: 'Back',
            },
            PasswordProps: {
                newPasswordLabel: 'Password',
                confirmPasswordLabel: 'Confirm Password',
                onPasswordChange: jest.fn(),
                passwordRequirements: passwordRequirements,
            },
        });

        const backButton = screen.getByText('Back');
        fireEvent.press(backButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('should call onSubmit callBack function', async () => {
        renderer();
        const passwordInput = screen.getByTestId('blui-set-password-password-text-field');
        expect(passwordInput.props.value).toBe('');
        const confirmInput = screen.getByTestId('blui-set-password-confirm-password-text-field');
        expect(confirmInput.props.value).toBe('');

        fireEvent.changeText(passwordInput, 'Test@123');
        fireEvent.changeText(confirmInput, 'Test@123');
        fireEvent(confirmInput, 'submitEditing');
        expect(screen.getByTestId('blui-spinner')).toBeOnTheScreen();
        await waitFor(() => expect(screen.getByTestId('blui-spinner')).toBeOnTheScreen());
    });

    it('should return false when password is not matching as per requirements', () => {
        renderer();
        const passwordInput = screen.getByTestId('blui-set-password-password-text-field');
        expect(passwordInput.props.value).toBe('');
        const confirmInput = screen.getByTestId('blui-set-password-confirm-password-text-field');
        expect(confirmInput.props.value).toBe('');

        fireEvent.changeText(passwordInput, 'test@123');
        fireEvent.changeText(confirmInput, 'Test@123');
        expect(screen.getByText('Passwords do not match')).toBeOnTheScreen();
    });
});
