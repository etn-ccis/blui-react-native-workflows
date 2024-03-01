import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { RegistrationWorkflow } from 'src/components';
import { RegistrationContextProvider } from 'src/contexts';
import { VerifyCodeScreen } from 'src/screens';
import { registrationContextProviderProps } from 'src/testUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';

jest.useFakeTimers();
describe('Verify Code Full Screen Test cases', () => {
    // let mockOnClose: any;
    let mockOnNext: any;

    beforeEach(() => {
        // mockOnClose = jest.fn();
        mockOnNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should render correctly', () => {
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <VerifyCodeScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );
    });

    // test('errorDisplayConfig onClose callBack function test', () => {
    //     render(
    //         <SafeAreaProvider>
    //             <RegistrationContextProvider {...registrationContextProviderProps}>
    //                 <RegistrationWorkflow>
    //                     <VerifyCodeScreen errorDisplayConfig={} />
    //                 </RegistrationWorkflow>
    //             </RegistrationContextProvider>
    //         </SafeAreaProvider>
    //     );
    // });

    test('requestResendCode function test', () => {
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <VerifyCodeScreen resendLabel="Send Again" />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );

        const resendLink = screen.getByText('Send Again');
        fireEvent.press(resendLink);
    });

    test('onNext function call test', () => {
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <VerifyCodeScreen
                            WorkflowCardActionsProps={{
                                canGoNext: true,
                                showNext: true,
                                nextLabel: 'Next',
                                onNext: mockOnNext(),
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );

        const codeInput = screen.getByTestId('text-input-flat');
        fireEvent.changeText(codeInput, '123');
        const nextButton = screen.getByTestId('workflow-card-next-button');
        fireEvent.press(nextButton);
    });

    test('onPrevious function call test', () => {
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <VerifyCodeScreen
                            WorkflowCardActionsProps={{
                                canGoPrevious: true,
                                showPrevious: true,
                                previousLabel: 'Back',
                                onPrevious: mockOnNext(),
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );

        const prevButton = screen.getByTestId('workflow-card-previous-button');
        fireEvent.press(prevButton);
    });

    test('calling close function on header', () => {
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <VerifyCodeScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );

        const closeIcon = screen.getByTestId('workflow-card-icon');
        fireEvent.press(closeIcon);
    });
});
