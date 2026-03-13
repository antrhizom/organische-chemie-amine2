'use client';

import { useState } from 'react';
import { TrueFalseQuizData, ExerciseResult } from '@/lib/types';

interface Props {
  quiz: TrueFalseQuizData;
  onResult: (result: ExerciseResult) => void;
}

export default function TrueFalseQuiz({ quiz, onResult }: Props) {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(() => {
    const init: Record<string, boolean | null> = {};
    quiz.statements.forEach((s) => (init[s.id] = null));
    return init;
  });
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = quiz.statements.every((s) => answers[s.id] !== null);

  const handleAnswer = (id: string, value: boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (!allAnswered || submitted) return;
    setSubmitted(true);

    const correctCount = quiz.statements.filter(
      (s) => answers[s.id] === s.isTrue
    ).length;
    const total = quiz.statements.length;

    onResult({
      exerciseId: quiz.id,
      exerciseType: 'true-false',
      correct: correctCount === total,
      score: correctCount / total,
      maxScore: 1,
      kLevel: 2,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-700 mb-4 font-medium">{quiz.instruction}</p>

      <div className="space-y-3">
        {quiz.statements.map((s) => {
          const answer = answers[s.id];
          const isCorrect = submitted ? answer === s.isTrue : null;

          return (
            <div
              key={s.id}
              className={`rounded-lg border p-4 transition-colors ${
                submitted
                  ? isCorrect
                    ? 'border-green-300 bg-green-50'
                    : 'border-red-300 bg-red-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <p className="text-sm text-gray-900 mb-3">{s.statement}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAnswer(s.id, true)}
                  disabled={submitted}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                    answer === true
                      ? submitted
                        ? s.isTrue
                          ? 'border-green-500 bg-green-100 text-green-700'
                          : 'border-red-400 bg-red-100 text-red-700'
                        : 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  } disabled:cursor-default`}
                >
                  Richtig
                </button>
                <button
                  onClick={() => handleAnswer(s.id, false)}
                  disabled={submitted}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                    answer === false
                      ? submitted
                        ? !s.isTrue
                          ? 'border-green-500 bg-green-100 text-green-700'
                          : 'border-red-400 bg-red-100 text-red-700'
                        : 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  } disabled:cursor-default`}
                >
                  Falsch
                </button>
              </div>

              {submitted && (
                <div className={`mt-3 text-xs ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  <span className="font-medium">{isCorrect ? '✅ Korrekt' : '❌ Falsch'}</span>
                  <span className="text-gray-600"> — {s.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full mt-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Prüfen
        </button>
      )}

      {submitted && (
        <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-800">
          <span className="font-medium">
            {quiz.statements.filter((s) => answers[s.id] === s.isTrue).length} von {quiz.statements.length} korrekt
          </span>
        </div>
      )}
    </div>
  );
}
