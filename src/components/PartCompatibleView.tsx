import React, { useState } from 'react';
import { PartCompatibleItem, User } from '../types';
import {
  Cpu,
  Search,
  Plus,
  X,
  Smartphone,
  Layers,
  CheckCircle2,
  Sparkles,
  Info,
  Wrench,
  Tag,
  Trash2
} from 'lucide-react';

interface PartCompatibleViewProps {
  items: PartCompatibleItem[];
  currentUser: User;
  onAddItem: (item: PartCompatibleItem) => void;
  onDeleteItem: (id: string) => void;
}

export const PartCompatibleView: React.FC<PartCompatibleViewProps> = ({
  items,
  currentUser,
  onAddItem,
  onDeleteItem
}) => {
  const isAdmin = currentUser.role === 'admin';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Admin adding new IC compatibility entry
  const [componentCode, setComponentCode] = useState('');
  const [componentName, setComponentName] = useState('');
  const [category, setCategory] = useState<PartCompatibleItem['category']>('IC Power');
  const [compatibleDevicesText, setCompatibleDevicesText] = useState('');
  const [pinCountOrPackage, setPinCountOrPackage] = useState('');
  const [functionDescription, setFunctionDescription] = useState('');
  const [crossCompatibilityNotes, setCrossCompatibilityNotes] = useState('');

  const categories = [
    'Semua',
    'IC Power',
    'IC Charger',
    'IC RF / Transceiver',
    'IC PA',
    'IC Audio',
    'IC WiFi / BT',
    'IC Display & Backlight',
    'CPU / Memory'
  ];

  // Filter items by category and search query
  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Semua' || item.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesCode = item.componentCode.toLowerCase().includes(query);
    const matchesName = item.componentName.toLowerCase().includes(query);
    const matchesDesc = item.functionDescription.toLowerCase().includes(query);
    const matchesNotes = item.crossCompatibilityNotes.toLowerCase().includes(query);
    const matchesDevice = item.compatibleDevices.some((dev) =>
      dev.toLowerCase().includes(query)
    );

    return matchesCategory && (matchesCode || matchesName || matchesDesc || matchesNotes || matchesDevice);
  });

  const handleSubmitNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!componentCode || !componentName) return;

    const devicesList = compatibleDevicesText
      .split(',')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const newItem: PartCompatibleItem = {
      id: `pcd-${Date.now()}`,
      componentCode,
      componentName,
      category,
      compatibleDevices: devicesList.length > 0 ? devicesList : ['Umum'],
      pinCountOrPackage: pinCountOrPackage || undefined,
      functionDescription: functionDescription || 'Fungsi utama komponen',
      crossCompatibilityNotes: crossCompatibilityNotes || 'Saling menggantikan (100% Plug & Play).'
    };

    onAddItem(newItem);
    setIsModalOpen(false);

    // Reset Form
    setComponentCode('');
    setComponentName('');
    setCompatibleDevicesText('');
    setPinCountOrPackage('');
    setFunctionDescription('');
    setCrossCompatibilityNotes('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-lg">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>DATABASE SPESIALIS TEKNISI HP</span>
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                Part Compatible Database (PCD)
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Cari persamaan IC Power, IC Charger, IC PA, WTR, & Komponen HP berdasarkan kode part atau tipe handphone untuk kanibalan & penggantian presisi.
              </p>
            </div>
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 shrink-0 border border-indigo-400/30"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Data IC Compatible</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Input Bar & Category Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Search Bar Row */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-indigo-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan Kode IC (Contoh: PM660L, BQ25601, 1610A3) atau Tipe HP (Contoh: Redmi Note 8, Poco)..."
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl transition shadow flex items-center justify-center space-x-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Cari Data PCD</span>
          </button>
        </form>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800/80 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Menampilkan <strong className="text-white">{filteredItems.length}</strong> data komponen compatible
        </span>
        {searchQuery && (
          <span className="text-indigo-400">
            Kata kunci: "{searchQuery}"
          </span>
        )}
      </div>

      {/* IC Compatible List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredItems.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-2">
            <Cpu className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-bold text-slate-300">Komponen / Kode IC Tidak Ditemukan</p>
            <p className="text-slate-500 max-w-md mx-auto">
              Coba cari menggunakan kata kunci lain seperti merk HP, jenis IC (misal: PMIC, Transceiver, BQ), atau ganti kategori.
            </p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition space-y-4 relative group"
            >
              {/* Card Top Title Row */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-3 gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black text-indigo-300 font-mono tracking-tight">
                      {item.componentCode}
                    </span>
                    {item.pinCountOrPackage && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {item.pinCountOrPackage}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-200 mt-1">{item.componentName}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.category}
                  </span>

                  {isAdmin && (
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 bg-slate-950 text-slate-500 hover:text-red-400 rounded-lg transition"
                      title="Hapus Data PCD"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Function Description */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <Info className="w-3 h-3 text-indigo-400" />
                  <span>Fungsi & Peranan Utama:</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.functionDescription}</p>
              </div>

              {/* Compatible Phone Models Tags */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1">
                  <Smartphone className="w-3 h-3 text-emerald-400" />
                  <span>Tipe Handphone Kompatibel / Sama IC ({item.compatibleDevices.length} Model):</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.compatibleDevices.map((dev, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-950/90 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold hover:border-indigo-500/50 transition"
                    >
                      {dev}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cross Compatibility & Technical Jumper Notes */}
              <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Catatan Persamaan / Suffix Kode:</span>
                </span>
                <p className="text-xs text-emerald-200/90 leading-relaxed font-mono text-[11px]">
                  {item.crossCompatibilityNotes}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Admin Modal Add New Part Compatibility */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold">Tambah Data Part Compatible (PCD)</h3>
              <p className="text-xs text-slate-400">
                Isikan data persamaan IC, kode suffix, dan tipe HP pendukung.
              </p>
            </div>

            <form onSubmit={handleSubmitNewItem} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Kode Part / IC *</label>
                  <input
                    type="text"
                    required
                    value={componentCode}
                    onChange={(e) => setComponentCode(e.target.value)}
                    placeholder="Contoh: PM660L / BQ25601"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">Kategori IC</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    <option value="IC Power">IC Power</option>
                    <option value="IC Charger">IC Charger</option>
                    <option value="IC RF / Transceiver">IC RF / Transceiver</option>
                    <option value="IC PA">IC PA</option>
                    <option value="IC Audio">IC Audio</option>
                    <option value="IC WiFi / BT">IC WiFi / BT</option>
                    <option value="IC Display & Backlight">IC Display & Backlight</option>
                    <option value="CPU / Memory">CPU / Memory</option>
                    <option value="Komponen Lain">Komponen Lain</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Nama Deskriptif Komponen *</label>
                <input
                  type="text"
                  required
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  placeholder="Contoh: IC Power Sub Qualcomm & Driver Flash LED"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Paket Kemasan / Jumlah Pin (Opsional)</label>
                <input
                  type="text"
                  value={pinCountOrPackage}
                  onChange={(e) => setPinCountOrPackage(e.target.value)}
                  placeholder="Contoh: BGA 144 Ball / QFN 24 Pin"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Tipe Handphone Kompatibel (Pisahkan Koma) *</label>
                <textarea
                  rows={2}
                  required
                  value={compatibleDevicesText}
                  onChange={(e) => setCompatibleDevicesText(e.target.value)}
                  placeholder="Contoh: Redmi Note 5, Redmi Note 7, Asus Zenfone Max Pro M1, Realme 2 Pro"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Fungsi & Peranan Utama</label>
                <textarea
                  rows={2}
                  value={functionDescription}
                  onChange={(e) => setFunctionDescription(e.target.value)}
                  placeholder="Deskripsi singkat fungsi IC..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Catatan Persamaan Suffix Kode / Jumper</label>
                <input
                  type="text"
                  value={crossCompatibilityNotes}
                  onChange={(e) => setCrossCompatibilityNotes(e.target.value)}
                  placeholder="Contoh: Kode suffix 002 dan 003 dapat saling menggantikan 100%"
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
                  Simpan Data PCD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
