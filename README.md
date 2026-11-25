# I-REOC (`ireoc-app`)

Aplikasi seluler **I-REOC** (*IoT-based Reactor for Organic Waste / I-REOC Dekomposer v2*) merupakan antarmuka pemantauan dan kontrol simulasi reaktor pengolah sampah organik rumah tangga cerdas berbasis IoT menggunakan **React Native** dan **Expo**.

Aplikasi ini dirancang untuk memantau siklus dekomposisi sampah organik 3 fase, mengendalikan aktuator perangkat secara simulatif, memantau pembacaan sensor, menghitung efisiensi penyusutan serta estimasi biaya listrik dan dosis bioaktivator EM4, hingga menyediakan panduan penggunaan alat.

> **Catatan Status Data:** Saat ini seluruh pembacaan sensor, status perangkat, riwayat batch, notifikasi, dan pengaturan berjalan menggunakan **data simulasi lokal** (*in-memory*) dan belum terhubung ke perangkat keras IoT maupun layanan backend/database.

---

## Tujuan dan Fungsi Utama

1. **Pemantauan State Machine Reaktor**: Menampilkan fase aktif mesin (`Siaga`, `Pencampuran EM4`, `Fase Panas`, `Pengeringan`, `Selesai`) beserta progres tahap dan suhu simulasi reaktor.
2. **Kontrol Aktuator Simulasi**: Memungkinkan pengguna menyalakan atau mematikan komponen `Dinamo`, `Pemanas`, `Kipas`, dan `Filter` secara individual maupun serentak, yang secara dinamis memengaruhi status fase pada kartu utama.
3. **Telemetri Sensor & Efisiensi**: Menampilkan pembacaan simulasi sensor (`DS18B20`, `DHT22`, `PZEM-004T`, `HX711`, `MQ-4`), grafik tren mini, persentase penyusutan massa kompos, serta estimasi biaya listrik.
4. **Riwayat & Detail Batch**: Menyajikan ringkasan total sampah terolah, daftar batch pengolahan selesai, serta rincian per batch (berat awal/akhir, susut, suhu puncak, energi kWh, estimasi biaya listrik, dan dosis EM4).
5. **Buku Panduan Penggunaan**: Menyediakan daftar bahan yang boleh dan dilarang dimasukkan ke reaktor (`SOP v2`) lengkap dengan fitur pencarian kata kunci.
6. **Pusat Notifikasi & Pengaturan**: Menampilkan daftar notifikasi aktivitas sistem dengan filter status baca serta halaman pengaturan preferensi simulasi, acuan proses, dan uji diagnostik lokal.

---

## Teknologi dan Dependency Utama

Berdasarkan berkas `package.json`, aplikasi ini dibangun menggunakan:

| Kategori | Paket | Versi |
| --- | --- | --- |
| Framework Inti | `expo` | `~58.0.26` |
| UI Library | `react` | `19.3.0` |
| Mobile Runtime | `react-native` | `0.88.1` |
| Navigasi Utama | `@react-navigation/native` | `^7.5.2` |
| Stack Navigator | `@react-navigation/native-stack` | `^7.21.1` |
| Bottom Tab Navigator | `@react-navigation/bottom-tabs` | `^7.22.0` |
| Safe Area | `react-native-safe-area-context` | `~5.11.1` |
| Screen Container | `react-native-screens` | `~4.30.1` |
| Ikon | `@expo/vector-icons` | `^15.0.2` |
| Status Bar | `expo-status-bar` | `~58.0.5` |
| Custom Font Heading & UI | `@expo-google-fonts/instrument-sans` | `^0.4.2` |
| Custom Font Body & Label | `@expo-google-fonts/red-hat-text` | `^0.4.1` |

---

## Persyaratan Instalasi dan Konfigurasi

Pastikan lingkungan pengembangan memenuhi kebutuhan berikut sebelum menjalankan proyek:

1. **Node.js** (disarankan versi LTS yang kompatibel dengan Expo SDK 58, misalnya Node.js 22 LTS atau lebih baru).
2. **npm** (terpasang bersama Node.js) untuk mengelola paket berdasarkan `package-lock.json`.
3. **Expo Go** di perangkat Android/iOS (untuk menjalankan via QR code / jaringan lokal) atau **Android Studio Emulator** / **Xcode Simulator** / browser web.

Konfigurasi proyek utama terdapat pada:
- `app.json`: metadata Expo (`name`, `slug`, `version: "1.0.0"`, `orientation: "portrait"`, ikon aplikasi, dan konfigurasi Android/iOS/Web).
- `index.js`: mendaftarkan `App` melalui `registerRootComponent(App)`.

---

## Cara Menjalankan Aplikasi dari Awal

1. **Masuk ke direktori proyek dan instal dependency:**
   ```bash
   npm install
   ```

2. **Jalankan server pengembangan Expo:**
   ```bash
   npx expo start
   ```
   atau menggunakan script npm:
   ```bash
   npm start
   ```

3. **Buka aplikasi pada target platform:**
   - **Android (Emulator atau perangkat):**
     ```bash
     npm run android
     ```
   - **iOS (macOS Simulator):**
     ```bash
     npm run ios
     ```
   - **Web (memerlukan paket web tambahan):**
     Target web memerlukan `react-dom` dan `react-native-web` yang saat ini belum terpasang di `package.json`. Apabila ingin menjalankan di browser, pasang terlebih dahulu dengan:
     ```bash
     npx expo install react-dom react-native-web
     npm run web
     ```
   - Atau pindai QR Code yang tampil di terminal menggunakan aplikasi **Expo Go**.

---

## Struktur Folder Utama

```text
.
├── App.js                                # Root aplikasi: memuat custom font dan merender navigasi utama
├── index.js                              # Entry point Expo (registerRootComponent)
├── app.json                              # Konfigurasi Expo (ikon, nama, versi, platform)
├── package.json                          # Daftar dependency dan script npm
├── LICENSE                               # Lisensi proyek (MIT)
├── assets/                               # Aset gambar ikon, adaptive icon, splash icon, dan favicon
└── src/
    ├── constants/
    │   └── index.js                      # Palet warna (COLORS), ukuran (SIZES), pemetaan font (FONTS), rute (ROUTES)
    ├── navigation/
    │   ├── AppNavigator.jsx              # Native Stack Navigator (MainTabs, BatchDetail, Notification, Settings)
    │   └── MainTabNavigator.jsx          # Bottom Tab Navigator (Beranda, Sensor, Riwayat, Panduan, Profil)
    ├── screens/
    │   └── main/
    │       ├── DashboardScreen.jsx       # Beranda: status reaktor, kontrol aktuator, sensor ringkas, riwayat terakhir
    │       ├── SensorScreen.jsx          # Sensor & Energi: kartu efisiensi dan daftar parameter 5 sensor
    │       ├── HistoryScreen.jsx         # Riwayat Pengolahan: total sampah diproses dan daftar batch selesai
    │       ├── BatchDetailScreen.jsx     # Detail Batch: metrik lengkap proses, biaya listrik, dan dosis EM4
    │       ├── GuideBookScreen.jsx       # Buku Panduan: SOP bahan boleh/dilarang dengan pencarian
    │       ├── NotificationScreen.jsx    # Notifikasi: ringkasan belum dibaca, filter, dan tandai dibaca
    │       ├── ProfileScreen.jsx         # Profil: info pengguna demo, spesifikasi alat, kalibrasi, akses Pengaturan
    │       └── SettingsScreen.jsx        # Pengaturan: preferensi notifikasi, acuan proses, diagnostik, tentang
    ├── component/
    │   ├── dashboard/
    │   │   ├── ActuatorControls.jsx      # Kontrol 4 aktuator (Dinamo, Pemanas, Kipas, Filter) + toggle semua
    │   │   ├── HeroCard.jsx              # Kartu status fase mesin, progress bar, dan suhu reaktor
    │   │   ├── RecentBatchCard.jsx       # Kartu ringkas batch terakhir di Beranda
    │   │   └── SensorRow.jsx             # Baris ringkasan sensor di Beranda
    │   └── sensor/
    │       ├── EfficiencyCard.jsx        # Kartu efisiensi dekomposisi dan penyusutan batch terakhir
    │       ├── MiniBarChart.jsx          # Grafik batang mini untuk tren simulasi
    │       └── SensorItem.jsx            # Kartu detail parameter sensor pada layar Sensor
    ├── data/
    │   ├── batches.js                    # Data simulasi batch selesai dan batch aktif
    │   ├── device.js                     # Data identitas pengguna demo & spesifikasi perangkat IREOC-V2-001
    │   ├── guide.js                      # Data SOP v2 daftar bahan yang diizinkan dan dilarang
    │   ├── konstanta.js                  # Konstanta rasio EM4 (12 ml/kg) dan tarif listrik (Rp 1.440/kWh)
    │   ├── notification.js               # Data simulasi daftar notifikasi
    │   ├── phases.js                     # Definisi state machine fase mesin dan rentang suhunya
    │   └── sensors.js                    # Data simulasi 5 sensor (DS18B20, DHT22, PZEM-004T, HX711, MQ-4)
    └── utils/
        ├── calculations.js               # Fungsi perhitungan susut berat, dosis EM4, dan biaya listrik
        └── formatters.js                 # Pemformat angka, Rupiah, suhu (°C), berat (kg), persen (%), dan ml
```

---

## Penjelasan Fitur-Fitur Utama

- **Beranda (`DashboardScreen`)**: Menampilkan identitas perangkat (`I-REOC Dekomposer` / `IREOC-V2-001`), tombol akses cepat ke halaman Notifikasi, lencana `Mode Simulasi`, kartu status `HeroCard` yang berubah sesuai kombinasi aktuator aktif pada `ActuatorControls`, ringkasan sensor terpilih, dan kartu batch terakhir yang dapat ditekan untuk membuka `BatchDetailScreen`.
- **Sensor & Energi (`SensorScreen`)**: Menampilkan `EfficiencyCard` beserta `MiniBarChart` dari batch selesai terakhir serta daftar parameter simulasi untuk suhu reaktor (`DS18B20`), kelembapan relatif (`DHT22`), daya & biaya listrik (`PZEM-004T`), massa sampah (`HX711`), dan indikator gas metana (`MQ-4`).
- **Riwayat & Detail Batch (`HistoryScreen` & `BatchDetailScreen`)**: Menghitung total sampah diproses serta persentase susut keseluruhan, dan menampilkan rincian tiap batch mulai dari berat awal, berat akhir, suhu puncak, konsumsi energi (kWh), estimasi biaya listrik (`TARIF_PER_KWH`), hingga takaran bioaktivator EM4 (`RASIO_EM4_ML_PER_KG`).
- **Buku Panduan (`GuideBookScreen`)**: Menyajikan panduan `SOP v2` berisi kategori bahan yang diperbolehkan dan dilarang masuk ke reaktor, dilengkapi kolom pencarian *real-time* yang menyaring daftar item.
- **Notifikasi (`NotificationScreen`)**: Menampilkan jumlah notifikasi belum dibaca, filter (`Semua` dan `Belum Dibaca`), aksi menandai satu notifikasi atau seluruh notifikasi sebagai dibaca.
- **Profil (`ProfileScreen`)**: Menampilkan ringkasan akun demo, spesifikasi alat, simulasi aksi kalibrasi sensor, serta tautan navigasi menuju halaman **Pengaturan** (`ROUTES.SETTINGS`).

---

## Implementasi Custom Font

Aplikasi menggunakan dua keluarga font lokal yang sudah tersedia pada paket `@expo-google-fonts/*` di `package.json` tanpa mengambil font dari CDN eksternal saat runtime:

1. **Instrument Sans** (`@expo-google-fonts/instrument-sans`)
   - Variasi yang dimuat: `400Regular`, `500Medium`, `600SemiBold`, `700Bold`.
   - Digunakan untuk judul layar, judul bagian, angka utama/metrik, lencana status, label tombol, judul header stack, dan label tab navigasi.
2. **Red Hat Text** (`@expo-google-fonts/red-hat-text`)
   - Variasi yang dimuat: `300Light`, `400Regular`, `500Medium`, `600SemiBold`, `700Bold`.
   - Digunakan untuk teks isi, subjudul, deskripsi, metadata, label form/input pencarian, dan catatan.

### Mekanisme Pemuatan dan Penerapan
- **Pemuatan awal di `App.js`**: Seluruh variasi font dimuat melalui hook `useFonts(...)` sebelum komponen navigasi dirender (`if (!fontsLoaded && !fontError) return null;`).
- **Pemetaan terpusat di `src/constants/index.js`**: Konstanta `FONTS` memetakan setiap peran tipografi langsung ke nama font spesifik (seperti `FONTS.headingBold` dan `FONTS.bodyRegular`).
- **Konsistensi weight**: Karena berkas `.ttf` lokal maksimal menyediakan ketebalan `700` (Bold), seluruh gaya teks menggunakan `fontFamily` spesifik dari `FONTS` tanpa prop `fontWeight` tambahan (dan menghindari variasi `800` yang tidak tersedia pada berkas font) agar perenderan konsisten di Android, iOS, dan Web.

---

## Penjelasan Halaman Settings (`SettingsScreen`)

Halaman `SettingsScreen` (`src/screens/main/SettingsScreen.jsx`) terhubung pada `AppNavigator` dengan rute `ROUTES.SETTINGS` (`Pengaturan`) dan dapat diakses melalui menu **Pengaturan** di `ProfileScreen`.

Fitur yang tersedia di halaman Settings:
- **Banner Status Perangkat & Mode Simulasi**: Menampilkan model perangkat, ID (`IREOC-V2-001`), jaringan (`Wi-Fi Lab (2.4 GHz)`), serta keterangan bahwa aplikasi berjalan dalam mode simulasi lokal.
- **Notifikasi Simulasi**:
  - Toggle utama **Aktifkan Notifikasi** yang mengaktifkan/menonaktifkan opsi sub-peringatan di bawahnya (**Peringatan Suhu Kritis** dan **Notifikasi Fase & Batch**).
  - Tautan langsung ke **Pusat Notifikasi** (`NotificationScreen`).
- **Parameter Proses**:
  - Menampilkan **Target Suhu Fase Panas** (`50–60°C`), **Rasio Bioaktivator EM4** (`12 ml/kg`), dan **Tarif Listrik Simulasi** (`Rp 1.440/kWh`) lengkap dengan dialog informasi ketika ditekan.
  - Tautan langsung ke tab **Buku Panduan Bahan** (`GuideBookScreen`).
- **Perangkat & Pemeliharaan**:
  - Daftar spesifikasi perangkat dari `src/data/device.js`.
  - Tombol **Uji Diagnostik Simulasi** untuk memeriksa kondisi pembacaan 5 sensor simulasi dan menampilkan ringkasan hasil.
  - Tombol **Reset Preferensi Pengaturan** dengan konfirmasi untuk mengembalikan toggle notifikasi ke kondisi awal.
- **Tentang Aplikasi**: Menampilkan nama aplikasi, versi (`1.0.0`), dialog informasi keterbatasan mode simulasi lokal, dan deskripsi singkat I-REOC.

**Keterbatasan yang perlu diperhatikan:**
Aplikasi belum memiliki paket penyimpanan persisten lokal (seperti `@react-native-async-storage/async-storage`) maupun koneksi ke API backend/perangkat IoT fisik. Oleh karena itu, perubahan toggle di halaman Pengaturan disimpan secara *in-memory* pada sesi berjalan dan akan kembali ke setelan awal saat aplikasi dimulai ulang.

---

## Lisensi

Proyek ini menggunakan lisensi **MIT** sebagaimana tercantum pada berkas [LICENSE](LICENSE).
