import React, { useState, useEffect } from 'react';
import { LEARNING_OBJECTIVES, LearningObjective } from '../../data/learningObjectives';
import { audioManager } from '../../utils/audio';
import {
  Target,
  CheckCircle2,
  Volume2,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface LearningObjectivesViewProps {
  onStartInquiry: () => void;
  onStartReading: () => void;
}

const STORAGE_KEY_CHECKED_OBJECTIVES = 'grow_puzzle_objectives_checked_v1';

export const LearningObjectivesView: React.FC<LearningObjectivesViewProps> = ({
  onStartInquiry,
  onStartReading,
}) => {
  const [checkedIds, setCheckedIds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKED_OBJECTIVES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeReadingId, setActiveReadingId] = useState<number | null>(null);

  const toggleCheck = (id: number) => {
    audioManager.playClickSound();
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY_CHECKED_OBJECTIVES, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      if (next.length === LEARNING_OBJECTIVES.length) {
        audioManager.playCorrectSound();
      }
      return next;
    });
  };

  const handleSpeakObjective = (obj: LearningObjective) => {
    if (activeReadingId === obj.id) {
      audioManager.stopSpeech();
      setActiveReadingId(null);
      return;
    }
    setActiveReadingId(obj.id);
    const text = `${obj.badge}: ${obj.title}. ${obj.childFriendlyText}`;
    audioManager.speak(text, () => setActiveReadingId(null));
  };

  return (
    <div className="space-y-6 animate-fade-in font-nunito">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-emerald-50 rounded-3xl p-5 sm:p-7 border-3 border-amber-300 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF9E7] border-2 border-amber-400 flex items-center justify-center text-3xl shadow-xs shrink-0">
              🎯
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wide mb-1">
                <span>Kurikulum Merdeka — IPAS Kelas IV Bab 3 Topik A</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-fredoka text-[#123D68]">
                Tujuan Pembelajaran Mengenal Peta
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-0.5">
                Target capaian kompetensi petualang cilik kelas IV B setelah belajar bersama.
              </p>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="bg-white/90 p-3 sm:p-4 rounded-2xl border-2 border-sky-200 text-center min-w-[200px] shadow-xs">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
              Kemajuan Pemahamanmu
            </span>
            <div className="flex items-center justify-center gap-1.5 my-1">
              <span className="text-xl sm:text-2xl font-black font-fredoka text-[#21A447]">
                {checkedIds.length}
              </span>
              <span className="text-sm text-slate-400 font-bold">/ 4 Tercapai</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${(checkedIds.length / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Learning Objectives Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {LEARNING_OBJECTIVES.map((obj) => {
          const isChecked = checkedIds.includes(obj.id);
          const isReading = activeReadingId === obj.id;

          return (
            <div
              key={obj.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border-3 transition-all shadow-md hover:shadow-lg flex flex-col justify-between ${
                isChecked
                  ? 'border-emerald-400 bg-emerald-50/20'
                  : 'border-sky-200 hover:border-amber-300'
              }`}
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">{obj.icon}</span>
                    <span className="bg-[#123D68] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                      {obj.badge}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeakObjective(obj)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold ${
                      isReading
                        ? 'bg-rose-100 text-rose-700 animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    title="Dengarkan pembacaan tujuan"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {isReading ? 'Membaca...' : 'Dengar'}
                    </span>
                  </button>
                </div>

                <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68] mb-2">
                  {obj.title}
                </h3>

                {/* Child Friendly Main Text */}
                <div className="bg-sky-50/70 p-3.5 rounded-2xl border border-sky-100 mb-3">
                  <p className="text-xs sm:text-sm font-extrabold text-sky-950 leading-relaxed">
                    “ {obj.childFriendlyText} ”
                  </p>
                </div>

                {/* Criteria Checklist */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Kriteria Bukti Belajar:
                  </span>
                  {obj.criteria.map((crit, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-start gap-2 text-xs text-slate-700 font-semibold"
                    >
                      <span className="text-emerald-600 font-bold mt-0.5">•</span>
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action: Growth Mindset Tip & Self-Check Toggle */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 text-[11px] text-amber-900 bg-[#FFF9E7] p-2 rounded-xl mb-3 border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-bold">{obj.growthMindsetTip}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleCheck(obj.id)}
                  className={`w-full py-2.5 px-3 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-[#21A447] text-white shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isChecked ? 'Aku Sudah Paham! ✓' : 'Tandai Jika Sudah Paham'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Next Steps */}
      <div className="bg-white rounded-3xl p-5 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="font-black font-fredoka text-base text-[#123D68]">
            Siap Memulai Petualangan Belajar?
          </h4>
          <p className="text-xs text-slate-500 font-medium">
            Mulai dari Pertanyaan Pemantik untuk mengasah rasa ingin tahu, atau langsung Jelajah Materi!
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onStartInquiry();
            }}
            className="bg-[#FF9F1C] hover:bg-orange-600 text-white font-fredoka font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm border-b-3 border-orange-700 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>💡 Pertanyaan Pemantik</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onStartReading();
            }}
            className="bg-[#21A447] hover:bg-emerald-600 text-white font-fredoka font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm border-b-3 border-emerald-800 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Buka Jelajah Materi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
