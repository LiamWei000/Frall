# For My Sayang, Frall ♡

Website romantis personal — hadiah kejutan digital untuk Frall, dibuat oleh Liam.

100% HTML, CSS, dan Vanilla JavaScript. Tidak ada framework, tidak ada backend, tidak ada database. Bisa langsung dijalankan di browser atau di-deploy ke GitHub Pages.

---

## 1. Struktur Folder

```text
romantic-website/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── memory-01.jpg ... memory-06.jpg
│   ├── music/
│   │   └── our-song.mp3
│   └── icons/
└── README.md
```

---

## 2. Cara Menjalankan Secara Lokal

Karena website ini 100% statis, kamu punya dua pilihan:

**Opsi A — buka langsung**
Klik dua kali `index.html`, atau buka lewat browser.

**Opsi B — pakai local server (disarankan)**
Beberapa browser membatasi fitur tertentu (misalnya audio) saat file dibuka langsung dari disk. Kalau kamu punya Python terpasang:

```bash
cd romantic-website
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

---

## 3. Customization

Hampir semua data personal (nama, tanggal, judul lagu) sudah dikumpulkan di satu tempat: bagian paling atas file `js/script.js`.

```javascript
const CONFIG = {
  myName: "Liam",
  partnerName: "Frall",
  nickname: "Sayang",

  relationshipStart: "2026-05-27",   // format: YYYY-MM-DD
  myBirthday: "09-13",               // format: MM-DD

  // TEMPORARY — ganti kalau tanggal lahir Frall sudah diketahui
  partnerBirthday: "10-13",

  musicTitle: "My Love Mine All Mine",
  musicFile: "assets/music/our-song.mp3"
};
```

### Mengganti nama & tanggal

- Ubah `myName`, `partnerName`, `nickname`, `relationshipStart`, `myBirthday`, `partnerBirthday` di `CONFIG`.
- Beberapa teks di `index.html` (misalnya judul opening "For my Sayang, Frall ♡", tanggal di section Birthday) ditulis manual sebagai teks statis — cari dan ganti sesuai kebutuhan kalau nama/tanggalnya berubah.
- Timer ("Our Time") dan countdown anniversary dihitung otomatis dari `relationshipStart`, jadi kamu **tidak perlu** mengubah angka hari secara manual.

### Mengganti ulang tahun Frall

Cukup ubah nilai `partnerBirthday` di `CONFIG`, lalu update angka tanggal yang tampil di section "Two Special Days" pada `index.html` (cari teks `13 October`).

### Mengganti foto

1. Simpan foto kamu di folder `assets/images/`.
2. Beri nama sesuai placeholder (`memory-01.jpg` sampai `memory-06.jpg`), atau ubah nama file di array `galleryItems` dalam `js/script.js`.
3. Ubah teks `caption` di array yang sama untuk mengganti keterangan tiap foto.
4. Kamu bisa menambah atau mengurangi jumlah foto — cukup tambah/hapus item di array `galleryItems`.

```javascript
const galleryItems = [
  { src: "assets/images/memory-01.jpg", caption: "A little moment I'll keep." },
  // tambah item baru di sini
];
```

### Mengganti caption, pesan, dan konten lain

Semua konten yang berulang sudah dipisah jadi array/object di bagian atas `js/script.js`, supaya gampang diedit tanpa perlu menyentuh HTML:

- `littleThings` — kartu di section "It's The Little Things"
- `whyYouCards` — kartu di section "Why You?"
- `galleryItems` — foto dan caption

Untuk **Love Letter**, ubah langsung teks di dalam `<div class="letter">` pada `index.html`.

### Mengganti musik

1. Simpan file audio kamu sebagai `assets/music/our-song.mp3` (format MP3 disarankan untuk kompatibilitas browser terluas).
2. Kalau ingin nama file berbeda, ubah `musicFile` di `CONFIG` dan atribut `src` pada tag `<audio>` di `index.html`.
3. Judul lagu yang tampil di player diambil dari `musicTitle` di `CONFIG`.

Player tidak memaksa autoplay (browser modern memblokirnya) — Frall cukup menekan tombol play di pojok kanan bawah.

### Mengganti warna

Semua warna didefinisikan sebagai CSS custom properties di bagian atas `css/style.css`, di dalam `:root { ... }`. Contoh:

```css
:root{
  --blush: #F7DEE5;
  --dusty-rose: #C98A9A;
  --cream: #FBF6EE;
  --lavender: #EAE1F5;
  ...
}
```

Ubah nilai hex-nya untuk mengganti seluruh skema warna website secara konsisten.

---

## 4. Deploy ke GitHub Pages

1. Buat repository baru di GitHub (public atau private, keduanya bisa dipakai untuk GitHub Pages sesuai plan kamu).
2. Upload seluruh isi folder `romantic-website/` ke repository tersebut — pastikan `index.html` berada tepat di **root** repository, bukan di dalam subfolder.
3. Masuk ke halaman repository di GitHub → klik tab **Settings**.
4. Di sidebar kiri, klik **Pages**.
5. Pada bagian **Source**, pilih **Deploy from a branch**.
6. Pilih branch **`main`** (atau branch tempat kode kamu berada).
7. Pilih folder **`/ (root)`**.
8. Klik **Save**.
9. Tunggu beberapa menit sampai GitHub selesai mem-build dan men-deploy.
10. Website akan bisa diakses lewat:

```text
https://username.github.io/nama-repository/
```

> Website ini sudah menggunakan **relative paths** untuk semua aset (CSS, JS, gambar, musik), jadi akan tetap berfungsi normal walau berada di subfolder seperti `username.github.io/nama-repository/`, bukan hanya di root domain.

---

## 5. Catatan

- Semua fitur (timer, countdown, gallery, lightbox, little things, why you, envelope, easter eggs, music player) berjalan murni dengan JavaScript di sisi browser — tidak butuh koneksi backend apa pun.
- Kalau file foto atau musik belum ditambahkan, website tetap berjalan tanpa error — placeholder-nya cukup disembunyikan atau senyap.
- Animasi menghormati preferensi `prefers-reduced-motion` pengguna.

Selamat mengedit, dan semoga Frall suka. ♡
