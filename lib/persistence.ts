import { ExamSessionState, ExerciseResult } from './types';

const STORAGE_KEY = 'amine-exam-v2';

export interface PersistedSession {
  version: number;
  session: ExamSessionState;
  currentAufgabe: number;
  results: ExerciseResult[];
  timerRemainingMs: number;
  savedAt: string;
}

export function saveSession(
  session: ExamSessionState,
  results: ExerciseResult[]
): void {
  const elapsed = Date.now() - new Date(session.timerStartedAt).getTime();
  const timerRemainingMs = Math.max(0, session.timerDurationMs - elapsed);

  const data: PersistedSession = {
    version: 1,
    session,
    currentAufgabe: session.currentAufgabe,
    results,
    timerRemainingMs,
    savedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadSession(): PersistedSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSession;
    if (parsed.version !== 1) return null;
    if (parsed.timerRemainingMs <= 0) {
      clearSession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
