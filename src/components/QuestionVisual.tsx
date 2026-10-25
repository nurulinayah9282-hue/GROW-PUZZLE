import React from 'react';
import { Compass } from 'lucide-react';

interface QuestionVisualProps {
  questionId: number;
}

export const QuestionVisual: React.FC<QuestionVisualProps> = ({ questionId }) => {
  switch (questionId) {
    // -------------------------------------------------------------
    // SOAL 1: PETA BERPETAK (GRID KOORDINAT 1..7)
    // -------------------------------------------------------------
    case 1:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span className="flex items-center gap-1">
              <span>🗺️</span> Peta Berpetak Lingkungan Desa
            </span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">1 kotak = 1 km</span>
          </div>

          {/* Coordinate Grid SVG / CSS */}
          <div className="max-w-xs sm:max-w-sm mx-auto my-1 bg-sky-50/50 p-2.5 rounded-xl border border-sky-200">
            <div className="relative aspect-square w-full max-w-[260px] mx-auto bg-white rounded-lg border-2 border-slate-300 p-4">
              {/* Grid 7x7 lines */}
              <div className="absolute inset-4 grid grid-cols-7 grid-rows-7 border border-slate-200">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className="border border-slate-100/90" />
                ))}
              </div>

              {/* Y Axis Numbers (left side, 7 down to 1) */}
              <div className="absolute left-1 top-4 bottom-4 flex flex-col justify-between text-[10px] font-bold text-slate-500 font-mono">
                <span>7</span>
                <span>6</span>
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
              </div>

              {/* X Axis Numbers (bottom side, 1 to 7) */}
              <div className="absolute left-4 right-4 bottom-0.5 flex justify-between text-[10px] font-bold text-slate-500 font-mono">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
              </div>

              {/* Place 1: Balai Desa at (2,2) -> x=2, y=2 */}
              <div
                style={{ left: `${(2 / 7) * 88}%`, bottom: `${(2 / 7) * 88}%` }}
                className="absolute -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-none"
              >
                <div className="w-5 h-5 bg-amber-400 border border-amber-600 rounded-md flex items-center justify-center text-[10px] shadow-xs">
                  🏛️
                </div>
                <span className="text-[9px] font-extrabold text-[#123D68] whitespace-nowrap bg-white/95 px-1 rounded shadow-xs border border-slate-200">
                  Balai Desa (2,2)
                </span>
              </div>

              {/* Place 2: Kantor Pos at (2,5) -> x=2, y=5 */}
              <div
                style={{ left: `${(2 / 7) * 88}%`, bottom: `${(5 / 7) * 88}%` }}
                className="absolute -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-none"
              >
                <div className="w-5 h-5 bg-blue-500 border border-blue-700 rounded-md flex items-center justify-center text-[10px] shadow-xs text-white">
                  🏣
                </div>
                <span className="text-[9px] font-extrabold text-[#123D68] whitespace-nowrap bg-white/95 px-1 rounded shadow-xs border border-slate-200">
                  Kantor Pos (2,5)
                </span>
              </div>

              {/* Place 3: Taman at (6,5) -> x=6, y=5 */}
              <div
                style={{ left: `${(6 / 7) * 88}%`, bottom: `${(5 / 7) * 88}%` }}
                className="absolute -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-none"
              >
                <div className="w-5 h-5 bg-emerald-500 border border-emerald-700 rounded-md flex items-center justify-center text-[10px] shadow-xs text-white">
                  🌳
                </div>
                <span className="text-[9px] font-extrabold text-[#123D68] whitespace-nowrap bg-white/95 px-1 rounded shadow-xs border border-slate-200">
                  Taman (6,5)
                </span>
              </div>

              {/* Place 4: Museum at (6,2) -> x=6, y=2 */}
              <div
                style={{ left: `${(6 / 7) * 88}%`, bottom: `${(2 / 7) * 88}%` }}
                className="absolute -translate-x-1/2 translate-y-1/2 flex flex-col items-center pointer-events-none"
              >
                <div className="w-5 h-5 bg-purple-500 border border-purple-700 rounded-md flex items-center justify-center text-[10px] shadow-xs text-white">
                  🏛️
                </div>
                <span className="text-[9px] font-extrabold text-[#123D68] whitespace-nowrap bg-white/95 px-1 rounded shadow-xs border border-slate-200">
                  Museum (6,2)
                </span>
              </div>

              {/* Compass Indicator */}
              <div className="absolute top-1 right-1 bg-white/90 border border-slate-200 rounded px-1 text-[8px] font-black text-slate-600 flex items-center gap-0.5">
                <span>U ⬆️</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-bold mt-1">
            Gunakan garis kotak koordinat (x,y) untuk menganalisis perpindahan tempat.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 2: MENENTUKAN ARAH RELATIF (PASAR, LAPANGAN, PUSKESMAS)
    // -------------------------------------------------------------
    case 2:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span className="flex items-center gap-1">
              <span>🧭</span> Peta Wilayah &amp; Arah Mata Angin
            </span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">Utara di Atas</span>
          </div>

          <div className="max-w-xs mx-auto my-2 bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
            {/* North Compass Box */}
            <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-lg border border-slate-200 text-center shadow-xs">
              <span className="text-xs font-black text-rose-600 block">U ⬆️</span>
              <div className="text-[8px] font-bold text-slate-500 grid grid-cols-3 gap-0.5 mt-0.5 leading-none">
                <span>B</span>
                <span>•</span>
                <span>T</span>
              </div>
              <span className="text-[8px] font-bold text-slate-500 block">S ⬇️</span>
            </div>

            {/* Map Layout */}
            <div className="grid grid-cols-2 gap-4 items-center my-4 pr-12">
              {/* Lapangan (West of Pasar) */}
              <div className="p-2.5 rounded-xl bg-white border-2 border-emerald-300 shadow-xs flex flex-col items-center">
                <span className="text-xl">⚽</span>
                <span className="text-xs font-black text-emerald-900">Lapangan</span>
              </div>

              {/* Pasar (East) */}
              <div className="p-2.5 rounded-xl bg-white border-2 border-amber-300 shadow-xs flex flex-col items-center">
                <span className="text-xl">🛒</span>
                <span className="text-xs font-black text-amber-900">Pasar</span>
              </div>

              {/* Puskesmas (South of Lapangan) */}
              <div className="p-2.5 rounded-xl bg-white border-2 border-rose-300 shadow-xs flex flex-col items-center">
                <span className="text-xl">🏥</span>
                <span className="text-xs font-black text-rose-900">Puskesmas</span>
              </div>

              {/* Empty slot */}
              <div className="border border-dashed border-slate-200 rounded-xl h-full flex items-center justify-center text-[10px] text-slate-400">
                Area Desa
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Perhatikan posisi masing-masing tempat terhadap arah mata angin pada peta.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 3: MENENTUKAN POSISI DARI BEBERAPA PETUNJUK
    // -------------------------------------------------------------
    case 3:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🧭 Peta Posisi Lokasi</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">Utara di Atas (⬆️)</span>
          </div>

          <div className="max-w-xs mx-auto my-2 bg-sky-50/50 p-4 rounded-xl border border-sky-200 relative">
            {/* Compass in top-left */}
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-lg border border-sky-200 text-center shadow-xs">
              <span className="text-xs font-black text-rose-600 block">U ⬆️</span>
              <span className="text-[8px] font-bold text-slate-500">B ⬅️ ➡️ T</span>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center my-3 pl-10">
              {/* Empty placeholder */}
              <div />

              {/* Perpustakaan (North of Rumah Siti) */}
              <div className="p-2.5 bg-white border-2 border-purple-300 rounded-xl text-center shadow-xs">
                <span className="text-xl">📚</span>
                <span className="text-xs font-black text-purple-900 block">Perpustakaan</span>
              </div>

              {/* Sekolah */}
              <div className="p-2.5 bg-white border-2 border-amber-300 rounded-xl text-center shadow-xs">
                <span className="text-xl">🏫</span>
                <span className="text-xs font-black text-amber-900 block">Sekolah</span>
              </div>

              {/* Rumah Siti (East of Sekolah) */}
              <div className="p-2.5 bg-white border-2 border-emerald-300 rounded-xl text-center shadow-xs">
                <span className="text-xl">🏠</span>
                <span className="text-xs font-black text-emerald-900 block">Rumah Siti</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Tentukan hubungan arah antar-lokasi berdasarkan kompas penunjuk arah.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 4: MENGIDENTIFIKASI RUTE BERDASARKAN PETUNJUK
    // -------------------------------------------------------------
    case 4:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🗺️ Denah Jalur Wilayah</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Utara di Atas</span>
          </div>

          <div className="max-w-xs mx-auto my-2 bg-slate-50 p-3 rounded-xl border border-slate-200 relative">
            {/* Compass */}
            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-lg border border-slate-200 text-center shadow-xs">
              <span className="text-[10px] font-black text-rose-600 block">U ⬆️</span>
              <span className="text-[8px] font-bold text-slate-400">T ➡️</span>
            </div>

            <div className="grid grid-cols-2 gap-3 items-center my-3 pl-8">
              {/* Terminal (West of Rumah Sakit) */}
              <div className="p-2 bg-white border-2 border-slate-300 rounded-xl text-center shadow-xs">
                <span className="text-lg">🚌</span>
                <span className="text-[11px] font-black text-slate-800 block">Terminal</span>
              </div>

              {/* Rumah Sakit (North of Pasar) */}
              <div className="p-2 bg-white border-2 border-rose-300 rounded-xl text-center shadow-xs">
                <span className="text-lg">🏥</span>
                <span className="text-[11px] font-black text-rose-900 block">Rumah Sakit</span>
              </div>

              {/* Sekolah (Center/Tengah) */}
              <div className="p-2 bg-white border-2 border-amber-400 rounded-xl text-center shadow-xs">
                <span className="text-lg">🏫</span>
                <span className="text-[11px] font-black text-amber-900 block">Sekolah</span>
              </div>

              {/* Pasar (East of Sekolah) */}
              <div className="p-2 bg-white border-2 border-blue-300 rounded-xl text-center shadow-xs">
                <span className="text-lg">🛒</span>
                <span className="text-[11px] font-black text-blue-900 block">Pasar</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Amati posisi Sekolah, Pasar, dan Rumah Sakit untuk menentukan arah perjalanan.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 6: MENGHITUNG JARAK SEBENARNYA (SKALA 1 : 200.000)
    // -------------------------------------------------------------
    case 6:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>📏 Peta Wilayah Kecamatan</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">Skala 1 : 200.000</span>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-200 my-2 max-w-sm mx-auto">
            <div className="flex items-center justify-between gap-3 relative py-4">
              {/* Rumah */}
              <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-slate-200 shadow-xs z-10">
                <span className="text-2xl">🏠</span>
                <span className="text-xs font-bold text-slate-800 mt-1">Rumah</span>
              </div>

              {/* Measurement Line with 3 cm label */}
              <div className="flex-1 relative flex flex-col items-center">
                <div className="w-full border-t-2 border-dashed border-sky-600" />
                <span className="absolute -top-3 bg-white px-2 py-0.5 rounded-full border border-sky-300 text-xs font-black text-sky-900 shadow-xs">
                  3 cm pada peta
                </span>
              </div>

              {/* Waduk */}
              <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-slate-200 shadow-xs z-10">
                <span className="text-2xl">💧</span>
                <span className="text-xs font-bold text-slate-800 mt-1">Waduk</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Gunakan informasi skala 1 : 200.000 dan panjang garis 3 cm untuk menghitung jarak sebenarnya.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 7: MENGHITUNG JARAK PERJALANAN (3 cm + 2,5 cm)
    // -------------------------------------------------------------
    case 7:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🏕️ Peta Jalur Wisata Alam</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">Skala 1 : 200.000</span>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 my-2 max-w-sm mx-auto">
            <div className="flex items-center justify-between gap-2 relative py-3">
              {/* Rumah */}
              <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-slate-200 shadow-xs z-10 shrink-0">
                <span className="text-xl">🏠</span>
                <span className="text-[11px] font-bold text-slate-800">Rumah</span>
              </div>

              {/* Segment 1: 3 cm */}
              <div className="flex-1 relative flex flex-col items-center">
                <div className="w-full border-t-2 border-dashed border-emerald-600" />
                <span className="absolute -top-3 bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-[10px] font-black text-emerald-900 shadow-xs">
                  3 cm
                </span>
              </div>

              {/* Waduk */}
              <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-slate-200 shadow-xs z-10 shrink-0">
                <span className="text-xl">💧</span>
                <span className="text-[11px] font-bold text-slate-800">Waduk</span>
              </div>

              {/* Segment 2: 2.5 cm */}
              <div className="flex-1 relative flex flex-col items-center">
                <div className="w-full border-t-2 border-dashed border-emerald-600" />
                <span className="absolute -top-3 bg-white px-1.5 py-0.5 rounded border border-emerald-300 text-[10px] font-black text-emerald-900 shadow-xs">
                  2,5 cm
                </span>
              </div>

              {/* Perkemahan */}
              <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-slate-200 shadow-xs z-10 shrink-0">
                <span className="text-xl">⛺</span>
                <span className="text-[11px] font-bold text-slate-800">Perkemahan</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Hitung jarak seluruh rute perjalanan berdasarkan skala peta yang ditentukan.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 8: MENENTUKAN SKALA DARI INFORMASI JARAK
    // -------------------------------------------------------------
    case 8:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>📐 Peta Dua Kecamatan</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">Data Pengukuran</span>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 my-2 max-w-sm mx-auto">
            <div className="flex items-center justify-between gap-3 relative py-3">
              <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs z-10">
                <span className="text-2xl">🏢</span>
                <span className="text-xs font-bold text-slate-800">Kecamatan A</span>
              </div>

              <div className="flex-1 relative flex flex-col items-center">
                <div className="w-full border-t-2 border-dashed border-amber-600" />
                <span className="absolute -top-3 bg-white px-2 py-0.5 rounded-full border border-amber-300 text-xs font-black text-amber-900 shadow-xs">
                  5 cm pada peta
                </span>
              </div>

              <div className="flex flex-col items-center bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs z-10">
                <span className="text-2xl">🏢</span>
                <span className="text-xs font-bold text-slate-800">Kecamatan B</span>
              </div>
            </div>

            <div className="bg-white/95 p-2 rounded-lg border border-amber-200 mt-2 text-xs font-bold text-amber-950">
              Keterangan: Jarak sebenarnya di lapangan = 15 km
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Bandingkan ukuran pada peta dengan jarak sebenarnya untuk menentukan skala.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 11: MENENTUKAN RUTE TERPENDEK (RUTE A vs RUTE B)
    // -------------------------------------------------------------
    case 11:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🏃 Peta Dua Rute Perjalanan</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">Utara di Atas (⬆️)</span>
          </div>

          <div className="max-w-sm mx-auto my-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="grid grid-cols-2 gap-3">
              {/* Route A box */}
              <div className="bg-white p-2.5 rounded-xl border-2 border-amber-200 text-left shadow-xs">
                <span className="text-xs font-black text-amber-900 block mb-1">Rute A (Berkelok):</span>
                <ul className="text-[11px] text-slate-700 space-y-1">
                  <li>• Jalan ke timur = <strong>4 km</strong></li>
                  <li>• Jalan ke utara = <strong>3 km</strong></li>
                </ul>
              </div>

              {/* Route B box */}
              <div className="bg-white p-2.5 rounded-xl border-2 border-emerald-200 text-left shadow-xs">
                <span className="text-xs font-black text-emerald-900 block mb-1">Rute B (Jalan Langsung):</span>
                <ul className="text-[11px] text-slate-700 space-y-1">
                  <li>• Jalan langsung = <strong>6 km</strong></li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 bg-white p-2 rounded-lg border border-slate-200 mt-2">
              <span>Titik Awal: 🏫 Sekolah</span>
              <span>➔</span>
              <span>Tujuan: 🏟️ Balai Olahraga</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Bandingkan total panjang kedua rute perjalanan yang aman tersebut.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 12: MEMILIH RUTE YANG AMAN (KONDISI JEMBATAN)
    // -------------------------------------------------------------
    case 12:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🛡️ Peta Jalur Penyeberangan Sungai</span>
            <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">Kondisi Akses</span>
          </div>

          <div className="max-w-sm mx-auto my-2 bg-sky-50/40 p-3 rounded-xl border border-sky-200">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="bg-white px-2 py-1 rounded border border-slate-200">🏘️ Permukiman</span>
              <span className="text-blue-600 font-black">〰️ Aliran Sungai 〰️</span>
              <span className="bg-white px-2 py-1 rounded border border-slate-200">🏫 Sekolah</span>
            </div>

            {/* Two Bridges and their condition */}
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="bg-white p-2.5 rounded-xl border-2 border-slate-300 shadow-xs">
                <span className="text-xs font-black text-slate-900 block">Jembatan Utama</span>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
                  Status: Terbuka &amp; dapat digunakan
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-xl border-2 border-slate-300 shadow-xs">
                <span className="text-xs font-black text-slate-900 block">Jembatan Kecil</span>
                <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                  Status: Sedang ditutup
                </span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Pilihlah rute yang paling tepat berdasarkan kondisi jembatan yang tersedia.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 13: MENGHITUNG PANJANG RUTE ALTERNATIF
    // -------------------------------------------------------------
    case 13:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🛣️ Peta Rute Sekolah menuju Taman</span>
            <span className="bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">Jarak Tempuh</span>
          </div>

          <div className="max-w-sm mx-auto my-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-left">
            <div className="bg-white p-2 rounded-lg border border-slate-200 mb-2">
              <span className="text-xs font-bold text-[#123D68] block">Rute 1 (Melalui Pasar):</span>
              <span className="text-[11px] text-slate-600 block">• Sekolah ke Pasar = 2 km</span>
              <span className="text-[11px] text-slate-600 block">• Pasar ke Taman = 3 km</span>
            </div>

            <div className="bg-white p-2 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-[#123D68] block">Rute 2 (Jalan Alternatif Langsung):</span>
              <span className="text-[11px] text-slate-600 block">• Sekolah langsung ke Taman = 4 km</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Bandingkan panjang kedua pilihan rute untuk mencari jarak paling pendek.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 16: MENAFSIRKAN LEGENDA PETA (SIMBOL DAN JALAN)
    // -------------------------------------------------------------
    case 16:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>📑 Peta dan Kotak Legenda</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">Simbol Peta</span>
          </div>

          <div className="max-w-sm mx-auto my-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {/* Map Canvas snippet */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 mb-2 relative h-24 flex items-center justify-center overflow-hidden">
              {/* Blue river line */}
              <div className="absolute top-2 left-0 right-0 h-1.5 bg-blue-500 rounded" />
              {/* Red road line */}
              <div className="absolute bottom-4 left-0 right-0 h-2 bg-red-600 rounded" />
              {/* Triangle symbol near red line */}
              <div className="absolute bottom-7 left-1/3 flex flex-col items-center">
                <span className="text-lg text-amber-800 font-black">▲</span>
              </div>
              {/* Square symbol elsewhere */}
              <div className="absolute top-6 right-6">
                <span className="text-base text-slate-800 font-black">■</span>
              </div>
            </div>

            {/* Legend Box */}
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-left text-xs">
              <span className="font-extrabold text-[#123D68] block mb-1 text-[11px]">LEGENDA:</span>
              <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-blue-500 inline-block" />
                  <span>Garis Biru = Sungai</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-1 bg-red-600 inline-block" />
                  <span>Garis Merah = Jalan Raya</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-800 font-bold">▲</span>
                  <span>Segitiga = Gunung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-800 font-bold">■</span>
                  <span>Persegi = Bangunan Penting</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Tafsirkan posisi simbol segitiga di dekat garis merah menggunakan legenda.
          </p>
        </div>
      );

    // -------------------------------------------------------------
    // SOAL 20: MENEMUKAN KETIDAKSESUAIAN PADA PETA
    // -------------------------------------------------------------
    case 20:
      return (
        <div className="bg-white rounded-2xl border-2 border-sky-300 p-3 sm:p-4 shadow-sm text-center select-none">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-[#123D68] mb-2 pb-1.5 border-b border-sky-100">
            <span>🔍 Lembar Peta dan Keterangan Tertulis</span>
            <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">Utara di Atas (⬆️)</span>
          </div>

          <div className="max-w-sm mx-auto my-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {/* Visual map snippet */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 mb-2 relative flex items-center justify-around">
              <div className="absolute top-1 left-2 text-[9px] font-black text-rose-600">
                U ⬆️
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">🏫</span>
                <span className="text-xs font-bold text-slate-800">Sekolah</span>
              </div>
              <div className="border-t-2 border-dashed border-slate-300 w-16" />
              <div className="flex flex-col items-center">
                <span className="text-2xl">🏛️</span>
                <span className="text-xs font-bold text-slate-800">Kantor Desa</span>
              </div>
            </div>

            {/* Note from mapmaker */}
            <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-left text-xs">
              <span className="text-[10px] font-black text-amber-900 block mb-0.5 uppercase tracking-wide">
                Catatan Keterangan Pembuat Peta:
              </span>
              <p className="italic text-slate-700">
                “Kantor desa berada di sebelah barat sekolah.”
              </p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-semibold">
            Bandingkan letak simbol pada gambar dengan catatan keterangan yang tertulis.
          </p>
        </div>
      );

    default:
      return null;
  }
};
