import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthState {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<{
    auth: AuthState | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthState | null>>;
}>({
    auth: null,
    setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
