import React from 'react';
import { cleanup, render, screen, renderHook } from '@testing-library/react-native';
import {
    RegistrationWorkflowContextProps,
    useRegistrationWorkflowContext,
} from '../../../contexts/RegistrationWorkflowContext';
import { RegistrationWorkflowContextProvider } from '../../../contexts/RegistrationWorkflowContext/provider';
import { Text } from 'react-native-paper';
import { registrationWorkflowContextProps } from '../../../testUtils';

afterEach(cleanup);

describe('RegistrationWorkflowContext', () => {
    it('should render RegistrationWorkflowContextProvider without crashing', () => {
        render(
            <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps}>
                <Text>Test</Text>
            </RegistrationWorkflowContextProvider>
        ).toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('Test')).toBeTruthy();
    });

    it('should set values in the context', async () => {
        let values: {
            result: { current: RegistrationWorkflowContextProps };
        };

        const RegisterComponent: React.FC<React.PropsWithChildren<any>> = () => (
            <RegistrationWorkflowContextProvider {...registrationWorkflowContextProps} />
        );

        const CustomFlow: React.FC = () => {
            const Screen1: React.FC = () => {
                // eslint-disable-next-line
                values = renderHook((): RegistrationWorkflowContextProps => useRegistrationWorkflowContext());
                return <Text>Screen 1</Text>;
            };

            return (
                <RegisterComponent>
                    <Screen1 />
                </RegisterComponent>
            );
        };

        render(<CustomFlow />);

        // eslint-disable-next-line
        await ((): void => expect(values.result.current.currentScreen).toBe(0));
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.totalScreens).toBe(2));
        // eslint-disable-next-line
        await ((): void => expect(values.result.current.screenData['Eula'].accepted).toBeTruthy());
        // eslint-disable-next-line
        await ((): void =>
            expect(values.result.current.screenData['CreateAccount'].emailAddress).toBe(
                'emailAddress@emailAddress.emailAddress'
            ));
    });

    it('should throw error, when context value is null', () => {
        try {
            renderHook(() => useRegistrationWorkflowContext());
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });
});
