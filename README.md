# Expense Tracker
NPM:535250137

Front-end Expense Tracker yang di buat dengan html,css,js

## Fitur

- Tambah pengeluaran baru (nama, jumlah, kategori, tanggal)
- Edit pengeluaran yang sudah ada
- Hapus pengeluaran (ada konfirmasi dulu, agar mencegah terpencet secara tidak sengaja)
- Filter daftar pengeluaran berdasarkan kategori
- Total otomatis keitung
- Format mata uang Rupiah dengan pemisah ribuan
- tampilan responsif, enak dilihat di HP juga
- Ada Chart per ketegori

## Struktur File
index.html -> halaman utama(form,tabel,modal)
style.css -> berisi kode styling agar frontend terlihat bagus
script.js -> berisi logika dari pengaplikasian nya


## Cara Kerjanya

### Nambah Pengeluaran
Tombol "Add Expense" awalnya nonaktif. Baru bisa dipencet kalau semua field (nama, jumlah, kategori, tanggal) udah keisi. Begitu diklik, datanya masuk ke daftar dan langsung kesimpen ke localStorage.

### Nampilin Data
Semua logika render tabel ada di satu fungsi, `updateUI()`. Fungsi ini fleksibel — bisa dipanggil buat nampilin semua data, atau data yang udah difilter kategori tertentu.

### Edit & Hapus
Klik "Edit" bakal munculin modal yang udah keisi data lama, tinggal ubah terus simpan. Klik "Delete" bakal nanya konfirmasi dulu sebelum beneran ngehapus.

### Filter Kategori
Bisa milih mau liat pengeluaran kategori apa aja lewat dropdown. Data aslinya nggak keubah, cuma tampilannya aja yang disaring.

## Cara Pakainya

Tinggal buka `index.html` langsung di browser. Nggak perlu install apa-apa, nggak perlu server, nggak perlu koneksi internet (kecuali buat load font dari Google Fonts).

## Yang Perlu Diinget
- Belum ada validasi buat cegah input jumlah negatif.
- Kalau lagi filter kategori terus nambah/edit/hapus data, tampilannya bakal balik nampilin semua kategori lagi.