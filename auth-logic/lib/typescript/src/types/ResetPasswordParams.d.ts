/**
 * @packageDocumentation
 * @module Types
 */
/**
 * Parameters for the [[ResetPasswordSent]] component.
 */
export declare type ResetPasswordParams = {
    email: string;
};
/**
 * Parameters for dynamic password strength requirements.
 */
export declare type PasswordRequirement = {
    description: string;
    regex: RegExp;
};
