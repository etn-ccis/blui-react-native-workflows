import React from 'react';
import { RenderResult, fireEvent, render, screen } from '@testing-library/react-native';
import { RegistrationWorkflow } from 'src/components';
import { RegistrationContextProvider } from 'src/contexts';
import { VerifyCodeScreen, VerifyCodeScreenProps } from 'src/screens';
import { registrationContextProviderProps } from 'src/testUtils';
import { PaperProvider } from 'react-native-paper';

jest.useFakeTimers();
describe('Verify Code Full Screen Test cases', () => {
    let mockOnNext: any;

    beforeEach(() => {
        mockOnNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderer = (props?: VerifyCodeScreenProps): RenderResult =>
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <VerifyCodeScreen {...props} />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

    test('Should render correctly', () => {
        renderer();

        const closeIcon = screen.getByTestId('workflow-card-icon');
        fireEvent.press(closeIcon);
    });

    test('requestResendCode function test', () => {
        renderer({
            resendLabel: 'Send Again',
        });

        const resendLink = screen.getByText('Send Again');
        fireEvent.press(resendLink);
    });

    test('onNext function call test', () => {
        renderer({
            WorkflowCardActionsProps: {
                canGoNext: true,
                showNext: true,
                nextLabel: 'Next',
                onNext: mockOnNext(),
            },
        });

        const codeInput = screen.getByTestId('text-input-flat');
        fireEvent.changeText(codeInput, '123');
        const nextButton = screen.getByTestId('workflow-card-next-button');
        fireEvent.press(nextButton);
    });

    test('onPrevious function call test', () => {
        renderer({
            WorkflowCardActionsProps: {
                canGoPrevious: true,
                showPrevious: true,
                previousLabel: 'Back',
                onPrevious: mockOnNext(),
            },
        });

        const prevButton = screen.getByTestId('workflow-card-previous-button');
        fireEvent.press(prevButton);
    });
});
