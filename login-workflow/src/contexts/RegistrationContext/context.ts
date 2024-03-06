/**
 * @packageDocumentation
 * @module RegistrationContext
 */

import { createContext } from 'react';
import { RegistrationContextProviderProps } from './types';

/**
 * Registration Context is used to access context in the registration workflow.
 */
export const RegistrationContext = createContext<RegistrationContextProviderProps | null>(null);
