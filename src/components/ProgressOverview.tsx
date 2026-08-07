import React from 'react';
import { Video } from '../types';
import { Award, CheckCircle2, Film, Layers, Sparkles, Tag, Plus } from 'lucide-react';

interface ProgressOverviewProps {
  videos: Video[];
  completedVideoIds: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenCertificate?: () => void;
  allCategories?: string[];
  isAdmin?: boolean;
  onManageCategories?: () => void;
}

export const ProgressOverview: React.FC<ProgressOverviewProps> = ({
  videos,
  completedVideoIds,
  selectedCategory,
  onSelectCategory,
  onOpenCertificate,
  allCategories,
  isAdmin,
  onManageCategories
}) => {
  const totalVideos = videos.length;
  const completedCount = completedVideoIds.length;
  const progressPercent = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0;

  const categories = [
    'Semua Video',
    ...(allCategories || Array.from(new Set(videos.map((v) => v.category))))
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 mb-8 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        {/* Left Welcome Title */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
              Kurikulum Pelatihan LPK SM FLASHER
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Modul Video & Panduan Skematik Teknisi
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Pilih materi di bawah untuk menyaksikan video praktik dan mengunduh buku modul SOP.
          </p>
        </div>

        {/* Right Progress Card */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 min-w-[280px] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Progres Belajar Anda</span>
            </span>
            <span className="text-indigo-400 font-extrabold text-sm">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedCount} Selesai</span>
            </span>
            <span className="flex items-center space-x-1">
              <Film className="w-3.5 h-3.5 text-slate-500" />
              <span>Total {totalVideos} Video</span>
            </span>
          </div>

          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="w-full mt-2 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow transition flex items-center justify-center space-x-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Cetak Sertifikat Kelulusan</span>
            </button>
          )}
        </div>
      </div>

      {/* Category & Class Program Selector */}
      <div className="pt-5 space-y-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-black text-amber-400 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>PILIH KELAS & KATEGORI MATERI PELATIHAN:</span>
          </div>
          {isAdmin && onManageCategories && (
            <button
              onClick={onManageCategories}
              className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/40 flex items-center space-x-1 transition"
              title="Kelola, Tambah, Edit, dan Hapus Kategori Materi (Admin)"
            >
              <Tag className="w-3 h-3 text-indigo-400" />
              <span>Kelola Kategori (Admin)</span>
            </button>
          )}
        </div>

        {/* Mobile Dropdown View for Clear Class Selection */}
        <div className="block sm:hidden">
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="w-full p-3 bg-slate-950 border-2 border-indigo-500/60 rounded-xl text-xs font-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
          >
            {categories.map((cat) => {
              const count =
                cat === 'Semua Video'
                  ? videos.length
                  : videos.filter((v) => v.category === cat).length;
              return (
                <option key={cat} value={cat} className="bg-slate-900 text-white font-bold py-1">
                  {cat} ({count} Video Tersedia)
                </option>
              );
            })}
          </select>
        </div>

        {/* Desktop & Scrollable Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count =
              cat === 'Semua Video'
                ? videos.length
                : videos.filter((v) => v.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition whitespace-nowrap border shrink-0 flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white border-indigo-400 ring-2 ring-indigo-500/40 shadow-lg'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
