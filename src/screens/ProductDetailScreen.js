// WAJIB: import yang diperlukan
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/CardProvider';

const BRAND = '#3f4d0b';

/* ========= Helper rupiah ========= */
function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

/** ========== Gambar produk lokal (sapi) ========== */
const LOCAL_COWS = [
  require('../../assets/images/Cow_female_black_white.jpg'),
  require('../../assets/images/sapi-limosin.jpeg'),
  require('../../assets/images/images.jpeg'),
  require('../../assets/images/images (1).jpeg'),
  require('../../assets/images/images (2).jpeg'),
];

const cowImg = (i = 0) => LOCAL_COWS[i % LOCAL_COWS.length];

export default function ProductDetailScreen({ route, navigation }) {
  const product =
    (route && route.params && route.params.product) || {
      id: 'p-1',
      title: 'Produk',
      price: 0,
      index: 0,
      seller: undefined,
    };

  const seller = {
    id: (product.seller && product.seller.id) || 'seller-1',
    name: (product.seller && product.seller.name) || 'Penjual',
    avatar:
      (product.seller && product.seller.avatar) ||
      'https://ui-avatars.com/api/?background=3f4d0b&color=fff&name=P',
  };

  const { add } = useCart();
  const { user } = useAuth(); // cek user login

  // modal sukses tambah keranjang
  const [showSuccess, setShowSuccess] = useState(false);
  // modal wajib login
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginTarget, setLoginTarget] = useState(''); // 'cart' | 'buy' | 'chat'

  const openLoginModal = (target) => {
    setLoginTarget(target);
    setShowLoginModal(true);
  };

  const goLogin = () => {
    setShowLoginModal(false);
    navigation.navigate('Login');
  };

  const onAskSeller = () => {
    // WAJIB LOGIN untuk chat
    if (!user) {
      openLoginModal('chat');
      return;
    }
    navigation.navigate('ChatRoom', { seller, product });
  };

  const onAddToCart = () => {
    // WAJIB LOGIN untuk tambah keranjang
    if (!user) {
      openLoginModal('cart');
      return;
    }

    add(product, 1);
    setShowSuccess(true); // tampilkan modal sukses
  };

  const onGoToCart = () => {
    setShowSuccess(false);
    navigation.navigate('CartTab');
  };

  const onBuyNow = () => {
    // WAJIB LOGIN untuk beli
    if (!user) {
      openLoginModal('buy');
      return;
    }

    navigation.navigate('Checkout', {
      items: [{ ...product, qty: 1 }],
      from: 'product',
    });
  };

  // ========= Gambar lokal saja =========
  const indexFromId = product.id
    ? parseInt(String(product.id).replace(/\D/g, ''), 10) || 0
    : 0;
  const imageSource = cowImg(indexFromId);

  // teks berbeda tergantung target login
  const loginMessage =
    loginTarget === 'cart'
      ? 'Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.'
      : loginTarget === 'buy'
      ? 'Silakan login terlebih dahulu untuk melanjutkan pembelian.'
      : 'Silakan login terlebih dahulu untuk bertanya ke penjual.';

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
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image source={imageSource} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.price}>{currency(product.price)}</Text>
          <Text style={styles.sold}>3 Terjual</Text>

          <Text style={styles.name}>{product.title}</Text>

          {/* Info penjual */}
          <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: seller.avatar }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#eee',
                marginRight: 10,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600', color: '#111' }}>{seller.name}</Text>
              <Text style={{ color: '#6b7280', fontSize: 12 }}>
                Seller ID: {seller.id}
              </Text>
            </View>
            <Pressable
              onPress={onAskSeller}
              style={[styles.btn, styles.btnAsk, { width: 120 }]}
            >
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

      {/* MODAL SUKSES TAMBAH KERANJANG */}
      <Modal
        transparent
        visible={showSuccess}
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.backdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowSuccess(false)}
          />
          <View style={styles.dialog}>
            <View style={[styles.dialogIcon, { backgroundColor: '#ecfccb' }]}>
              <Ionicons name="cart-outline" size={26} color={BRAND} />
            </View>
            <Text style={styles.dialogTitle}>Produk ditambahkan</Text>
            <Text style={styles.dialogText}>
              Produk berhasil dimasukkan ke keranjang belanja Anda.
            </Text>

            <View style={styles.actions}>
              <Pressable
                onPress={() => setShowSuccess(false)}
                style={styles.btnOutline}
                hitSlop={8}
              >
                <Text style={styles.btnOutlineText}>Lanjut Belanja</Text>
              </Pressable>
              <Pressable
                onPress={onGoToCart}
                style={styles.btnPrimary}
                hitSlop={8}
              >
                <Text style={styles.btnPrimaryText}>Lihat Keranjang</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL WAJIB LOGIN (mirip popup logout) */}
      <Modal
        transparent
        visible={showLoginModal}
        animationType="fade"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View style={styles.backdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setShowLoginModal(false)}
          />
          <View style={styles.dialog}>
            <View style={[styles.dialogIcon, { backgroundColor: '#fee2e2' }]}>
              <Ionicons name="log-in-outline" size={26} color={BRAND} />
            </View>
            <Text style={styles.dialogTitle}>Login dibutuhkan</Text>
            <Text style={styles.dialogText}>{loginMessage}</Text>

            <View style={styles.actions}>
              <Pressable
                onPress={() => setShowLoginModal(false)}
                style={styles.btnOutline}
                hitSlop={8}
              >
                <Text style={styles.btnOutlineText}>Batal</Text>
              </Pressable>
              <Pressable onPress={goLogin} style={styles.btnPrimary} hitSlop={8}>
                <Text style={styles.btnPrimaryText}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  title: {
    fontWeight: '700',
    color: '#111',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
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

  // ====== STYLE MODAL (mirip popup logout) ======
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    alignItems: 'center',
  },
  dialogIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dialogTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  dialogText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
    alignSelf: 'stretch',
  },
  btnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: BRAND,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnOutlineText: { color: BRAND, fontWeight: '700' },
  btnPrimary: {
    flex: 1,
    backgroundColor: BRAND,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700' },
});
