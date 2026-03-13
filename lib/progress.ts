import { ExerciseResult } from './types';

export function addResult(
  results: ExerciseResult[],
  result: ExerciseResult
): ExerciseResult[] {
  // Replace if same exercise already answered, otherwise add
  const existing = results.findIndex((r) => r.exerciseId === result.exerciseId);
  if (existing >= 0) {
    const copy = [...results];
    copy[existing] = result;
    return copy;
  }
  return [...results, result];
}

export function calculateScore(results: ExerciseResult[]): {
  total: number;
  max: number;
  percentage: number;
  byKLevel: Record<number, { correct: number; total: number }>;
} {
  const total = results.reduce((sum, r) => sum + r.score, 0);
  const max = results.reduce((sum, r) => sum + r.maxScore, 0);
  const percentage = max > 0 ? Math.round((total / max) * 100) : 0;

  const byKLevel: Record<number, { correct: number; total: number }> = {};
  for (const r of results) {
    if (!byKLevel[r.kLevel]) {
      byKLevel[r.kLevel] = { correct: 0, total: 0 };
    }
    byKLevel[r.kLevel].total++;
    if (r.correct) byKLevel[r.kLevel].correct++;
  }

  return { total, max, percentage, byKLevel };
}

export function getPerformanceLabel(percentage: number): string {
  if (percentage >= 90) return 'Hervorragend';
  if (percentage >= 75) return 'Sehr gut';
  if (percentage >= 60) return 'Gut';
  if (percentage >= 40) return 'Genügend';
  return 'Weiter üben';
}

export function getPerformanceColor(percentage: number): string {
  if (percentage >= 90) return '#16a34a';
  if (percentage >= 75) return '#22c55e';
  if (percentage >= 60) return '#eab308';
  if (percentage >= 40) return '#f97316';
  return '#ef4444';
}
