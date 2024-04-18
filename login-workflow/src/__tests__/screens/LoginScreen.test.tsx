import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { AuthContextProvider } from '../../contexts';
import { authContextProviderProps } from '../../testUtils';
import { LoginScreen } from '../../screens/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';

afterEach(cleanup);

describe('LoginScreen', () => {
    test('renders all input fields with correct labels', () => {
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps}>
                <PaperProvider>
                    <LoginScreen />
                </PaperProvider>
            </AuthContextProvider>
        );
        expect(getByTestId('blui-login-username-text-field')).toBeTruthy();
        expect(getByTestId('blui-login-password-text-field')).toBeTruthy();
        expect(getByTestId('blui-login-remember-me-checkbox')).toBeTruthy();
        expect(getByTestId('blui-login-login-button')).toBeTruthy();
        expect(getByTestId('blui-login-forgot-password-label')).toBeTruthy();
        expect(getByTestId('blui-login-self-register-label')).toBeTruthy();
        expect(getByTestId('blui-login-contact-support-label')).toBeTruthy();
    });

    test('triggers forgot password function when forgot password label is pressed', () => {
        const mockNavigate = jest.fn();
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps} navigate={mockNavigate}>
                <PaperProvider>
                    <LoginScreen />
                </PaperProvider>
            </AuthContextProvider>
        );
        fireEvent.press(getByTestId('blui-login-forgot-password-label'));
        expect(mockNavigate).toHaveBeenCalled();
    });

    test('triggers self register function when self register label is pressed', () => {
        const mockNavigate = jest.fn();
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps} navigate={mockNavigate}>
                <PaperProvider>
                    <LoginScreen />
                </PaperProvider>
            </AuthContextProvider>
        );
        fireEvent.press(getByTestId('blui-login-self-register-label'));
        expect(mockNavigate).toHaveBeenCalled();
    });

    test('triggers contact support function when contact support label is pressed', () => {
        const mockNavigate = jest.fn();
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps} navigate={mockNavigate}>
                <PaperProvider>
                    <LoginScreen />
                </PaperProvider>
            </AuthContextProvider>
        );
        fireEvent.press(getByTestId('blui-login-contact-support-label'));
        expect(mockNavigate).toHaveBeenCalled();
    });

    test('checks if remember me checkbox is selected', () => {
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps}>
                <PaperProvider>
                    <LoginScreen />
                </PaperProvider>
            </AuthContextProvider>
        );
        const checkbox = getByTestId('blui-login-remember-me-checkbox');

        fireEvent.press(checkbox);
        expect(checkbox).toBeChecked();
    });
    test('triggers onSubmitEditing when pressing enter key on username field', () => {
        const mockSubmitEditing = jest.fn();
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps}>
                <PaperProvider>
                    <LoginScreen usernameTextFieldProps={{ onSubmitEditing: mockSubmitEditing }} />
                </PaperProvider>
            </AuthContextProvider>
        );
        const usernameInput = getByTestId('blui-login-username-text-field');
        fireEvent.changeText(getByTestId('blui-login-username-text-field'), 'email@email.com');

        fireEvent(usernameInput, 'submitEditing');

        expect(mockSubmitEditing).toHaveBeenCalled();
    });
    test('triggers onSubmitEditing when pressing enter key on password field', () => {
        const mockSubmitEditing = jest.fn();
        const { getByTestId } = render(
            <AuthContextProvider {...authContextProviderProps}>
                <PaperProvider>
                    <LoginScreen passwordTextFieldProps={{ onSubmitEditing: mockSubmitEditing }} />
                </PaperProvider>
            </AuthContextProvider>
        );
        const passwordInput = getByTestId('blui-login-password-text-field');
        fireEvent.changeText(getByTestId('blui-login-password-text-field'), 'testpassword');

        fireEvent(passwordInput, 'submitEditing');

        expect(mockSubmitEditing).toHaveBeenCalled();
    });
});
