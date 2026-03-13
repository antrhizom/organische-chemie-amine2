'use client';

import { ExerciseResult } from '@/lib/types';

interface PersistedData {
  currentPhase: string;
  results: ExerciseResult[];
  timerRemainingMs: number;
  savedAt: string;
}

interface Props {
  persisted: PersistedData;
  onResume: () => void;
  onRestart: () => void;
}

const PHASE_NAMES: Record<string, string> = {
  reveal: 'Aufdeckkarten',
  truefalse: 'Richtig/Falsch',
  duels: 'Vergleichs-Duelle',
  builders: 'Formel-Baukasten',
  sort: 'Sortier-Challenge',
  synthesis: 'Synthese-Reihenfolge',
  drawing: 'Zeichenaufgabe',
  casestudy: 'Fallbeispiel',
  reflection: 'Offene Reflexion',
  summary: 'Zusammenfassung',
};

export default function ResumeDialog({ persisted, onResume, onRestart }: Props) {
  const savedDate = new Date(persisted.savedAt);
  const timeAgo = getTimeAgo(savedDate);
  const phaseName = PHASE_NAMES[persisted.currentPhase] || persisted.currentPhase;
  const remainingMin = Math.ceil(persisted.timerRemainingMs / 60000);
  const completedCount = persisted.results.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="text-center mb-5">
          <span className="text-3xl mb-2 block">📚</span>
          <h2 className="text-xl font-bold text-gray-900">Lernstand gefunden</h2>
          <p className="text-sm text-gray-500 mt-1">Du hast eine laufende Session von {timeAgo}.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Aktueller Abschnitt</span>
            <span className="font-medium text-gray-900">{phaseName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Aufgaben gelöst</span>
            <span className="font-medium text-gray-900">{completedCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Verbleibende Zeit</span>
            <span className="font-medium text-gray-900">ca. {remainingMin} Min</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Neu starten
          </button>
          <button
            onClick={onResume}
            className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Fortsetzen
          </button>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'gerade eben';
  if (diffMin < 60) return `vor ${diffMin} Min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `vor ${diffH} Std`;
  return `vor ${Math.floor(diffH / 24)} Tagen`;
}
