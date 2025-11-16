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

  const disabled = useMemo(
    () => busy || !username.trim() || !pwd || !pwd2,
    [busy, username, pwd, pwd2]
  );

  const submit = async () => {
    if (!username.trim()) {
      Alert.alert("Validasi", "Nama pengguna wajib diisi.");
      return;
    }
    if (!pwd || !pwd2) {
      Alert.alert("Validasi", "Sandi dan konfirmasi wajib diisi.");
      return;
    }
    if (pwd !== pwd2) {
      Alert.alert("Validasi", "Konfirmasi sandi tidak sama.");
      return;
    }

    try {
      setBusy(true);
      // daftar akun pembeli (role buyer diatur di AuthProvider)
      await signup(username.trim(), pwd);
      Alert.alert("Berhasil", "Akun berhasil dibuat, silakan masuk.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"), // langsung arahkan ke Login
        },
      ]);
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
        {/* Header ilustrasi + judul */}
        <View style={styles.header}>
          <Image
            source={headerImg}
            style={{ width: 130, height: 130 }}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Buat Akun Baru</Text>
          <Text style={styles.appSub}>
            Daftar untuk mulai belanja sapi di Sava Farm.
          </Text>
        </View>

        <View style={styles.sheet}>
          {/* Badge info role (informasi saja) */}
          <View style={styles.roleBadgeRow}>
            <View style={styles.roleBadgeActive}>
              <Ionicons name="person-add-outline" size={14} color="#fff" />
              <Text style={styles.roleBadgeActiveText}>Registrasi Pembeli</Text>
            </View>
            <View style={styles.roleBadge}>
              <Ionicons name="storefront-outline" size={14} color={BRAND} />
              <Text style={styles.roleBadgeText}>Penjual diatur admin</Text>
            </View>
          </View>

          {/* Username */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>Nama Pengguna</Text>
          </View>
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
          <View style={styles.labelRow}>
            <Text style={styles.label}>Kata Sandi</Text>
          </View>
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
              <Ionicons
                name={show1 ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Konfirmasi Sandi */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>Konfirmasi Sandi</Text>
          </View>
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
              <Ionicons
                name={show2 ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {/* Info box tentang role */}
          <View style={styles.infoBox}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color={BRAND}
            />
            <View style={{ marginLeft: 8, flex: 1 }}>
              <Text style={styles.infoTitle}>Informasi Role Akun</Text>
              <Text style={styles.infoText}>
                Akun yang didaftarkan lewat halaman ini akan menjadi akun
                pembeli.
              </Text>
              <Text style={styles.infoText}>
                Jika ingin menjadi penjual (seller), hubungi admin untuk
                mengaktifkan role penjual pada akun Anda.
              </Text>
            </View>
          </View>

          {/* Tombol Daftar */}
          <Pressable
            onPress={submit}
            disabled={disabled}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed,
              disabled && { opacity: 0.6 },
            ]}
            accessibilityState={{ disabled }}
            accessibilityLabel="Tombol daftar"
          >
            <Text style={styles.primaryText}>
              {busy ? "Memproses..." : "Daftar"}
            </Text>
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
            onPress={() => navigation.navigate("Login")}
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
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BG,
    paddingHorizontal: 24,
  },
  appTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "800",
    color: BRAND,
  },
  appSub: {
    marginTop: 4,
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
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

  roleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  roleBadgeActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: BRAND,
  },
  roleBadgeActiveText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#e5ead4",
  },
  roleBadgeText: {
    fontSize: 12,
    color: BRAND,
    fontWeight: "600",
  },

  labelRow: {
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 12,
    marginTop: 4,
  },
  input: { flex: 1, color: "#111" },

  primaryBtn: {
    backgroundColor: BRAND,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 18,
  },
  primaryBtnPressed: {
    opacity: 0.85,
  },
  primaryText: { color: "#fff", fontWeight: "700" },

  infoBox: {
    marginTop: 14,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f9fafb",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 2,
  },
  infoText: {
    fontSize: 11,
    color: "#6b7280",
  },

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
