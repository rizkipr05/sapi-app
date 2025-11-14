import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const BRAND = '#3f4d0b';
const BG = '#f7f5ef';
const ACCENT = '#facc15';

export default function SellerHomeScreen({ navigation }) {
  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Dashboard Penjual</Text>
          <Text style={styles.sub}>Selamat datang di toko Anda 👋</Text>
        </View>

        <View style={styles.storeBadge}>
          <Ionicons name="storefront-outline" size={18} color={BRAND} />
          <Text style={styles.storeBadgeText}>Toko Aktif</Text>
        </View>
      </View>

      {/* Ringkasan singkat */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ringkasan Hari Ini</Text>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pesanan</Text>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statHint}>Menunggu diproses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pendapatan</Text>
            <Text style={styles.statValue}>Rp 1,2 jt</Text>
            <Text style={styles.statHint}>Hari ini</Text>
          </View>
        </View>
      </View>

      {/* Menu utama */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu Utama</Text>

        {/* Tambah Produk */}
        <Pressable
          style={[styles.menuItem, styles.menuItemPrimary]}
          onPress={() => navigation.navigate('SellerAddProduct')}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.menuText}>Tambah Produk</Text>
        </Pressable>

        {/* History Penjualan */}
        <Pressable
          style={styles.menuItem}
          onPress={() => navigation.navigate('SellerSalesHistory')}
        >
          <View style={styles.menuIconWrap}>
            <Ionicons name="bar-chart-outline" size={22} color="#fff" />
          </View>
          <View style={styles.menuTextWrap}>
            <Text style={styles.menuTitle}>History Penjualan</Text>
            <Text style={styles.menuDesc}>
              Lihat riwayat transaksi dan performa penjualan Anda.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </Pressable>

        {/* Kelola Produk */}
        <Pressable
          style={styles.menuItem}
          onPress={() => navigation.navigate('SellerProducts')}
        >
          <View style={styles.menuIconWrap}>
            <Ionicons name="cube-outline" size={22} color="#fff" />
          </View>
          <View style={styles.menuTextWrap}>
            <Text style={styles.menuTitle}>Kelola Produk</Text>
            <Text style={styles.menuDesc}>
              Lihat, aktif/nonaktifkan, dan hapus produk Anda.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </Pressable>
      </View>

      {/* Tombol chat mengambang */}
      <Pressable
        style={styles.actionBtn}
        onPress={() => navigation.navigate('SellerChats')}
      >
        <Ionicons name="chatbubble-outline" size={20} color="#111" />
        <Text style={styles.actionText}>Chat Customer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: BG,
    padding: 16,
  },

  /** HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: BRAND,
  },
  sub: {
    marginTop: 4,
    color: '#6b7280',
    fontSize: 13,
  },
  storeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#e4ecc7',
    gap: 6,
  },
  storeBadgeText: {
    fontSize: 12,
    color: BRAND,
    fontWeight: '600',
  },

  /** SECTION */
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  /** STATS */
  statRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  statValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '800',
    color: BRAND,
  },
  statHint: {
    marginTop: 4,
    fontSize: 11,
    color: '#9ca3af',
  },

  /** MENU ITEM */
  menuItem: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  // Khusus tombol "Tambah Produk"
  menuItemPrimary: {
    backgroundColor: BRAND,
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },

  menuIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  menuDesc: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },

  /** FLOATING CHAT BUTTON */
  actionBtn: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: ACCENT,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },
});
