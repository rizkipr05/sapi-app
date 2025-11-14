import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const BRAND = '#3f4d0b';

const DUMMY_THREADS = [
  {
    id: 't1',
    customerName: 'Budi Santoso',
    lastMessage: 'Pak, sapi limosin ready ya besok?',
    updatedAt: '09.12',
    unread: 2,
  },
  {
    id: 't2',
    customerName: 'Siti Aisyah',
    lastMessage: 'Mau tanya soal pengiriman ke Lampung',
    updatedAt: 'Kemarin',
    unread: 0,
  },
  {
    id: 't3',
    customerName: 'Andi Pratama',
    lastMessage: 'Terima kasih pak, sapinya bagus 🙏',
    updatedAt: 'Senin',
    unread: 0,
  },
];

export default function SellerChatsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('SellerChatRoom', { thread: item })}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
    >
      <View style={styles.avatarWrap}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              item.customerName
            )}&background=3f4d0b&color=fff`,
          }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>
          {item.customerName}
        </Text>
        <Text style={styles.last} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>{item.updatedAt}</Text>
        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.unread > 9 ? '9+' : item.unread}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Pesan Pelanggan</Text>
        <View style={{ width: 22 }} />
      </View>

      {DUMMY_THREADS.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="chatbubbles-outline" size={40} color="#9ca3af" />
          <Text style={{ marginTop: 8, color: '#6b7280' }}>
            Belum ada pesan dari pelanggan
          </Text>
        </View>
      ) : (
        <FlatList
          data={DUMMY_THREADS}
          keyExtractor={(it) => it.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          contentContainerStyle={{ paddingVertical: 8 }}
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

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  sep: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 72,
  },
  avatarWrap: {
    marginRight: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
  },
  middle: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    color: '#111',
  },
  last: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  time: {
    color: '#9ca3af',
    fontSize: 11,
  },
  badge: {
    marginTop: 6,
    minWidth: 22,
    paddingHorizontal: 6,
    height: 20,
    borderRadius: 999,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
