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

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const { signin } = useAuth();

  const submit = async () => {
    try {
      setBusy(true);
      await signin(username.trim(), pwd);
    } catch (e) {
      Alert.alert("Login gagal", e?.message || "Gagal login");
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
            source={{
              uri: "https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/64/cow.png",
            }}
            style={{ width: 130, height: 130 }}
            resizeMode="contain"
          />
        </View>

        {/* Sheet */}
        <View style={styles.sheet}>
          {/* Input username */}
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <TextInput
              placeholder="Nama Pengguna"
              placeholderTextColor="#9aa0a6"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Input password */}
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#666" />
            <TextInput
              placeholder="Sandi"
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
              <AntDesign name="google" size={30} color="#111" />
            </View>
            <View style={styles.iconWrap}>
              <AntDesign name="facebook-square" size={30} color="#111" />
            </View>
            <View style={styles.iconWrap}>
              <AntDesign name="apple1" size={30} color="#111" />
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
    elevation: 2,
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
