'use client';

import { useState, useEffect, useCallback } from 'react';

interface Props {
  startedAt: string;
  durationMs: number;
  onTimeUp: () => void;
}

export default function CountdownTimer({ startedAt, durationMs, onTimeUp }: Props) {
  const calcRemaining = useCallback(() => {
    const elapsed = Date.now() - new Date(startedAt).getTime();
    return Math.max(0, durationMs - elapsed);
  }, [startedAt, durationMs]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      const r = calcRemaining();
      setRemaining(r);
      if (r <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [calcRemaining, onTimeUp]);

  const totalSeconds = Math.ceil(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Color coding
  let colorClass = 'text-gray-400';
  let bgClass = '';
  if (minutes < 5) {
    colorClass = 'text-red-600 font-semibold';
    bgClass = 'bg-red-50 px-2 py-0.5 rounded-md';
  } else if (minutes < 10) {
    colorClass = 'text-orange-500 font-medium';
  } else if (minutes < 20) {
    colorClass = 'text-amber-500';
  }

  return (
    <div className={`flex items-center gap-1.5 text-xs ${bgClass}`}>
      <svg className={`w-3.5 h-3.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className={colorClass}>{display}</span>
      {minutes < 5 && minutes > 0 && (
        <span className="text-red-500 text-[10px] hidden sm:inline">Bald fertig</span>
      )}
    </div>
  );
}
