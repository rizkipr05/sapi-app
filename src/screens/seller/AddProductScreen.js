import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
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
import { useProducts } from '../../context/ProductProvider';

const BRAND = '#3f4d0b';
const BG = '#f5f7ef';

export default function AddProductScreen({ navigation }) {
  const { user } = useAuth();
  const { add } = useProducts();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const [busy, setBusy] = useState(false);

  const onBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate('SellerHome');
  };

  /** ===================== PICK IMAGE ===================== */
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin dibutuhkan', 'Aplikasi perlu akses galeri.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImg(uri);
    }
  };

  /** ===================== SUBMIT ===================== */
  const submit = () => {
    if (!title.trim()) {
      Alert.alert('Validasi', 'Nama produk wajib diisi');
      return;
    }

    const priceNum = Number(price);
    if (!price || !Number.isFinite(priceNum) || priceNum < 0) {
      Alert.alert('Validasi', 'Harga tidak valid');
      return;
    }

    setBusy(true);
    try {
      add({
        title: title.trim(),
        price: priceNum,
        img: img.trim() || null,
        seller: {
          id: user?.username || 'seller-1',
          name: user?.username || 'Penjual',
        },
        description: desc.trim(),
      });

      Alert.alert('Produk', 'Produk berhasil ditambahkan!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
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
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Tambah Produk</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* NAMA PRODUK */}
        <Text style={styles.label}>Nama Produk</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: Sapi Limosin Super"
          placeholderTextColor="#9aa0a6"
          value={title}
          onChangeText={setTitle}
        />

        {/* HARGA */}
        <Text style={styles.label}>Harga</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: 15000000"
          placeholderTextColor="#9aa0a6"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* UPLOAD GAMBAR */}
        <Text style={styles.label}>Upload Gambar</Text>

        {img ? (
          <Image source={{ uri: img }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={40} color="#9aa0a6" />
            <Text style={{ color: '#9aa0a6', marginTop: 6 }}>Belum ada gambar</Text>
          </View>
        )}

        <Pressable style={styles.uploadBtn} onPress={pickImage}>
          <Ionicons name="cloud-upload-outline" size={18} color="#fff" />
          <Text style={styles.uploadText}>Pilih dari Galeri</Text>
        </Pressable>

        {/* URL GAMBAR MANUAL */}
        <Text style={styles.label}>URL Gambar (opsional)</Text>
        <TextInput
          style={styles.input}
          placeholder="https://..."
          placeholderTextColor="#9aa0a6"
          value={img}
          onChangeText={setImg}
          autoCapitalize="none"
        />

        {/* DESKRIPSI */}
        <Text style={styles.label}>Deskripsi</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Tuliskan deskripsi singkat produk..."
          placeholderTextColor="#9aa0a6"
          value={desc}
          onChangeText={setDesc}
          multiline
        />

        {/* BUTTON SIMPAN */}
        <Pressable
          style={[styles.btn, busy && { opacity: 0.6 }]}
          onPress={submit}
          disabled={busy}
        >
          <Text style={styles.btnText}>{busy ? 'Menyimpan...' : 'Simpan Produk'}</Text>
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
    paddingBottom: 40,
    backgroundColor: '#fff',
  },

  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
    color: '#111',
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

  /** ========== UPLOAD ========== */
  uploadBtn: {
    marginTop: 10,
    backgroundColor: BRAND,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '700',
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginTop: 6,
  },
  placeholder: {
    marginTop: 6,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    marginTop: 20,
    backgroundColor: BRAND,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
