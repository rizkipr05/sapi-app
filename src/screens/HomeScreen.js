import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList, Image, Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useAuth } from '../context/AuthProvider';
import { listProducts } from '../services/products';

const CARD_W = (Dimensions.get('window').width - 16 * 2 - 12) / 2;
function currency(n) { return 'Rp ' + n.toLocaleString('id-ID'); }

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      setItems(data);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f7ef' }}>
      {/* TOP BAR */}
      <View style={styles.top}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image
            source={{ uri: 'https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/64/cow.png' }}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ fontWeight: '700' }}>Hai, {user?.username}</Text>
        </View>

        {/* Hanya satu set ikon di sini */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <Pressable>
            <Ionicons name="chatbubble-ellipses-outline" size={22} color="#000" />
          </Pressable>
          <Pressable>
            <Ionicons name="heart-outline" size={22} color="#000" />
          </Pressable>
        </View>
      </View>

      {/* SEARCH BAR (tanpa ikon chat/love lagi) */}
      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#9aa0a6"
          style={{ flex: 1 }}
        />
        {/* kalau mau ada tombol mic/filter nanti bisa ditambah di sini */}
      </View>

      {/* LIST PRODUK */}
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.thumb} />
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardPrice}>{currency(item.price)}</Text>
            <Text style={styles.cardMeta}>3 Terjual</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 64,
    backgroundColor: '#f8f6ee',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  search: {
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#fff'
  },
  card: {
    width: CARD_W,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6
  },
  thumb: { width: '100%', height: 110 },
  cardTitle: { fontWeight: '700', marginHorizontal: 10, marginTop: 8, color: '#111' },
  cardPrice: { marginHorizontal: 10, marginTop: 4, color: '#111' },
  cardMeta: { marginHorizontal: 10, marginVertical: 10, color: '#6b7280', fontSize: 12 },
});
