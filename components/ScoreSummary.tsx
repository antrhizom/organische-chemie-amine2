'use client';

import { ExerciseResult } from '@/lib/types';
import { calculateScore, getPerformanceLabel, getPerformanceColor } from '@/lib/progress';

interface Props {
  results: ExerciseResult[];
  studentName: string;
  onDownloadCertificate: () => void;
}

const K_LABELS: Record<number, string> = {
  1: 'K1 Erinnern',
  2: 'K2 Verstehen',
  3: 'K3 Anwenden',
  4: 'K4 Analysieren',
  5: 'K5 Bewerten',
  6: 'K6 Erschaffen',
};

const EXERCISE_TYPE_LABELS: Record<string, string> = {
  'comparison-duel': 'Vergleichs-Duell',
  'chemistry-builder': 'Formel-Baukasten',
  'sort-challenge': 'Sortier-Challenge',
  'synthesis-order': 'Synthese-Reihenfolge',
  'drawing': 'Zeichenaufgabe',
  'case-study': 'Fallbeispiel',
  'open-reflection': 'Offene Reflexion',
  'true-false': 'Richtig/Falsch',
};

export default function ScoreSummary({ results, studentName, onDownloadCertificate }: Props) {
  const { percentage, byKLevel } = calculateScore(results);
  const label = getPerformanceLabel(percentage);
  const color = getPerformanceColor(percentage);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Geschafft, {studentName}!</h2>
        <p className="text-gray-500">Hier ist deine Zusammenfassung</p>
      </div>

      {/* Score circle */}
      <div className="flex justify-center mb-6">
        <div
          className="w-28 h-28 rounded-full flex flex-col items-center justify-center border-4"
          style={{ borderColor: color }}
        >
          <span className="text-3xl font-bold" style={{ color }}>{percentage}%</span>
          <span className="text-xs font-medium text-gray-500">{label}</span>
        </div>
      </div>

      {/* K-Level breakdown */}
      <div className="space-y-2 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Ergebnisse nach Kompetenzstufe</h3>
        {Object.entries(byKLevel)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([level, data]) => (
            <div key={level} className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500 w-28">{K_LABELS[Number(level)] || `K${level}`}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${data.total > 0 ? (data.correct / data.total) * 100 : 0}%`,
                    backgroundColor: data.correct === data.total ? '#16a34a' : data.correct > 0 ? '#eab308' : '#ef4444',
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 w-12 text-right">{data.correct}/{data.total}</span>
            </div>
          ))}
      </div>

      {/* Individual results */}
      <div className="space-y-1.5 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Einzelne Aufgaben</h3>
        {results.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className={r.correct ? 'text-green-600' : 'text-red-500'}>
              {r.correct ? '✓' : '✗'}
            </span>
            <span className="text-gray-600 flex-1">
              {EXERCISE_TYPE_LABELS[r.exerciseType] || r.exerciseType}
            </span>
            <span className="text-gray-400">{K_LABELS[r.kLevel]?.split(' ')[0]}</span>
            <span className="font-mono text-gray-500">{Math.round(r.score * 100)}%</span>
          </div>
        ))}
      </div>

      {/* Download certificate */}
      <button
        onClick={onDownloadCertificate}
        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
      >
        📜 Zertifikat herunterladen (PDF)
      </button>
    </div>
  );
}
