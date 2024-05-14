import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/react-native/extend-expect';
import { cleanup, render, fireEvent, screen } from '@testing-library/react-native';
import { CreateAccountScreen } from '../../screens/CreateAccountScreen';
import { RegistrationWorkflow } from 'src/components';
import { RegistrationContextProvider } from 'src/contexts';
import { registrationContextProviderProps } from 'src/testUtils';
import { PaperProvider } from 'react-native-paper';
jest.useFakeTimers();

afterEach(cleanup);

describe('Create Account Base', () => {
    it('renders correctly', () => {
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <CreateAccountScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        expect(screen.getByTestId('blui-create-account-email-text-input')).toBeOnTheScreen();
    });

    it('should call onNext, when Next button clicked', () => {
        const nextfn = jest.fn();
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <CreateAccountScreen
                            WorkflowCardActionsProps={{
                                onNext: () => nextfn(),
                                showNext: true,
                                nextLabel: 'NextButton',
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const emailInput = screen.getByTestId('blui-create-account-email-text-input');
        fireEvent.changeText(emailInput, 'email@test.com');
        fireEvent.press(screen.getByText('NextButton'));
        expect(nextfn).toHaveBeenCalled();
    });

    it('should call onPrevious, when Back button clicked', () => {
        const prevFn = jest.fn();
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <CreateAccountScreen
                            WorkflowCardActionsProps={{
                                onPrevious: prevFn(),
                                showPrevious: true,
                                previousLabel: 'Back',
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const emailInput = screen.getByTestId('blui-create-account-email-text-input');
        fireEvent.changeText(emailInput, 'email@test.com');
        fireEvent.press(screen.getByText('Back'));
        expect(prevFn).toHaveBeenCalled();
    });
});
