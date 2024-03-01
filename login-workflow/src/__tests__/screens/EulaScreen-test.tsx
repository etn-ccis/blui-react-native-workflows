import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { EulaScreen } from '../../screens/EulaScreen';
import { RegistrationWorkflow } from 'src/components';
import { RegistrationContextProvider } from 'src/contexts';
import { registrationContextProviderProps } from 'src/testUtils';
jest.useFakeTimers();

afterEach(cleanup);

describe('Create Account Base', () => {
    it('renders correctly', () => {
        const rendered = renderer
            .create(
                <SafeAreaProvider>
                    <RegistrationContextProvider {...registrationContextProviderProps}>
                        <RegistrationWorkflow initialScreenIndex={0}>
                            <EulaScreen />
                        </RegistrationWorkflow>
                    </RegistrationContextProvider>
                </SafeAreaProvider>
            )
            .toJSON();
        expect(rendered).toBeTruthy();
    });
    it('on next press', () => {
        const nextfn = jest.fn();
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <EulaScreen
                            eulaContent={'Hello'}
                            checkboxLabel={'check'}
                            checkboxProps={{ disabled: false }}
                            WorkflowCardActionsProps={{
                                onNext: () => nextfn(),
                                showNext: true,
                                nextLabel: 'NextButton',
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );
        const checkbox = screen.getByTestId('eulaBase-checkbox');
        fireEvent.press(checkbox);
        fireEvent.press(screen.getByText('NextButton'));
        expect(nextfn).toHaveBeenCalled();
    });

    it('on previus press', () => {
        const prevFn = jest.fn();
        render(
            <SafeAreaProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow initialScreenIndex={0}>
                        <EulaScreen
                            eulaContent={'Hello'}
                            checkboxLabel={'I have read and agree to the Terms & Conditions'}
                            initialCheckboxValue={true}
                            WorkflowCardActionsProps={{
                                onPrevious: prevFn(),
                                showPrevious: true,
                                previousLabel: 'Back',
                            }}
                        />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </SafeAreaProvider>
        );
        fireEvent.press(screen.getByText('Back'));
        expect(prevFn).toHaveBeenCalled();
    });
});
