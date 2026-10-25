export interface InquiryQuestion {
  id: string;
  isMain?: boolean;
  question: string;
  context: string;
  icon: string;
  suggestedAnswers: {
    id: string;
    text: string;
    growthFeedback: string;
  }[];
  placeholder: string;
  reflectiveInsight: string;
}

export const INQUIRY_QUESTIONS: InquiryQuestion[] = [
  {
    id: 'main_q',
    isMain: true,
    icon: '🧭',
    question: 'Bayangkan kamu ingin pergi ke tempat yang belum pernah kamu kunjungi. Bagaimana caramu agar tidak tersesat?',
    context: 'Pertanyaan Pemantik Utama: Mengawali Petualangan Menjelajah Peta',
    suggestedAnswers: [
      {
        id: 'opt1',
        text: 'Membuka peta lingkungan atau peta digital (seperti Google Maps) di ponsel bersama orang tua.',
        growthFeedback: 'Hebat sekali! Membuka peta adalah langkah cerdas seorang navigator agar tahu arah dan posisi sejak awal.',
      },
      {
        id: 'opt2',
        text: 'Bertanya arah jalan kepada orang yang ada di sekitar atau petugas keamanan di jalan.',
        growthFeedback: 'Bagus! Bertanya adalah sikap berani dan bijak. Pepatah mengatakan: "Malu bertanya, sesat di jalan!"',
      },
      {
        id: 'opt3',
        text: 'Memperhatikan papan petunjuk jalan dan patokan bangunan penting seperti masjid atau sekolah.',
        growthFeedback: 'Pengamatan yang tajam! Memperhatikan patokan bangunan sama seperti membaca simbol pada peta nyata.',
      },
      {
        id: 'opt4',
        text: 'Mencatat rute dan nama jalan sebelum berangkat agar tidak lupa.',
        growthFeedback: 'Persiapan yang sangat matang! Petualang hebat selalu menyiapkan bekal informasi sebelum melangkah.',
      },
    ],
    placeholder: 'Tuliskan idemu sendiri di sini... (Contoh: Aku akan melihat peta desa dan mencari tanda arah jalan)',
    reflectiveInsight: 'Tidak ada jawaban yang salah! Setiap caramu menunjukkan rasa ingin tahu dan keinginan untuk belajar mengenali lingkungan sekitar.',
  },
  {
    id: 'sub_q1',
    icon: '🗺️',
    question: 'Apa yang kamu ketahui tentang peta?',
    context: 'Pertanyaan Pendukung 1',
    suggestedAnswers: [
      {
        id: 'q1_a',
        text: 'Peta adalah gambar bumi atau wilayah yang digambar di atas kertas dengan ukuran kecil.',
        growthFeedback: 'Keren! Kamu sudah memahami konsep dasar bahwa peta adalah gambar wilayah yang diperkecil.',
      },
      {
        id: 'q1_b',
        text: 'Peta adalah alat penunjuk jalan agar kita tahu letak kota, desa, sungai, dan gunung.',
        growthFeedback: 'Tepat sekali! Peta memang berfungsi sebagai petunjuk jalan dan penjelas kenampakan alam.',
      },
      {
        id: 'q1_c',
        text: 'Aku pernah melihat peta Indonesia yang banyak pulau-pulaunya di dinding kelas.',
        growthFeedback: 'Pengalaman visual yang bagus! Itu adalah contoh peta wilayah negara kita yang sangat luas.',
      },
    ],
    placeholder: 'Ceritakan apa yang terlintas di pikiranmu saat mendengar kata "peta"...',
    reflectiveInsight: 'Peta adalah jendela dunia. Melalui selembar peta, kita bisa melihat seluruh dunia dari dekat!',
  },
  {
    id: 'sub_q2',
    icon: '📋',
    question: 'Informasi apa saja yang bisa kita temukan dari sebuah peta?',
    context: 'Pertanyaan Pendukung 2',
    suggestedAnswers: [
      {
        id: 'q2_a',
        text: 'Nama jalan, nama tempat (sekolah, rumah sakit, pasar), dan batas wilayah.',
        growthFeedback: 'Luar biasa! Itu adalah informasi buatan manusia yang sangat penting untuk kegiatan kita sehari-hari.',
      },
      {
        id: 'q2_b',
        text: 'Arah mata angin (ke mana arah utara, selatan, timur, dan barat).',
        growthFeedback: 'Tepat sekali! Petunjuk arah kompas adalah informasi pokok navigator.',
      },
      {
        id: 'q2_c',
        text: 'Kenampakan alam seperti sungai, danau, bukit, dan lautan.',
        growthFeedback: 'Bagus sekali! Warna dan simbol pada peta memberitahukan bentuk alam di sekitar kita.',
      },
    ],
    placeholder: 'Sebutkan informasi apa saja yang menurutmu bisa kamu temukan...',
    reflectiveInsight: 'Semakin teliti kita membaca peta, semakin banyak rahasia menarik yang bisa kita temukan.',
  },
  {
    id: 'sub_q3',
    icon: '🎨',
    question: 'Mengapa peta menggunakan simbol dan warna yang berbeda-beda?',
    context: 'Pertanyaan Pendukung 3',
    suggestedAnswers: [
      {
        id: 'q3_a',
        text: 'Agar peta tidak penuh dengan tulisan panjang sehingga mudah dan cepat dipahami.',
        growthFeedback: 'Pikiran yang sangat cerdas! Simbol dipakai untuk meringkas tulisan agar pembaca tidak bingung.',
      },
      {
        id: 'q3_b',
        text: 'Warna membantu membedakan perairan (biru), dataran rendah (hijau), dan pegunungan (cokelat).',
        growthFeedback: 'Hebat! Kartografer (pembuat peta) memang memakai warna standar agar mudah dikenali di seluruh dunia.',
      },
      {
        id: 'q3_c',
        text: 'Supaya peta terlihat lebih menarik dan menyenangkan untuk dipelajari anak-anak.',
        growthFeedback: 'Benar sekali! Keindahan visual membuat kita lebih bersemangat mempelajari letak tempat tinggal kita.',
      },
    ],
    placeholder: 'Menurutmu, apa alasannya simbol dan warna dibuat bermacam-macam?',
    reflectiveInsight: 'Simbol adalah bahasa gambar universal. Tanpa perlu banyak kata, simbol berbicara langsung kepada pembaca peta.',
  },
  {
    id: 'sub_q4',
    icon: '🏫',
    question: 'Bagaimana cara menemukan lokasi sekolahmu pada sebuah peta desa atau kota?',
    context: 'Pertanyaan Pendukung 4',
    suggestedAnswers: [
      {
        id: 'q4_a',
        text: 'Mencari simbol gedung sekolah atau huruf "SD" di legenda peta.',
        growthFeedback: 'Tepat sasaran! Membaca legenda terlebih dahulu adalah trik tercepat detektif peta.',
      },
      {
        id: 'q4_b',
        text: 'Melihat nama jalan tempat sekolah berada, lalu menelusuri jalurnya.',
        growthFeedback: 'Strategi yang sangat bagus! Menelusuri nama jalan adalah cara praktis navigasi di dunia nyata.',
      },
      {
        id: 'q4_c',
        text: 'Mencari patokan terdekat, misalnya lapangan sepak bola atau balai desa.',
        growthFeedback: 'Hebat! Menggunakan patokan sekitar membantu mempersempit pencarian lokasi.',
      },
    ],
    placeholder: 'Bagaimana langkahmu jika ingin menunjukkan lokasi sekolah kepada teman baru?',
    reflectiveInsight: 'Setiap tempat penting memiliki tanda pengenal di peta. Kita hanya perlu teliti mencari kuncinya di legenda!',
  },
  {
    id: 'sub_q5',
    icon: '📱',
    question: 'Apa perbedaan antara peta cetak di atlas/kertas dengan peta digital di ponsel?',
    context: 'Pertanyaan Pendukung 5',
    suggestedAnswers: [
      {
        id: 'q5_a',
        text: 'Peta digital bisa diperbesar (zoom in) dan menunjukkan lokasi kita secara langsung (GPS).',
        growthFeedback: 'Luar biasa! Peta digital interaktif dan dinamis mengikuti posisi satelit.',
      },
      {
        id: 'q5_b',
        text: 'Peta kertas tidak membutuhkan baterai atau internet, bisa dibuka kapan saja di dalam kelas.',
        growthFeedback: 'Analisis yang sangat bijak! Peta kertas sangat andal karena tidak pernah kehabisan baterai.',
      },
      {
        id: 'q5_c',
        text: 'Keduanya sama-sama berguna untuk menunjukkan letak tempat tinggal kita.',
        growthFeedback: 'Kesimpulan yang sangat dewasa! Baik cetak maupun digital, keduanya adalah sahabat setia petualang.',
      },
    ],
    placeholder: 'Tuliskan perbedaan yang kamu rasakan saat melihat peta kertas vs peta di HP...',
    reflectiveInsight: 'Teknologi terus berkembang! Belajar membaca peta kertas melatih logika berpikir kita, dan peta digital membantu kepraktisan kita.',
  },
];
