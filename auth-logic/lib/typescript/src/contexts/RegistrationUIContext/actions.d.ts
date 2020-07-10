/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */
/// <reference types="react" />
import { RegistrationActions as DispatchActions } from './dispatchActions';
import { RegistrationUIActions } from '../AuthUIContextProvider';
declare type RegistrationUIActionsFunction = () => RegistrationUIActions;
declare type RegistrationUIActionsCreator = (injectedActions: RegistrationUIActions, dispatch: React.Dispatch<DispatchActions>) => RegistrationUIActionsFunction;
/**
 * Implementation of actions for altering the global [[RegistrationUIState]] via [[RegistrationUIActions]] calls.
 * Uses actions injected into the app to make network calls, and then updates the global state accordingly
 * using by dispatching [[RegistrationActions]] to the [[registrationReducer]].
 *
 * @param injectedActions Implementation of network activities.
 * @param dispatch For updating reducer upon completion of network activities.
 */
export declare const RegistrationActionsCreator: RegistrationUIActionsCreator;
export {};
