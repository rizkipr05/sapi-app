// src/context/AuthProvider.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// user yang sedang login
const STORE_KEY = "@auth_user_v1";
// daftar semua user terdaftar
const USERS_KEY = "@auth_users_v1";

async function loadUsers() {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Gagal load users", e);
    return [];
  }
}

async function saveUsers(users) {
  try {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Gagal simpan users", e);
    throw e;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {id, username, role, ...}
  const [loading, setLoading] = useState(true);

  // load user yang sedang login dari storage saat app dibuka
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed);
        }
      } catch (e) {
        console.error("Gagal load current user", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * Daftar user baru
   * dipakai di RegisterScreen:
   *    await signup(username.trim(), pwd, role)
   */
  const signup = async (username, password, role = "buyer") => {
    const uname = username.trim();

    if (!uname || !password) {
      throw new Error("Nama pengguna dan sandi wajib diisi.");
    }

    const users = await loadUsers();

    const exists = users.find(
      (u) => u.username.toLowerCase() === uname.toLowerCase(),
    );
    if (exists) {
      throw new Error("Nama pengguna sudah digunakan.");
    }

    const now = Date.now();
    const newUser = {
      id: now.toString(),
      username: uname,
      email: `${uname}@demo.local`,
      password, // NOTE: demo, belum di-hash
      role: role === "seller" ? "seller" : "buyer",
      createdAt: now,
    };

    const updated = [...users, newUser];
    await saveUsers(updated);

    // tidak auto-login, biar flow tetap: daftar -> kembali ke Login
    return newUser;
  };

  /**
   * Login user
   * dipakai di LoginScreen:
   *    const loggedUser = await signin(username.trim(), pwd)
   */
  const signin = async (username, password) => {
    const uname = username.trim();

    if (!uname || !password) {
      throw new Error("Nama pengguna dan sandi wajib diisi.");
    }

    const users = await loadUsers();

    const found = users.find(
      (u) =>
        u.username.toLowerCase() === uname.toLowerCase() &&
        u.password === password,
    );

    if (!found) {
      throw new Error("Nama pengguna atau sandi salah.");
    }

    // set user di context & simpan ke storage
    setUser(found);
    await AsyncStorage.setItem(STORE_KEY, JSON.stringify(found));
    return found; // supaya LoginScreen bisa baca role
  };

  const signout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        signin,
        signout,
        isSeller: user?.role === "seller",
        isBuyer: user?.role === "buyer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return ctx;
}
