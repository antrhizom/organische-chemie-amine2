'use client';

import { useState } from 'react';
import { ComparisonDuelData, ExerciseResult } from '@/lib/types';

interface Props {
  duel: ComparisonDuelData;
  index: number;
  onResult: (result: ExerciseResult) => void;
}

export default function ComparisonDuel({ duel, index, onResult }: Props) {
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selected === duel.correctAnswer;

  const handleSelect = (choice: 'A' | 'B') => {
    if (submitted) return;
    setSelected(choice);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);
    onResult({
      exerciseId: duel.id,
      exerciseType: 'comparison-duel',
      correct: selected === duel.correctAnswer,
      score: selected === duel.correctAnswer ? 1 : 0,
      maxScore: 1,
      kLevel: 2,
    });
  };

  const getCardClass = (side: 'A' | 'B') => {
    const base = 'flex-1 p-5 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer';
    if (!submitted) {
      if (selected === side) {
        return `${base} border-indigo-500 bg-indigo-50 shadow-md`;
      }
      return `${base} border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm`;
    }
    // After submission
    if (side === duel.correctAnswer) {
      return `${base} border-green-500 bg-green-50`;
    }
    if (selected === side && side !== duel.correctAnswer) {
      return `${base} border-red-400 bg-red-50`;
    }
    return `${base} border-gray-200 bg-gray-50 opacity-60`;
  };

  const compound = (side: 'A' | 'B') => (side === 'A' ? duel.compoundA : duel.compoundB);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-gray-400">Duell {index + 1}</span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs text-indigo-600 font-medium">Welche Verbindung ist {duel.property}?</span>
      </div>

      <div className="flex gap-3 mb-4">
        {(['A', 'B'] as const).map((side) => (
          <div
            key={side}
            className={getCardClass(side)}
            onClick={() => handleSelect(side)}
          >
            <p className="font-bold text-lg text-gray-900">{compound(side).name}</p>
            {compound(side).formula && (
              <p className="text-sm text-gray-500 chem-formula mt-1">{compound(side).formula}</p>
            )}
            {submitted && side === duel.correctAnswer && (
              <span className="inline-block mt-2 text-green-600 text-lg">✓</span>
            )}
            {submitted && selected === side && side !== duel.correctAnswer && (
              <span className="inline-block mt-2 text-red-500 text-lg">✗</span>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Prüfen
        </button>
      ) : (
        <div className={`rounded-lg p-3 text-sm ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <p className="font-medium mb-1">{isCorrect ? '✅ Richtig!' : '❌ Nicht ganz.'}</p>
          <p className="text-gray-700">{duel.explanation}</p>
        </div>
      )}
    </div>
  );
}
