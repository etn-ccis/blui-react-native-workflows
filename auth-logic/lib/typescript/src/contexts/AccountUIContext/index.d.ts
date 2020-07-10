/**
 * AccountUIStateContext and AccountUIActionContext provide access to global state and actions for account related information (login, forgot password, verify reset password code, etc.).
 *
 * @packageDocumentation
 * @module AccountUIContext
 * @preferred
 * @internal
 */
import { StateContext, ActionContext } from './context';
import { AccountUIContextActions } from './types';
export * from './types';
export * from './reducer';
import { AccountActions } from './dispatchActions';
import { AccountUIState } from './state';
/**
 * Hook for using the global account state for account-related global [[AccountUIState]] state changes (i.e. login, forgot password, set password, verify reset code).
 *
 * @category Hooks
 */
export declare const useAccountUIState: () => AccountUIState;
/**
 * Hook for using the global [[AccountUIActions]] actions (i.e. logIn, forgotPassword, etc.) which change the global [[AccountUIState]].
 *
 * @category Hooks
 */
export declare const useAccountUIActions: () => AccountUIContextActions;
export { StateContext as AccountUIStateContext, ActionContext as AccountUIActionContext, AccountActions };
