import React from 'react';
import {
    cleanup,
    fireEvent,
    render,
    screen,
    renderHook,
    act,
    RenderResult,
    waitFor,
} from '@testing-library/react-native';
import { RegistrationWorkflow } from '../../../components/RegistrationWorkflow/RegistrationWorkflow';
import { RegistrationContextProvider, useRegistrationWorkflowContext } from '../../../contexts';
import { CreateAccountScreen } from '../../../screens';
import { registrationContextProviderProps } from '../../../testUtils';
import { Button, Text, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { RegistrationWorkflowProps } from 'src/components/RegistrationWorkflow/types';
import '@testing-library/react-native/extend-expect';

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
    it('should render without crashing', () => {
        renderer();
        expect(render);
        expect(screen.getByText('Screen 1')).toBeOnTheScreen();
    });

    it('should render multiple screens', () => {
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
        expect(screen.getByText('Indexed Screen 2')).toBeOnTheScreen();
    });

    it('should render the correct screen, when initialScreenIndex prop is passed', () => {
        renderer({ initialScreenIndex: 1 });
        expect(screen.getByText('Screen 2')).toBeOnTheScreen();
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

    it('should set screen data for default registration workflow in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow
                        isInviteRegistration
                        initialRegistrationParams={{ code: '123', email: 'emailAddress@emailAddress.com' }}
                        {...defaultProps}
                    >
                        {children}
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        void act(() => {
            void result.current.nextScreen({ screenId: 'Eula', values: { accepted: true } });
        });

        expect(result.current.screenData['Eula'].accepted).toBeTruthy();
        expect(result.current.screenData['CreateAccount'].emailAddress).toBe('emailAddress@emailAddress.com');
        expect(result.current.screenData['VerifyCode'].code).toBe('123');
    });

    it('should set screen data for custom registration workflow in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow {...defaultProps}>{children}</RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );
        const { result } = renderHook(() => useRegistrationWorkflowContext(), { wrapper });

        void act(() => {
            void result.current.nextScreen({ screenId: 'Screen1', values: { test: 'test' } });
        });
        void act(() => {
            void result.current.nextScreen({
                screenId: 'Screen2',
                values: { test2: 'test2' },
            });
        });
        // @ts-ignore
        expect(result.current.screenData['Other']['Screen1'].test).toBe('test');
        // @ts-ignore
        void ((): void => expect(result.current.screenData['Other']['Screen2'].test2).toBe('test2'));
    });

    it('should check for lower bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: -1 });
        expect(screen.getByText('Screen 1')).toBeOnTheScreen();
    });

    it('should check for upper bound of initialScreenIndex props', () => {
        renderer({ initialScreenIndex: 2 });
        expect(screen.getByText('Screen 2')).toBeOnTheScreen();
    });

    it('should render custom success screen', () => {
        const props = defaultProps;
        defaultProps.successScreen = (
            <View>
                <Text>Custom Success</Text>
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
        const verifyEmailInput = getByTestId('blui-create-account-email-text-input');
        fireEvent.changeText(verifyEmailInput, 'test@test.net');
        const nextButton = getByText('Next');
        fireEvent.press(nextButton);
        void ((): void => expect(screen.getByText('Custom Success')).toBeInTheDocument());
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
        expect(screen.getByText('Account Exists!!!')).toBeOnTheScreen();
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

    it('should display default registration workflow', async () => {
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow />
                </RegistrationContextProvider>
            </PaperProvider>
        );
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        fireEvent.press(screen.getAllByText('Next')[0]);
        expect(screen.getByText('Create an Account')).toBeOnTheScreen();
        expect(screen.getAllByText('Next').length).toBe(5);
    }, 100000);

    it('should skip create account screen in invite registration workflow', async () => {
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow
                        isInviteRegistration
                        initialRegistrationParams={{ code: '123', email: 'emailAddress@emailAddress.com' }}
                    />
                </RegistrationContextProvider>
            </PaperProvider>
        );
        await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
        fireEvent.press(screen.getAllByText('Next')[0]);
        expect(screen.queryByText('Create Account')).not.toBeOnTheScreen();
        expect(screen.getByText('Create Password')).toBeOnTheScreen();
        expect(screen.getAllByText('Next').length).toBe(3);
    });

    it('should display custom screen', () => {
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <TextInput testID="blui-registration-workflow-text-input" />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        expect(screen.getByTestId('blui-registration-workflow-text-input')).toBeOnTheScreen();
    });

    it('should display single screen', () => {
        render(
            <PaperProvider>
                <RegistrationContextProvider {...registrationContextProviderProps}>
                    <RegistrationWorkflow>
                        <CreateAccountScreen />
                    </RegistrationWorkflow>
                </RegistrationContextProvider>
            </PaperProvider>
        );

        expect(screen.getByTestId('blui-create-account-email-text-input')).toBeOnTheScreen();
    });
});
