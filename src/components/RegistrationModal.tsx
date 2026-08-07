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
  Award,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { Registration, AdminSettings } from '../types';
import { CameraCaptureModal } from './CameraCaptureModal';
import { compressImageFile } from '../utils/imageUtils';

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

  // Validation state & submission
  const [validationError, setValidationError] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1280, 1280, 0.75);
        setter(compressed);
        setValidationError('');
      } catch (err) {
        console.error('File compression error:', err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmedName = fullName.trim();
    const trimmedKtp = ktpNumber.trim().replace(/\s+/g, '');
    const trimmedWa = whatsappNumber.trim().replace(/\D/g, '');
    const trimmedAddress = address.trim();
    const trimmedTtl = birthPlaceDate.trim();

    // 1. Validate Full Name
    if (!trimmedName || trimmedName.length < 3) {
      setValidationError('Nama Lengkap KTP wajib diisi sesuai identitas resmi (minimal 3 karakter).');
      return;
    }

    // 2. Validate KTP NIK - MUST BE EXACTLY 16 DIGITS
    if (!/^\d{16}$/.test(trimmedKtp)) {
      setValidationError('Nomor KTP / NIK wajib berjumlah tepat 16 digit angka valid sesuai dokumen KTP.');
      return;
    }

    // 3. Validate WhatsApp Number (10 to 15 digits)
    if (!/^\d{10,15}$/.test(trimmedWa)) {
      setValidationError('Nomor WhatsApp wajib berupa angka 10-15 digit yang aktif.');
      return;
    }

    // 4. Validate Address
    if (!trimmedAddress || trimmedAddress.length < 5) {
      setValidationError('Alamat Lengkap domisili wajib diisi secara detail.');
      return;
    }

    // 5. Validate KTP Photo
    if (!ktpPhoto) {
      setValidationError('Foto KTP/NIK wajib diunggah atau diambil menggunakan kamera!');
      return;
    }

    // 6. Validate Selfie Photo
    if (!selfiePhoto) {
      setValidationError('Foto Diri/Pasfoto wajib diunggah atau diambil menggunakan kamera!');
      return;
    }

    // 7. Validate Transfer Proof (Bukti Transfer)
    if (!paymentProof) {
      setValidationError('Bukti Transfer Pembayaran wajib diunggah atau difoto sebagai bukti validasi transaksi!');
      return;
    }

    const newRegistration: Registration = {
      id: `reg-${Date.now()}`,
      fullName: trimmedName,
      birthPlaceDate: trimmedTtl,
      address: trimmedAddress,
      ktpNumber: trimmedKtp,
      ktpPhotoUrl: ktpPhoto,
      whatsappNumber: trimmedWa,
      selfiePhotoUrl: selfiePhoto,
      paymentProofUrl: paymentProof,
      selectedClass: currentClassObj.name,
      classFee: currentClassObj.fee,
      status: 'Menunggu Verifikasi',
      createdAt: new Date().toISOString()
    };

    // Save to App State / Database
    onSubmitRegistration(newRegistration);

    // Prepare WhatsApp Admin Target Phone Number (Indonesian 62 format)
    const rawAdminPhone = adminSettings.whatsappAdmin.replace(/[^0-9]/g, '');
    const waAdminPhone = rawAdminPhone.startsWith('0')
      ? '62' + rawAdminPhone.substring(1)
      : rawAdminPhone;

    // Prepare Detailed WhatsApp Message
    const textMessage = `*FORMULIR PENDAFTARAN SISWA BARU LPK SM FLASHER*
=========================================
*PROGRAM KELAS:* ${currentClassObj.name.toUpperCase()}
*BIAYA INVESTASI:* Rp ${currentClassObj.fee.toLocaleString('id-ID')}
-----------------------------------------
*DATA PRIBADI SISWA:*
• *Nama Lengkap (KTP):* ${trimmedName}
• *No. KTP / NIK:* ${trimmedKtp} (16 Digit Validated)
• *Tempat, Tgl Lahir:* ${trimmedTtl}
• *Alamat Domisili:* ${trimmedAddress}
• *No. WhatsApp Siswa:* ${trimmedWa}
-----------------------------------------
*DATA PEMBAYARAN & DOKUMEN:*
• *Bank Tujuan:* ${adminSettings.bankName} (${adminSettings.bankAccountNumber} a.n ${adminSettings.bankAccountName})
• *Foto KTP:* Terunggah (Valid)
• *Foto Diri:* Terunggah (Valid)
• *Bukti Transfer:* Terunggah (Lunas / DP)
=========================================
_Halo Admin LPK SM Flasher, saya telah mengisi formulir pendaftaran dan mengunggah dokumen KTP & bukti transfer. Mohon diverifikasi untuk diproses akun login portal saya. Terima kasih!_`;

    const encodedText = encodeURIComponent(textMessage);
    const waUrl = `https://wa.me/${waAdminPhone}?text=${encodedText}`;

    setGeneratedWaUrl(waUrl);
    setIsSubmitted(true);

    // Try auto-opening WhatsApp link
    try {
      window.open(waUrl, '_blank');
    } catch (e) {
      console.log('Popup blocked, backup button displayed.');
    }
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
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Pendaftaran Berhasil Dikirim!</h3>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Data pendaftaran KTP, Foto, dan Bukti Transfer Anda telah tersimpan secara resmi di database LPK SM Flasher.
              </p>
            </div>

            {/* Direct WhatsApp Action Callout */}
            <div className="p-5 bg-emerald-950/60 border border-emerald-800/80 rounded-2xl max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-center space-x-2 text-emerald-300 font-bold text-xs">
                <MessageSquare className="w-4 h-4" />
                <span>Konfirmasi Langsung ke WhatsApp Admin</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Klik tombol di bawah untuk langsung membuka percakapan WhatsApp dengan Admin LPK SM Flasher dan mengirimkan formulir otomatis.
              </p>
              <a
                href={generatedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan WhatsApp Ke Admin Now</span>
              </a>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
              >
                Tutup & Kembali Ke Portal
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
                  FORMULIR PENDAFTARAN RESMI
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white mt-1">Siswa Baru LPK SM Flasher</h2>
              <p className="text-xs text-slate-400">Silakan lengkapi formulir pendaftaran, verifikasi KTP, dan unggah bukti transfer.</p>
            </div>

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-4 rounded-xl bg-red-950/90 border border-red-800 text-red-200 text-xs flex items-start space-x-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed font-medium">{validationError}</div>
              </div>
            )}

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

            {/* Class Program Selector - Mobile & Desktop Optimized */}
            <div className="space-y-3 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-indigo-500/30 shadow-inner">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <label className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>PILIH PROGRAM KELAS PELATIHAN (KLIK SALAH SATU) *</span>
                </label>
                <span className="text-[10px] font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded uppercase shadow">
                  WAJIB DIPILIH
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {classOptions.map((c) => {
                  const isSelected = selectedClassKey === c.key;
                  return (
                    <div
                      key={c.key}
                      onClick={() => setSelectedClassKey(c.key as any)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-400 ring-2 ring-indigo-500/60 shadow-xl shadow-indigo-500/20'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {c.name}
                          </span>
                          {isSelected ? (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 shadow-sm border border-emerald-400">
                              TERPILIH ✓
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                              Opsi Kelas
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-black text-indigo-400 flex items-center space-x-1">
                          <span>Biaya: {c.label}</span>
                        </p>
                      </div>
                      <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                        isSelected ? 'border-emerald-400 bg-emerald-500 text-slate-950 shadow-md' : 'border-slate-600 bg-slate-950'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
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
                  Nama Lengkap (Sesuai KTP) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Contoh: Ahmad Rizki Pratama"
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
                  onChange={(e) => {
                    setBirthPlaceDate(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Contoh: Jambi, 12 Mei 1998"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  No. KTP / NIK (Wajib 16 Digit) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={ktpNumber}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, '');
                    setKtpNumber(onlyNums);
                    setValidationError('');
                  }}
                  placeholder="Contoh: 1571011205980001"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <span className="text-[10px] text-slate-400 block">
                  Jumlah Karakter NIK: <strong className={ktpNumber.length === 16 ? 'text-emerald-400' : 'text-amber-400'}>{ktpNumber.length}/16 Digit</strong>
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => {
                    setWhatsappNumber(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Contoh: 081234567890"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Alamat Lengkap Domisili *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setValidationError('');
                }}
                placeholder="Alamat lengkap RT/RW, Kelurahan, Kecamatan, Kota, Provinsi..."
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Photo Capture / Upload Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-800">
              {/* Photo 1: KTP */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-white block">1. Foto KTP *</span>
                {ktpPhoto ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-emerald-500/50">
                    <img src={ktpPhoto} alt="KTP" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setKtpPhoto('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                    >
                      &times;
                    </button>
                    <div className="absolute bottom-1 left-1 bg-emerald-950/90 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                      ✓ Foto KTP Terverifikasi
                    </div>
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
                <span className="text-xs font-bold text-white block">2. Foto Diri / Pasfoto *</span>
                {selfiePhoto ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-emerald-500/50">
                    <img src={selfiePhoto} alt="Selfie" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelfiePhoto('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                    >
                      &times;
                    </button>
                    <div className="absolute bottom-1 left-1 bg-emerald-950/90 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                      ✓ Foto Diri Terunggah
                    </div>
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
                <span className="text-xs font-bold text-white block">3. Bukti Transfer *</span>
                {paymentProof ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-emerald-500/50">
                    <img src={paymentProof} alt="Bukti Transfer" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPaymentProof('')}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-xs"
                    >
                      &times;
                    </button>
                    <div className="absolute bottom-1 left-1 bg-emerald-950/90 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                      ✓ Bukti Transfer Ada
                    </div>
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

            {/* Summary Payment Box directly above Submit Button */}
            <div className="p-4 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/40 rounded-xl space-y-3 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/20 pb-2.5">
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">
                    TOTAL NOMINAL PEMBAYARAN KELAS
                  </span>
                  <div className="text-xl font-black text-white flex items-center space-x-2">
                    <span className="text-emerald-400">Rp {currentClassObj.fee.toLocaleString('id-ID')}</span>
                    <span className="text-xs font-bold text-slate-300">({currentClassObj.name})</span>
                  </div>
                </div>
                <div className="text-left sm:text-right bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Transfer Ke Rekening Resmi:</span>
                  <p className="text-xs font-bold text-white">
                    {adminSettings.bankName}: <span className="text-indigo-300 font-mono font-extrabold">{adminSettings.bankAccountNumber}</span>
                  </p>
                  <p className="text-[10px] text-slate-300">a.n {adminSettings.bankAccountName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Verifikasi Nominal:</strong> Bukti transfer yang Anda unggah harus sesuai dengan nominal <strong>Rp {currentClassObj.fee.toLocaleString('id-ID')}</strong> untuk proses verifikasi instan oleh Admin.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pendaftaran via WhatsApp Admin</span>
              </button>
            </div>
          </form>
        )}

        {/* Camera Modal Trigger */}
        {activeCameraType && (
          <CameraCaptureModal
            title={`Ambil Foto ${activeCameraType === 'ktp' ? 'KTP' : activeCameraType === 'selfie' ? 'Diri' : 'Bukti Transfer'}`}
            onCapture={async (dataUrl) => {
              // Convert base64 dataUrl to blob/file and compress
              fetch(dataUrl)
                .then((res) => res.blob())
                .then((blob) => {
                  const file = new File([blob], 'captured_photo.jpg', { type: 'image/jpeg' });
                  return compressImageFile(file, 1280, 1280, 0.75);
                })
                .then((compressed) => {
                  if (activeCameraType === 'ktp') setKtpPhoto(compressed);
                  if (activeCameraType === 'selfie') setSelfiePhoto(compressed);
                  if (activeCameraType === 'transfer') setPaymentProof(compressed);
                  setValidationError('');
                })
                .catch(() => {
                  if (activeCameraType === 'ktp') setKtpPhoto(dataUrl);
                  if (activeCameraType === 'selfie') setSelfiePhoto(dataUrl);
                  if (activeCameraType === 'transfer') setPaymentProof(dataUrl);
                });
            }}
            onClose={() => setActiveCameraType(null)}
          />
        )}
      </div>
    </div>
  );
};

