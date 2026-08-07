import React, { useState } from 'react';
import { CasePost, User } from '../types';
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle,
  Plus,
  Send,
  Smartphone,
  X,
  Search,
  Edit3,
  Trash2,
  Check
} from 'lucide-react';

interface CaseSharingViewProps {
  casePosts: CasePost[];
  currentUser: User;
  onAddPost: (post: CasePost) => void;
  onEditPost?: (post: CasePost) => void;
  onDeletePost?: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onToggleLike: (postId: string) => void;
}

export const CaseSharingView: React.FC<CaseSharingViewProps> = ({
  casePosts,
  currentUser,
  onAddPost,
  onEditPost,
  onDeletePost,
  onAddComment,
  onToggleLike
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const [deviceType, setDeviceType] = useState<'Android' | 'iPhone'>('Android');
  const [deviceModel, setDeviceModel] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [solutionText, setSolutionText] = useState('');
  const [isSolved, setIsSolved] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});

  const [filterStatus, setFilterStatus] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = casePosts.filter((post) => {
    if (filterStatus === 'solved' && !post.isSolved) return false;
    if (filterStatus === 'unsolved' && post.isSolved) return false;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    const matchesModel = post.deviceModel.toLowerCase().includes(q);
    const matchesSymptoms = post.symptoms.toLowerCase().includes(q);
    const matchesSolution = post.solutionText?.toLowerCase().includes(q) || false;
    const matchesAuthor = post.authorName.toLowerCase().includes(q);
    const matchesDeviceType = post.deviceType.toLowerCase().includes(q);

    return matchesModel || matchesSymptoms || matchesSolution || matchesAuthor || matchesDeviceType;
  });

  const handleOpenAddModal = () => {
    setEditingPostId(null);
    setDeviceType('Android');
    setDeviceModel('');
    setSymptoms('');
    setSolutionText('');
    setIsSolved(true);
    setPhotoUrl('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: CasePost) => {
    setEditingPostId(post.id);
    setDeviceType(post.deviceType || 'Android');
    setDeviceModel(post.deviceModel);
    setSymptoms(post.symptoms);
    setSolutionText(post.solutionText || '');
    setIsSolved(post.isSolved);
    setPhotoUrl(post.photoUrl || '');
    setIsModalOpen(true);
  };

  const handleDeleteClick = (postId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus postingan kasus ini?')) {
      if (onDeletePost) {
        onDeletePost(postId);
      }
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPostId) {
      // Edit existing post
      const existing = casePosts.find((p) => p.id === editingPostId);
      if (existing && onEditPost) {
        const updated: CasePost = {
          ...existing,
          deviceType,
          deviceModel,
          symptoms,
          solutionText: solutionText || undefined,
          isSolved,
          photoUrl: photoUrl || undefined
        };
        onEditPost(updated);
      }
    } else {
      // Add new post
      const newPost: CasePost = {
        id: `case-${Date.now()}`,
        authorId: currentUser.id,
        authorName: currentUser.name,
        deviceType,
        deviceModel,
        symptoms,
        solutionText: solutionText || undefined,
        isSolved,
        photoUrl: photoUrl || undefined,
        createdAt: new Date().toISOString(),
        likesCount: 1,
        comments: []
      };
      onAddPost(newPost);
    }

    setIsModalOpen(false);
  };

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId];
    if (text && text.trim()) {
      onAddComment(postId, text);
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Forum Berbagi Kasus & Solusi Kerusakan HP</h2>
            <p className="text-xs text-slate-400">Komunitas saling berbagi analisa trouble, jalur short, & trik jumper antar peserta</p>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Bagikan Kasus Baru</span>
        </button>
      </div>

      {/* Search Bar Column & Filter Tabs Bar */}
      <div className="bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kasus berdasarkan merk HP, gejala short, komponen IC, atau nama teknisi..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              Semua Kasus ({casePosts.length})
            </button>
            <button
              onClick={() => setFilterStatus('solved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === 'solved' ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              Solved ({casePosts.filter((p) => p.isSolved).length})
            </button>
            <button
              onClick={() => setFilterStatus('unsolved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterStatus === 'unsolved' ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              Butuh Solusi ({casePosts.filter((p) => !p.isSolved).length})
            </button>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Menampilkan {filteredPosts.length} Kasus Terdaftar
          </span>
        </div>
      </div>

      {/* Case Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            Belum ada postingan kasus pada pencarian ini. Klik "Bagikan Kasus Baru" untuk menambahkan!
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isOwnerOrAdmin = currentUser.role === 'admin' || currentUser.id === post.authorId;

            return (
              <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                      {post.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{post.authorName}</span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                          TEKNISI
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded flex items-center space-x-1 ${
                        post.deviceType === 'iPhone'
                          ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>{post.deviceType}</span>
                    </span>

                    {post.isSolved ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>SOLVED</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        BUTUH SOLUSI
                      </span>
                    )}

                    {/* Edit / Delete Buttons for Owner or Admin */}
                    {isOwnerOrAdmin && (
                      <div className="flex items-center space-x-1 ml-2 border-l border-slate-800 pl-2">
                        <button
                          onClick={() => handleOpenEditModal(post)}
                          className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-indigo-400 rounded transition"
                          title="Edit Kasus"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(post.id)}
                          className="p-1 bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 rounded transition"
                          title="Hapus Kasus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-indigo-300">
                    [{post.deviceModel}]
                  </h3>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Gejala & Keterangan Kerusakan:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{post.symptoms}</p>
                  </div>

                  {post.solutionText && (
                    <div className="bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-500/30 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                        Langkah Penanganan & Solusi:
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">{post.solutionText}</p>
                    </div>
                  )}

                  {post.photoUrl && (
                    <div className="pt-2">
                      <img
                        src={post.photoUrl}
                        alt="Lampiran PCB / Kasus"
                        className="max-h-64 rounded-xl object-cover border border-slate-800"
                      />
                    </div>
                  )}
                </div>

                {/* Actions & Likes */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-indigo-400 transition"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likesCount} Bermanfaat</span>
                  </button>

                  <span className="text-xs text-slate-500">{post.comments.length} Komentar Diskusi</span>
                </div>

                {/* Comments Section */}
                <div className="space-y-3 pt-2">
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-indigo-300">{comment.authorName}</span>
                          <span className="text-[9px] text-slate-500">
                            {new Date(comment.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-300">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Input */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendComment(post.id);
                      }}
                      placeholder="Tulis analisa atau komentar saran..."
                      className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Add / Edit Case */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-4">
              {editingPostId ? 'Edit Kasus Kerusakan HP' : 'Bagikan Kasus Kerusakan HP'}
            </h3>

            <form onSubmit={handleSubmitPost} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Perangkat</label>
                  <select
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Android">Android</option>
                    <option value="iPhone">iPhone</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Merk & Tipe HP *</label>
                  <input
                    type="text"
                    required
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="Contoh: Redmi Note 10 Pro / iPhone 11"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Gejala & Hasil Ukur Tegangan *</label>
                <textarea
                  required
                  rows={3}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Ceritakan kronologi, arus power supply, atau nilai Mode Diode..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Solusi & Komponen Diberbaiki (Opsional)</label>
                <textarea
                  rows={2}
                  value={solutionText}
                  onChange={(e) => setSolutionText(e.target.value)}
                  placeholder="Sebutkan IC, kapasitor, atau jalur yang di-jumper jika sudah berhasil..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Foto Hasil Pengerjaan / Skematik (URL / Upload)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://... atau pilih file di sebelah"
                    className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                  <label className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-lg transition cursor-pointer shrink-0">
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPhotoUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="solvedCheck"
                  checked={isSolved}
                  onChange={(e) => setIsSolved(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-800 text-indigo-600"
                />
                <label htmlFor="solvedCheck" className="text-xs text-slate-300">
                  Tandai Kasus Ini Sudah Selesai (SOLVED)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 bg-indigo-600 text-xs font-bold rounded-lg shadow">
                  {editingPostId ? 'Simpan Perubahan' : 'Terbitkan Kasus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
