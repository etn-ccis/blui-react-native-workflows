/**
 * @packageDocumentation
 * @module ErrorContextProvider
 */
import React from 'react';
import { ErrorContextProviderProps } from './types';
import { ErrorContext } from './context';

/**
 * ErrorContextProvider is used to configure error handling within the workflow
 * @param {ErrorContextProviderProps} props - props for Error Context Provider
 */
export const ErrorContextProvider: React.FC<React.PropsWithChildren<ErrorContextProviderProps>> = (props) => {
    const { children, ...ErrorContextProps } = props;

    return <ErrorContext.Provider value={ErrorContextProps}>{children}</ErrorContext.Provider>;
};
