import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const BRAND = '#3f4d0b';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    from: 'customer',
    text: 'Pak, sapi limosin ready untuk minggu ini?',
    at: '09:10',
  },
  {
    id: 'm2',
    from: 'seller',
    text: 'Siap Bu, stok masih ada 3 ekor untuk minggu ini.',
    at: '09:12',
  },
  {
    id: 'm3',
    from: 'customer',
    text: 'Kalau kirim ke Lampung bisa ya?',
    at: '09:13',
  },
];

export default function SellerChatRoomScreen({ route, navigation }) {
  const thread =
    route?.params?.thread || {
      id: 't1',
      customerName: 'Pelanggan',
    };

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState('');

  const onBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // jaga-jaga kalau dipanggil dari root
      navigation.navigate('SellerChats');
    }
  };

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const msg = {
      id: 'm-' + Date.now(),
      from: 'seller',
      text: trimmed,
      at: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  const renderItem = ({ item }) => {
    const isSeller = item.from === 'seller';
    return (
      <View
        style={[
          styles.msgRow,
          { justifyContent: isSeller ? 'flex-end' : 'flex-start' },
        ]}
      >
        <View
          style={[
            styles.bubble,
            isSeller ? styles.bubbleSeller : styles.bubbleCustomer,
          ]}
        >
          <Text
            style={[
              styles.msgText,
              isSeller && { color: '#fff' },
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.time,
              isSeller && { color: 'rgba(255,255,255,0.8)' },
            ]}
          >
            {item.at}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f5f5f4' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      {/* Header */}
      <View className="header" style={styles.header}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </Pressable>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.name} numberOfLines={1}>
            {thread.customerName || 'Pelanggan'}
          </Text>
          <Text style={styles.subtitle}>Pelanggan • Online</Text>
        </View>
        <Ionicons name="call-outline" size={20} color="#111" />
      </View>

      {/* Chat list */}
      <FlatList
        data={messages}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12, paddingBottom: 8 }}
      />

      {/* Input bar */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Tulis balasan ke pelanggan..."
          placeholderTextColor="#9ca3af"
          value={text}
          onChangeText={setText}
          multiline
        />
        <Pressable
          style={[
            styles.sendBtn,
            !text.trim() && { opacity: 0.5 },
          ]}
          onPress={send}
          disabled={!text.trim()}
        >
          <Ionicons name="send" size={18} color="#fff" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#f8f6ee',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: '700',
    color: '#111',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },

  msgRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bubbleCustomer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  bubbleSeller: {
    backgroundColor: BRAND,
    borderTopRightRadius: 0,
  },
  msgText: {
    fontSize: 14,
    color: '#111',
  },
  time: {
    marginTop: 2,
    fontSize: 11,
    color: '#9ca3af',
    alignSelf: 'flex-end',
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    color: '#111',
  },
  sendBtn: {
    marginLeft: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BRAND,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
