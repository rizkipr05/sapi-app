import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useOrders } from '../context/OrderProvider';

const BRAND = '#3f4d0b';

function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

function formatDate(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString('id-ID');
  } catch {
    return String(ts);
  }
}

export default function OrderHistoryScreen({ navigation }) {
  const { orders, clear } = useOrders();
  const [showConfirm, setShowConfirm] = useState(false);

  // BALIK HANYA KE PROFIL (ProfileMain)
  const onBack = () => {
    navigation.navigate('ProfileMain');
  };

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const doClear = () => {
    clear();
    closeConfirm();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.id}>#{item.id}</Text>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Metode</Text>
        <Text style={styles.val}>{item.method.toUpperCase()}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Item</Text>
        <Text style={styles.val}>{item.items?.length || 0}</Text>
      </View>
      <View style={styles.rowBetween}>
        <Text style={[styles.label, { fontWeight: '800' }]}>Total</Text>
        <Text style={[styles.val, { fontWeight: '800' }]}>{currency(item.total)}</Text>
      </View>
      <Text style={styles.addr} numberOfLines={2}>
        {item.address}
      </Text>
    </View>
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={onBack}>
            <Ionicons name="chevron-back" size={22} color="#111" />
          </Pressable>
          <Text style={styles.headerTitle}>Riwayat Pesanan</Text>

          {/* ikon hapus hanya muncul jika ada data */}
          {orders.length > 0 ? (
            <Pressable onPress={openConfirm}>
              <Ionicons name="trash-outline" size={20} color="#b91c1c" />
            </Pressable>
          ) : (
            <View style={{ width: 20 }} />
          )}
        </View>

        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="time-outline" size={48} color="#9ca3af" />
            <Text style={{ color: '#6b7280', marginTop: 6 }}>Belum ada pesanan</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(it) => String(it.id)}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16, gap: 12 }}
          />
        )}
      </View>

      {/* Modal konfirmasi hapus riwayat */}
      <Modal
        transparent
        visible={showConfirm}
        animationType="fade"
        statusBarTranslucent
        presentationStyle="overFullScreen"
        onRequestClose={closeConfirm}
      >
        <View style={styles.backdrop}>
          {/* tutup saat tap area gelap */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closeConfirm} />

          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="trash-outline" size={26} color="#b91c1c" />
            </View>
            <Text style={styles.dialogTitle}>Hapus riwayat pesanan?</Text>
            <Text style={styles.dialogText}>
              Riwayat pesanan yang dihapus tidak dapat dikembalikan.
            </Text>

            <View style={styles.actions}>
              <Pressable onPress={closeConfirm} style={styles.btnOutline} hitSlop={8}>
                <Text style={styles.btnOutlineText}>Batal</Text>
              </Pressable>
              <Pressable onPress={doClear} style={styles.btnPrimary} hitSlop={8}>
                <Text style={styles.btnPrimaryText}>Hapus</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#f8f6ee',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '700', color: '#111' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    backgroundColor: '#fff',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  id: { fontWeight: '800', color: '#111' },
  date: { color: '#6b7280' },
  label: { color: '#6b7280' },
  val: { color: '#111' },
  addr: { color: '#6b7280', marginTop: 8, fontSize: 12 },

  /* ==== Modal styles ==== */
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
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  dialogIcon: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
    marginTop: 4,
  },
  dialogText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  btnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: BRAND,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnOutlineText: { color: BRAND, fontWeight: '700' },
  btnPrimary: {
    flex: 1,
    backgroundColor: BRAND,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700' },
});