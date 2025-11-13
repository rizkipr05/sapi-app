import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthProvider';

const BRAND = '#3f4d0b';
export default function EditProfileScreen({ route, navigation }) {
  const { user, updateProfile, changePassword } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [busy, setBusy] = useState(false);

  const focus = route?.params?.focus; // jika dari "Ganti Kata Sandi", fokus di password
  const pwdRef = useRef(null);
  useEffect(() => { if (focus === 'password' && pwdRef.current) pwdRef.current.focus(); }, [focus]);

  const save = async () => {
    try {
      setBusy(true);
      await updateProfile({ username, email, phone });

      if (newPwd || oldPwd) {
        await changePassword(oldPwd, newPwd); // akan throw jika oldPwd salah
      }

      Alert.alert('Sukses', 'Profil tersimpan.');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Gagal', e?.message || 'Gagal menyimpan profil');
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.topbar}>
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.title}>Edit Profil</Text>
        <Pressable onPress={save} style={{ padding: 8 }}>
          <Text style={[styles.title, { color: BRAND }]}>{busy ? '...' : 'Simpan'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Field label="Nama Pengguna">
          <TextInput value={username} onChangeText={setUsername} style={styles.input} placeholder="Nama" />
        </Field>

        <Field label="Kata Sandi (lama → baru)">
          <TextInput
            ref={pwdRef}
            value={oldPwd}
            onChangeText={setOldPwd}
            style={styles.input}
            placeholder="Sandi lama"
            secureTextEntry
          />
          <TextInput
            value={newPwd}
            onChangeText={setNewPwd}
            style={styles.input}
            placeholder="Sandi baru"
            secureTextEntry
          />
          <Text style={styles.hint}>Opsional: isi jika ingin mengganti sandi.</Text>
        </Field>

        <Field label="Email">
          <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="you@mail.com" keyboardType="email-address" />
        </Field>

        <Field label="Telepon">
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="08xxxxxxxxxx" keyboardType="phone-pad" />
        </Field>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, children }) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={{ color: '#6b7280', marginBottom: 8 }}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: {
    height: 56, paddingHorizontal: 8,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#f7f3ec'
  },
  title: { fontSize: 16, fontWeight: '700', color: '#111' },
  input: { borderBottomWidth: 1, borderBottomColor: '#e5e7eb', paddingVertical: 8, color: '#111' },
  hint: { fontSize: 12, color: '#9ca3af', marginTop: 6 }
});
