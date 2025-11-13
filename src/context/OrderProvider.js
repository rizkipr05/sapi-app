import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderContext = createContext(null);
const STORE_KEY = '@orders_v1';

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORE_KEY);
        if (raw) setOrders(JSON.parse(raw));
      } catch {}
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORE_KEY, JSON.stringify(orders)).catch(() => {});
  }, [orders, ready]);

  const add = (order) => {
    setOrders(prev => [{ ...order }, ...prev]); // prepend terbaru di atas
  };

  const clear = () => setOrders([]);
  const count = useMemo(() => orders.length, [orders]);

  const value = { ready, orders, add, clear, count };
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  return useContext(OrderContext);
}
