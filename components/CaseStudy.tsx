'use client';

import { useState } from 'react';
import { CaseStudyData, ExerciseResult } from '@/lib/types';

interface Props {
  caseStudy: CaseStudyData;
  onResult: (result: ExerciseResult) => void;
}

interface QuestionFeedback {
  feedback: string;
  score: number;
}

export default function CaseStudy({ caseStudy, onResult }: Props) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = reading scenario
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, QuestionFeedback>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scenarioExpanded, setScenarioExpanded] = useState(true);
  const [finished, setFinished] = useState(false);

  const questions = caseStudy.questions;
  const currentQuestion = currentStep > 0 ? questions[currentStep - 1] : null;
  const isLastQuestion = currentStep === questions.length;

  const handleSubmitAnswer = async () => {
    if (!currentQuestion) return;
    const answer = answers[currentQuestion.id]?.trim();
    if (!answer || answer.length < 10) {
      setError('Bitte schreibe eine ausführlichere Antwort (mind. 10 Zeichen).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/case-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: caseStudy.scenario,
          questionPrompt: currentQuestion.prompt,
          answer,
          aiContext: caseStudy.aiContext,
          expectedTopics: currentQuestion.expectedTopics,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Fehler bei der Bewertung');
      }

      const data = await res.json();
      setFeedbacks((prev) => ({
        ...prev,
        [currentQuestion.id]: { feedback: data.feedback, score: data.score },
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
      setScenarioExpanded(false);
      setError('');
    }
  };

  const handleFinish = () => {
    // Calculate average score across all questions
    const scores = Object.values(feedbacks).map((f) => f.score);
    const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 5;
    const normalizedScore = avgScore / 10; // 0-1

    setFinished(true);
    onResult({
      exerciseId: caseStudy.id,
      exerciseType: 'case-study',
      correct: avgScore >= 6,
      score: normalizedScore,
      maxScore: 1,
      kLevel: 5,
    });
  };

  const hasFeedback = currentQuestion ? !!feedbacks[currentQuestion.id] : false;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 text-lg">{caseStudy.title}</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Fallbeispiel · {questions.length} Analysefragen · KI bewertet nach Umfang und Tiefe
        </p>
      </div>

      <div className="p-6">
        {/* Scenario panel */}
        <div className="mb-5">
          <button
            onClick={() => setScenarioExpanded(!scenarioExpanded)}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${scenarioExpanded ? 'rotate-90' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Fallbeschreibung {scenarioExpanded ? 'ausblenden' : 'anzeigen'}
          </button>
          {scenarioExpanded && (
            <div className="mt-2 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-line border border-gray-100">
              {caseStudy.scenario}
            </div>
          )}
        </div>

        {/* Step 0: Read scenario and start */}
        {currentStep === 0 && (
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Lies die Fallbeschreibung aufmerksam durch. Anschliessend beantwortest du {questions.length} Analysefragen.
            </p>
            <button
              onClick={() => { setCurrentStep(1); setScenarioExpanded(false); }}
              className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Zur ersten Frage →
            </button>
          </div>
        )}

        {/* Question steps */}
        {currentStep > 0 && currentQuestion && !finished && (
          <div>
            {/* Progress */}
            <div className="flex items-center gap-2 mb-4">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < currentStep - 1
                      ? 'bg-green-400'
                      : i === currentStep - 1
                      ? 'bg-indigo-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <div className="mb-3">
              <span className="text-xs font-medium text-indigo-600">Frage {currentStep} von {questions.length}</span>
              <p className="font-medium text-gray-900 mt-1">{currentQuestion.prompt}</p>
              {currentQuestion.hint && !hasFeedback && (
                <p className="text-xs text-gray-400 mt-1 italic">💡 {currentQuestion.hint}</p>
              )}
            </div>

            {/* Answer textarea */}
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
              disabled={hasFeedback || loading}
              placeholder="Schreibe deine Analyse hier..."
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 resize-none"
            />

            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}

            {/* Submit or feedback */}
            {!hasFeedback ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={loading || !answers[currentQuestion.id]?.trim()}
                className="mt-3 w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    KI analysiert...
                  </>
                ) : (
                  'Antwort einreichen'
                )}
              </button>
            ) : (
              <div className="mt-4">
                {/* Score indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Bewertung:</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm ${
                          i < feedbacks[currentQuestion.id].score
                            ? feedbacks[currentQuestion.id].score >= 7
                              ? 'bg-green-400'
                              : feedbacks[currentQuestion.id].score >= 4
                              ? 'bg-amber-400'
                              : 'bg-red-400'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{feedbacks[currentQuestion.id].score}/10</span>
                </div>

                {/* Feedback text */}
                <div className="bg-indigo-50 rounded-lg p-4 text-sm text-gray-700 border border-indigo-100 prose-sm">
                  <div dangerouslySetInnerHTML={{
                    __html: feedbacks[currentQuestion.id].feedback
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>')
                  }} />
                </div>

                {/* Next button */}
                <button
                  onClick={isLastQuestion ? handleFinish : handleNext}
                  className="mt-4 w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {isLastQuestion ? 'Fallbeispiel abschliessen' : 'Nächste Frage →'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Finished summary */}
        {finished && (
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-semibold text-gray-900 mb-2">Fallbeispiel abgeschlossen</h4>
            <p className="text-sm text-gray-500">
              Deine Antworten wurden von der KI nach Umfang und Tiefe bewertet. Das Ergebnis fliesst in deine Gesamtbewertung ein.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
