import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useOrders } from '../context/OrderProvider';

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

  const onBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // Pastikan kembali ke tab Profile → ProfileMain
      navigation.navigate('ProfileTab', { screen: 'ProfileMain' });
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Riwayat Pesanan</Text>
        <Pressable
          onPress={() => {
            Alert.alert('Riwayat', 'Kosongkan semua riwayat?', [
              { text: 'Batal' },
              { text: 'Kosongkan', style: 'destructive', onPress: clear },
            ]);
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#b91c1c" />
        </Pressable>
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
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  id: { fontWeight: '800', color: '#111' },
  date: { color: '#6b7280' },
  label: { color: '#6b7280' },
  val: { color: '#111' },
  addr: { color: '#6b7280', marginTop: 8, fontSize: 12 },
});
