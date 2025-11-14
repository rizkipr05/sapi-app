import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const BRAND = '#3f4d0b';
const BG = '#f7f5ef';

/** Gambar dummy (kalau mau pakai, sesuaikan dengan aset kamu) */
const LOCAL_COWS = [
    require('../../../assets/images/sapi-limosin.jpeg'),
    require('../../../assets/images/images.jpeg'),
    require('../../../assets/images/images (1).jpeg'),
    require('../../../assets/images/images (2).jpeg'),
  ];
  

const cowImg = (i = 0) => LOCAL_COWS[i % LOCAL_COWS.length];

function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

// ====== DATA DUMMY PRODUK ======
const DUMMY_PRODUCTS = [
  {
    id: 'p-1',
    title: 'Sapi Limosin Super',
    price: 25000000,
    stock: 3,
    status: 'active',
  },
  {
    id: 'p-2',
    title: 'Sapi PO Siap Qurban',
    price: 18000000,
    stock: 5,
    status: 'active',
  },
  {
    id: 'p-3',
    title: 'Sapi Bali Premium',
    price: 22000000,
    stock: 2,
    status: 'inactive',
  },
  {
    id: 'p-4',
    title: 'Sapi Madura Jumbo',
    price: 30000000,
    stock: 1,
    status: 'active',
  },
];

export default function SellerProductsScreen({ navigation }) {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('SellerHome');
  };

  const toggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
          : p
      )
    );
  };

  const deleteProduct = (id) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    Alert.alert(
      'Hapus Produk',
      `Yakin ingin menghapus "${target.title}"?`,
      [
        { text: 'Batal' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setProducts((prev) => prev.filter((p) => p.id !== id));
          },
        },
      ]
    );
  };

  const editProduct = (item) => {
    // Kalau AddProductScreen sudah mendukung edit, bisa kirim param product
    navigation.navigate('SellerAddProduct', { product: item });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      {/* Gambar */}
      <Image source={cowImg(index)} style={styles.thumb} />

      {/* Info utama */}
      <View style={{ flex: 1, paddingRight: 8 }}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{currency(item.price)}</Text>
        <Text style={styles.meta}>Stok: {item.stock}</Text>

        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusBadge,
              item.status === 'active'
                ? styles.statusActive
                : styles.statusInactive,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === 'active'
                  ? styles.statusTextActive
                  : styles.statusTextInactive,
              ]}
            >
              {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
            </Text>
          </View>

          <Pressable
            style={styles.statusToggle}
            onPress={() => toggleStatus(item.id)}
          >
            <Ionicons
              name="swap-horizontal-outline"
              size={16}
              color="#111827"
            />
            <Text style={styles.statusToggleText}>Ubah Status</Text>
          </Pressable>
        </View>
      </View>

      {/* Tombol edit & hapus */}
      <View style={styles.actionsCol}>
        <Pressable style={styles.iconBtn} onPress={() => editProduct(item)}>
          <Ionicons name="create-outline" size={18} color="#2563eb" />
        </Pressable>
        <Pressable
          style={[styles.iconBtn, { marginTop: 6 }]}
          onPress={() => deleteProduct(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#b91c1c" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Kelola Produk</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Tombol tambah produk di atas list */}
      <View style={styles.topBar}>
        <Text style={styles.totalTxt}>
          Total produk: <Text style={{ fontWeight: '800' }}>{products.length}</Text>
        </Text>
        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate('SellerAddProduct')}
        >
          <Ionicons name="add-circle-outline" size={18} color="#fff" />
          <Text style={styles.addBtnText}>Tambah Produk</Text>
        </Pressable>
      </View>

      {/* List produk */}
      {products.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="pricetag-outline" size={42} color="#9ca3af" />
          <Text style={{ color: '#6b7280', marginTop: 6 }}>
            Belum ada produk. Tambah produk dulu.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16, gap: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    height: 56,
    backgroundColor: '#f8f6ee',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontWeight: '700', fontSize: 16, color: '#111' },

  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalTxt: {
    color: '#6b7280',
    fontSize: 13,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: BRAND,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  thumb: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#e5e7eb',
  },
  title: {
    fontWeight: '700',
    color: '#111827',
    fontSize: 14,
  },
  price: {
    marginTop: 4,
    color: BRAND,
    fontWeight: '700',
  },
  meta: {
    marginTop: 2,
    fontSize: 12,
    color: '#6b7280',
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusInactive: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextActive: {
    color: '#15803d',
  },
  statusTextInactive: {
    color: '#b91c1c',
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  statusToggleText: {
    fontSize: 11,
    color: '#111827',
    fontWeight: '600',
  },

  actionsCol: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 4,
  },
  iconBtn: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: '#f3f4f6',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
