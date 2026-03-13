'use client';

import { ExerciseResult } from '@/lib/types';
import { calculateScore, getPerformanceLabel } from '@/lib/progress';

interface Props {
  studentName: string;
  results: ExerciseResult[];
}

const K_LABELS: Record<number, string> = {
  1: 'K1 Erinnern',
  2: 'K2 Verstehen',
  3: 'K3 Anwenden',
  4: 'K4 Analysieren',
  5: 'K5 Bewerten',
  6: 'K6 Erschaffen',
};

export async function generateCertificatePDF(studentName: string, results: ExerciseResult[]) {
  const { default: jsPDF } = await import('jspdf');
  const { percentage, byKLevel } = calculateScore(results);
  const label = getPerformanceLabel(percentage);
  const date = new Date().toLocaleDateString('de-CH', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, w, h, 'F');

  // Border
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(1.5);
  doc.rect(10, 10, w - 20, h - 20);
  doc.setDrawColor(167, 139, 250);
  doc.setLineWidth(0.5);
  doc.rect(13, 13, w - 26, h - 26);

  // Header
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text('BBW Berufsbildungsschule Winterthur', w / 2, 28, { align: 'center' });
  doc.setFontSize(10);
  doc.text('Laboranten Fachrichtung Chemie', w / 2, 34, { align: 'center' });

  // Title
  doc.setFontSize(28);
  doc.setTextColor(30, 41, 59);
  doc.text('Lernzertifikat', w / 2, 52, { align: 'center' });

  // Subtitle
  doc.setFontSize(14);
  doc.setTextColor(99, 102, 241);
  doc.text('Organische Chemie -- Basizität von Aminen', w / 2, 62, { align: 'center' });

  // Name
  doc.setFontSize(20);
  doc.setTextColor(30, 41, 59);
  doc.text(studentName, w / 2, 82, { align: 'center' });

  // Line under name
  const nameWidth = doc.getTextWidth(studentName);
  doc.setDrawColor(99, 102, 241);
  doc.setLineWidth(0.5);
  doc.line(w / 2 - nameWidth / 2 - 10, 85, w / 2 + nameWidth / 2 + 10, 85);

  // Score
  doc.setFontSize(16);
  doc.setTextColor(30, 41, 59);
  doc.text(`Gesamtergebnis: ${percentage}% -- ${label}`, w / 2, 98, { align: 'center' });

  // K-Level table
  let tableY = 110;
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('Kompetenzstufe', 50, tableY);
  doc.text('Ergebnis', 180, tableY);
  tableY += 2;
  doc.setDrawColor(203, 213, 225);
  doc.line(50, tableY, 240, tableY);
  tableY += 6;

  doc.setTextColor(30, 41, 59);
  const sortedLevels = Object.entries(byKLevel).sort(([a], [b]) => Number(a) - Number(b));
  for (const [level, data] of sortedLevels) {
    const kLabel = K_LABELS[Number(level)] || `K${level}`;
    const result = `${data.correct} / ${data.total} richtig`;
    doc.text(kLabel, 50, tableY);
    doc.text(result, 180, tableY);
    tableY += 7;
  }

  // Date
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(`Datum: ${date}`, w / 2, h - 28, { align: 'center' });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Dieses Zertifikat wurde automatisch generiert.', w / 2, h - 20, { align: 'center' });

  doc.save(`Zertifikat_Amine_${studentName.replace(/\s/g, '_')}.pdf`);
}

// This component is not rendered visually -- it just exports the function.
export default function Certificate(_props: Props) {
  return null;
}
