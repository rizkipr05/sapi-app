import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthProvider';

const BRAND = '#3f4d0b';

export default function ChatRoomScreen({ route, navigation }) {
  const { user } = useAuth();
  const { seller: sellerParam, product } = route.params || {};

  const seller = useMemo(
    () =>
      sellerParam || {
        id: 'seller-1',
        name: 'Penjual',
        avatar:
          'https://ui-avatars.com/api/?background=3f4d0b&color=fff&name=P',
      },
    [sellerParam]
  );

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      text: 'Halo! Ada yang bisa dibantu?',
      senderId: seller.id,
      createdAt: Date.now() - 1000 * 60,
    },
    ...(product
      ? [
          {
            id: 'm2',
            text: `Terkait produk: ${product.title}`,
            senderId: seller.id,
            createdAt: Date.now() - 1000 * 50,
          },
        ]
      : []),
  ]);

  const [text, setText] = useState('');
  const listRef = useRef(null);

  const send = () => {
    const t = text.trim();
    if (!t) return;

    const meMsg = {
      id: 'm' + (messages.length + 1),
      text: t,
      senderId: user?.id || 'me',
      createdAt: Date.now(),
    };

    setMessages(prev => [...prev, meMsg]);
    setText('');

    // auto-reply dummy
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: 'm' + (prev.length + 1),
          text: 'Baik, segera kami cek ya!',
          senderId: seller.id,
          createdAt: Date.now(),
        },
      ]);
      listRef.current?.scrollToEnd({ animated: true });
    }, 600);

    requestAnimationFrame(() =>
      listRef.current?.scrollToEnd({ animated: true })
    );
  };

  const renderItem = ({ item }) => {
    const mine = item.senderId !== seller.id;
    return (
      <View style={[styles.row, mine ? styles.rowMine : styles.rowOther]}>
        {!mine && (
          <Image
            source={{ uri: seller.avatar }}
            style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
          />
        )}
        <View style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleOther]}>
          <Text style={[styles.msg, mine ? styles.msgMine : styles.msgOther]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>

        {/* Seller + product title singkat */}
        <View style={{ flex: 1, marginHorizontal: 12 }}>
          <Text numberOfLines={1} style={{ fontWeight: '700', color: '#111' }}>
            {seller.name}
          </Text>
          {product ? (
            <Text numberOfLines={1} style={{ color: '#6b7280', fontSize: 12 }}>
              {product.title}
            </Text>
          ) : null}
        </View>

        {/* Spacer kanan (tanpa gambar) */}
        <View style={{ width: 32 }} />
      </View>

      {/* Messages + input */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={it => it.id}
          contentContainerStyle={{ padding: 12, paddingBottom: 8 }}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputBar}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Tulis pesan..."
            style={{ flex: 1, paddingHorizontal: 12 }}
          />
          <Pressable style={styles.sendBtn} onPress={send}>
            <Ionicons name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#f8f6ee',
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rowOther: { justifyContent: 'flex-start' },
  rowMine: { justifyContent: 'flex-end' },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bubbleOther: {
    backgroundColor: '#eef2e0',
    borderTopLeftRadius: 4,
  },
  bubbleMine: {
    backgroundColor: BRAND,
    borderTopRightRadius: 4,
  },
  msg: { fontSize: 14, lineHeight: 18 },
  msgOther: { color: '#111' },
  msgMine: { color: '#fff' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 8,
    backgroundColor: '#fff',
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
