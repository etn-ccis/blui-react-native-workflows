/**
 * @packageDocumentation
 * @module AccountUIContext
 */
/// <reference types="react" />
import { AccountActions as DispatchActions } from './dispatchActions';
import { AccountUIActions } from './types';
declare type AccountUIActionsFunction = () => AccountUIActions;
declare type AccountUIActionsCreator = (injectedActions: AccountUIActions, dispatch: React.Dispatch<DispatchActions>) => AccountUIActionsFunction;
/**
 * Implementation of actions for altering the global [[AccountUIState]] via [[AuthUIActions]] calls.
 * Uses actions injected into the app to make network calls, and then updates the global state accordingly
 * using by dispatching [[AccountActions]] to the [[defaultAccountUIReducer]].
 *
 * @param injectedActions Implementation of network activities.
 * @param dispatch For updating reducer upon completion of network activities.
 */
export declare const AccountActionsCreator: AccountUIActionsCreator;
export {};
