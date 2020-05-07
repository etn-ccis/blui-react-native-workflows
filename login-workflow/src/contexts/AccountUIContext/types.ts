/**
 * @packageDocumentation
 * @module AccountUIContext
 */

import { AccountUIState } from './state';
import { AuthUIActions } from '../AuthUIContextProvider';
import { AccountActions } from '../AccountUIContext/dispatchActions';

export type AccountUIActions = AuthUIActions;

export type AccountUIContextActions = {
    actions: AccountUIActions;
    dispatch: React.Dispatch<any>;
};

export type AccountUIActionsCreator = (dispatch: React.Dispatch<any>) => AccountUIActions;
export type AccountUIReducer = (prevState: AccountUIState, action: AccountActions) => AccountUIState;
