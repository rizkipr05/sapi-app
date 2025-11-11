import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ChatsScreen() {
  const nav = useNavigation();

  // Dummy list chat
  const chats = useMemo(
    () => [
      {
        id: 'c1',
        seller: {
          id: 'seller-1',
          name: 'Ternak Sejahtera',
          avatar:
            'https://ui-avatars.com/api/?background=3f4d0b&color=fff&name=TS',
        },
        last: 'Silakan, stok masih ada kak.',
        product: {
          id: 'p1',
          title: 'Susu Sapi Fresh 1L',
          img: 'https://picsum.photos/seed/milk/400/300',
        },
      },
      {
        id: 'c2',
        seller: {
          id: 'seller-2',
          name: 'Peternak Mandiri',
          avatar:
            'https://ui-avatars.com/api/?background=3f4d0b&color=fff&name=PM',
        },
        last: 'Bisa COD daerah kota ya.',
        product: null,
      },
    ],
    []
  );

  const open = (item) =>
    nav.navigate('ChatRoom', {
      seller: item.seller,
      product: item.product || undefined,
    });

  const renderItem = ({ item }) => (
    <Pressable style={styles.row} onPress={() => open(item)}>
      <Image source={{ uri: item.seller.avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.seller.name}</Text>
        <Text style={styles.last} numberOfLines={1}>
          {item.last}
        </Text>
      </View>
      {item.product?.img ? (
        <Image source={{ uri: item.product.img }} style={styles.thumb} />
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#999" />
      )}
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pesan</Text>
      </View>
      <FlatList
        data={chats}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#f8f6ee',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: { fontWeight: '700', fontSize: 16, color: '#111' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  sep: { height: 1, backgroundColor: '#f1f5f9', marginLeft: 72 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  name: { fontWeight: '700', color: '#111' },
  last: { color: '#6b7280', marginTop: 2, fontSize: 12 },
  thumb: { width: 40, height: 40, borderRadius: 8 },
});
