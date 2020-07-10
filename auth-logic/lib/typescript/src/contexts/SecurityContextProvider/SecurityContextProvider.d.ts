/**
 * @packageDocumentation
 * @module SecurityContextProvider
 */
import React from 'react';
import { SecurityContextState, SecurityContextActions } from './types';
/** @ignore */
declare const DispatchContext: React.Context<SecurityContextActions | null>;
/**
 * A hook to get the security state (authenticated / not authenticated).
 *
 * NOTE: Must be used inside of a [[SecurityContextProvider]].
 * @category Hooks
 */
declare const useSecurityState: () => SecurityContextState;
/**
 * A hook to get the security actions (on authenticated / on not authenticated).
 *
 * NOTE: Must be used inside of a [[SecurityContextProvider]].
 * @category Hooks
 */
declare const useSecurityActions: () => SecurityContextActions;
/**
 *  Provides a wrapper for the security state and security actions.
 *
 *  @public
 *  @category Component
 */
declare const SecurityContextProvider: React.FC;
export { SecurityContextProvider, DispatchContext as SecurityActionContext, useSecurityState, useSecurityActions };
