export interface BibliographyBook {
  id: string;
  category: 'buku_siswa' | 'panduan_guru' | 'kurikulum';
  title: string;
  authors: string[];
  reviewers?: string[];
  edition: string;
  publisher: string;
  institution: string;
  year: number;
  isbn?: string;
  repositoryUrl: string;
  apaCitation: string;
  usedChapters: string;
  utilizationInApp: string;
}

export interface BibliographyVideo {
  id: string;
  title: string;
  channelName: string;
  channelUrl: string;
  platform: 'YouTube';
  publishDate: string; // e.g. "25 September 2026"
  videoId: string;
  url: string;
  apaCitation: string;
  utilizationInApp: string;
}

export interface GeoStandardReference {
  id: string;
  name: string;
  institution: string;
  url: string;
  status: 'Rujukan Konseptual Kartografi' | 'Tidak Digunakan (Catatan Transparansi)';
  description: string;
  attributionNote: string;
}

export interface MediaCreditItem {
  id: string;
  name: string;
  type: 'Ilustrasi Peta' | 'Infografik Materi' | 'Gambar Latar' | 'Ikon Antarmuka' | 'Tipografi' | 'Audio & SFX';
  sourceStatus: 'Dibuat untuk GROW PUZZLE DIGITAL' | 'Lisensi Terbuka (Open Source / MIT / OFL)' | 'Aset Pengembang';
  creatorOrLicense: string;
  fileOrUrl: string;
  description: string;
}

export const MAIN_BOOKS_BIBLIOGRAPHY: BibliographyBook[] = [
  {
    id: 'buku-siswa-ipas-4-revisi',
    category: 'buku_siswa',
    title: 'Ilmu Pengetahuan Alam dan Sosial untuk SD/MI Kelas IV (Edisi Revisi)',
    authors: [
      'Amalia Fitri',
      'Aldilla Kusumawardhani',
      'Kristianti Fatimah',
      'Nur Ilmi Setianingsih',
      'Kinkin Karimah Nursya’bani',
      'Anggayudha Ananda Rasa',
    ],
    reviewers: ['Fitriawati Gojali', 'Petrus Tumijan'],
    edition: 'Edisi Revisi 2023',
    publisher: 'Pusat Perbukuan, Badan Standar, Kurikulum, dan Asesmen Pendidikan',
    institution: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
    year: 2023,
    isbn: '978-623-118-445-0 (Jilid 4 PDF)',
    repositoryUrl: 'https://repositori.kemendikdasmen.go.id/35919/',
    apaCitation:
      'Fitri, A., Kusumawardhani, A., Fatimah, K., Setianingsih, N. I., Nursya’bani, K. K., & Rasa, A. A. (2023). Ilmu Pengetahuan Alam dan Sosial untuk SD/MI Kelas IV (Edisi Revisi). Pusat Perbukuan, Badan Standar, Kurikulum, dan Asesmen Pendidikan, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. https://repositori.kemendikdasmen.go.id/35919/',
    usedChapters: 'Bab 3 “Di Sini Tempat Tinggalku”, Topik A “Mengenal Peta” (Halaman 55–74).',
    utilizationInApp:
      'Sumber materi esensial mengenai pengertian peta, fungsi peta dalam kehidupan sehari-hari, 8 komponen peta (judul, skala grafis/angka, 8 arah mata angin, simbol titik/garis/area, legenda keterangan, garis astronomis/tepi, dan tata warna), serta 25 soal evaluasi petualangan.',
  },
  {
    id: 'panduan-guru-ipas-4-revisi',
    category: 'panduan_guru',
    title: 'Panduan Guru Ilmu Pengetahuan Alam dan Sosial untuk SD/MI Kelas IV (Edisi Revisi)',
    authors: [
      'Amalia Fitri',
      'Aldilla Kusumawardhani',
      'Kristianti Fatimah',
      'Nur Ilmi Setianingsih',
      'Kinkin Karimah Nursya’bani',
      'Anggayudha Ananda Rasa',
    ],
    edition: 'Edisi Revisi 2023',
    publisher: 'Pusat Perbukuan, Badan Standar, Kurikulum, dan Asesmen Pendidikan',
    institution: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
    year: 2023,
    repositoryUrl: 'https://repositori.kemendikdasmen.go.id/35914/',
    apaCitation:
      'Fitri, A., Kusumawardhani, A., Fatimah, K., Setianingsih, N. I., Nursya’bani, K. K., & Rasa, A. A. (2023). Panduan Guru Ilmu Pengetahuan Alam dan Sosial untuk SD/MI Kelas IV (Edisi Revisi). Pusat Perbukuan, Badan Standar, Kurikulum, dan Asesmen Pendidikan, Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi. https://repositori.kemendikdasmen.go.id/35914/',
    usedChapters: 'Panduan Pembelajaran Bab 3 Topik A Mengenal Peta — Fase B Kelas IV SD.',
    utilizationInApp:
      'Sumber perumusan 4 Tujuan Pembelajaran, Pertanyaan Pemantik berbasis inkuiri, rubrik penilaian formatif guru (Dashboard Guru Kelas IV B), serta strategi pembelajaran kolaboratif pada Battle of Map Explorers.',
  },
];

export const VIDEO_BIBLIOGRAPHY: BibliographyVideo[] = [
  {
    id: 'youtube-video-ipas-4',
    title: 'Rangkuman Materi IPAS Kelas IV BAB 3. Topik A Mengenal Peta',
    channelName: 'Pijar Nusa Edu',
    channelUrl: 'https://www.youtube.com/@PijarNusaEdu',
    platform: 'YouTube',
    publishDate: '25 September 2026',
    videoId: 'XdEhLNBmRLE',
    url: 'https://www.youtube.com/watch?v=XdEhLNBmRLE',
    apaCitation:
      'Pijar Nusa Edu. (2026, 25 September). Rangkuman Materi IPAS Kelas IV BAB 3. Topik A Mengenal Peta [Video]. YouTube. https://www.youtube.com/watch?v=XdEhLNBmRLE',
    utilizationInApp:
      'Diputar secara terintegrasi pada menu Jelajah Materi > Mode Video dalam pemutar responsif 16:9, disertai instruksi fokus sebelum menonton, 3 pertanyaan pemahaman konsep, dan umpan balik reflektif dengan pendekatan growth mindset.',
  },
];

export const GEO_AND_MAP_REFERENCES: GeoStandardReference[] = [
  {
    id: 'big-indonesia',
    name: 'Badan Informasi Geospasial (BIG) Republik Indonesia',
    institution: 'Lembaga Pemerintah Nonkementerian (LPNK) Bidang Informasi Geospasial',
    url: 'https://www.big.go.id/',
    status: 'Rujukan Konseptual Kartografi',
    description:
      'Rujukan konseptual untuk standarisasi kaidah kartografi dasar di Indonesia, panduan orientasi 8 arah mata angin (Utara, Timur Laut, Timur, Tenggara, Selatan, Barat Daya, Barat, Barat Laut), serta klasifikasi simbol rupabumi (simbol titik untuk fasilitas, garis untuk jalan/sungai, dan area untuk danau/hutan/sawah) sesuai Undang-Undang No. 4 Tahun 2011 tentang Informasi Geospasial.',
    attributionNote:
      'Peta interaktif di dalam game adalah ilustrasi kartun tematik buatan pengembang yang mengadopsi prinsip kartografi dasar nasional BIG.',
  },
  {
    id: 'openstreetmap-googlemaps-status',
    name: 'OpenStreetMap & Google Maps Platform',
    institution: 'OpenStreetMap Foundation & Google LLC',
    url: 'https://www.openstreetmap.org/',
    status: 'Tidak Digunakan (Catatan Transparansi)',
    description:
      'Transparansi data: Aplikasi GROW PUZZLE DIGITAL tidak mengunduh data ubin peta (map tiles), data vektor spasial live, maupun API komersial dari OpenStreetMap atau Google Maps. Seluruh tampilan peta permainan nomor 1-25 dan peta desa dibuat murni menggunakan grafis vektor SVG/Canvas terprogram.',
    attributionNote:
      'Dicantumkan sebagai catatan transparansi sumber agar tidak terjadi kesalahpahaman klaim penggunaan data geospasial pihak ketiga.',
  },
];

export const MEDIA_CREDITS: MediaCreditItem[] = [
  {
    id: 'media-game-map',
    name: 'Peta Petualangan 3D 25 Pos & Peta Desa Suka Maju',
    type: 'Ilustrasi Peta',
    sourceStatus: 'Dibuat untuk GROW PUZZLE DIGITAL',
    creatorOrLicense: 'Tim Pengembang GROW PUZZLE DIGITAL',
    fileOrUrl: 'src/components/MapIllustration.tsx & ReferenceVillageMap.tsx',
    description:
      'Karya ilustrasi digital vektor isometrik 3D yang menggambarkan lingkungan desa belajar (sekolah, pos ronda, balai desa, sawah terasering, perbukitan, sungai biru, dan jembatan kayu) dengan 25 pos petualangan terintegrasi.',
  },
  {
    id: 'media-infographic-1',
    name: 'Infografik Ceria Mengenal Peta',
    type: 'Infografik Materi',
    sourceStatus: 'Dibuat untuk GROW PUZZLE DIGITAL',
    creatorOrLicense: 'Aset Edukasi GROW PUZZLE DIGITAL',
    fileOrUrl: 'public/assets/aistudio/Infografik_Ceria_Mengenal_Peta_1d186f6b.png',
    description:
      'Poster visual edukasi beresolusi tinggi dengan tipografi ramah anak untuk menjelaskan konsep permukaan bumi yang diperkecil pada bidang datar.',
  },
  {
    id: 'media-infographic-2',
    name: 'Infografik Komponen-Komponen Peta',
    type: 'Infografik Materi',
    sourceStatus: 'Dibuat untuk GROW PUZZLE DIGITAL',
    creatorOrLicense: 'Aset Edukasi GROW PUZZLE DIGITAL',
    fileOrUrl: 'public/assets/aistudio/Infografik_Komponen-Komponen_Peta_07097929.png',
    description:
      'Poster visual edukasi yang menguraikan 8 komponen peta (judul, skala, arah mata angin, legenda, simbol, garis tepi, garis astronomis, tata warna).',
  },
  {
    id: 'media-infographic-3',
    name: 'Poster Edukasi Arah, Simbol, dan Peta',
    type: 'Infografik Materi',
    sourceStatus: 'Dibuat untuk GROW PUZZLE DIGITAL',
    creatorOrLicense: 'Aset Edukasi GROW PUZZLE DIGITAL',
    fileOrUrl: 'public/assets/aistudio/Poster_Edukasi_Arah__Simbol__dan_Peta_8685a039.png',
    description:
      'Poster visual komparatif yang merangkum 8 arah mata angin dengan kompas ilustratif dan simbol-simbol peta tematik.',
  },
  {
    id: 'media-background-app',
    name: 'Latar Belakang Ilustrasi Petualangan (Main Background)',
    type: 'Gambar Latar',
    sourceStatus: 'Aset Pengembang',
    creatorOrLicense: 'Dibuat untuk GROW PUZZLE DIGITAL',
    fileOrUrl: 'public/images/background-petualangan.png',
    description:
      'Ilustrasi lanskap perbukitan hijau, langit cerah, pepohonan, dan sungai biru yang diterapkan secara fixed sebagai latar belakang visual konsisten pada seluruh halaman aplikasi.',
  },
  {
    id: 'media-lucide-icons',
    name: 'Lucide React Icons',
    type: 'Ikon Antarmuka',
    sourceStatus: 'Lisensi Terbuka (Open Source / MIT / OFL)',
    creatorOrLicense: 'Lucide Contributors (MIT License)',
    fileOrUrl: 'https://lucide.dev',
    description:
      'Set ikon open-source modern untuk kompas, buku, penghargaan, tombol pemutar audio, navigasi, dan tanda pencapaian.',
  },
  {
    id: 'media-typography-fonts',
    name: 'Font Fredoka & Nunito (Google Fonts)',
    type: 'Tipografi',
    sourceStatus: 'Lisensi Terbuka (Open Source / MIT / OFL)',
    creatorOrLicense: 'Hafiz Ismail & Vernon Adams (SIL Open Font License 1.1)',
    fileOrUrl: 'https://fonts.google.com/',
    description:
      'Kombinasi font ramah anak dengan sudut melengkung untuk judul (Fredoka) dan keterbacaan teks edukasi yang tinggi (Nunito).',
  },
  {
    id: 'media-audio-tts',
    name: 'Web Audio API Synth & Web Speech Synthesis API',
    type: 'Audio & SFX',
    sourceStatus: 'Dibuat untuk GROW PUZZLE DIGITAL',
    creatorOrLicense: 'Sintesis Audio Prosedural Pengembang',
    fileOrUrl: 'src/utils/audio.ts',
    description:
      'Efek suara gamifikasi (klik, lempar dadu, jawaban benar, jawaban salah, kepingan puzzle, perayaan juara) yang di-generate langsung secara prosedural tanpa file audio pihak ketiga berhak cipta, dipadukan fitur narasi suara bahasa Indonesia ramah anak.',
  },
];
