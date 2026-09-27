# Website Ucapan Ulang Tahun ke-17

Website satu halaman, statis, tanpa build step. Cukup `index.html`.

## Sebelum di-publish
Buka `index.html`, cari bagian `<script>` paling bawah, ganti nilai `namaPacar`.
Kalau mau ganti pesan surat atau doa-doanya juga, tinggal edit teks di dalam
tag `<section id="letter">` dan `<section id="wishes">` langsung dari HTML-nya.
Kotak foto di `#gallery` masih placeholder (ikon emoji), boleh diganti jadi
`<img src="foto1.jpg">` kalau mau pasang foto asli.

## Push ke GitHub
```bash
git init
git add index.html README.md
git commit -m "birthday site"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

## Deploy ke Vercel
1. Buka vercel.com, login pakai akun GitHub.
2. Klik "Add New Project", pilih repo yang barusan di-push.
3. Framework Preset biarin "Other" (situs ini statis, gak perlu build command).
4. Klik Deploy, tunggu sebentar, link-nya langsung jadi.

Setiap kali push perubahan baru ke branch `main`, Vercel otomatis deploy ulang.
