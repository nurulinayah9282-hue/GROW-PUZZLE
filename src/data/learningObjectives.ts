export interface LearningObjective {
  id: number;
  icon: string;
  badge: string;
  title: string;
  childFriendlyText: string;
  criteria: string[];
  growthMindsetTip: string;
}

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 1,
    icon: '🗺️',
    badge: 'Tujuan 1',
    title: 'Pengertian & Manfaat Peta',
    childFriendlyText: 'Aku mampu menjelaskan pengertian peta dan menyebutkan manfaat peta bagi kehidupanku sehari-hari dengan kata-kataku sendiri.',
    criteria: [
      'Menyebutkan bahwa peta adalah gambar bumi/wilayah pada bidang datar yang diperkecil dengan skala.',
      'Menjelaskan manfaat peta agar tidak tersesat saat menuju tempat baru.',
      'Menyebutkan contoh peta di lingkungan tempat tinggal atau sekolah.',
    ],
    growthMindsetTip: 'Gunakan bahasamu sendiri! Tidak perlu menghafal kata per kata, yang penting kamu paham intinya.',
  },
  {
    id: 2,
    icon: '🧩',
    badge: 'Tujuan 2',
    title: 'Mengidentifikasi Komponen Peta',
    childFriendlyText: 'Aku dapat menemukan dan menyebutkan bagian-bagian penting pada peta seperti judul, simbol, legenda, skala, dan arah mata angin.',
    criteria: [
      'Menemukan judul peta dan menjelaskan fungsinya.',
      'Mengenal arah mata angin (Utara, Timur, Selatan, Barat).',
      'Membaca keterangan pada kotak legenda.',
      'Membedakan simbol titik, garis, dan area.',
    ],
    growthMindsetTip: 'Seperti detektif, perhatikan detail kecil pada peta untuk menemukan informasi rahasia!',
  },
  {
    id: 3,
    icon: '📍',
    badge: 'Tujuan 3',
    title: 'Membaca Peta & Menemukan Lokasi',
    childFriendlyText: 'Aku bisa membaca peta sederhana dan menentukan posisi tempat seperti sekolah, rumah, puskesmas, dan jalan dengan tepat.',
    criteria: [
      'Menentukan arah suatu tempat dari titik acuan (misal: sekolah ada di sebelah utara balai desa).',
      'Menelusuri rute jalan yang aman dan terdekat.',
      'Menghubungkan simbol pada peta dengan bangunan aslinya di lapangan.',
    ],
    growthMindsetTip: 'Jika pertama kali salah arah, tenang! Cek kembali arah mata angin dan coba lagi.',
  },
  {
    id: 4,
    icon: '🗣️',
    badge: 'Tujuan 4',
    title: 'Menyampaikan Informasi Peta',
    childFriendlyText: 'Aku percaya diri menceritakan atau menuliskan petunjuk arah dan informasi yang kutemukan pada peta kepada teman dan guru.',
    criteria: [
      'Menceritakan rute perjalanan dari rumah ke sekolah.',
      'Menjelaskan arti warna pada peta (hijau untuk dataran rendah, biru untuk perairan).',
      'Bekerja sama dan saling menghargai saat berdiskusi peta.',
    ],
    growthMindsetTip: 'Setiap penjelasanmu sangat berharga! Berani berbicara dan berbagi adalah langkah menjadi petualang hebat.',
  },
];
