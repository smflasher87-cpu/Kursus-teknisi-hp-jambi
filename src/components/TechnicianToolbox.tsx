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
  Cpu,
  Smartphone,
  ShieldAlert,
  BatteryCharging,
  Radio,
  FileCheck2,
  GitBranch,
  Power,
  Gauge,
  Droplets,
  Volume2,
  Mic,
  Layers,
  ShieldCheck,
  Binary,
  Settings
} from 'lucide-react';

export const TechnicianToolbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    | 'qualcomm'
    | 'mediatek'
    | 'exynos'
    | 'spreadtrum'
    | 'multimeter'
    | 'boot_seq'
    | 'psu'
    | 'usb_meter'
    | 'jalur_matot'
    | 'sop_pertama'
    | 'alur_charging'
    | 'temp_error_ntc'
    | 'sinyal'
    | 'audio_display_tp'
    | 'bootloop_ufi'
    | 'iphone_matot_swap'
    | 'iphone_panic'
    | 'reball_blower_interposer'
    | 'flashing_unlocktool_boot'
    | 'schematic_connector_epoxy'
    | 'cpu_faults'
    | 'pengukuran_pasif_aktif'
    | 'komponen_elektronika'
    | 'osiloskop_exwater'
    | 'poco_ic_bertingkat'
    | 'jumper_fuse_pwrkey'
    | 'ic_rf_baseband_imei'
    | 'post_reball_check'
    | 'mic_speaker_audio'
    | 'ic_logic_protect'
    | 'alat_service_wajib'
    | 'ufi_direct_emmc_security'
  >('qualcomm');

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
              <h3 className="text-base font-extrabold text-white">Panel Reference Table & SOP Analisa Teknisi</h3>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                LENGKAP SKEMATIK
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Panduan Control Logic Chipset, Multimeter, Boot Sequence, Power Supply, USB Meter, Matot, SOP, Charging & Sinyal.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition flex items-center justify-center space-x-2 shrink-0"
        >
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isOpen ? 'Tutup Reference Table' : 'Buka Panel Reference Table (13 Modul)'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </button>
      </div>

      {/* Expanded Content Panel */}
      {isOpen && (
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-6 animate-fadeIn">
          {/* Sub-tabs Navigation */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('qualcomm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'qualcomm'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Logic Qualcomm</span>
            </button>

            <button
              onClick={() => setActiveTab('mediatek')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'mediatek'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Logic MediaTek</span>
            </button>

            <button
              onClick={() => setActiveTab('exynos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'exynos'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span>Logic Exynos</span>
            </button>

            <button
              onClick={() => setActiveTab('spreadtrum')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'spreadtrum'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Logic Unisoc/Spreadtrum</span>
            </button>

            <button
              onClick={() => setActiveTab('multimeter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'multimeter'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Multimeter</span>
            </button>

            <button
              onClick={() => setActiveTab('boot_seq')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'boot_seq'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Power className="w-3.5 h-3.5 text-amber-400" />
              <span>Boot Sequence & First Boot</span>
            </button>

            <button
              onClick={() => setActiveTab('psu')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'psu'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>Power Supply</span>
            </button>

            <button
              onClick={() => setActiveTab('usb_meter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'usb_meter'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>USB Current Meter</span>
            </button>

            <button
              onClick={() => setActiveTab('jalur_matot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'jalur_matot'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-red-400" />
              <span>Jalur Mati Total</span>
            </button>

            <button
              onClick={() => setActiveTab('sop_pertama')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'sop_pertama'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOP Analisa Awal</span>
            </button>

            <button
              onClick={() => setActiveTab('alur_charging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'alur_charging'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <BatteryCharging className="w-3.5 h-3.5 text-green-400" />
              <span>Alur Charging</span>
            </button>

            <button
              onClick={() => setActiveTab('temp_error_ntc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'temp_error_ntc'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              <span>Charging Error & NTC</span>
            </button>

            <button
              onClick={() => setActiveTab('sinyal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'sinyal'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-pink-400" />
              <span>Kerusakan Sinyal</span>
            </button>

            <button
              onClick={() => setActiveTab('audio_display_tp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'audio_display_tp'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Audio, Display & Touchscreen</span>
            </button>

            <button
              onClick={() => setActiveTab('cpu_faults')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'cpu_faults'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-red-400" />
              <span>Kerusakan CPU & Analisa PSU</span>
            </button>

            <button
              onClick={() => setActiveTab('bootloop_ufi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'bootloop_ufi'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-purple-400" />
              <span>SOP Bootloop & UFI Box eMMC/UFS</span>
            </button>

            <button
              onClick={() => setActiveTab('iphone_matot_swap')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'iphone_matot_swap'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-slate-300" />
              <span>iPhone Matot, Charging & Swap Board</span>
            </button>

            <button
              onClick={() => setActiveTab('iphone_panic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'iphone_panic'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Tabel Panic Full Log iPhone</span>
            </button>

            <button
              onClick={() => setActiveTab('reball_blower_interposer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'reball_blower_interposer'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-orange-400" />
              <span>Reball CPU, Interposer & Setelan Blower</span>
            </button>

            <button
              onClick={() => setActiveTab('flashing_unlocktool_boot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'flashing_unlocktool_boot'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cara Flashing, Tombol Boot & Unlocktool</span>
            </button>

            <button
              onClick={() => setActiveTab('schematic_connector_epoxy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'schematic_connector_epoxy'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Skematik, FRP/Mi Cloud & IC Lem</span>
            </button>

            <button
              onClick={() => setActiveTab('pengukuran_pasif_aktif')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'pengukuran_pasif_aktif'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Gauge className="w-3.5 h-3.5 text-yellow-400" />
              <span>Pengukuran Pasif (Diode) & Aktif (DC)</span>
            </button>

            <button
              onClick={() => setActiveTab('komponen_elektronika')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'komponen_elektronika'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Komponen Aktif & Pasif (R, C, L, Dioda, Transistor)</span>
            </button>

            <button
              onClick={() => setActiveTab('osiloskop_exwater')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'osiloskop_exwater'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Osiloskop & SOP Mati Ex Water</span>
            </button>

            <button
              onClick={() => setActiveTab('poco_ic_bertingkat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'poco_ic_bertingkat'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-red-400" />
              <span>Titik Ukur Poco X3 Pro, F3 & IC Bertingkat</span>
            </button>

            <button
              onClick={() => setActiveTab('jumper_fuse_pwrkey')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'jumper_fuse_pwrkey'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Power className="w-3.5 h-3.5 text-amber-400" />
              <span>Jumper Fuse Baterai & Cek Tombol ON/OFF</span>
            </button>

            <button
              onClick={() => setActiveTab('ic_rf_baseband_imei')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'ic_rf_baseband_imei'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-pink-400" />
              <span>Titik Ukur IC RF, PA, Baseband & IMEI</span>
            </button>

            <button
              onClick={() => setActiveTab('post_reball_check')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'post_reball_check'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Titik Ukur Setelah Reball CPU All Chipset</span>
            </button>

            <button
              onClick={() => setActiveTab('mic_speaker_audio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'mic_speaker_audio'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Analisa MIC & Speaker / Buzzer Musik</span>
            </button>

            <button
              onClick={() => setActiveTab('ic_logic_protect')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'ic_logic_protect'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cara Membaca In/Out, Perintah & Protect IC</span>
            </button>

            <button
              onClick={() => setActiveTab('alat_service_wajib')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'alat_service_wajib'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-orange-400" />
              <span>Alat Service Wajib Bengkel HP</span>
            </button>

            <button
              onClick={() => setActiveTab('ufi_direct_emmc_security')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                activeTab === 'ufi_direct_emmc_security'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              <span>Direct eMMC ISP & Backup Security File (UFI)</span>
            </button>
          </div>

          {/* 1. Qualcomm Control Logic */}
          {activeTab === 'qualcomm' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Control Logic Chipset Qualcomm Snapdragon (PM8953, PM660, PM8150, PM8350)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Arsitektur PMIC + Sub-PMIC Snapdragon</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Sinyal / Rail</th>
                      <th className="p-3">Tegangan Standar</th>
                      <th className="p-3">Fungsi & Asal Sinyal</th>
                      <th className="p-3">Gejala Jika Drop / Short</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">MSM_PS_HOLD</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Sinyal kunci dari CPU ke PMIC agar PMIC tetap ON saat tombol power dilepas.</td>
                      <td className="p-3 font-sans text-red-400">Arus gantung 0.05A - 0.08A lalu kembali ke 0.00A.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">VREG_S1 (VDD_CORE)</td>
                      <td className="p-3 text-emerald-400">0.80 V - 0.95 V</td>
                      <td className="p-3 font-sans">BUCK Output PMIC memberi daya ke Inti CPU (Core Logic).</td>
                      <td className="p-3 font-sans text-red-400">Mati total, klem PSU langsung short sekunder.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">PON_RESET_N / PM_RESIN_N</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Sinyal Reset & Power On Key dari PMIC ke CPU.</td>
                      <td className="p-3 font-sans text-red-400">Tombol power tidak merespon sama sekali (0.00A).</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">CXO_IN / CXO_OUT (19.2MHz / 38.4MHz)</td>
                      <td className="p-3 text-emerald-400">1.20 V / Freq 19.2M</td>
                      <td className="p-3 font-sans">Sinyal Detak Clock utama dari Oscilator Kristal.</td>
                      <td className="p-3 font-sans text-red-400">CPU mati membeku, arus gantung 0.02A - 0.03A.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">VREG_L6_1V8 (Always ON)</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">LDO Tegangan Standby untuk jalur Saklar & Sensor.</td>
                      <td className="p-3 font-sans text-red-400">HP mati total tidak bisa dicash maupun dionkan.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. MediaTek Control Logic */}
          {activeTab === 'mediatek' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Control Logic Chipset MediaTek MTK (MT6328, MT6357, MT6358, MT6359)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Arsitektur PMIC Helio / Dimensity</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Sinyal / Rail</th>
                      <th className="p-3">Tegangan Standar</th>
                      <th className="p-3">Fungsi & Asal Sinyal</th>
                      <th className="p-3">Gejala Jika Drop / Short</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">AP_PWRHOLD / PWRHOLD</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Sinyal Hold dari AP MediaTek ke PMIC MT63xx.</td>
                      <td className="p-3 font-sans text-red-400">Tekan saklar arus naik ke 0.06A lalu anjlok ke 0A.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">VPROC / VCORE</td>
                      <td className="p-3 text-emerald-400">0.70 V - 0.90 V</td>
                      <td className="p-3 font-sans">Tegangan BUCK Penggerak Prosessor & Inti Logic.</td>
                      <td className="p-3 font-sans text-red-400">Short BUCK &rarr; Denyut 0.00A &rarr; 0.35A &rarr; 0.00A.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">PWRKEY (Power Button)</td>
                      <td className="p-3 text-emerald-400">1.80 V / 4.0 V</td>
                      <td className="p-3 font-sans">Jalur trigger saklar utama (di-pull down ke GND saat ditekan).</td>
                      <td className="p-3 font-sans text-red-400">Jalur OL &rarr; Tidak ada respon sama sekali.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">WATCHDOG / SYSRST_B</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Sinyal pengawas keandalan booting CPU MTK.</td>
                      <td className="p-3 font-sans text-red-400">Bootloop restart di logo awal atau terbaca MTK Port.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">CLK26M / F26M</td>
                      <td className="p-3 text-emerald-400">Frekuensi 26MHz</td>
                      <td className="p-3 font-sans">Output Clock kristal utama 26MHz ke CPU & RF.</td>
                      <td className="p-3 font-sans text-red-400">Mati total, CPU tidak dapat merespon command.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. Exynos Control Logic */}
          {activeTab === 'exynos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Control Logic Chipset Exynos (S2MPS15, S2MPS18, S2MPS22)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Arsitektur Samsung Galaxy Series</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Sinyal / Rail</th>
                      <th className="p-3">Tegangan Standar</th>
                      <th className="p-3">Fungsi & Asal Sinyal</th>
                      <th className="p-3">Gejala Jika Drop / Short</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-sky-300">AP_PWRON / AP_HOLD</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Trigger penguncian daya dari CPU Exynos ke PMIC S2MPSxx.</td>
                      <td className="p-3 font-sans text-red-400">Arus gantung 0.10A lalu mati kembali saat tombol dilepas.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-sky-300">BUCK1 (VDD_MIF) & BUCK2 (VDD_ARM)</td>
                      <td className="p-3 text-emerald-400">0.85 V - 1.05 V</td>
                      <td className="p-3 font-sans">Daya Memory Interface (DRAM) & Core Prosessor ARM Exynos.</td>
                      <td className="p-3 font-sans text-red-400">Short BUCK &rarr; PSU Protect / HP mati total.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-sky-300">SYS_RESET_B</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Active-low hardware reset signal untuk CPU Exynos.</td>
                      <td className="p-3 font-sans text-red-400">Stuck logo Samsung atau Exynos DFU Mode.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-sky-300">XCLKO_26M</td>
                      <td className="p-3 text-emerald-400">26 MHz Oscilator</td>
                      <td className="p-3 font-sans">Clock referensi utama untuk Exynos SOC.</td>
                      <td className="p-3 font-sans text-red-400">Arus gantung sangat kecil (0.01A - 0.03A).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Spreadtrum / Unisoc Control Logic */}
          {activeTab === 'spreadtrum' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Control Logic Chipset Spreadtrum / Unisoc (SC2720, SC2721, SC2730, UMP810)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Arsitektur Entry Level Smartphone</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Sinyal / Rail</th>
                      <th className="p-3">Tegangan Standar</th>
                      <th className="p-3">Fungsi & Asal Sinyal</th>
                      <th className="p-3">Gejala Jika Drop / Short</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">PBINT / PBINT_N</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Power Button Interrupt dari tombol saklar ke PMIC SC27xx.</td>
                      <td className="p-3 font-sans text-red-400">Tombol power tidak ada respon sama sekali.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">PWR_HOLD / PMU_HOLD</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Sinyal hold konfirmasi booting dari SOC Spreadtrum.</td>
                      <td className="p-3 font-sans text-red-400">Arus gantung 0.04A - 0.07A.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">VDD_ARM & VDD_CORE</td>
                      <td className="p-3 text-emerald-400">0.85 V - 1.10 V</td>
                      <td className="p-3 font-sans">BUCK utama pemasok daya CPU & GPU Unisoc.</td>
                      <td className="p-3 font-sans text-red-400">Mati total atau restart berulang di logo.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">EXT_RST_B</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Sinyal Reset eksternal pengaman chip.</td>
                      <td className="p-3 font-sans text-red-400">Terdeteksi SPD COM Port di komputer tanpa ditekan tombol.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Multimeter Diode Mode & Measurements */}
          {activeTab === 'multimeter' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Panduan Nilai Pengukuran Multimeter (Mode Diode / Hambatan Dalam)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Aturan: Probe MERAH di Ground / Body PCB</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nama Jalur PCB</th>
                      <th className="p-3">Diode Mode Normal</th>
                      <th className="p-3">Kondisi Short / Putus</th>
                      <th className="p-3">SOP Analisa & Pengecekan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VBUS (Charging 5V Input)</td>
                      <td className="p-3 text-emerald-400">0.450 V - 0.600 V</td>
                      <td className="p-3 text-red-400">0.000 V (Full Short)</td>
                      <td className="p-3 font-sans">Cek IC OVP, Diode TVS, atau Kapasitor Filter VBUS pecah dekat IC Charger.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VBAT (Pin Catu Baterai 4.2V)</td>
                      <td className="p-3 text-emerald-400">0.380 V - 0.520 V</td>
                      <td className="p-3 text-red-400">&lt; 0.200 V (Half Short)</td>
                      <td className="p-3 font-sans">Injeksi MBR 3.8V 3A, semprot cairan rosin / thermal camera untuk cari IC panas.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VPH_PWR / VSYS</td>
                      <td className="p-3 text-emerald-400">0.350 V - 0.480 V</td>
                      <td className="p-3 text-red-400">0.000 V (Direct Short)</td>
                      <td className="p-3 font-sans">Klem PSU langsung BEEP saat kabel diklem. Angkat kapasitor VPH atau IC PA/PMIC.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">USB D+ / D- Data Line</td>
                      <td className="p-3 text-emerald-400">0.500 V - 0.700 V</td>
                      <td className="p-3 text-red-400">OL (Open / Putus Jalur)</td>
                      <td className="p-3 font-sans">Penyebab fast charging tidak aktif atau HP tidak terbaca komputer. Reball CPU.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">I2C Bus (SDA / SCL)</td>
                      <td className="p-3 text-emerald-400">0.400 V - 0.550 V</td>
                      <td className="p-3 text-red-400">&gt; 0.800 V atau OL</td>
                      <td className="p-3 font-sans">Resistor Pull-up I2C mulur/putus. Menyebabkan restart berulang (Bootloop).</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-white">VDD_1V8 LDO System</td>
                      <td className="p-3 text-emerald-400">0.300 V - 0.450 V</td>
                      <td className="p-3 text-red-400">0.000 V (Short Sekunder)</td>
                      <td className="p-3 font-sans">Mati total. Injeksi tegangan 1.8V maks 1A pada jalur LDO 1.8V.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. Boot Sequence & First Boot SOC */}
          {activeTab === 'boot_seq' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Power className="w-4 h-4" />
                  <span>Boot Sequence (Alur Daya Kerja) & First Boot SOC</span>
                </h4>
                <span className="text-[11px] text-slate-400">Urutan Wajib sebelum HP Dapat Menyala</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Power className="w-4 h-4" />
                    <span>8 Langkah Urutan Tahapan Booting (Boot Sequence)</span>
                  </h5>
                  <ol className="text-xs space-y-2 text-slate-300 font-sans">
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">1. Catu Utama:</strong> VBAT / VBUS masuk &rarr; PMIC hasilkan tegangan VPH_PWR / VSYS (3.8V - 4.2V).
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">2. Standby LDO:</strong> PMIC mengeluarkan tegangan Always-ON LDO 1.8V menuju tombol PWRKEY.
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">3. Trigger Saklar:</strong> Tombol power ditekan &rarr; Jalur PWRKEY terhubung ke GND (0V Fall Pulse).
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">4. BUCK Activation:</strong> PMIC mengaktifkan BUCK VDD_CORE, VDD_CPU, VDD_SOC & VDD_RAM.
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">5. Clock Osilasi:</strong> Kristal 26MHz berosilasi mengirim gelombang sinus ke CPU & PMIC.
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">6. Release Reset:</strong> PMIC melepas sinyal RESET_N (dari 0V menjadi 1.8V High).
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">7. First Boot SOC:</strong> CPU membaca Boot ROM & mengirim sinyal PS_HOLD / PWRHOLD ke PMIC.
                    </li>
                    <li className="p-2 bg-slate-900 rounded border border-slate-800">
                      <strong className="text-amber-300">8. Handshake Storage:</strong> CPU membaca eMMC / UFS (Partition xbl/lk) &rarr; Tampil Logo.
                    </li>
                  </ol>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>Syarat Wajib First Boot SOC (Syarat CPU Hidup)</span>
                  </h5>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="font-bold text-indigo-300">A. Syarat Tegangan (Power Supplies)</span>
                      <p className="text-slate-400 text-[11px]">
                        VDD_CORE (0.8V), VDD_CPU (0.9V), VDD_IO (1.8V), VDD_DRAM (1.1V/1.2V) wajib hadir tanpa ada penyimpangan drop.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="font-bold text-indigo-300">B. Syarat Detak Frekuensi (Clock)</span>
                      <p className="text-slate-400 text-[11px]">
                        Frekuensi 26MHz dari Kristal (CXO) wajib hadir stabil. Cek menggunakan Oscilloscope / Diode Mode pada pin Kristal.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="font-bold text-indigo-300">C. Syarat Sinyal Kontrol Reset</span>
                      <p className="text-slate-400 text-[11px]">
                        Sinyal PMIC_RESET_N harus dalam posisi HIGH (1.8V). Jika LOW (0V), CPU akan terus tertahan di posisi RESET.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="font-bold text-indigo-300">D. Syarat Komunikasi Bootloader Storage</span>
                      <p className="text-slate-400 text-[11px]">
                        Jalur CMD, CLK, DATA0 pada eMMC/UFS tidak boleh short/putus agar SOC bisa membaca firmware sektor boot.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. Table Pembacaan Arus Power Supply */}
          {activeTab === 'psu' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Table Analisis & Pembacaan Arus Power Supply (Tegangan Setting 4.0V)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Kategori Kerusakan Berdasarkan Angka Amperemeter</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Arus 0.00A (Tidak Ada Respon)
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Jalur Saklar Putus / PMIC Tidak Dapat Catu</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Cek tegangan 1.8V/4.0V pada jalur PWRKEY. Jika 0V, periksa resistor R pull-up saklar atau IC Power mati.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Arus Gantung 0.01A - 0.03A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Kristal 26MHz / LDO IO Bermasalah</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    PMIC baru bekerja tahap awal. Cek frekuensi Kristal 26MHz, kapasitor kristal, atau LDO VDD_IO 1.8V.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Arus Gantung 0.05A - 0.10A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Gagal Handshake CPU (No PS_HOLD)</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    CPU belum mengunci daya. Periksa reballing CPU atau jalurnya terputus (Cek jalur PS_HOLD / PWRHOLD 1.8V).
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    Arus Gantung 0.15A - 0.30A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Kerusakan Firmware / eMMC UFS</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    CPU sudah jalan namun gagal membaca chip memori. Lakukan tes Direct ISP UFI / EasyJTAG atau repair Bootloader.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white font-bold">
                    Short VPH_PWR / VSYS (Direct Short)
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Short Primer Jalur VPH_PWR</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Klem diklem langsung BEEP! Komponen bocor di jalur VPH (Kapasitor filter, IC PA Sinyal, IC Charger, OVP).
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Denyut 0.00A -&gt; 0.40A -&gt; 0.00A
                  </span>
                  <h5 className="text-xs font-bold text-white pt-1">Short Sekunder BUCK CPU / RAM</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Proteksi Overcurrent PMIC aktif mematikan daya secara otomatis karena ada short pada jalur sekunder.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 8. Table Pembacaan USB Current Meter */}
          {activeTab === 'usb_meter' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
                  <Gauge className="w-4 h-4" />
                  <span>Table Pembacaan Nilai Arus USB Current Meter (Doctor USB Charger)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Alat Diagnosa Awal Tanpa Bongkar Casing HP</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Nilai Arus Amperemeter</th>
                      <th className="p-3">Status Pengisian & Daya</th>
                      <th className="p-3">Kemungkinan Lokasi Kerusakan</th>
                      <th className="p-3">Langkah Eksekusi SOP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-red-400">0.00 A (No Current)</td>
                      <td className="p-3 font-sans">Mati Total / Tidak Mengisi</td>
                      <td className="p-3 font-sans">Fuse VBUS Putus, Port Type-C Rusak, IC OVP Pecah.</td>
                      <td className="p-3 font-sans">Cek tegangan VBUS 5V pada fleksibel charge & board bawah.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-amber-400">0.01 A - 0.05 A</td>
                      <td className="p-3 font-sans">False Charging (Pengisian Palsu)</td>
                      <td className="p-3 font-sans">BSI / NTC Baterai Putus, IC Charger Tidak Switching.</td>
                      <td className="p-3 font-sans">Ukur jalur NTC / BSI 10K-100K Ohm ke GND. Ganti Baterai/IC Charger.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-emerald-400">0.40 A - 0.60 A</td>
                      <td className="p-3 font-sans">Normal Slow Charging</td>
                      <td className="p-3 font-sans">Pengisian standar (Kondisi normal tanpa Fast Charge).</td>
                      <td className="p-3 font-sans">Baterai terisi bertahap. Cek apakah HP dapat masuk ke layar utama.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-cyan-400">1.20 A - 2.40 A</td>
                      <td className="p-3 font-sans">Fast Charge / Quick Charge Active</td>
                      <td className="p-3 font-sans">Sistem pengisian sempurna (IC Charger & Protokol OK).</td>
                      <td className="p-3 font-sans">HP dalam kondisi kesehatan pengisian daya sangat baik.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-purple-400">Fluktuatif 0A &lt;-&gt; 0.8A</td>
                      <td className="p-3 font-sans">Restart / Baterai Drop Total</td>
                      <td className="p-3 font-sans">Tegangan baterai di bawah 2.5V atau IC Baterai trip.</td>
                      <td className="p-3 font-sans">Suntik baterai dengan Desktop Charger hingga 3.7V lalu colok kembali.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. Jalur Titik Ukur Mati Total */}
          {activeTab === 'jalur_matot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center space-x-2">
                  <GitBranch className="w-4 h-4" />
                  <span>Jalur Titik Ukur Utama Kasus Mati Total (Urutan 1 s/d 8)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Prosedur Pengukuran Tegangan & Hambatan</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                      1
                    </span>
                    <h5 className="text-xs font-bold text-white">Titik Ukur Pin VBAT Baterai</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-8">
                    Ukur Voltase: Wajib 3.7V - 4.2V. Ukur Mode Diode: Normal 0.380V - 0.520V. Jika 0.000V = Short VBAT.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                      2
                    </span>
                    <h5 className="text-xs font-bold text-white">Titik Ukur Coil VPH_PWR / VSYS</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-8">
                    Ukur Voltase: Wajib 3.8V - 4.2V. Ukur Mode Diode: Normal 0.350V - 0.480V. Jika 0.000V = Short VPH.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                      3
                    </span>
                    <h5 className="text-xs font-bold text-white">Titik Ukur Pin Saklar PWRKEY</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-8">
                    Ukur Voltase: Wajib ada tegangan standby 1.8V atau 4.0V saat belum ditekan. Jika 0V = Jalur Saklar Putus.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                      4
                    </span>
                    <h5 className="text-xs font-bold text-white">Titik Ukur Coil BUCK VDD_CORE / CPU</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-8">
                    Ukur Voltase saat tombol ditekan: Wajib keluar 0.80V - 1.05V. Jika 0V = IC Power rusak / BUCK short.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                      5
                    </span>
                    <h5 className="text-xs font-bold text-white">Titik Ukur LDO VDD_1V8 System</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-8">
                    Ukur Voltase: Wajib 1.80V stabil untuk memberi daya ke sensor, tombol, & IC pendukung.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                      6
                    </span>
                    <h5 className="text-xs font-bold text-white">Titik Ukur Pin Kristal Oscilator 26MHz</h5>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans pl-8">
                    Ukur Mode Diode: Keduanya tidak boleh 0.000V atau OL. Gelombang osilasi wajib ada 26MHz.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 10. SOP Pengecekan & Analisa Pertama Kali HP Diterima */}
          {activeTab === 'sop_pertama' && (
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                <FileCheck2 className="w-4 h-4" />
                <span>SOP Pengecekan & Analisa Pertama Kali Handphone Diterima Meja Servis</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">Langkah 1: Kronologi & Cek Fisik</span>
                  <p className="text-slate-400 text-[11px]">
                    Tanyakan kronologi (jatuh, kena air, bekas dicharge semalaman). Amati kondisi layar, bodi bengkok, atau indikator air (LDI merah).
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">Langkah 2: Cek USB Current Meter</span>
                  <p className="text-slate-400 text-[11px]">
                    Colokkan kabel charger ke USB Current Meter. Catat angka arus (0A, 0.05A, 0.5A, atau Fast Charge).
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">Langkah 3: Pengukuran Mode Diode</span>
                  <p className="text-slate-400 text-[11px]">
                    Lepas konektor baterai. Ukur jalur VBAT & VBUS dengan multimeter (Probe Merah di GND). Pastikan tidak short sebelum klem PSU!
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">Langkah 4: Analisa Power Supply</span>
                  <p className="text-slate-400 text-[11px]">
                    Hubungkan PSU 4.0V. Amati arus sebelum tombol power ditekan (arus bocor) & sesudah tombol ditekan (arus respon boot).
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">Langkah 5: Cek Mode Driver PC</span>
                  <p className="text-slate-400 text-[11px]">
                    Tancapkan HP ke PC dengan kabel data. Cek Device Manager apakah terbaca EDL 9008, MTK Port, SPDRD, atau DFU.
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-300">Langkah 6: Keputusan Eksekusi</span>
                  <p className="text-slate-400 text-[11px]">
                    Simpulkan lokasi kerusakan: Software / Flashing, Ganti Komponen Pasif Short, Reballing IC Power / CPU / eMMC.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 11. Teknik Pengukuran Alur Charging */}
          {activeTab === 'alur_charging' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center space-x-2">
                  <BatteryCharging className="w-4 h-4" />
                  <span>Teknik Pengukuran Alur Charging & Fast Charging Protocol</span>
                </h4>
                <span className="text-[11px] text-slate-400">Skematik Alur Tegangan Charger dari Port hingga Baterai</span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-green-400 font-bold block mb-1">Diagram Alur Tegangan Charging:</span>
                  <p className="text-slate-200 text-[11px] leading-relaxed">
                    [Charger 5V/9V] -&gt; Port Type-C/Micro -&gt; VBUS Fuse -&gt; OVP IC (Protect 5.5V) -&gt; VBUS Pin IC Charger -&gt; Induktor Switching L -&gt; Jalur VPH_PWR -&gt; Output VBAT -&gt; Pin Baterai.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-white text-xs">1. VBUS 5.0V Check</span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Wajib hadir 5V pada Kapasitor input OVP IC. Jika 0V, ganti port USB / cek fleksibel board charge.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-white text-xs">2. USB D+ & D- Data Bus</span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Nilai Diode Mode 0.500V - 0.700V. Berfungsi handshaking protokol Quick Charge / PD ke adaptor.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="font-bold text-white text-xs">3. Jalur BAT_TEMP (NTC)</span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Resistor Termistor NTC 10K/100K. Jika putus -&gt; Muncul "Suhu Baterai Terlalu Tinggi / Dingin".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 12. Titik Ukur Kerusakan Sinyal */}
          {activeTab === 'sinyal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center space-x-2">
                  <Radio className="w-4 h-4" />
                  <span>Titik Ukur Kerusakan Sinyal (Panggilan Darurat, Tidak Ada Layanan, WiFi/BT Grayed)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Pengecekan WTR, Transceiver, PA IC & RFFE Bus</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Titik Ukur Tegangan / Jalur</th>
                      <th className="p-3">Tegangan / Nilai Diode</th>
                      <th className="p-3">Fungsi Komponen RF</th>
                      <th className="p-3">SOP Solusi Penanganan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">VREG_RF_1V8 (Catu Transceiver)</td>
                      <td className="p-3 text-emerald-400">1.80 V DC</td>
                      <td className="p-3 font-sans">Daya utama IC Transceiver (WTR3925 / WTR2965 / SDR660).</td>
                      <td className="p-3 font-sans">Jika 0V, jumper atau ganti LDO RF / IC Power. Sinyal silang / No Service.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">VPA / APT BUCK (Power Amplifier)</td>
                      <td className="p-3 text-emerald-400">0.50 V - 3.40 V (Dinamis)</td>
                      <td className="p-3 font-sans">Pasokan daya dinamis untuk IC Penguat Sinyal PA High/Mid Band.</td>
                      <td className="p-3 font-sans">Sinyal hanya panggil darurat / 2G ada tapi 4G hilang. Reball/Ganti IC PA.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">RFFE Bus (RFFE_CLK / RFFE_DATA)</td>
                      <td className="p-3 text-emerald-400">0.400 V - 0.550 V (Diode)</td>
                      <td className="p-3 font-sans">Jalur komunikasi serial RF Front-End antara CPU Baseband & IC PA.</td>
                      <td className="p-3 font-sans">Jika OL / Short -&gt; Radio Off, IMEI Kosong, atau Baseband Unknown.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">Konektor Antena Coaxial & Switch</td>
                      <td className="p-3 text-emerald-400">Kontinuitas 0 Ohm (BEEP)</td>
                      <td className="p-3 font-sans">Menghubungkan sinyal radio dari PCB ke antena bodi HP.</td>
                      <td className="p-3 font-sans">Sinyal sangat lemah (hanya muncul saat dekat pemancar BTS). Ganti kabel coaxial.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 13. Charging Error & Temp High/Low NTC */}
          {activeTab === 'temp_error_ntc' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Thermometer className="w-4 h-4" />
                  <span>Titik Ukur Charging Error / Temperature High/Low (NTC Thermistor & BSI Line)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Analisa Resistor Pembagi Tegangan NTC 10K / 47K</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Jalur / Sinyal NTC</th>
                      <th className="p-3">Nilai Normal</th>
                      <th className="p-3">Fungsi Dalam Sistem</th>
                      <th className="p-3">Gejala & Solusi Perbaikan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">BAT_TEMP (NTC Baterai)</td>
                      <td className="p-3 text-emerald-400">0.450 V - 0.650 V (Diode Mode)</td>
                      <td className="p-3 font-sans">Mendeteksi suhu sel baterai via thermistor internal baterai.</td>
                      <td className="p-3 font-sans text-amber-400">Muncul notifikasi "Suhu Baterai Terlalu Tinggi/Rendah". Ganti baterai atau jumper jalur BAT_TEMP.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">PA_TEMP (NTC IC Power/PA)</td>
                      <td className="p-3 text-emerald-400">10k Ohm / 47k Ohm @ 25°C</td>
                      <td className="p-3 font-sans">Thermistor pendeteksi suhu pada area IC Power Amplifier atau dekat PMIC.</td>
                      <td className="p-3 font-sans text-amber-400">Pengisian daya dihentikan otomatis saat HP dipakai game. Ganti R-NTC pembagi tegangan 1.8V.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">BSI Line (Battery Spec Info)</td>
                      <td className="p-3 text-emerald-400">10k - 100k Ohm ke GND</td>
                      <td className="p-3 font-sans">Mengirimkan data identitas baterai & kapasitas ke CPU.</td>
                      <td className="p-3 font-sans text-amber-400">Persentase baterai meloncat 100% ke 1% lalu mati. Cek resistor BSI di dekat socket baterai.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 14. Audio, Display, Light & Touchscreen */}
          {activeTab === 'audio_display_tp' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Titik Ukur Masalah Audio, Display, Light & Touchscreen</span>
                </h4>
                <span className="text-[11px] text-slate-400">Pengukuran Tegangan VSP/VSN, VBL, & I2C Bus</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Sektor Masalah</th>
                      <th className="p-3">Titik Ukur & Tegangan</th>
                      <th className="p-3">Nilai Diode Normal</th>
                      <th className="p-3">Penanganan & Solusi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-cyan-300">Display (Layar Gelap)</td>
                      <td className="p-3 text-emerald-400">VSP (+5.0V) & VSN (-5.0V)</td>
                      <td className="p-3 text-amber-300">0.450 V - 0.550 V</td>
                      <td className="p-3 font-sans">Gambar ada tapi gelap / no display. Ganti IC Display / LDO Bias +5V/-5V.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-cyan-300">Light (Lampu LED)</td>
                      <td className="p-3 text-emerald-400">VBL_CTRL (15V - 38V DC)</td>
                      <td className="p-3 text-amber-300">0.400 V (Anode LED)</td>
                      <td className="p-3 font-sans">Lampu mati. Cek Diode Schottky, Lilitan Booster (Induktor L), & IC Backlight.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-cyan-300">Touchscreen (Macet)</td>
                      <td className="p-3 text-emerald-400">VDD_TP (2.8V) & VIO_TP (1.8V)</td>
                      <td className="p-3 text-amber-300">0.350 V - 0.500 V</td>
                      <td className="p-3 font-sans">Layar sentuh tidak merespon. Ukur tegangan kerja TP & cek resistor pull-up I2C SDA/SCL.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-cyan-300">Audio (Suara Hilang)</td>
                      <td className="p-3 text-emerald-400">VDD_PA (4.2V VBAT) & MIC_BIAS (2.2V)</td>
                      <td className="p-3 text-amber-300">0.300 V - 0.450 V</td>
                      <td className="p-3 font-sans">Speaker bisu / Mic tidak peka. Reball Audio Codec / Smart PA Amplifier IC.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 15. Kerusakan CPU & Analisa PSU */}
          {activeTab === 'cpu_faults' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Titik Ukur Kerusakan CPU & Analisa Arus Power Supply / USB Meter</span>
                </h4>
                <span className="text-[11px] text-slate-400">SOP Analisa Kerusakan SoC & Memory eMMC/UFS</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Kondisi / Arus PSU</th>
                      <th className="p-3">Titik Ukur Krusial</th>
                      <th className="p-3">Analisa Kerusakan</th>
                      <th className="p-3">Tindakan Perbaikan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-red-300">Arus Gantung 0.01A - 0.05A</td>
                      <td className="p-3 text-emerald-400">CLK 26MHz & VDD_CORE (0.8V)</td>
                      <td className="p-3 font-sans">Clock Crystal mati atau CPU belum membaca firmware ROM awal.</td>
                      <td className="p-3 font-sans">Ganti Crystal 26MHz atau Reball IC Power utama.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-red-300">Arus Denyut 0.05A - 0.15A (Balik 0A)</td>
                      <td className="p-3 text-emerald-400">PS_HOLD (1.8V) & Jalur eMMC CMD</td>
                      <td className="p-3 font-sans">CPU aktif sebentar tapi gagal komunikasi dengan eMMC/UFS (Corrupt/Mati).</td>
                      <td className="p-3 font-sans">Angkat eMMC/UFS, cek health via UFI Box, reball atau ganti memori.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-red-300">Short Sekunder BUCK (0.20A - 0.45A)</td>
                      <td className="p-3 text-emerald-400">VDD_RAM (1.1V) / VDD_CPU (0.85V)</td>
                      <td className="p-3 font-sans">Short pada jalur daya internal CPU atau RAM tumpuk (PoP).</td>
                      <td className="p-3 font-sans">Gunakan MBR / MBR Thermal Camera untuk cari kapasitor short atau reball CPU.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 16. SOP Bootloop & UFI Box eMMC/UFS */}
          {activeTab === 'bootloop_ufi' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-2">
                  <HardDrive className="w-4 h-4" />
                  <span>SOP HP Restart/Bootloop & Teknik Pergantian eMMC/UFS Menggunakan UFI BOX</span>
                </h4>
                <span className="text-[11px] text-slate-400">Flashing Firmware, Dump Reading & Partition Config</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-purple-300 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Langkah Diagnosa HP Bootloop / Mentok Logo</span>
                  </h5>
                  <ul className="space-y-1.5 text-slate-300 list-disc pl-4 font-sans text-[11px]">
                    <li>Coba Flashing Official Firmware terlebih dahulu dengan USB Cable.</li>
                    <li>Jika flashing gagal di 99% / Error BROM, terindikasi eMMC Wear-out Health (90% Used).</li>
                    <li>Cek tombol volume (-) (+) short ke GND yang sebabkan HP terjebak di Fastboot/Recovery.</li>
                    <li>Cek Baterai BMS NTC yang sebabkan restart berulang saat loading sistem.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-purple-300 flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-purple-400" />
                    <span>Teknik Pergantian eMMC Menggunakan UFI BOX</span>
                  </h5>
                  <ol className="space-y-1.5 text-slate-300 list-decimal pl-4 font-mono text-[11px]">
                    <li>Identify eMMC & Backup Dump (ROM1 512MB, ROM2, ROM3, NVRAM, NVDATA, EFS).</li>
                    <li>Ketik CID Baru jika menggunakan IC eMMC pengganti beda merek (e.g. Samsung / SK Hynix).</li>
                    <li>Set ExtCSD Config (Boot Partition 1 Enable untuk MediaTek / Qualcomm).</li>
                    <li>Factory Reset &amp; Write Dump Firmware &rarr; Pasang IC eMMC ke Board &rarr; Flash ulang via USB.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* 17. iPhone Matot, Charging & Swap Board */}
          {activeTab === 'iphone_matot_swap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-2">
                  <Wrench className="w-4 h-4 text-indigo-400" />
                  <span>Analisa iPhone Mati Total, Tidak Bisa Dicas, Titik Ukur & Swap Board</span>
                </h4>
                <span className="text-[11px] text-slate-400">Jalur Tristar, Hydra, Tigris, VCC_MAIN & Board Swap</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Jalur / Komponen iPhone</th>
                      <th className="p-3">Tegangan / Nilai Diode</th>
                      <th className="p-3">Fungsi Dalam Mainboard</th>
                      <th className="p-3">SOP Diagnosa & Perbaikan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-indigo-300">PP_VCC_MAIN / PP_VDD_MAIN</td>
                      <td className="p-3 text-emerald-400">4.20 V DC (0.350V Diode)</td>
                      <td className="p-3 font-sans">Jalur daya utama yang mendistribusikan listrik dari Tigris ke seluruh sistem.</td>
                      <td className="p-3 font-sans text-red-400">Jika Short -&gt; iPhone Matot total. Gunakan rosin thermal untuk temukan C short.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-indigo-300">Tristar / Hydra IC (1610A3/1612A1)</td>
                      <td className="p-3 text-emerald-400">0.450 V - 0.600 V</td>
                      <td className="p-3 font-sans">IC Kontrol Komunikasi USB & Charging Lightning Port.</td>
                      <td className="p-3 font-sans text-amber-400">Gejala: Baterai terisi palsu (False Charging) / Matot usai colok charger mobil. Ganti IC Tristar/Hydra.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-indigo-300">Komponen Wajib Swap Board iPhone</td>
                      <td className="p-3 text-purple-400">5 IC Utama (Pindah Set)</td>
                      <td className="p-3 font-sans">Menjaga enkripsi data & IMEI antar komponen terikat (Pairing).</td>
                      <td className="p-3 font-sans">Wajib dipindah saat swab board: 1. CPU SoC, 2. EEPROM Baseband, 3. Baseband Modem, 4. SPI Flash, 5. NFC IC.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 18. Tabel Panic Full Log iPhone */}
          {activeTab === 'iphone_panic' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Tabel Analisa Panic Log / Panic Full iPhone & Cara Pembacaannya</span>
                </h4>
                <span className="text-[11px] text-slate-400">Cara Membaca File Diagnostic Analytics iPhone</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Kode String Panic Log</th>
                      <th className="p-3">Komponen Bermasalah</th>
                      <th className="p-3">Penyebab Kerusakan</th>
                      <th className="p-3">SOP Solusi Teknisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">AOP Panic / Sensor Proximity</td>
                      <td className="p-3 text-emerald-400">Flex Earpiece / FaceID Sensor</td>
                      <td className="p-3 font-sans">Kena air pada bagian atas earpiece atau flex sobek saat ganti LCD.</td>
                      <td className="p-3 font-sans">Ganti kabel fleksibel earpiece atas atau bersihkan korosi di socket J5200.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">Thermal Sensor / SMC Panic</td>
                      <td className="p-3 text-emerald-400">Flex Charger Port / Wireless Charging</td>
                      <td className="p-3 font-sans">Sensor suhu NTC di konektor cas bawah tidak terdeteksi oleh CPU tiap 3 menit.</td>
                      <td className="p-3 font-sans">Ganti 1 set fleksibel konektor cas original bawaan iPhone.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-amber-300">ANS Panic / NVMe Storage</td>
                      <td className="p-3 text-emerald-400">IC NAND Flash Memory</td>
                      <td className="p-3 font-sans">Kaki IC NAND retak / corrupt setelah iPhone jatuh keras.</td>
                      <td className="p-3 font-sans">Reball IC NAND Flash atau Upgrade Kapasitas Memory.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 19. Reball CPU, Interposer & Blower */}
          {activeTab === 'reball_blower_interposer' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Teknik Reball CPU Android/iPhone, Reball Interposer & Setelan Blower</span>
                </h4>
                <span className="text-[11px] text-slate-400">Pengaturan Suhu Blower Quick / Sugon & Timah Pasta</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h5 className="font-bold text-orange-300">1. Setelan Blower Pengangkatan IC</h5>
                  <p className="text-slate-300 text-[11px] font-mono">
                    • Preheating PCB: 200°C - 220°C (Air 3.0)<br />
                    • Angkat IC Lem: 340°C - 360°C (Air 3.5)<br />
                    • Bersihkan Timah PCB: 260°C - 280°C + Flux + Solder Wick
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h5 className="font-bold text-orange-300">2. Reballing Stencil BGA</h5>
                  <p className="text-slate-300 text-[11px] font-mono">
                    • Timah Pasta CPU: 183°C (Timah Timbal)<br />
                    • Timah Low Temp (CPU Tumpuk RAM): 138°C<br />
                    • Blower Cetak Kaki: 280°C (Air 1.5 - Angin Pelan)
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h5 className="font-bold text-orange-300">3. Reball Interposer iPhone (Middle Layer)</h5>
                  <p className="text-slate-300 text-[11px] font-mono">
                    • Pisahkan Board: Heating Station 200°C<br />
                    • Reball Ring Interposer: Timah 158°C / 183°C<br />
                    • Penyatuan Board: Heating Station 185°C sampai rapat
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 20. Flashing, Tombol Boot & Unlocktool */}
          {activeTab === 'flashing_unlocktool_boot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Cara Flashing, Tombol Boot Saat Flashing Semua Chipset & Software Unlocktool</span>
                </h4>
                <span className="text-[11px] text-slate-400">MediaTek, Qualcomm EDL 9008, Spreadtrum, Samsung & iPhone</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Merek / Chipset</th>
                      <th className="p-3">Tombol Boot Flashing</th>
                      <th className="p-3">Software / Tool Resmi</th>
                      <th className="p-3">SOP Eksekusi Unlocktool</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">MediaTek (MTK)</td>
                      <td className="p-3 text-amber-300">Vol Up + Vol Down (BROM Mode)</td>
                      <td className="p-3 font-sans">SP Flash Tool / Unlocktool</td>
                      <td className="p-3 font-sans">Bypass Auth BROM -&gt; Erase FRP / Format Userdata One-Click.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">Qualcomm (Snapdragon)</td>
                      <td className="p-3 text-amber-300">EDL Testpoint (Hubung Pin ke GND)</td>
                      <td className="p-3 font-sans">QFIL / QPST / Unlocktool EDL</td>
                      <td className="p-3 font-sans">Colok USB mode Qualcomm HS-USB QDLoader 9008 -&gt; Flash Firmware XML.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">Spreadtrum / Unisoc</td>
                      <td className="p-3 text-amber-300">Vol Down (SPD Boot Key)</td>
                      <td className="p-3 font-sans">SPD Research Download Tool</td>
                      <td className="p-3 font-sans">Load File .PAC -&gt; Klik Start -&gt; Tahan Vol Down lalu colok USB.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">iPhone / iOS</td>
                      <td className="p-3 text-amber-300">DFU Mode / Recovery Mode</td>
                      <td className="p-3 font-sans">3uTools / iTunes / Unlocktool iOS</td>
                      <td className="p-3 font-sans">iOS Ramdisk Bypass / Flash Firmware IPSW Tanpa Kehilangan Data (Retain User Data).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 21. Skematik, FRP/Mi Cloud & IC Lem */}
          {activeTab === 'schematic_connector_epoxy' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-2">
                  <Sliders className="w-4 h-4" />
                  <span>Cara Cepat Baca Skematik, Reset FRP/Mi Cloud, Cara Ganti Konektor Cas & Reball IC Lem</span>
                </h4>
                <span className="text-[11px] text-slate-400">Teknik Dasar & Lanjutan Bengkel HP Professional</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-indigo-300">1. Cara Cepat Baca Schematic & PCB Layout</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    Cari posisi fisik komponen di PCB Layout (misal U201). Salin part number U201 lalu tempel di pencarian file Schematic Diagram. Urutkan jalur tegangan input (VDD) dan jalur sinyal output. Periksa semua komponen pasif (Kapasitor & Resistor) yang terhubung seri/paralel pada jalur tersebut.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-indigo-300">2. Cara Ganti Konektor Cas & IC Lem Black Epoxy</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    <strong>Ganti Konektor Cas:</strong> Gunakan blower bawah 320°C, tambahkan flux & timah pasta pada kaki konektor agar rekat kencang.<br />
                    <strong>Pembersihan Lem IC:</strong> Bersihkan lem hitam pinggiran IC pada suhu 240°C dengan pisau bedah IC sebelum mengangkat IC pada 350°C.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 22. Pengukuran Pasif (Mode Dioda) & Aktif (Mode DC Tegangan Kerja) */}
          {activeTab === 'pengukuran_pasif_aktif' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center space-x-2">
                  <Gauge className="w-4 h-4" />
                  <span>Cara Pengukuran Pasif (Mode Dioda Value) & Pengukuran Aktif (Mode DC Tegangan Kerja)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Metode Multimeter Digital Sanwa / Aneng / Sunshine</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-yellow-300">1. Pengukuran Pasif (Diode Mode / Diode Value)</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    <strong>Tujuan:</strong> Mengukur hambatan dalam jalur (Reverse Bias) tanpa arus listrik dari baterai.<br />
                    <strong>Cara Pengukuran:</strong> Probe Merah (+) ditempel ke Ground (GND), Probe Hitam (-) ditempel ke Titik Ukur (Testpoint/Kapasitor).<br />
                    <strong>Pembacaan Nilai:</strong>
                    <br />• Nilai Normal: 0.250V - 0.750V (Tergantung resistansi IC).
                    <br />• 0.000V (Short To GND): Jalur bocor halus / short penuh ke Ground.
                    <br />• OL (Open Line): Jalur putus / kaki IC terangkat.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-yellow-300">2. Pengukuran Aktif (DC Voltage Mode)</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    <strong>Tujuan:</strong> Mengukur keberadaan tegangan kerja saat HP dinyalakan / dicolok USB Charger.<br />
                    <strong>Cara Pengukuran:</strong> Probe Hitam (-) ke Ground (GND), Probe Merah (+) ke Titik Ukur Tegangan (VBUS, VPH_PWR, LDO, BUCK).<br />
                    <strong>Pembacaan Nilai:</strong>
                    <br />• VBUS: 5.0V / 9.0V / 12.0V (QC/PD Charger).
                    <br />• VPH_PWR / VSYS: 3.7V - 4.2V (Keluaran IC Power).
                    <br />• VDD BUCK CPU: 0.7V - 0.95V DC.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 23. Komponen Aktif & Pasif */}
          {activeTab === 'komponen_elektronika' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                  <Sliders className="w-4 h-4" />
                  <span>Komponen Aktif (Transistor, IC, Dioda) & Pasif (Resistor, Kapasitor, Lilitan/Coil)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Karakteristik Seri & Paralel Pada PCB HP</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Jenis Komponen</th>
                      <th className="p-3">Sifat Dalam Rangkaian</th>
                      <th className="p-3">Pemasangan Seri vs Paralel</th>
                      <th className="p-3">Gejala Kerusakan Pada HP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">Resistor (R) - Pasif</td>
                      <td className="p-3 font-sans">Hambatan arus, pembagi tegangan (Pull-Up / Pull-Down).</td>
                      <td className="p-3 font-sans">Dominan Seri (Jika putus &rarr; OL / Sinyal hilang).</td>
                      <td className="p-3 font-sans text-amber-400">R-NTC molor &rarr; Charging Temp Error. R-Pullup I2C putus &rarr; Touchscreen/Sensor mati.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">Kapasitor (C) - Pasif</td>
                      <td className="p-3 font-sans">Penyimpan muatan, filter noise, perata tegangan.</td>
                      <td className="p-3 font-sans">Dominan Paralel (Kaki 1 ke Sinyal, Kaki 2 ke GND).</td>
                      <td className="p-3 font-sans text-red-400">Kapasitor short &rarr; Jalur VPH_PWR / VBUS short ke Ground, HP Mati Total.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">Induktor / Coil (L) - Pasif</td>
                      <td className="p-3 font-sans">Filter frekuensi, BUCK Booster converter tegangan.</td>
                      <td className="p-3 font-sans">Dominan Seri (Menghubungkan antar blok IC).</td>
                      <td className="p-3 font-sans text-amber-400">Induktor BUCK retak &rarr; HP restart saat buka kamera/game berat.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">Dioda & Transistor - Aktif</td>
                      <td className="p-3 font-sans">Pengarah arus 1 arah (Zener/Schottky) & Saklar elektronik (Mosfet).</td>
                      <td className="p-3 font-sans">Paralel (Proteksi OVP/ESD) / Seri (Switching).</td>
                      <td className="p-3 font-sans text-amber-400">Dioda Schottky Backlight rusak &rarr; Lampu LCD mati total.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 24. Osiloskop & SOP Mati Ex Water */}
          {activeTab === 'osiloskop_exwater' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Cara Analisa Menggunakan Osiloskop & SOP HP Mati Ex Water (Kena Air / Korosi)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Pengukuran Sinyal Clock 26MHz, I2C, SPI & Pembersihan Ultrasonic</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-cyan-300">1. Analisa Gelombang Sinus/Kotak Dengan Osiloskop</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    • <strong>Crystal Clock 26MHz:</strong> Wajib ada gelombang sinus murni 26MHz pada pin XTAL_IN/XTAL_OUT saat HP start.<br />
                    • <strong>I2C SDA / SCL Bus:</strong> Wajib ada sinyal pulsa digital kotak (Square wave 1.8V Peak-to-Peak). Jika datar &rarr; Bus terganggu.<br />
                    • <strong>PWM Display & Light:</strong> Mengukur frekuensi switching pada induktor backlight (200kHz - 1MHz).
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-cyan-300">2. SOP Penanganan HP Kena Air (Ex-Water)</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    1. <strong>Cabut Baterai Seketika:</strong> Jangan pernah colok charger untuk hindari elektrolisis tembaga.<br />
                    2. <strong>Ultrasonic Bath:</strong> Rendam board di cairan IPA (Isopropanol) + pembersih khusus ultrasonic cleaner selama 10 menit.<br />
                    3. <strong>Bongkar Kaleng (Shield Removal):</strong> Lepas kaleng penutup IC area PMIC & BUCK untuk bersihkan kerak di bawah IC.<br />
                    4. <strong>Cek Jalur VPH_PWR & VBUS:</strong> Temukan kapasitor yang korosi kehitaman & lakukan penggantian.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 25. Poco X3 Pro, Poco F3 & IC Bertingkat */}
          {activeTab === 'poco_ic_bertingkat' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center space-x-2">
                  <Layers className="w-4 h-4" />
                  <span>Titik Ukur Mati Total Poco X3 Pro (Snapdragon 860), Poco F3 & IC Bertingkat (PoP RAM/CPU)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Penyebab Kerusakan Massal IC CPU Tumpuk RAM & Solusi Reballing</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Model & Kasus</th>
                      <th className="p-3">Penyebab Utama</th>
                      <th className="p-3">Gejala & Arus Power Supply</th>
                      <th className="p-3">SOP Solusi Permanent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-red-300">Poco X3 Pro (Vayu/Bhima)</td>
                      <td className="p-3 font-sans">Retak timah BGA akibat panas berlebih (Overheat) pada CPU SM8150.</td>
                      <td className="p-3 font-sans">Layar Putih/Bintik Hitam-Putih, Mati Total Arus Denyut 0.05A - 0.12A.</td>
                      <td className="p-3 font-sans text-emerald-400">Reball CPU & RAM Tumpuk LPDDR4X. Gunakan timah 183°C berkualitas tinggi.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-red-300">Poco F3 / Black Shark 4</td>
                      <td className="p-3 font-sans">Short BUCK VDD_CPU / PM8350 BUCK regulator proteksi.</td>
                      <td className="p-3 font-sans">Mati mendadak saat main game, colok PSU langsung short 0.25A - 0.50A.</td>
                      <td className="p-3 font-sans text-emerald-400">Ganti Sub-PMIC PM8350C / Reball CPU Snapdragon 870.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-red-300">Teknik IC Bertingkat (PoP)</td>
                      <td className="p-3 font-sans">Pemisahan RAM bagian atas tanpa merusak BGA CPU bagian bawah.</td>
                      <td className="p-3 font-sans">Suhu angkat RAM: 280°C. Suhu angkat CPU: 350°C.</td>
                      <td className="p-3 font-sans text-emerald-400">Gunakan pisau pemisah RAM ultrathin & timah 138°C pada pad sambungan RAM-CPU.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 26. Jumper Fuse Baterai & Cek Tombol ON/OFF */}
          {activeTab === 'jumper_fuse_pwrkey' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Power className="w-4 h-4" />
                  <span>Jumper Fuse Baterai (BMS Fuse R100/000) & Cek Kondisi Tombol ON/OFF (PWRKEY)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Solusi HP Restart Saat Colok/Lepas Charger & Tombol Short</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-amber-300">1. Jumper Fuse Baterai (BMS Resistor)</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    <strong>Gejala:</strong> HP hidup normal hanya jika dicolok charger. Begitu cabut kabel cas, HP langsung mati/restart.<br />
                    <strong>Penyebab:</strong> Resistor Fuse (Bertuliskan K, R100, 0, atau LK) pada papan BMS Baterai mengalami resistansi tinggi (molor).<br />
                    <strong>Solusi:</strong> Jumper langsung kedua ujung fuse dengan kawat email/solder wick tipis.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-amber-300">2. Cek Kondisi Tombol ON/OFF (PWRKEY)</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    <strong>Gejala:</strong> HP restart berulang tampil logo terus (Auto-Boot) / Terjebak Fastboot Mode.<br />
                    <strong>Pengukuran:</strong> Ukur tegangan PWRKEY (Normal 1.8V - 4.0V). Jika 0V tanpa ditekan &rarr; Saklar/Fleksibel short ke Ground.<br />
                    <strong>Solusi:</strong> Lepas fleksibel power tombol, atau bersihkan korosi pada saklar micro switch.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 27. IC RF, PA, Baseband & IMEI */}
          {activeTab === 'ic_rf_baseband_imei' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center space-x-2">
                  <Radio className="w-4 h-4" />
                  <span>Titik Ukur Kerusakan IC RF Transceiver, IC PA, Baseband Modem & IMEI Terblokir</span>
                </h4>
                <span className="text-[11px] text-slate-400">Perbaikan Sinyal Bulat / No Service / IMEI Null / Baseband Unknown</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Blok Sinyal</th>
                      <th className="p-3">Tegangan Kerja Utama</th>
                      <th className="p-3">Gejala Kerusakan</th>
                      <th className="p-3">SOP Perbaikan Teknisi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">IC RF Transceiver (SDR/WTR)</td>
                      <td className="p-3 text-emerald-400">1.0V DC & 1.8V DC LDO</td>
                      <td className="p-3 font-sans">Sinyal Panggilan Darurat / Panggilan Gagal padahal IMEI tertera.</td>
                      <td className="p-3 font-sans">Reball / Ganti IC Transceiver (WTR3925 / SDR660 / SDR865).</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">IC Power Amplifier (PA 2G/4G/5G)</td>
                      <td className="p-3 text-emerald-400">VAPT (0.5V - 3.4V) dari APT IC</td>
                      <td className="p-3 font-sans">Cari manual dapat operator, tapi tidak bisa dikunci (No Signal/Low).</td>
                      <td className="p-3 font-sans">Cek tegangan VAPT & ganti IC PA Low Band / High Band.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-pink-300">Baseband Processor / QCN</td>
                      <td className="p-3 text-emerald-400">0.9V VDD_BB & SPI Bus</td>
                      <td className="p-3 font-sans">Baseband Unknown / IMEI Null / IMEI Hilang setelah flashing.</td>
                      <td className="p-3 font-sans">Restore NVRAM/NVDATA, Rebuild QCN via QPST / Reball IC Baseband.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 28. Titik Ukur Setelah Reball CPU All Chipset */}
          {activeTab === 'post_reball_check' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span>Titik Ukur Pengujian Setelah Reball CPU (MediaTek, Qualcomm, Exynos, Spreadtrum)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Verifikasi Kaki BGA Presisi Sebelum Pasang RAM & eMMC</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Jalur Testpoint CPU</th>
                      <th className="p-3">Nilai Diode Mode Normal</th>
                      <th className="p-3">Status Komputer / PC</th>
                      <th className="p-3">Indikator Keberhasilan Reball</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">Qualcomm Snapdragon</td>
                      <td className="p-3 text-emerald-400">0.350 V (USB DP/DM)</td>
                      <td className="p-3 font-sans">Terdeteksi "Qualcomm HS-USB QDLoader 9008" otomatis saat testpoint.</td>
                      <td className="p-3 font-sans text-emerald-400">CPU sudah presisi terhubung dengan PMIC & Jalur USB.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">MediaTek (MTK)</td>
                      <td className="p-3 text-emerald-400">0.400 V (BROM Bus)</td>
                      <td className="p-3 font-sans">Terdeteksi "MediaTek USB Port (COMx)" di Device Manager.</td>
                      <td className="p-3 font-sans text-emerald-400">Clock & BROM Handshake CPU telah aktif.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-purple-300">Spreadtrum / Exynos</td>
                      <td className="p-3 text-emerald-400">0.380 V (SPD Boot Line)</td>
                      <td className="p-3 font-sans">Terdeteksi "SPRD Serial Controller" / Exynos Boot device.</td>
                      <td className="p-3 font-sans text-emerald-400">Siap dipasangkan IC eMMC / UFS & RAM.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 29. MIC & Speaker / Buzzer Musik */}
          {activeTab === 'mic_speaker_audio' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Analisa Masalah MIC Tidak Berfungsi & Speaker / Buzzer Musik Tidak Bekerja</span>
                </h4>
                <span className="text-[11px] text-slate-400">Pengukuran Tegangan MIC_BIAS, Smart PA Amplifier & Speaker Coil</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-blue-300 flex items-center space-x-2">
                    <Mic className="w-4 h-4 text-blue-400" />
                    <span>1. Analisa Microphone (MIC) Mati / Bisu</span>
                  </h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    • <strong>Tegangan Kerja MIC_BIAS:</strong> Wajib ada 1.8V - 2.8V DC pada kaki VDD mic saat perekam suara aktif.<br />
                    • <strong>Jalur Data MIC_DATA / CLK:</strong> Diode mode normal 0.400V - 0.550V.<br />
                    • <strong>Penyebab Utama:</strong> Lubang mic tersumbat kotoran, atau lubang mic terbakar saat blower gantikan socket cas.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="font-bold text-blue-300 flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-blue-400" />
                    <span>2. Analisa Buzzer / Speaker Musik Bisu / Cempreng</span>
                  </h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    • <strong>Resistansi Buzzer:</strong> Nilai normal spiker 6 Ohm - 8 Ohm.<br />
                    • <strong>IC Smart PA Amplifier:</strong> Cek tegangan masukan VDD_PA (4.2V VBAT) & jalur I2S data dari Audio Codec.<br />
                    • <strong>Solusi:</strong> Ganti IC Smart PA (Class-D Amp) atau ganti modul buzzer speaker bawah.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 30. Input/Output/Perintah/Protect Pada Rangkaian IC */}
          {activeTab === 'ic_logic_protect' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                  <GitBranch className="w-4 h-4" />
                  <span>Cara Membaca Input, Output, Sinyal Perintah (EN/RESET) & Sistem Protect Pada IC</span>
                </h4>
                <span className="text-[11px] text-slate-400">Prinsip Kerja Blok IC Power, Display LDO & Charging IC</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Jenis Pin IC</th>
                      <th className="p-3">Singkatan & Contoh</th>
                      <th className="p-3">Logika Tegangan / Sinyal</th>
                      <th className="p-3">Dampak Jika Terganggu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">VIN / VDD (Input Power)</td>
                      <td className="p-3 text-amber-300">VBUS, VBAT, VPH_PWR</td>
                      <td className="p-3 font-sans">Tegangan catu daya utama dari baterai / USB agar IC bisa menyala.</td>
                      <td className="p-3 font-sans text-red-400">IC tidak akan bekerja sama sekali jika VIN hilang/short.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">EN (Enable Control)</td>
                      <td className="p-3 text-amber-300">DISP_EN, PA_EN, BUCK_EN</td>
                      <td className="p-3 font-sans">Sinyal saklar High (1.8V) dari CPU untuk menyalakan fungsi spesifik IC.</td>
                      <td className="p-3 font-sans text-amber-400">EN tidak ada &rarr; Output IC tidak keluar meskipun VIN normal.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-emerald-300">OCP / OVP (Protect Pin)</td>
                      <td className="p-3 text-amber-300">OVER_CURR_PROT, OVP_FLAG</td>
                      <td className="p-3 font-sans">Proteksi arus lebih & tegangan lebih. Mematikan keluaran IC jika short.</td>
                      <td className="p-3 font-sans text-amber-400">PSU Protect / Arus mati seketika untuk cegah IC terbakar.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 31. Alat Service Wajib Bengkel HP */}
          {activeTab === 'alat_service_wajib' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-2">
                  <Wrench className="w-4 h-4" />
                  <span>Daftar Alat Service Wajib Bengkel Teknisi HP Professional</span>
                </h4>
                <span className="text-[11px] text-slate-400">Spesifikasi Minimal Untuk Hardware & Software Repair</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h5 className="font-bold text-orange-300">1. Peralatan Pengukuran</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    • Multimeter Digital True-RMS Auto Range (Sanwa / Aneng).<br />
                    • Power Supply 5A / 30V dengan tampilan grafik arus digital.<br />
                    • USB Current Meter Doctor Charge (Pengukur Watt/Ampere).
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h5 className="font-bold text-orange-300">2. Peralatan Solder & Blower</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    • Blower Uap Digital (Sugon 8620DX / Quick 2008).<br />
                    • Solder Station Mata C210 / C115 (JBC / Sugon T26).<br />
                    • Mikroskop Trinokular Stereo + Kamera HD Monitor.
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <h5 className="font-bold text-orange-300">3. Tool Box & Dongle Software</h5>
                  <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
                    • UFI Box / Easy JTAG Plus (Repair eMMC/UFS).<br />
                    • Unlocktool License / Hydra Tool / Chimera Tool.<br />
                    • Software Skematik: Borneo Schematics / Pragmafix.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 32. Direct eMMC ISP, Dump & Backup Security File */}
          {activeTab === 'ufi_direct_emmc_security' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-2">
                  <HardDrive className="w-4 h-4" />
                  <span>Direct eMMC ISP Pinout, Backup Restore File Dump & Security File (UFI Box)</span>
                </h4>
                <span className="text-[11px] text-slate-400">Pinout VCC, VCCQ, CLK, CMD, DAT0 & File NVRAM/NVDATA/EFS/QCN</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Jalur ISP eMMC</th>
                      <th className="p-3">Fungsi Pinout Direct</th>
                      <th className="p-3">File Security Wajib Backup</th>
                      <th className="p-3">SOP Pengerjaan UFI Box</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-indigo-300">VCC (2.8V) & VCCQ (1.8V)</td>
                      <td className="p-3 font-sans">Catu daya internal IC eMMC dari UFI Box / Colok Kabel USB.</td>
                      <td className="p-3 font-sans text-amber-300">NVRAM, NVDATA (MediaTek)</td>
                      <td className="p-3 font-sans">Solder kawat jumper ke TP ISP &rarr; Identify eMMC &rarr; Read Dump 512MB.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-indigo-300">CLK & CMD</td>
                      <td className="p-3 font-sans">Sinyal Clock transmisi & Jalur perintah data eMMC.</td>
                      <td className="p-3 font-sans text-amber-300">MODEMST1, MODEMST2, FSG (Qualcomm)</td>
                      <td className="p-3 font-sans">Backup partisipet EFS / Security sebelum melalukan Format eMMC.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-semibold text-indigo-300">DAT0 (Data Line 0)</td>
                      <td className="p-3 font-sans">Jalur data utama mode 1-Bit ISP Direct.</td>
                      <td className="p-3 font-sans text-amber-300">EFS / PERSIST (Exynos & Xiaomi)</td>
                      <td className="p-3 font-sans">Jika ISP gagal connect, perpendek kawat CLK & pasang resistor pull-up 100 Ohm.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
