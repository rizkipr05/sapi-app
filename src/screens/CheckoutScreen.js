import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCart } from '../context/CardProvider';
import { useOrders } from '../context/OrderProvider';

const BRAND = '#3f4d0b';

function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

export default function CheckoutScreen({ route, navigation }) {
  const { clear, items: cartItems } = useCart();
  const { add: addOrder } = useOrders();
  const from = route?.params?.from || 'cart';

  // Jika lewat "Beli" ambil dari param, kalau dari Cart ambil semua cart
  const items = useMemo(() => {
    const incoming = route?.params?.items || [];
    return incoming.length ? incoming : cartItems;
  }, [route?.params?.items, cartItems]);

  const [address, setAddress] = useState('');
  const [method, setMethod] = useState('qris'); // qris | bank | cod

  const subtotal = useMemo(
    () => items.reduce((a, it) => a + (Number(it.price) || 0) * (it.qty || 1), 0),
    [items]
  );
  const shipping = 10000; // dummy ongkir
  const total = subtotal + shipping;

  const pay = () => {
    if (!items.length) {
      Alert.alert('Checkout', 'Tidak ada item untuk dibayar.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Alamat', 'Mohon isi alamat pengiriman terlebih dahulu.');
      return;
    }

    // buat & simpan order (SIMPAN DULU sebelum navigate)
    const order = {
      id: 'ORD-' + Date.now(),
      items: items.map(it => ({
        id: it.id,
        title: it.title,
        price: it.price ?? 0,
        qty: it.qty || 1,
        img: it.img,
      })),
      subtotal,
      shipping,
      total,
      method, // qris | bank | cod
      address: address.trim(),
      status: 'processing',
      createdAt: Date.now(),
    };

    addOrder(order);                 // ✅ simpan ke History
    if (from === 'cart') clear();    // kosongkan keranjang kalau dari cart

    // ⬇️ pindah ke layar SUKSES → layar tersebut auto-redirect ke History
    navigation.navigate('PaymentSuccess', { orderId: order.id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.img }} style={styles.thumb} />
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.meta}>Qty: {item.qty || 1}</Text>
        <Text style={styles.price}>{currency(item.price)}</Text>
      </View>
      <Text style={styles.lineTotal}>
        {currency((Number(item.price) || 0) * (item.qty || 1))}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 22 }} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(it, idx) => String(it.id) + '-' + idx}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingVertical: 8 }}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: 16, paddingTop: 12, gap: 12 }}>
            <Text style={styles.blockTitle}>Alamat Pengiriman</Text>
            <TextInput
              placeholder="Tulis alamat lengkap..."
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            <Text style={[styles.blockTitle, { marginTop: 8 }]}>Metode Pembayaran</Text>
            <View style={styles.methods}>
              <Pressable
                style={[styles.mBtn, method === 'qris' && styles.mBtnActive]}
                onPress={() => setMethod('qris')}
              >
                <Text style={[styles.mTxt, method === 'qris' && styles.mTxtActive]}>QRIS</Text>
              </Pressable>
              <Pressable
                style={[styles.mBtn, method === 'bank' && styles.mBtnActive]}
                onPress={() => setMethod('bank')}
              >
                <Text style={[styles.mTxt, method === 'bank' && styles.mTxtActive]}>Transfer Bank</Text>
              </Pressable>
              <Pressable
                style={[styles.mBtn, method === 'cod' && styles.mBtnActive]}
                onPress={() => setMethod('cod')}
              >
                <Text style={[styles.mTxt, method === 'cod' && styles.mTxtActive]}>COD</Text>
              </Pressable>
            </View>

            <Text style={[styles.blockTitle, { marginTop: 8 }]}>Ringkasan</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.sumKey}>Subtotal</Text>
              <Text style={styles.sumVal}>{currency(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.sumKey}>Ongkir</Text>
              <Text style={styles.sumVal}>{currency(shipping)}</Text>
            </View>
            <View style={[styles.summaryRow, { marginTop: 6 }]}>
              <Text style={[styles.sumKey, { fontWeight: '800' }]}>Total</Text>
              <Text style={[styles.sumVal, { fontWeight: '800' }]}>{currency(total)}</Text>
            </View>
          </View>
        }
      />

      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6b7280' }}>Total Bayar</Text>
          <Text style={{ fontWeight: '800', fontSize: 18 }}>{currency(total)}</Text>
        </View>
        <Pressable style={styles.payBtn} onPress={pay}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Bayar Sekarang</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#f8f6ee',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: '700', color: '#111' },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sep: { height: 1, backgroundColor: '#f1f5f9', marginLeft: 88 },
  thumb: { width: 64, height: 64, borderRadius: 10, marginRight: 12, backgroundColor: '#eee' },
  title: { color: '#111', fontWeight: '700' },
  meta: { color: '#6b7280', marginTop: 2, fontSize: 12 },
  price: { color: '#111', marginTop: 4 },
  lineTotal: { fontWeight: '700', color: '#111' },

  blockTitle: { fontWeight: '700', color: '#111' },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 10,
    minHeight: 72,
    backgroundColor: '#fff',
  },
  methods: { flexDirection: 'row', gap: 8 },
  mBtn: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  mBtnActive: { backgroundColor: '#eef2e0', borderColor: BRAND },
  mTxt: { color: '#111', fontWeight: '600' },
  mTxtActive: { color: BRAND },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  payBtn: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
