import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../../utils/audio';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Maximize2,
  Film,
} from 'lucide-react';

interface VideoChapter {
  id: number;
  title: string;
  durationSeconds: number;
  narrationText: string;
  subtitles: string[];
  checkpointQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    title: 'Bagian 1: Pengertian & Fungsi Peta',
    durationSeconds: 12,
    narrationText:
      'Halo sahabat petualang! Hari ini kita belajar IPAS Bab 3 Topik A Mengenal Peta. Peta adalah gambaran permukaan bumi pada bidang datar dengan ukuran diperkecil menggunakan skala. Peta membantu kita mengetahui lokasi dan bepergian tanpa tersesat!',
    subtitles: [
      'Halo sahabat petualang cilik kelas IV!',
      'Mari belajar IPAS Bab 3: Mengenal Peta tempat tinggalku.',
      'Peta: gambaran permukaan bumi pada bidang datar diperkecil dengan skala.',
      'Fungsi utama: menunjukkan lokasi dan membantu kita tidak tersesat!',
    ],
    checkpointQuestion: {
      question: 'Apa arti peta dalam pelajaran IPAS?',
      options: [
        'Gambar permukaan bumi pada bidang datar diperkecil dengan skala',
        'Foto bebas pemandangan alam tanpa ukuran',
        'Buku cerita khayalan tentang pulau harta karun',
      ],
      correctIndex: 0,
      explanation: 'Hebat! Peta digambar pada bidang datar (kertas atau layar ponsel) dan ukurannya diperkecil dengan skala yang teliti.',
    },
  },
  {
    id: 2,
    title: 'Bagian 2: Komponen-Komponen Penting Peta',
    durationSeconds: 14,
    narrationText:
      'Sebuah peta yang baik memiliki komponen lengkap: Judul peta di bagian atas, Arah Mata Angin sebagai kompas pemandu, Skala penunjuk perbandingan jarak nyata, serta kotak Legenda yang menjelaskan arti dari seluruh simbol gambar.',
    subtitles: [
      'Peta lengkap memiliki bagian-bagian penting.',
      'Judul: memberitahu nama wilayah yang digambarkan.',
      'Arah Mata Angin: kompas penunjuk utara, timur, selatan, dan barat.',
      'Skala & Legenda: penjelas jarak dan arti seluruh simbol gambar.',
    ],
    checkpointQuestion: {
      question: 'Kotak yang memuat keterangan arti simbol pada peta disebut...',
      options: ['Judul Peta', 'Kotak Legenda', 'Garis Astronomis'],
      correctIndex: 1,
      explanation: 'Tepat sekali! Kotak legenda adalah kamus kecil pembaca peta untuk memahami arti semua simbol.',
    },
  },
  {
    id: 3,
    title: 'Bagian 3: Kompas & 8 Arah Mata Angin',
    durationSeconds: 12,
    narrationText:
      'Arah mata angin membantu kita menentukan letak suatu tempat. Arah utama adalah Utara di atas, Timur di kanan, Selatan di bawah, dan Barat di kiri. Ada juga Timur Laut, Tenggara, Barat Daya, dan Barat Laut.',
    subtitles: [
      'Pada peta standar, arah ATAS selalu menunjuk ke UTARA.',
      'Kanan adalah TIMUR, Bawah adalah SELATAN, dan Kiri adalah BARAT.',
      'Antara Utara dan Timur adalah TIMUR LAUT.',
      'Kompas memastikan arah petualangan kita tidak keliru.',
    ],
    checkpointQuestion: {
      question: 'Pada peta biasa, arah atas selalu menunjuk ke arah...',
      options: ['Selatan', 'Barat', 'Utara'],
      correctIndex: 2,
      explanation: 'Pintar! Standar internasional peta menempatkan arah Utara selalu menghadap ke atas.',
    },
  },
  {
    id: 4,
    title: 'Bagian 4: Membaca Rute Tempat Tinggal Kita',
    durationSeconds: 14,
    narrationText:
      'Sekarang saatnya membaca rute! Perhatikan simbol jalan, jembatan penyeberangan sungai, dan bangunan sekolah. Dengan membaca peta, kita bisa memilih jalan yang paling aman, paling nyaman, dan terbebas dari rintangan!',
    subtitles: [
      'Saat bepergian ke sekolah, amati simbol jalan dan jembatan.',
      'Gunakan patokan fasilitas umum: Balai Desa, Masjid, dan Puskesmas.',
      'Pilihlah rute jalan raya yang aman dan hindari jembatan yang rusak!',
      'Selamat! Kamu kini telah menjadi Navigator Peta Cilik!',
    ],
    checkpointQuestion: {
      question: 'Mengapa kita perlu memperhatikan simbol jembatan dan jalan saat memilih rute?',
      options: [
        'Agar bisa memilih rute yang aman dan tidak terhalang sungai deras',
        'Supaya bisa berbelanja mainan di jalan',
        'Hanya untuk menghitung jumlah pohon di pinggir jalan',
      ],
      correctIndex: 0,
      explanation: 'Luar biasa! Keselamatan adalah hal utama dalam navigasi peta. Memilih jalan yang aman menjaga kita sampai di tujuan dengan selamat.',
    },
  },
];

export const InteractiveLearningVideo: React.FC = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCheckpoint, setShowCheckpoint] = useState<boolean>(false);
  const [selectedCheckpointAnswer, setSelectedCheckpointAnswer] = useState<number | null>(null);

  const chapter = VIDEO_CHAPTERS[currentChapterIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play narration speech when video is playing
  useEffect(() => {
    if (isPlaying) {
      if (!isMuted) {
        audioManager.speak(chapter.narrationText, () => {
          // Finished speech
        });
      }

      timerRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= chapter.durationSeconds) {
            setIsPlaying(false);
            setShowCheckpoint(true);
            audioManager.playLevelUpSound();
            return chapter.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      audioManager.stopSpeech();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      audioManager.stopSpeech();
    };
  }, [isPlaying, currentChapterIndex, isMuted]);

  const handleTogglePlay = () => {
    audioManager.playClickSound();
    if (currentSeconds >= chapter.durationSeconds) {
      setCurrentSeconds(0);
      setShowCheckpoint(false);
      setSelectedCheckpointAnswer(null);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestartChapter = () => {
    audioManager.playClickSound();
    audioManager.stopSpeech();
    setCurrentSeconds(0);
    setShowCheckpoint(false);
    setSelectedCheckpointAnswer(null);
    setIsPlaying(true);
  };

  const handleNextChapter = () => {
    audioManager.playClickSound();
    audioManager.stopSpeech();
    if (currentChapterIndex < VIDEO_CHAPTERS.length - 1) {
      setCurrentChapterIndex((prev) => prev + 1);
      setCurrentSeconds(0);
      setShowCheckpoint(false);
      setSelectedCheckpointAnswer(null);
      setIsPlaying(true);
    }
  };

  const handlePrevChapter = () => {
    audioManager.playClickSound();
    audioManager.stopSpeech();
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex((prev) => prev - 1);
      setCurrentSeconds(0);
      setShowCheckpoint(false);
      setSelectedCheckpointAnswer(null);
      setIsPlaying(true);
    }
  };

  // Determine which subtitle to display based on progress
  const subtitleIndex = Math.min(
    chapter.subtitles.length - 1,
    Math.floor((currentSeconds / Math.max(1, chapter.durationSeconds)) * chapter.subtitles.length)
  );
  const activeSubtitle = chapter.subtitles[subtitleIndex] || chapter.subtitles[0];

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 rounded-3xl p-3 sm:p-5 border-4 border-sky-400 shadow-2xl text-white select-none">
      {/* Top Video Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="bg-rose-600 text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
            <Film className="w-3.5 h-3.5" />
            <span>Video Pembelajaran Animasi</span>
          </span>
          <h3 className="font-extrabold text-xs sm:text-base text-amber-300 font-fredoka truncate">
            {chapter.title}
          </h3>
        </div>

        <span className="text-xs text-slate-400 font-bold">
          Bagian {currentChapterIndex + 1} dari {VIDEO_CHAPTERS.length}
        </span>
      </div>

      {/* Main Animated Video Canvas Stage */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-300 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-inner flex flex-col justify-between p-4">
        {/* Animated Sky Clouds */}
        <div className="absolute top-4 left-6 text-3xl opacity-80 animate-cloud pointer-events-none">☁️</div>
        <div className="absolute top-8 right-12 text-4xl opacity-80 animate-cloud-rev pointer-events-none">☁️</div>
        <div className="absolute top-3 left-1/3 text-2xl opacity-60 animate-cloud pointer-events-none">🌤️</div>

        {/* Scene Graphic based on Chapter */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          {chapter.id === 1 && (
            <div className="flex items-center justify-center gap-6 text-center animate-fade-in">
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-3xl border-3 border-amber-400 shadow-xl max-w-xs transform hover:scale-105 transition-transform">
                <span className="text-5xl block mb-1 animate-float">🗺️</span>
                <span className="text-xs sm:text-sm font-black font-fredoka text-[#123D68] block">
                  Peta: Gambar Bumi yang Diperkecil
                </span>
                <span className="text-[11px] text-slate-600 font-bold mt-1 block">
                  Dengan Skala & Aturan Standar
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-4xl animate-bounce">👦</span>
                <span className="text-[10px] font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  Rian Navigator
                </span>
              </div>
            </div>
          )}

          {chapter.id === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center max-w-lg animate-fade-in">
              <div className="bg-white/90 p-2.5 rounded-2xl border-2 border-sky-400 shadow-md">
                <span className="text-3xl block">📌</span>
                <span className="text-xs font-black text-[#123D68]">1. Judul Peta</span>
              </div>
              <div className="bg-white/90 p-2.5 rounded-2xl border-2 border-emerald-400 shadow-md">
                <span className="text-3xl block">🧭</span>
                <span className="text-xs font-black text-[#123D68]">2. Mata Angin</span>
              </div>
              <div className="bg-white/90 p-2.5 rounded-2xl border-2 border-amber-400 shadow-md">
                <span className="text-3xl block">📋</span>
                <span className="text-xs font-black text-[#123D68]">3. Legenda</span>
              </div>
              <div className="bg-white/90 p-2.5 rounded-2xl border-2 border-purple-400 shadow-md">
                <span className="text-3xl block">📏</span>
                <span className="text-xs font-black text-[#123D68]">4. Skala Peta</span>
              </div>
            </div>
          )}

          {chapter.id === 3 && (
            <div className="flex items-center justify-center gap-6 text-center animate-fade-in">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/95 border-4 border-amber-400 shadow-2xl flex items-center justify-center relative">
                <span className="text-5xl sm:text-6xl animate-spin [animation-duration:12s]">🧭</span>
                <span className="absolute top-1 text-xs font-black text-rose-600 font-fredoka">U (Utara)</span>
                <span className="absolute right-1 text-xs font-black text-sky-700 font-fredoka">T</span>
                <span className="absolute bottom-1 text-xs font-black text-sky-700 font-fredoka">S</span>
                <span className="absolute left-1 text-xs font-black text-sky-700 font-fredoka">B</span>
              </div>
              <div className="bg-white/90 p-3 rounded-2xl border-2 border-sky-400 text-left max-w-xs shadow-md">
                <span className="text-xs sm:text-sm font-black font-fredoka text-[#123D68] block">
                  8 Arah Mata Angin:
                </span>
                <span className="text-[11px] text-slate-700 font-semibold leading-relaxed block mt-1">
                  Utara, Timur Laut, Timur, Tenggara, Selatan, Barat Daya, Barat, Barat Laut.
                </span>
              </div>
            </div>
          )}

          {chapter.id === 4 && (
            <div className="flex items-center justify-center gap-4 text-center max-w-md animate-fade-in">
              <div className="bg-white/90 p-3 rounded-2xl border-2 border-sky-400 shadow-md">
                <span className="text-3xl block">🏠</span>
                <span className="text-[11px] font-black text-[#123D68]">Rumah Siswa</span>
              </div>
              <span className="text-2xl text-amber-500 font-black animate-pulse">➔</span>
              <div className="bg-emerald-100 p-3 rounded-2xl border-2 border-emerald-500 shadow-md">
                <span className="text-3xl block">🌉</span>
                <span className="text-[11px] font-black text-emerald-900">Jembatan Beton</span>
              </div>
              <span className="text-2xl text-amber-500 font-black animate-pulse">➔</span>
              <div className="bg-white/90 p-3 rounded-2xl border-2 border-sky-400 shadow-md">
                <span className="text-3xl block">🏫</span>
                <span className="text-[11px] font-black text-[#123D68]">SDN Nusantara</span>
              </div>
            </div>
          )}
        </div>

        {/* Big Subtitle Display Bar */}
        <div className="relative z-20 bg-slate-950/85 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-700 text-center shadow-lg">
          <p className="text-xs sm:text-base font-extrabold text-amber-300 tracking-wide font-nunito leading-snug">
            “ {activeSubtitle} ”
          </p>
        </div>

        {/* In-Video Quick Checkpoint Overlay */}
        {showCheckpoint && (
          <div className="absolute inset-0 z-30 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in">
            <div className="max-w-md w-full bg-white text-[#123D68] rounded-3xl p-5 border-4 border-amber-300 shadow-2xl text-left">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <h4 className="font-black font-fredoka text-sm sm:text-base">
                  Kuis Jeda Video — Cek Pemahamanmu:
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mb-3">
                {chapter.checkpointQuestion.question}
              </p>

              <div className="space-y-1.5 mb-3">
                {chapter.checkpointQuestion.options.map((opt, oIdx) => {
                  const isSelected = selectedCheckpointAnswer === oIdx;
                  const isCorrect = oIdx === chapter.checkpointQuestion.correctIndex;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => {
                        audioManager.playClickSound();
                        setSelectedCheckpointAnswer(oIdx);
                        if (isCorrect) {
                          audioManager.playCorrectSound();
                        } else {
                          audioManager.playEncouragingSound();
                        }
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                        isSelected
                          ? isCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                            : 'bg-rose-100 border-rose-400 text-rose-950'
                          : 'bg-slate-50 border-slate-200 hover:border-amber-400 text-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedCheckpointAnswer !== null && (
                <div
                  className={`p-2.5 rounded-xl text-xs font-bold mb-3 ${
                    selectedCheckpointAnswer === chapter.checkpointQuestion.correctIndex
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {selectedCheckpointAnswer === chapter.checkpointQuestion.correctIndex
                    ? `🎉 ${chapter.checkpointQuestion.explanation}`
                    : 'Ayo coba pilih opsi yang lain! Ingat intisari videonya ya.'}
                </div>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckpoint(false);
                    if (currentChapterIndex < VIDEO_CHAPTERS.length - 1) {
                      handleNextChapter();
                    } else {
                      setIsPlaying(false);
                    }
                  }}
                  className="bg-[#21A447] hover:bg-emerald-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Lanjutkan Petualangan</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Timeline Seekbar */}
      <div className="mt-3 px-2">
        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-300 rounded-full"
            style={{
              width: `${(currentSeconds / Math.max(1, chapter.durationSeconds)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Video Controls Deck */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          {/* Prev Chapter */}
          <button
            type="button"
            onClick={handlePrevChapter}
            disabled={currentChapterIndex === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40 transition-colors cursor-pointer"
            title="Bagian Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Big Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Jeda' : 'Putar Video'}</span>
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={handleRestartChapter}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
            title="Putar Ulang Bagian Ini"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Audio Mute Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted) audioManager.stopSpeech();
            }}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isMuted ? 'bg-rose-900 text-rose-300' : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            title={isMuted ? 'Nyalakan Suara Narasi' : 'Bisukan Suara Narasi'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <span className="text-xs text-slate-400 font-mono">
            {currentSeconds}s / {chapter.durationSeconds}s
          </span>
        </div>

        {/* Next Chapter Button */}
        <div className="flex items-center gap-2">
          {currentChapterIndex < VIDEO_CHAPTERS.length - 1 ? (
            <button
              type="button"
              onClick={handleNextChapter}
              className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Bagian Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Video Selesai</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
