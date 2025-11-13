import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCart } from '../context/CardProvider';

const BRAND = '#3f4d0b';
const LIGHT_BG = '#f8f6ee';

function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

export default function CartScreen({ navigation }) {
  const { items, setQty, remove, clear, subtotal } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [targetItem, setTargetItem] = useState(null);

  const openConfirm = (item) => {
    setTargetItem(item);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (targetItem) remove(targetItem.id);
    setShowModal(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.img }} style={styles.thumb} />
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{currency(item.price)}</Text>

        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => setQty(item.id, Math.max(1, (item.qty || 1) - 1))}
          >
            <Ionicons name="remove" size={16} color="#111" />
          </Pressable>
          <Text style={styles.qtyText}>{item.qty || 1}</Text>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => setQty(item.id, (item.qty || 1) + 1)}
          >
            <Ionicons name="add" size={16} color="#111" />
          </Pressable>
        </View>
      </View>

      {/* tombol hapus */}
      <Pressable onPress={() => openConfirm(item)} style={styles.trash}>
        <Ionicons name="trash-outline" size={18} color="#b91c1c" />
      </Pressable>
    </View>
  );

  if (!items.length) {
    return (
      <View style={styles.emptyWrap}>
        <Ionicons name="cart-outline" size={48} color="#9ca3af" />
        <Text style={{ color: '#6b7280', marginTop: 8 }}>Keranjang kosong</Text>
        <Pressable style={styles.backBtn} onPress={() => navigation.navigate('HomeTab')}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Belanja Sekarang</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Keranjang</Text>
        <Pressable onPress={clear}>
          <Text style={{ color: '#ef4444', fontWeight: '600' }}>Kosongkan</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <View style={styles.footer}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#6b7280' }}>Subtotal</Text>
          <Text style={{ fontWeight: '800', fontSize: 18 }}>{currency(subtotal)}</Text>
        </View>

        <Pressable
          style={styles.checkout}
          onPress={() =>
            navigation.navigate('Checkout', { items: [], from: 'cart' })
          }
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>Checkout</Text>
        </Pressable>
      </View>

      {/* === Modal Konfirmasi Hapus === */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIcon}>
              <Ionicons name="trash-outline" size={40} color="#b91c1c" />
            </View>
            <Text style={styles.modalTitle}>Hapus Item</Text>
            <Text style={styles.modalMsg}>
              Apakah Anda yakin ingin menghapus {targetItem?.title ? `"${targetItem.title}"` : 'item ini'} dari keranjang?
            </Text>
            <View style={styles.modalBtns}>
              <Pressable
                style={[styles.mBtn, styles.mCancel]}
                onPress={() => setShowModal(false)}
              >
                <Text style={[styles.mText, { color: BRAND }]}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.mBtn, styles.mDelete]}
                onPress={confirmRemove}
              >
                <Text style={[styles.mText, { color: '#fff' }]}>Hapus</Text>
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
    backgroundColor: LIGHT_BG,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '700', fontSize: 16, color: '#111' },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sep: { height: 1, backgroundColor: '#f1f5f9', marginLeft: 88 },
  thumb: { width: 72, height: 72, borderRadius: 10, marginRight: 12, backgroundColor: '#eee' },
  title: { color: '#111', fontWeight: '700' },
  price: { color: '#111', marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  qtyText: { marginHorizontal: 12, fontWeight: '700', color: '#111' },
  trash: { padding: 6 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkout: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
  },
  backBtn: {
    marginTop: 10,
    backgroundColor: BRAND,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  /* === Modal === */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  modalMsg: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 16,
  },
  modalBtns: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  mBtn: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mCancel: {
    borderWidth: 1,
    borderColor: BRAND,
    backgroundColor: '#fff',
  },
  mDelete: {
    backgroundColor: BRAND,
  },
  mText: {
    fontWeight: '700',
    fontSize: 15,
  },
});
