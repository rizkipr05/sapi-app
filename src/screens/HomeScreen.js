import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthProvider';
import { listProducts } from '../services/products';

const CARD_W = (Dimensions.get('window').width - 16 * 2 - 12) / 2;

function currency(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const nav = useNavigation();

  useEffect(() => {
    (async () => {
      const data = await listProducts();
      setItems(data);
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f7ef' }}>
      {/* header */}
      <View style={styles.top}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/64/cow.png',
            }}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ fontWeight: '700', fontSize: 16 }}>
            Hai, {user?.username}
          </Text>
        </View>
      </View>

      {/* search bar */}
      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#9aa0a6"
          style={{ flex: 1 }}
        />
      </View>

      {/* grid produk */}
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => nav.navigate('ProductDetail', { product: item })}
          >
            <Image source={{ uri: item.img }} style={styles.thumb} />
            <View style={{ padding: 10 }}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.cardPrice}>{currency(item.price)}</Text>
              <Text style={styles.cardMeta}>3 Terjual</Text>
            </View>
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
    justifyContent: 'space-between',
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
    backgroundColor: '#fff',
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
    shadowRadius: 6,
  },
  thumb: { width: '100%', height: 110 },
  cardTitle: {
    fontWeight: '700',
    color: '#111',
  },
  cardPrice: { color: '#111' },
  cardMeta: {
    color: '#6b7280',
    fontSize: 12,
  },
});
