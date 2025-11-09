import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/auth';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil sesi saat pertama kali render
  useEffect(() => {
    (async () => {
      const me = await api.getCurrentUser();
      if (me) setUser(me);
      setLoading(false);
    })();
  }, []);

  /* ---------- Auth Core ---------- */
  const signin = async (username, password) => {
    const res = await api.login({ username, password });
    setUser(res.user);
    return res.user;
  };

  // Mendukung (u,p) maupun (u,p,email,phone) — parameter email/phone opsional
  const signup = async (username, password, email = '', phone = '') => {
    const res = await api.register({ username, password, email, phone });
    setUser(res.user);
    return res.user;
  };

  const signout = async () => {
    await api.logout();
    setUser(null);
  };

  /* ---------- Profile Utils (NEW) ---------- */
  const updateProfile = async (payload) => {
    const updated = await api.updateProfile(payload);
    setUser(updated);
    return updated;
  };

  const changePassword = async (oldPassword, newPassword) => {
    return api.changePassword({ oldPassword, newPassword });
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      signin,
      signup,
      signout,
      updateProfile,
      changePassword,
    }),
    [user, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth must be used inside AuthProvider');
  return v;
}
