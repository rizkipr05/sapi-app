import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const BRAND = '#3f4d0b';

function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

export default function ProductDetailScreen({ route, navigation }) {
  const product =
    (route && route.params && route.params.product) || {
      id: 'p-1',
      title: 'Produk',
      price: 0,
      img: 'https://picsum.photos/seed/product/800/600',
      seller: undefined,
    };

  const seller = {
    id: (product.seller && product.seller.id) || 'seller-1',
    name: (product.seller && product.seller.name) || 'Penjual',
    avatar:
      (product.seller && product.seller.avatar) ||
      'https://ui-avatars.com/api/?background=3f4d0b&color=fff&name=P',
  };

  const onAskSeller = () => {
    navigation.navigate('ChatRoom', { seller, product });
  };

  const onAddToCart = () => {
    console.log('Tambah ke keranjang', product.id);
  };

  const onBuyNow = () => {
    console.log('Beli sekarang', product.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.title} numberOfLines={1}>
          {product.title || 'Detail Produk'}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <Image
          source={{ uri: product.img || 'https://picsum.photos/seed/placeholder/800/600' }}
          style={styles.image}
        />

        <View style={styles.body}>
          <Text style={styles.price}>{currency(product.price)}</Text>
          <Text style={styles.sold}>3 Terjual</Text>

          <Text style={styles.name}>{product.title}</Text>

          {/* Info penjual */}
          <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: seller.avatar }}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#eee', marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#111' }}>{seller.name}</Text>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>Seller ID: {seller.id}</Text>
            </View>
            <Pressable onPress={onAskSeller} style={[styles.btn, styles.btnAsk, { width: 120 }]}>
              <Text style={styles.txtAsk}>Tanya</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sub}>Detail Produk</Text>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Stok</Text>
            <Text>: 6</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Ukuran</Text>
            <Text>: -</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Berat</Text>
            <Text>: -</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <Pressable style={[styles.btn, styles.btnAsk]} onPress={onAskSeller}>
          <Text style={styles.txtAsk}>Tanya Penjual</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.btnCart]} onPress={onAddToCart}>
          <Text style={styles.txtCart}>Tambah Keranjang</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.btnBuy]} onPress={onBuyNow}>
          <Text style={styles.txtBuy}>Beli</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#f8f6ee',
  },
  title: { fontWeight: '700', color: '#111', fontSize: 16, flex: 1, textAlign: 'center' },
  image: { width: '100%', height: 260, backgroundColor: '#eee' },
  body: { padding: 16 },
  price: { fontSize: 20, fontWeight: '700', color: '#111' },
  sold: { color: '#6b7280', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 12 },
  sub: { fontWeight: '700', color: '#111' },
  detailRow: { flexDirection: 'row', marginTop: 8 },
  key: { width: 80, color: '#6b7280' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  btn: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  btnAsk: { borderWidth: 1, borderColor: '#ddd' },
  btnCart: { backgroundColor: '#eef2e0' },
  btnBuy: { backgroundColor: BRAND },
  txtAsk: { color: '#111', fontWeight: '600' },
  txtCart: { color: BRAND, fontWeight: '700' },
  txtBuy: { color: '#fff', fontWeight: '700' },
});
