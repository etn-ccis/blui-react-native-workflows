import { RegistrationContext } from './context';
import i18nRegistrationInstance from './i18nRegistrationInstance';
import { RegistrationContextProviderProps, RegistrationUIActions, AccountDetails } from './types';
import { RegistrationContextProvider } from './provider';
import { RegistrationDictionaries } from './RegistrationDictionaries';
import { useContext } from 'react';

/**
 * Hook to get the data of each registration workflow screen
 *
 * @category Hooks
 * @private
 * @internal
 */
export const useRegistrationContext = (): RegistrationContextProviderProps => {
    const context = useContext(RegistrationContext);
    if (context === null) {
        throw new Error('useRegistrationContext must be used within an RegistrationContextProvider');
    }
    return context;
};

export type { RegistrationContextProviderProps, RegistrationUIActions, AccountDetails };
export { RegistrationContext, RegistrationContextProvider, i18nRegistrationInstance, RegistrationDictionaries };
