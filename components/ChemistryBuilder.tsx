'use client';

import { useState } from 'react';
import { ChemistryBuilderData, ExerciseResult } from '@/lib/types';

interface Props {
  builder: ChemistryBuilderData;
  onResult: (result: ExerciseResult) => void;
}

export default function ChemistryBuilder({ builder, onResult }: Props) {
  const [selections, setSelections] = useState<Record<string, string | null>>(
    Object.fromEntries(builder.slots.map((s) => [s.id, null]))
  );
  const [activeSlot, setActiveSlot] = useState<string | null>(builder.slots[0]?.id ?? null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (submitted || !activeSlot) return;
    setSelections((prev) => ({ ...prev, [activeSlot]: optionId }));
    // Move to next unfilled slot
    const nextSlot = builder.slots.find(
      (s) => s.id !== activeSlot && !selections[s.id]
    );
    if (nextSlot) setActiveSlot(nextSlot.id);
  };

  const handleSlotClick = (slotId: string) => {
    if (submitted) return;
    setActiveSlot(slotId);
  };

  const handleSubmit = () => {
    const allFilled = builder.slots.every((s) => selections[s.id] !== null);
    if (!allFilled || submitted) return;

    const allCorrect = builder.slots.every(
      (s) => selections[s.id] === s.correctAnswer
    );

    setSubmitted(true);
    onResult({
      exerciseId: builder.id,
      exerciseType: 'chemistry-builder',
      correct: allCorrect,
      score: allCorrect ? 1 : 0,
      maxScore: 1,
      kLevel: 3,
    });
  };

  const handleReset = () => {
    if (submitted) return;
    setSelections(Object.fromEntries(builder.slots.map((s) => [s.id, null])));
    setActiveSlot(builder.slots[0]?.id ?? null);
  };

  const getOptionLabel = (optionId: string) => {
    return builder.options.find((o) => o.id === optionId)?.symbol ?? '?';
  };

  const isSlotCorrect = (slotId: string) => {
    const slot = builder.slots.find((s) => s.id === slotId);
    return slot ? selections[slotId] === slot.correctAnswer : false;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-1">{builder.instruction}</h3>
      <p className="text-xs text-gray-400 mb-4">Wähle die richtige chemische Gruppe für jede Lücke</p>

      {/* Molecule display with slots */}
      <div className="bg-gray-50 rounded-xl p-6 mb-4 border border-gray-100">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Render the molecule base text with slot buttons inline */}
          <span className="text-lg font-mono text-gray-700">{builder.moleculeBase.split('?')[0]}</span>
          {builder.slots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleSlotClick(slot.id)}
              className={`inline-flex items-center justify-center min-w-[80px] h-12 px-4 rounded-lg border-2 border-dashed font-mono text-lg font-bold transition-all duration-200 ${
                submitted
                  ? isSlotCorrect(slot.id)
                    ? 'border-green-400 bg-green-100 text-green-800'
                    : 'border-red-400 bg-red-100 text-red-800'
                  : activeSlot === slot.id
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-md'
                  : selections[slot.id]
                  ? 'border-gray-400 bg-white text-gray-900'
                  : 'border-gray-300 bg-white text-gray-400'
              }`}
            >
              {selections[slot.id] ? getOptionLabel(selections[slot.id]!) : (slot.label || '?')}
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      {!submitted && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {builder.options.map((option) => {
            const isSelected = Object.values(selections).includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-300 bg-indigo-50 opacity-60'
                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <span className="font-mono font-bold text-gray-900">{option.symbol}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{option.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Actions */}
      {!submitted ? (
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Zurücksetzen
          </button>
          <button
            onClick={handleSubmit}
            disabled={!builder.slots.every((s) => selections[s.id] !== null)}
            className="flex-1 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Prüfen
          </button>
        </div>
      ) : (
        <div className={`rounded-lg p-3 text-sm ${
          builder.slots.every((s) => isSlotCorrect(s.id))
            ? 'bg-green-50 border border-green-200'
            : 'bg-amber-50 border border-amber-200'
        }`}>
          <p className="font-medium mb-1">
            {builder.slots.every((s) => isSlotCorrect(s.id))
              ? '✅ Richtig!'
              : '❌ Nicht ganz.'}
          </p>
          <p className="text-gray-700">{builder.explanation}</p>
          {!builder.slots.every((s) => isSlotCorrect(s.id)) && (
            <p className="text-xs text-gray-500 mt-2">
              Richtig: {builder.slots.map((s) => getOptionLabel(s.correctAnswer)).join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
