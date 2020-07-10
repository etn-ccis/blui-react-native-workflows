/**
 * @packageDocumentation
 * @module AccountUIContext
 */
/// <reference types="react" />
import { AccountUIState } from './state';
import { AuthUIActions } from '../AuthUIContextProvider';
import { AccountActions } from '../AccountUIContext/dispatchActions';
export declare type AccountUIActions = AuthUIActions;
export declare type AccountUIContextActions = {
    actions: AccountUIActions;
    dispatch: React.Dispatch<AccountActions>;
};
export declare type AccountUIActionsCreator = (dispatch: React.Dispatch<AccountActions>) => AccountUIActions;
export declare type AccountUIReducer = (prevState: AccountUIState, action: AccountActions) => AccountUIState;
