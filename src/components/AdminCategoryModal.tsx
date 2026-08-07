import React, { useState } from 'react';
import { Tag, Plus, Edit3, Trash2, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminCategoryModalProps {
  categories: string[];
  onAddCategory: (newCategory: string) => void;
  onEditCategory: (oldCategory: string, updatedCategory: string) => void;
  onDeleteCategory: (categoryToDelete: string) => void;
  onClose: () => void;
}

export const AdminCategoryModal: React.FC<AdminCategoryModalProps> = ({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onClose
}) => {
  const [newCatInput, setNewCatInput] = useState('');
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [notification, setNotification] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatInput.trim();
    if (!trimmed) return;

    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      alert('Kategori ini sudah ada!');
      return;
    }

    onAddCategory(trimmed);
    setNewCatInput('');
    setNotification(`Kategori "${trimmed}" berhasil ditambahkan!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleStartEdit = (cat: string) => {
    setEditingCat(cat);
    setEditingValue(cat);
  };

  const handleSaveEdit = (oldCat: string) => {
    const trimmed = editingValue.trim();
    if (!trimmed) return;

    if (trimmed !== oldCat && categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      alert('Kategori dengan nama ini sudah ada!');
      return;
    }

    onEditCategory(oldCat, trimmed);
    setEditingCat(null);
    setNotification(`Kategori "${oldCat}" berhasil diubah menjadi "${trimmed}"!`);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDelete = (cat: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${cat}"? Video dalam kategori ini akan dialihkan ke "Dasar Hardware".`)) {
      onDeleteCategory(cat);
      setNotification(`Kategori "${cat}" berhasil dihapus.`);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold">Kelola Kategori Materi & Modul (Admin)</h3>
            <p className="text-xs text-slate-400">Tambah, ubah nama, atau hapus kategori materi pelatihan</p>
          </div>
        </div>

        {notification && (
          <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Form Tambah Kategori */}
        <form onSubmit={handleAddSubmit} className="mb-5 p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
          <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Tambah Kategori Baru
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newCatInput}
              onChange={(e) => setNewCatInput(e.target.value)}
              placeholder="Contoh: Perbaikan Sinyal 5G / Reballing iPhone"
              className="flex-1 px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </div>
        </form>

        {/* Daftar Kategori Terdaftar */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Daftar Kategori Terdaftar ({categories.length})
          </label>

          {categories.map((cat) => (
            <div
              key={cat}
              className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2"
            >
              {editingCat === cat ? (
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-indigo-500/50 rounded-lg text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(cat)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingCat(null)}
                    className="px-2.5 py-1.5 bg-slate-800 text-slate-300 text-xs rounded-lg"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2 truncate">
                    <Tag className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-200 truncate">{cat}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(cat)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-indigo-400 rounded-lg border border-slate-800 transition"
                      title="Edit Nama Kategori"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(cat)}
                      className="p-1.5 bg-slate-900 hover:bg-red-900/50 text-slate-400 hover:text-red-300 rounded-lg border border-slate-800 transition"
                      title="Hapus Kategori"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
