// ---- Content Types ----

export interface RevealCardData {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  category: string;
}

export interface ComparisonDuelData {
  id: string;
  compoundA: { name: string; formula?: string; svg?: string };
  compoundB: { name: string; formula?: string; svg?: string };
  correctAnswer: 'A' | 'B';
  explanation: string;
  property: string;
}

export interface SortChallengeData {
  id: string;
  instruction: string;
  items: { id: string; label: string; formula?: string; svg?: string }[];
  correctOrder: string[];
  orderLabel: string;
  explanation: string;
}

export interface ChemistryBuilderData {
  id: string;
  instruction: string;
  moleculeBase: string;
  svg?: string;
  slots: {
    id: string;
    position: { x: number; y: number };
    correctAnswer: string;
    label?: string;
  }[];
  options: { id: string; label: string; symbol: string }[];
  explanation: string;
}

export interface DrawingExerciseData {
  id: string;
  instruction: string;
  hint?: string;
  aiContext: string;
}

export interface OpenReflectionData {
  id: string;
  question: string;
  aiContext: string;
  hint?: string;
  svg?: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  scenario: string;
  questions: CaseStudyQuestion[];
  aiContext: string;
  svg?: string;
}

export interface CaseStudyQuestion {
  id: string;
  prompt: string;
  hint?: string;
  expectedTopics: string[];
}

export interface SynthesisOrderData {
  id: string;
  instruction: string;
  synthesisName: string;
  steps: { id: string; label: string; description?: string }[];
  correctOrder: string[];
  explanation: string;
  svg?: string;
}

export interface TrueFalseStatement {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface TrueFalseQuizData {
  id: string;
  instruction: string;
  statements: TrueFalseStatement[];
}

// ---- Evaluation Types ----

export interface ExerciseResult {
  exerciseId: string;
  exerciseType: string;
  correct: boolean;
  score: number;
  maxScore: number;
  kLevel: number;
}

// ---- Aufgabe (eine Prüfungsaufgabe) ----

export interface Aufgabe {
  id: string;
  nummer: number;
  titel: string;
  punkte: number;
  typ: 'open-reflection' | 'true-false' | 'sort-challenge' | 'comparison-duel' | 'chemistry-builder' | 'synthesis-order' | 'case-study';
  svg?: string;
  data: OpenReflectionData | TrueFalseQuizData | SortChallengeData | ComparisonDuelData | ChemistryBuilderData | SynthesisOrderData | CaseStudyData;
}

// ---- Session State ----

export interface ExamSessionState {
  aufgaben: Aufgabe[];
  results: ExerciseResult[];
  currentAufgabe: number;
  studentName: string;
  startedAt: string;
  timerStartedAt: string;
  timerDurationMs: number;
}
