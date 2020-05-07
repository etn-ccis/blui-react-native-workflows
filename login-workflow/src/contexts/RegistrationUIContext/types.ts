/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */

import { RegistrationUIState } from '../RegistrationUIContext/state';
import { RegistrationUIActions } from '../AuthUIContextProvider';
import { RegistrationActions } from '../RegistrationUIContext/dispatchActions';

export type RegistrationUIContextActions = {
    actions: RegistrationUIActions;
    dispatch: React.Dispatch<any>;
};

export type RegistrationUIReducer = (
    prevState: RegistrationUIState,
    action: RegistrationActions
) => RegistrationUIState;
