import React, { useState } from 'react';
import { AdminSettings, User } from '../types';
import { Settings, X, Save, Image, Phone, CreditCard, DollarSign, Award, Check } from 'lucide-react';

interface AdminSettingsModalProps {
  settings: AdminSettings;
  users: User[];
  onSaveSettings: (updated: AdminSettings) => void;
  onUpdateUserCustomCert: (userId: string, certUrl: string) => void;
  onClose: () => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({
  settings,
  users,
  onSaveSettings,
  onUpdateUserCustomCert,
  onClose
}) => {
  const [formData, setFormData] = useState<AdminSettings>(settings);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(users.find((u) => u.role === 'siswa')?.id || '');
  const [customCertUrl, setCustomCertUrl] = useState<string>('');
  const [certSavedSuccess, setCertSavedSuccess] = useState(false);

  const handleSaveMainSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    onClose();
  };

  const handleSaveCustomCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudentId) {
      onUpdateUserCustomCert(selectedStudentId, customCertUrl);
      setCertSavedSuccess(true);
      setTimeout(() => setCertSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-white my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Pengaturan Admin Portal & Kontrol Aplikasi</h3>
            <p className="text-xs text-slate-400">Atur Logo Lembaga, WhatsApp Admin, No. Rekening, Biaya Kelas, & Upload Sertifikat Kustom</p>
          </div>
        </div>

        <form onSubmit={handleSaveMainSettings} className="space-y-6">
          {/* Section 1: Logo & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <Image className="w-4 h-4" />
              <span>Logo Lembaga & WhatsApp Admin</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Logo Lembaga (URL / Upload) *</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="https://... atau upload file"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                  />
                  <label className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer">
                    <span>Upload Logo dari Penyimpanan</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({ ...formData, logoUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nomor WhatsApp Admin *</label>
                <input
                  type="text"
                  value={formData.whatsappAdmin}
                  onChange={(e) => setFormData({ ...formData, whatsappAdmin: e.target.value })}
                  placeholder="081368838003"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Bank Details */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <CreditCard className="w-4 h-4" />
              <span>Rekening Bank Pembayaran Siswa Baru</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Nama Bank</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Atas Nama (Pemilik)</label>
                <input
                  type="text"
                  value={formData.bankAccountName}
                  onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Nomor Rekening</label>
                <input
                  type="text"
                  value={formData.bankAccountNumber}
                  onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Class Fees */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Harga Paket Biaya Pelatihan</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Android Basic (Rp)</label>
                <input
                  type="number"
                  value={formData.classFees.androidBasic}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      classFees: { ...formData.classFees, androidBasic: Number(e.target.value) }
                    })
                  }
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Android Expert (Rp)</label>
                <input
                  type="number"
                  value={formData.classFees.androidExpert}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      classFees: { ...formData.classFees, androidExpert: Number(e.target.value) }
                    })
                  }
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">iPhone Basic (Rp)</label>
                <input
                  type="number"
                  value={formData.classFees.iphoneBasic}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      classFees: { ...formData.classFees, iphoneBasic: Number(e.target.value) }
                    })
                  }
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">iPhone Expert (Rp)</label>
                <input
                  type="number"
                  value={formData.classFees.iphoneExpert}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      classFees: { ...formData.classFees, iphoneExpert: Number(e.target.value) }
                    })
                  }
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan Admin</span>
            </button>
          </div>
        </form>

        {/* Section 4: Upload Custom Certificate for Student */}
        <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center space-x-1.5">
            <Award className="w-4 h-4" />
            <span>Upload Sertifikat Kustom Peserta (Admin)</span>
          </h4>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <p className="text-xs text-slate-400">
              Admin dapat memasukkan URL sertifikat khusus / hasil scan resmi untuk dibuka oleh siswa tertentu.
            </p>

            <form onSubmit={handleSaveCustomCert} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Pilih Siswa / Peserta</label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  >
                    {users
                      .filter((u) => u.role === 'siswa')
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} (@{s.username})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">URL File Sertifikat Kustom (PDF/Gambar)</label>
                  <input
                    type="text"
                    required
                    value={customCertUrl}
                    onChange={(e) => setCustomCertUrl(e.target.value)}
                    placeholder="https://.../sertifikat_resmi.pdf"
                    className="w-full p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                {certSavedSuccess ? (
                  <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                    <Check className="w-4 h-4" />
                    <span>Sertifikat berhasil ditautkan ke akun siswa!</span>
                  </span>
                ) : (
                  <span />
                )}

                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow transition"
                >
                  Tautkan Sertifikat
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
