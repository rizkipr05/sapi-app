import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { getFavorites } from '../services/favorites';
import { listProducts } from '../services/products';

const BRAND = '#3f4d0b';

function currency(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function FavoritesScreen() {
  const nav = useNavigation();
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    const ids = await getFavorites();                 // ['1','3',...]
    const all = await listProducts();                 // data dummy
    const favItems = all.filter(p => ids.includes(p.id));
    setItems(favItems);
  }, []);

  // refresh tiap kali screen fokus
  useFocusEffect(useCallback(() => { load(); }, [load]));
  useEffect(() => { load(); }, [load]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* topbar */}
      <View style={styles.top}>
        <Pressable onPress={() => nav.goBack()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.title}>Favorit</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Ionicons name="mail-outline" size={20} color="#111" />
          <Ionicons name="heart" size={20} color={BRAND} />
        </View>
      </View>

      {/* list favorit */}
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => nav.navigate('ProductDetail', { product: item })}
            style={styles.card}
          >
            <Image source={{ uri: item.img }} style={styles.thumb} />
            <View style={{ flex: 1, padding: 12 }}>
              <Text style={styles.name} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>{currency(item.price)}</Text>
              <Text style={styles.sold}>6 Terjual</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={{ padding: 24, alignItems: 'center' }}>
            <Text style={{ color: '#6b7280' }}>Belum ada produk favorit.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 56,
    backgroundColor: '#f7f5ef',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontWeight: '700', color: '#111', fontSize: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  thumb: { width: 130, height: 90 },
  name: { fontWeight: '700', color: '#111' },
  price: { marginTop: 6, fontWeight: '800', color: '#111' },
  sold: { marginTop: 6, color: '#9ca3af', fontSize: 12, alignSelf: 'flex-end' },
});
