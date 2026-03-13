'use client';

import { useState, useRef, useCallback } from 'react';
import FreehandCanvas, { Stroke } from './FreehandCanvas';
import { DrawingExerciseData, ExerciseResult } from '@/lib/types';

interface Props {
  exercise: DrawingExerciseData;
  onResult: (result: ExerciseResult) => void;
}

const COLORS = ['#1e293b', '#dc2626', '#2563eb', '#16a34a'];
const SIZES = [2, 4, 6];

export default function DrawingExercise({ exercise, onResult }: Props) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [strokeHistory, setStrokeHistory] = useState<Stroke[][]>([]);
  const [penColor, setPenColor] = useState(COLORS[0]);
  const [penSize, setPenSize] = useState(SIZES[1]);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const handleStrokesChange = useCallback(
    (newStrokes: Stroke[]) => {
      setStrokeHistory((prev) => [...prev.slice(-30), [...strokes]]);
      setStrokes(newStrokes);
    },
    [strokes]
  );

  const handleUndo = () => {
    if (strokeHistory.length === 0) return;
    const prev = strokeHistory[strokeHistory.length - 1];
    setStrokeHistory((h) => h.slice(0, -1));
    setStrokes(prev);
  };

  const handleClear = () => {
    setStrokeHistory((prev) => [...prev, [...strokes]]);
    setStrokes([]);
  };

  const handleSubmit = async () => {
    if (strokes.length === 0 || loading) return;
    setLoading(true);

    try {
      // Get canvas image
      const container = canvasContainerRef.current;
      const canvas = container?.querySelector('canvas');
      if (!canvas) throw new Error('Canvas nicht gefunden');

      const image = canvas.toDataURL('image/png');

      const res = await fetch('/api/analyze-drawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image,
          instruction: exercise.instruction,
          aiContext: exercise.aiContext,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setFeedback(data.feedback);
      setScore(data.score);

      onResult({
        exerciseId: exercise.id,
        exerciseType: 'drawing',
        correct: data.score >= 7,
        score: data.score / 10,
        maxScore: 1,
        kLevel: 6,
      });
    } catch (err) {
      setFeedback(`Fehler: ${err instanceof Error ? err.message : 'Unbekannt'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-1">{exercise.instruction}</h3>
      {exercise.hint && (
        <p className="text-xs text-gray-400 mb-3 italic">💡 {exercise.hint}</p>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <div className="flex gap-1">
          <button
            onClick={() => setTool('pen')}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              tool === 'pen' ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✏️ Stift
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              tool === 'eraser' ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            🧹 Radierer
          </button>
        </div>

        <div className="flex gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => { setPenColor(c); setTool('pen'); }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                penColor === c && tool === 'pen' ? 'border-indigo-500 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setPenSize(s)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg border text-xs ${
                penSize === s ? 'bg-indigo-100 border-indigo-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="rounded-full bg-gray-800" style={{ width: s + 2, height: s + 2 }} />
            </button>
          ))}
        </div>

        <div className="flex gap-1 ml-auto">
          <button onClick={handleUndo} className="px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            ↩️
          </button>
          <button onClick={handleClear} className="px-2 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100">
            🗑️
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasContainerRef}
        className="w-full border border-gray-200 rounded-xl overflow-hidden mb-4"
        style={{ height: 320 }}
      >
        <FreehandCanvas
          penColor={penColor}
          penSize={penSize}
          tool={tool}
          strokes={strokes}
          onStrokesChange={handleStrokesChange}
        />
      </div>

      {/* Submit or feedback */}
      {!feedback ? (
        <button
          onClick={handleSubmit}
          disabled={strokes.length === 0 || loading}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              KI analysiert...
            </span>
          ) : (
            'Zeichnung auswerten lassen'
          )}
        </button>
      ) : (
        <div className="space-y-3">
          {score !== null && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Score:</span>
              <span
                className="text-lg font-bold"
                style={{ color: score >= 7 ? '#16a34a' : score >= 4 ? '#eab308' : '#ef4444' }}
              >
                {score}/10
              </span>
            </div>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-wrap">
            {feedback}
          </div>
        </div>
      )}
    </div>
  );
}
