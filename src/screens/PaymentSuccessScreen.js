// src/screens/PaymentSuccessScreen.js
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const BRAND = '#3f4d0b';

export default function PaymentSuccessScreen({ route, navigation }) {
  const orderId = route?.params?.orderId;

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.navigate('ProfileTab', { screen: 'Orders' });
    }, 1500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.wrap}>
      <View style={styles.iconRing}>
        <Ionicons name="checkmark" size={42} color="#fff" />
      </View>
      <Text style={styles.title}>Pembayaran Berhasil</Text>
      {orderId ? <Text style={styles.sub}>ID Pesanan: {orderId}</Text> : null}

      <View style={{ height: 16 }} />

      <Pressable
        style={styles.primary}
        onPress={() => navigation.navigate('ProfileTab', { screen: 'Orders' })}
      >
        <Text style={styles.primaryText}>Lihat History</Text>
      </Pressable>

      <Pressable
        style={styles.linkBtn}
        onPress={() => navigation.navigate('HomeTab', { screen: 'HomeList' })}
      >
        <Text style={styles.linkText}>Kembali ke Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconRing: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: BRAND,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8,
  },
  title: { marginTop: 16, fontSize: 20, fontWeight: '800', color: '#111', textAlign: 'center' },
  sub: { marginTop: 4, color: '#6b7280', textAlign: 'center' },
  primary: { marginTop: 16, backgroundColor: BRAND, borderRadius: 10, paddingVertical: 12, paddingHorizontal: 20 },
  primaryText: { color: '#fff', fontWeight: '700' },
  linkBtn: { marginTop: 8, paddingVertical: 10, paddingHorizontal: 12 },
  linkText: { color: BRAND, fontWeight: '700' },
});
