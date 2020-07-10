/**
 * RegistrationStateContext and RegistrationActionContext provide access to global state and actions for registration related information (load EULA, complete registration, etc.).
 *
 * @packageDocumentation
 * @module RegistrationUIContext
 * @internal
 * @preferred
 */
import { RegistrationStateContext, RegistrationActionContext } from './context';
export * from './types';
export * from './reducer';
import { RegistrationActionsCreator } from './actions';
import { RegistrationActions } from './dispatchActions';
import { RegistrationUIState } from './state';
import { RegistrationUIContextActions } from './types';
/**
 * Hook for using the global account state for account-related global [[RegistrationUIState]] state changes (i.e. loading EULA, registration via invite).
 *
 * @category Hooks
 */
export declare const useRegistrationUIState: () => RegistrationUIState;
/**
 * Hook for using the global [[RegistrationUIActions]] actions (i.e. loadEULA, completeRegistration, etc.) which change the global [[RegistrationUIState]].
 *
 * @category Hooks
 */
export declare const useRegistrationUIActions: () => RegistrationUIContextActions;
export { RegistrationActionContext, RegistrationStateContext, RegistrationActionsCreator, RegistrationActions };
