'use client';

import { useState, useCallback } from 'react';
import { SortChallengeData, ExerciseResult } from '@/lib/types';

interface Props {
  challenge: SortChallengeData;
  onResult: (result: ExerciseResult) => void;
}

export default function SortChallenge({ challenge, onResult }: Props) {
  // Shuffle initial order
  const [items, setItems] = useState(() => {
    const shuffled = [...challenge.items];
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
      const newItems = [...items];
      const [removed] = newItems.splice(dragIndex, 1);
      newItems.splice(dropIndex, 0, removed);
      setItems(newItems);
      setDragIndex(null);
      setDragOverIndex(null);
    },
    [dragIndex, items]
  );

  // Touch-based reorder: tap to select, tap to place
  const [touchSelected, setTouchSelected] = useState<number | null>(null);

  const handleTap = (index: number) => {
    if (submitted) return;
    if (touchSelected === null) {
      setTouchSelected(index);
    } else {
      if (touchSelected !== index) {
        const newItems = [...items];
        const [removed] = newItems.splice(touchSelected, 1);
        newItems.splice(index, 0, removed);
        setItems(newItems);
      }
      setTouchSelected(null);
    }
  };

  const handleSubmit = () => {
    const currentOrder = items.map((item) => item.id);
    let correct = 0;
    for (let i = 0; i < currentOrder.length; i++) {
      if (currentOrder[i] === challenge.correctOrder[i]) {
        correct++;
      }
    }
    setCorrectCount(correct);
    setSubmitted(true);
    onResult({
      exerciseId: challenge.id,
      exerciseType: 'sort-challenge',
      correct: correct === challenge.correctOrder.length,
      score: correct === challenge.correctOrder.length ? 1 : correct / challenge.correctOrder.length,
      maxScore: 1,
      kLevel: 4,
    });
  };

  const isItemCorrect = (index: number) => {
    return items[index].id === challenge.correctOrder[index];
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-1">{challenge.instruction}</h3>
      <p className="text-xs text-gray-400 mb-4">
        {challenge.orderLabel} · Ziehe die Karten in die richtige Reihenfolge (oder tippe zum Auswählen und Platzieren)
      </p>

      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable={!submitted}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={() => handleDrop(index)}
            onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
            onClick={() => handleTap(index)}
            className={`drag-item flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
              submitted
                ? isItemCorrect(index)
                  ? 'border-green-400 bg-green-50'
                  : 'border-red-300 bg-red-50'
                : touchSelected === index
                ? 'border-indigo-500 bg-indigo-50 shadow-md'
                : dragOverIndex === index
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 cursor-grab active:cursor-grabbing'
            }`}
          >
            <span className="text-gray-400 text-sm font-mono w-6">{index + 1}.</span>
            <div className="flex-1">
              <span className="font-medium text-gray-900">{item.label}</span>
              {item.formula && (
                <span className="ml-2 text-sm text-gray-500 chem-formula">{item.formula}</span>
              )}
            </div>
            {!submitted && (
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            )}
            {submitted && (
              <span className={isItemCorrect(index) ? 'text-green-600' : 'text-red-500'}>
                {isItemCorrect(index) ? '✓' : '✗'}
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
            correctCount === challenge.correctOrder.length
              ? 'bg-green-50 border border-green-200'
              : 'bg-amber-50 border border-amber-200'
          }`}>
            <p className="font-medium mb-1">
              {correctCount === challenge.correctOrder.length
                ? '✅ Perfekt! Alle richtig!'
                : `${correctCount}/${challenge.correctOrder.length} richtig.`}
            </p>
            <p className="text-gray-700">{challenge.explanation}</p>
          </div>
          {correctCount < challenge.correctOrder.length && (
            <p className="text-xs text-gray-500">
              Richtige Reihenfolge: {challenge.correctOrder.map((id) => {
                const item = challenge.items.find((i) => i.id === id);
                return item?.label;
              }).join(' → ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
