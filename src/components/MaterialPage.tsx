import React, { useState, useEffect } from 'react';
import { NavigationPage, MaterialInfographic } from '../types';
import { MATERIAL_LESSONS, MAP_INFOGRAPHICS_GALLERY, GalleryInfographicItem } from '../data/materials';
import { ReferenceVillageMap } from './ReferenceVillageMap';
import { LearningObjectivesView } from './learning/LearningObjectivesView';
import { InquiryQuestionsView } from './learning/InquiryQuestionsView';
import { InteractiveLearningVideo } from './learning/InteractiveLearningVideo';
import { InteractiveActivitiesSuite } from './learning/InteractiveActivitiesSuite';
import { VideoLearningPlayer } from './learning/VideoLearningPlayer';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Image as ImageIcon,
  BookOpen,
  Layers,
  Download,
  Target,
  Lightbulb,
  Gamepad2,
  Film,
  Headphones,
  FileText,
  Eye,
  BookmarkCheck,
} from 'lucide-react';
import { audioManager } from '../utils/audio';

interface MaterialPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export type MaterialMainTab = 'tujuan' | 'pemantik' | 'materi' | 'aktivitas' | 'galeri';
export type LearningMode = 'gabungan' | 'baca' | 'audio' | 'visual' | 'video';

export const MaterialPage: React.FC<MaterialPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<MaterialMainTab>('materi');
  const [learningMode, setLearningMode] = useState<LearningMode>('gabungan');
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.92);
  const [selectedQuickAnswer, setSelectedQuickAnswer] = useState<number | null>(null);
  const [compassAngle, setCompassAngle] = useState<number>(0);

  // Lightbox Modal State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);

  const lesson = MATERIAL_LESSONS[currentLessonIndex];

  // Stop audio speech on cleanup
  useEffect(() => {
    return () => {
      audioManager.stopSpeech();
    };
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        handleNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleReadLesson = () => {
    if (isPlayingAudio) {
      audioManager.stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const sectionsText = lesson.sections.map((s) => `${s.heading}. ${s.content}`).join(' ');
    const fullText = `${lesson.badge}: ${lesson.title}. ${lesson.summary}. ${sectionsText}`;

    setIsPlayingAudio(true);
    audioManager.speak(fullText, () => setIsPlayingAudio(false));
  };

  const handleNextLesson = () => {
    audioManager.stopSpeech();
    setIsPlayingAudio(false);
    setSelectedQuickAnswer(null);
    if (currentLessonIndex < MATERIAL_LESSONS.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    audioManager.stopSpeech();
    setIsPlayingAudio(false);
    setSelectedQuickAnswer(null);
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Open Lightbox
  const openLightboxBySrc = (src: string) => {
    const foundIndex = MAP_INFOGRAPHICS_GALLERY.findIndex((g) => g.src === src);
    if (foundIndex !== -1) {
      setLightboxIndex(foundIndex);
    } else {
      setLightboxIndex(0);
    }
    setLightboxZoom(1);
    audioManager.playClickSound();
  };

  const openLightboxByIndex = (index: number) => {
    setLightboxIndex(index);
    setLightboxZoom(1);
    audioManager.playClickSound();
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setLightboxZoom(1);
    audioManager.playClickSound();
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % MAP_INFOGRAPHICS_GALLERY.length);
    setLightboxZoom(1);
    audioManager.playClickSound();
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + MAP_INFOGRAPHICS_GALLERY.length) % MAP_INFOGRAPHICS_GALLERY.length);
    setLightboxZoom(1);
    audioManager.playClickSound();
  };

  const zoomIn = () => {
    setLightboxZoom((z) => Math.min(z + 0.3, 2.5));
    audioManager.playClickSound();
  };

  const zoomOut = () => {
    setLightboxZoom((z) => Math.max(z - 0.3, 0.7));
    audioManager.playClickSound();
  };

  const currentLightboxItem: GalleryInfographicItem | undefined =
    lightboxIndex !== null ? MAP_INFOGRAPHICS_GALLERY[lightboxIndex] : undefined;

  return (
    <div className="min-h-[calc(100vh-68px)] py-5 sm:py-7 px-3 sm:px-6 bg-transparent select-none font-nunito">
      <div className="max-w-5xl mx-auto">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioManager.stopSpeech();
                audioManager.playClickSound();
                onNavigate('cover');
              }}
              className="flex items-center gap-2 bg-white/95 hover:bg-white text-[#123D68] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl border-2 border-slate-200 shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600" />
              <span>BERANDA</span>
            </button>

            <button
              onClick={() => {
                audioManager.stopSpeech();
                audioManager.playClickSound();
                onNavigate('bibliography');
              }}
              className="flex items-center gap-1.5 bg-white/95 hover:bg-sky-50 text-[#123D68] font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl border-2 border-sky-300 shadow-sm transition-all cursor-pointer"
              title="Buka Daftar Pustaka & Sumber Media"
            >
              <BookmarkCheck className="w-4 h-4 text-sky-600" />
              <span>DAFTAR PUSTAKA</span>
            </button>
          </div>

          {/* Quick Jump to Adventure Game Board */}
          <button
            onClick={() => {
              audioManager.stopSpeech();
              audioManager.playClickSound();
              onNavigate('board');
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#21A447] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-95 text-white font-fredoka font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl shadow-md border-b-3 border-emerald-800 transition-all cursor-pointer"
          >
            <span>LANJUT KE PETA PETUALANGAN (POS 1-25)</span>
            <span>➔</span>
          </button>
        </div>

        {/* 5 Main Sub-Menu Tabs (A, B, C, D, E) */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-2 sm:p-2.5 border-3 border-amber-300 shadow-md mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {/* Tab 1: Tujuan Belajar */}
            <button
              onClick={() => {
                audioManager.playClickSound();
                audioManager.stopSpeech();
                setIsPlayingAudio(false);
                setActiveTab('tujuan');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
                activeTab === 'tujuan'
                  ? 'bg-[#123D68] text-white shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-[#123D68] border border-slate-200'
              }`}
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>Tujuan Belajar</span>
            </button>

            {/* Tab 2: Pertanyaan Pemantik */}
            <button
              onClick={() => {
                audioManager.playClickSound();
                audioManager.stopSpeech();
                setIsPlayingAudio(false);
                setActiveTab('pemantik');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
                activeTab === 'pemantik'
                  ? 'bg-[#FF9F1C] text-white shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-[#123D68] border border-slate-200'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Pertanyaan Pemantik</span>
            </button>

            {/* Tab 3: Jelajah Materi */}
            <button
              onClick={() => {
                audioManager.playClickSound();
                setActiveTab('materi');
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
                activeTab === 'materi'
                  ? 'bg-[#21A447] text-white shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-[#123D68] border border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Jelajah Materi (5 Mode)</span>
            </button>

            {/* Tab 4: Aktivitas Interaktif */}
            <button
              onClick={() => {
                audioManager.playClickSound();
                audioManager.stopSpeech();
                setIsPlayingAudio(false);
                setActiveTab('aktivitas');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
                activeTab === 'aktivitas'
                  ? 'bg-purple-600 text-white shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-[#123D68] border border-slate-200'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Aktivitas Interaktif</span>
            </button>

            {/* Tab 5: Galeri 6 Poster */}
            <button
              onClick={() => {
                audioManager.playClickSound();
                audioManager.stopSpeech();
                setIsPlayingAudio(false);
                setActiveTab('galeri');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all shrink-0 cursor-pointer ${
                activeTab === 'galeri'
                  ? 'bg-sky-600 text-white shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-[#123D68] border border-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Galeri 6 Poster 🖼️</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TUJUAN PEMBELAJARAN */}
        {activeTab === 'tujuan' && (
          <LearningObjectivesView
            onStartInquiry={() => setActiveTab('pemantik')}
            onStartReading={() => setActiveTab('materi')}
          />
        )}

        {/* TAB 2: PERTANYAAN PEMANTIK */}
        {activeTab === 'pemantik' && (
          <InquiryQuestionsView
            onContinueToMaterial={() => setActiveTab('materi')}
          />
        )}

        {/* TAB 4: AKTIVITAS INTERAKTIF */}
        {activeTab === 'aktivitas' && (
          <InteractiveActivitiesSuite
            onGoToBoard={() => onNavigate('board')}
          />
        )}

        {/* TAB 5: GALERI 6 POSTER EDUKASI */}
        {activeTab === 'galeri' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🖼️</span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-fredoka text-[#123D68]">
                  Galeri 6 Lembar Poster Edukasi Peta
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Koleksi lengkap 6 poster infografis IPAS Fase B Kelas IV. Klik poster mana saja untuk membuka tampilan layar penuh, memperbesar tulisan (*zoom in*), dan membaca detail komponen peta!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MAP_INFOGRAPHICS_GALLERY.map((poster, pIdx) => (
                <div
                  key={poster.id}
                  onClick={() => openLightboxByIndex(pIdx)}
                  className="bg-white rounded-3xl p-4 sm:p-5 border-3 border-sky-200 hover:border-amber-400 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="bg-[#21A447] text-white text-[11px] font-black px-3 py-1 rounded-full shadow-xs">
                        {poster.badge}
                      </span>
                      <span className="text-[11px] font-extrabold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        Poster #{poster.number}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold font-fredoka text-[#123D68] group-hover:text-emerald-700 transition-colors">
                      {poster.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-semibold mb-3">
                      {poster.subtitle}
                    </p>

                    <div className="relative w-full aspect-[1491/1055] bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-amber-300 shadow-inner mb-3">
                      <img
                        src={poster.src}
                        alt={poster.alt}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-sky-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 text-[#123D68] font-black text-xs px-3.5 py-1.5 rounded-xl shadow-lg border border-amber-300 flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Perbesar Poster</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed mb-3">
                      {poster.description}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightboxByIndex(pIdx);
                      }}
                      className="w-full bg-[#123D68] group-hover:bg-[#21A447] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Buka Poster Ukuran Penuh</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: JELAJAH MATERI (WITH 5 LEARNING MODES) */}
        {activeTab === 'materi' && (
          <div className="space-y-5 animate-fade-in">
            {/* 5 Learning Modes Switcher Deck */}
            <div className="bg-white/95 rounded-3xl p-3.5 sm:p-4 border-3 border-emerald-300 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎒</span>
                  <div>
                    <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wide block">
                      Pilihan Gaya Belajarmu:
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#123D68]">
                      Pilih cara belajar yang paling nyaman untukmu hari ini:
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto w-full sm:w-auto">
                  {[
                    { id: 'gabungan', label: '✨ Gabungan', desc: 'Teks, Audio, & Gambar' },
                    { id: 'baca', label: '📑 Mode Baca', desc: 'Teks Ringkas' },
                    { id: 'audio', label: '🔊 Mode Audio', desc: 'Mendengarkan Narasi' },
                    { id: 'visual', label: '🖼️ Mode Visual', desc: 'Gambar Poster' },
                    { id: 'video', label: '🎬 Mode Video', desc: 'Video Animasi' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        audioManager.playClickSound();
                        setLearningMode(mode.id as LearningMode);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                        learningMode === mode.id
                          ? 'bg-[#123D68] text-white shadow-xs scale-105'
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                      title={mode.desc}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* IF MODE VIDEO: RENDER DEDICATED OFFICIAL YOUTUBE VIDEO LEARNING SUITE */}
            {learningMode === 'video' ? (
              <div className="py-2">
                <VideoLearningPlayer
                  onBackToMateri={() => {
                    audioManager.playClickSound();
                    setLearningMode('gabungan');
                  }}
                  onGoToActivities={() => {
                    audioManager.playClickSound();
                    setActiveTab('aktivitas');
                  }}
                  onBackToHome={() => {
                    audioManager.playClickSound();
                    onNavigate('cover');
                  }}
                  onOpenBibliography={() => {
                    audioManager.playClickSound();
                    onNavigate('bibliography');
                  }}
                />
              </div>
            ) : (
              /* IF MODES (GABUNGAN / BACA / AUDIO / VISUAL): RENDER LESSON MODULES */
              <>
                {/* 8 Lesson Navigation Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                  {MATERIAL_LESSONS.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        audioManager.stopSpeech();
                        audioManager.playClickSound();
                        setIsPlayingAudio(false);
                        setSelectedQuickAnswer(null);
                        setCurrentLessonIndex(idx);
                      }}
                      className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        currentLessonIndex === idx
                          ? 'bg-[#21A447] text-white shadow-md scale-102 border-2 border-emerald-700'
                          : 'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {m.badge}
                    </button>
                  ))}
                </div>

                {/* Main Lesson Card */}
                <div className="bg-white rounded-3xl p-5 sm:p-8 border-3 border-sky-200 shadow-xl mb-6 relative overflow-hidden">
                  {/* Badge & Title */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b pb-3">
                    <div>
                      <span className="text-xs font-black text-[#FF9F1C] bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        {lesson.badge} • Topik A Mengenal Peta
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-fredoka text-[#123D68] mt-1">
                        {lesson.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">{lesson.subheading}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Audio Read Control */}
                      <button
                        onClick={handleReadLesson}
                        className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-2xl transition-all cursor-pointer ${
                          isPlayingAudio
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-amber-50 border-2 border-amber-300 text-amber-900 hover:bg-amber-100 shadow-xs'
                        }`}
                      >
                        {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        <span>{isPlayingAudio ? 'Jeda Audio ⏹️' : 'Putar Narasi Suara 🔊'}</span>
                      </button>

                      {lesson.infographic && (
                        <button
                          onClick={() => openLightboxBySrc(lesson.infographic!.src)}
                          className="flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 text-sky-900 font-extrabold text-xs px-3 py-2 rounded-2xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-sky-600" />
                          <span className="hidden sm:inline">Perbesar Gambar</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#FFF9E7] border-2 border-amber-300 rounded-2xl p-4 mb-5">
                    <p className="text-sm sm:text-base font-bold text-[#123D68] leading-relaxed">
                      ⭐ <strong>Intisari Materi:</strong> {lesson.summary}
                    </p>
                  </div>

                  {/* MODE AUDIO SPECIAL DECK */}
                  {learningMode === 'audio' && (
                    <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm animate-fade-in">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <Headphones className="w-5 h-5 text-amber-600" />
                          <span className="font-black text-sm text-[#123D68]">
                            Pemutar Audio Interaktif
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleReadLesson}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                              isPlayingAudio ? 'bg-rose-600 text-white' : 'bg-[#21A447] text-white'
                            }`}
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            <span>{isPlayingAudio ? 'Jeda Narasi' : 'Dengarkan Pelajaran Ini'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-2xl border border-amber-200">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
                          Transkrip Suara Pelajaran:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                          {lesson.sections.map((s) => `${s.heading}: ${s.content}`).join(' ')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* EMBEDDED PROPORTIONAL EDUCATIONAL INFOGRAPHIC POSTER (Shown in Gabungan & Visual) */}
                  {(learningMode === 'gabungan' || learningMode === 'visual') && lesson.infographic && (
                    <div className="my-6 bg-gradient-to-tr from-sky-50 via-amber-50/50 to-emerald-50 rounded-3xl p-3.5 sm:p-5 border-3 border-sky-200 shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#FF9F1C] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-xs uppercase tracking-wide flex items-center gap-1">
                            <ImageIcon className="w-3 h-3" />
                            Poster Edukasi
                          </span>
                          <h4 className="font-extrabold text-xs sm:text-sm text-[#123D68]">
                            {lesson.infographic.title}
                          </h4>
                        </div>

                        <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">
                          🔍 Klik gambar untuk memperbesar
                        </span>
                      </div>

                      <div
                        onClick={() => openLightboxBySrc(lesson.infographic!.src)}
                        className="relative w-full aspect-[1491/1055] max-h-[500px] bg-white rounded-2xl overflow-hidden border-2 border-sky-300 shadow-sm cursor-zoom-in group select-none transition-all hover:border-amber-400 hover:shadow-md flex items-center justify-center"
                      >
                        <img
                          src={lesson.infographic.src}
                          alt={lesson.infographic.alt}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-sky-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-white text-[#123D68] font-extrabold text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-xl border-2 border-amber-300 flex items-center gap-2 transform group-hover:scale-105 transition-transform">
                            <ZoomIn className="w-4 h-4 text-emerald-600" />
                            <span>Klik untuk Memperbesar Poster (Layar Penuh)</span>
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 bg-white/90 rounded-2xl p-3 sm:p-3.5 border border-sky-100 text-[#123D68]">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          💡 <strong className="text-[#123D68]">Penjelasan Gambar:</strong>{' '}
                          {lesson.infographic.caption}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sections Content (Shown in Gabungan & Baca) */}
                  {(learningMode === 'gabungan' || learningMode === 'baca') && (
                    <div className="space-y-6 mb-8 text-[#123D68]">
                      {lesson.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-base sm:text-lg font-bold font-fredoka text-[#21A447] flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#21A447]" />
                            <span>{sec.heading}</span>
                          </h4>
                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                            {sec.content}
                          </p>

                          {sec.keyPoints && (
                            <ul className="bg-sky-50/60 rounded-2xl p-4 space-y-1.5 border border-sky-100 mt-2">
                              {sec.keyPoints.map((pt, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="text-xs sm:text-sm text-slate-800 font-semibold flex items-start gap-2"
                                >
                                  <span className="text-emerald-600 mt-0.5">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Feature for Lesson 5 (Kompas Putar) */}
                  {lesson.id === 5 && (
                    <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-3xl p-5 border-2 border-sky-200 mb-8 flex flex-col items-center">
                      <h4 className="font-bold text-sm sm:text-base font-fredoka text-[#123D68] mb-1">
                        Coba Putar Kompas Penunjuk Arah:
                      </h4>
                      <p className="text-xs text-slate-500 mb-4 text-center">
                        Klik tombol untuk mengarahkan jarum ke arah mata angin yang diinginkan!
                      </p>

                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-4">
                        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                          <circle cx="100" cy="100" r="95" fill="#FFFFFF" stroke="#55C7F2" strokeWidth="4" />
                          <circle cx="100" cy="100" r="85" fill="#F0F9FF" stroke="#FFC928" strokeWidth="2" />
                          <text x="100" y="24" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="bold">U</text>
                          <text x="180" y="105" textAnchor="middle" fill="#123D68" fontSize="13" fontWeight="bold">T</text>
                          <text x="100" y="186" textAnchor="middle" fill="#123D68" fontSize="13" fontWeight="bold">S</text>
                          <text x="20" y="105" textAnchor="middle" fill="#123D68" fontSize="13" fontWeight="bold">B</text>
                          <g transform={`rotate(${compassAngle} 100 100)`} className="transition-transform duration-500">
                            <polygon points="100,28 107,100 100,92 93,100" fill="#DC2626" />
                            <polygon points="100,172 107,100 100,108 93,100" fill="#64748B" />
                            <circle cx="100" cy="100" r="8" fill="#FFC928" stroke="#123D68" strokeWidth="2" />
                          </g>
                        </svg>
                      </div>

                      <div className="flex flex-wrap justify-center gap-1.5">
                        {[
                          { label: 'Utara (0°)', deg: 0 },
                          { label: 'Timur Laut (45°)', deg: 45 },
                          { label: 'Timur (90°)', deg: 90 },
                          { label: 'Tenggara (135°)', deg: 135 },
                          { label: 'Selatan (180°)', deg: 180 },
                          { label: 'Barat Daya (225°)', deg: 225 },
                          { label: 'Barat (270°)', deg: 270 },
                          { label: 'Barat Laut (315°)', deg: 315 },
                        ].map((btn) => (
                          <button
                            key={btn.deg}
                            onClick={() => {
                              audioManager.playClickSound();
                              setCompassAngle(btn.deg);
                            }}
                            className={`text-xs px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                              compassAngle === btn.deg
                                ? 'bg-[#FF9F1C] text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Feature for Lesson 6 (Peta Desa Referensi) */}
                  {lesson.id === 6 && (
                    <div className="mb-8">
                      <ReferenceVillageMap
                        compact={false}
                        title="Peta Referensi: Membaca Letak Tempat Lingkungan Desa"
                        highlighted={['sekolah', 'pasar', 'taman', 'perumahan', 'masjid', 'puskesmas']}
                      />
                    </div>
                  )}

                  {/* Quick Check Question */}
                  {lesson.quickCheck && (
                    <div className="bg-[#FFF9E7] border-2 border-amber-300 rounded-3xl p-5 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="w-5 h-5 text-amber-600" />
                        <h4 className="text-sm sm:text-base font-bold font-fredoka text-[#123D68]">
                          Pertanyaan Cepat Pemahaman:
                        </h4>
                      </div>
                      <p className="text-sm sm:text-base font-bold text-[#123D68] mb-3">
                        {lesson.quickCheck.question}
                      </p>

                      <div className="space-y-2">
                        {lesson.quickCheck.options.map((opt, oIdx) => {
                          const isSelected = selectedQuickAnswer === oIdx;
                          const isCorrect = oIdx === lesson.quickCheck!.correctIndex;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                audioManager.playClickSound();
                                setSelectedQuickAnswer(oIdx);
                                if (isCorrect) {
                                  audioManager.playCorrectSound();
                                } else {
                                  audioManager.playEncouragingSound();
                                }
                              }}
                              className={`w-full text-left p-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900 shadow-sm'
                                    : 'bg-rose-50 border-rose-300 text-rose-900'
                                  : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && isCorrect && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {selectedQuickAnswer !== null && (
                        <div
                          className={`mt-3 p-3 rounded-2xl text-xs sm:text-sm font-bold animate-pop ${
                            selectedQuickAnswer === lesson.quickCheck.correctIndex
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {selectedQuickAnswer === lesson.quickCheck.correctIndex
                            ? `🎉 ${lesson.quickCheck.explanation}`
                            : 'Ayo coba lagi! Baca kembali ringkasan materi di atas ya.'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Prev / Next lesson buttons */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button
                      onClick={handlePrevLesson}
                      disabled={currentLessonIndex === 0}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                        currentLessonIndex === 0
                          ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Materi Sebelumnya</span>
                    </button>

                    <span className="text-xs font-bold text-slate-400">
                      {currentLessonIndex + 1} dari {MATERIAL_LESSONS.length} Modul
                    </span>

                    {currentLessonIndex < MATERIAL_LESSONS.length - 1 ? (
                      <button
                        onClick={handleNextLesson}
                        className="flex items-center gap-1.5 bg-[#21A447] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm border-b-3 border-emerald-800 transition-all cursor-pointer"
                      >
                        <span>Materi Berikutnya</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          audioManager.stopSpeech();
                          audioManager.playClickSound();
                          onNavigate('board');
                        }}
                        className="flex items-center gap-1.5 bg-[#FF9F1C] hover:bg-amber-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm border-b-3 border-amber-800 transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Mulai Bermain di Peta</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* FULL-SCREEN INTERACTIVE LIGHTBOX MODAL */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 select-none animate-fade-in"
        >
          {/* Top Lightbox Bar */}
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-2 text-white bg-slate-900/80 px-3 sm:px-5 py-2.5 rounded-2xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-2 truncate">
              <span className="bg-[#21A447] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0">
                {currentLightboxItem.badge}
              </span>
              <h3 className="text-xs sm:text-base font-extrabold font-fredoka truncate text-amber-300">
                {currentLightboxItem.title}
              </h3>
              <span className="text-[11px] text-slate-400 hidden md:inline shrink-0">
                ({lightboxIndex + 1} dari {MAP_INFOGRAPHICS_GALLERY.length})
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={zoomOut}
                disabled={lightboxZoom <= 0.7}
                className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-600 transition-colors cursor-pointer disabled:opacity-40"
                title="Perkecil (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-amber-300 px-1">
                {Math.round(lightboxZoom * 100)}%
              </span>

              <button
                onClick={zoomIn}
                disabled={lightboxZoom >= 2.5}
                className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-600 transition-colors cursor-pointer disabled:opacity-40"
                title="Perbesar (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={closeLightbox}
                className="p-1.5 sm:p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-colors cursor-pointer ml-1"
                title="Tutup (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Zoomable Image View */}
          <div className="flex-1 w-full max-w-6xl mx-auto flex items-center justify-center overflow-auto p-2">
            <img
              src={currentLightboxItem.src}
              alt={currentLightboxItem.alt}
              style={{ transform: `scale(${lightboxZoom})` }}
              className="max-h-[75vh] max-w-[95vw] object-contain transition-transform duration-200 select-none shadow-2xl rounded-xl"
            />
          </div>

          {/* Bottom Lightbox Controls */}
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between text-white bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700">
            <button
              onClick={handlePrevLightbox}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Poster Sebelumnya</span>
            </button>

            <span className="text-[11px] text-slate-400">
              Gunakan tombol panah ◀ / ▶ pada keyboard untuk berpindah poster
            </span>

            <button
              onClick={handleNextLightbox}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
            >
              <span>Poster Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
