import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
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

  const submit = async () => {
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
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/64/cow.png",
            }}
            style={{ width: 130, height: 130 }}
            resizeMode="contain"
          />
        </View>

        {/* Sheet full-bleed */}
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
              returnKeyType="next"
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
            />
            <TouchableOpacity onPress={() => setShow1((s) => !s)} hitSlop={10}>
              <Ionicons
                name={show1 ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#666"
              />
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
            />
            <TouchableOpacity onPress={() => setShow2((s) => !s)} hitSlop={10}>
              <Ionicons
                name={show2 ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Tombol Daftar */}
          <Pressable
            style={[styles.primaryBtn, busy && { opacity: 0.6 }]}
            onPress={submit}
            disabled={busy}
          >
            <Text style={styles.primaryText}>
              {busy ? "Memproses..." : "Daftar"}
            </Text>
          </Pressable>

          {/* Divider */}
          <Text style={styles.dividerText}>Atau</Text>

          {/* Ikon sosial: hanya Google */}
          <View style={styles.socials}>
            <View style={styles.iconWrap}>
              <AntDesign name="google" size={30} color="#111" />
            </View>
          </View>

          {/* Banner Masuk (penuh) */}
          <Pressable
            style={[styles.primaryBtn, styles.registerBanner]}
            onPress={() => navigation.goBack()}
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

  // FULL-BLEED sheet: nempel kiri-kanan, radius atas saja
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
    backgroundColor: BRAND,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 18,
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
  },
  iconWrap: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  // Banner bawah lebar
  registerBanner: {
    borderRadius: 16,
    marginTop: 10,
  },
});
