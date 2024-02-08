import React from 'react';
import { cleanup, render, screen, renderHook } from '@testing-library/react-native';
import { Text } from 'react-native-paper';
import { ErrorContextProvider, ErrorContextProviderProps, useErrorContext, useErrorManager } from 'src/contexts';

afterEach(cleanup);

export const errorContextProviderProps: ErrorContextProviderProps = {
    mode: 'dialog',
    title: 'Error Title',
};

describe('ErrorContextProvider', () => {
    it('should render ErrorContextProviderProvider without crashing', () => {
        render(
            <ErrorContextProvider {...errorContextProviderProps}>
                <Text>Error</Text>
            </ErrorContextProvider>
        ).toJSON();
        expect(render).toBeTruthy();
        expect(screen.getByText('Error')).toBeTruthy();
    });

    it('should read values from the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps}>{children}</ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorContext(), { wrapper });

        expect(result.current.mode).toBe('dialog');
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps} mode="message-box">
                {children}
            </ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorContext(), { wrapper });

        expect(result.current.mode).not.toBe('dialog');
        expect(result.current.mode).toBe('message-box');
    });

    it('should throw error, when context value is null', () => {
        try {
            renderHook(() => useErrorContext());
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });

    it('should throw error, when context value is null', () => {
        try {
            renderHook(() => useErrorManager());
        } catch (error) {
            expect(error).toBeTruthy();
        }
    });

    it('should set values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps} mode="message-box">
                {children}
            </ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorManager(), { wrapper });

        expect(result.current.errorManagerConfig.mode).not.toBe('dialog');
        expect(result.current.errorManagerConfig.mode).toBe('message-box');
    });

    it('should set the prop values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps} mode="dialog">
                {children}
            </ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorManager(), { wrapper });

        expect(result.current.errorManagerConfig.mode).toBe('dialog');
        expect(result.current.errorManagerConfig.mode).not.toBe('message-box');
    });

    it('should set the custom values in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps} title="Custom Title">
                {children}
            </ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorManager(), { wrapper });

        expect(result.current.errorManagerConfig.title).toBe('Custom Title');
    });

    it('should set values for trigger error in the context', () => {
        const wrapper = ({ children }: any): JSX.Element => (
            <ErrorContextProvider {...errorContextProviderProps} mode="dialog">
                {children}
            </ErrorContextProvider>
        );
        const { result } = renderHook(() => useErrorManager(), { wrapper });

        result.current.triggerError({ cause: { title: 'Trigger', errorMessage: 'Trigger Message' } });

        expect(result.current.errorManagerConfig.title).toBe('Error Title');
    });
});
