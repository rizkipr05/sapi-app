// src/context/ProductProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { listProducts } from '../services/products';

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await listProducts();
        setProducts(data || []);
      } catch (e) {
        console.log('load products error', e);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const add = (payload) => {
    const id = payload.id || 'p-' + Date.now();
    const newProduct = {
      id,
      title: payload.title || 'Produk',
      price: Number(payload.price) || 0,
      img: payload.img || null,
      seller: payload.seller || null,
    };
    setProducts((prev) => [newProduct, ...prev]); // prepend biar muncul di atas
    return newProduct;
  };

  const value = { ready, products, add };
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  return useContext(ProductContext);
}
