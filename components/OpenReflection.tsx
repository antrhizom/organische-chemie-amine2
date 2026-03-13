'use client';

import { useState } from 'react';
import { OpenReflectionData, ExerciseResult } from '@/lib/types';

interface Props {
  exercise: OpenReflectionData;
  onResult: (result: ExerciseResult) => void;
}

export default function OpenReflection({ exercise, onResult }: Props) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (answer.trim().length < 20 || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: exercise.question,
          answer: answer.trim(),
          aiContext: exercise.aiContext,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setFeedback(data.feedback);
      setScore(data.score);

      onResult({
        exerciseId: exercise.id,
        exerciseType: 'open-reflection',
        correct: data.score >= 7,
        score: data.score / 10,
        maxScore: 1,
        kLevel: 5,
      });
    } catch (err) {
      setFeedback(`Fehler: ${err instanceof Error ? err.message : 'Unbekannt'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-1">{exercise.question}</h3>
      {exercise.hint && (
        <p className="text-xs text-gray-400 mb-3 italic">💡 {exercise.hint}</p>
      )}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Schreibe deine Antwort hier... (mind. 20 Zeichen)"
        rows={5}
        disabled={feedback !== null}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:bg-gray-50 mb-4"
      />

      {!feedback ? (
        <button
          onClick={handleSubmit}
          disabled={answer.trim().length < 20 || loading}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              KI bewertet...
            </span>
          ) : (
            'Antwort einreichen'
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
