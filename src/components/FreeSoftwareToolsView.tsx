import React, { useState } from 'react';
import { FreeToolSoftware, User } from '../types';
import { Download, Search, Plus, Trash2, ShieldCheck, Wrench, FileCode, CheckCircle2, ExternalLink, X, Cpu, HardDrive } from 'lucide-react';

interface FreeSoftwareToolsViewProps {
  tools: FreeToolSoftware[];
  currentUser: User;
  onAddTool?: (tool: FreeToolSoftware) => void;
  onDeleteTool?: (id: string) => void;
}

export const FreeSoftwareToolsView: React.FC<FreeSoftwareToolsViewProps> = ({
  tools,
  currentUser,
  onAddTool,
  onDeleteTool
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Admin Add Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FreeToolSoftware['category']>('Flashing Tool');
  const [version, setVersion] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [description, setDescription] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const categories = [
    'Semua',
    'Flashing Tool',
    'Unlocking / FRP',
    'Driver',
    'Firmware Tool',
    'Diagram / Pinout',
    'Lainnya'
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === 'Semua' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.version && tool.version.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !downloadUrl.trim()) return;

    const newTool: FreeToolSoftware = {
      id: `tool-${Date.now()}`,
      title: title.trim(),
      category,
      version: version.trim() || 'v1.0',
      fileSize: fileSize.trim() || 'Terkompresi',
      description: description.trim() || 'Software gratis teruji untuk teknisi handphone.',
      downloadUrl: downloadUrl.trim(),
      postedBy: currentUser.name,
      createdAt: new Date().toISOString()
    };

    if (onAddTool) {
      onAddTool(newTool);
    }

    setIsModalOpen(false);
    // Reset Form
    setTitle('');
    setVersion('');
    setFileSize('');
    setDescription('');
    setDownloadUrl('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Tool & Software Repair Gratis (Free Download)</h2>
            <p className="text-xs text-slate-400">Kumpulan software flashing, driver USB, dan utility unlock resmi yang teruji aman & bebas malware</p>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Posting Software Free Baru</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari Odin, SP Flash Tool, Driver USB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <FileCode className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">Belum ada Tool Software pada kategori ini</h3>
          <p className="text-xs">Silakan pilih kategori lain atau admin dapat menambahkan software baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition relative group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {tool.category}
                  </span>

                  {isAdmin && onDeleteTool && (
                    <button
                      onClick={() => {
                        if (confirm(`Hapus software "${tool.title}"?`)) {
                          onDeleteTool(tool.id);
                        }
                      }}
                      className="p-1.5 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-lg transition"
                      title="Hapus Software (Admin)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-400 transition leading-snug">
                    {tool.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                    {tool.version && <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">{tool.version}</span>}
                    {tool.fileSize && (
                      <span className="flex items-center space-x-1 text-slate-400">
                        <HardDrive className="w-3 h-3 text-cyan-400" />
                        <span>{tool.fileSize}</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800 line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px]">Di-post: {tool.postedBy}</span>
                <a
                  href={tool.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Tool</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Add Tool Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Khusus Panel Admin</span>
            </div>
            <h3 className="text-lg font-extrabold text-white">Posting Software Free Download Baru</h3>
            <p className="text-xs text-slate-400 mb-4">Siswa dapat langsung mengunduh link file tool gratis dari halaman ini</p>

            <form onSubmit={handleCreateTool} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Nama Tool / Software *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: SP Flash Tool v5.1924 MediaTek Flasher"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Kategori Tool *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as FreeToolSoftware['category'])}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="Flashing Tool">Flashing Tool</option>
                    <option value="Unlocking / FRP">Unlocking / FRP</option>
                    <option value="Driver">Driver</option>
                    <option value="Firmware Tool">Firmware Tool</option>
                    <option value="Diagram / Pinout">Diagram / Pinout</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Versi Software</label>
                  <input
                    type="text"
                    placeholder="v3.14.4"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Ukuran File (File Size)</label>
                <input
                  type="text"
                  placeholder="48 MB / 120 MB"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Deskripsi & Petunjuk Singkat Penggunaan</label>
                <textarea
                  rows={3}
                  placeholder="Penjelasan fungsi tool dan cara pakainya..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">URL Link Download Direct / Google Drive *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/... atau https://smflasher.com/tool.zip"
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-xs font-bold rounded-lg shadow flex items-center space-x-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Posting Tool Free</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
