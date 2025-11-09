import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

function currency(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function ProductDetailScreen({ route, navigation }) {
  const product = route.params?.product;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <Text style={styles.title}>{product?.title}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        <Image source={{ uri: product.img }} style={styles.image} />
        <View style={styles.body}>
          <Text style={styles.price}>{currency(product.price)}</Text>
          <Text style={styles.sold}>3 Terjual</Text>

          <Text style={styles.name}>{product.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.sub}>Detail Produk</Text>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Stok</Text><Text>: 6</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Ukuran</Text><Text>: -</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.key}>Berat</Text><Text>: -</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.btn, styles.btnAsk]}>
          <Text style={styles.txtAsk}>Tanya Penjual</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnCart]}>
          <Text style={styles.txtCart}>Tambah Keranjang</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnBuy]}>
          <Text style={styles.txtBuy}>Beli</Text>
        </Pressable>
      </View>
    </View>
  );
}

const BRAND = '#3f4d0b';

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#f8f6ee',
  },
  title: { fontWeight: '700', color: '#111', fontSize: 16 },
  image: { width: '100%', height: 260 },
  body: { padding: 16 },
  price: { fontSize: 20, fontWeight: '700', color: '#111' },
  sold: { color: '#6b7280', marginBottom: 8 },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 12 },
  sub: { fontWeight: '700', color: '#111' },
  detailRow: { flexDirection: 'row', marginTop: 8 },
  key: { width: 80, color: '#6b7280' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  btn: { flex: 1, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnAsk: { borderWidth: 1, borderColor: '#ddd' },
  btnCart: { backgroundColor: '#eef2e0' },
  btnBuy: { backgroundColor: BRAND },
  txtAsk: { color: '#111' },
  txtCart: { color: BRAND, fontWeight: '700' },
  txtBuy: { color: '#fff', fontWeight: '700' },
});
