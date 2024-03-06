/**
 * @packageDocumentation
 * @module ErrorContext
 */
import { createContext } from 'react';
import { ErrorContextProviderProps } from './types';

/**
 * Error Context is used to access context in the registration workflow screens.
 */
export const ErrorContext = createContext<ErrorContextProviderProps | null>(null);
