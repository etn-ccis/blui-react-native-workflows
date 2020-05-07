/**
 * @packageDocumentation
 * @module AuthUIContextProvider
 */

import React from 'react';
import { AuthUIContextProviderProps } from './types';
import AuthUIContext from './context';

function AuthUIContextProvider(props: AuthUIContextProviderProps & { children: React.ReactNode }): JSX.Element {
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
        };

        return propsForContext;
    }, [
        props.allowDebugMode,
        props.authActions,
        props.contactEmail,
        props.contactPhone,
        props.projectImage,
        props.registrationActions,
        props.showSelfRegistration,
        props.title,
    ]);

    return <AuthUIContext.Provider value={memoizedProps}>{props.children}</AuthUIContext.Provider>;
}

export { AuthUIContextProvider };
