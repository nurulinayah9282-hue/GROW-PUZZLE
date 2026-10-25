import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, RotateCcw, BookOpen, Volume2, ArrowRight, MapPin } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  questionNumber: number;
  explanation: string;
  hint: string;
  guidingFeedback?: string;
  newPieceUnlocked?: string | null;
  onRetry: () => void;
  onNextQuestion: () => void;
  onBackToBoard: () => void;
  onOpenMaterial: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  questionNumber,
  explanation,
  hint,
  guidingFeedback,
  newPieceUnlocked,
  onRetry,
  onNextQuestion,
  onBackToBoard,
  onOpenMaterial,
}) => {
  useEffect(() => {
    if (isOpen) {
      if (isCorrect) {
        audioManager.playCorrectSound();
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas-confetti unavailable
        }
      } else {
        audioManager.playEncouragingSound();
      }
    }
  }, [isOpen, isCorrect]);

  if (!isOpen) return null;

  const guidanceText = guidingFeedback || hint;

  const handleSpeakFeedback = () => {
    const text = isCorrect
      ? `Tepat! Kamu berhasil menggunakan informasi pada peta. ${explanation}`
      : `Belum tepat. Coba pikirkan kembali. ${guidanceText}`;
    audioManager.speak(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div
        className={`bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full border-4 shadow-2xl animate-pop text-center relative overflow-hidden ${
          isCorrect ? 'border-emerald-400' : 'border-amber-400'
        }`}
      >
        {/* Header icon */}
        <div className="mb-2">
          {isCorrect ? (
            <div className="w-16 h-16 bg-emerald-100 rounded-3xl border-3 border-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-md animate-bounce">
              🌟
            </div>
          ) : (
            <div className="w-16 h-16 bg-amber-100 rounded-3xl border-3 border-amber-400 flex items-center justify-center text-3xl mx-auto shadow-md">
              🌱
            </div>
          )}
        </div>

        {/* Title */}
        <h3
          className={`text-xl sm:text-2xl font-extrabold font-fredoka mb-1 ${
            isCorrect ? 'text-[#21A447]' : 'text-[#FF9F1C]'
          }`}
        >
          {isCorrect ? 'Hebat! Jawabanmu Tepat!' : 'Belum Tepat, Coba Pikirkan Kembali'}
        </h3>

        {/* Positive Subtitle */}
        <p className="text-xs sm:text-sm font-bold text-slate-600 mb-3.5">
          {isCorrect
            ? '“Tepat! Kamu berhasil menggunakan informasi pada peta. Perhatikan bagaimana posisi, arah, atau skala membantu kita mengambil keputusan.”'
            : '“Belum tepat. Periksa kembali informasi pada soal dan pikirkan hubungan antara petunjuk yang tersedia.”'}
        </p>

        {/* Explanation / Guiding Feedback Box */}
        <div
          className={`rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-left font-medium leading-relaxed mb-4 border-2 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-1.5 font-black mb-1.5">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-900">Pembahasan &amp; Langkah Penyelesaian:</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-amber-900">Bimbingan Meninjau Informasi:</span>
              </>
            )}
          </div>
          <p className="whitespace-pre-line text-slate-800">
            {isCorrect ? explanation : guidanceText}
          </p>
        </div>

        {/* Unlocked Reward Box */}
        {isCorrect && (
          <div className="bg-[#FFF9E7] border-2 border-amber-300 rounded-2xl p-2.5 mb-4 flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#123D68]">
            <span className="flex items-center gap-1.5">
              <span>⭐</span>
              <span>+10 Poin Bertambah!</span>
            </span>
            {newPieceUnlocked && (
              <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs">
                🧩 Keping: “{newPieceUnlocked}”
              </span>
            )}
          </div>
        )}

        {/* Audio helper button */}
        <button
          type="button"
          onClick={handleSpeakFeedback}
          className="inline-flex items-center gap-1.5 text-xs text-sky-700 font-bold mb-4 hover:underline cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Dengarkan Ulasan Suara 🔊</span>
        </button>

        {/* Action Buttons */}
        {isCorrect ? (
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onBackToBoard}
              className="flex-1 py-3 px-4 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MapPin className="w-4 h-4" />
              <span>Kembali ke Peta</span>
            </button>
            <button
              type="button"
              onClick={onNextQuestion}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#21A447] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md border-b-3 border-emerald-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{questionNumber < 25 ? 'Soal Berikutnya' : 'Selesai & Buka Puzzle'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={onRetry}
              className="w-full py-3 px-6 rounded-2xl bg-[#FF9F1C] hover:bg-amber-600 text-white font-fredoka font-bold text-base shadow-md border-b-3 border-amber-800 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>COBA PIKIRKAN LAGI</span>
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onOpenMaterial}
                className="flex-1 py-2 px-3 rounded-xl bg-white border-2 border-sky-300 text-sky-800 font-bold text-xs hover:bg-sky-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buka Rangkuman Materi</span>
              </button>
              <button
                type="button"
                onClick={onBackToBoard}
                className="flex-1 py-2 px-3 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Pilih Pos di Peta</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
