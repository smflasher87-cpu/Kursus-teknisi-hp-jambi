import React, { useState, useEffect } from 'react';
import { FileText, Plus, Download, Search, BookOpen, Trash2, Eye, ShieldCheck, X, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import { User } from '../types';

export interface PdfModule {
  id: string;
  title: string;
  category: 'Android Hardware' | 'iPhone Hardware' | 'Flashing & Software' | 'Skematik & Boardview' | 'Modul Umum LPK';
  description: string;
  fileUrl: string; // Data URL or external link
  fileName: string;
  fileSize?: string;
  uploadedBy: string;
  createdAt: string;
}

interface PdfModulesViewProps {
  currentUser: User;
  modules: PdfModule[];
  onAddModule: (newModule: PdfModule) => void;
  onDeleteModule: (id: string) => void;
}

// Utility to reliably trigger PDF file download across all browsers including Chrome
const downloadPdfFile = (fileUrl: string, fileName: string) => {
  try {
    if (fileUrl.startsWith('data:')) {
      const arr = fileUrl.split(',');
      const mimeMatch = arr[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      const blob = new Blob([u8arr], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || 'Modul_Materi_SMF.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    } else {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || 'Modul_Materi_SMF.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (err) {
    console.error('Download error:', err);
    window.open(fileUrl, '_blank');
  }
};

export const PdfModulesView: React.FC<PdfModulesViewProps> = ({
  currentUser,
  modules,
  onAddModule,
  onDeleteModule
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua Modul');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activePdfModal, setActivePdfModal] = useState<PdfModule | null>(null);
  const [activeBlobUrl, setActiveBlobUrl] = useState<string>('');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PdfModule['category']>('Android Hardware');
  const [description, setDescription] = useState('');
  const [pdfFileUrl, setPdfFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = [
    'Semua Modul',
    'Android Hardware',
    'iPhone Hardware',
    'Flashing & Software',
    'Skematik & Boardview',
    'Modul Umum LPK'
  ];

  // Convert data URLs to object URLs for smooth rendering in Chrome without iframe security blocking
  useEffect(() => {
    if (!activePdfModal) {
      if (activeBlobUrl && activeBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(activeBlobUrl);
      }
      setActiveBlobUrl('');
      return;
    }

    if (activePdfModal.fileUrl.startsWith('data:')) {
      try {
        const arr = activePdfModal.fileUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const objUrl = URL.createObjectURL(blob);
        setActiveBlobUrl(objUrl);
      } catch (e) {
        console.error('Blob URL creation error:', e);
        setActiveBlobUrl(activePdfModal.fileUrl);
      }
    } else {
      setActiveBlobUrl(activePdfModal.fileUrl);
    }
  }, [activePdfModal]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMessage('File harus berformat PDF (.pdf)');
      return;
    }

    setErrorMessage('');
    setFileName(file.name);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    setFileSize(`${sizeInMb} MB`);

    const reader = new FileReader();
    reader.onload = () => {
      setPdfFileUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFileUrl) {
      setErrorMessage('Wajib mengunggah file PDF dari penyimpanan!');
      return;
    }

    const newModule: PdfModule = {
      id: `pdf-${Date.now()}`,
      title,
      category,
      description,
      fileUrl: pdfFileUrl,
      fileName: fileName || `${title}.pdf`,
      fileSize: fileSize || '1.2 MB',
      uploadedBy: currentUser.name,
      createdAt: new Date().toISOString()
    };

    onAddModule(newModule);
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
    setPdfFileUrl('');
    setFileName('');
    setFileSize('');
  };

  const filteredModules = modules.filter((m) => {
    const matchesCat = selectedCategory === 'Semua Modul' || m.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      m.title.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query);

    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <BookOpen className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                PERPUSTAKAAN MODUL DIGITAL
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Modul Materi & Buku Panduan PDF</h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Kumpulan modul materi pelatihan teknisi, SOP pengerjaan, dan skematik panduan berformat PDF yang dapat dibaca & diunduh secara realtime oleh siswa LPK SM Flasher.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition flex items-center space-x-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Modul PDF Baru (Admin)</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter & Search Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="w-full md:w-64 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul modul PDF..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* PDF Grid */}
      {filteredModules.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">Belum ada modul PDF pada kategori ini</h4>
          <p className="text-xs text-slate-500">Silakan pilih kategori lain atau unggah modul baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.category}
                  </span>
                  {item.fileSize && (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {item.fileSize}
                    </span>
                  )}
                </div>

                <div className="flex items-start space-x-3 pt-1">
                  <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-400 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500">
                  Oleh: {item.uploadedBy}
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setActivePdfModal(item)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Baca</span>
                  </button>

                  <button
                    onClick={() => downloadPdfFile(item.fileUrl, item.fileName)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition border border-slate-700"
                    title="Download File PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => onDeleteModule(item.id)}
                      className="p-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded-lg transition border border-red-800"
                      title="Hapus Modul"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Add PDF Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 relative shadow-2xl my-8">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>Upload Modul PDF Baru</span>
              </h3>
              <p className="text-xs text-slate-400">Pilih file PDF dari penyimpanan HP/Laptop untuk dipublikasikan ke siswa.</p>
            </div>

            {errorMessage && (
              <p className="text-xs text-red-400 bg-red-950/80 p-3 rounded-xl border border-red-800">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">Judul Modul Materi *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Panduan Reballing IC CPU & RAM UFS"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">Kategori Modul *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Android Hardware">Android Hardware</option>
                  <option value="iPhone Hardware">iPhone Hardware</option>
                  <option value="Flashing & Software">Flashing & Software</option>
                  <option value="Skematik & Boardview">Skematik & Boardview</option>
                  <option value="Modul Umum LPK">Modul Umum LPK</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">Deskripsi / Ringkasan *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Isi ringkasan singkat isi modul PDF ini..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase block">Pilih File PDF Dari Penyimpanan *</label>
                <label className="w-full py-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center space-x-2 transition">
                  <Download className="w-4 h-4" />
                  <span>{fileName ? `File Terpilih: ${fileName}` : 'Pilih File PDF (.pdf)'}</span>
                  <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
                >
                  Simpan & Publikasikan PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Viewer Reader Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="truncate">
                  <h3 className="text-sm font-bold text-white truncate">{activePdfModal.title}</h3>
                  <p className="text-[10px] text-slate-400 truncate">{activePdfModal.category} &bull; {activePdfModal.fileName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => downloadPdfFile(activePdfModal.fileUrl, activePdfModal.fileName)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold rounded-lg transition flex items-center space-x-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setActivePdfModal(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-950 p-2 overflow-hidden relative">
              {activeBlobUrl ? (
                <object
                  data={activeBlobUrl}
                  type="application/pdf"
                  className="w-full h-full rounded-xl border-0"
                >
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 bg-slate-900 rounded-xl">
                    <FileText className="w-12 h-12 text-indigo-400" />
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-white">Browser Anda Memblokir Tampilan Preview PDF</h4>
                      <p className="text-xs text-slate-400 max-w-md">
                        Klik tombol di bawah untuk langsung membuka file PDF di tab baru atau mengunduhnya.
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => downloadPdfFile(activePdfModal.fileUrl, activePdfModal.fileName)}
                        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download File PDF</span>
                      </button>
                      <a
                        href={activeBlobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition flex items-center space-x-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Buka di Tab Baru</span>
                      </a>
                    </div>
                  </div>
                </object>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-xs font-bold space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memuat Dokumen PDF...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
