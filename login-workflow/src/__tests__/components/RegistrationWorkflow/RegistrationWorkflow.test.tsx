import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, renderHook, act, RenderResult } from '@testing-library/react-native';
import { RegistrationWorkflow } from '../../../components/RegistrationWorkflow/RegistrationWorkflow';
import { RegistrationContextProvider, useRegistrationWorkflowContext } from '../../../contexts';
import { CreateAccountScreen } from '../../../screens';
import { registrationContextProviderProps } from '../../../testUtils';
import { Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import { RegistrationWorkflowProps } from 'src/components/RegistrationWorkflow/types';
afterEach(cleanup);

const defaultProps: RegistrationWorkflowProps = {
    initialScreenIndex: 0,
};

const renderer = (props = defaultProps): RenderResult =>
    render(
        <RegistrationContextProvider {...registrationContextProviderProps}>
            <RegistrationWorkflow {...props}>
                <Text>Screen 1</Text>
                <Text>Screen 2</Text>
            </RegistrationWorkflow>
        </RegistrationContextProvider>
    );

describe('RegistrationWorkflow', () => {
    it('should render RegistrationWorkflowContextProvider without crashing', () => {
        renderer().toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('Screen 1')).toBeTruthy();
    });

    it('should render the multiple screens', () => {
        renderer().toJSON();
        expect(screen.getByText('Screen 1')).toBeTruthy();
    });

    it('should render the correct screen, when initialScreenIndex prop is passed', () => {
        renderer({ initialScreenIndex: 1 }).toJSON();
        expect(screen.getByText('Screen 2')).toBeTruthy();
    });

    it('should call nextScreen function', () => {
        const nextScreen = jest.fn();
        const { getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <RegistrationWorkflow>
                    <>
                        <Text>Indexed Screen 1</Text>
                        <Button
                            onPress={(): void => {
                                nextScreen({ screenId: 'Eula', values: { accepted: true } });
                            }}
                        >
                            Next
                        </Button>
                    </>
                    <Text>Indexed Screen 2</Text>
                </RegistrationWorkflow>
            </RegistrationContextProvider>
        );
        fireEvent.press(getByText('Next'));
        expect(nextScreen).toHaveBeenCalledWith({ screenId: 'Eula', values: { accepted: true } });
    });

    it('should check for lower bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: -1 }).toJSON();
        expect(screen.getByText('Screen 1')).toBeTruthy();
    });

    it('should check for upper bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: 2 }).toJSON();
        expect(screen.getByText('Screen 2')).toBeTruthy();
    });

    it('should set screen data for default registration workflow in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        expect(result.current.screenData['Eula'].accepted).toBeFalsy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('');

        void act(() => {
            void result.current.nextScreen({ screenId: 'Eula', values: { accepted: true } });
        });
        void act(() => {
            result.current.previousScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: 'emailAddress@emailAddress.com' },
            });
        });

        expect(result.current.screenData['Eula'].accepted).toBeTruthy();

        void ((): void =>
            expect(result.current.screenData['CreateAccount'].emailAddress).toBe('emailAddress@emailAddress.com'));
    });

    it('should render custom success screen', () => {
        const props = defaultProps;
        defaultProps.successScreen = (
            <View>
                <Text>Success</Text>
            </View>
        );
        const { getByTestId, getByText } = render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow {...props}>
                        <CreateAccountScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const verifyEmailInput = getByTestId('email');
        fireEvent.changeText(verifyEmailInput, { target: { value: 'test@test.net' } });
        const nextButton = getByText('Next');
        fireEvent.press(nextButton);
        void ((): void => expect(screen.getByText('Success')).toBeInTheDocument());
    });

    it('should render existing account screen', () => {
        defaultProps.existingAccountSuccessScreen = (
            <View>
                <Text>Account Exists!!!</Text>
            </View>
        );
        const wrapper = ({ children }: any): JSX.Element => (
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        expect(result.current.screenData['Eula'].accepted).toBeFalsy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('');

        void act(() => {
            void result.current.nextScreen({ screenId: 'Eula', values: { accepted: true } });
        });
        void act(() => {
            result.current.previousScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: 'emailAddress@emailAddress.com' },
                isAccountExist: true,
            });
        });

        expect(result.current.screenData['Eula'].accepted).toBeTruthy();
        void ((): void => expect(screen.getByText('Account Exists!!!')).toBeInTheDocument());
    });

    it('should render existing account screen', () => {
        defaultProps.existingAccountSuccessScreen = (
            <View>
                <Text>Account Exists!!!</Text>
            </View>
        );
        const wrapper = ({ children }: any): JSX.Element => (
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        expect(result.current.screenData['Eula'].accepted).toBeFalsy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('');

        void act(() => {
            void result.current.nextScreen({ screenId: 'Eula', values: { accepted: true } });
        });
        void act(() => {
            void result.current.nextScreen({
                screenId: 'CreateAccount',
                values: { emailAddress: 'emailAddress@emailAddress.com' },
                isAccountExist: true,
            });
        });

        expect(result.current.screenData['Eula'].accepted).toBeTruthy();
        void ((): void => expect(screen.getByText('Account Exists!!!')).toBeInTheDocument());
    });
});
