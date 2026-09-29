import { jsPDF } from 'jspdf';
import { PhotoItem, ActivityLogItem } from '../types';

export const exportFavoritesPDF = (favorites: PhotoItem[], userName: string = 'Festival Explorer') => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner - Marigold and Crimson aesthetic
  doc.setFillColor(153, 27, 27); // Deep Red #991B1B
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFillColor(217, 119, 6); // Marigold amber accent bar
  doc.rect(0, 28, pageWidth, 3, 'F');

  // Title Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('BADA DASHAIN FESTIVAL HERITAGE REPORT', margin, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Curated Community Favorites & Cultural Records Archive · Vijaya Dashami', margin, 21);

  // Metadata Strip
  let y = 40;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('REPORT DETAILS', margin, y);
  doc.setDrawColor(217, 119, 6);
  doc.line(margin, y + 2, margin + contentWidth, y + 2);

  y += 8;
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`Generated: ${dateStr}`, margin, y);
  doc.text(`Curator: ${userName}`, margin + 80, y);
  doc.text(`Total Selected Items: ${favorites.length}`, margin + 140, y);

  y += 12;

  if (favorites.length === 0) {
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(11);
    doc.text('No favorite photos currently selected. Click the heart icon on any memory to include it here.', margin, y + 10);
  } else {
    favorites.forEach((item, index) => {
      // Check if page overflow
      if (y + 45 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      // Card container outline
      doc.setDrawColor(229, 231, 235);
      doc.setFillColor(254, 252, 248);
      doc.roundedRect(margin, y, contentWidth, 38, 3, 3, 'FD');

      // Left Accent Strip
      doc.setFillColor(217, 119, 6);
      doc.rect(margin, y, 4, 38, 'F');

      // Item Title
      doc.setTextColor(28, 25, 23);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`${index + 1}. ${item.title}`, margin + 8, y + 8);

      // Metadata line
      doc.setTextColor(115, 115, 115);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const metaLine = `Location: ${item.location}  ·  Contributor: ${item.author}  ·  Date: ${item.date}  ·  Category: ${item.category.toUpperCase()}`;
      doc.text(metaLine, margin + 8, y + 15);

      // Caption
      doc.setTextColor(68, 64, 60);
      doc.setFontSize(9);
      const cleanCaption = item.caption.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      const splitCaption = doc.splitTextToSize(cleanCaption, contentWidth - 14);
      doc.text(splitCaption, margin + 8, y + 23);

      // Engagement & Privacy Tag
      doc.setTextColor(180, 83, 9);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(`Likes: ${item.likes}   Views: ${item.views}   Access: ${item.privacy.toUpperCase()}`, margin + 8, y + 33);

      y += 44;
    });
  }

  // Footer
  const totalPages = doc.internal.pages.length - 1;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.setFont('helvetica', 'normal');
    doc.text('Bada Dashain Festival Cultural Hub · Preserving Heritage & Living Traditions', margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 7);
  }

  doc.save(`Dashain_Favorites_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
};

export const exportActivityLogPDF = (logs: ActivityLogItem[]) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner
  doc.setFillColor(153, 27, 27);
  doc.rect(0, 0, pageWidth, 26, 'F');
  doc.setFillColor(217, 119, 6);
  doc.rect(0, 26, pageWidth, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SYSTEM ACTIVITY LOG & HISTORICAL AUDIT', margin, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Real-time interaction telemetry, access control and workflow management archive', margin, 20);

  let y = 38;
  doc.setTextColor(70, 70, 70);
  doc.setFontSize(8.5);
  doc.text(`Export Timestamp: ${new Date().toLocaleString()}`, margin, y);
  doc.text(`Total Records: ${logs.length}`, margin + 120, y);

  y += 8;
  doc.setDrawColor(180, 83, 9);
  doc.line(margin, y, margin + contentWidth, y);
  y += 6;

  logs.forEach((log) => {
    if (y + 18 > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(28, 25, 23);
    doc.text(`[${log.timestamp}] ${log.action}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Category: ${log.category.toUpperCase()} · Status: ${log.status.toUpperCase()} · Device: ${log.device || 'N/A'}`, margin, y + 4.5);

    doc.setTextColor(60, 60, 60);
    const splitDetails = doc.splitTextToSize(log.details, contentWidth);
    doc.text(splitDetails, margin, y + 9);

    y += 15;
  });

  doc.save(`Dashain_Activity_Audit_${new Date().toISOString().slice(0, 10)}.pdf`);
};
