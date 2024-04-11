import React from 'react';
import '@testing-library/react-native/extend-expect';
import { ResetPasswordScreen, ResetPasswordScreenProps } from '../../screens/ResetPasswordScreen';
import { RenderResult, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AuthContextProvider } from '../../contexts';
import { authContextProviderProps } from '../../testUtils';
import { PaperProvider } from 'react-native-paper';

afterEach(cleanup);

describe('Reset Password Screen Tests', () => {
    let mockFunction: any;

    beforeEach(() => {
        mockFunction = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: ResetPasswordScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <AuthContextProvider {...authContextProviderProps}>
                    <ResetPasswordScreen {...props} />
                </AuthContextProvider>
            </PaperProvider>
        );

    it('renders correctly', () => {
        renderer();
        expect(screen.getByText('Reset Password')).toBeOnTheScreen();
    });

    it('clicking on close Icon test', () => {
        renderer();
        const closeIcon = screen.getByTestId('workflow-card-icon');
        fireEvent.press(closeIcon);
        expect(render).toBeTruthy();
    });

    it('Clicking on Back button test', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockFunction(),
            },
        });
        const prevButton = screen.getByTestId('workflow-card-previous-button');
        fireEvent.press(prevButton);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should call handleOnNext when next button is clicked', () => {
        renderer({
            showSuccessScreen: false,
        });
        const passwordInput = screen.getByTestId('password');
        expect(passwordInput.props.value).toBe('');
        const confirmInput = screen.getByTestId('confirm');
        expect(confirmInput.props.value).toBe('');
        const nextButton = screen.getByTestId('workflow-card-next-button');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(passwordInput, 'Test@123');
        fireEvent.changeText(confirmInput, 'Test@123');
        expect(nextButton).toBeEnabled();
        fireEvent.press(nextButton);
        expect(screen.getByTestId('spinner')).toBeOnTheScreen();
    });

    it('when passed empty password requirements', () => {
        renderer({
            PasswordProps: {
                passwordRequirements: [],
            },
        });
        const passwordInput = screen.getByTestId('password');
        expect(passwordInput.props.value).toBe('');
        const confirmInput = screen.getByTestId('confirm');
        expect(confirmInput.props.value).toBe('');
        const nextButton = screen.getByTestId('workflow-card-next-button');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(passwordInput, 'Test@123');
        fireEvent.changeText(confirmInput, 'Test@123');
        expect(nextButton).toBeEnabled();
        fireEvent.press(nextButton);
        expect(screen.getByTestId('spinner')).toBeOnTheScreen();
    });

    it('should return false when password is not matching as per requirements', () => {
        renderer();
        const passwordInput = screen.getByTestId('password');
        expect(passwordInput.props.value).toBe('');
        const confirmInput = screen.getByTestId('confirm');
        expect(confirmInput.props.value).toBe('');

        fireEvent.changeText(passwordInput, 'test@123');
        fireEvent.changeText(confirmInput, 'Test@123');
        expect(screen.getByText('Passwords do not match')).toBeOnTheScreen();
    });

    it('should call onSubmit callBack function', async () => {
        renderer();
        const passwordInput = screen.getByTestId('password');
        expect(passwordInput.props.value).toBe('');
        const confirmInput = screen.getByTestId('confirm');
        expect(confirmInput.props.value).toBe('');

        fireEvent.changeText(passwordInput, 'Test@123');
        fireEvent.changeText(confirmInput, 'Test@123');
        fireEvent(confirmInput, 'submitEditing');
        expect(screen.getByTestId('spinner')).toBeOnTheScreen();
        await waitFor(() => {
            fireEvent.press(screen.getByText('Done'));
        });
        expect(render).toBeTruthy();
    });
});
