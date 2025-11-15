import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
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
import { useProducts } from '../context/ProductProvider';

const CARD_W = (Dimensions.get('window').width - 16 * 2 - 12) / 2;

function currency(n) {
  const num = typeof n === 'string' ? Number(n) : (n ?? 0);
  const safe = Number.isFinite(num) ? num : 0;
  return 'Rp ' + safe.toLocaleString('id-ID');
}

/** ========== Gambar sapi lokal SAJA ========== */
// pastikan file-file ini ada di assets/images
const COWS = [
  require('../../assets/images/sapi-limosin.jpeg'),
  require('../../assets/images/images.jpeg'),
  require('../../assets/images/images (1).jpeg'),
  require('../../assets/images/images (2).jpeg'),
];

const cowImg = (i = 0) => COWS[i % COWS.length];

export default function HomeScreen() {
  const [q, setQ] = useState('');
  const { user } = useAuth();
  const nav = useNavigation();
  const { products, ready } = useProducts();

  // filter by title
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter((it) => (it?.title || '').toLowerCase().includes(s));
  }, [q, products]);

  const renderItem = ({ item, index }) => (
    <Pressable
      style={styles.card}
      onPress={() => nav.navigate('ProductDetail', { product: item })}
    >
      {/* SELALU gambar lokal */}
      <Image source={cowImg(index)} style={styles.thumb} />

      <View style={{ padding: 10 }}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardPrice}>{currency(item.price)}</Text>
        <Text style={styles.cardMeta}>3 Terjual</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f7ef' }}>
      {/* header */}
      <View style={styles.top}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }}>
            Hai, {user?.username}
          </Text>
        </View>

        {/* Icons kanan */}
        <View style={styles.topIcons}>
          <Pressable
            style={styles.actionBtn}
            onPress={() => nav.navigate('Chats')}
          >
            <Ionicons name="chatbubbles-outline" size={20} color="#111" />
          </Pressable>

          <Pressable
            style={styles.actionBtn}
            onPress={() => nav.navigate('Favorites')}
          >
            <Ionicons name="heart-outline" size={20} color="#111" />
          </Pressable>
        </View>
      </View>

      {/* search bar */}
      <View style={styles.search}>
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput
          placeholder="Cari produk..."
          placeholderTextColor="#9aa0a6"
          style={{ flex: 1 }}
          value={q}
          onChangeText={setQ}
          returnKeyType="search"
          autoCorrect={false}
        />
        {q ? (
          <Pressable onPress={() => setQ('')}>
            <Ionicons name="close-circle" size={18} color="#9aa0a6" />
          </Pressable>
        ) : null}
      </View>

      {/* grid produk */}
      <FlatList
        data={filtered}
        keyExtractor={(it, idx) => String(it.id ?? idx)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12 }}
        renderItem={renderItem}
        ListEmptyComponent={
          ready ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Ionicons name="search" size={32} color="#9aa0a6" />
              <Text style={{ color: '#6b7280', marginTop: 6 }}>
                Tidak ada hasil untuk “{q}”
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 70,
    backgroundColor: '#f8f6ee',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBtn: {
    width: 34,
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
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
  thumb: { width: '100%', height: 110, backgroundColor: '#eee' },
  cardTitle: { fontWeight: '700', color: '#111' },
  cardPrice: { color: '#111' },
  cardMeta: { color: '#6b7280', fontSize: 12 },
});
