import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthProvider";

const headerImg = require("../../assets/images/gambar.png");

const BRAND = "#3f4d0b";
const BG = "#f7f5ef";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [busy, setBusy] = useState(false);
  const { signup } = useAuth();

  const disabled = useMemo(() => {
    return busy || !username.trim() || !pwd || !pwd2;
  }, [busy, username, pwd, pwd2]);

  const submit = async () => {
    if (!username.trim()) return Alert.alert("Validasi", "Nama pengguna wajib diisi.");
    if (!pwd || !pwd2) return Alert.alert("Validasi", "Sandi dan konfirmasi wajib diisi.");
    if (pwd !== pwd2) return Alert.alert("Validasi", "Konfirmasi sandi tidak sama");
    try {
      setBusy(true);
      await signup(username.trim(), pwd);
    } catch (e) {
      Alert.alert("Daftar gagal", e?.message || "Gagal daftar");
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: BG }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header ilustrasi */}
        <View style={styles.header}>
          <Image source={headerImg} style={{ width: 130, height: 130 }} resizeMode="contain" />
        </View>

        <View style={styles.sheet}>
          {/* Username */}
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <TextInput
              placeholder="Nama Pengguna"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              accessibilityLabel="Input nama pengguna"
            />
          </View>

          {/* Sandi */}
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              placeholder="Sandi"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              secureTextEntry={!show1}
              value={pwd}
              onChangeText={setPwd}
              returnKeyType="next"
              accessibilityLabel="Input sandi"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShow1((s) => !s)} hitSlop={10}>
              <Ionicons name={show1 ? "eye-off-outline" : "eye-outline"} size={18} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Konfirmasi Sandi */}
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              placeholder="Konfirmasi Sandi"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              secureTextEntry={!show2}
              value={pwd2}
              onChangeText={setPwd2}
              returnKeyType="done"
              accessibilityLabel="Input konfirmasi sandi"
              autoCapitalize="none"
              onSubmitEditing={submit}
            />
            <TouchableOpacity onPress={() => setShow2((s) => !s)} hitSlop={10}>
              <Ionicons name={show2 ? "eye-off-outline" : "eye-outline"} size={18} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Tombol Daftar — tetap hijau walau disabled */}
          <Pressable
            onPress={submit}
            disabled={disabled}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed, // efek tekan saja (tidak memengaruhi disabled)
            ]}
            accessibilityState={{ disabled }}
            accessibilityLabel="Tombol daftar"
          >
            <Text style={styles.primaryText}>{busy ? "Memproses..." : "Daftar"}</Text>
          </Pressable>

          {/* Divider */}
          <Text style={styles.dividerText}>Atau</Text>

          {/* Ikon sosial */}
          <View style={styles.socials}>
            <View style={styles.iconWrap}>
              <AntDesign name="google" size={30} color="#111" />
            </View>
          </View>

          {/* Banner Masuk */}
          <Pressable
            style={[styles.primaryBtn, styles.registerBanner]}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Tombol masuk"
          >
            <Text style={[styles.primaryText, { color: "#fff" }]}>Masuk</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BG,
  },

  sheet: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 0,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 12,
    marginTop: 8,
  },
  input: { flex: 1, color: "#111" },

  primaryBtn: {
    backgroundColor: BRAND, // selalu hijau
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 18,
  },
  primaryBtnPressed: {
    opacity: 0.85, // efek saat ditekan saja
  },
  primaryText: { color: "#fff", fontWeight: "700" },

  dividerText: {
    textAlign: "center",
    color: "#111",
    marginVertical: 16,
  },

  socials: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    columnGap: 40,
  },
  iconWrap: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  registerBanner: {
    borderRadius: 16,
    marginTop: 10,
  },
});
