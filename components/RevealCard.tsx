'use client';

import { useState } from 'react';
import { RevealCardData } from '@/lib/types';

interface Props {
  card: RevealCardData;
  onRevealed: () => void;
}

export default function RevealCard({ card, onRevealed }: Props) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      onRevealed();
    }
  };

  return (
    <div
      className={`relative border rounded-xl overflow-hidden transition-all duration-300 ${
        revealed
          ? 'bg-white border-indigo-200 shadow-sm'
          : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 cursor-pointer hover:shadow-md hover:border-indigo-300'
      }`}
      onClick={handleReveal}
    >
      {/* Category badge */}
      <div className="px-4 pt-3">
        <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
          {card.category}
        </span>
      </div>

      {/* Question */}
      <div className="px-4 py-3">
        <h4 className="font-semibold text-gray-900 text-sm">{card.question}</h4>
        {card.hint && !revealed && (
          <p className="text-xs text-gray-400 mt-1 italic">💡 {card.hint}</p>
        )}
      </div>

      {/* Answer (hidden until revealed) */}
      {!revealed ? (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Klicke zum Aufdecken
          </div>
        </div>
      ) : (
        <div className="px-4 pb-4 animate-in fade-in duration-500">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-gray-700 leading-relaxed">{card.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
