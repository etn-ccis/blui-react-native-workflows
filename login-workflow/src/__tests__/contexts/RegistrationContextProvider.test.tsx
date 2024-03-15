import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, renderHook } from '@testing-library/react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { registrationContextProviderProps } from '../../testUtils';
import { RegistrationContextProvider, useRegistrationContext } from '../../contexts';

afterEach(cleanup);

describe('RegistrationContextProvider', () => {
    it('should render RegistrationContextProvider without crashing', () => {
        const { getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <Text>Hello Registration</Text>
            </RegistrationContextProvider>
        );

        expect(getByText('Hello Registration')).toBeTruthy();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps}>{children}</RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <RegistrationContextProvider {...registrationContextProviderProps} language="es">
                {children}
            </RegistrationContextProvider>
        );
        const { result } = renderHook(() => useRegistrationContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
    });

    it('should render multiple children', () => {
        const { getByText } = render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <View>
                    <Text>Child 1</Text>
                </View>
                <View>
                    <Text>Child 2</Text>
                </View>
            </RegistrationContextProvider>
        );

        expect(getByText('Child 1')).toBeTruthy();
        expect(getByText('Child 2')).toBeTruthy();
    });
});
