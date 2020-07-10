/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */
import { RegistrationUIState } from './state';
import { RegistrationActions } from './dispatchActions';
/**
 * Default reducer for global [[RegistrationUIState]].
 *
 * @param prevState Previous [[RegistrationUIState]] to update.
 * @param action State change action, which should be of type [[RegistrationActions]].
 */
export declare const registrationReducer: (prevState: RegistrationUIState, action: RegistrationActions) => RegistrationUIState;
