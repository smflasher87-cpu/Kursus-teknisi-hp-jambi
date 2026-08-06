import React, { useState } from 'react';
import {
  Wrench,
  Thermometer,
  Zap,
  Activity,
  HardDrive,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sliders,
  Maximize2
} from 'lucide-react';

export const TechnicianToolbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'multimeter' | 'blower' | 'psu' | 'emmc'>('multimeter');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mb-8 shadow-xl relative overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-extrabold text-white">Panduan Refrensi & Parameter Standar Teknisi</h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                SOP SKEMATIK
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Tabel acuan pengujian multimeter, suhu blower, diagnosa power supply, & kesehatan IC.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isOpen ? 'Sembunyikan Reference Table' : 'Buka Panel Reference Table'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </button>
      </div>

      {/* Expanded Content Panel */}
      {isOpen && (
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-6 animate-fadeIn">
          {/* Sub-tabs Navigation */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('multimeter')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                activeTab === 'multimeter'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Diode Mode Voltages</span>
            </button>

            <button
              onClick={() => setActiveTab('blower')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                activeTab === 'blower'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              <span>Suhu Blower & Solder</span>
            </button>

            <button
              onClick={() => setActiveTab('psu')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                activeTab === 'psu'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Analisis Arus Power Supply</span>
            </button>

            <button
              onClick={() => setActiveTab('emmc')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition ${
                activeTab === 'emmc'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              <span>Kesehatan eMMC & UFS</span>
            </button>
          </div>

          {/* Tab 1: Multimeter Diode Mode */}
          {activeTab === 'multimeter' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Tabel Pengukuran Mode Diode (Probe Merah di Ground / Body PCB)
                </h4>
                <span className="text-[11px] text-slate-400">Penyimpangan &gt; 0.150V menandakan Jalur Bermasalah</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Jalur PCB</th>
                      <th className="p-3">Tegangan Normal</th>
                      <th className="p-3">Kondisi Short (Rusak)</th>
                      <th className="p-3">Analisa & Tindakan SOP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VBUS (Charging 5V)</td>
                      <td className="p-3 font-mono text-emerald-400">0.450 V - 0.600 V</td>
                      <td className="p-3 font-mono text-red-400">0.000 V (Full Short)</td>
                      <td className="p-3">Ganti OVP IC / Kapasitor Filter VBUS bocor dekat IC Charger.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VBAT (Catu Baterai 4.2V)</td>
                      <td className="p-3 font-mono text-emerald-400">0.380 V - 0.520 V</td>
                      <td className="p-3 font-mono text-red-400">&lt; 0.200 V (Half Short)</td>
                      <td className="p-3">Injeksi MBR 3.8V 3A, semprot rosin untuk mencari IC Power/Kapasitor memanas.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VPH_PWR / VBOOST</td>
                      <td className="p-3 font-mono text-emerald-400">0.350 V - 0.480 V</td>
                      <td className="p-3 font-mono text-red-400">0.000 V (Direct Short)</td>
                      <td className="p-3">Konsumsi arus gantung sebelum tekan power. Gunakan Kamera Thermal.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">USB D+ / D- Data Line</td>
                      <td className="p-3 font-mono text-emerald-400">0.500 V - 0.700 V</td>
                      <td className="p-3 font-mono text-red-400">OL (Putus Jalur / Open)</td>
                      <td className="p-3">Penyebab fast charging tidak aktif / HP tidak terbaca komputer. Reball CPU.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">I2C Bus (SDA / SCL)</td>
                      <td className="p-3 font-mono text-emerald-400">0.400 V - 0.550 V</td>
                      <td className="p-3 font-mono text-red-400">&gt; 0.800 V atau OL</td>
                      <td className="p-3">Resistor Pull-up I2C mulur/putus. Menyebabkan restart berulang (Bootloop).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Suhu Blower & Solder */}
          {activeTab === 'blower' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Thermometer className="w-4 h-4" />
                  <span>Setelan Blower Hot Air (Quick 861DW / Dwell)</span>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Angkat IC Berlapis Lem (Epoxy):</span>
                    <span className="font-mono font-bold text-indigo-300">Suhu 340°C - 360°C | Angin 3.5</span>
                  </li>
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Bersihkan Sisa Lem di PCB:</span>
                    <span className="font-mono font-bold text-indigo-300">Suhu 280°C - 300°C | Angin 2.5</span>
                  </li>
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Cetak Bola Timah (Reballing):</span>
                    <span className="font-mono font-bold text-indigo-300">Suhu 260°C - 280°C | Angin 2.0</span>
                  </li>
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Separasi Interposer iPhone:</span>
                    <span className="font-mono font-bold text-indigo-300">Preheater 180°C - 200°C (2 Menit)</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Wrench className="w-4 h-4" />
                  <span>Solder Iron & Jenis Timah (JBC / Sugon)</span>
                </div>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Timah Lead-Free Pabrikan (High Temp):</span>
                    <span className="font-mono font-bold text-emerald-400">Titik Lebur 217°C (Solder 360°C)</span>
                  </li>
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Timah Lead / Timah Campuran (Standard):</span>
                    <span className="font-mono font-bold text-emerald-400">Titik Lebur 183°C (Solder 330°C)</span>
                  </li>
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Timah Low Temperature (Interposer/CPU):</span>
                    <span className="font-mono font-bold text-emerald-400">Titik Lebur 138°C / 158°C</span>
                  </li>
                  <li className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="font-medium">Cairan Flux Rekomendasi:</span>
                    <span className="font-mono font-bold text-indigo-300">Amtech NC-559-ASM / Relife RL-422</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Power Supply Analysis */}
          {activeTab === 'psu' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Diagnosa Pembacaan Arus Amperemeter Power Supply (Tegangan 4.0V)
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Arus Gantung 0.02A - 0.05A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Masalah Crystal Oscilator / LDO</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Tombol power ditekan, arus naik 0.03A lalu diam. Periksa frekuensi Kristal 26MHz & tegangan LDO VDD 1.8V ke CPU.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    Arus Gantung 0.10A - 0.20A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Kerusakan Firmware / eMMC UFS</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    CPU sudah bekerja melalukan handshake, namun gagal booting sistem. Lakukan cek Direct ISP via UFI / Easy JTAG.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Arus Denyut 0.00A - 0.45A - 0.00A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Short Sekunder Jalur LDO / DRAM</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Proteksi IC Power aktif mematikan arus saat mendeteksi short sekunder pada RAM / LDO 1.2V. Cek kapasitor sekunder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: eMMC & UFS Health */}
          {activeTab === 'emmc' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Indikator Kesehatan eMMC / UFS (MLC & SLC Life Time Estimation)
                </span>
                <span className="text-[11px] text-slate-400">Pembacaan Tool UFI / Easy JTAG Plus</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-900 rounded-lg border border-emerald-500/30 flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-400">0% - 10% Used</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Sangat Sehat. Memori flash dalam kondisi normal tanpa kendala write/read error.</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-amber-500/30 flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-400">50% - 70% Warning</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Penurunan Kinerja. Segera lakukan backup partisi penting & Repartition extCSD.</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-red-500/30 flex items-start space-x-3">
                  <Activity className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-red-400">90% - 100% Urgent (URGENT)</span>
                    <p className="text-[11px] text-slate-300 mt-0.5">Rusak Permanen. IC mengalami Read-Only, wajib diganti IC eMMC/UFS baru.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
