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
import { useAuth } from '../../context/AuthProvider';

const BRAND = '#3f4d0b';

export default function SellerProfileScreen({ navigation }) {
  const { user, signout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const doSignout = async () => {
    closeConfirm();
    await signout();
  };

  const storeName = user?.storeName || user?.username || 'Toko Saya';
  const email = user?.email || '-';
  const roleLabel = 'Akun Penjual';

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* HEADER TOKO */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="storefront-outline" size={110} color="#c7c7c7" />
            )}

            <View style={styles.camBadge}>
              <Ionicons name="camera-outline" size={16} color="#fff" />
            </View>
          </View>

          <Text style={styles.name}>{storeName}</Text>
          <Text style={styles.email}>{email}</Text>
          <View style={styles.roleTag}>
            <Ionicons name="business-outline" size={14} color={BRAND} />
            <Text style={styles.roleText}>{roleLabel}</Text>
          </View>
        </View>

        {/* MENU LIST PENJUAL */}
        <View style={styles.list}>
          <SectionTitle label="Pengaturan Toko" />

          <MenuItem
            icon="create-outline"
            label="Profil Toko"
            desc="Nama toko, alamat, kontak"
            onPress={() => navigation.navigate('SellerEditProfile')}
          />

          <MenuItem
            icon="cube-outline"
            label="Produk Saya"
            desc="Kelola daftar produk"
            onPress={() => navigation.navigate('SellerProducts')}
          />

          <MenuItem
            icon="add-circle-outline"
            label="Tambah Produk"
            desc="Upload produk baru"
            onPress={() => navigation.navigate('SellerAddProduct')}
          />

          <SectionTitle label="Transaksi & Pelanggan" />

          <MenuItem
            icon="chatbubbles-outline"
            label="Chat Customer"
            desc="Balas pesan dari pembeli"
            onPress={() => navigation.navigate('SellerChats')}
          />

          <MenuItem
            icon="receipt-outline"
            label="Riwayat Penjualan"
            desc="Lihat pesanan yang masuk"
            onPress={() => navigation.navigate('SellerSalesHistory')}
          />

          <SectionTitle label="Lainnya" />


          {/* Logout dengan konfirmasi */}
          <MenuItem
            icon="log-out-outline"
            label="Keluar"
            danger
            onPress={openConfirm}
          />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* MODAL KONFIRM LOGOUT */}
      <Modal
        transparent
        visible={showConfirm}
        animationType="fade"
        statusBarTranslucent
        presentationStyle="overFullScreen"
        onRequestClose={closeConfirm}
      >
        <View style={styles.backdrop}>
          <Pressable style={StyleSheet.absoluteFill} onPress={closeConfirm} />

          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="log-out-outline" size={26} color="#b91c1c" />
            </View>
            <Text style={styles.dialogTitle}>Keluar dari akun penjual?</Text>
            <Text style={styles.dialogDesc}>
              Anda akan kembali ke halaman login. Pastikan data sudah tersimpan.
            </Text>

            <View style={styles.actions}>
              <Pressable onPress={closeConfirm} style={styles.btnOutline} hitSlop={8}>
                <Text style={styles.btnOutlineText}>Batal</Text>
              </Pressable>
              <Pressable onPress={doSignout} style={styles.btnPrimary} hitSlop={8}>
                <Text style={styles.btnPrimaryText}>Keluar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function SectionTitle({ label }) {
  return (
    <Text style={styles.sectionTitle}>
      {label}
    </Text>
  );
}

function MenuItem({ icon, label, desc, onPress, danger }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.item, danger && styles.itemDanger]}
      android_ripple={{ color: 'rgba(255,255,255,0.18)' }}
    >
      <View style={styles.itemL}>
        <View style={[styles.iconBox, danger && styles.iconBoxDanger]}>
          <Ionicons
            name={icon}
            size={18}
            color={danger ? '#b91c1c' : BRAND}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemText, danger && styles.itemTextDanger]}>
            {label}
          </Text>
          {desc ? <Text style={styles.itemDesc}>{desc}</Text> : null}
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={danger ? '#fecaca' : '#e5e7eb'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f3efe8',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 24,
  },
  avatarWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 999, backgroundColor: '#e5e7eb' },
  camBadge: {
    position: 'absolute',
    right: 6,
    bottom: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { marginTop: 8, fontWeight: '700', fontSize: 18, color: '#111' },
  email: { color: '#6b7280', marginTop: 2 },
  roleTag: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#e4ead5',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  roleText: { fontSize: 12, color: BRAND, fontWeight: '600' },

  list: { padding: 16, gap: 8 },

  sectionTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#9ca3af',
    marginTop: 10,
    marginBottom: 4,
  },

  item: {
    backgroundColor: BRAND,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemDanger: {
    backgroundColor: '#fee2e2',
  },
  itemL: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#e4ead5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDanger: {
    backgroundColor: '#fee2e2',
  },
  itemText: { color: '#fff', fontWeight: '700' },
  itemTextDanger: { color: '#b91c1c' },
  itemDesc: { fontSize: 11, color: '#e5e7eb', marginTop: 2 },

  // Modal overlay tengah
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
    marginBottom: 4,
  },
  dialogDesc: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 13,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  btnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: BRAND,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  btnOutlineText: { color: BRAND, fontWeight: '700' },
  btnPrimary: {
    flex: 1,
    backgroundColor: BRAND,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700' },
});
