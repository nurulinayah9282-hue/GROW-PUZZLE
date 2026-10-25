import React, { useState } from 'react';
import { NavigationPage } from '../types';
import {
  MAIN_BOOKS_BIBLIOGRAPHY,
  VIDEO_BIBLIOGRAPHY,
  GEO_AND_MAP_REFERENCES,
  MEDIA_CREDITS,
} from '../data/bibliography';
import { audioManager } from '../utils/audio';
import {
  BookOpen,
  Film,
  Compass,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Info,
  MapPin,
  Layers,
  FileText,
  Volume2,
  Award,
  Home,
  Map,
} from 'lucide-react';

interface BibliographyPageProps {
  onNavigate: (page: NavigationPage) => void;
}

type TabCategory = 'all' | 'books' | 'video' | 'maps' | 'media';

export const BibliographyPage: React.FC<BibliographyPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCitation = (id: string, text: string) => {
    audioManager.playClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-68px)] py-6 sm:py-10 px-3 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header & Breadcrumb */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-3 border-sky-200 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <button
              onClick={() => {
                audioManager.playClickSound();
                onNavigate('cover');
              }}
              title="Kembali ke Beranda Utama"
              className="p-2.5 rounded-2xl bg-sky-50 text-[#123D68] hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Kurikulum Merdeka • IPAS Kelas IV
                </span>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  Rujukan Terverifikasi
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-fredoka text-[#123D68] mt-1 tracking-tight">
                DAFTAR PUSTAKA & SUMBER MEDIA
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mt-0.5">
                Dokumentasi resmi seluruh rujukan materi, video edukasi, kebijakan kartografi, dan kredit aset yang digunakan dalam <strong>GROW PUZZLE DIGITAL</strong>.
              </p>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => {
                audioManager.playClickSound();
                onNavigate('material');
              }}
              className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-fredoka font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Jelajah Materi</span>
            </button>
            <button
              onClick={() => {
                audioManager.playClickSound();
                onNavigate('board');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#21A447] hover:bg-emerald-600 active:scale-95 text-white font-fredoka font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Map className="w-4 h-4" />
              <span>Peta Petualangan</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 border-2 border-slate-200 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => {
              audioManager.playClickSound();
              setActiveTab('all');
            }}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#123D68] text-white shadow-md scale-102'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🌟 Semua Sumber
          </button>
          <button
            onClick={() => {
              audioManager.playClickSound();
              setActiveTab('books');
            }}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'books'
                ? 'bg-blue-600 text-white shadow-md scale-102'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>A. Buku Teks Utama</span>
          </button>
          <button
            onClick={() => {
              audioManager.playClickSound();
              setActiveTab('video');
            }}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'video'
                ? 'bg-red-600 text-white shadow-md scale-102'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>B. Sumber Video</span>
          </button>
          <button
            onClick={() => {
              audioManager.playClickSound();
              setActiveTab('maps');
            }}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'maps'
                ? 'bg-emerald-600 text-white shadow-md scale-102'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>C. Standar Peta & Geospasial</span>
          </button>
          <button
            onClick={() => {
              audioManager.playClickSound();
              setActiveTab('media');
            }}
            className={`px-4 py-2 rounded-xl font-fredoka font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'media'
                ? 'bg-purple-600 text-white shadow-md scale-102'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>D. Kredit Media & Aset</span>
          </button>
        </div>

        {/* SECTION A: SUMBER MATERI UTAMA (BUKU KEMENDIKBUDRISTEK) */}
        {(activeTab === 'all' || activeTab === 'books') && (
          <section className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-3 border-blue-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
                  📚
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-fredoka text-[#123D68]">
                    A. Sumber Materi Utama (Buku IPAS Kelas IV Edisi Revisi)
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Diterbitkan resmi oleh Pusat Perbukuan, Badan Standar, Kurikulum, dan Asesmen Pendidikan Kemendikbudristek RI
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                Repositori Kemendikdasmen
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MAIN_BOOKS_BIBLIOGRAPHY.map((book) => (
                <div
                  key={book.id}
                  className="bg-blue-50/60 rounded-2xl p-4 sm:p-5 border-2 border-blue-200/80 hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-200/80 text-blue-900">
                        {book.category === 'buku_siswa' ? '📖 Buku Teks Siswa' : '🧑‍🏫 Buku Panduan Guru'}
                      </span>
                      <span className="text-xs font-bold text-blue-700">{book.edition}</span>
                    </div>

                    <h3 className="font-extrabold text-[#123D68] text-base sm:text-lg leading-snug">
                      {book.title}
                    </h3>

                    {/* Meta info list */}
                    <div className="bg-white rounded-xl p-3 border border-blue-100 space-y-1.5 text-xs text-slate-700">
                      <p>
                        <strong className="text-slate-900">Penulis:</strong> {book.authors.join(', ')}
                      </p>
                      {book.reviewers && (
                        <p>
                          <strong className="text-slate-900">Penelaah:</strong> {book.reviewers.join(', ')}
                        </p>
                      )}
                      <p>
                        <strong className="text-slate-900">Penerbit:</strong> {book.publisher}, {book.institution} ({book.year})
                      </p>
                      {book.isbn && (
                        <p>
                          <strong className="text-slate-900">ISBN:</strong> {book.isbn}
                        </p>
                      )}
                      <p>
                        <strong className="text-slate-900">Materi Digunakan:</strong> {book.usedChapters}
                      </p>
                    </div>

                    {/* Utilization Note */}
                    <p className="text-xs text-slate-600 bg-sky-50/70 p-2.5 rounded-xl border border-sky-100">
                      <strong className="text-sky-900">Implementasi dalam Aplikasi:</strong> {book.utilizationInApp}
                    </p>
                  </div>

                  {/* Actions: Direct Link & Copy Citation */}
                  <div className="mt-4 pt-3 border-t border-blue-100 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={book.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-100/60 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
                    >
                      <span>Buka di Repositori Kemendikdasmen</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyCitation(book.id, book.apaCitation)}
                      className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        copiedId === book.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                      title="Salin Sitasi Format APA"
                    >
                      {copiedId === book.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Sitasi Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Sitasi APA</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION B: SUMBER VIDEO (YOUTUBE) */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <section className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-3 border-rose-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-rose-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xl">
                  🎬
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-fredoka text-[#123D68]">
                    B. Sumber Video Pembelajaran
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Media audiovisual interaktif yang disematkan dalam menu Jelajah Materi &gt; Mode Video
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-rose-50 text-rose-800 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
                YouTube Terverifikasi
              </span>
            </div>

            {VIDEO_BIBLIOGRAPHY.map((vid) => (
              <div
                key={vid.id}
                className="bg-rose-50/50 rounded-2xl p-4 sm:p-5 border-2 border-rose-200 space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-200 text-rose-900 inline-block mb-1.5">
                      📺 {vid.platform} Video Embed
                    </span>
                    <h3 className="font-extrabold text-[#123D68] text-base sm:text-lg">
                      {vid.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={vid.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-xs transition-all"
                    >
                      <span>Tonton di YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Video Meta Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-rose-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Kanal Pembuat</span>
                    <strong className="text-slate-900 text-sm">{vid.channelName}</strong>
                    <span className="block text-[10px] text-emerald-600 font-bold">✓ Terverifikasi</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Tanggal Publikasi</span>
                    <strong className="text-slate-900 text-sm">{vid.publishDate}</strong>
                    <span className="block text-[10px] text-emerald-600 font-bold">✓ Terkonfirmasi</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">ID Video YouTube</span>
                    <code className="text-rose-700 font-bold text-sm bg-rose-50 px-1 py-0.5 rounded">{vid.videoId}</code>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-rose-100">
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Rasio & Mode</span>
                    <strong className="text-slate-900 text-sm">16:9 Responsif</strong>
                    <span className="block text-[10px] text-slate-500">Kuis 3 Soal Refleksi</span>
                  </div>
                </div>

                {/* Bibliographic Format Box */}
                <div className="bg-white p-3.5 rounded-xl border border-rose-200">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase text-slate-500">
                      Format Bibliografi Standar (Nama Kanal, Tahun Bulan, Judul [Video], YouTube, URL):
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyCitation(vid.id, vid.apaCitation)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded transition-all cursor-pointer ${
                        copiedId === vid.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
                      }`}
                    >
                      {copiedId === vid.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === vid.id ? 'Tersalin!' : 'Salin Format'}</span>
                    </button>
                  </div>
                  <p className="font-mono text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200 select-all">
                    {vid.apaCitation}
                  </p>
                </div>

                <p className="text-xs text-slate-600 bg-white/80 p-3 rounded-xl border border-rose-100">
                  <strong className="text-rose-900">Peran dalam Aplikasi:</strong> {vid.utilizationInApp}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* SECTION C: SUMBER PETA, STANDAR GEOSPASIAL, DAN KEBIJAKAN ATRIBUSI */}
        {(activeTab === 'all' || activeTab === 'maps') && (
          <section className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-3 border-emerald-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                  🧭
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-fredoka text-[#123D68]">
                    C. Sumber Peta, Standar Geospasial, &amp; Kebijakan Transparansi
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Atribusi standar kartografi nasional dan klarifikasi penggunaan data geospasial
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                Kaidah Kartografi &amp; Etika Data
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GEO_AND_MAP_REFERENCES.map((ref) => (
                <div
                  key={ref.id}
                  className={`rounded-2xl p-4 sm:p-5 border-2 flex flex-col justify-between ${
                    ref.id === 'big-indonesia'
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-amber-50/40 border-amber-200'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          ref.status === 'Rujukan Konseptual Kartografi'
                            ? 'bg-emerald-200 text-emerald-900'
                            : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {ref.status}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-[#123D68] text-base leading-snug">
                      {ref.name}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-500">{ref.institution}</p>

                    <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                      {ref.description}
                    </p>

                    <div className="bg-white/90 p-2.5 rounded-xl border border-slate-200 text-xs text-slate-600">
                      <strong className="text-slate-800">Catatan Penggunaan:</strong> {ref.attributionNote}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                    >
                      <span>Kunjungi Tautan Resmi</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION D: INFORMASI KREDIT MEDIA & ASET DESAIN */}
        {(activeTab === 'all' || activeTab === 'media') && (
          <section className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border-3 border-purple-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-purple-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl">
                  🎨
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-fredoka text-[#123D68]">
                    D. Informasi Kredit Media, Desain, &amp; Teknologi
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Status kepemilikan, lisensi perangkat lunak terbuka (open source), dan aset grafis
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block bg-purple-50 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
                Lisensi &amp; Karya Asli
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {MEDIA_CREDITS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/90 rounded-2xl p-4 border-2 border-purple-100 hover:border-purple-300 transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                        {item.type}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          item.sourceStatus === 'Dibuat untuk GROW PUZZLE DIGITAL'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {item.sourceStatus}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#123D68]">{item.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>
                      <strong>Kredit:</strong> {item.creatorOrLicense}
                    </span>
                    {item.fileOrUrl.startsWith('http') && (
                      <a
                        href={item.fileOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Situs</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation Back to Core Features */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-sky-200 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="text-xs text-slate-600 font-medium">
            GROW PUZZLE DIGITAL • Hak Cipta Materi Kurikulum milik Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioManager.playClickSound();
                onNavigate('cover');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Menu Utama</span>
            </button>
            <button
              onClick={() => {
                audioManager.playClickSound();
                onNavigate('material');
              }}
              className="px-4 py-2 rounded-xl bg-[#55C7F2] hover:bg-sky-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Kembali ke Materi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
