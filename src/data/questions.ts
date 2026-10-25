import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // =========================================================================
  // --- ZONA 1: BERANI MENCOBA (Tantangan 1 - 6) ---
  // =========================================================================
  {
    id: 1,
    zone: 1,
    zoneName: 'Zona 1 — Berani Mencoba',
    topic: 'Membaca peta berpetak',
    hasStimulusImage: true,
    text: 'Pada peta berpetak, setiap kotak mewakili jarak 1 km. Balai desa berada di titik (2,2), kantor pos di (2,5), taman di (6,5), dan museum di (6,2). Siswa berjalan dari balai desa ke kantor pos, lalu ke taman. Berapa jarak yang ditempuh?',
    options: [
      '5 km',
      '6 km',
      '7 km',
      '9 km',
    ],
    correctIndex: 2, // C. 7 km
    hint: 'Hitung jumlah kotak perpindahan pada sumbu tegak (y) dan sumbu mendatar (x). Setiap kotak bernilai 1 km.',
    guidingFeedback: 'Belum tepat. Coba periksa kembali titik koordinat Balai Desa (2,2) ke Kantor Pos (2,5), lalu dari Kantor Pos ke Taman (6,5) pada peta berpetak. Hitung berapa kotak yang dilalui pada setiap tahap perjalanan.',
    explanation: 'Balai desa ke kantor pos = 3 km (dari y=2 ke y=5, selisih 3 kotak = 3 km). Kantor pos ke taman = 4 km (dari x=2 ke x=6, selisih 4 kotak = 4 km). Total jarak yang ditempuh = 3 km + 4 km = 7 km.',
  },
  {
    id: 2,
    zone: 1,
    zoneName: 'Zona 1 — Berani Mencoba',
    topic: 'Menentukan arah relatif',
    hasStimulusImage: true,
    text: 'Pada peta dengan utara di bagian atas, lapangan berada di sebelah barat pasar. Puskesmas berada di sebelah selatan lapangan. Di manakah letak puskesmas jika dibandingkan dengan pasar?',
    options: [
      'Timur laut',
      'Tenggara',
      'Barat daya',
      'Barat laut',
    ],
    correctIndex: 2, // C. Barat daya
    hint: 'Gunakan arah mata angin dengan acuan Pasar. Tentukan arah ke Barat menuju lapangan, lalu ke Selatan menuju puskesmas.',
    guidingFeedback: 'Belum tepat. Perhatikan posisi Pasar sebagai titik acuan awal pada gambar. Dari Pasar, bergeraklah ke Barat menuju Lapangan, lalu ke Selatan menuju Puskesmas. Pikirkan arah mata angin antara Barat dan Selatan.',
    explanation: 'Dari pasar, bergerak ke barat menuju lapangan, kemudian ke selatan menuju puskesmas. Arah gabungan antara barat dan selatan adalah barat daya. Jadi, puskesmas terletak di sebelah barat daya dari pasar.',
  },
  {
    id: 3,
    zone: 1,
    zoneName: 'Zona 1 — Berani Mencoba',
    topic: 'Menentukan posisi dari beberapa petunjuk',
    hasStimulusImage: true,
    text: 'Pada peta, rumah Siti berada di sebelah timur sekolah. Perpustakaan berada di sebelah utara rumah Siti. Jika utara berada di bagian atas peta, perpustakaan terletak ke arah mana dari sekolah?',
    options: [
      'Barat laut',
      'Timur laut',
      'Tenggara',
      'Barat daya',
    ],
    correctIndex: 1, // B. Timur laut
    hint: 'Tentukan arah dari Sekolah ke Rumah Siti (Timur), lalu lanjutkan dari Rumah Siti ke Perpustakaan (Utara).',
    guidingFeedback: 'Belum tepat. Perhatikan posisi Sekolah sebagai titik acuan. Dari Sekolah ke Rumah Siti mengarah ke Timur, lalu ke Perpustakaan mengarah ke Utara. Gabungkan kedua arah tersebut sesuai kompas arah mata angin.',
    explanation: 'Dari sekolah ke rumah Siti arahnya ke timur. Dari rumah Siti ke perpustakaan arahnya ke utara. Gabungan arah timur dan utara adalah timur laut. Jadi, perpustakaan berada di timur laut sekolah.',
  },
  {
    id: 4,
    zone: 1,
    zoneName: 'Zona 1 — Berani Mencoba',
    topic: 'Mengidentifikasi rute berdasarkan petunjuk',
    hasStimulusImage: true,
    text: 'Pada peta, sekolah berada di tengah wilayah. Pasar terletak di sebelah timur sekolah, rumah sakit di sebelah utara pasar, dan terminal di sebelah barat rumah sakit. Jika seseorang bergerak dari sekolah ke rumah sakit melalui pasar, urutan arah yang tepat adalah …',
    options: [
      'Utara, lalu timur',
      'Timur, lalu utara',
      'Barat, lalu utara',
      'Timur, lalu selatan',
    ],
    correctIndex: 1, // B. Timur, lalu utara
    hint: 'Perhatikan urutan persinggahannya secara bertahap: pertama dari Sekolah ke Pasar, kemudian dari Pasar ke Rumah Sakit.',
    guidingFeedback: 'Belum tepat. Telusuri peta mulai dari Sekolah. Perhatikan ke arah mana kamu harus melangkah untuk sampai ke Pasar terlebih dahulu, kemudian tentukan arah berikutnya untuk mencapai Rumah Sakit.',
    explanation: 'Dari sekolah, orang tersebut bergerak ke timur menuju pasar. Setelah tiba di pasar, ia bergerak ke utara menuju rumah sakit. Jadi, urutan arah yang tepat adalah Timur, lalu utara.',
  },
  {
    id: 5,
    zone: 1,
    zoneName: 'Zona 1 — Berani Mencoba',
    topic: 'Mengevaluasi arah pada peta',
    hasStimulusImage: false,
    text: 'Doni mengatakan bahwa suatu tempat yang terletak di sebelah kiri sekolah pasti berada di sebelah barat sekolah. Pernyataan Doni tepat apabila …',
    options: [
      'Peta tidak memiliki judul',
      'Peta menggunakan warna yang berbeda',
      'Peta menampilkan banyak bangunan',
      'Peta berorientasi utara di bagian atas',
    ],
    correctIndex: 3, // D. Peta berorientasi utara di bagian atas
    hint: 'Pikirkan syarat penunjuk arah standar pada peta agar sisi kiri selalu mewakili arah barat.',
    guidingFeedback: 'Belum tepat. Arah pada bidang kertas bergantung pada orientasi penunjuk arah (kompas). Pikirkan kondisi arah mana yang harus diletakkan di bagian atas lembar peta agar sisi kiri menjadi arah barat.',
    explanation: 'Jika utara berada di bagian atas, barat berada di sebelah kiri peta. Karena itu, pernyataan Doni tepat dalam kondisi tersebut. Jika orientasi utara berubah, arah sisi kiri peta juga akan berbeda.',
  },
  {
    id: 6,
    zone: 1,
    zoneName: 'Zona 1 — Berani Mencoba',
    topic: 'Menghitung jarak sebenarnya',
    hasStimulusImage: true,
    text: 'Peta berskala 1 : 200.000. Jarak rumah ke waduk pada peta adalah 3 cm. Berapa jarak sebenarnya?',
    options: [
      '600 m',
      '3 km',
      '6 km',
      '60 km',
    ],
    correctIndex: 2, // C. 6 km
    hint: 'Gunakan perbandingan skala: 1 cm pada peta mewakili 200.000 cm pada jarak sebenarnya.',
    guidingFeedback: 'Belum tepat. Perhatikan angka skala 1 : 200.000 pada gambar. Kalikan jarak pada peta (3 cm) dengan nilai skala (200.000 cm), lalu ubah hasilnya dari satuan sentimeter ke kilometer.',
    explanation: 'Skala 1 : 200.000 berarti 1 cm pada peta mewakili 200.000 cm sebenarnya.\nLangkah perhitungan:\n1. 200.000 cm = 2.000 m = 2 km.\n2. Jarak sebenarnya = 3 cm × 2 km = 6 km.',
  },

  // =========================================================================
  // --- ZONA 2: PANTANG MENYERAH (Tantangan 7 - 13) ---
  // =========================================================================
  {
    id: 7,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Menghitung jarak perjalanan',
    hasStimulusImage: true,
    text: 'Pada peta berskala 1 : 200.000, jarak rumah ke waduk adalah 3 cm dan jarak waduk ke tempat perkemahan adalah 2,5 cm. Jika perjalanan mengikuti kedua ruas tersebut, berapa jarak seluruh perjalanan sebenarnya?',
    options: [
      '5 km',
      '8 km',
      '11 km',
      '110 km',
    ],
    correctIndex: 2, // C. 11 km
    hint: 'Jumlahkan terlebih dahulu seluruh jarak pada peta, kemudian kalikan dengan skala sebenarnya.',
    guidingFeedback: 'Belum tepat. Amati kedua ruas perjalanan pada gambar: ruas pertama 3 cm dan ruas kedua 2,5 cm. Jumlahkan keduanya, lalu gunakan skala 1 : 200.000 (1 cm mewakili 2 km) untuk mencari jarak total sebenarnya.',
    explanation: 'Langkah perhitungan:\n1. Total jarak pada peta = 3 cm + 2,5 cm = 5,5 cm.\n2. Setiap 1 cm mewakili 200.000 cm = 2 km sebenarnya.\n3. Jarak sebenarnya = 5,5 × 2 km = 11 km.',
  },
  {
    id: 8,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Menentukan skala dari informasi jarak',
    hasStimulusImage: true,
    text: 'Jarak sebenarnya antara dua kecamatan adalah 15 km. Pada peta, jaraknya 5 cm. Skala peta tersebut adalah …',
    options: [
      '1 : 30.000',
      '1 : 150.000',
      '1 : 300.000',
      '1 : 3.000.000',
    ],
    correctIndex: 2, // C. 1 : 300.000
    hint: 'Samakan satuan jarak sebenarnya ke sentimeter (cm), kemudian bandingkan dengan jarak pada peta.',
    guidingFeedback: 'Belum tepat. Samakan satuannya terlebih dahulu. Ingat bahwa 1 km = 100.000 cm, sehingga 15 km diubah menjadi cm terlebih dahulu, lalu bagi dengan 5 cm untuk mendapatkan perbandingan skala 1 : ...',
    explanation: 'Langkah perhitungan:\n1. Jarak sebenarnya 15 km = 15 × 100.000 cm = 1.500.000 cm.\n2. Jarak pada peta = 5 cm.\n3. Skala = 5 cm : 1.500.000 cm = 1 : 300.000.',
  },
  {
    id: 9,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Membandingkan jarak pada peta',
    hasStimulusImage: false,
    text: 'Pada peta berskala 1 : 100.000, jarak sekolah ke perpustakaan adalah 2 cm. Jarak perpustakaan ke rumah Raka adalah 3 cm. Raka menempuh perjalanan melalui perpustakaan. Berapa jarak perjalanan sebenarnya?',
    options: [
      '500 m',
      '2 km',
      '3 km',
      '5 km',
    ],
    correctIndex: 3, // D. 5 km
    hint: 'Cari total jarak pada peta, lalu konversikan dengan skala 1 : 100.000.',
    guidingFeedback: 'Belum tepat. Raka berjalan dari sekolah ke perpustakaan (2 cm) lalu lanjut ke rumahnya (3 cm). Jumlahkan jarak total pada peta, lalu gunakan skala 1 : 100.000 di mana 1 cm mewakili 1 km.',
    explanation: 'Langkah perhitungan:\n1. Total jarak pada peta = 2 cm + 3 cm = 5 cm.\n2. Skala 1 : 100.000 berarti 1 cm mewakili 100.000 cm atau 1 km.\n3. Total jarak perjalanan sebenarnya = 5 × 1 km = 5 km.',
  },
  {
    id: 10,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Menilai kesalahan perhitungan skala',
    hasStimulusImage: false,
    text: 'Peta berskala 1 : 50.000 menunjukkan jarak balai desa ke sekolah sebesar 6 cm. Beni menyimpulkan jarak sebenarnya adalah 300 meter. Penilaian yang tepat adalah …',
    options: [
      'Benar, karena 6 × 50.000 = 300.000 cm',
      'Salah, jarak sebenarnya adalah 3 km',
      'Salah, jarak sebenarnya adalah 30 km',
      'Benar, karena 1 cm mewakili 50 meter',
    ],
    correctIndex: 1, // B. Salah, jarak sebenarnya adalah 3 km
    hint: 'Hitung hasil perkalian 6 × 50.000 cm, lalu ubah ke satuan meter dan kilometer dengan cermat.',
    guidingFeedback: 'Belum tepat. Coba hitung hasil kali 6 × 50.000 cm. Kemudian perhatikan konversi satuan panjang dari sentimeter ke meter (dibagi 100) dan ke kilometer (dibagi 100.000). Apakah hasilnya 300 meter atau bukan?',
    explanation: 'Langkah perhitungan:\n1. 6 × 50.000 cm = 300.000 cm.\n2. Konversi ke meter: 300.000 ÷ 100 = 3.000 meter.\n3. Konversi ke kilometer: 3.000 ÷ 1.000 = 3 km.\nKesimpulan Beni salah, karena jarak sebenarnya adalah 3.000 meter (3 km), bukan 300 meter.',
  },
  {
    id: 11,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Menentukan rute terpendek',
    hasStimulusImage: true,
    text: 'Dari sekolah menuju balai olahraga, Rute A melewati jalan sepanjang 4 km ke timur dan 3 km ke utara. Rute B merupakan jalan langsung sepanjang 6 km. Jika kedua rute aman dan dapat dilalui, kesimpulan yang tepat adalah …',
    options: [
      'Rute A lebih pendek 1 km',
      'Rute B lebih pendek 1 km',
      'Kedua rute sama panjang',
      'Rute B lebih panjang 2 km',
    ],
    correctIndex: 1, // B. Rute B lebih pendek 1 km
    hint: 'Hitung panjang total Rute A, lalu bandingkan dengan panjang Rute B.',
    guidingFeedback: 'Belum tepat. Amati panjang kedua rute pada gambar. Hitung panjang total Rute A (4 km + 3 km), lalu bandingkan hasilnya dengan Rute B yang panjangnya 6 km untuk mencari rute mana yang lebih pendek serta berapa selisihnya.',
    explanation: 'Langkah analisis:\n1. Panjang Rute A = 4 km + 3 km = 7 km.\n2. Panjang Rute B = 6 km.\n3. Selisih = 7 km − 6 km = 1 km.\nKesimpulan yang tepat adalah Rute B lebih pendek 1 km daripada Rute A.',
  },
  {
    id: 12,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Memilih rute yang aman',
    hasStimulusImage: true,
    text: 'Pada peta, sungai memisahkan permukiman dari sekolah. Ada dua jembatan: jembatan utama dan jembatan kecil. Informasi tambahan menyatakan bahwa jembatan kecil sedang ditutup. Rute yang sebaiknya dipilih siswa adalah …',
    options: [
      'Melewati jembatan kecil karena mungkin lebih dekat',
      'Menyeberangi sungai tanpa jembatan',
      'Melewati jembatan utama yang masih dapat digunakan',
      'Memilih jalan apa saja tanpa memperhatikan kondisi jembatan',
    ],
    correctIndex: 2, // C. Melewati jembatan utama yang masih dapat digunakan
    hint: 'Pertimbangkan faktor keselamatan dan status kondisi masing-masing jembatan.',
    guidingFeedback: 'Belum tepat. Perhatikan kondisi kedua jembatan yang digambarkan pada peta. Ingat bahwa rute perjalanan yang baik harus mengutamakan keselamatan dan hanya memilih jalur atau jembatan yang berstatus terbuka dan aman dilalui.',
    explanation: 'Rute terbaik tidak hanya mempertimbangkan jarak, tetapi juga keamanan dan kondisi jalan. Karena jembatan kecil sedang ditutup, siswa harus memilih rute yang melewati jembatan utama yang masih dapat digunakan dengan aman.',
  },
  {
    id: 13,
    zone: 2,
    zoneName: 'Zona 2 — Pantang Menyerah',
    topic: 'Menghitung panjang rute alternatif',
    hasStimulusImage: true,
    text: 'Jarak sekolah ke pasar adalah 2 km. Jarak pasar ke taman adalah 3 km. Ada jalan alternatif langsung dari sekolah ke taman sepanjang 4 km. Jika tujuan siswa adalah menempuh jarak paling pendek, rute yang dipilih adalah …',
    options: [
      'Sekolah–pasar–taman, sepanjang 5 km',
      'Sekolah–taman melalui jalan alternatif, sepanjang 4 km',
      'Kedua rute sama panjang',
      'Tidak dapat dibandingkan meskipun jaraknya diketahui',
    ],
    correctIndex: 1, // B. Sekolah–taman melalui jalan alternatif, sepanjang 4 km
    hint: 'Bandingkan jarak total rute melewati pasar dengan jarak jalan alternatif langsung.',
    guidingFeedback: 'Belum tepat. Hitung total jarak jika siswa menempuh rute melalui pasar (2 km + 3 km), lalu bandingkan dengan panjang jalan alternatif langsung pada gambar. Pilih rute dengan jarak tempuh yang paling pendek.',
    explanation: 'Langkah analisis:\n1. Rute melalui pasar = 2 km + 3 km = 5 km.\n2. Jalan alternatif langsung = 4 km.\nKarena 4 km lebih pendek daripada 5 km, rute yang dipilih adalah sekolah–taman melalui jalan alternatif sepanjang 4 km.',
  },

  // =========================================================================
  // --- ZONA 3: BELAJAR DARI KESALAHAN (Tantangan 14 - 19) ---
  // =========================================================================
  {
    id: 14,
    zone: 3,
    zoneName: 'Zona 3 — Belajar dari Kesalahan',
    topic: 'Menggabungkan arah dan rute',
    hasStimulusImage: false,
    text: 'Pada peta, perpustakaan berada 2 km di utara sekolah. Taman berada 3 km di timur perpustakaan. Jika seorang siswa berangkat dari sekolah menuju taman melalui perpustakaan, berapa jarak perjalanan dan urutan arahnya?',
    options: [
      '5 km; utara lalu timur',
      '5 km; timur lalu utara',
      '1 km; utara lalu timur',
      '6 km; selatan lalu timur',
    ],
    correctIndex: 0, // A. 5 km; utara lalu timur
    hint: 'Cari total jarak kedua ruas jalan, lalu amati urutan arah dari titik awal keberangkatan.',
    guidingFeedback: 'Belum tepat. Hitung jarak total (2 km + 3 km), lalu perhatikan urutan arah dari titik berangkat di sekolah: ke perpustakaan terlebih dahulu, baru kemudian melanjutkan ke taman.',
    explanation: 'Langkah analisis:\n1. Jarak sekolah ke perpustakaan = 2 km (ke utara).\n2. Jarak perpustakaan ke taman = 3 km (ke timur).\n3. Total jarak = 2 km + 3 km = 5 km.\nUrutan arah perjalanannya adalah utara, lalu timur.',
  },
  {
    id: 15,
    zone: 3,
    zoneName: 'Zona 3 — Belajar dari Kesalahan',
    topic: 'Memilih rute berdasarkan beberapa syarat',
    hasStimulusImage: false,
    text: 'Kelompok siswa akan pergi dari sekolah ke museum. Rute A sepanjang 4 km tetapi melewati jalan yang sedang ditutup. Rute B sepanjang 5 km dan aman dilalui. Rute C sepanjang 6 km dan aman dilalui. Rute yang paling tepat adalah …',
    options: [
      'Rute A karena paling pendek',
      'Rute B karena aman dan lebih pendek daripada Rute C',
      'Rute C karena paling panjang',
      'Semua rute sama baiknya',
    ],
    correctIndex: 1, // B. Rute B karena aman dan lebih pendek daripada Rute C
    hint: 'Singkirkan rute yang ditutup terlebih dahulu, lalu bandingkan panjang rute yang aman.',
    guidingFeedback: 'Belum tepat. Perhatikan syarat yang diberikan pada soal: rute harus aman dilalui. Eliminasi rute yang sedang ditutup, lalu pilih rute dengan jarak terpendek di antara pilihan yang aman.',
    explanation: 'Rute A tidak dapat dipilih karena jalannya ditutup. Di antara rute yang aman dilalui, yaitu Rute B (5 km) dan Rute C (6 km), Rute B lebih pendek sehingga merupakan pilihan paling tepat.',
  },
  {
    id: 16,
    zone: 3,
    zoneName: 'Zona 3 — Belajar dari Kesalahan',
    topic: 'Menafsirkan legenda peta',
    hasStimulusImage: true,
    text: 'Sebuah peta menggunakan simbol berikut:\n- Garis biru = sungai\n- Garis merah = jalan raya\n- Gambar segitiga = gunung\n- Gambar persegi = bangunan penting\nRani melihat simbol segitiga di dekat jalan raya. Kesimpulan yang paling tepat adalah …',
    options: [
      'Jalan raya pasti melewati puncak gunung',
      'Ada gunung yang lokasinya berdekatan dengan jalan raya',
      'Semua bangunan penting berada di gunung',
      'Simbol segitiga menunjukkan sungai',
    ],
    correctIndex: 1, // B. Ada gunung yang lokasinya berdekatan dengan jalan raya
    hint: 'Cocokkan arti simbol segitiga dan garis merah dengan tabel legenda yang tersedia.',
    guidingFeedback: 'Belum tepat. Periksa arti simbol segitiga dan garis merah pada kotak legenda gambar. Letak dua simbol yang saling berdampingan menunjukkan kedekatan posisi di lapangan, bukan berarti jalannya memanjat puncak gunung.',
    explanation: 'Rani harus membaca arti simbol melalui legenda. Simbol segitiga berarti gunung dan garis merah berarti jalan raya. Letak dua simbol yang berdekatan menunjukkan kedekatan lokasi, tetapi tidak membuktikan bahwa jalan melewati puncak gunung.',
  },
  {
    id: 17,
    zone: 3,
    zoneName: 'Zona 3 — Belajar dari Kesalahan',
    topic: 'Mengevaluasi kesalahan membaca warna',
    hasStimulusImage: false,
    text: 'Dina melihat peta dengan warna hijau, kuning, dan cokelat. Ia menyimpulkan bahwa semua daerah hijau pasti merupakan hutan. Padahal, legenda menjelaskan hijau sebagai dataran rendah, kuning sebagai dataran lebih tinggi, dan cokelat sebagai daerah pegunungan. Apa kesalahan Dina?',
    options: [
      'Mengabaikan arti warna berdasarkan legenda',
      'Membaca judul peta terlalu teliti',
      'Menganggap semua peta harus memiliki skala sama',
      'Terlalu memperhatikan nama tempat',
    ],
    correctIndex: 0, // A. Mengabaikan arti warna berdasarkan legenda
    hint: 'Perhatikan sumber rujukan arti warna pada peta: apakah ditebak sendiri atau dibaca dari legenda?',
    guidingFeedback: 'Belum tepat. Pikirkan apa fungsi kotak legenda pada peta. Warna hijau tidak selalu berarti hutan, melainkan memiliki makna ketinggian wilayah yang diterangkan pada legenda.',
    explanation: 'Warna pada peta dapat menunjukkan ketinggian wilayah, bukan selalu jenis tumbuhan. Kesalahan Dina adalah mengabaikan arti warna berdasarkan keterangan kotak legenda yang merupakan petunjuk resmi pembuat peta.',
  },
  {
    id: 18,
    zone: 3,
    zoneName: 'Zona 3 — Belajar dari Kesalahan',
    topic: 'Memeriksa kelengkapan peta',
    hasStimulusImage: false,
    text: 'Fajar membuat peta lingkungan sekolah. Ia sudah mencantumkan judul dan menggambar lokasi sekolah, taman, serta perpustakaan. Namun, ia menggunakan simbol berbeda untuk setiap tempat tanpa menjelaskan artinya. Perbaikan paling diperlukan adalah …',
    options: [
      'Menghapus seluruh nama tempat',
      'Mengubah semua simbol menjadi sama',
      'Menambahkan legenda yang menjelaskan simbol',
      'Menghilangkan judul peta',
    ],
    correctIndex: 2, // C. Menambahkan legenda yang menjelaskan simbol
    hint: 'Unsur peta apa yang berfungsi memuat daftar dan penjelasan arti simbol-simbol?',
    guidingFeedback: 'Belum tepat. Jika pada peta terdapat berbagai macam simbol namun tidak ada yang menjelaskan arti dari masing-masing gambar tersebut, unsur peta apakah yang paling dibutuhkan agar pembaca memahaminya?',
    explanation: 'Legenda membantu pembaca memahami arti simbol yang digunakan. Tanpa legenda, pembaca bisa salah mengenali lokasi atau fasilitas. Oleh karena itu, perbaikan paling diperlukan adalah menambahkan legenda penjelas simbol.',
  },
  {
    id: 19,
    zone: 3,
    zoneName: 'Zona 3 — Belajar dari Kesalahan',
    topic: 'Menilai informasi pada peta',
    hasStimulusImage: false,
    text: 'Andi ingin mengetahui apakah sebuah jalan melewati daerah pegunungan. Ia menggunakan peta yang hanya menampilkan nama kota, batas kecamatan, dan lokasi sekolah. Mengapa peta tersebut belum cukup untuk menjawab pertanyaannya?',
    options: [
      'Peta harus selalu memiliki gambar sekolah',
      'Informasi bentuk permukaan bumi dan jalur jalan belum cukup tersedia',
      'Nama kota tidak boleh dicantumkan pada peta',
      'Batas kecamatan selalu salah pada peta',
    ],
    correctIndex: 1, // B. Informasi bentuk permukaan bumi dan jalur jalan belum cukup tersedia
    hint: 'Pikirkan jenis informasi apa yang diperlukan untuk mengenali jalur jalan dan relief pegunungan.',
    guidingFeedback: 'Belum tepat. Untuk mengetahui apakah suatu jalan melintasi pegunungan, pembaca membutuhkan informasi tentang rute jalan dan bentuk tinggi-rendahnya permukaan bumi (kontur/ketinggian). Peta yang dipegang Andi belum memuat informasi tersebut.',
    explanation: 'Untuk mengetahui apakah jalan melewati pegunungan, Andi memerlukan informasi jalur jalan dan bentuk permukaan bumi (topografi/ketinggian). Peta yang hanya berisi nama kota dan batas wilayah belum menyediakan informasi tersebut.',
  },

  // =========================================================================
  // --- ZONA 4: SAHABAT YANG MENDUKUNG (Tantangan 20 - 25) ---
  // =========================================================================
  {
    id: 20,
    zone: 4,
    zoneName: 'Zona 4 — Sahabat yang Mendukung',
    topic: 'Menemukan ketidaksesuaian pada peta',
    hasStimulusImage: true,
    text: 'Sebuah peta menunjukkan arah utara di bagian atas. Pada peta, kantor desa berada di sebelah timur sekolah. Namun, dalam keterangannya, pembuat peta menulis bahwa kantor desa berada di sebelah barat sekolah. Apa yang sebaiknya dilakukan pembaca?',
    options: [
      'Langsung mempercayai keterangan tertulis',
      'Menganggap arah mata angin tidak diperlukan',
      'Memeriksa kembali posisi simbol dan memperbaiki keterangan yang tidak sesuai',
      'Menghapus seluruh simbol bangunan',
    ],
    correctIndex: 2, // C. Memeriksa kembali posisi simbol dan memperbaiki keterangan yang tidak sesuai
    hint: 'Ketika terdapat kontradiksi antara letak simbol pada gambar dan teks keterangan, apa sikap kritis yang tepat?',
    guidingFeedback: 'Belum tepat. Amati gambar peta: simbol Kantor Desa berada di sisi kanan (Timur) Sekolah, sedangkan catatan teks menyebut Barat. Bila terdapat perbedaan antara gambar dan teks, langkah apa yang tepat dilakukan pembaca yang kritis?',
    explanation: 'Informasi pada peta harus konsisten. Jika posisi simbol menunjukkan timur tetapi keterangan menyebut barat, terdapat ketidaksesuaian yang perlu diperiksa dan diperbaiki agar tidak menyesatkan pembaca lain.',
  },
  {
    id: 21,
    zone: 4,
    zoneName: 'Zona 4 — Sahabat yang Mendukung',
    topic: 'Memilih peta untuk perjalanan',
    hasStimulusImage: false,
    text: 'Ketua kelas akan mengajak teman-temannya berjalan dari sekolah menuju tempat pengungsian. Ia perlu mengetahui jalan, sungai, jembatan, dan lokasi tempat pengungsian. Peta yang paling sesuai adalah …',
    options: [
      'Peta curah hujan saja',
      'Peta jalur atau wilayah yang dilengkapi jalan dan fasilitas penting',
      'Peta ketinggian wilayah saja',
      'Peta persebaran tumbuhan saja',
    ],
    correctIndex: 1, // B. Peta jalur atau wilayah yang dilengkapi jalan dan fasilitas penting
    hint: 'Pilihlah jenis peta yang menyajikan rute jalan, sungai, jembatan, dan lokasi pos pengungsian.',
    guidingFeedback: 'Belum tepat. Pikirkan apa saja kebutuhan perjalanan evakuasi: jalur jalan, jembatan penyeberangan, dan lokasi bangunan pengungsian. Peta mana yang menyajikan informasi rute dan fasilitas tersebut?',
    explanation: 'Untuk menentukan perjalanan, ketua kelas memerlukan informasi rute, hambatan alam, jembatan, dan tujuan. Peta jalur atau wilayah yang dilengkapi jalan dan fasilitas penting paling sesuai untuk kebutuhan navigasi tersebut.',
  },
  {
    id: 22,
    zone: 4,
    zoneName: 'Zona 4 — Sahabat yang Mendukung',
    topic: 'Memilih peta untuk mempelajari banjir',
    hasStimulusImage: false,
    text: 'Warga ingin menentukan lokasi yang tepat untuk membangun pos pemantauan banjir. Mereka perlu mengetahui aliran sungai, daerah rendah yang berisiko tergenang, dan permukiman di sekitarnya. Informasi peta yang paling membantu adalah …',
    options: [
      'Batas kecamatan saja',
      'Nama jalan saja',
      'Aliran sungai, ketinggian wilayah, dan permukiman',
      'Lokasi tempat wisata saja',
    ],
    correctIndex: 2, // C. Aliran sungai, ketinggian wilayah, dan permukiman
    hint: 'Banjir berkaitan dengan air sungai dan daerah berketinggian rendah yang dekat dengan rumah warga.',
    guidingFeedback: 'Belum tepat. Pos pemantauan banjir harus memantau sumber air (sungai), daerah cekungan yang rawan genangan, dan area tempat tinggal warga. Informasi peta manakah yang memuat ketiga unsur tersebut?',
    explanation: 'Informasi aliran sungai, ketinggian wilayah, dan permukiman membantu warga mengenali hubungan antara jalur air, daerah rendah yang rawan tergenang, dan keselamatan penduduk di sekitarnya.',
  },
  {
    id: 23,
    zone: 4,
    zoneName: 'Zona 4 — Sahabat yang Mendukung',
    topic: 'Memilih peta untuk pertanian',
    hasStimulusImage: false,
    text: 'Seorang petani ingin mengetahui wilayah yang memiliki ketinggian berbeda dan bentuk permukaan yang sesuai untuk mempelajari kondisi lahannya. Peta yang paling membantu adalah …',
    options: [
      'Peta topografi atau peta bentuk permukaan bumi',
      'Peta persebaran rumah sakit',
      'Peta jalur angkutan umum',
      'Peta batas administrasi saja',
    ],
    correctIndex: 0, // A. Peta topografi atau peta bentuk permukaan bumi
    hint: 'Peta yang menyajikan gambaran tinggi-rendahnya relief permukaan bumi dinamakan peta...',
    guidingFeedback: 'Belum tepat. Petani membutuhkan peta yang menunjukkan kontur kemiringan tanah dan perbedaan ketinggian daratan. Istilah kartografi untuk peta bentuk permukaan bumi adalah peta...',
    explanation: 'Peta topografi dapat menunjukkan bentuk permukaan bumi dan perbedaan ketinggian melalui garis kontur. Informasi tersebut sangat membantu petani mempelajari kondisi lahan dan kemiringan tanah.',
  },
  {
    id: 24,
    zone: 4,
    zoneName: 'Zona 4 — Sahabat yang Mendukung',
    topic: 'Menggabungkan skala dan pemilihan rute',
    hasStimulusImage: false,
    text: 'Pada peta berskala 1 : 100.000, Rute A dari rumah ke sekolah panjangnya 4 cm. Rute B panjangnya 5,5 cm. Kedua rute aman dan dapat dilalui. Berapa selisih jarak sebenarnya dan rute mana yang lebih pendek?',
    options: [
      '150 m; Rute A',
      '1,5 km; Rute A',
      '1,5 km; Rute B',
      '15 km; Rute B',
    ],
    correctIndex: 1, // B. 1,5 km; Rute A
    hint: 'Ubah panjang kedua rute dengan skala 1 : 100.000 (1 cm = 1 km), lalu hitung selisih jarak keduanya.',
    guidingFeedback: 'Belum tepat. Pada skala 1 : 100.000, setiap 1 cm pada peta mewakili 1 km di lapangan. Hitung jarak sebenarnya untuk Rute A (4 cm) dan Rute B (5,5 cm), lalu cari selisihnya serta tentukan rute yang lebih pendek.',
    explanation: 'Langkah analisis:\n1. Skala 1 : 100.000 berarti 1 cm = 100.000 cm = 1 km.\n2. Jarak sebenarnya Rute A = 4 × 1 km = 4 km.\n3. Jarak sebenarnya Rute B = 5,5 × 1 km = 5,5 km.\n4. Selisih jarak = 5,5 km − 4 km = 1,5 km.\nKarena 4 km lebih kecil daripada 5,5 km, Rute A adalah rute yang lebih pendek.',
  },
  {
    id: 25,
    zone: 4,
    zoneName: 'Zona 4 — Sahabat yang Mendukung',
    topic: 'Mengambil keputusan berdasarkan informasi peta',
    hasStimulusImage: false,
    text: 'Sekelompok siswa akan mengunjungi museum dari sekolah. Pada peta, terdapat dua rute. Rute A lebih pendek, tetapi melewati sungai tanpa jembatan yang ditandai. Rute B sedikit lebih panjang, tetapi melewati jembatan dan jalan yang terhubung dengan baik. Keputusan paling tepat adalah …',
    options: [
      'Memilih Rute A karena jarak selalu menjadi pertimbangan utama',
      'Memilih Rute B karena aksesnya lebih memungkinkan dan aman',
      'Memilih Rute A karena sungai selalu mudah diseberangi',
      'Tidak perlu menggunakan peta karena kedua rute terlihat',
    ],
    correctIndex: 1, // B. Memilih Rute B karena aksesnya lebih memungkinkan dan aman
    hint: 'Pertimbangkan aksesibilitas penyeberangan sungai dan keselamatan pejalan kaki.',
    guidingFeedback: 'Belum tepat. Jarak yang lebih pendek tidak berguna jika di tengah jalan terdapat rintangan sungai yang tidak memiliki jembatan. Pertimbangkan akses jalan yang aman dan dapat dilalui.',
    explanation: 'Peta membantu mempertimbangkan jarak sekaligus akses perjalanan. Rute terpendek tidak selalu menjadi pilihan terbaik apabila tidak memiliki jalur penyeberangan yang dapat digunakan dengan aman. Keputusan paling tepat adalah memilih Rute B karena memiliki akses jembatan yang aman.',
  },
];
