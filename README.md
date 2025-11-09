# 🐮 SapiMart (React Native UI Only)

**SapiMart** adalah aplikasi mobile berbasis **React Native (Expo)** yang dirancang untuk menampilkan katalog produk hewan ternak — khususnya sapi — dengan antarmuka pengguna modern dan interaktif.  
Aplikasi ini fokus pada **tampilan (UI only)** dan menyimpan data **secara lokal** menggunakan **AsyncStorage** sebagai simulasi backend.

---

## 💡 Fitur Utama

### 🔐 Autentikasi Lokal
- Pengguna dapat **mendaftar (Register)** dan **masuk (Login)**.
- Data disimpan di perangkat menggunakan AsyncStorage.
- Validasi username unik & sandi minimal 4 karakter.
- Auto-login setelah restart aplikasi.

### 🏠 Beranda (Home)
- Menampilkan daftar produk sapi dalam bentuk grid 2 kolom.
- Fitur pencarian produk (search bar).
- Klik card produk membuka halaman **Detail Produk**.

### 📦 Detail Produk
- Menampilkan gambar, harga, nama, dan info terjual.
- Detail tambahan seperti stok, berat, dan ukuran.
- Tombol aksi: Tanya Penjual, Tambah Keranjang, Beli.

### 👤 Profil Pengguna
- Menampilkan avatar, nama, dan email pengguna.
- Menu: Edit Profil, Ganti Kata Sandi, History, Tentang, Keluar.

### ✏️ Edit Profil
- Edit username, email, telepon, dan kata sandi.
- Data tersimpan otomatis secara lokal.

---

## ⚙️ Teknologi yang Digunakan

| Komponen | Teknologi |
|-----------|------------|
| Framework | React Native (Expo SDK 54) |
| Navigasi | React Navigation v7 (Stack & Bottom Tabs) |
| State Global | Context API |
| Penyimpanan Lokal | AsyncStorage |
| Icon | Expo Vector Icons (Ionicons, AntDesign) |
| Node Version | v20.19.2 |

---

## 🧩 Struktur Folder
```
project/
│  App.js
│  index.js
│  package.json
│
└─ src/
   ├─ context/
   │   └─ AuthProvider.js
   ├─ services/
   │   ├─ auth.js
   │   ├─ storage.js
   │   └─ products.js
   └─ screens/
       ├─ LoginScreen.js
       ├─ RegisterScreen.js
       ├─ HomeScreen.js
       ├─ ProductDetailScreen.js
       ├─ ProfileScreen.js
       └─ EditProfileScreen.js
```

---

## 🎨 Ciri Desain
- Warna utama: **Hijau Tua (#3f4d0b)**
- Latar lembut: **Putih & Cream (#f7f5ef)**
- UI modern: card, tombol rounded, icon halus.
- Responsif di Android/iOS.

---

## 🔍 Tujuan Pengembangan
1. Melatih pembuatan aplikasi React Native berbasis **UI only**.
2. Mempelajari **navigasi multi-halaman** dengan Stack & Tab Navigation.
3. Implementasi **autentikasi lokal sederhana**.
4. Menyusun struktur kode modular dan reusable.

---

## 🧠 Kesimpulan
Aplikasi **SapiMart** merupakan contoh ideal pengembangan prototipe e-commerce sederhana berbasis React Native.  
Dengan desain modern dan penyimpanan lokal, aplikasi ini siap dikembangkan lebih lanjut menjadi sistem belanja ternak digital dengan backend API nyata.
