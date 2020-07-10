/**
 * @packageDocumentation
 * @module AccountUIContext
 */
import { TransitState } from '../TransitState';
/**
 * Network state and email for a user attempting to authenticate into the app.
 *
 * @param email The email with which a user is attempting to authenticate into the app.
 */
declare type LoginState = TransitState & {
    email: string | null;
};
/**
 * Network state and email for a user requesting forgot password.
 *
 * @param email The email belonging to the account for which a user is doing a forgot password request.
 */
declare type ForgotPasswordState = TransitState & {
    email: string | null;
};
/**
 * Network state for a user attempting to set a new password using a verify reset code after requestion forgot password.
 *
 * @param setPasswordTransit Network state for setting a new password for a user who has made a forgot password request.
 * @param verifyResetCodeTransit Network state for verifying the reset password code for a user who has made a forgot password request.
 */
declare type SetPasswordState = {
    setPasswordTransit: TransitState;
    verifyResetCodeTransit: TransitState;
};
/**
 * Global state for authentication-related activities and forgotten password retrieval.
 *
 * @param userToken The current user's authentication token.
 * @param email The email of the current user.
 * @param login State of authentication for the current user, including transit state of the call.
 * @param forgotPassword State of a forgot password request (which then sends an email to the user's account).
 * @param setPassword State of the setPassword request, after a user begins resetting a forgotten password using the deep link token from their email.
 */
export declare type AccountUIState = {
    userToken: string | null;
    email: string | null;
    login: LoginState;
    forgotPassword: ForgotPasswordState;
    setPassword: SetPasswordState;
};
/**
 * Default initial state for [[AccountUIState]] upon app start.
 */
export declare const initialAccountUIState: AccountUIState;
export {};
