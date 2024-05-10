import React from 'react';
import '@testing-library/react-native/extend-expect';
import { ForgotPasswordScreen, ForgotPasswordScreenProps } from 'src/screens';
import { RenderResult, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AuthContextProvider } from '../../contexts';
import { authContextProviderProps } from '../../testUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';

afterEach(cleanup);

describe('Forgot Password Screen Tests', () => {
    let mockFunction: any;

    beforeEach(() => {
        mockFunction = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: ForgotPasswordScreenProps): RenderResult =>
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <SafeAreaProvider>
                    <ForgotPasswordScreen {...props} />
                </SafeAreaProvider>
            </AuthContextProvider>
        );

    it('renders correctly', () => {
        renderer({
            description: (time: string) => <View>{time}</View>,
        });
        expect(screen.getByText('Forgot Password')).toBeOnTheScreen();
    });

    it('should call handleOnClose on click of close icon', () => {
        renderer();
        const closeIcon = screen.getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(closeIcon);
        expect(render).toBeTruthy();
    });

    it('Clicking on Back button test', () => {
        renderer({
            WorkflowCardActionsProps: {
                onPrevious: mockFunction(),
            },
        });
        const prevButton = screen.getByTestId('blui-workflow-card-actions-previous-button');
        fireEvent.press(prevButton);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('Clicking on next button should call handleOnNext callback function', async () => {
        renderer();
        const emailInput = screen.getByTestId('blui-forgot-password-textinput');
        const nextButton = screen.getByTestId('blui-workflow-card-actions-next-button-text');
        expect(nextButton).toBeDisabled();

        fireEvent.changeText(emailInput, 'test@eaton.com');
        expect(nextButton).toBeEnabled();
        fireEvent.press(nextButton);
        expect(screen.getByTestId('blui-spinner')).toBeOnTheScreen();
        await waitFor(() => {
            fireEvent.press(screen.getByText('Done'));
        });
    });
});
