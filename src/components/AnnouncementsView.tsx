import React, { useState } from 'react';
import { Announcement, User } from '../types';
import { Bell, Pin, Plus, Trash2, Calendar, UserCheck, X } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
  currentUser: User;
  onAddAnnouncement: (announcement: Announcement) => void;
  onDeleteAnnouncement: (id: string) => void;
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({
  announcements,
  currentUser,
  onAddAnnouncement,
  onDeleteAnnouncement
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Ujian BNSP' | 'Jadwal Kelas' | 'Penting' | 'General'>('Ujian BNSP');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      category,
      content,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      author: currentUser.name,
      isPinned
    };

    onAddAnnouncement(newAnn);
    setIsModalOpen(false);

    setTitle('');
    setContent('');
    setIsPinned(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Pengumuman & Informasi Terbaru LPK SM Flasher</h2>
            <p className="text-xs text-slate-400">Pemberitahuan resmi jadwal uji kompetensi BNSP, kelas offline, & kabar alumni</p>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pengumuman Baru</span>
          </button>
        )}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            Belum ada pengumuman yang diterbitkan.
          </div>
        ) : (
          announcements.map((ann) => (
            <div
              key={ann.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl space-y-3 relative transition ${
                ann.isPinned ? 'border-indigo-500/50 bg-indigo-950/20' : 'border-slate-800'
              }`}
            >
              {isAdmin && (
                <button
                  onClick={() => onDeleteAnnouncement(ann.id)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition"
                  title="Hapus Pengumuman"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center space-x-2">
                {ann.isPinned && (
                  <span className="p-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    <Pin className="w-3.5 h-3.5" />
                  </span>
                )}
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {ann.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{ann.date}</span>
                </span>
              </div>

              <h3 className="text-base font-extrabold text-white">{ann.title}</h3>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 whitespace-pre-line">
                {ann.content}
              </p>

              <div className="flex items-center space-x-2 text-[10px] text-slate-500 pt-1">
                <UserCheck className="w-3 h-3 text-indigo-400" />
                <span>Diterbitkan oleh {ann.author}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Add Announcement */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-white">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">Buat Pengumuman Baru</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                >
                  <option value="Ujian BNSP">Ujian BNSP</option>
                  <option value="Jadwal Kelas">Jadwal Kelas</option>
                  <option value="Penting">Penting</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Isi Pengumuman *</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-indigo-600"
                />
                <label htmlFor="pinCheck" className="text-xs text-slate-300">
                  Sematkan di Atas (Pinned Announcement)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-xs font-bold rounded-lg shadow">
                  Terbitkan Pengumuman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
