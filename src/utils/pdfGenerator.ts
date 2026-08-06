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
