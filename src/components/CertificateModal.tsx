import React, { useState } from 'react';
import { Award, Download, X, CheckCircle, ShieldCheck, Sparkles, GraduationCap } from 'lucide-react';
import { User } from '../types';
import jsPDF from 'jspdf';

interface CertificateModalProps {
  currentUser: User;
  completedCount: number;
  totalCount: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  currentUser,
  completedCount,
  totalCount,
  onClose
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const percent = Math.round((completedCount / (totalCount || 1)) * 100);

  const handleDownloadCertificate = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);

    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Background Border Design
      doc.setDrawColor(30, 41, 59); // Slate-800
      doc.setLineWidth(3);
      doc.rect(8, 8, 281, 194);

      doc.setDrawColor(79, 70, 229); // Indigo-600 accent
      doc.setLineWidth(1);
      doc.rect(12, 12, 273, 186);

      // Header Brand
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59);
      doc.text('LPK SM FLASHER TRAINING CENTRE', 148, 32, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('LEMBAGA PELATIHAN KERJA TEKNISI TELEPON SELULER (ANDROID & IPHONE)', 148, 39, { align: 'center' });
      doc.text('Izin Resmi LPK & Standar Kompetensi Teknis Indonesia', 148, 44, { align: 'center' });

      // Divider Line
      doc.setDrawColor(203, 213, 225);
      doc.line(40, 49, 257, 49);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(79, 70, 229);
      doc.text('SERTIFIKAT KELULUSAN PELATIHAN', 148, 62, { align: 'center' });

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text('Diberikan secara resmi kepada:', 148, 72, { align: 'center' });

      // Student Name
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42);
      doc.text(currentUser.name.toUpperCase(), 148, 86, { align: 'center' });

      // Student Username / ID
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(`USERNAME/ID PESERTA: ${currentUser.username.toUpperCase()}`, 148, 93, { align: 'center' });

      // Statement
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(51, 65, 85);
      doc.text('Telah menyelesaikan seluruh rangkaian modul pelatihan teknisi telepon seluler bertingkat:', 148, 106, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(79, 70, 229);
      doc.text('KURIKULUM SPECIALIST HARDWARE & SOFTWARE MOBILE PHONE (BASIC TO EXPERT)', 148, 114, { align: 'center' });

      // Stats Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(65, 122, 167, 22, 3, 3, 'FD');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(`Total Modul Selesai: ${completedCount} / ${totalCount} Video SOP (${percent}% Selesai)`, 148, 132, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text('Mencakup Hardware Reballing, iPhone Double Layer, Direct eMMC/UFS, DFU, & OCA Glass', 148, 138, { align: 'center' });

      // Date & Location
      const currentDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(`Diterbitkan pada: ${currentDate}`, 148, 156, { align: 'center' });

      // Signatures
      doc.line(50, 180, 110, 180);
      doc.text('Master Teknisi SM FLASHER', 80, 185, { align: 'center' });
      doc.setFontSize(8);
      doc.text('Instruktur Utama Pelatihan', 80, 189, { align: 'center' });

      doc.line(187, 180, 247, 180);
      doc.setFontSize(10);
      doc.text('Direktur LPK SM FLASHER', 217, 185, { align: 'center' });
      doc.setFontSize(8);
      doc.text('Lembaga Pelatihan Kerja Resmi', 217, 189, { align: 'center' });

      // Save PDF
      const filename = `Sertifikat_Kelulusan_LPK_SM_FLASHER_${currentUser.username}.pdf`;
      doc.save(filename);
      setDownloadSuccess(true);
    } catch (err) {
      console.error('Failed to generate PDF certificate:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-4 mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-md">
            <GraduationCap className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
              SERTIFIKAT KELULUSAN RESMI
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Sertifikat Kompetensi Teknisi HP
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
              Dokumen resmi pencapaian pembelajaran siswa LPK SM FLASHER Training Centre.
            </p>
          </div>
        </div>

        {/* Certificate Preview Box */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center space-y-3 relative">
          <div className="flex justify-between items-center text-xs text-slate-500 border-b border-slate-200 pb-3">
            <span className="font-bold text-indigo-600">LPK SM FLASHER</span>
            <span className="font-mono">NO. ID: {currentUser.username.toUpperCase()}</span>
          </div>

          <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
            {currentUser.name}
          </h3>
          <p className="text-xs text-slate-600">
            Telah menyelesaikan pelatihan kurikulum specialist Android & iPhone dengan total <strong>{completedCount} dari {totalCount} modul</strong> ({percent}% progres).
          </p>

          {currentUser.customCertificateUrl && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-left space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">Sertifikat Hasil Scan Admin:</span>
              <a
                href={currentUser.customCertificateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-indigo-600 underline hover:text-indigo-800 break-all"
              >
                {currentUser.customCertificateUrl}
              </a>
            </div>
          )}

          <div className="pt-2 flex justify-center items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200 max-w-fit mx-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Terverifikasi Oleh Sistem LPK SM FLASHER</span>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Sertifikat PDF berhasil diunduh ke perangkat Anda.</span>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition"
          >
            Tutup
          </button>
          <button
            onClick={handleDownloadCertificate}
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-200 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Memproses Dokumen...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Unduh Sertifikat PDF Kelulusan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
