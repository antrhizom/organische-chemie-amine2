'use client';

import { useState, useCallback } from 'react';
import { SynthesisOrderData, ExerciseResult } from '@/lib/types';

interface Props {
  synthesis: SynthesisOrderData;
  onResult: (result: ExerciseResult) => void;
}

export default function SynthesisOrder({ synthesis, onResult }: Props) {
  const [steps, setSteps] = useState(() => {
    const shuffled = [...synthesis.steps];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [touchSelected, setTouchSelected] = useState<number | null>(null);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback(
    (dropIndex: number) => {
      if (dragIndex === null || dragIndex === dropIndex) {
        setDragIndex(null);
        setDragOverIndex(null);
        return;
      }
      const newSteps = [...steps];
      const [removed] = newSteps.splice(dragIndex, 1);
      newSteps.splice(dropIndex, 0, removed);
      setSteps(newSteps);
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, steps]
  );

  const handleTap = (index: number) => {
    if (submitted) return;
    if (touchSelected === null) {
      setTouchSelected(index);
    } else {
      if (touchSelected !== index) {
        const newSteps = [...steps];
        const [removed] = newSteps.splice(touchSelected, 1);
        newSteps.splice(index, 0, removed);
        setSteps(newSteps);
      }
      setTouchSelected(null);
    }
  };

  const handleSubmit = () => {
    const currentOrder = steps.map((s) => s.id);
    let correct = 0;
    for (let i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i] === synthesis.correctOrder[i]) {
        correct++;
      }
    }
    setCorrectCount(correct);
    setSubmitted(true);
    onResult({
      exerciseId: synthesis.id,
      exerciseType: 'synthesis-order',
      correct: correct === synthesis.correctOrder.length,
      score: correct === synthesis.correctOrder.length ? 1 : correct / synthesis.correctOrder.length,
      maxScore: 1,
      kLevel: 4,
    });
  };

  const isStepCorrect = (index: number) => {
    return steps[index].id === synthesis.correctOrder[index];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🧬</span>
        <h3 className="font-semibold text-gray-900">{synthesis.synthesisName}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-1">{synthesis.instruction}</p>
      <p className="text-xs text-gray-400 mb-4">
        Ziehe die Schritte in die richtige Reihenfolge (oder tippe zum Auswählen und Platzieren)
      </p>

      <div className="space-y-2 mb-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            draggable={!submitted}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
            onClick={() => handleTap(index)}
            className={`drag-item flex items-start gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              submitted
                ? isStepCorrect(index)
                  ? 'border-green-400 bg-green-50'
                  : 'border-red-300 bg-red-50'
                : touchSelected === index
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : dragOverIndex === index
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 cursor-grab active:cursor-grabbing'
            }`}
          >
            <span className="text-gray-400 text-sm font-mono w-6 pt-0.5">{index + 1}.</span>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-gray-900 text-sm">{step.label}</span>
              {step.description && (
                <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
              )}
            </div>
            {!submitted && (
              <svg className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
            {submitted && (
              <span className={`shrink-0 mt-0.5 ${isStepCorrect(index) ? 'text-green-600' : 'text-red-500'}`}>
                {isStepCorrect(index) ? '✓' : '✗'}
              </span>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Reihenfolge prüfen
        </button>
      ) : (
        <div>
          <div className={`rounded-lg p-3 text-sm mb-3 ${
            correctCount === synthesis.correctOrder.length
              ? 'bg-green-50 border border-green-200'
              : 'bg-amber-50 border border-amber-200'
          }`}>
            <p className="font-medium mb-1">
              {correctCount === synthesis.correctOrder.length
                ? '✅ Perfekt! Alle Schritte richtig!'
                : `${correctCount}/${synthesis.correctOrder.length} Schritte richtig.`}
            </p>
            <p className="text-gray-700">{synthesis.explanation}</p>
          </div>
          {correctCount < synthesis.correctOrder.length && (
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Richtige Reihenfolge:</p>
              {synthesis.correctOrder.map((id, i) => {
                const step = synthesis.steps.find((s) => s.id === id);
                return (
                  <p key={id} className="ml-2">
                    {i + 1}. {step?.label}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
