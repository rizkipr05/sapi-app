import { Ionicons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useOrders } from '../../context/OrderProvider';

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

export default function SellerSalesHistoryScreen({ navigation }) {
  const { orders, clear } = useOrders();

  // total omset
  const totalRevenue = useMemo(
    () => orders.reduce((a, o) => a + (Number(o.total) || 0), 0),
    [orders]
  );

  const onBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // kembali aman ke halaman utama seller
      navigation.navigate('SellerProfile');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.id}>#{item.id}</Text>
        <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.label}>Metode</Text>
        <Text style={styles.val}>{item.method?.toUpperCase?.() || '-'}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.label}>Jumlah Item</Text>
        <Text style={styles.val}>{item.items?.length || 0}</Text>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusChip}>
          <Text style={styles.statusText}>
            {item.status === 'processing' ? 'Diproses' : (item.status || '—')}
          </Text>
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text style={[styles.label, { fontWeight: '800' }]}>Total</Text>
        <Text style={[styles.val, { fontWeight: '800' }]}>{currency(item.total)}</Text>
      </View>

      {!!item.address && (
        <Text style={styles.addr} numberOfLines={2}>
          {item.address}
        </Text>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>History Penjualan</Text>
        <Pressable
          onPress={() => {
            if (!orders.length) return;
            // konfirmasi sebelum hapus semua
            // (optional, bisa pakai Alert kalau mau)
            // di sini simple saja: langsung clear
            clear();
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#b91c1c" />
        </Pressable>
      </View>

      {/* Ringkasan atas */}
      <View style={styles.summaryBox}>
        <Text style={styles.sumLabel}>Total Omset</Text>
        <Text style={styles.sumVal}>{currency(totalRevenue)}</Text>
        <Text style={styles.sumSub}>
          {orders.length} transaksi tercatat
        </Text>
      </View>

      {/* List penjualan */}
      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="bar-chart-outline" size={40} color="#9ca3af" />
          <Text style={{ color: '#6b7280', marginTop: 8 }}>
            Belum ada penjualan yang tercatat
          </Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, gap: 12, paddingTop: 0 }}
        />
      )}
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
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '700', fontSize: 16, color: '#111' },

  summaryBox: {
    margin: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f1f5e9',
  },
  sumLabel: { color: '#6b7280', fontSize: 12 },
  sumVal: { fontWeight: '800', fontSize: 20, color: BRAND, marginTop: 4 },
  sumSub: { color: '#6b7280', fontSize: 12, marginTop: 2 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    backgroundColor: '#fff',
  },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  id: { fontWeight: '800', color: '#111' },
  date: { color: '#6b7280', fontSize: 12 },
  label: { color: '#6b7280', fontSize: 13 },
  val: { color: '#111', fontSize: 13 },
  addr: { color: '#6b7280', marginTop: 8, fontSize: 12 },

  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#ecfdf3',
  },
  statusText: {
    fontSize: 11,
    color: '#15803d',
    fontWeight: '700',
  },
});
