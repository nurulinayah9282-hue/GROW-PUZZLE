import React, { useState } from 'react';
import { audioManager } from '../../utils/audio';
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Home,
  Volume2,
  Film,
  Info,
  Send,
  BookmarkCheck,
  Eye,
} from 'lucide-react';

interface VideoLearningPlayerProps {
  onBackToMateri: () => void;
  onGoToActivities: () => void;
  onBackToHome: () => void;
  onOpenBibliography?: () => void;
}

interface PostWatchQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  placeholder: string;
}

const POST_WATCH_QUESTIONS: PostWatchQuestion[] = [
  {
    id: 1,
    question: '1. Apa yang dimaksud dengan peta?',
    options: [
      {
        label: 'A',
        text: 'Gambaran permukaan bumi pada bidang datar dengan ukuran yang diperkecil menggunakan skala.',
        isCorrect: true,
        feedback: 'Bagus, kamu sudah menemukan informasi penting! Peta digambar pada bidang datar dan ukurannya diperkecil secara terukur.',
      },
      {
        label: 'B',
        text: 'Lukisan bebas pemandangan alam tanpa aturan skala atau arah mata angin.',
        isCorrect: false,
        feedback: 'Belum tepat, ayo perhatikan kembali penjelasan tentang peta. Tidak apa-apa jika belum benar. Coba lagi dan temukan alasannya.',
      },
      {
        label: 'C',
        text: 'Foto gedung dan jalanan yang diambil tanpa keterangan lokasi.',
        isCorrect: false,
        feedback: 'Belum tepat, ayo perhatikan kembali penjelasan tentang peta. Peta bukanlah sekadar foto biasa.',
      },
    ],
    placeholder: 'Atau tuliskan pengertian peta dengan bahasamu sendiri...',
  },
  {
    id: 2,
    question: '2. Informasi apa yang dapat kita peroleh dari sebuah peta?',
    options: [
      {
        label: 'A',
        text: 'Letak/posisi suatu tempat, arah perjalanan, perkiraan jarak, dan kenampakan alam/buatan.',
        isCorrect: true,
        feedback: 'Bagus, kamu sudah menemukan informasi penting! Peta menyajikan letak, arah, jarak, dan simbol kenampakan sekitar kita.',
      },
      {
        label: 'B',
        text: 'Daftar harga makanan dan barang-barang yang dijual di toko.',
        isCorrect: false,
        feedback: 'Belum tepat, ayo perhatikan kembali penjelasan tentang peta. Tidak apa-apa jika belum benar. Coba lagi dan temukan alasannya.',
      },
      {
        label: 'C',
        text: 'Nama-nama orang yang sedang bermain di taman desa.',
        isCorrect: false,
        feedback: 'Belum tepat, ayo ingat kembali fungsi peta untuk menemukan lokasi dan petunjuk arah.',
      },
    ],
    placeholder: 'Sebutkan informasi penting apa saja yang kamu temukan di peta...',
  },
  {
    id: 3,
    question: '3. Mengapa kita perlu memahami simbol dan legenda peta?',
    options: [
      {
        label: 'A',
        text: 'Agar kita dapat membaca arti tanda-tanda pada peta dengan benar dan tidak tersesat di perjalanan.',
        isCorrect: true,
        feedback: 'Bagus, kamu sudah menemukan informasi penting! Simbol dan legenda adalah kunci rahasia membaca peta dengan tepat.',
      },
      {
        label: 'B',
        text: 'Hanya sebagai hiasan gambar agar lembar peta terlihat penuh dan berwarna.',
        isCorrect: false,
        feedback: 'Belum tepat, ayo perhatikan kembali penjelasan tentang peta. Setiap simbol memiliki arti penting di dunia nyata.',
      },
      {
        label: 'C',
        text: 'Supaya kita bisa menebak-nebak nama gedung tanpa perlu membacanya.',
        isCorrect: false,
        feedback: 'Tidak apa-apa jika belum benar. Simbol dibuat bukan untuk ditebak-tebak, melainkan dipahami lewat legenda.',
      },
    ],
    placeholder: 'Tuliskan alasan mengapa simbol dan legenda itu sangat penting bagimu...',
  },
];

export const VideoLearningPlayer: React.FC<VideoLearningPlayerProps> = ({
  onBackToMateri,
  onGoToActivities,
  onBackToHome,
  onOpenBibliography,
}) => {
  const [hasFinishedWatching, setHasFinishedWatching] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('grow_puzzle_video_completed') === 'true';
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [textAnswers, setTextAnswers] = useState<Record<number, string>>({});
  const [showDirectLinkHelp, setShowDirectLinkHelp] = useState<boolean>(false);
  const [showSourceModal, setShowSourceModal] = useState<boolean>(false);

  const YOUTUBE_VIDEO_ID = 'XdEhLNBmRLE';
  const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`;
  const YOUTUBE_WATCH_URL = `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`;

  const handleMarkFinished = () => {
    audioManager.playCorrectSound();
    setHasFinishedWatching(true);
    try {
      localStorage.setItem('grow_puzzle_video_completed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectOption = (questionId: number, optionIndex: number, isCorrect: boolean) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    if (isCorrect) {
      audioManager.playCorrectSound();
    } else {
      audioManager.playEncouragingSound();
    }
  };

  const handleTextChange = (questionId: number, val: string) => {
    setTextAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleSpeakInstruction = () => {
    const text = 'Amati penjelasan dalam video. Temukan informasi tentang pengertian peta, manfaat peta, serta simbol dan komponen peta.';
    audioManager.speak(text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 font-nunito select-none animate-fade-in">
      {/* Top Banner Video Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-sky-300 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border-2 border-rose-400 flex items-center justify-center text-2xl shadow-xs shrink-0">
              <Film className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Video YouTube Edukasi
                </span>
                <span className="text-[11px] font-bold text-slate-500">
                  IPAS Kelas IV SD
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black font-fredoka text-[#123D68] leading-snug">
                Rangkuman Materi IPAS Kelas IV BAB 3. Topik A Mengenal Peta
              </h2>
            </div>
          </div>

          {/* Button to open Media Source Card */}
          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              setShowSourceModal(true);
            }}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            title="Lihat Sumber & Daftar Pustaka Media"
          >
            <Info className="w-4 h-4 text-sky-600" />
            <span>Sumber Media & Kanal</span>
          </button>
        </div>
      </div>

      {/* B. PETUNJUK SEBELUM MENONTON */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-3xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <span className="text-3xl sm:text-4xl">👀</span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Petunjuk Sebelum Menonton
              </span>
              <p className="text-sm sm:text-base font-extrabold font-fredoka text-white leading-relaxed">
                “Amati penjelasan dalam video. Temukan informasi tentang pengertian peta, manfaat peta, serta simbol dan komponen peta.”
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSpeakInstruction}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/40 p-2.5 rounded-2xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold shrink-0"
            title="Dengarkan Petunjuk"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden sm:inline">Dengar Suara</span>
          </button>
        </div>
      </div>

      {/* A. TAMPILAN VIDEO YOUTUBE EMBED (16:9 RESPONSIVE) */}
      <div className="bg-slate-950 rounded-3xl p-3 sm:p-4 border-4 border-sky-400 shadow-2xl">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-inner">
          <iframe
            src={YOUTUBE_EMBED_URL}
            title="Rangkuman Materi IPAS Kelas IV BAB 3. Topik A Mengenal Peta"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-0 select-none"
          />
        </div>

        {/* Fallback Assistance & Watch Button */}
        <div className="mt-3.5 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            <span>Video tidak dapat berputar di perambanmu? </span>
            <a
              href={YOUTUBE_WATCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 font-extrabold underline inline-flex items-center gap-1"
            >
              <span>Buka langsung di YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mark Finished Button (Does not auto-claim finished just by opening) */}
          <button
            type="button"
            onClick={handleMarkFinished}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
              hasFinishedWatching
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:from-yellow-400 hover:to-amber-500 shadow-md animate-pulse'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>
              {hasFinishedWatching
                ? 'Sudah Ditonton ✓ (Siap Jawab Pertanyaan)'
                : 'Saya Sudah Selesai Menonton Video'}
            </span>
          </button>
        </div>
      </div>

      {/* C & D. PERTANYAAN SETELAH MENONTON & UMPAN BALIK GROWTH MINDSET */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-amber-300 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-xl shadow-xs">
            📝
          </div>
          <div>
            <span className="bg-[#FF9F1C] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              Refleksi Setelah Menonton
            </span>
            <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68]">
              Pertanyaan Pemahaman Berdasarkan Video
            </h3>
          </div>
        </div>

        {POST_WATCH_QUESTIONS.map((q) => {
          const selectedIndex = selectedAnswers[q.id];
          const hasAnswered = selectedIndex !== undefined;
          const chosenOption = hasAnswered ? q.options[selectedIndex] : null;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/70 space-y-3"
            >
              <h4 className="font-black font-fredoka text-sm sm:text-base text-[#123D68]">
                {q.question}
              </h4>

              {/* Multiple Choice Options */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedIndex === oIdx;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, oIdx, opt.isCorrect)}
                      className={`w-full text-left p-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                            : 'bg-rose-100 border-rose-400 text-rose-950'
                          : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="flex-1 leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* D. Growth Mindset Feedback */}
              {hasAnswered && chosenOption && (
                <div
                  className={`p-3 rounded-xl text-xs font-bold animate-pop flex items-start gap-2 ${
                    chosenOption.isCorrect
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                      : 'bg-amber-100 text-amber-950 border border-amber-300'
                  }`}
                >
                  {chosenOption.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{chosenOption.feedback}</span>
                </div>
              )}

              {/* Text Area for student's own explanation */}
              <div className="pt-2">
                <input
                  type="text"
                  value={textAnswers[q.id] || ''}
                  onChange={(e) => handleTextChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* E. NAVIGASI LENGKAP */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-sky-300 shadow-md flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            audioManager.playClickSound();
            onBackToMateri();
          }}
          className="px-4 py-2.5 rounded-2xl border-2 border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Kembali ke Jelajah Materi</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onGoToActivities();
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Lanjut ke Latihan Interaktif</span>
          </button>

          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onBackToHome();
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#123D68] hover:bg-sky-900 text-white font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>
        </div>
      </div>

      {/* F. MODAL DAFTAR PUSTAKA & SUMBER MEDIA */}
      {showSourceModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 select-none animate-fade-in"
        >
          <div className="max-w-lg w-full bg-white text-[#123D68] rounded-3xl p-5 sm:p-6 border-4 border-sky-400 shadow-2xl relative">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <h3 className="font-black font-fredoka text-lg text-[#123D68]">
                  Daftar Pustaka & Sumber Media
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSourceModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
              {/* YouTube Media Info */}
              <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-200">
                <span className="font-black text-sky-900 block mb-1 uppercase tracking-wide">
                  1. Video Pembelajaran YouTube:
                </span>
                <ul className="space-y-1">
                  <li><strong>Judul Video:</strong> Rangkuman Materi IPAS Kelas IV BAB 3. Topik A Mengenal Peta</li>
                  <li><strong>Platform:</strong> YouTube</li>
                  <li><strong>Kanal Pembuat:</strong> Pijar Nusa Edu</li>
                  <li><strong>Tanggal Publikasi:</strong> 25 September 2026 (Terverifikasi)</li>
                  <li><strong>ID Video:</strong> {YOUTUBE_VIDEO_ID}</li>
                  <li>
                    <strong>Tautan Resmi:</strong>{' '}
                    <a
                      href={YOUTUBE_WATCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 underline font-bold"
                    >
                      {YOUTUBE_WATCH_URL}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Kurikulum & Buku IPAS */}
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
                <span className="font-black text-emerald-900 block mb-1 uppercase tracking-wide">
                  2. Buku Rujukan Resmi Kurikulum Merdeka:
                </span>
                <ul className="space-y-1">
                  <li><strong>Mata Pelajaran:</strong> Ilmu Pengetahuan Alam dan Sosial (IPAS)</li>
                  <li><strong>Tingkat:</strong> SD / MI Kelas IV — Fase B</li>
                  <li><strong>Bab / Topik:</strong> Bab 3 “Di Sini Tempat Tinggalku”, Topik A “Mengenal Peta”</li>
                  <li><strong>Penerbit:</strong> Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
              {onOpenBibliography ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowSourceModal(false);
                    onOpenBibliography();
                  }}
                  className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <BookmarkCheck className="w-3.5 h-3.5 text-sky-700" />
                  <span>Lihat Daftar Pustaka Lengkap ➔</span>
                </button>
              ) : <div />}
              <button
                type="button"
                onClick={() => setShowSourceModal(false)}
                className="px-5 py-2 bg-[#123D68] hover:bg-sky-900 text-white font-black text-xs rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
