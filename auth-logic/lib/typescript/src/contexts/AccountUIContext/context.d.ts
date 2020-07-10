/**
 * @packageDocumentation
 * @module AccountUIContext
 */
/// <reference types="react" />
import { AccountUIContextActions } from './types';
import { AccountUIState } from './state';
declare const StateContext: import("react").Context<AccountUIState>;
declare const ActionContext: import("react").Context<AccountUIContextActions | null>;
export { StateContext, ActionContext };
