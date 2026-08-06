import React, { useState } from 'react';
import { Video } from '../types';
import { generateModulePDF } from '../utils/pdfGenerator';
import {
  X,
  CheckCircle2,
  Download,
  FileText,
  BookOpen,
  Edit3,
  Clock,
  User,
  Save,
  Tag,
  Check
} from 'lucide-react';

interface VideoPlayerModalProps {
  video: Video;
  isCompleted: boolean;
  onToggleComplete: (videoId: string) => void;
  savedNote?: string;
  onSaveNote: (videoId: string, noteText: string) => void;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  isCompleted,
  onToggleComplete,
  savedNote = '',
  onSaveNote,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'notes'>('video');
  const [noteText, setNoteText] = useState(savedNote);
  const [noteSavedNotice, setNoteSavedNotice] = useState(false);

  const handleDownloadPDF = () => {
    generateModulePDF(video);
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveNote(video.id, noteText);
    setNoteSavedNotice(true);
    setTimeout(() => setNoteSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Topbar */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
              {video.category}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate">
              {video.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-5 pt-2 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition border-b-2 flex items-center space-x-2 ${
                activeTab === 'video'
                  ? 'bg-slate-800 text-indigo-400 border-indigo-400'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              <span>Pemutar Video</span>
              <span className="text-[10px] font-normal text-slate-400">({video.duration})</span>
            </button>

            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition border-b-2 flex items-center space-x-2 ${
                activeTab === 'pdf'
                  ? 'bg-slate-800 text-indigo-400 border-indigo-400'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Modul & SOP PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 text-xs font-bold rounded-t-xl transition border-b-2 flex items-center space-x-2 ${
                activeTab === 'notes'
                  ? 'bg-slate-800 text-indigo-400 border-indigo-400'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Catatan Pribadi</span>
              {savedNote && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
            </button>
          </div>

          {/* Quick Mark Complete Button */}
          <button
            onClick={() => onToggleComplete(video.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition flex items-center space-x-1.5 my-1 ${
              isCompleted
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : ''}`} />
            <span>{isCompleted ? 'Sudah Selesai (Klik Batal)' : 'Tandai Selesai Dipelajari'}</span>
          </button>
        </div>

        {/* Modal Main Content Area */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'video' && (
            <div className="space-y-5">
              {/* HTML5 Video Player */}
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <video
                  key={video.id}
                  controls
                  controlsList="nodownload"
                  className="w-full h-full object-contain"
                  poster=""
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Browser Anda tidak mendukung pemutar video HTML5.
                </video>
              </div>

              {/* Video Info Details */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <h3 className="text-base font-bold text-white">{video.title}</h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{video.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{video.addedBy}</span>
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Ringkasan Materi Pelatihan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {video.description}
                  </p>
                </div>

                {video.tags && video.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    {video.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-5">
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {video.pdfTitle || video.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Modul Cetak SOP Praktik & Referensi Skematik Jalur LPK SM FLASHER
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh Modul PDF</span>
                  </button>
                </div>

                {/* SOP Content View */}
                <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {video.pdfContent || video.description}
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>
                    Gunakan tombol "Unduh Modul PDF" di atas untuk menyimpan file dokumen cetak resmi ke perangkat Anda.
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <form onSubmit={handleSaveNoteSubmit} className="space-y-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-sm font-bold text-white">Catatan Pembelajaran Pribadi</h3>
                  </div>
                  {noteSavedNotice && (
                    <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1 animate-fade-in">
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersimpan di Browser</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  Tuliskan poin-poin penting seperti suhu blower, nilai multimeter, atau catatan jumper skematik yang ingin Anda ingat kembali. Catatan ini hanya dapat dilihat oleh akun Anda.
                </p>

                <textarea
                  rows={8}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Contoh: Suhu blower reballing CPU 340 derajat, jangan tahan lebih dari 30 detik. Jalur VBUS short akibat kapasitor C201 pecah."
                  className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono leading-relaxed"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Catatan Pembelajaran</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
