import React from 'react';
import '@testing-library/react-native/extend-expect';
import { ForgotPasswordScreen, ForgotPasswordScreenProps } from 'src/screens';
import { RenderResult, fireEvent, render, screen } from '@testing-library/react-native';
import { AuthContextProvider } from '../../contexts';
import { authContextProviderProps } from '../../testUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
jest.useFakeTimers();

describe('Forgot Password Screen Tests', () => {
    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <SafeAreaProvider>
                    <ForgotPasswordScreen {...props} />
                </SafeAreaProvider>
            </AuthContextProvider>
        );

    it('renders correctly', () => {
        renderer();
        expect(screen.getByText('Forgot Password')).toBeOnTheScreen();
    });

    it('Clicking on next button should call handleOnNext callback function', () => {
        renderer();
        const emailInput = screen.getByTestId('forgot-password-textinput');
        const nextButton = screen.getByTestId('workflow-card-next-button');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(emailInput, 'test@eaton.com');
        expect(nextButton).toBeEnabled();
        fireEvent.press(nextButton);
    });
});
