import React, { useState } from 'react';
import {
  X,
  CreditCard,
  User,
  MapPin,
  Phone,
  Camera,
  Upload,
  Send,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Registration, AdminSettings } from '../types';
import { CameraCaptureModal } from './CameraCaptureModal';

interface RegistrationModalProps {
  adminSettings: AdminSettings;
  onSubmitRegistration: (reg: Registration) => void;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  adminSettings,
  onSubmitRegistration,
  onClose
}) => {
  const [fullName, setFullName] = useState('');
  const [birthPlaceDate, setBirthPlaceDate] = useState('');
  const [address, setAddress] = useState('');
  const [ktpNumber, setKtpNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [selectedClassKey, setSelectedClassKey] = useState<'androidBasic' | 'androidExpert' | 'iphoneBasic' | 'iphoneExpert'>('androidBasic');

  // Photo states (Base64 dataUrl or uploaded URL)
  const [ktpPhoto, setKtpPhoto] = useState<string>('');
  const [selfiePhoto, setSelfiePhoto] = useState<string>('');
  const [paymentProof, setPaymentProof] = useState<string>('');

  // Camera modal state
  const [activeCameraType, setActiveCameraType] = useState<'ktp' | 'selfie' | 'transfer' | null>(null);

  // Copy bank alert
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const classOptions = [
    { key: 'androidBasic', name: 'Android Basic', fee: adminSettings.classFees.androidBasic || 4500000, label: 'Rp 4.500.000' },
    { key: 'androidExpert', name: 'Android Expert', fee: adminSettings.classFees.androidExpert || 6500000, label: 'Rp 6.500.000' },
    { key: 'iphoneBasic', name: 'iPhone Basic', fee: adminSettings.classFees.iphoneBasic || 10000000, label: 'Rp 10.000.000' },
    { key: 'iphoneExpert', name: 'iPhone Expert', fee: adminSettings.classFees.iphoneExpert || 16000000, label: 'Rp 16.000.000' }
  ];

  const currentClassObj = classOptions.find((c) => c.key === selectedClassKey) || classOptions[0];

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(adminSettings.bankAccountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRegistration: Registration = {
      id: `reg-${Date.now()}`,
      fullName,
      birthPlaceDate,
      address,
      ktpNumber,
      ktpPhotoUrl: ktpPhoto || undefined,
      whatsappNumber,
      selfiePhotoUrl: selfiePhoto || undefined,
      paymentProofUrl: paymentProof || undefined,
      selectedClass: currentClassObj.name,
      classFee: currentClassObj.fee,
      status: 'Menunggu Verifikasi',
      createdAt: new Date().toISOString()
    };

    // Save to App State / Database
    onSubmitRegistration(newRegistration);

    // Prepare WhatsApp Message
    const textMessage = `*FORM PENDAFTARAN SISWA BARU LPK SM FLASHER*
---------------------------------------
*Nama Lengkap:* ${fullName}
*TTL:* ${birthPlaceDate}
*No. KTP:* ${ktpNumber}
*Alamat:* ${address}
*No. WhatsApp:* ${whatsappNumber}
*Program Kelas:* ${currentClassObj.name}
*Biaya Investasi:* Rp ${currentClassObj.fee.toLocaleString('id-ID')}
*Bank Transfer:* ${adminSettings.bankName} (${adminSettings.bankAccountNumber} a.n ${adminSettings.bankAccountName})
---------------------------------------
Mohon verifikasi pendaftaran dan bukti transfer saya. Terima kasih Admin LPK SM Flasher!`;

    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://wa.me/${adminSettings.whatsappAdmin.replace(/[^0-9]/g, '')}?text=${encodedText}`;

    setIsSubmitted(true);

    // Auto open WhatsApp in 1 sec
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative text-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">Pendaftaran Berhasil Dikirim!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Data Anda telah tersimpan di sistem LPK SM Flasher dan halaman WhatsApp Admin otomatis dibuka untuk mengonfirmasi pendaftaran.
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Kembali ke Portal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                  FORMULIR RESMI
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">Pendaftaran Siswa Baru LPK SM Flasher</h2>
              <p className="text-xs text-slate-400">Isi formulir lengkap di bawah ini untuk pendaftaran kelas offline & online.</p>
            </div>

            {/* Bank Payment Card */}
            <div className="p-4 bg-gradient-to-r from-indigo-950/60 via-slate-950 to-slate-900 border border-indigo-500/30 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Rekening Resmi Pembayaran LPK</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                  VERIFIED BANK
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <div>
                  <p className="text-xs text-slate-400">Bank Transfer & Pemilik Rekening:</p>
                  <p className="text-sm font-bold text-white">
                    {adminSettings.bankName} a.n. <span className="text-indigo-300">{adminSettings.bankAccountName}</span>
                  </p>
                  <p className="text-lg font-mono font-extrabold text-indigo-400 tracking-wider">
                    {adminSettings.bankAccountNumber}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow transition flex items-center space-x-1.5"
                >
                  {copiedBank ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedBank ? 'Tersalin!' : 'Salin No. Rekening'}</span>
                </button>
              </div>
            </div>

            {/* Class Program Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Pilih Program Kelas Pelatihan (Klik Salah Satu) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {classOptions.map((c) => {
                  const isSelected = selectedClassKey === c.key;
                  return (
                    <div
                      key={c.key}
                      onClick={() => setSelectedClassKey(c.key as any)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-950/90 border-indigo-500 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <p className="text-xs font-bold text-white">{c.name}</p>
                          {isSelected && (
                            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                              Dipilih
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-extrabold text-indigo-400">{c.label}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-700 bg-slate-900'}`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Text Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Ahmad Rizki"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Tempat, Tanggal Lahir *
                </label>
                <input
                  type="text"
                  required
                  value={birthPlaceDate}
                  onChange={(e) => setBirthPlaceDate(e.target.value)}
                  placeholder="Contoh: Jakarta, 12 Mei 1998"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  No. KTP / NIK *
                </label>
                <input
                  type="text"
                  required
                  value={ktpNumber}
                  onChange={(e) => setKtpNumber(e.target.value)}
                  placeholder="16 digit NIK KTP..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Alamat Lengkap *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Alamat domisili lengkap RT/RW, Kecamatan, Kota..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Photo Capture / Upload Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
              {/* Photo 1: KTP */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white block">1. Foto KTP</span>
                {ktpPhoto ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-700">
                    <img src={ktpPhoto} alt="KTP" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setKtpPhoto('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setActiveCameraType('ktp')}
                      className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Buka Kamera</span>
                    </button>
                    <label className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setKtpPhoto)} />
                    </label>
                  </div>
                )}
              </div>

              {/* Photo 2: Selfie */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white block">2. Foto Diri / Pasfoto</span>
                {selfiePhoto ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-700">
                    <img src={selfiePhoto} alt="Selfie" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelfiePhoto('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setActiveCameraType('selfie')}
                      className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Buka Kamera</span>
                    </button>
                    <label className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setSelfiePhoto)} />
                    </label>
                  </div>
                )}
              </div>

              {/* Photo 3: Transfer Proof */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white block">3. Bukti Transfer</span>
                {paymentProof ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-700">
                    <img src={paymentProof} alt="Bukti Transfer" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPaymentProof('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                    >
                      &times;
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setActiveCameraType('transfer')}
                      className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold rounded-lg transition flex items-center justify-center space-x-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Buka Kamera</span>
                    </button>
                    <label className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium rounded-lg transition flex items-center justify-center space-x-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, setPaymentProof)} />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pendaftaran via WhatsApp</span>
              </button>
            </div>
          </form>
        )}

        {/* Camera Modal Trigger */}
        {activeCameraType && (
          <CameraCaptureModal
            title={`Ambil Foto ${activeCameraType === 'ktp' ? 'KTP' : activeCameraType === 'selfie' ? 'Diri' : 'Bukti Transfer'}`}
            onCapture={(dataUrl) => {
              if (activeCameraType === 'ktp') setKtpPhoto(dataUrl);
              if (activeCameraType === 'selfie') setSelfiePhoto(dataUrl);
              if (activeCameraType === 'transfer') setPaymentProof(dataUrl);
            }}
            onClose={() => setActiveCameraType(null)}
          />
        )}
      </div>
    </div>
  );
};
