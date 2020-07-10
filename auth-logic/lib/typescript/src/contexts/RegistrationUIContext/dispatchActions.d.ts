/**
 * @packageDocumentation
 * @module RegistrationUIContext
 */
import { ActionType } from '../../types/general';
/**
 * Named dispatch actions for account-related global state changes (i.e. load EULA, validate invite registration request, complete registration).
 */
export declare const RegistrationActions: {
    loadEulaReset: () => {
        readonly type: "Registration/LoadEula/Reset";
    };
    loadEulaStarted: (transitId: number | null, language: string) => {
        readonly type: "Registration/LoadEula/Started";
        readonly payload: {
            readonly transitId: number | null;
            readonly language: string;
        };
    };
    loadEulaSucceeded: (transitId: number | null) => {
        readonly type: "Registration/LoadEula/Succeeded";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    loadEulaFailed: (transitId: number | null, errorMessage: string) => {
        readonly type: "Registration/LoadEula/Failed";
        readonly payload: {
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
    requestRegistrationCodeReset: () => {
        readonly type: "Registration/RequestCode/Reset";
    };
    requestRegistrationCodeStarted: (transitId: number | null) => {
        readonly type: "Registration/RequestCode/Started";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    requestRegistrationCodeSucceeded: (transitId: number | null) => {
        readonly type: "Registration/RequestCode/Succeeded";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    requestRegistrationCodeFailed: (transitId: number | null, errorMessage: string) => {
        readonly type: "Registration/RequestCode/Failed";
        readonly payload: {
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
    validateUserRegistrationReset: () => {
        readonly type: "Registration/ValidateUser/Reset";
    };
    validateUserRegistrationStarted: (transitId: number | null) => {
        readonly type: "Registration/ValidateUser/Started";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    validateUserRegistrationSucceeded: (transitId: number | null) => {
        readonly type: "Registration/ValidateUser/Succeeded";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    validateUserRegistrationFailed: (transitId: number | null, errorMessage: string) => {
        readonly type: "Registration/ValidateUser/Failed";
        readonly payload: {
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
    registerUserReset: () => {
        readonly type: "Registration/RegisterUser/Reset";
    };
    registerUserStarted: (transitId: number | null) => {
        readonly type: "Registration/RegisterUser/Started";
        readonly payload: {
            readonly transitId: number | null;
        };
    };
    registerUserSucceeded: (transitId: number | null, email: string, organizationName: string) => {
        readonly type: "Registration/RegisterUser/Succeeded";
        readonly payload: {
            readonly transitId: number | null;
            readonly email: string;
            readonly organizationName: string;
        };
    };
    registerUserFailed: (transitId: number | null, errorMessage: string) => {
        readonly type: "Registration/RegisterUser/Failed";
        readonly payload: {
            readonly transitId: number | null;
            readonly errorMessage: string;
        };
    };
};
export declare type RegistrationActions = ActionType<typeof RegistrationActions>;
