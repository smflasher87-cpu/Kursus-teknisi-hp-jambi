import React, { useState } from 'react';
import { GalleryItem, User } from '../types';
import {
  Image,
  Video as VideoIcon,
  Plus,
  Trash2,
  Calendar,
  Tag,
  X,
  ShieldCheck,
  Upload,
  Sparkles,
  Maximize2,
  FolderHeart,
  Layers
} from 'lucide-react';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
  currentUser: User;
  onAddItem: (item: GalleryItem) => void;
  onDeleteItem: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  galleryItems,
  currentUser,
  onAddItem,
  onDeleteItem
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'foto' | 'video'>('foto');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<
    'Suasana Kelas' | 'Praktek Reballing' | 'Sertifikasi BNSP' | 'Kelulusan'
  >('Suasana Kelas');
  const [description, setDescription] = useState('');

  const albumCategories = [
    { id: 'Semua', name: 'Semua Album Foto', icon: Layers },
    { id: 'Suasana Kelas', name: 'Suasana Kelas & Teori', icon: FolderHeart },
    { id: 'Praktek Reballing', name: 'Praktek Hardware & Reballing', icon: FolderHeart },
    { id: 'Sertifikasi BNSP', name: 'Sertifikasi & Uji BNSP', icon: FolderHeart },
    { id: 'Kelulusan', name: 'Wisuda & Kelulusan Alumni', icon: FolderHeart }
  ];

  const filtered = galleryItems.filter(
    (item) => selectedCategory === 'Semua' || item.category === selectedCategory
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !title) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title,
      type,
      url,
      category,
      description: description || undefined,
      date: new Date().toISOString().split('T')[0]
    };

    onAddItem(newItem);
    setIsModalOpen(false);

    setTitle('');
    setUrl('');
    setDescription('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
              <Image className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>ALBUM DOKUMENTASI KEGIATAN LPK</span>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                Album Foto & Dokumentasi Kegiatan
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Dokumentasi resmi aktivitas kelas teori, lab hardware, praktek reballing IC, sertifikasi uji kompetensi BNSP, hingga acara wisuda alumni.
              </p>
            </div>
          </div>

          {isAdmin ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0 border border-indigo-400/30"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-200" />
              <span>Tambah Foto Album (Admin)</span>
            </button>
          ) : (
            <div className="text-xs text-slate-400 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
              Dokumentasi Resmi LPK SM Flasher
            </div>
          )}
        </div>
      </div>

      {/* Album Category Filter Chips */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {albumCategories.map((album) => {
            const count =
              album.id === 'Semua'
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === album.id).length;
            const isSelected = selectedCategory === album.id;

            return (
              <button
                key={album.id}
                onClick={() => setSelectedCategory(album.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800'
                }`}
              >
                <span>{album.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full ${
                    isSelected ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Photo Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-2">
            <Image className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-bold text-slate-300">Belum ada foto dalam album ini</p>
            <p className="text-slate-500">Pilih album lain atau tambahkan foto kegiatan baru.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl relative group hover:border-indigo-500/40 transition cursor-pointer"
              onClick={() => setPreviewItem(item)}
            >
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteItem(item.id);
                  }}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-slate-950/80 text-slate-400 hover:text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  title="Hapus Foto Album"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="aspect-video bg-slate-950 relative overflow-hidden">
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-cover" />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 text-indigo-300 text-[10px] font-extrabold border border-indigo-500/30">
                  {item.category}
                </span>

                <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition">
                  <Maximize2 className="w-3.5 h-3.5 text-indigo-300" />
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
                <div className="pt-2 text-[10px] text-slate-500 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>Dokumentasi Tgl: {item.date}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lightbox / Fullscreen Modal Viewer */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-white space-y-4 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden bg-slate-950 max-h-[60vh] flex items-center justify-center border border-slate-800">
              {previewItem.type === 'video' ? (
                <video src={previewItem.url} controls className="w-full max-h-[60vh] object-contain" />
              ) : (
                <img
                  src={previewItem.url}
                  alt={previewItem.title}
                  className="w-full max-h-[60vh] object-contain"
                />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {previewItem.category}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>{previewItem.date}</span>
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{previewItem.title}</h3>
              {previewItem.description && (
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {previewItem.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Admin Modal Add Gallery Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-white space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold">Tambah Foto Album Kegiatan</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Judul Foto / Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Praktek Reballing CPU Snapdragon 865"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Tipe Media</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="foto">Foto</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Album Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Suasana Kelas">Suasana Kelas & Teori</option>
                    <option value="Praktek Reballing">Praktek Hardware & Reballing</option>
                    <option value="Sertifikasi BNSP">Sertifikasi BNSP</option>
                    <option value="Kelulusan">Kelulusan & Wisuda</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">File Foto / URL Media *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://... atau upload file"
                    className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                  <label className="px-3 py-2.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-200 text-xs font-bold rounded-lg transition cursor-pointer flex items-center space-x-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Deskripsi Kegiatan</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Keterangan foto kegiatan..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-xs rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-xs font-bold rounded-lg shadow"
                >
                  Simpan Foto Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
