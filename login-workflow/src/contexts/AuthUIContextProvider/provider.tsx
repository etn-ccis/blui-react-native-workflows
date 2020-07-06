/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import React from 'react';
import { AuthUIContextProviderProps } from './types';
import { AuthUIContext } from './context';

export const AuthUIContextProvider: React.FC<AuthUIContextProviderProps> = (props) => {
    // Extract the needed properties out
    // Context value will not change unless a sub function is changed
    // NOTE: When adding new props to AuthUIContextProviderProps be sure
    // to also add them here so the parameters are copied.
    const memoizedProps = React.useMemo(() => {
        const propsForContext: AuthUIContextProviderProps = {
            authActions: props.authActions,
            registrationActions: props.registrationActions,
            showSelfRegistration: props.showSelfRegistration,
            title: props.title,
            allowDebugMode: props.allowDebugMode,
            projectImage: props.projectImage,
            contactEmail: props.contactEmail,
            contactPhone: props.contactPhone,
            htmlEula: props.htmlEula,
            passwordRequirements: props.passwordRequirements,
        };

        return propsForContext;
    }, [
        props.allowDebugMode,
        props.authActions,
        props.contactEmail,
        props.contactPhone,
        props.htmlEula,
        props.passwordRequirements,
        props.projectImage,
        props.registrationActions,
        props.showSelfRegistration,
        props.title,
    ]);

    return <AuthUIContext.Provider value={memoizedProps}>{props.children}</AuthUIContext.Provider>;
};
