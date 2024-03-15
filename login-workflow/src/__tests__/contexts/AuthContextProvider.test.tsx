import React from 'react';
import { Text } from 'react-native-paper';
import '@testing-library/jest-dom';
import { render, cleanup, screen, renderHook } from '@testing-library/react-native';
import { AuthContextProvider } from '../../contexts/AuthContext/provider';
import { useAuthContext } from '../../contexts/AuthContext';
import { authContextProviderProps } from '../../testUtils';

afterEach(cleanup);

describe('AuthContextProvider', () => {
    it('should render AuthContextProvider without crashing', () => {
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <Text>Hello Auth</Text>
            </AuthContextProvider>
        );

        expect(screen.getByText('Hello Auth')).toBeTruthy();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <AuthContextProvider {...authContextProviderProps}>{children}</AuthContextProvider>
        );
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        expect(result.current.language).toBe('en');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <AuthContextProvider {...authContextProviderProps} language="es">
                {children}
            </AuthContextProvider>
        );
        const { result } = renderHook(() => useAuthContext(), { wrapper });

        expect(result.current.language).not.toBe('en');
        expect(result.current.language).toBe('es');
    });

    it('should render multiple children', () => {
        render(
            <AuthContextProvider {...authContextProviderProps}>
                <Text>Child 1</Text>
                <Text>Child 2</Text>
            </AuthContextProvider>
        );

        expect(screen.getByText('Child 1')).toBeTruthy();
        expect(screen.getByText('Child 2')).toBeTruthy();
    });
});
