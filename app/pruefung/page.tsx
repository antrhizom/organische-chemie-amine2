'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { aufgaben } from '@/lib/content/aufgaben';
import { addResult } from '@/lib/progress';
import { saveSession, loadSession, clearSession } from '@/lib/persistence';
import {
  ExamSessionState,
  ExerciseResult,
  Aufgabe,
  OpenReflectionData,
  TrueFalseQuizData,
  SortChallengeData,
  ComparisonDuelData,
  ChemistryBuilderData,
  SynthesisOrderData,
  CaseStudyData,
} from '@/lib/types';
import ComparisonDuel from '@/components/ComparisonDuel';
import SortChallenge from '@/components/SortChallenge';
import ChemistryBuilder from '@/components/ChemistryBuilder';
import OpenReflection from '@/components/OpenReflection';
import SynthesisOrder from '@/components/SynthesisOrder';
import CaseStudy from '@/components/CaseStudy';
import TrueFalseQuiz from '@/components/TrueFalseQuiz';
import CountdownTimer from '@/components/CountdownTimer';
import ResumeDialog from '@/components/ResumeDialog';
import ScoreSummary from '@/components/ScoreSummary';
import MoleculeDisplay from '@/components/MoleculeDisplay';
import { generateCertificatePDF } from '@/components/Certificate';
import {
  hexylaminSvg,
  heptanSvg,
  ethylpentanSvg,
  triethylaminSvg,
  nomenklatur1Svg,
  nomenklatur2Svg,
  acetamidSvg,
  anilinSvg,
  benzylaminSvg,
  cyclohexylaminSvg,
  piperidinSvg,
  diethylaminSvg,
  verbindungASvg,
  verbindungBSvg,
  lsdSvg,
  cumolSvg,
  nMethylbutylaminSvg,
  dimethylethylaminSvg,
  butanamidSvg,
  aminobutanSvg,
  aminopentanonSvg,
  aminophenolSvg,
} from '@/lib/molecules';

const TIMER_DURATION_MS = 90 * 60 * 1000; // 90 Minuten
const TOTAL_AUFGABEN = aufgaben.length;

function createSession(): ExamSessionState {
  const now = new Date().toISOString();
  return {
    aufgaben,
    results: [],
    currentAufgabe: 0,
    studentName: '',
    startedAt: now,
    timerStartedAt: now,
    timerDurationMs: TIMER_DURATION_MS,
  };
}

// SVG grid for Aufgabe 1 (Siedepunkte)
function Aufgabe1Molecules() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={hexylaminSvg} label="A" sublabel="131 °C" />
      <MoleculeDisplay svg={heptanSvg} label="B" sublabel="98 °C" />
      <MoleculeDisplay svg={ethylpentanSvg} label="C" sublabel="93 °C" />
      <MoleculeDisplay svg={triethylaminSvg} label="D" sublabel="89 °C" />
    </div>
  );
}

// SVG for Aufgabe 4 (IUPAC)
function Aufgabe4Molecules() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={nomenklatur1Svg} label="Verbindung 1" />
      <MoleculeDisplay svg={nomenklatur2Svg} label="Verbindung 2" />
    </div>
  );
}

// SVG for Aufgabe 6 (Basizität)
function Aufgabe6Molecules() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={acetamidSvg} label="Acetamid" />
      <MoleculeDisplay svg={anilinSvg} label="Anilin" />
      <MoleculeDisplay svg={benzylaminSvg} label="Benzylamin" />
      <MoleculeDisplay svg={cyclohexylaminSvg} label="Cyclohexylamin" />
      <MoleculeDisplay svg={piperidinSvg} label="Piperidin" />
      <MoleculeDisplay svg={diethylaminSvg} label="Diethylamin" />
    </div>
  );
}

// SVG for Aufgabe 7 (Vergleich)
function Aufgabe7Molecules() {
  return (
    <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={verbindungASvg} label="Verbindung A" />
      <MoleculeDisplay svg={verbindungBSvg} label="Verbindung B" />
    </div>
  );
}

// SVG for Aufgabe 8 (LSD)
function Aufgabe8Molecule() {
  return (
    <div className="my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={lsdSvg} label="LSD (Lysergsäurediethylamid)" />
    </div>
  );
}

// SVG for Aufgabe 13 (Cumol)
function Aufgabe13Molecule() {
  return (
    <div className="my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={cumolSvg} label="Isopropylbenzol (Cumol) — Verbindung A" />
    </div>
  );
}

// SVG for Aufgabe 14 (Strichdarstellungen klassifizieren)
function Aufgabe14Molecules() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={nMethylbutylaminSvg} label="I" />
      <MoleculeDisplay svg={dimethylethylaminSvg} label="II" />
      <MoleculeDisplay svg={butanamidSvg} label="III" />
      <MoleculeDisplay svg={aminobutanSvg} label="IV" />
    </div>
  );
}

// SVG for Aufgabe 15 (Summenformel bestimmen)
function Aufgabe15Molecules() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 p-4 bg-gray-50 rounded-xl">
      <MoleculeDisplay svg={aminopentanonSvg} label="Verbindung X" sublabel="4-Amino-2-pentanon" />
      <MoleculeDisplay svg={aminophenolSvg} label="Verbindung Y" sublabel="N-Ethyl-3-aminophenol" />
    </div>
  );
}

export default function PruefungPage() {
  const [session, setSession] = useState<ExamSessionState | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [aufgabeCompleted, setAufgabeCompleted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const persistedRef = useRef<ReturnType<typeof loadSession>>(null);

  // Initialize
  useEffect(() => {
    const name = localStorage.getItem('studentName') || 'Lernende/r';
    setStudentName(name);

    const saved = loadSession();
    if (saved) {
      persistedRef.current = saved;
      setShowResumeDialog(true);
    } else {
      const s = createSession();
      s.studentName = name;
      setSession(s);
    }
  }, []);

  const handleResume = () => {
    const saved = persistedRef.current;
    if (saved) {
      const adjustedSession = {
        ...saved.session,
        timerStartedAt: new Date(Date.now() - (saved.session.timerDurationMs - saved.timerRemainingMs)).toISOString(),
      };
      setSession(adjustedSession as ExamSessionState);
      setCurrentIdx(saved.currentAufgabe);
      setResults(saved.results);
    }
    setShowResumeDialog(false);
  };

  const handleRestart = () => {
    clearSession();
    const name = localStorage.getItem('studentName') || 'Lernende/r';
    const s = createSession();
    s.studentName = name;
    setSession(s);
    setCurrentIdx(0);
    setResults([]);
    setShowSummary(false);
    setAufgabeCompleted(false);
    setShowResumeDialog(false);
  };

  const handleResult = useCallback((result: ExerciseResult) => {
    setResults((prev) => addResult(prev, result));
    setAufgabeCompleted(true);
  }, []);

  const goToNext = () => {
    if (currentIdx < TOTAL_AUFGABEN - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setAufgabeCompleted(false);
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Update session
      if (session) {
        const updated = { ...session, currentAufgabe: nextIdx };
        setSession(updated);
      }
    } else {
      setShowSummary(true);
      clearSession();
    }
  };

  // Persist
  useEffect(() => {
    if (session && !showSummary) {
      const updated = { ...session, currentAufgabe: currentIdx };
      saveSession(updated, results);
    }
  }, [session, currentIdx, results, showSummary]);

  // Save on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (session && !showSummary) {
        const updated = { ...session, currentAufgabe: currentIdx };
        saveSession(updated, results);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [session, currentIdx, results, showSummary]);

  const handleTimeUp = useCallback(() => {
    setTimeExpired(true);
    setShowSummary(true);
    clearSession();
  }, []);

  const progressPercent = showSummary ? 100 : Math.round((currentIdx / TOTAL_AUFGABEN) * 100);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {showResumeDialog && persistedRef.current ? (
          <ResumeDialog
            persisted={{
              currentPhase: `Aufgabe ${(persistedRef.current.currentAufgabe || 0) + 1}`,
              results: persistedRef.current.results,
              timerRemainingMs: persistedRef.current.timerRemainingMs,
              savedAt: persistedRef.current.savedAt,
            }}
            onResume={handleResume}
            onRestart={handleRestart}
          />
        ) : (
          <div className="animate-spin w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full" />
        )}
      </div>
    );
  }

  if (showSummary) {
    return (
      <main className="min-h-screen pb-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {timeExpired && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-amber-800 font-medium">Die Zeit ist abgelaufen.</p>
              <p className="text-xs text-amber-700 mt-1">Hier sind deine bisherigen Ergebnisse.</p>
            </div>
          )}
          <ScoreSummary
            results={results}
            studentName={studentName}
            onDownloadCertificate={() => generateCertificatePDF(studentName, results)}
          />
        </div>
      </main>
    );
  }

  const aufgabe = aufgaben[currentIdx];

  // Render SVG molecules for specific Aufgaben
  const renderMolecules = () => {
    switch (aufgabe.nummer) {
      case 1: return <Aufgabe1Molecules />;
      case 4: return <Aufgabe4Molecules />;
      case 6: return <Aufgabe6Molecules />;
      case 7: return <Aufgabe7Molecules />;
      case 8: return <Aufgabe8Molecule />;
      case 13: return <Aufgabe13Molecule />;
      case 14: return <Aufgabe14Molecules />;
      case 15: return <Aufgabe15Molecules />;
      default: return null;
    }
  };

  // Render the interactive exercise component
  const renderExercise = () => {
    switch (aufgabe.typ) {
      case 'open-reflection':
        return <OpenReflection exercise={aufgabe.data as OpenReflectionData} onResult={handleResult} />;
      case 'true-false':
        return <TrueFalseQuiz quiz={aufgabe.data as TrueFalseQuizData} onResult={handleResult} />;
      case 'sort-challenge':
        return <SortChallenge challenge={aufgabe.data as SortChallengeData} onResult={handleResult} />;
      case 'comparison-duel':
        return <ComparisonDuel duel={aufgabe.data as ComparisonDuelData} index={0} onResult={handleResult} />;
      case 'chemistry-builder':
        return <ChemistryBuilder builder={aufgabe.data as ChemistryBuilderData} onResult={handleResult} />;
      case 'synthesis-order':
        return <SynthesisOrder synthesis={aufgabe.data as SynthesisOrderData} onResult={handleResult} />;
      case 'case-study':
        return <CaseStudy caseStudy={aufgabe.data as CaseStudyData} onResult={handleResult} />;
      default:
        return null;
    }
  };

  // Check if current aufgabe has a result
  const hasResult = results.some((r) => r.exerciseId === (aufgabe.data as { id: string }).id);

  return (
    <main className="min-h-screen pb-20">
      <div ref={topRef} />

      {showResumeDialog && persistedRef.current && (
        <ResumeDialog
          persisted={{
            currentPhase: `Aufgabe ${(persistedRef.current.currentAufgabe || 0) + 1}`,
            results: persistedRef.current.results,
            timerRemainingMs: persistedRef.current.timerRemainingMs,
            savedAt: persistedRef.current.savedAt,
          }}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      )}

      {/* Progress bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
              {currentIdx + 1}/{TOTAL_AUFGABEN}
            </span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono text-gray-400">{progressPercent}%</span>
            <CountdownTimer
              startedAt={session.timerStartedAt}
              durationMs={session.timerDurationMs}
              onTimeUp={handleTimeUp}
            />
          </div>
          {/* Mini aufgabe indicators */}
          <div className="flex justify-between mt-2 gap-0.5">
            {aufgaben.map((a, i) => (
              <div
                key={a.id}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < currentIdx
                    ? 'bg-green-400'
                    : i === currentIdx
                    ? 'bg-indigo-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Aufgabe header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
              {aufgabe.nummer}
            </span>
            <h2 className="text-xl font-bold text-gray-900">{aufgabe.titel}</h2>
            <span className="ml-auto text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {aufgabe.punkte} {aufgabe.punkte === 1 ? 'Punkt' : 'Punkte'}
            </span>
          </div>
        </div>

        {/* SVG Molecules (if any) */}
        {renderMolecules()}

        {/* Exercise */}
        {renderExercise()}

        {/* Next button */}
        {(hasResult || aufgabeCompleted) && (
          <div className="text-center pt-6">
            <button
              onClick={goToNext}
              className={`px-8 py-2.5 text-white text-sm font-medium rounded-lg transition-colors ${
                currentIdx < TOTAL_AUFGABEN - 1
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200'
              }`}
            >
              {currentIdx < TOTAL_AUFGABEN - 1
                ? `Weiter zu Aufgabe ${currentIdx + 2} →`
                : 'Zur Auswertung →'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
