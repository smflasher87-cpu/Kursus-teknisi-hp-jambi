import React, { useState, useRef } from 'react';
import { Video } from '../types';
import { X, Film, Plus, Trash2, Edit3, FileText, CheckCircle2, Upload, HardDrive, Play, Link } from 'lucide-react';
import { renderVideoElement } from '../utils/videoUtils';
import { uploadFileToDrive, getDriveAccessToken } from '../utils/googleDrive';

interface AdminVideoModalProps {
  videos: Video[];
  onAddVideo: (newVideo: Video) => void;
  onUpdateVideo: (updatedVideo: Video) => void;
  onDeleteVideo: (videoId: string) => void;
  onClose: () => void;
}

const CATEGORIES = [
  'Hardware Basic & Skematik',
  'Android Hardware & IC Repair',
  'iPhone Hardware & Board Repair',
  'Software Android & Flashing',
  'Software iPhone & iOS System',
  'LCD & Glass Remanufacturing'
];

export const AdminVideoModal: React.FC<AdminVideoModalProps> = ({
  videos,
  onAddVideo,
  onUpdateVideo,
  onDeleteVideo,
  onClose
}) => {
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSourceType, setVideoSourceType] = useState<'upload' | 'url'>('upload');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');
  const [duration, setDuration] = useState('20:00');
  const [description, setDescription] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfContent, setPdfContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const [notification, setNotification] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenNewForm = () => {
    setEditingVideo(null);
    setTitle('');
    setCategory(CATEGORIES[0]);
    setVideoUrl('');
    setVideoSourceType('upload');
    setUploadedFileName('');
    setUploadedFileSize('');
    setDuration('20:00');
    setDescription('');
    setPdfTitle('');
    setPdfContent('');
    setTagsInput('Multimeter, Skematik, Soldering');
    setIsFormOpen(true);
    setNotification('');
  };

  const handleOpenEditForm = (v: Video) => {
    setEditingVideo(v);
    setTitle(v.title);
    setCategory(v.category);
    setVideoUrl(v.videoUrl);
    setVideoSourceType(v.videoUrl.startsWith('data:') || v.videoUrl.startsWith('blob:') ? 'upload' : 'url');
    setUploadedFileName(v.videoUrl.startsWith('data:') ? 'Video_Terupload.mp4' : '');
    setUploadedFileSize('');
    setDuration(v.duration);
    setDescription(v.description);
    setPdfTitle(v.pdfTitle || '');
    setPdfContent(v.pdfContent || '');
    setTagsInput(v.tags ? v.tags.join(', ') : '');
    setIsFormOpen(true);
    setNotification('');
  };

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Silakan pilih file video yang valid (contoh: MP4, WebM, MKV, AVI).');
      return;
    }

    setIsUploading(true);
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);

    const driveToken = getDriveAccessToken();
    if (driveToken) {
      try {
        const driveRes = await uploadFileToDrive(driveToken, file, file.name, file.type);
        setVideoUrl(driveRes.webViewLink);
        setNotification('File video berhasil diunggah langsung ke Google Drive!');
      } catch (err) {
        console.warn('Direct drive upload failed, falling back to local data URL:', err);
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (!getDriveAccessToken()) {
        setVideoUrl(result);
      }
      setIsUploading(false);

      if (!title.trim()) {
        const titleFromFileName = file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
        setTitle(titleFromFileName);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoUrl) {
      alert('Silakan upload file video dari penyimpanan atau masukkan URL video!');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingVideo) {
      const updated: Video = {
        ...editingVideo,
        title,
        category,
        videoUrl,
        duration,
        description,
        pdfTitle: pdfTitle || title,
        pdfContent: pdfContent || description,
        pdfFileName: `Modul_${editingVideo.id}.pdf`,
        tags: tagsArray
      };
      onUpdateVideo(updated);
      setNotification('Video dan modul PDF berhasil diperbarui!');
    } else {
      const newVideoId = `vid-${Date.now()}`;
      const newVid: Video = {
        id: newVideoId,
        title,
        category,
        deviceType: category.toLowerCase().includes('iphone') ? 'iPhone' : 'Android',
        moduleType: category.toLowerCase().includes('software') ? 'Software' : 'Hardware',
        level: category.toLowerCase().includes('expert') ? 'Expert' : 'Basic',
        videoUrl,
        duration,
        description,
        pdfTitle: pdfTitle || title,
        pdfContent: pdfContent || description,
        pdfFileName: `Modul_${newVideoId}.pdf`,
        tags: tagsArray,
        addedBy: 'Master Teknisi SM FLASHER',
        createdAt: new Date().toISOString()
      };
      onAddVideo(newVid);
      setNotification('Video pelatihan baru berhasil ditambahkan dan tersimpan!');
    }

    setIsFormOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Kelola Video Tutorial & Modul PDF</h2>
              <p className="text-xs text-slate-400">
                Manajemen Materi Pembelajaran LPK SM FLASHER TRAINING CENTRE
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Header */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-300 font-semibold">
            Total Video Terpasang: <span className="text-indigo-400 font-bold">{videos.length}</span>
          </span>
          {!isFormOpen && (
            <button
              onClick={handleOpenNewForm}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Video Baru</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {notification && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{notification}</span>
            </div>
          )}

          {isFormOpen ? (
            <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  {editingVideo ? 'Edit Data Video & Modul PDF' : 'Tambah Video Pelatihan Baru'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Batal
                </button>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Judul Video Tutorial</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pengukuran Jalur VBUS & Diode Mode Multimeter"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Kategori Pelatihan</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Durasi Video (MM:SS)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="25:00"
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Video Source Selection (File Upload vs Link URL) */}
              <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Film className="w-4 h-4 text-indigo-400" />
                    <span>Sumber File Video Pelatihan *</span>
                  </label>
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setVideoSourceType('upload')}
                      className={`px-3 py-1 text-[11px] font-bold rounded-md transition flex items-center space-x-1 ${
                        videoSourceType === 'upload'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <HardDrive className="w-3 h-3" />
                      <span>Upload Penyimpanan (PC/HP)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoSourceType('url')}
                      className={`px-3 py-1 text-[11px] font-bold rounded-md transition flex items-center space-x-1 ${
                        videoSourceType === 'url'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Link className="w-3 h-3" />
                      <span>URL Streaming Direct</span>
                    </button>
                  </div>
                </div>

                {videoSourceType === 'upload' ? (
                  <div className="space-y-3 pt-1">
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-400 bg-slate-950/70 hover:bg-slate-950 p-5 rounded-xl text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2 group"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/mkv,video/avi,video/*"
                        onChange={handleVideoFileUpload}
                        className="hidden"
                      />

                      <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-full group-hover:scale-110 transition border border-indigo-500/30">
                        <Upload className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200">
                          {isUploading ? 'Memproses & Memuat File Video...' : 'Pilih / Unggah File Video dari Penyimpanan Perangkat'}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Mendukung format MP4, WebM, MKV, AVI. File akan tersimpan langsung di sistem aplikasi.
                        </p>
                      </div>

                      {uploadedFileName && (
                        <div className="mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="truncate max-w-[200px]">{uploadedFileName}</span>
                          {uploadedFileSize && <span className="opacity-75">({uploadedFileSize})</span>}
                        </div>
                      )}
                    </div>

                    {/* Base64 / Data URL / Direct Video Input Fallback */}
                    {videoUrl && (
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 block font-mono truncate">
                          Data Video ID: {videoUrl.substring(0, 60)}...
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Masukkan URL Video Direct MP4 / WebM (https://...)"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500 font-mono"
                      required={videoSourceType === 'url'}
                    />
                  </div>
                )}

                {/* Live Preview Box */}
                {videoUrl && (
                  <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                      <span className="flex items-center space-x-1.5 text-emerald-400">
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Pratinjau Video (Video File Ready)</span>
                      </span>
                      <span className="text-[10px] text-slate-400">Dapat Diputar Siswa</span>
                    </div>

                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-slate-800">
                      {renderVideoElement(videoUrl, title)}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Deskripsi & Rincian Materi Video</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan secara ringkas poin-poin yang dipelajari pada video ini..."
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                  required
                />
              </div>

              {/* PDF Module Info */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Modul Panduan Praktik PDF (Dapat Diunduh Siswa)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Judul Buku Modul PDF</label>
                    <input
                      type="text"
                      value={pdfTitle}
                      onChange={(e) => setPdfTitle(e.target.value)}
                      placeholder="Contoh: Modul SOP Pengukuran Jalur PCB & MBR Injection"
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Isi SOP / Ringkasan Modul PDF</label>
                    <textarea
                      rows={4}
                      value={pdfContent}
                      onChange={(e) => setPdfContent(e.target.value)}
                      placeholder="Tuliskan langkah-langkah SOP, nilai parameter suhu blower/solder, atau referensi jalur skematik..."
                      className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500 font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Kata Kunci / Tags (Dipisahkan Koma)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Multimeter, Borneo Schematics, Short, Reballing"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition"
                >
                  {editingVideo ? 'Simpan Perubahan Video' : 'Terbitkan Video Pelatihan'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                >
                  Batal
                </button>
              </div>
            </form>
          ) : (
            /* VIDEO LIST TABLE */
            <div className="space-y-3">
              {videos.map((v) => (
                <div
                  key={v.id}
                  className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                      <Film className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-white">{v.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 font-medium">
                          {v.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">⏱ {v.duration}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{v.description}</p>
                      {v.tags && v.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {v.tags.map((t) => (
                            <span key={t} className="text-[9px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 justify-end">
                    <button
                      onClick={() => handleOpenEditForm(v)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition flex items-center space-x-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Yakin ingin menghapus video "${v.title}"?`)) {
                          onDeleteVideo(v.id);
                        }
                      }}
                      className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-400 rounded-lg border border-red-800/80"
                      title="Hapus Video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
