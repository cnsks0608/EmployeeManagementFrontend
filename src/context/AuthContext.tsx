import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getMe } from '@/services/profileService';

type AuthUser = {
    id: number;
    username: string;
    email: string;
    roleId: number;
    roleName: string;
    employeeId: number;
    employeeRegistrationNumber: string;
    rowStatus: string;
};

type AuthContextType = {
    user: AuthUser | null;
    isLoading: boolean;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    refreshUser: async () => { },  // kullanıcı bilgisini yeniden çeken fonksiyon 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function loadUser() {
        const token = await SecureStore.getItemAsync('token');
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }
        try {
            const meData = await getMe();
            setUser(meData);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, refreshUser: loadUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);  // import ederken kullanacağımız yardımcı fonksiyon 
}