/**
 * @packageDocumentation
 * @module AccountUIContext
 */
import { ActionType } from '../../types/general';
/**
 * Named dispatch actions for account-related global state changes (i.e. login, forgot password, set password, verify reset code).
 */
export declare const AccountActions: {
    loginStarted: (email: string, transitId: number | null) => {
        readonly type: "Authentication/Login/Started";
        readonly payload: {
            readonly email: string;
            readonly transitId: number | null;
        };
    };
    loginSucceeded: (email: string, transitId: number | null) => {
        readonly type: "Authentication/Login/Succeeded";
        readonly payload: {
            readonly email: string;
            readonly transitId: number | null;
        };
    };
    loginFailed: (email: string, transitId: number | null, errorMessage: string) => {
        readonly type: "Authentication/Login/Failed";
        readonly payload: {
            readonly email: string;
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
    logout: () => {
        readonly type: "Authentication/Logout/Reset";
    };
    resetPasswordReset: () => {
        readonly type: "Authentication/ResetPassword/Reset";
    };
    resetPasswordStarted: (email: string, transitId: number | null) => {
        readonly type: "Authentication/ResetPassword/Started";
        readonly payload: {
            readonly email: string;
            readonly transitId: number | null;
        };
    };
    resetPasswordSucceeded: (email: string, transitId: number | null) => {
        readonly type: "Authentication/ResetPassword/Succeeded";
        readonly payload: {
            readonly email: string;
            readonly transitId: number | null;
        };
    };
    resetPasswordFailed: (email: string, transitId: number | null, errorMessage: string) => {
        readonly type: "Authentication/ResetPassword/Failed";
        readonly payload: {
            readonly email: string;
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
    verifyResetCodeReset: () => {
        readonly type: "Authentication/VerifyResetCode/Reset";
    };
    verifyResetCodeStarted: (transitId: number | null) => {
        readonly type: "Authentication/VerifyResetCode/Started";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    verifyResetCodeSucceeded: (transitId: number | null) => {
        readonly type: "Authentication/VerifyResetCode/Succeeded";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    verifyResetCodeFailed: (transitId: number | null, errorMessage: string) => {
        readonly type: "Authentication/VerifyResetCode/Failed";
        readonly payload: {
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
    setPasswordReset: () => {
        readonly type: "Authentication/SetPassword/Reset";
    };
    setPasswordStarted: (transitId: number | null) => {
        readonly type: "Authentication/SetPassword/Started";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    setPasswordSucceeded: (transitId: number | null) => {
        readonly type: "Authentication/SetPassword/Succeeded";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    setPasswordFailed: (transitId: number | null, errorMessage: string) => {
        readonly type: "Authentication/SetPassword/Failed";
        readonly payload: {
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
};
export declare type AccountActions = ActionType<typeof AccountActions>;
