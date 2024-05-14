import React from 'react';
import '@testing-library/react-native/extend-expect';
import { RenderResult, fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { RegistrationWorkflow } from 'src/components';
import { RegistrationContextProvider } from 'src/contexts';
import { VerifyCodeScreen, VerifyCodeScreenProps } from 'src/screens';
import { registrationContextProviderProps } from 'src/testUtils';
import { PaperProvider } from 'react-native-paper';

describe('Verify Code Full Screen Test cases', () => {
    let mockOnPrevious: any;
    let mockOnResend: any;
    let mockOnClose: any;

    beforeEach(() => {
        mockOnPrevious = jest.fn();
        mockOnResend = jest.fn();
        mockOnClose = jest.fn();
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

    it('Should render correctly', () => {
        renderer();
        expect(screen.getByText('Verify Email')).toBeOnTheScreen();
    });

    it('clicking on close Icon test with mock function', () => {
        renderer({
            WorkflowCardHeaderProps: {
                onIconPress: mockOnClose(),
            },
        });
        const closeIcon = screen.getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(closeIcon);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('clicking on close Icon test', () => {
        renderer();
        const closeIcon = screen.getByTestId('blui-workflow-card-header-icon');
        fireEvent.press(closeIcon);
        expect(render).toBeTruthy();
    });

    it('requestResendCode function test', () => {
        renderer({
            resendLabel: 'Send Again',
            onResend: mockOnResend(),
        });
        const resendLink = screen.getByText('Send Again');
        fireEvent.press(resendLink);
        expect(mockOnResend).toHaveBeenCalled();
    });

    it('onPrevious function call test', () => {
        renderer({
            WorkflowCardActionsProps: {
                canGoPrevious: true,
                showPrevious: true,
                previousLabel: 'Back',
                onPrevious: mockOnPrevious(),
            },
        });
        const prevButton = screen.getByTestId('blui-workflow-card-actions-previous-button');
        fireEvent.press(prevButton);
        expect(mockOnPrevious).toHaveBeenCalled();
    });

    it('should display loader, when next button is pressed', async () => {
        renderer();
        const codeInput = screen.getByTestId('blui-verify-code-text-input');
        fireEvent.changeText(codeInput, '123');

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeOnTheScreen();
        fireEvent.press(nextButton);
        await waitFor(() => expect(screen.getByTestId('blui-spinner')).toBeOnTheScreen());
    });
});
