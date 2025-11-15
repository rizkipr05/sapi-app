import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider';

const BRAND = '#3f4d0b';
const BG = '#f5f7ef';

export default function SellerEditProfileScreen({ navigation }) {
  const { user } = useAuth();

  const [storeName, setStoreName] = useState(
    user?.storeName || user?.username || 'Toko Saya'
  );
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [desc, setDesc] = useState(
    user?.storeDesc || 'Tulis deskripsi singkat tentang toko Anda...'
  );
  const [busy, setBusy] = useState(false);

  // === FIX: cukup goBack() karena ini di dalam SellerProfileStack ===
  const onBack = () => {
    navigation.goBack();
  };

  const onSave = () => {
    if (!storeName.trim()) {
      Alert.alert('Validasi', 'Nama toko wajib diisi');
      return;
    }
    setBusy(true);
    try {
      // TODO: simpan ke backend / context di sini
      Alert.alert('Profil Toko', 'Profil toko tersimpan (dummy).', [
        { text: 'OK', onPress: onBack },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: BG }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Profil Toko</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* KARTU INFO ATAS */}
        <View style={styles.cardTop}>
          <View style={styles.logoCircle}>
            <Ionicons name="storefront-outline" size={28} color={BRAND} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.storeName}>{storeName || 'Toko Saya'}</Text>
            <Text style={styles.storeHint}>Atur identitas toko dan kontak</Text>
          </View>
        </View>

        {/* FORM */}
        <Text style={styles.label}>Nama Toko</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Ternak Sapi Makmur"
          placeholderTextColor="#9aa0a6"
          value={storeName}
          onChangeText={setStoreName}
        />

        <Text style={styles.label}>Nomor WhatsApp</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 08123456789"
          placeholderTextColor="#9aa0a6"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Alamat Toko</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Contoh: Desa X, Kecamatan Y, Kabupaten Z"
          placeholderTextColor="#9aa0a6"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Deskripsi Toko</Text>
        <TextInput
          style={[styles.input, { height: 110, textAlignVertical: 'top' }]}
          placeholder="Tuliskan keunggulan toko Anda, jenis sapi, sistem pengiriman, dll."
          placeholderTextColor="#9aa0a6"
          multiline
          value={desc}
          onChangeText={setDesc}
        />

        <Pressable
          style={[styles.saveBtn, busy && { opacity: 0.6 }]}
          onPress={onSave}
          disabled={busy}
        >
          <Text style={styles.saveText}>
            {busy ? 'Menyimpan...' : 'Simpan Profil Toko'}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#f8f6ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  headerTitle: { fontWeight: '700', fontSize: 16, color: '#111' },

  body: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#f3f4e2',
  },
  logoCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e4ead5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  storeHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },

  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
    color: '#111',
    fontSize: 13,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    color: '#111',
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: BRAND,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
  },
});
