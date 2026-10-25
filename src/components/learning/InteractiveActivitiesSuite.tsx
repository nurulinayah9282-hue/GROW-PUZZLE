import React, { useState } from 'react';
import { audioManager } from '../../utils/audio';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Compass,
  MapPin,
  HelpCircle,
  ArrowRight,
  Award,
} from 'lucide-react';

interface InteractiveActivitiesSuiteProps {
  onGoToBoard: () => void;
}

export const InteractiveActivitiesSuite: React.FC<InteractiveActivitiesSuiteProps> = ({
  onGoToBoard,
}) => {
  const [activeGameTab, setActiveGameTab] = useState<1 | 2 | 3 | 4 | 5>(1);

  // --- GAME 1: MATCHING SYMBOLS ---
  const [game1SelectedSymbol, setGame1SelectedSymbol] = useState<string | null>(null);
  const [game1Matches, setGame1Matches] = useState<Record<string, string>>({});
  const [game1Score, setGame1Score] = useState<number>(0);

  const SYMBOLS_BANK = [
    { id: 'sym_masjid', icon: '🕌', name: 'Simbol Masjid', type: 'Titik' },
    { id: 'sym_hospital', icon: '🏥', name: 'Rumah Sakit (H)', type: 'Titik' },
    { id: 'sym_gunung_aktif', icon: '🔺', name: 'Segitiga Merah', type: 'Khusus' },
    { id: 'sym_sungai', icon: '〰️', name: 'Garis Biru Berkelok', type: 'Garis' },
    { id: 'sym_hutan', icon: '🌲', name: 'Kawasan Hijau Lebat', type: 'Area' },
  ];

  const MEANINGS_BANK = [
    { id: 'm_gunung', targetSymId: 'sym_gunung_aktif', text: 'Gunung Berapi yang Masih Aktif' },
    { id: 'm_masjid', targetSymId: 'sym_masjid', text: 'Tempat Ibadah / Bangunan Masjid' },
    { id: 'm_hutan', targetSymId: 'sym_hutan', text: 'Kawasan Hutan Lindung (Simbol Area)' },
    { id: 'm_hospital', targetSymId: 'sym_hospital', text: 'Fasilitas Medis / Layanan Kesehatan' },
    { id: 'm_sungai', targetSymId: 'sym_sungai', text: 'Aliran Sungai Mengalir (Simbol Garis)' },
  ];

  const handleMatchClick = (meaning: typeof MEANINGS_BANK[0]) => {
    if (!game1SelectedSymbol) return;
    if (meaning.targetSymId === game1SelectedSymbol) {
      audioManager.playCorrectSound();
      setGame1Matches((prev) => ({ ...prev, [game1SelectedSymbol]: meaning.id }));
      setGame1Score((prev) => prev + 1);
      setGame1SelectedSymbol(null);
    } else {
      audioManager.playEncouragingSound();
    }
  };

  const handleResetGame1 = () => {
    audioManager.playClickSound();
    setGame1Matches({});
    setGame1Score(0);
    setGame1SelectedSymbol(null);
  };

  // --- GAME 2: DIRECTION MASTER ---
  const [compassTargetAngle, setCompassTargetAngle] = useState<number>(0);
  const [game2Answered, setGame2Answered] = useState<boolean>(false);
  const [game2IsCorrect, setGame2IsCorrect] = useState<boolean>(false);

  const DIRECTION_QUESTIONS = [
    {
      q: 'Jika kamu menghadap ke arah UTARA, maka tangan kananmu menunjuk ke arah...',
      options: ['Barat', 'Timur', 'Selatan', 'Barat Daya'],
      correct: 'Timur',
      angle: 90,
      explanation: 'Benar sekali! Saat menghadap ke Utara (atas), kananmu adalah Timur (90°) dan kirimu adalah Barat.',
    },
    {
      q: 'Arah mata angin yang berada di antara arah UTARA dan arah TIMUR dinamakan...',
      options: ['Tenggara', 'Timur Laut', 'Barat Laut', 'Barat Daya'],
      correct: 'Timur Laut',
      angle: 45,
      explanation: 'Tepat sasaran! Utara (0°) + Timur (90°) = Timur Laut (45°).',
    },
    {
      q: 'Matahari terbit di sebelah Timur dan tenggelam di sebelah...',
      options: ['Utara', 'Selatan', 'Barat', 'Tenggara'],
      correct: 'Barat',
      angle: 270,
      explanation: 'Pintar! Bumi berputar dari barat ke timur sehingga matahari tampak terbenam di ufuk Barat (270°).',
    },
  ];
  const [g2QIndex, setG2QIndex] = useState<number>(0);
  const currentG2 = DIRECTION_QUESTIONS[g2QIndex];

  const handleG2Answer = (opt: string) => {
    if (game2Answered) return;
    const isCorrect = opt === currentG2.correct;
    setGame2Answered(true);
    setGame2IsCorrect(isCorrect);
    setCompassTargetAngle(currentG2.angle);
    if (isCorrect) {
      audioManager.playCorrectSound();
    } else {
      audioManager.playEncouragingSound();
    }
  };

  const handleNextG2 = () => {
    audioManager.playClickSound();
    setGame2Answered(false);
    setCompassTargetAngle(0);
    setG2QIndex((prev) => (prev + 1) % DIRECTION_QUESTIONS.length);
  };

  // --- GAME 3: VILLAGE MAP DETECTIVE ---
  const [g3Target, setG3Target] = useState<'sekolah' | 'danau' | 'balai_desa' | 'puskesmas' | 'lapangan'>('sekolah');
  const [g3Found, setG3Found] = useState<string[]>([]);
  const [g3Feedback, setG3Feedback] = useState<string>('Misi: Temukan gedung SDN Nusantara di titik tengah desa!');

  const handleVillageClick = (targetClicked: 'sekolah' | 'danau' | 'balai_desa' | 'puskesmas' | 'lapangan') => {
    if (targetClicked === g3Target) {
      audioManager.playCorrectSound();
      setG3Found((prev) => [...prev, targetClicked]);
      if (targetClicked === 'sekolah') {
        setG3Feedback('🎉 Hebat! Kamu menemukan SDN Nusantara. Sekarang cari Danau Biru di pojok Barat Daya!');
        setG3Target('danau');
      } else if (targetClicked === 'danau') {
        setG3Feedback('🎉 Luar biasa! Danau Biru ditemukan. Sekarang cari Balai Desa di sebelah Timur!');
        setG3Target('balai_desa');
      } else if (targetClicked === 'balai_desa') {
        setG3Feedback('🎉 Pintar! Balai Desa ditemukan. Misi terakhir: temukan Lapangan Sepak Bola di sebelah Utara!');
        setG3Target('lapangan');
      } else {
        setG3Feedback('🏆 SEMPURNA! Seluruh misi detektif peta desa berhasil kamu tuntaskan!');
      }
    } else {
      audioManager.playEncouragingSound();
      setG3Feedback('Kurang pas! Cek kembali arah mata angin dan coba klik lokasi yang diminta.');
    }
  };

  // --- GAME 4: COMPONENT IDENTIFIER ---
  const [g4Answer, setG4Answer] = useState<number | null>(null);
  const G4_QUESTION = {
    q: 'Di pojok kiri bawah peta terdapat gambar kecil seluruh kepulauan Indonesia dengan kotak merah menandai pulau yang sedang dipetakan. Komponen apakah itu?',
    options: ['Garis Astronomis', 'Inset Peta', 'Skala Batang', 'Lettering'],
    correct: 1,
    explanation: 'Sangat tepat! Inset peta adalah peta berukuran kecil untuk memperjelas kedudukan daerah yang dipetakan terhadap wilayah sekitarnya yang lebih luas.',
  };

  // --- GAME 5: SAFE ROUTE CHALLENGE ---
  const [g5Choice, setG5Choice] = useState<'merah' | 'hijau' | null>(null);

  return (
    <div className="space-y-6 animate-fade-in font-nunito">
      {/* Activity Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9E7] border-2 border-amber-400 flex items-center justify-center text-2xl shadow-xs">
              🎮
            </div>
            <div>
              <span className="bg-[#21A447] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                Latihan Praktik Interaktif
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-fredoka text-[#123D68]">
                Aktivitas Belajar Mengenal Peta
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToBoard}
            className="bg-[#21A447] hover:bg-emerald-600 text-white font-fredoka font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm border-b-3 border-emerald-800 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Terapkan di Peta Petualangan 🗺️</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Game Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-4 border-t border-slate-100">
          {[
            { id: 1, label: '1. Cocokkan Simbol', icon: '🧩' },
            { id: 2, label: '2. Kompas Mata Angin', icon: '🧭' },
            { id: 3, label: '3. Detektif Peta Desa', icon: '📍' },
            { id: 4, label: '4. Komponen Peta', icon: '📋' },
            { id: 5, label: '5. Rute Aman Sekolah', icon: '🌉' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.playClickSound();
                setActiveGameTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                activeGameTab === tab.id
                  ? 'bg-[#123D68] text-white shadow-xs scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- GAME 1 CONTENT --- */}
      {activeGameTab === 1 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-sky-300 shadow-md animate-fade-in">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68]">
                Aktivitas 1: Cocokkan Simbol Peta dengan Artinya
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                1. Klik satu simbol di kolom kiri. 2. Klik arti yang sesuai di kolom kanan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                Skor: {game1Score} / 5
              </span>
              <button
                type="button"
                onClick={handleResetGame1}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 cursor-pointer"
                title="Ulangi Game"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Left: Symbols */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                Kolom Simbol Peta:
              </span>
              {SYMBOLS_BANK.map((sym) => {
                const isMatched = !!game1Matches[sym.id];
                const isSelected = game1SelectedSymbol === sym.id;
                return (
                  <button
                    key={sym.id}
                    disabled={isMatched}
                    onClick={() => {
                      audioManager.playClickSound();
                      setGame1SelectedSymbol(sym.id);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-60'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-300'
                        : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sym.icon}</span>
                      <span className="font-extrabold text-xs sm:text-sm">{sym.name}</span>
                    </div>
                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md font-bold text-slate-600">
                        {sym.type}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Meanings */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
                Kolom Arti Simbol:
              </span>
              {MEANINGS_BANK.map((m) => {
                const isMatched = Object.values(game1Matches).includes(m.id);
                return (
                  <button
                    key={m.id}
                    disabled={isMatched}
                    onClick={() => handleMatchClick(m)}
                    className={`w-full text-left p-3 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 opacity-60'
                        : game1SelectedSymbol
                        ? 'bg-sky-50/70 hover:bg-amber-100 border-sky-300 hover:border-amber-400 cursor-pointer'
                        : 'bg-slate-50 border-slate-200 text-slate-600 opacity-80'
                    }`}
                  >
                    <span className="font-bold text-xs sm:text-sm">{m.text}</span>
                    {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {game1Score === 5 && (
            <div className="mt-5 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-black text-center animate-pop">
              🎉 Luar biasa! Seluruh 5 simbol peta berhasil dicocokkan dengan sempurna!
            </div>
          )}
        </div>
      )}

      {/* --- GAME 2 CONTENT --- */}
      {activeGameTab === 2 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-amber-300 shadow-md animate-fade-in">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68]">
                Aktivitas 2: Duel Jarum Kompas & Arah Mata Angin
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Soal {g2QIndex + 1} dari {DIRECTION_QUESTIONS.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual Rotating Compass */}
            <div className="flex flex-col items-center bg-sky-50/70 p-4 rounded-3xl border-2 border-sky-200">
              <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-md">
                <circle cx="100" cy="100" r="90" fill="#FFFFFF" stroke="#0284C7" strokeWidth="4" />
                <circle cx="100" cy="100" r="82" fill="#F0F9FF" stroke="#F59E0B" strokeWidth="2" />
                {/* Labels */}
                <text x="100" y="24" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="900">U</text>
                <text x="178" y="105" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="900">T</text>
                <text x="100" y="185" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="900">S</text>
                <text x="22" y="105" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="900">B</text>
                {/* Animated Needle */}
                <g transform={`rotate(${compassTargetAngle} 100 100)`} className="transition-transform duration-700">
                  <polygon points="100,32 107,100 100,94 93,100" fill="#EF4444" />
                  <polygon points="100,168 107,100 100,106 93,100" fill="#64748B" />
                  <circle cx="100" cy="100" r="7" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
                </g>
              </svg>
              <span className="text-xs font-black text-[#123D68] mt-2">
                Sudut Kompas: {compassTargetAngle}°
              </span>
            </div>

            {/* Question & Options */}
            <div>
              <p className="text-sm sm:text-base font-extrabold text-[#123D68] mb-4 bg-amber-50 p-3.5 rounded-2xl border border-amber-200">
                {currentG2.q}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {currentG2.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleG2Answer(opt)}
                    className="p-3 bg-slate-50 hover:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 rounded-2xl font-black text-xs sm:text-sm text-[#123D68] transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {game2Answered && (
                <div
                  className={`p-3 rounded-2xl text-xs font-bold mb-3 animate-pop ${
                    game2IsCorrect
                      ? 'bg-emerald-100 text-emerald-950 border border-emerald-400'
                      : 'bg-amber-100 text-amber-950 border border-amber-400'
                  }`}
                >
                  {game2IsCorrect ? `🎉 ${currentG2.explanation}` : 'Belum pas, perhatikan perputaran kompasnya ya!'}
                </div>
              )}

              {game2Answered && (
                <button
                  type="button"
                  onClick={handleNextG2}
                  className="w-full bg-[#123D68] hover:bg-sky-900 text-white font-black text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Soal Berikutnya ➔
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- GAME 3 CONTENT --- */}
      {activeGameTab === 3 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-emerald-300 shadow-md animate-fade-in">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68]">
                Aktivitas 3: Detektif Cari Lokasi di Peta Desa
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Klik langsung bangunan atau kenampakan pada peta desa interaktif di bawah:
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl text-xs sm:text-sm font-extrabold text-amber-950 mb-4 animate-pop">
            🔍 {g3Feedback}
          </div>

          {/* Interactive Village Clickable Map */}
          <div className="relative w-full aspect-[16/9] max-h-80 bg-[#DCFCE7] rounded-3xl border-3 border-emerald-400 overflow-hidden shadow-inner flex items-center justify-center p-3 select-none">
            {/* Stream */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 400 220" className="w-full h-full">
                <path d="M 0,40 Q 150,120 220,90 T 400,180" fill="none" stroke="#38BDF8" strokeWidth="22" />
                <path d="M 200,0 L 200,220" stroke="#FDE68A" strokeWidth="16" />
                <path d="M 0,110 L 400,110" stroke="#FDE68A" strokeWidth="16" />
              </svg>
            </div>

            {/* Clickable Landmarks */}
            {/* Lapangan (Utara) */}
            <button
              onClick={() => handleVillageClick('lapangan')}
              className="absolute top-[8%] left-[45%] bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-xl font-black text-xs shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform"
            >
              ⚽ Lapangan Sepak Bola
            </button>

            {/* Sekolah (Tengah) */}
            <button
              onClick={() => handleVillageClick('sekolah')}
              className="absolute top-[42%] left-[40%] bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-xl border-2 border-amber-300 cursor-pointer hover:scale-110 transition-transform animate-bounce"
            >
              🏫 SDN Nusantara (Pusat)
            </button>

            {/* Danau (Pojok Kiri Bawah) */}
            <button
              onClick={() => handleVillageClick('danau')}
              className="absolute bottom-[10%] left-[8%] bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-2xl font-black text-xs shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform"
            >
              🌊 Danau Biru (Barat Daya)
            </button>

            {/* Balai Desa (Timur) */}
            <button
              onClick={() => handleVillageClick('balai_desa')}
              className="absolute top-[44%] right-[5%] bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl font-black text-xs shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform"
            >
              🏛️ Balai Desa
            </button>
          </div>
        </div>
      )}

      {/* --- GAME 4 CONTENT --- */}
      {activeGameTab === 4 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-purple-300 shadow-md animate-fade-in">
          <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68] mb-2">
            Aktivitas 4: Memilih Komponen Peta yang Sesuai
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-4">
            Uji ketelitianmu mengidentifikasi bagian-bagian peta.
          </p>

          <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 mb-4">
            <p className="text-xs sm:text-sm font-extrabold text-sky-950">
              {G4_QUESTION.q}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
            {G4_QUESTION.options.map((opt, idx) => {
              const isSelected = g4Answer === idx;
              const isCorrect = idx === G4_QUESTION.correct;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.playClickSound();
                    setG4Answer(idx);
                    if (isCorrect) {
                      audioManager.playCorrectSound();
                    } else {
                      audioManager.playEncouragingSound();
                    }
                  }}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-black border-2 transition-all cursor-pointer ${
                    isSelected
                      ? isCorrect
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                        : 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {g4Answer !== null && (
            <div
              className={`p-3 rounded-2xl text-xs font-bold animate-pop ${
                g4Answer === G4_QUESTION.correct
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  : 'bg-amber-100 text-amber-950 border border-amber-300'
              }`}
            >
              {g4Answer === G4_QUESTION.correct
                ? `🎉 ${G4_QUESTION.explanation}`
                : 'Coba tebak lagi! Peta kecil penyisip dinamakan Inset.'}
            </div>
          )}
        </div>
      )}

      {/* --- GAME 5 CONTENT --- */}
      {activeGameTab === 5 && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-orange-300 shadow-md animate-fade-in">
          <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68] mb-2">
            Aktivitas 5: Tantangan Rute Aman Anak Sekolah
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-4">
            Budi ingin berangkat ke sekolah. Sungai desa sedang meluap dan Jembatan Kayu Tua rusak (❌). Jalur mana yang harus Budi pilih?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => {
                audioManager.playEncouragingSound();
                setG5Choice('merah');
              }}
              className={`p-4 rounded-3xl border-3 text-left transition-all cursor-pointer ${
                g5Choice === 'merah'
                  ? 'bg-rose-100 border-rose-500 text-rose-950'
                  : 'bg-rose-50/50 hover:bg-rose-100 border-rose-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⛔</span>
                <span className="font-black text-sm text-rose-800">Rute Merah (200 m)</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Melewati Jembatan Kayu Tua yang bertanda silang merah.
              </p>
            </button>

            <button
              onClick={() => {
                audioManager.playCorrectSound();
                setG5Choice('hijau');
              }}
              className={`p-4 rounded-3xl border-3 text-left transition-all cursor-pointer ${
                g5Choice === 'hijau'
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950'
                  : 'bg-emerald-50/50 hover:bg-emerald-100 border-emerald-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✅</span>
                <span className="font-black text-sm text-emerald-800">Rute Hijau (400 m)</span>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                Memutar lewat Jalan Raya Desa yang beraspal aman & Jembatan Beton Kokoh.
              </p>
            </button>
          </div>

          {g5Choice && (
            <div
              className={`p-3.5 rounded-2xl text-xs sm:text-sm font-bold animate-pop ${
                g5Choice === 'hijau'
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-400'
                  : 'bg-rose-100 text-rose-950 border border-rose-400'
              }`}
            >
              {g5Choice === 'hijau'
                ? '🎉 Pilihan cerdas! Rute hijau lebih aman karena jembatan beton tidak berbahaya. Keselamatan petualang adalah yang paling utama!'
                : 'Bahaya! Jembatan kayu sedang diperbaiki dan licin. Pilihlah rute yang aman meskipun sedikit lebih memutar.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
