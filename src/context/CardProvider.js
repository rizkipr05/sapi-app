import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext(null);
const STORE_KEY = '@cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORE_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items, ready]);

  const add = (product, qty = 1) => {
    if (!product?.id) return;
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: (next[i].qty || 1) + qty };
        return next;
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          img: product.img,
          price: product.price ?? 0,
          qty,
        },
      ];
    });
  };

  const remove = (id) => setItems(prev => prev.filter(it => it.id !== id));
  const setQty = (id, qty) =>
    setItems(prev => prev.map(it => (it.id === id ? { ...it, qty: Math.max(1, qty) } : it)));
  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + (Number(it.price) || 0) * (it.qty || 1), 0),
    [items]
  );
  const count = useMemo(() => items.reduce((a, it) => a + (it.qty || 1), 0), [items]);

  const value = { ready, items, add, remove, setQty, clear, subtotal, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
