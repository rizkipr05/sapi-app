import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthProvider';

const BRAND = '#3f4d0b';

export default function ProfileScreen({ navigation }) {
  const { user, signout } = useAuth();

  return (
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
        <MenuItem icon="log-out-outline" label="Keluar" danger onPress={signout} />
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

function MenuItem({ icon, label, onPress, danger }) {
  return (
    <Pressable onPress={onPress} style={[styles.item, danger && { backgroundColor: '#f3f4f6' }]}>
      <View style={styles.itemL}>
        <Ionicons name={icon} size={18} color={danger ? '#b91c1c' : '#fff'} />
        <Text style={[styles.itemText, danger && { color: '#b91c1c' }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={danger ? '#b91c1c' : '#fff'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f3efe8',
    alignItems: 'center',
    paddingTop: 36, paddingBottom: 24,
  },
  avatarWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 999, backgroundColor: '#e5e7eb' },
  camBadge: {
    position: 'absolute', right: 6, bottom: 4, width: 28, height: 28, borderRadius: 14,
    backgroundColor: BRAND, alignItems: 'center', justifyContent: 'center'
  },
  name: { marginTop: 8, fontWeight: '700', fontSize: 18, color: '#111' },
  email: { color: '#6b7280', marginTop: 2 },
  list: { padding: 16, gap: 12 },
  item: {
    backgroundColor: BRAND, borderRadius: 8, paddingVertical: 14, paddingHorizontal: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  itemL: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemText: { color: '#fff', fontWeight: '700' },
});
