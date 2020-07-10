/**
 * The AuthUIContextProvider allows for application code to pass in middleware
 * actions that result from the Authentication and Registration user interface.
 * Often the actions will be the local storage and API calls satisfying
 * [[AuthUIActions]] and [[RegistrationUIActions]]. UI configuration properties
 * are also passed in.
 *
 * @packageDocumentation
 * @module AuthUIContextProvider
 * @preferred
 */
import { AuthUIContextProvider } from './provider';
import { AuthUIContextProviderProps, RegistrationUIActions, AuthUIActions } from './types';
/**
 * Allows for the module to grab the properties / actions passed in from the applications.
 *
 * @category Hooks
 * @private
 * @internal
 */
export declare const useInjectedUIContext: () => AuthUIContextProviderProps;
/** @ignore */
export type { AuthUIContextProviderProps, RegistrationUIActions, AuthUIActions };
/** @ignore */
export { AuthUIContextProvider };
