import { createContext } from 'react';
import { RegistrationWorkflowContextProps } from './types';

/**
 * Registration Workflow Context is used to access context in the Registration Workflow component.
 * @packageDocumentation
 * @module RegistrationWorkflowContext
 */
export const RegistrationWorkflowContext = createContext<RegistrationWorkflowContextProps | null>(null);
