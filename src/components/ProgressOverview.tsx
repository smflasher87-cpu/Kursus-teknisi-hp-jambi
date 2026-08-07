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

      {/* Category Pills */}
      <div className="pt-5 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-semibold shrink-0 mr-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Kategori:</span>
        </div>

        {isAdmin && onManageCategories && (
          <button
            onClick={onManageCategories}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/40 shrink-0 flex items-center space-x-1 transition mr-1"
            title="Kelola, Tambah, Edit, dan Hapus Kategori Materi (Admin)"
          >
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            <span>Kelola Kategori (Admin)</span>
          </button>
        )}

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
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap border shrink-0 flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                  isSelected ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
