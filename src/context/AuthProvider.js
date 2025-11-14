import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);
const STORE_KEY = '@auth_user_v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // load user dari storage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed);
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  const signin = async (username, password) => {
    if (!username) throw new Error('Username wajib diisi');

    // ⬇️ aturan role: kalau username = "seller" → role "seller"
    const role = username.trim().toLowerCase() === 'seller' ? 'seller' : 'buyer';

    const u = {
      id: Date.now().toString(),
      username: username.trim(),
      email: `${username.trim()}@demo.local`,
      role,           // ⬅️ PENTING
    };

    setUser(u);
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify(u));
    return u;         // ⬅️ supaya LoginScreen bisa tahu role-nya
  };

  const signout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
