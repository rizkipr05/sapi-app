import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useAuth } from '../context/AuthProvider';

const BRAND = '#3f4d0b';

export default function ProfileScreen({ navigation }) {
  const { user, signout } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);
  const doSignout = async () => {
    closeConfirm();
    await signout();
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* header avatar */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={110} color="#c7c7c7" />
            )}
            <View style={styles.camBadge}>
              <Ionicons name="camera-outline" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.name}>{user?.username || '-'}</Text>
          <Text style={styles.email}>{user?.email || '—'}</Text>
        </View>

        {/* menu list */}
        <View style={styles.list}>
          <MenuItem
            icon="create-outline"
            label="Edit Profil"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="key-outline"
            label="Ganti Kata Sandi"
            onPress={() => navigation.navigate('EditProfile', { focus: 'password' })}
          />
          <MenuItem icon="time-outline" label="History" onPress={() => {}} />
          <MenuItem icon="information-circle-outline" label="Tentang" onPress={() => {}} />

          {/* Tetap HIJAU + konfirmasi via Modal */}
          <MenuItem icon="log-out-outline" label="Keluar" onPress={openConfirm} />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Dialog tengah (overlay) */}
      <Modal
        transparent
        visible={showConfirm}
        animationType="fade"
        statusBarTranslucent
        presentationStyle="overFullScreen"
        onRequestClose={closeConfirm}
      >
        <View style={styles.backdrop}>
          {/* tutup jika tap backdrop */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closeConfirm} />

          <View style={styles.dialog}>
            <View style={styles.dialogIcon}>
              <Ionicons name="log-out-outline" size={26} color="#b91c1c" />
            </View>
            <Text style={styles.dialogTitle}>Apakah anda yakin untuk keluar ?</Text>

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

function MenuItem({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.item}
      android_ripple={{ color: 'rgba(255,255,255,0.18)' }}
    >
      <View style={styles.itemL}>
        <Ionicons name={icon} size={18} color="#fff" />
        <Text style={styles.itemText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#fff" />
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
  list: { padding: 16, gap: 12 },

  // Item tetap HIJAU
  item: {
    backgroundColor: BRAND,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemL: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemText: { color: '#fff', fontWeight: '700' },

  // Modal overlay tengah
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'center',   // ⟵ dialog di tengah
    alignItems: 'center',
    padding: 24,                 // aman di layar kecil
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
    marginBottom: 8,
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
