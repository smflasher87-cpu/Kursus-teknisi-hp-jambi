import { jsPDF } from 'jspdf';
import { Video } from '../types';

export function generateModulePDF(video: Video) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const title = video.pdfTitle || video.title;
  const fileName = video.pdfFileName || `Modul_Pelatihan_${video.id}.pdf`;
  const content = video.pdfContent || video.description;

  // Header Bar
  doc.setFillColor(15, 23, 42); // Dark Slate Blue (#0F172A)
  doc.rect(0, 0, 210, 32, 'F');

  // Accent Line
  doc.setFillColor(245, 158, 11); // Amber (#F59E0B)
  doc.rect(0, 32, 210, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('LPK SM FLASHER TRAINING CENTRE', 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text('MODUL PANDUAN PRAKTIK TEKNISI TELEPON SELULER', 14, 23);

  // Document Info
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  
  // Wrap Title
  const wrappedTitle = doc.splitTextToSize(title, 180);
  doc.text(wrappedTitle, 14, 45);

  const titleHeight = wrappedTitle.length * 7;
  let currentY = 45 + titleHeight;

  // Meta Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, currentY, 182, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Kategori: ${video.category}`, 18, currentY + 7);
  doc.text(`Durasi Video: ${video.duration}`, 18, currentY + 14);
  doc.text(`Instruktur/Penyusun: ${video.addedBy}`, 110, currentY + 7);
  doc.text(`Tanggal Terbit: ${new Date(video.createdAt).toLocaleDateString('id-ID')}`, 110, currentY + 14);

  currentY += 30;

  // Content Heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(18, 24, 38);
  doc.text('MATERI RINGKASAN & STANDAR OPERASIONAL PROSEDUR (SOP):', 14, currentY);

  currentY += 8;

  // Content Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  const splitContent = doc.splitTextToSize(content, 182);

  // Loop lines with auto pagination
  for (let i = 0; i < splitContent.length; i++) {
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
    doc.text(splitContent[i], 14, currentY);
    currentY += 6;
  }

  currentY += 10;
  if (currentY > 260) {
    doc.addPage();
    currentY = 20;
  }

  // Tags Box
  if (video.tags && video.tags.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('Kata Kunci / Tag Skematik:', 14, currentY);
    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(video.tags.join(', '), 14, currentY);
  }

  // Footer on bottom of current page
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Dokumen Rahasia Internal LPK SM FLASHER TRAINING CENTRE - Khusus Siswa Terdaftar',
      14,
      287
    );
    doc.text(`Halaman ${p} dari ${pageCount}`, 180, 287);
  }

  doc.save(fileName);
}

export function generateCertificatePDF(
  studentName: string,
  classProgram: string,
  certNumber: string,
  issueDate: string,
  bnspNumber?: string
) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Background Outer Frame
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, 297, 210, 'F');

  // Gold Inner Frame
  doc.setLineWidth(1.5);
  doc.setDrawColor(217, 119, 6); // Amber 600
  doc.roundedRect(8, 8, 281, 194, 4, 4, 'D');

  doc.setLineWidth(0.5);
  doc.setDrawColor(245, 158, 11); // Amber 500
  doc.roundedRect(12, 12, 273, 186, 3, 3, 'D');

  // Certificate Header Card Area
  doc.setFillColor(30, 41, 59); // Slate 800
  doc.roundedRect(16, 16, 265, 178, 2, 2, 'F');

  // Header Title
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('LPK SM FLASHER TRAINING CENTRE', 148.5, 36, { align: 'center' });

  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('LEMBAGA PELATIHAN KERJA TEKNISI TELEPON SELULER PROFESIONAL', 148.5, 43, { align: 'center' });
  doc.text('SK KEMENKUMHAM: AHU-0012345.AH.01.04 | VIN KEMNAKER: 2109317101', 148.5, 48, { align: 'center' });

  // Divider Line
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.8);
  doc.line(40, 53, 257, 53);

  // Main Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('SERTIFIKAT KELULUSAN', 148.5, 68, { align: 'center' });

  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`NO. REGISTRASI: ${certNumber}`, 148.5, 76, { align: 'center' });

  doc.setFontSize(12);
  doc.text('Diberikan dengan hormat kepada:', 148.5, 90, { align: 'center' });

  // Student Name
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text(studentName.toUpperCase(), 148.5, 105, { align: 'center' });

  // Name Underline
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.5);
  doc.line(80, 108, 217, 108);

  // Completion Statement
  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(
    `Telah menyelesaikan dengan BAIK DAN LULUS seluruh rangkaian Ujian Praktek & Teori pada Program Pelatihan:`,
    148.5,
    120,
    { align: 'center' }
  );

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(classProgram.toUpperCase(), 148.5, 130, { align: 'center' });

  if (bnspNumber) {
    doc.setTextColor(148, 163, 184);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Sertifikasi Kompetensi Terdaftar BNSP: ${bnspNumber}`, 148.5, 138, { align: 'center' });
  }

  // Signatures Row
  doc.setTextColor(203, 213, 225);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Jambi, ${issueDate}`, 215, 155, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.text('Head Master Instructor', 65, 162, { align: 'center' });
  doc.text('Direktur LPK SM Flasher', 215, 162, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(245, 158, 11);
  doc.text('Master Syahrul Flasher', 65, 182, { align: 'center' });
  doc.text('Pimpinan LPK SM Flasher', 215, 182, { align: 'center' });

  doc.save(`Sertifikat_${studentName.replace(/\s+/g, '_')}_${certNumber}.pdf`);
}

