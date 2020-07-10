/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */
/// <reference types="react" />
import { RegistrationUIState } from '../RegistrationUIContext/state';
import { RegistrationUIActions } from '../AuthUIContextProvider';
import { RegistrationActions } from '../RegistrationUIContext/dispatchActions';
export declare type RegistrationUIContextActions = {
    actions: RegistrationUIActions;
    dispatch: React.Dispatch<RegistrationActions>;
};
export declare type RegistrationUIReducer = (prevState: RegistrationUIState, action: RegistrationActions) => RegistrationUIState;
