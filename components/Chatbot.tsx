'use client'; // Client Component karena interaktivitas yang tinggi

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';


// =========================================================
// PENTING: Ganti dengan Kunci API OpenRouter Anda yang sebenarnya
// JANGAN mengekspos kunci API Anda di aplikasi produksi!
// Gunakan variabel lingkungan (environment variables) di Next.js!
// Contoh: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
// =========================================================

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "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") {
    console.error("Peringatan: Kunci API OpenRouter belum diatur atau masih placeholder. Harap ganti 'YOUR_OPENROUTER_API_KEY_HERE' dengan kunci API Anda di kode JavaScript. Ingat, ini tidak aman untuk produksi!");
}

// YOUR_SITE_URL akan diinisialisasi di sisi klien
const YOUR_SITE_NAME = 'Chat Temal Amallan';

interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}

const systemPrompt = `
    Anda adalah Chat Temal, asisten digital resmi dari Yayasan Amallan Indonesia.
    Tujuan utama Amallan adalah memberdayakan pondok pesantren agar mandiri dan berkelanjutan.
    Kami didirikan dengan semangat kemandirian pesantren karena kami melihat potensi besar namun juga tantangan dalam digitalisasi dan ekonomi di sana.

    Menurut data Kementerian Agama Republik Indonesia, saat ini terdapat lebih dari 41.220 pondok pesantren yang tersebar di seluruh Indonesia, dan sebanyak 307 di antaranya berada di Kalimantan Barat. Namun, tidak semua pesantren berada pada level yang sama secara ekonomi; sebagian besar masih bergantung penuh pada donasi dan bantuan masyarakat. Amallan hadir untuk mengubah wajah ketergantungan ini menjadi kemandirian.

    Visi kami: Menciptakan pondok pesantren yang mandiri berbasis digitalisasi melalui program pengembangan dan kolaborasi.
    Misi kami:
    1. Mengembangkan solusi digital yang relevan dan aplikatif untuk mendukung operasional dan manajemen pesantren.
    2. Mendorong kolaborasi antara pesantren, dunia usaha, dan teknologi untuk menciptakan ekosistem kemandirian yang berkelanjutan.
    3. Membina dan melatih SDM pesantren agar mampu mengelola dan mengembangkan potensi digital secara mandiri.
    4. Mendampingi pesantren dalam membangun unit usaha produktif berbasis teknologi dan potensi lokal.
    5. Menjadi jembatan sinergi antara pesantren dan mitra strategis seperti pemerintah, komunitas, dan sektor swasta.

    Program & Layanan Unggulan Amallan meliputi:
    - Digitalisasi Manajemen Pesantren: Membantu branding pondok pesantren agar mudah ditemukan secara online, serta manajemen administrasi dan keuangan.
    - Pendampingan Unit Usaha Produktif: Meningkatkan kapasitas internal agar pondok bisa berkembang secara mandiri.
    - Pelatihan SDM Pesantren: Melatih santri dan pengurus dalam pengelolaan branding pondok pesantren maupun unit usaha yang dimiliki.
    - Platform Donasi & Crowdfunding: Membangun sistem donasi yang memudahkan pondok untuk membangun unit usaha atau proyek pembangunan, serta membuat program pengembangan internal.

    Model operasional Amallan terdiri dari empat tahap utama:
    1. Identifikasi & Seleksi Pondok Pesantren: Menentukan pesantren yang layak dibina dan siap berkembang.
    2. Digitalisasi & Manajemen Sistem: Membangun pondasi administratif dan teknologi pondok.
    3. Pemberdayaan Ekonomi: Membantu pondok membangun unit usaha produktif.
    4. Penggalangan Dukungan & Kolaborasi: Menghubungkan pondok dengan jaringan donatur dan mitra.

    Amallan memiliki maskot bernama Temal, singkatan dari Teman Beramal, yang melambangkan semangat berbagi.

    Salah satu pencapaian nyata kami adalah Pondok Pesantren Darul Fikri sebagai mitra binaan pertama. Melalui Amallan, Darul Fikri berhasil membuka akses ke berbagai program strategis dan dukungan dari Bank Indonesia (Kebun Anggur IoT, Bantuan Komputer, Kendaraan Tosa), OJK Kalbar (Perpustakaan Rumah Cerdas), PLN (Peternakan Bebek, Gedung MTS), Mitsubishi (Mobil Xpander Cross), Boejang Group (Kampoeng Wahsawah), dan donatur (Mobil Xenia, Kantor Sekretariat).

    Tim inti Amallan meliputi Donny Hidayat (CEO), Raihanur Ramadhan (Creative & Communication), Hafizuddin (Head of Program), dan Wawan Hartono (Product & Technology Lead).

    Anda dapat menghubungi kami melalui WhatsApp: 0821 5939 2448, Email Umum: amallanindonesia@gmail.com. Kunjungi juga website resmi kami di www.amallan.id. Untuk informasi cara donasi dan menjadi relawan, silakan kunjungi website resmi kami.

    **Tugas dan Gaya Respon Anda:**
    * Jawab pertanyaan pengguna dengan ramah, informatif, lugas, dan selalu dalam Bahasa Indonesia yang formal namun mudah dipahami.
    * Prioritaskan informasi yang terkait langsung dengan Amallan dan kegiatan utamanya (program, cara donasi, kontak, cara jadi relawan, mitra, pesantren binaan, visi-misi, serta dampak positif yang dihasilkan).
    * Jika Anda tidak memiliki informasi spesifik dari data yang diberikan, sampaikan dengan lembut bahwa Anda belum memiliki detail spesifik mengenai hal tersebut, dan arahkan pengguna ke opsi lain (misalnya, kunjungi website resmi kami di www.amallan.id atau hubungi kontak yang tersedia) dan tawarkan bantuan lain seputar Amallan.
    * Jangan pernah mengatakan "saya tidak tahu" atau "saya belum memiliki informasi" secara langsung.
    * Selalu akhiri respons dengan menawarkan bantuan lebih lanjut atau pertanyaan terkait, seperti "Ada lagi yang ingin ditanyakan?" atau "Apakah ada hal lain tentang Amallan yang ingin Anda ketahui?".
    * Gunakan format teks yang mudah dibaca, seperti poin-poin atau penebalan (**bold**) untuk kata kunci atau informasi penting.
`;

const initialBotMessage = "Halo! 👋 Saya **Temal**, asisten digital Amallan. Ada yang bisa saya bantu?\n\nAnda bisa menanyakan tentang:\n- Tentang Amallan\n- Program & Layanan Kami\n- Cara Berdonasi\n- Pesantren Binaan Kami\n- Bergabung Sebagai Relawan\n- Mitra Strategis Kami\n- Kontak Kami\n\nAtau klik pertanyaan cepat di bawah:";
const initialQuickReplies = ["Tentang Amallan", "Program & Layanan", "Cara Berdonasi", "Kontak Kami"];

// Data respons spesifik dari amallan.js
const specificResponses = [
    {
        keywords: [
            "apa itu amallan", "tentang amallan", "amallan itu apa", "jelaskan amallan", "siapa amallan",
            "definisi amallan", "arti amallan", "profil amallan", "kegiatan utama amallan", "tujuan amallan",
            "asal amallan", "sejarah amallan", "latar belakang amallan", "organisasi amallan", "mengapa amallan",
            "pendiri amallan", "pt resiscode tech innovation", "apa fungsi amallan", "apa peran amallan",
            "tentang yayasan amallan", "yayasan amallan indonesia", "apa kerjanya amallan", "mengenal amallan",
            "informasi amallan", "detail amallan", "apa itu teman beramal", "platform amallan", "deskripsi amallan",
            "amalan", "amalan itu apa", "tentang amalan", "profil amalan", "tujuan amalan", "apa yang amalan lakukan",
            "badan hukum amallan", "legalitas amallan", "perusahaan amallan", "siapa saja yang terlibat amallan",
            "tentang amallan"
        ],
        response: "Amallan adalah inisiatif sosial dari anak muda di bawah PT RESISCODE TECH INNOVATION yang bertujuan mengubah ketergantungan pondok pesantren menjadi kemandirian. Kami percaya bahwa pesantren, sebagai lembaga pendidikan dan pusat nilai keislaman, layak tumbuh dengan lebih kuat dan berdaya-bukan hanya dalam aspek keilmuan, tetapi juga dalam hal manajemen, ekonomi, dan teknologi.\n\nVisi kami: **Menciptakan pondok pesantren yang mandiri berbasis digitalisasi melalui program pengembangan dan kolaborasi.**",
        quickReplies: ["Visi & Misi Kami", "Program & Layanan", "Pesantren Binaan Kami"]
    },
    {
        keywords: [
            "mengapa amallan didirikan", "alasan pendirian amallan", "kenapa amallan ada", "latar belakang amallan",
            "apa yang menggerakkan amallan", "isu pesantren", "masalah ketergantungan pesantren", "solusi amallan",
            "tantangan pesantren indonesia", "kondisi ekonomi pesantren", "kebutuhan pesantren",
            "mengapa pentingnya kemandirian pesantren", "awal mula amallan", "dasar didirikannya amallan",
            "tujuan didirikan amallan", "krisis pesantren", "problem pesantren", "pesantren mandiri kenapa",
            "memotivasi amallan", "kenapa amalan dibentuk", "kenapa amalan dibuat",
            "mengapa kami didirikan"
        ],
        response: "Amallan lahir dari kepedulian anak-anak muda terhadap realitas ini, di mana sebagian besar pondok pesantren masih sangat bergantung pada donasi dan bantuan masyarakat untuk bertahan hidup dan menyelenggarakan pendidikan. Kondisi inilah yang menggerakkan kami, sebuah inisiatif sosial yang ingin mengubah wajah ketergantungan menjadi kemandirian. Kami percaya bahwa pesantren, sebagai lembaga pendidikan dan pusat nilai keislaman, layak tumbuh dengan lebih kuat dan berdaya-bukan hanya dalam aspek keilmuan, tetapi juga dalam hal manajemen, ekonomi, dan teknologi.",
        quickReplies: ["Kondisi Pesantren Saat Ini", "Visi & Misi Kami", "Bagaimana Kami Bekerja"]
    },
    {
        keywords: [
            "visi misi", "visi amallan", "misi amallan", "tujuan amallan", "apa visi misi amallan",
            "apa tujuan amallan", "misi utama amallan", "visi dan misi", "strategi amallan", "rencana amallan",
            "cita-cita amallan", "target amallan", "pengembangan solusi digital", "kolaborasi pesantren dunia usaha",
            "membina melatih sdm", "membangun unit usaha produktif", "jembatan sinergi", "visi dan misi amalan",
            "visi & misi kami", "detail visi amallan", "misi utama amallan"
        ],
        response: "Visi Amallan adalah: **Menciptakan pondok pesantren yang mandiri berbasis digitalisasi melalui program pengembangan dan kolaborasi.**\n\nSedangkan misi kami meliputi:\n" +
                  "1. Mengembangkan solusi digital yang relevan dan aplikatif untuk mendukung operasional dan manajemen pesantren.\n" +
                  "2. Mendorong kolaborasi antara pesantren, dunia usaha, dan teknologi untuk menciptakan ekosistem kemandirian yang berkelanjutan.\n" +
                  "3. Membina dan melatih SDM pesantren agar mampu mengelola dan mengembangkan potensi digital secara mandiri.\n" +
                  "4. Mendampingi pesantren dalam membangun unit usaha produktif berbasis teknologi dan potensi lokal.\n" +
                  "5. Menjadi jembatan sinergi antara pesantren dan mitra strategis seperti pemerintah, komunitas, dan sektor swasta.",
        quickReplies: ["Tentang Amallan", "Program & Layanan", "Mitra Strategis Kami"]
    },
    {
        keywords: [
            "jumlah pesantren", "berapa pesantren di indonesia", "pesantren kalbar", "data pesantren",
            "statistik pesantren", "data kementerian agama", "pesantren di kalimantan barat",
            "total pondok pesantren", "ponpes indonesia", "ponpes kalbar", "data terbaru pesantren",
            "angka pesantren", "jumlah ponpes"
        ],
        response: "Menurut data Kementerian Agama Republik Indonesia, saat ini terdapat lebih dari 41.220 pondok pesantren yang tersebar di seluruh Indonesia, dan sebanyak 307 di antaranya berada di Kalimantan Barat.",
        quickReplies: ["Kondisi Pesantren Saat Ini", "Pesantren Binaan Kami", "Dampak & Pencapaian"]
    },
    {
        keywords: [
            "kondisi pesantren", "masalah pesantren", "tantangan pesantren", "pesantren mandiri", "pendanaan pesantren",
            "terbatas", "donasi", "bantuan masyarakat", "tipe pesantren", "level ekonomi pesantren", "ketergantungan pesantren",
            "mengapa pesantren bergantung", "dana pesantren", "pembiayaan pesantren", "tingkatan ponpes", "pesantren donasi",
            "pesantren unit usaha", "pesantren biaya pendidikan tinggi", "pesantren pendanaan campuran",
            "kondisi pesantren saat ini"
        ],
        response: "Dari jumlah pesantren yang ada, tidak semuanya berada pada level yang sama secara ekonomi. Pondok pesantren hadir dalam berbagai tingkatan—mulai dari yang sepenuhnya mengandalkan donasi dan bantuan masyarakat, hingga yang telah memiliki unit usaha produktif serta kemampuan pembiayaan mandiri. Sayangnya, sebagian besar pesantren di lapangan masih berada dalam kelompok pertama: bergantung penuh pada kebaikan para dermawan untuk bisa bertahan hidup dan menyelenggarakan pendidikan.",
        quickReplies: ["Mengapa Kami Didirikan", "Visi & Misi Kami", "Program & Layanan"]
    },
    {
        keywords: [
            "program apa saja", "kegiatan amallan", "layanan amallan", "program unggulan", "fitur amallan",
            "aktivitas amallan", "digitalisasi pesantren", "unit usaha produktif", "pelatihan sdm",
            "platform donasi transparan", "sistem manajemen digital", "aplikasi pembelajaran", "branding digital",
            "pendampingan wirausaha", "pemasaran digital produk", "pelatihan santri", "keterampilan usaha",
            "manajemen pondok", "crowdfunding proyek", "laporan realtime dana", "apa saja yang dilakukan amallan",
            "bidang fokus amallan", "detail program", "digitalisasi manajemen", "pendampingan unit usaha",
            "pelatihan sdm pesantren", "platform donasi crowdfunding", "layanan digital amallan", "bantuan pesantren",
            "program pemberdayaan", "jenis program amallan", "cara amallan membantu", "apa yang ditawarkan amallan",
            "program amalan", "layanan amalan", "kegiatan amalan", "digitalisasi administrasi", "manajemen keuangan pesantren",
            "pengembangan ekonomi pesantren", "unit usaha produktif pesantren", "pemasaran digital produk", "skill santri",
            "manajemen pondok modern", "penggalangan dana pesantren", "proyek pesantren", "adopsi program", "solusi amallan",
            "program & layanan"
        ],
        response: "📋 **Program & Layanan Unggulan Amallan**:\n\n" +
                                    "1. **Digitalisasi Manajemen Pesantren**: Amallan menyediakan sistem berbasis digital untuk membantu pesantren dalam branding pondok pesantren agar mudah ditemukan secara online serta manajemen administrasi dan keuangan pondok pesantren.\n" +
                                    "2. **Pendampingan Unit Usaha Produktif**: Meningkatkan kapasitas internal agar pondok bisa berkembang secara mandiri.\n" +
                                    "3. **Pelatihan SDM Pesantren**: Pelatihan ini ditujukan kepada santri agar mandiri dalam mengelola branding pondok pesantren maupun unit usaha yang dimiliki.\n" +
                                    "4. **Platform Donasi & Crowdfunding**: Kami membangun sistem donasi yang memudahkan pondok untuk membangun Unit Usaha Pondok Pesantren ataupun Pembangunan Pondok Pesantren, serta membuat program pengembangan untuk internal Pondok Pesantren.",
        quickReplies: ["Digitalisasi Pesantren", "Pengembangan Ekonomi", "Pelatihan SDM", "Platform Donasi"]
    },
    {
        keywords: [
            "model operasional", "cara amallan bekerja", "bagaimana amallan bekerja", "tahap kerja amallan",
            "alur kerja amallan", "metode amallan", "pendekatan kolaboratif", "strategi kerja amallan",
            "tahapan amallan", "proses kerja amallan", "identifikasi seleksi", "digitalisasi manajemen sistem",
            "pemberdayaan ekonomi", "penggalangan dukungan", "kolaborasi amallan", "flowchart amallan",
            "siklus kerja amallan", "bagaimana amalan bekerja", "tahapan amalan", "proses amalan",
            "cara kerja amallan", "langkah-langkah amallan", "tahap operasional",
            "bagaimana kami bekerja"
        ],
        response: "Amallan bekerja dengan pendekatan kolaboratif berbasis teknologi untuk membantu pondok pesantren menuju kemandirian. Model operasional kami terdiri dari empat tahap utama yang saling terintegrasi:\n\n" +
                                    "1. **Identifikasi & Seleksi Pondok Pesantren**: Menentukan pesantren yang layak dibina dan siap berkembang.\n" +
                                    "2. **Digitalisasi & Manajemen Sistem**: Membangun pondasi administratif dan teknologi pondok.\n" +
                                    "3. **Pemberdayaan Ekonomi**: Membantu pondok membangun unit usaha produktif.\n" +
                                    "4. **Penggalangan Dukungan & Kolaborasi**: Menghubungkan pondok dengan jaringan donatur dan mitra.",
        quickReplies: ["Dampak & Pencapaian", "Mitra Strategis Kami", "Program & Layanan"]
    },
    {
        keywords: [
            "maskot amallan", "siapa temal", "arti temal", "teman beramal", "karakter maskot",
            "simbol amallan", "filosofi maskot", "gambar maskot", "sosok temal", "maskot chatbot",
            "robot amallan", "gambar robot hijau", "makna temal", "amalan maskot", "apa itu temal?"
        ],
        response: "Amallan menghadirkan karakter maskot bernama **Temal**, singkatan dari **Teman Beramal**. Temal bukan sekadar tokoh visual, tetapi simbol semangat kami dalam berbagi: dengan cara yang menyenangkan, bersahabat, dan dekat dengan dunia santri. Temal hadir sebagai tokoh edukatif yang ringan dan menyenangkan. Bersama Temal, kami ingin menunjukkan bahwa perubahan bisa dimulai dari hal kecil, asal dilakukan dengan niat baik dan wajah yang tersenyum.",
        quickReplies: ["Tentang Amallan", "Visi & Misi Kami", "Tentang Kami"]
    },
    {
        keywords: [
            "dampak amallan", "pencapaian amallan", "hasil amallan", "kesuksesan amallan", "bukti amallan",
            "studi kasus amallan", "pondok pesantren darul fikri", "darul fikri", "mitra binaan pertama",
            "apa yang dicapai amallan", "prestasi amallan", "proyek darul fikri", "kebun anggur iot",
            "perpustakaan rumah cerdas", "peternakan bebek", "gedung mts", "kendaraan tosa", "kampoeng wahsawah",
            "mobil operasional xenia", "bantuan peralatan komputer", "mobil xpander cross", "kantor sekretariat darul fikri",
            "kisah sukses amallan", "dampak positif", "hasil nyata amallan", "pencapaian utama", "transformasi pesantren",
            "contoh sukses amallan", "efek amallan", "bank indonesia proyek", "ojk kalbar proyek", "pln proyek",
            "mitsubishi kendaraan", "boejang group proyek", "darul fikri成果", "darul fikri project",
            "dampak & pencapaian", "dampak dan pencapaian", "contoh dampak"
        ],
        response: "Salah satu pencapaian nyata kami adalah **Pondok Pesantren Darul Fikri** sebagai mitra binaan pertama. Darul Fikri menjadi contoh nyata transformasi yang bisa dicapai ketika pesantren mendapatkan dukungan yang terarah. Melalui peran Amallan, Darul Fikri telah berhasil membuka akses ke berbagai program strategis dari pemerintah dan lembaga mitra. Program dan dukungan yang diterima Darul Fikri meliputi:\n" +
                                    "- Kebun Anggur berbasis IOT - Bank Indonesia\n" +
                                    "- Perpustakaan rumah cerdas dari OJK Kalbar\n" +
                                    "- Peternakan Bebek dari YBM PLN Kalbar\n" +
                                    "- Gedung MTS dari YBM PLN Kalbar\n" +
                                    "- Kendaraan Tosa - Bank Indonesia\n" +
                                    "- Kampoeng Wahsawah - Boejang Group\n" +
                                    "- Mobil Operasional Xenia dari Donatur\n" +
                                    "- Bantuan Peralatan Komputer - Bank Indonesia\n" +
                                    "- Mobil Xpander Cross - Mitsubishi\n" +
                                    "- Kantor Sekretariat Darul Fikri - Donatur",
        quickReplies: ["Mitra Strategis Kami", "Program & Layanan", "Pesantren Binaan Kami"]
    },
    {
        keywords: [
            "struktur organisasi", "tim amallan", "pengurus amallan", "ceo amallan", "head of program amallan",
            "product technology lead", "creative communication amallan", "donny hidayat", "raihanur ramadhan",
            "hafizuddin", "wawan hartono", "desain grafis", "video editing", "copy writing", "admin media creative",
            "web developer", "mobile developer", "desain ui ux", "daftar pengurus", "anggota tim", "pemimpin amallan",
            "jabatan amallan", "divisi amallan", "tim manajemen", "siapa ceo", "siapa head program", "siapa ptl",
            "tim amalan", "direksi amallan", "organigram amallan", "personil amallan", "struktur amalan",
            "struktur organisasi"
        ],
        response: "Struktur tim Amallan mencakup berbagai peran kunci:\n" +
                                    "- **Donny Hidayat, S.Kom** sebagai Chief Executive Officer\n" +
                                    "- **Raihanur Ramadhan** sebagai Creative & Communication, yang mencakup Desain Grafis, Video Editing, Copy Writing, dan Admin serta Media Creative.\n" +
                                    "- **Hafizuddin** sebagai Head of Program.\n" +
                                    "- **Wawan Hartono** sebagai Product & Technology Lead, yang mencakup Web Developer, Mobile Developer, dan Desain UI/UX.",
        quickReplies: ["Tentang Amallan", "Bergabung Sebagai Relawan", "Kontak Kami"]
    },
    {
        keywords: [
            "kontak amallan", "nomor telepon", "alamat kantor", "email amallan", "hubungi amallan",
            "customer service", "sosmed amallan", "whatsapp amallan", "telpon amallan", "lokasi amallan",
            "instagram amallan", "facebook amallan", "youtube amallan", "website amallan", "info kontak",
            "nomor wa", "email resmi", "lokasi", "call center", "kantor pusat", "kantor amallan", "amallan.id",
            "cara menghubungi amallan", "dimana kantor amallan", "akun sosial media amallan", "nomor admin",
            "amallanindonesia@gmail.com", "082159392448", "jl ahmadyani pontianak", "socmed amallan",
            "kontak amalan", "no telepon", "alamat", "email", "wa admin",
            "kontak kami", "nomor whatsapp amallan", "email amallan", "alamat kantor kami"
        ],
        response: "📞 **Kontak Resmi Amallan**:\n\n" +
                                    "WhatsApp: **0821 5939 2448**\n" +
                                    "Email Umum: **amallanindonesia@gmail.com**\n" +
                                    "Website: **www.amallan.id**\n\n" +
                                    "Amallan percaya perubahan besar dimulai dari satu langkah kecil, dan langkah itu bisa dimulai hari ini bersama kamu.",
        quickReplies: ["Cara Berdonasi", "Program & Layanan", "Bergabung Sebagai Relawan"]
    },
    {
        keywords: [
            "cara donasi", "mau donasi", "ingin menyumbang", "rekening amallan", "donasi lewat apa",
            "berdonasi", "sumbang", "transfer donasi", "metode pembayaran", "donasi amallan",
            "menyumbang ke amallan", "qris amallan", "e-wallet donasi", "donasi barang", "donasi langsung",
            "bantuan dana", "kirim uang", "cara memberi sumbangan", "bagaimana berdonasi", "konfirmasi donasi",
            "platform donasi", "menyumbang dana", "salurkan dana", "dana bantuan", "donasi untuk pesantren",
            "sedekah amallan", "infaq amallan", "zakat amallan", "cara menyalurkan donasi", "berdonasi ke amallan",
            "donasi amanah", "donasi untuk pondok", "dukungan finansial", "bantu pesantren", "donasi online",
            "donasi website", "cara memberi", "donasi amalan", "berdonasi amalan", "menyumbang amalan",
            "transparansi donasi",
            "cara berdonasi", "bagaimana cara berdonasi?"
        ],
        response: "Amallan memiliki platform donasi yang transparan, di mana setiap donasi dapat terlacak penggunaannya melalui laporan yang tersedia. Untuk informasi lebih lanjut mengenai cara berdonasi dan platform donasi transparan Amallan, silakan kunjungi website kami di **www.amallan.id**.",
        quickReplies: ["Program & Layanan", "Laporan & Transparansi", "Kontak Kami"]
    },
    {
        keywords: [
            "mitra amallan", "kerja sama", "corporate partnership", "csr amallan", "sponsor amallan",
            "kolaborasi", "dukungan perusahaan", "partner amallan", "perusahaan mitra", "siapa mitra",
            "daftar mitra", "program csr", "ingin jadi mitra", "bank indonesia", "ojk kalbar", "pln",
            "mitsubishi", "boejang group", "lembaga mitra", "institusi mitra", "pemerintah mitra",
            "komunitas mitra", "sektor swasta mitra", "bermitra dengan amallan", "kerjasama csr",
            "daftar lengkap mitra", "mitra strategis amallan", "kolaborasi perusahaan", "pihak yang bekerjasama",
            "nama-nama mitra", "bank indo", "ojk", "pln ybm", "partner bisnis", "kerjasama donasi",
            "amalan mitra", "daftar mitra amalan",
            "mitra strategis kami", "program csr kami", "hubungi tim partnership"
        ],
        response: "Amallan menjalin kemitraan strategis dengan berbagai perusahaan dan institusi untuk pengembangan pesantren. Contoh mitra kami meliputi:\n" +
                                    "- **Bank Indonesia** (Pendampingan Digital & Kebun Anggur IoT, Bantuan Peralatan Komputer, Kendaraan Tosa)\n" +
                                    "- **OJK Kalbar** (Perpustakaan Cerdas)\n" +
                                    "- **PLN** (Gedung MTS & Ternak Bebek melalui YBM PLN Kalbar)\n" +
                                    "- **Mitsubishi** (Kendaraan Operasional: Mobil Xpander Cross)\n" +
                                    "- **Boejang Group** (Kampoeng Wahsawah)\n\n" +
                                    "Amallan juga menjadi jembatan sinergi antara pesantren dan mitra strategis seperti pemerintah, komunitas, dan sektor swasta.",
        quickReplies: ["Program CSR Kami", "Dampak & Pencapaian", "Hubungi Tim Partnership"]
    },
    {
        keywords: [
            "jadi relawan", "volunteer amallan", "bergabung sebagai relawan", "cara volunteer",
            "rekrutmen relawan", "open volunteer", "lowongan relawan", "ikut membantu", "sukarelawan",
            "persyaratan relawan", "bidang volunteer", "cara daftar relawan", "ingin jadi relawan",
            "kesempatan relawan", "syarat relawan", "teman beramal", "bergabung gerakan kebaikan",
            "daftar relawan online", "form relawan", "volunteer program", "donasi waktu", "bantu amallan",
            "volunteer amalan", "jadi amalan", "daftar sukarelawan", "peluang relawan", "cara ikut amallan",
            "ikut serta", "kontribusi amallan", "bagaimana cara jadi relawan", "syarat jadi volunteer",
            "bergabung sebagai relawan", "cara bergabung relawan", "daftar relawan online"
        ],
        response: "Kami sangat mengapresiasi semangat untuk bergabung! Amallan percaya bahwa perubahan besar dimulai dari satu langkah kecil, dan langkah itu bisa dimulai hari ini bersama Anda sebagai #TemanBeramal.\n\nUntuk informasi lebih lanjut mengenai kesempatan menjadi relawan, silakan kunjungi website kami di **www.amallan.id**.",
        quickReplies: ["Kontak Kami", "Program & Layanan", "Struktur Organisasi"]
    },
    {
        keywords: [
            "laporan donasi", "transparansi dana", "pertanggungjawaban dana", "laporan keuangan",
            "track record donasi", "akuntabilitas amallan", "penggunaan dana", "audit", "laporan tahunan",
            "laporan triwulanan", "laporan proyek", "laporan real-time", "bagaimana dana digunakan",
            "cek laporan", "info laporan", "transparansi donasi", "pengelolaan dana", "dana amanah",
            "laporan penggunaan sumbangan", "laporan donasi amalan", "bukti donasi", "dana masuk keluar",
            "pertanggungjawaban donasi", "laporan crowdfunding",
            "laporan & transparansi", "akses laporan keuangan", "laporan proyek terbaru", "transparansi dana donasi"
        ],
        response: "Amallan memiliki platform donasi yang transparan, di mana setiap donasi dapat terlacak penggunaannya melalui laporan yang tersedia. Untuk detail laporan keuangan atau penggunaan dana, silakan kunjungi website kami di **www.amallan.id** atau hubungi admin kami untuk informasi lebih lanjut.",
        quickReplies: ["Cara Berdonasi", "Program & Layanan", "Kunjungi Website"]
    },
    {
        keywords: [
            "pesantren binaan", "pondok binaan", "list pesantren", "daftar pesantren", "pesantren yang dibantu",
            "dimana pesantren amallan", "ada berapa pesantren", "pesantren partner", "darul fikri",
            "al-ikhlas", "nurul huda", "darul ulum", "pesantren di kalbar", "pesantren modern",
            "pendidikan pesantren", "pondok pesantren", "nama pesantren binaan", "lokasi pesantren binaan",
            "contoh pesantren binaan", "mitra binaan", "pesantren dikembangkan", "list ponpes",
            "ponpes kerjasama", "pesantren modern amallan", "daftar pesantren", "pesantren amalan",
            "pesantren binaan kami", "profil pesantren binaan", "dampak di pesantren y", "tentang program di pesantren"
        ],
        response: "Salah satu contoh pesantren binaan Amallan adalah **Pondok Pesantren Darul Fikri** sebagai mitra binaan pertama. Melalui pendampingan kami, Darul Fikri telah berhasil membuka akses ke berbagai program strategis dari pemerintah dan lembaga mitra. Kami terus berupaya memperluas jangkauan pembinaan kami ke pesantren lainnya di masa depan.",
        quickReplies: ["Dampak & Pencapaian", "Digitalisasi Pesantren", "Pengembangan Ekonomi"]
    },
    {
        keywords: [
            "terima kasih", "makasih", "thanks", "thx", "thank you", "terimakasih", "matur suwun",
            "hatur nuhun", "sukran", "arigato", "syukron", "ok", "oke", "sip", "baik", "sama-sama",
            "terima kasih banyak", "mksh", "tq", "thanks bot", "oke makasih", "terimakasih banyak",
            "trimakasih", "thank u", "terimakasih", "syukria"
        ],
        response: "Sama-sama! 😊\n\nJika ada pertanyaan lain tentang Amallan, saya siap membantu.\n\nIngin tahu lebih banyak tentang program kami?",
        quickReplies: ["Program & Layanan", "Cara Berdonasi", "Tentang Amallan"]
    },
    {
        keywords: [
            "halo", "hai", "hi", "pagi", "siang", "sore", "malam", "selamat pagi", "selamat siang",
            "selamat sore", "selamat malam", "helo", "hey", "apa kabar", "kabar", "salam",
            "assalamualaikum", "menu", "mulai chat", "bisa bantu apa", "ada yang bisa dibantu",
            "informasi", "pertanyaan", "chat", "bot", "asisten", "buka menu", "bantuan", "info",
            "mau tanya", "ada pertanyaan", "siapa kamu", "hai bot", "help", "bantu saya", "apa saja yang ada"
        ],
        response: "Halo! 👋 Saya **Temal**, asisten digital Amallan. Ada yang bisa saya bantu?\n\nAnda bisa menanyakan tentang:\n- Tentang Amallan\n- Program & Layanan Kami\n- Cara Berdonasi\n- Pesantren Binaan Kami\n- Bergabung Sebagai Relawan\n- Mitra Strategis Kami\n- Kontak Kami",
        quickReplies: ["Tentang Amallan", "Program & Layanan", "Cara Berdonasi", "Kontak Kami"]
    },
    {
        keywords: [
            "digitalisasi pesantren", "sistem manajemen digital", "aplikasi pembelajaran digital",
            "branding digital pesantren", "digitalisasi manajemen", "manajemen administrasi keuangan",
            "sistem online pesantren", "pesantren go digital", "bantuan digital pesantren",
            "program digital amallan", "solusi digital pesantren", "digitalisasi ponpes", "admin digital pesantren",
            "keuangan digital pesantren", "manajemen pesantren digital", "aplikasi pesantren", "software pesantren",
            "digitalisasi pesantren", "detail program digitalisasi"
        ],
        response: "Program **Digitalisasi Manajemen Pesantren** Amallan menyediakan sistem berbasis digital untuk membantu pesantren dalam branding pondok pesantren agar mudah ditemukan secara online serta manajemen administrasi dan keuangan pondok pesantren.",
        quickReplies: ["Program & Layanan", "Pelatihan SDM", "Pengembangan Ekonomi"]
    },
    {
        keywords: [
            "pengembangan ekonomi", "unit usaha produktif", "pendampingan wirausaha pesantren",
            "pengembangan produk unggulan", "pemasaran digital produk pesantren", "ekonomi pesantren",
            "usaha mandiri pesantren", "bisnis pesantren", "pendampingan usaha", "membuat usaha pesantren",
            "produk pesantren", "promosi produk pesantren", "wirausaha pesantren", "kemandirian ekonomi ponpes",
            "cara pesantren berbisnis", "unit bisnis pesantren", "produksi pesantren", "pemasaran pesantren",
            "pengembangan ekonomi", "tentang pengembangan ekonomi"
        ],
        response: "Dalam pilar **Pengembangan Ekonomi**, Amallan membantu pesantren dalam pendampingan unit usaha produktif dan mendampingi pesantren dalam membangun unit usaha produktif berbasis teknologi dan potensi lokal. Peningkatan kapasitas internal bertujuan agar pondok bisa berkembang secara mandiri.",
        quickReplies: ["Program & Layanan", "Pesantren Binaan Kami", "Dampak & Pencapaian"]
    },
    {
        keywords: [
            "pelatihan sdm", "pelatihan digital untuk santri", "keterampilan usaha mandiri",
            "manajemen pondok modern", "peningkatan kapasitas sdm", "pelatihan pengurus pesantren",
            "skill santri", "edukasi digital", "pelatihan keterampilan", "sdm pesantren",
            "pengembangan sumber daya manusia", "kursus santri", "workshop pesantren", "melatih sdm",
            "pendidikan sdm", "program peningkatan skill",
            "pelatihan sdm", "info pelatihan sdm"
        ],
        response: "Program **Pelatihan SDM Pesantren** Amallan bertujuan untuk membina dan melatih SDM pesantren agar mampu mengelola dan mengembangkan potensi digital secara mandiri. Pelatihan ini ditujukan kepada santri agar mandiri dalam mengelola branding pondok pesantren maupun unit usaha yang dimiliki.",
        quickReplies: ["Program & Layanan", "Digitalisasi Pesantren", "Pengembangan Ekonomi"]
    },
    {
        keywords: [
            "crowdfunding amallan", "platform donasi transparan", "crowdfunding proyek spesifik",
            "laporan realtime penggunaan dana", "adopsi program berkelanjutan", "membangun unit usaha pondok pesantren",
            "pembangunan pondok pesantren", "membuat program pengembangan", "transparansi donasi",
            "donasi proyek", "laporkan dana", "cek penggunaan dana", "sistem donasi amallan",
            "donasi terpercaya", "penggalangan dana online", "dana pesantren transparan", "laporan akuntabilitas donasi",
            "donasi untuk pembangunan", "donasi program", "galang dana", "crowdfunding pesantren",
            "platform donasi", "crowdfunding amallan"
        ],
        response: "Amallan memiliki **Platform Donasi & Crowdfunding** yang transparan. Kami membangun sistem donasi yang memudahkan pondok untuk membangun Unit Usaha Pondok Pesantren ataupun Pembangunan Pondok Pesantren, serta membuat program pengembangan untuk internal Pondok Pesantren.",
        quickReplies: ["Cara Berdonasi", "Laporan & Transparansi", "Program & Layanan"]
    },
    {
        keywords: [
            "kunjungi website amallan", "kunjungi website", "website amallan", "link website", "web amallan", "www.amallan.id", "website", "buka website"
        ],
        response: "Tentu, Anda bisa mengunjungi website resmi Amallan untuk informasi lebih lengkap: **www.amallan.id**.",
        quickReplies: ["Tentang Amallan", "Program & Layanan", "Kontak Kami"]
    }
];


const Chatbot = () => {
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [yourSiteUrl, setYourSiteUrl] = useState<string>(''); // Tambahkan state untuk YOUR_SITE_URL

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Inisialisasi YOUR_SITE_URL hanya di sisi klien
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setYourSiteUrl(window.location.origin);
        }
    }, []); // Efek ini hanya berjalan sekali setelah mount

    // Function to initialize chat and set initial messages
    const initializeChat = () => {
        setMessages([
            { role: "system", content: systemPrompt },
            { role: "assistant", content: initialBotMessage }
        ]);
        setIsTyping(false);
    };

    useEffect(() => {
        if (isChatbotOpen) {
            initializeChat();
        }
    }, [isChatbotOpen]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const formatMarkdownToHtml = (text: string) => {
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/\n/g, '<br>');
        return formattedText;
    };

    const levenshteinDistance = (s1: string, s2: string) => {
        const m = s1.length;
        const n = s2.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(null));

        for (let i = 0; i <= m; i++) {
            dp[i][0] = i;
        }
        for (let j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const cost = (s1[i - 1] === s2[j - 1]) ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + cost
                );
            }
        }
        return dp[m][n];
    };

    const normalizeText = (text: string) => {
        let cleaned = text.toLowerCase().trim();
        cleaned = cleaned.replace(/amalan/g, 'amallan');
        cleaned = cleaned.replace(/[^\w\s]/g, '');
        cleaned = cleaned.replace(/\s+/g, ' ');

        const stemmingRules = [
            { suffix: 'nya', replace: '' }, { suffix: 'lah', replace: '' }, { suffix: 'kah', replace: '' },
            { suffix: 'pun', replace: '' }, { suffix: 'ku', replace: '' }, { suffix: 'mu', replace: '' },
            { suffix: 'kan', replace: '' }, { suffix: 'i', replace: '' }, { suffix: 'an', replace: '' },
            { suffix: 'isme', replace: '' }, { suffix: 'isasi', replace: '' }, { suffix: 'er', replace: '' },
            { suffix: 'wan', replace: '' }, { suffix: 'wati', replace: '' }, { suffix: 'nda', replace: '' },
            { prefix: 'memper', replace: '' }, { prefix: 'meng', replace: '' }, { prefix: 'meny', replace: '' },
            { prefix: 'men', replace: '' }, { prefix: 'me', replace: '' },
            { prefix: 'ber', replace: '' }, { prefix: 'bel', replace: '' }, { prefix: 'beker', replace: '' },
            { prefix: 'diper', replace: '' }, { prefix: 'ter', replace: '' }, { prefix: 'di', replace: '' },
            { prefix: 'ke', replace: '' }, { prefix: 'se', replace: '' },
            { prefix: 'per', replace: '' }, { prefix: 'pem', replace: '' }, { prefix: 'pen', replace: '' },
            { prefix: 'peng', replace: '' },
        ];

        let stemmedWords = cleaned.split(' ').map(word => {
            let currentWord = word;
            for (const rule of stemmingRules) {
                if (rule.suffix && currentWord.endsWith(rule.suffix)) {
                    const originalLength = currentWord.length;
                    currentWord = currentWord.slice(0, -rule.suffix.length);
                    if (currentWord.length < 2 && originalLength > 2 && !['di', 'ke', 'se'].includes(currentWord)) {
                        currentWord = word;
                    } else {
                        break;
                    }
                }
            }
            for (const rule of stemmingRules) {
                if (rule.prefix && currentWord.startsWith(rule.prefix)) {
                    const originalLength = currentWord.length;
                    currentWord = currentWord.slice(rule.prefix.length);
                    if (currentWord.length < 2 && originalLength > 2 && !['di', 'ke', 'se'].includes(currentWord)) {
                        currentWord = word;
                    } else {
                        break;
                    }
                }
            }
            return currentWord;
        });

        stemmedWords = stemmedWords.filter(word => word.length > 0);
        return stemmedWords.join(' ');
    };

    const getBestSpecificResponse = (normalizedInput: string) => {
        const numberMap: { [key: string]: string } = {
            '1': 'tentang amallan', '2': 'program & layanan', '3': 'cara berdonasi',
            '4': 'pesantren binaan', '5': 'bergabung sebagai relawan', '6': 'mitra strategis', '7': 'kontak kami'
        };
        if (numberMap[normalizedInput]) {
            const mappedKeyword = numberMap[normalizedInput];
            const foundEntry = specificResponses.find(entry =>
                entry.keywords.some(kw => normalizeText(kw).includes(mappedKeyword) || normalizedInput.includes(normalizeText(kw)))
            );
            if (foundEntry) {
                return {
                    response: foundEntry.response,
                    quickReplies: foundEntry.quickReplies || []
                };
            }
        }

        if (normalizedInput === 'menu') {
            return {
                response: "Silakan pilih topik:\n1. Tentang Amallan\n2. Program & Layanan\n3. Cara Berdonasi\n4. Pesantren Binaan\n5. Bergabung Sebagai Relawan\n6. Mitra Strategis\n7. Kontak Kami\n\nKetik angka atau nama topik:",
                quickReplies: initialQuickReplies
            };
        }

        let bestMatch = { score: 0, response: null as string | null, quickReplies: null as string[] | null };
        const inputWords = normalizedInput.split(' ').filter(word => word.length > 0);

        for (const entry of specificResponses) {
            let currentScore = 0;
            const entryKeywordWords = new Set<string>();

            entry.keywords.forEach(kw => {
                normalizeText(kw).split(' ').forEach(word => {
                    if (word.length > 0) {
                        entryKeywordWords.add(word);
                    }
                });
            });

            inputWords.forEach(inputWord => {
                let wordMatched = false;
                for (let keywordWord of entryKeywordWords) {
                    if (inputWord === keywordWord) {
                        currentScore += 3;
                        wordMatched = true;
                        break;
                    }
                    if (keywordWord.length > 2 && inputWord.length > 2) {
                        const dist = levenshteinDistance(inputWord, keywordWord);
                        if (dist <= 1) {
                            currentScore += 1;
                            wordMatched = true;
                            break;
                        }
                    }
                }
                if (!wordMatched) {
                    for (let keywordWord of entryKeywordWords) {
                        if (inputWord.includes(keywordWord) || keywordWord.includes(inputWord)) {
                            if (keywordWord.length > 2 && inputWord.length > 2) {
                                currentScore += 0.5;
                                break;
                            }
                        }
                    }
                }
            });

            for (const keyword of entry.keywords) {
                const normalizedKeyword = normalizeText(keyword);
                if (normalizedInput.includes(normalizedKeyword) && normalizedKeyword.split(' ').length > 1) {
                    currentScore += (normalizedKeyword.split(' ').length * 5);
                } else if (normalizedInput === normalizedKeyword) {
                    currentScore += 10;
                }
            }

            const uniqueKeywordWordsInEntry = Array.from(entryKeywordWords).filter(word => word.length > 0).length;
            const maxPossibleScoreInput = inputWords.length * 3;
            const maxPossibleScoreKeyword = uniqueKeywordWordsInEntry * 3;
            const maxTotalScore = Math.max(maxPossibleScoreInput, maxPossibleScoreKeyword, 1);

            let relevancy = maxTotalScore > 0 ? currentScore / maxTotalScore : 0;

            const MATCH_THRESHOLD = 0.20;

            if (relevancy > bestMatch.score && relevancy >= MATCH_THRESHOLD) {
                bestMatch.score = relevancy;
                bestMatch.response = entry.response;
                bestMatch.quickReplies = entry.quickReplies || [];
            }
        }
        return { response: bestMatch.response, quickReplies: bestMatch.quickReplies || [] };
    };

    const sendMessage = async () => {
        const message = userInput.trim();
        if (message === '') return;

        setMessages((prev) => [...prev, { role: "user", content: message }]);
        setUserInput('');
        setIsTyping(true);

        const normalizedMessage = normalizeText(message);

        let directQuickReplyResponse = null;
        for (const entry of specificResponses) {
            if (entry.keywords.some(kw => normalizeText(kw) === normalizedMessage)) {
                directQuickReplyResponse = {
                    response: entry.response,
                    quickReplies: entry.quickReplies || []
                };
                break;
            }
        }

        if (directQuickReplyResponse) {
            setTimeout(() => {
                setMessages((prev) => [...prev, { role: "assistant", content: directQuickReplyResponse.response! }]);
                setIsTyping(false);
            }, 300 + Math.random() * 200);
            return;
        }

        const { response: specificResponse, quickReplies: specificQuickReplies } = getBestSpecificResponse(normalizedMessage);

        if (specificResponse) {
            setTimeout(() => {
                setMessages((prev) => [...prev, { role: "assistant", content: specificResponse }]);
                setIsTyping(false);
            }, 500 + Math.random() * 500);
            return;
        }

        try {
            // Prepare conversation history for LLM, excluding system prompt for API call body
            // We pass the full messages state to the API, including the system prompt
            // The system prompt is the first element in the messages array
            const apiMessages = [...messages.filter(msg => msg.role !== "system"), { role: "user", content: message }];

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": yourSiteUrl, // Gunakan state yourSiteUrl di sini
                    "X-Title": YOUR_SITE_NAME,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": "deepseek/deepseek-chat",
                    "messages": [
                        { role: "system", content: systemPrompt }, // Sertakan system prompt di sini
                        ...apiMessages
                    ],
                    "temperature": 0.8,
                    "max_tokens": 700,
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("OpenRouter API Error Response:", errorData);
                throw new Error(`HTTP error! status: ${response.status}. Message: ${errorData.message || 'No specific error message from server.'}`);
            }

            const data = await response.json();
            let botResponseText = data.choices[0].message.content;

            let quickRepliesForBot = [];
            const lowerCaseBotResponse = botResponseText.toLowerCase();

            if (lowerCaseBotResponse.includes('donasi') || lowerCaseBotResponse.includes('sumbangan') || lowerCaseBotResponse.includes('bantuan dana')) {
                quickRepliesForBot = ["Bagaimana Cara Berdonasi?", "Cek Laporan Transparansi", "Kunjungi Website Amallan"];
            } else if (lowerCaseBotResponse.includes('program') || lowerCaseBotResponse.includes('kegiatan') || lowerCaseBotResponse.includes('layanan') || lowerCaseBotResponse.includes('digitalisasi') || lowerCaseBotResponse.includes('ekonomi') || lowerCaseBotResponse.includes('sdm')) {
                quickRepliesForBot = ["Detail Program Digitalisasi", "Tentang Pengembangan Ekonomi", "Info Pelatihan SDM"];
            } else if (lowerCaseBotResponse.includes('kontak') || lowerCaseBotResponse.includes('hubungi') || lowerCaseBotResponse.includes('alamat') || lowerCaseBotResponse.includes('telepon') || lowerCaseBotResponse.includes('email') || lowerCaseBotResponse.includes('website')) {
                quickRepliesForBot = ["Nomor WhatsApp Amallan", "Email Resmi Amallan", "Alamat Kantor"];
            } else if (lowerCaseBotResponse.includes('relawan') || lowerCaseBotResponse.includes('volunteer') || lowerCaseBotResponse.includes('sukarelawan')) {
                quickRepliesForBot = ["Cara Bergabung Relawan", "Kunjungi Website Amallan"];
            } else if (lowerCaseBotResponse.includes('mitra') || lowerCaseBotResponse.includes('kerjasama') || lowerCaseBotResponse.includes('sponsor') || lowerCaseBotResponse.includes('perusahaan')) {
                quickRepliesForBot = ["Daftar Mitra Kami", "Program CSR Kami", "Hubungi Tim Partnership"];
            } else if (lowerCaseBotResponse.includes('laporan') || lowerCaseBotResponse.includes('transparansi') || lowerCaseBotResponse.includes('akuntabilitas') || lowerCaseBotResponse.includes('penggunaan dana')) {
                quickRepliesForBot = ["Akses Laporan Keuangan", "Laporan Proyek Terbaru", "Transparansi Dana Donasi"];
            } else if (lowerCaseBotResponse.includes('pesantren') || lowerCaseBotResponse.includes('pondok') || lowerCaseBotResponse.includes('binaan')) {
                quickRepliesForBot = ["Profil Pesantren Binaan", "Dampak di Pesantren Y", "Tentang Program di Pesantren"];
            } else if (lowerCaseBotResponse.includes('visi') || lowerCaseBotResponse.includes('misi') || lowerCaseBotResponse.includes('tujuan')) {
                quickRepliesForBot = ["Detail Visi Amallan", "Misi Utama Amallan"];
            }
            else {
                quickRepliesForBot = ["Tentang Amallan", "Program & Layanan", "Cara Berdonasi", "Kontak Kami", "Apa Itu Temal?"];
            }

            if (!lowerCaseBotResponse.includes("ada lagi yang ingin ditanyakan?") && !lowerCaseBotResponse.includes("apakah ada hal lain tentang amallan yang ingin anda ketahui?")) {
                botResponseText += "\n\nAda lagi yang ingin ditanyakan?";
            }

            setTimeout(() => {
                setMessages((prev) => [...prev, { role: "assistant", content: botResponseText, quickReplies: quickRepliesForBot as any }]); // Tambahkan quickReplies ke state pesan
                setIsTyping(false);
            }, 800 + Math.random() * 800);

        } catch (error) {
            console.error('Error communicating with OpenRouter (DeepSeek):', error);
            setMessages((prev) => [...prev, { role: "assistant", content: 'Maaf, saya belum memiliki informasi spesifik untuk pertanyaan Anda saat ini, atau ada kendala teknis saat menghubungi layanan AI. Silakan coba tanyakan kembali dengan cara berbeda atau pilih dari opsi di bawah ini:', quickReplies: ["Tentang Amallan", "Program & Layanan", "Kontak Kami", "Kunjungi Website Amallan"] }]);
            setIsTyping(false);
        }
    };

    const clearChat = () => {
        initializeChat();
    };

    const handleQuickReplyClick = (reply: string) => {
        setUserInput(reply);
        sendMessage();
    };

    return (
        <>
            <button className="chatbot-fab" onClick={() => setIsChatbotOpen(true)}>
                <i className="fas fa-robot"></i> <span className="fab-text">Chat dengan Temal</span>
            </button>

            {isChatbotOpen && (
                <div className="chatbot-modal" onClick={(e) => {
                    // Hanya tutup modal jika yang diklik adalah overlay, bukan konten modal
                    if (e.target === e.currentTarget) {
                        setIsChatbotOpen(false);
                    }
                }}>
                    <div className="chatbot-modal-content">
                        <button className="chatbot-close-button" onClick={() => setIsChatbotOpen(false)}>&times;</button>
                        <div className="header">
                            <Image src="/asset/Salinan dari Salinan dari Tambahkan judul (2).png" alt="Logo Amallan" width={30} height={30} className="logo" />
                            <h1>Chat Temal</h1>
                            <button className="clear-chat-button" onClick={clearChat}>Bersihkan Chat</button>
                        </div>

                        <div className="chat-container" ref={chatContainerRef}>
                            {messages.filter(msg => msg.role !== "system").map((msg, index) => (
                                <div key={index} className={`message-wrapper ${msg.role === 'user' ? '' : 'bot-message-wrapper-outer'}`}>
                                    {msg.role === 'assistant' && (
                                        <Image src="/asset/maskot_amallan.png" alt="Maskot Amallan" width={40} height={40} className="mascot-icon" />
                                    )}
                                    <div className={`message ${msg.role}-message`} dangerouslySetInnerHTML={{ __html: formatMarkdownToHtml(msg.content) }} />
                                    <div className="timestamp">{getCurrentTime()}</div>
                                    {/* Quick replies hanya ditampilkan untuk pesan bot terakhir dan jika ada */}
                                    {msg.role === 'assistant' && index === messages.length - 1 && (msg as any).quickReplies && (msg as any).quickReplies.length > 0 && (
                                        <div className="quick-replies">
                                            {(msg as any).quickReplies.map((reply: string, qrIndex: number) => (
                                                <div key={qrIndex} className="quick-reply" onClick={() => handleQuickReplyClick(reply)}>
                                                    {reply}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="typing-indicator-wrapper">
                                    <Image src="/asset/maskot_amallan.png" alt="Maskot Amallan" width={40} height={40} className="mascot-icon" />
                                    <div className="typing-indicator">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="input-container">
                            <input
                                type="text"
                                id="user-input"
                                placeholder="Tanyakan tentang Amallan..."
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
                                ref={inputRef}
                            />
                            <button id="send-button" onClick={sendMessage}>Kirim</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;