import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { LoginScreenBase } from '../../screens/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';

const EMAIL_REGEX = /^[A-Z0-9._%+'-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

afterEach(cleanup);

describe('LoginScreenBase', () => {
    test('renders all input fields with correct labels', () => {
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase />
            </PaperProvider>
        );
        expect(getByTestId('usernameTextField')).toBeTruthy();
        expect(getByTestId('passwordTextField')).toBeTruthy();
        expect(getByTestId('loginButton')).toBeTruthy();
    });

    test('triggers login function when login button is pressed with valid inputs', () => {
        const mockLogin = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                {' '}
                <LoginScreenBase
                    usernameLabel="Email Address"
                    usernameValidator={(username: string): string | boolean => {
                        if (!EMAIL_REGEX.test(username)) {
                            return 'Enter a valid email address';
                        }
                        return true;
                    }}
                    initialUsernameValue=""
                    passwordLabel="Password"
                    passwordValidator={(password: string): string | boolean => {
                        if (password.length < 2) {
                            return 'Password must be at least 2 characters';
                        }
                        return true;
                    }}
                    onLogin={mockLogin}
                />
            </PaperProvider>
        );
        fireEvent.changeText(getByTestId('usernameTextField'), 'email@email.com');
        fireEvent.changeText(getByTestId('passwordTextField'), 'testpassword');
        fireEvent.press(getByTestId('loginButton'));
        expect(mockLogin).toHaveBeenCalledWith('email@email.com', 'testpassword', undefined);
    });

    test('does not trigger login function when login button is pressed with invalid inputs', () => {
        const mockLogin = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase onLogin={mockLogin} />
            </PaperProvider>
        );
        fireEvent.changeText(getByTestId('usernameTextField'), '');
        fireEvent.changeText(getByTestId('passwordTextField'), '');
        fireEvent.press(getByTestId('loginButton'));
        expect(mockLogin).not.toHaveBeenCalled();
    });

    test('triggers forgot password function when forgot password label is pressed', () => {
        const mockForgotPassword = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase showForgotPassword onForgotPassword={mockForgotPassword} />
            </PaperProvider>
        );
        fireEvent.press(getByTestId('forgotPasswordLabel'));
        expect(mockForgotPassword).toHaveBeenCalled();
    });

    test('triggers self register function when self register label is pressed', () => {
        const mockSelfRegister = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase showSelfRegistration onSelfRegister={mockSelfRegister} />
            </PaperProvider>
        );
        fireEvent.press(getByTestId('selfRegisterLabel'));
        expect(mockSelfRegister).toHaveBeenCalled();
    });

    test('triggers contact support function when contact support label is pressed', () => {
        const mockContactSupport = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase showContactSupport onContactSupport={mockContactSupport} />
            </PaperProvider>
        );
        fireEvent.press(getByTestId('contactSupportLabel'));
        expect(mockContactSupport).toHaveBeenCalled();
    });

    test('checks if remember me checkbox is selected', () => {
        const mockRememberMeChanged = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase showRememberMe onRememberMeChanged={mockRememberMeChanged} />
            </PaperProvider>
        );
        const checkbox = getByTestId('rememberMeCheckbox');

        fireEvent.press(checkbox);
        expect(mockRememberMeChanged).toHaveBeenCalled();
    });
    test('triggers onSubmitEditing when pressing enter key on username field', () => {
        const mockSubmitEditing = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase usernameTextFieldProps={{ onSubmitEditing: mockSubmitEditing }} />
            </PaperProvider>
        );
        const usernameInput = getByTestId('usernameTextField');

        fireEvent(usernameInput, 'submitEditing');

        expect(mockSubmitEditing).toHaveBeenCalled();
    });
    test('triggers onSubmitEditing when pressing enter key on password field', () => {
        const mockSubmitEditing = jest.fn();
        const { getByTestId } = render(
            <PaperProvider>
                <LoginScreenBase passwordTextFieldProps={{ onSubmitEditing: mockSubmitEditing }} />
            </PaperProvider>
        );
        const passwordInput = getByTestId('passwordTextField');

        fireEvent(passwordInput, 'submitEditing');

        expect(mockSubmitEditing).toHaveBeenCalled();
    });
});
