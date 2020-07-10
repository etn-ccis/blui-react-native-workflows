/**
 * @packageDocumentation
 * @module SecurityContextProvider
 */
import { SecurityContextState } from './types';
/**
 * @internal
 * @private
 */
export declare type Action = {
    type: 'userAuthenticated';
    payload: {
        email: string;
        userId: string;
        rememberMe: boolean;
    };
} | {
    type: 'userNotAuthenticated';
    payload: {
        clearRememberMe?: boolean;
        overrideRememberMeEmail?: string;
    };
} | {
    type: 'showChangePassword';
} | {
    type: 'hideChangePassword';
};
/**
 * @internal
 * @private
 *
 * Reducer for [[SecurityContextProvider]].
 *
 * @param prevState Previous [[SecurityContextState]] to update.
 * @param action State change action, which should be of type [[Action]].
 */
export declare const reducer: (prevState: SecurityContextState, action: Action) => SecurityContextState;
