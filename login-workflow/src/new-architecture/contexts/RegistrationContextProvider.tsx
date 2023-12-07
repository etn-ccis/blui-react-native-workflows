import { createContext, useContext } from 'react';

export type eula = {
    eulaAccpted: boolean;
};

export type createAccount = {
    email: string;
};

export type RegistrationContextType = {
    eulaData: eula;
    setEulaData: (eula: eula) => void;
    setcreateAccountScreen: (createAccount: createAccount) => void;
    createAccountScreen: createAccount;
};

export const RegistrationContext = createContext<RegistrationContextType | null>(null);

export const useRegistration = (): RegistrationContextType => {
    const context = useContext(RegistrationContext);

    if (context === null) {
        throw new Error('useRegistration must be used within a RegistrationContextProvider');
    }
    return context;
};
