import React, { useState } from 'react';
import { Smartphone, Search, Plus, Cpu, ShieldCheck, Sparkles, Trash2, CheckCircle2, AlertTriangle, Layers, X } from 'lucide-react';
import { User } from '../types';

export interface LcdCompatibilityItem {
  id: string;
  brand: string; // e.g. Samsung, Xiaomi, Oppo, Vivo, Realme, Infinix, iPhone, Tecno
  phoneModel: string; // e.g. Poco X3 Pro / Poco X3 NFC
  lcdPartCode: string; // e.g. Panel IPS 120Hz Full HD+ / Connector 40 pin
  compatibleModels: string[]; // e.g. ['Poco X3 Pro', 'Poco X3 NFC', 'Redmi Note 10 Pro']
  flexPinoutNote?: string;
  displayTech?: string; // OLED, AMOLED, IPS LCD, TFT
  addedBy: string;
  createdAt: string;
}

interface LcdCompatibilityViewProps {
  currentUser: User;
  items: LcdCompatibilityItem[];
  onAddItem: (newItem: LcdCompatibilityItem) => void;
  onDeleteItem: (id: string) => void;
}

export const LcdCompatibilityView: React.FC<LcdCompatibilityViewProps> = ({
  currentUser,
  items,
  onAddItem,
  onDeleteItem
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [selectedBrand, setSelectedBrand] = useState<string>('Semua Merk');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [brand, setBrand] = useState('Xiaomi / Poco');
  const [phoneModel, setPhoneModel] = useState('');
  const [lcdPartCode, setLcdPartCode] = useState('');
  const [compatibleModelsText, setCompatibleModelsText] = useState('');
  const [flexPinoutNote, setFlexPinoutNote] = useState('');
  const [displayTech, setDisplayTech] = useState('IPS LCD 120Hz');

  const brands = [
    'Semua Merk',
    'Xiaomi / Poco',
    'Samsung',
    'Oppo',
    'Vivo',
    'Realme',
    'Infinix / Tecno',
    'iPhone',
    'Lainnya'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modelsList = compatibleModelsText
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    const newItem: LcdCompatibilityItem = {
      id: `lcd-${Date.now()}`,
      brand,
      phoneModel,
      lcdPartCode,
      compatibleModels: modelsList.length > 0 ? modelsList : [phoneModel],
      flexPinoutNote,
      displayTech,
      addedBy: currentUser.name,
      createdAt: new Date().toISOString()
    };

    onAddItem(newItem);
    setIsAddModalOpen(false);
    setPhoneModel('');
    setLcdPartCode('');
    setCompatibleModelsText('');
    setFlexPinoutNote('');
  };

  const filteredItems = items.filter((item) => {
    const matchesBrand =
      selectedBrand === 'Semua Merk' ||
      item.brand.toLowerCase().includes(selectedBrand.toLowerCase()) ||
      (selectedBrand === 'Xiaomi / Poco' && (item.brand.includes('Xiaomi') || item.brand.includes('Poco') || item.brand.includes('Redmi'))) ||
      (selectedBrand === 'Infinix / Tecno' && (item.brand.includes('Infinix') || item.brand.includes('Tecno')));

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      item.phoneModel.toLowerCase().includes(query) ||
      item.lcdPartCode.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.compatibleModels.some((m) => m.toLowerCase().includes(query)) ||
      (item.flexPinoutNote && item.flexPinoutNote.toLowerCase().includes(query));

    return matchesBrand && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                DATABASE CROSS-COMPATIBILITY LCD SMARTPHONE
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Persamaan LCD Semua Merk Smartphone</h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Database komprehensif persamaan layar LCD, socket flex, IC driver display, dan layar yang saling bisa dipakai (swapable) antar tipe HP Android & iPhone.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition flex items-center space-x-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Input Persamaan LCD Baru</span>
          </button>
        </div>
      </div>

      {/* Brand Filters & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedBrand === b
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tipe HP (misal: Poco X3, Redmi Note 10, A53)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Grid of LCD Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <Smartphone className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-bold text-slate-300">Persamaan LCD tidak ditemukan</h4>
          <p className="text-xs text-slate-500">Gunakan kata kunci lain atau tambahkan data persamaan baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.brand}
                  </span>
                  {item.displayTech && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {item.displayTech}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{item.phoneModel}</span>
                  </h3>
                  <p className="text-xs font-mono font-bold text-indigo-300 mt-1">
                    Part LCD Code: {item.lcdPartCode}
                  </p>
                </div>

                {/* List of Cross Compatible Phone Models */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                    ✓ PERSAMAAN TIPE HP YANG COCOK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.compatibleModels.map((m, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Note */}
                {item.flexPinoutNote && (
                  <p className="text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                    <strong>Catatan Teknisi:</strong> {item.flexPinoutNote}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                <span>Diinput oleh: {item.addedBy}</span>
                {(isAdmin || currentUser.name === item.addedBy) && (
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/60 rounded transition"
                    title="Hapus Data"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New LCD Item Modal */}
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
                <Smartphone className="w-5 h-5 text-indigo-400" />
                <span>Input Persamaan LCD Smartphone Baru</span>
              </h3>
              <p className="text-xs text-slate-400">Tambahkan data kecocokan layar LCD antar model smartphone.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 uppercase block">Merk Utama *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Xiaomi / Poco">Xiaomi / Poco / Redmi</option>
                    <option value="Samsung">Samsung Galaxy</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Realme">Realme</option>
                    <option value="Infinix / Tecno">Infinix / Tecno</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Lainnya">Merk Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 uppercase block">Tipe HP Utama *</label>
                  <input
                    type="text"
                    required
                    value={phoneModel}
                    onChange={(e) => setPhoneModel(e.target.value)}
                    placeholder="Contoh: Poco X3 Pro"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 uppercase block">Kode Part / Flex LCD *</label>
                  <input
                    type="text"
                    required
                    value={lcdPartCode}
                    onChange={(e) => setLcdPartCode(e.target.value)}
                    placeholder="Contoh: IPS 120Hz FHD+ Flex 40 Pin"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300 uppercase block">Tipe Layar / Panel</label>
                  <input
                    type="text"
                    value={displayTech}
                    onChange={(e) => setDisplayTech(e.target.value)}
                    placeholder="Contoh: AMOLED / IPS LCD / OLED"
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">
                  Daftar Tipe HP Lain Yang Persis Sama (Pisahkan Koma) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={compatibleModelsText}
                  onChange={(e) => setCompatibleModelsText(e.target.value)}
                  placeholder="Contoh: Poco X3 NFC, Redmi Note 10 Pro (Certain rev)"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300 uppercase block">Catatan Tambahan Pemasangan / Pinout</label>
                <textarea
                  rows={2}
                  value={flexPinoutNote}
                  onChange={(e) => setFlexPinoutNote(e.target.value)}
                  placeholder="Contoh: Perlu modifikasi IC backlight / Solder ground tambahan..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                />
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
                  Simpan Persamaan LCD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
