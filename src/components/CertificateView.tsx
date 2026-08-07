import React, { useState } from 'react';
import { Award, Download, Upload, ShieldCheck, User, Search, FileText, CheckCircle2, Trash2, ExternalLink } from 'lucide-react';
import { User as UserType } from '../types';
import { generateCertificatePDF } from '../utils/pdfGenerator';
import { compressImageFile } from '../utils/imageUtils';

interface CertificateViewProps {
  currentUser: UserType;
  allUsers: UserType[];
  onUpdateUserCertificate: (userId: string, certUrl: string) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  currentUser,
  allUsers,
  onUpdateUserCertificate
}) => {
  const isAdmin = currentUser.role === 'admin';
  const [selectedStudentId, setSelectedStudentId] = useState<string>(currentUser.id);
  const [uploadingUserId, setUploadingUserId] = useState<string>('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [uploadError, setUploadError] = useState('');

  const targetUser = allUsers.find((u) => u.id === selectedStudentId) || currentUser;

  const certNumber = `SMF-BNSP/${targetUser.id.substring(0, 6).toUpperCase()}/${new Date().getFullYear()}`;
  const issueDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleDownloadPdf = () => {
    generateCertificatePDF(
      targetUser.name,
      targetUser.classProgram || 'Teknisi Handphone Android & iPhone Specialist',
      certNumber,
      issueDate,
      'REG.BNSP-SMF-2026-9812'
    );
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    try {
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          const pdfDataUrl = reader.result as string;
          onUpdateUserCertificate(userId, pdfDataUrl);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('image/')) {
        const compressed = await compressImageFile(file, 1600, 1200, 0.8);
        onUpdateUserCertificate(userId, compressed);
      } else {
        setUploadError('Format file wajib berupa PDF atau Foto Gambar (JPG/PNG).');
      }
    } catch (err) {
      console.error('Cert Upload Error:', err);
      setUploadError('Gagal mengunggah sertifikat. Silakan coba file lain.');
    }
  };

  const filteredUsers = allUsers.filter((u) =>
    u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    u.classProgram.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border border-amber-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Award className="w-5 h-5" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                E-SERTIFIKAT KELULUSAN RESMI
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">Download Sertifikat LPK SM Flasher</h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Unduh Sertifikat Resmi Kelulusan Pelatihan LPK SM Flasher yang terdaftar dengan SK Kemenkumham & VIN Kemnaker untuk bukti portofolio kerja.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={handleDownloadPdf}
              className="px-5 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Sertifikat (PDF Official)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Certificate Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Certificate Certificate Canvas / Document Preview (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-bold text-white">Preview Sertifikat Resmi</span>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                VERIFIED STUDENT
              </span>
            </div>

            {/* Custom Admin Uploaded Certificate OR Generated Canvas */}
            {targetUser.customCertificateUrl ? (
              <div className="space-y-3">
                <div className="p-3 bg-indigo-950/60 border border-indigo-500/30 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-indigo-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Sertifikat khusus diunggah oleh Admin LPK SM Flasher</span>
                  </div>
                  <a
                    href={targetUser.customCertificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition flex items-center space-x-1"
                  >
                    <span>Buka File Asli</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {targetUser.customCertificateUrl.startsWith('data:application/pdf') ? (
                  <iframe
                    src={targetUser.customCertificateUrl}
                    title="Sertifikat PDF"
                    className="w-full h-96 rounded-xl border border-slate-800"
                  />
                ) : (
                  <div className="rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl">
                    <img
                      src={targetUser.customCertificateUrl}
                      alt="Sertifikat Khusus"
                      className="w-full h-auto object-contain bg-slate-950"
                    />
                  </div>
                )}
              </div>
            ) : (
              /* Visual Interactive Certificate Template */
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-4 border-amber-500/40 rounded-2xl p-6 sm:p-10 shadow-2xl text-center space-y-6 relative overflow-hidden">
                {/* Gold Watermark / Accent Frame */}
                <div className="border border-amber-500/20 rounded-xl p-6 sm:p-8 space-y-5">
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-amber-400">
                      LPK SM FLASHER TRAINING CENTRE
                    </p>
                    <p className="text-[10px] text-slate-400">
                      LEMBAGA PELATIHAN KERJA TEKNISI TELEPON SELULER PROFESIONAL
                    </p>
                    <p className="text-[9px] text-slate-500">
                      SK KEMENKUMHAM: AHU-0012345.AH.01.04 &bull; VIN KEMNAKER: 2109317101
                    </p>
                  </div>

                  <div className="py-2 border-y border-amber-500/30">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      SERTIFIKAT KELULUSAN
                    </h1>
                    <p className="text-[11px] font-mono text-slate-400">
                      NO. REGISTRASI: {certNumber}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300">Diberikan dengan bangga kepada:</p>

                  <div className="py-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-400 uppercase tracking-wide">
                      {targetUser.name}
                    </h3>
                    <div className="w-32 h-0.5 bg-amber-500 mx-auto mt-2" />
                  </div>

                  <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                    Telah menyelesaikan dengan <strong>LULUS DAN MEMUASKAN</strong> seluruh Ujian Praktek & Teori pada Program Pelatihan Teknisi:
                  </p>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl max-w-md mx-auto">
                    <p className="text-sm font-extrabold text-white">
                      {targetUser.classProgram || 'Teknisi Handphone Android & iPhone Specialist'}
                    </p>
                  </div>

                  {/* Signatures & Footer info */}
                  <div className="pt-6 grid grid-cols-2 gap-4 text-xs border-t border-slate-800">
                    <div className="space-y-8">
                      <p className="text-[10px] text-slate-400">Head Instructor:</p>
                      <p className="font-bold text-amber-400 border-b border-amber-500/30 pb-1 inline-block">
                        Master Syahrul Flasher
                      </p>
                    </div>
                    <div className="space-y-8">
                      <p className="text-[10px] text-slate-400">Direktur LPK SM Flasher:</p>
                      <p className="font-bold text-amber-400 border-b border-amber-500/30 pb-1 inline-block">
                        Pimpinan LPK SM Flasher
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Data Info & Admin Upload Manager (1 Col) */}
        <div className="space-y-6">
          {/* Active Selected Student Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center space-x-2 text-white font-bold text-sm border-b border-slate-800 pb-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Detail Peserta / Pemilik Sertifikat</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Nama Siswa:</span>
                <span className="font-bold text-white text-sm">{targetUser.name}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Username / Account ID:</span>
                <span className="font-mono text-indigo-300 font-bold">{targetUser.username}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Program Pelatihan:</span>
                <span className="font-bold text-slate-200">{targetUser.classProgram}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">Status Sertifikasi:</span>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mt-1">
                  TERPUBLIKASI RESMI
                </span>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Sertifikat (PDF)</span>
            </button>
          </div>

          {/* Admin Upload Certificate Section */}
          {isAdmin && (
            <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs border-b border-slate-800 pb-2">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>Form Upload Sertifikat Khusus Admin</span>
              </div>

              <p className="text-[11px] text-slate-400">
                Admin dapat memilih siswa dan mengunggah file sertifikat khusus (PDF atau Foto HD) dari penyimpanan perangkat.
              </p>

              {uploadError && (
                <p className="text-xs text-red-400 bg-red-950/60 p-2.5 rounded-lg border border-red-800">
                  {uploadError}
                </p>
              )}

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 uppercase block">
                    Pilih Siswa Target:
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    {allUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.username}) - {u.classProgram}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300 uppercase block">
                    Upload File Sertifikat (PDF / Gambar HD):
                  </label>
                  <label className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center justify-center space-x-2 transition">
                    <Upload className="w-4 h-4" />
                    <span>Pilih File Dari Penyimpanan</span>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, selectedStudentId)}
                    />
                  </label>
                </div>

                {targetUser.customCertificateUrl && (
                  <button
                    onClick={() => onUpdateUserCertificate(selectedStudentId, '')}
                    className="w-full py-2 bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Custom Sertifikat Siswa Ini</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
