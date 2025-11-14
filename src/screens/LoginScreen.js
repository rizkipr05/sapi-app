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

const headerImage = require("../../assets/images/gambar.png");

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const { signin } = useAuth();

  const submit = async () => {
    if (!username.trim() || !pwd) {
      Alert.alert("Validasi", "Nama pengguna dan sandi wajib diisi.");
      return;
    }

    try {
      setBusy(true);
      // signin akan menyimpan user + role di context.
      // RootNavigator akan otomatis mengarahkan:
      //  - role === 'seller' -> SellerTabs
      //  - selain itu       -> BuyerTabs
      await signin(username.trim(), pwd);
    } catch (e) {
      Alert.alert("Login gagal", e?.message || "Nama pengguna atau sandi salah.");
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
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={headerImage}
            style={{ width: 130, height: 130 }}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Sava Farm</Text>
          <Text style={styles.appSub}>
            Masuk untuk mulai belanja atau mengelola toko Anda.
          </Text>
        </View>

        {/* Sheet */}
        <View style={styles.sheet}>
          {/* Tagline role */}
          <View style={styles.roleBadgeRow}>
            <View style={styles.roleBadgeActive}>
              <Ionicons name="person-outline" size={14} color="#fff" />
              <Text style={styles.roleBadgeActiveText}>Pembeli</Text>
            </View>
            <View style={styles.roleBadge}>
              <Ionicons name="storefront-outline" size={14} color={BRAND} />
              <Text style={styles.roleBadgeText}>Penjual</Text>
            </View>
          </View>

          {/* Input username */}
          <View style={styles.inputLabelRow}>
            <Text style={styles.inputLabel}>Nama Pengguna</Text>
          </View>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <TextInput
              placeholder="Masukkan nama pengguna"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Input password */}
          <View style={styles.inputLabelRow}>
            <Text style={styles.inputLabel}>Kata Sandi</Text>
          </View>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              placeholder="Masukkan kata sandi"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              secureTextEntry={!show}
              value={pwd}
              onChangeText={setPwd}
            />
            <TouchableOpacity onPress={() => setShow((s) => !s)} hitSlop={10}>
              <Ionicons
                name={show ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 6 }}>
            <Text style={{ color: "#6b7280", fontSize: 12 }}>Lupa sandi ?</Text>
          </TouchableOpacity>

          {/* Tombol Masuk */}
          <Pressable
            style={[styles.primaryBtn, busy && { opacity: 0.6 }]}
            onPress={submit}
            disabled={busy}
          >
            <Text style={styles.primaryText}>
              {busy ? "Memproses..." : "Masuk"}
            </Text>
          </Pressable>


          <Text style={styles.dividerText}>Atau</Text>

          {/* SOSIAL LOGIN dengan ICON MUNCUL */}
          <View style={styles.socials}>
            <View style={styles.iconWrap}>
              <AntDesign name="google" size={26} color="#111" />
            </View>
          </View>

          <Pressable
            style={[styles.primaryBtn, styles.registerBanner]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={[styles.primaryText, { color: "#fff" }]}>Daftar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BG,
    paddingHorizontal: 24,
  },
  appTitle: {
    marginTop: 8,
    fontSize: 22,
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
    elevation: 2,
  },

  roleBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
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

  inputLabelRow: {
    marginTop: 4,
  },
  inputLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 10,
    marginTop: 4,
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
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },

  registerBanner: {
    borderRadius: 16,
    marginTop: 10,
  },
});
