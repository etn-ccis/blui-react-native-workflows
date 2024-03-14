import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer from 'react-test-renderer';
import { EulaScreen } from '../../screens/EulaScreen';
import { RegistrationWorkflow } from '../../components';
import { RegistrationContextProvider, i18nRegistrationInstance } from '../../contexts';
import { registrationContextProviderProps } from '../../testUtils';
import { Provider as PaperProvider } from 'react-native-paper';
import '@testing-library/react-native/extend-expect';

// jest.useFakeTimers();

afterEach(cleanup);

describe('Eula Screen', () => {
    it('Eula Screen renders correctly', () => {
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
    it('check if next button is calling onNext function prop', () => {
        const nextfn = jest.fn();
        render(
            <PaperProvider>
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
            </PaperProvider>
        );
        const checkbox = screen.getByTestId('eulaBase-checkbox');
        fireEvent.press(checkbox);
        fireEvent.press(screen.getByText('NextButton'));
        expect(nextfn).toHaveBeenCalled();
    });
    it('check if previos button is calling onPrevious function prop', () => {
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
    it('should throw error in eula and clicking refresh button should call loadEula', async () => {
        const loadFn = jest.fn().mockRejectedValue(new Error('qwertyuiop'));
        const { findByText } = render(
            <PaperProvider>
                <RegistrationContextProvider
                    {...{
                        language: 'en',
                        i18n: i18nRegistrationInstance,
                        navigate: (): void => {},
                        routeConfig: {},
                        actions: {
                            loadEula: loadFn,
                            acceptEula: jest.fn(),
                            requestRegistrationCode: jest.fn(),
                            validateUserRegistrationRequest: jest.fn(),
                            createPassword: jest.fn(),
                            setAccountDetails: jest.fn(),
                            completeRegistration: jest.fn().mockImplementation(() => Promise.resolve()),
                        },
                    }}
                >
                    <RegistrationWorkflow>
                        <EulaScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        fireEvent.press(await findByText('Retry'));
        expect(loadFn).toHaveBeenCalledTimes(2);
    }, 10000);
    it('should throw error in eula and clicking refresh button should call loadEula', async () => {
        const loadFn = jest.fn().mockRejectedValue(new Error('qwertyuiop'));
        const { findByText } = render(
            <PaperProvider>
                <RegistrationContextProvider
                    {...{
                        language: 'en',
                        i18n: i18nRegistrationInstance,
                        navigate: (): void => {},
                        routeConfig: {},
                        actions: {
                            loadEula: loadFn,
                            acceptEula: jest.fn(),
                            requestRegistrationCode: jest.fn(),
                            validateUserRegistrationRequest: jest.fn(),
                            createPassword: jest.fn(),
                            setAccountDetails: jest.fn(),
                            completeRegistration: jest.fn().mockImplementation(() => Promise.resolve()),
                        },
                    }}
                >
                    <RegistrationWorkflow>
                        <EulaScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        fireEvent.press(await findByText('Retry'));
        expect(loadFn).toHaveBeenCalledTimes(2);
    }, 10000);

    it('should be able to go to next screen when account exists in validateUserRegistrationRequest on next button pressed in case of invite registration', async () => {
        const validateFn = jest.fn().mockReturnValue({ codeValid: true, accountExists: true });
        const { getByText, queryByText, getByTestId, findByText } = render(
            <PaperProvider>
                <RegistrationContextProvider
                    {...{
                        language: 'en',
                        i18n: i18nRegistrationInstance,
                        navigate: (): void => {},
                        routeConfig: {},
                        actions: {
                            loadEula: jest.fn(),
                            acceptEula: jest.fn(),
                            requestRegistrationCode: jest.fn(),
                            validateUserRegistrationRequest: validateFn,
                            createPassword: jest.fn(),
                            setAccountDetails: jest.fn(),
                            completeRegistration: jest.fn().mockImplementation(() => Promise.resolve()),
                        },
                    }}
                >
                    <RegistrationWorkflow
                        isInviteRegistration
                        initialRegistrationParams={{ code: '123', email: 'emailAddress@emailAddress.com' }}
                    >
                        <EulaScreen eulaContent={'Hello'} checkboxLabel={'check'} checkboxProps={{ disabled: false }} />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        const checkbox = getByTestId('eulaBase-checkbox');
        fireEvent.press(checkbox);
        fireEvent.press(getByText('Next'));
        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        expect(
            await findByText(
                'Your account has been successfully created. Please log in with your Eaton account email and password.'
            )
        ).toBeOnTheScreen();
        expect(validateFn).toHaveBeenCalled();
    }, 10000);
    it('should be able to trigger error when codeValid is false in validateUserRegistrationRequest on next button pressed in case of invite registration ', async () => {
        const validateFn = jest.fn().mockReturnValue({ codeValid: false, accountExists: false });
        const { getByText, queryByText, getByTestId, findByText } = render(
            <PaperProvider>
                <RegistrationContextProvider
                    {...{
                        language: 'en',
                        i18n: i18nRegistrationInstance,
                        navigate: (): void => {},
                        routeConfig: {},
                        actions: {
                            loadEula: jest.fn(),
                            acceptEula: jest.fn(),
                            requestRegistrationCode: jest.fn(),
                            validateUserRegistrationRequest: validateFn,
                            createPassword: jest.fn(),
                            setAccountDetails: jest.fn(),
                            completeRegistration: jest.fn().mockImplementation(() => Promise.resolve()),
                        },
                    }}
                >
                    <RegistrationWorkflow
                        isInviteRegistration
                        initialRegistrationParams={{ code: '123', email: 'emailAddress@emailAddress.com' }}
                    >
                        <EulaScreen eulaContent={'Hello'} checkboxLabel={'check'} checkboxProps={{ disabled: false }} />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        const checkbox = getByTestId('eulaBase-checkbox');
        fireEvent.press(checkbox);
        fireEvent.press(getByText('Next'));
        await waitFor(() => expect(queryByText('Loading...')).toBeNull());
        expect(await findByText('Error!')).toBeOnTheScreen();
        expect(validateFn).toHaveBeenCalled();
    }, 10000);
});