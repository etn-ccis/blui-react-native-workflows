/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import { createContext } from 'react';
import { AuthUIContextProviderProps } from './types';

/** @ignore */
const context = createContext<AuthUIContextProviderProps | null>(null);
export default context;
