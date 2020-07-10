/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */
/// <reference types="react" />
import { RegistrationUIState } from './state';
import { RegistrationUIContextActions } from './types';
declare const RegistrationActionContext: import("react").Context<RegistrationUIContextActions | null>;
declare const RegistrationStateContext: import("react").Context<RegistrationUIState>;
export { RegistrationStateContext, RegistrationActionContext };
