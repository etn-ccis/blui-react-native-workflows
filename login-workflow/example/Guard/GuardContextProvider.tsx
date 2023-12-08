import { createContext, useContext } from 'react';

export type AppContextType = {
    isAuthenticated?: boolean;
    setIsAutheisAuthenticated?: any;
    fallbackScreen?: any;
    setFallbackScreen?: any;
};

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);

    if (context === null) {
        throw new Error('useApp must be used within a AppContextProvider');
    }
    return context;
};
