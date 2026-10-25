import React, { useState, useEffect } from 'react';
import { INQUIRY_QUESTIONS, InquiryQuestion } from '../../data/inquiryQuestions';
import { audioManager } from '../../utils/audio';
import {
  HelpCircle,
  Sparkles,
  Send,
  Volume2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  MessageSquare,
  Smile,
} from 'lucide-react';

interface InquiryQuestionsViewProps {
  onContinueToMaterial: () => void;
}

const STORAGE_KEY_INQUIRY = 'grow_puzzle_inquiry_answers_v1';

export const InquiryQuestionsView: React.FC<InquiryQuestionsViewProps> = ({
  onContinueToMaterial,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRY);
      return saved ? JSON.parse(saved).options || {} : {};
    } catch {
      return {};
    }
  });

  const [textAnswers, setTextAnswers] = useState<Record<string, string>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INQUIRY);
      return saved ? JSON.parse(saved).texts || {} : {};
    } catch {
      return {};
    }
  });

  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  const saveAnswersToStorage = (
    newOpts: Record<string, string>,
    newTexts: Record<string, string>
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY_INQUIRY,
        JSON.stringify({ options: newOpts, texts: newTexts, lastUpdated: new Date().toISOString() })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    audioManager.playClickSound();
    const updated = {
      ...selectedOptions,
      [questionId]: optionId,
    };
    setSelectedOptions(updated);
    saveAnswersToStorage(updated, textAnswers);
  };

  const handleTextChange = (questionId: string, val: string) => {
    const updated = {
      ...textAnswers,
      [questionId]: val,
    };
    setTextAnswers(updated);
    saveAnswersToStorage(selectedOptions, updated);
  };

  const handleSaveTextAnswer = (questionId: string) => {
    audioManager.playCorrectSound();
    setSavedStatus((prev) => ({ ...prev, [questionId]: true }));
    saveAnswersToStorage(selectedOptions, textAnswers);
    setTimeout(() => {
      setSavedStatus((prev) => ({ ...prev, [questionId]: false }));
    }, 2500);
  };

  const handleSpeakQuestion = (q: InquiryQuestion) => {
    audioManager.speak(q.question);
  };

  const mainQuestion = INQUIRY_QUESTIONS.find((q) => q.isMain)!;
  const supportingQuestions = INQUIRY_QUESTIONS.filter((q) => !q.isMain);

  return (
    <div className="space-y-6 animate-fade-in font-nunito">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs border-2 border-white/40 flex items-center justify-center text-3xl shadow-sm shrink-0">
              💡
            </div>
            <div>
              <span className="bg-white/25 text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wide inline-block mb-1">
                Apersepsi & Pemantik Rasa Ingin Tahu
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-fredoka text-white">
                Pertanyaan Pemantik Belajar
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 font-semibold mt-0.5">
                Bebas berpendapat! Di sini tidak ada jawaban salah, setiap pemikiranmu sangat dihargai.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              audioManager.playClickSound();
              onContinueToMaterial();
            }}
            className="bg-white hover:bg-amber-50 text-[#123D68] font-fredoka font-black text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0 group"
          >
            <span>Lanjut ke Jelajah Materi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Question Highlight Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{mainQuestion.icon}</span>
            <span className="bg-[#FF9F1C] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Pertanyaan Utama
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleSpeakQuestion(mainQuestion)}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Dengarkan pertanyaan dibacakan"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Dengarkan Pertanyaan</span>
          </button>
        </div>

        <h3 className="text-lg sm:text-2xl font-black font-fredoka text-[#123D68] mb-4 leading-snug">
          “ {mainQuestion.question} ”
        </h3>

        {/* Suggestion Options with Growth Mindset Feedback */}
        <div className="space-y-2 mb-4">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
            Pilihlah ide yang paling cocok dengan pemikiranmu:
          </span>
          {mainQuestion.suggestedAnswers.map((ans) => {
            const isSelected = selectedOptions[mainQuestion.id] === ans.id;
            return (
              <div key={ans.id} className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleSelectOption(mainQuestion.id, ans.id)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-200'
                      : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                  </span>
                  <span>{ans.text}</span>
                </button>

                {/* Growth Mindset Warm Feedback */}
                {isSelected && (
                  <div className="ml-8 p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 font-bold animate-pop flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ans.growthFeedback}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Text Area for Student's Own Words */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label className="text-xs font-black text-[#123D68] block mb-1.5 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-sky-600" />
            <span>Punya ide jawaban lain? Tuliskan dengan bahasamu sendiri:</span>
          </label>
          <div className="flex gap-2">
            <textarea
              value={textAnswers[mainQuestion.id] || ''}
              onChange={(e) => handleTextChange(mainQuestion.id, e.target.value)}
              placeholder={mainQuestion.placeholder}
              rows={2}
              className="flex-1 bg-slate-50 border border-slate-200 focus:bg-white focus:border-amber-400 rounded-2xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => handleSaveTextAnswer(mainQuestion.id)}
              className="px-4 py-2 bg-[#123D68] hover:bg-sky-900 text-white rounded-2xl font-black text-xs transition-colors cursor-pointer flex flex-col items-center justify-center gap-1 shrink-0"
              title="Simpan Jawaban"
            >
              <Send className="w-4 h-4" />
              <span>Simpan</span>
            </button>
          </div>
          {savedStatus[mainQuestion.id] && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-1.5 animate-pop">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Idemu berhasil disimpan! Teruslah berpikir kreatif.</span>
            </span>
          )}
        </div>
      </div>

      {/* 5 Supporting Questions Grid */}
      <div>
        <h3 className="text-lg sm:text-xl font-black font-fredoka text-[#123D68] mb-3 flex items-center gap-2">
          <span>🔍</span>
          <span>5 Pertanyaan Pendukung Mengasah Pemahaman:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {supportingQuestions.map((q, idx) => {
            const chosenOpt = selectedOptions[q.id];
            const chosenAnswerObj = q.suggestedAnswers.find((a) => a.id === chosenOpt);

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl p-5 border-2 border-sky-200 hover:border-amber-300 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="bg-sky-100 text-sky-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      Pertanyaan {idx + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSpeakQuestion(q)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                      title="Dengar suara"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-black font-fredoka text-sm sm:text-base text-[#123D68] mb-3 leading-snug">
                    {q.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-1.5 mb-3">
                    {q.suggestedAnswers.map((ans) => {
                      const isSel = chosenOpt === ans.id;
                      return (
                        <button
                          key={ans.id}
                          type="button"
                          onClick={() => handleSelectOption(q.id, ans.id)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSel
                              ? 'bg-amber-100/70 border-amber-500 text-amber-950 font-extrabold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{ans.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {chosenAnswerObj && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-[11px] text-emerald-950 font-bold mb-3 animate-pop flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{chosenAnswerObj.growthFeedback}</span>
                    </div>
                  )}
                </div>

                {/* Open text area */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={textAnswers[q.id] || ''}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder="Atau ketik pendapatmu..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveTextAnswer(q.id)}
                      className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-[10px] font-bold cursor-pointer"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
