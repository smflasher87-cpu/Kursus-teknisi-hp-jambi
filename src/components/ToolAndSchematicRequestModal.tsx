import React, { useState } from 'react';
import { X, Wrench, FileCode, Send, CheckCircle2, ShieldCheck, Thermometer, HardDrive } from 'lucide-react';
import { User, AdminSettings } from '../types';

interface ToolAndSchematicRequestModalProps {
  currentUser: User;
  adminSettings: AdminSettings;
  onClose: () => void;
}

export const ToolAndSchematicRequestModal: React.FC<ToolAndSchematicRequestModalProps> = ({
  currentUser,
  adminSettings,
  onClose
}) => {
  const [requestType, setRequestType] = useState<'Request Skematik / Firmware' | 'Sewa Alat Teknisi'>('Request Skematik / Firmware');
  const [studentName, setStudentName] = useState(currentUser.name);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [itemDetails, setItemDetails] = useState('');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*REQUEST SKEMATIK & SEWA TOOL LPK SM FLASHER*
---------------------------------------
*Jenis Layanan:* ${requestType}
*Nama Peserta:* ${studentName} (${currentUser.classProgram})
*No. WhatsApp:* ${whatsappNumber}
*Detail Permintaan:* ${itemDetails}
*Catatan Tambahan:* ${notes || '-'}
---------------------------------------
Mohon informasi ketersediaan file skematik / alat laboratorium. Terima kasih Admin LPK SM Flasher!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${adminSettings.whatsappAdmin.replace(/[^0-9]/g, '')}?text=${encoded}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Layanan Request Skematik & Sewa Alat</h3>
            <p className="text-xs text-slate-400">Khusus Peserta & Alumni LPK SM Flasher</p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Permintaan Berhasil Terkirim!</h4>
            <p className="text-xs text-slate-300">
              Aplikasi telah mengarahkan Anda ke WhatsApp Admin ({adminSettings.whatsappAdmin}) untuk konfirmasi pengiriman file / alat.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-indigo-600 text-xs font-bold rounded-xl"
            >
              Kembali ke Portal
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Pilih Jenis Layanan</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRequestType('Request Skematik / Firmware')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                    requestType === 'Request Skematik / Firmware'
                      ? 'bg-indigo-950 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <FileCode className="w-5 h-5" />
                  <span>Skematik / Firmware</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRequestType('Sewa Alat Teknisi')}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                    requestType === 'Sewa Alat Teknisi'
                      ? 'bg-indigo-950 border-indigo-500 text-indigo-300 ring-1 ring-indigo-500'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Wrench className="w-5 h-5" />
                  <span>Sewa Alat Lab</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Nama Peserta *</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Nomor WhatsApp *</label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="081234567890"
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {requestType === 'Request Skematik / Firmware'
                  ? 'Judul / Tipe HP & File Skematik Dibutuhkan *'
                  : 'Nama Alat Lab yang Ingin Disewa *'}
              </label>
              <input
                type="text"
                required
                value={itemDetails}
                onChange={(e) => setItemDetails(e.target.value)}
                placeholder={
                  requestType === 'Request Skematik / Firmware'
                    ? 'Contoh: Skematik Borneo Xiaomi Poco X3 Pro / Dump UFS Samsung A52'
                    : 'Contoh: Kamera Thermal Imager Dianba / Programmer JCID V1SE / Mikroskop Stereo'
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Catatan Tambahan / Durasi Sewa</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan pengerjaan atau durasi sewa yang diminta..."
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-xs rounded-lg">
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow flex items-center space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim via WhatsApp Admin</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
