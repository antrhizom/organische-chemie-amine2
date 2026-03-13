import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { scenario, questionPrompt, answer, aiContext, expectedTopics } = await req.json();

    if (!answer || answer.trim().length < 10) {
      return NextResponse.json({ error: 'Antwort zu kurz (mindestens 10 Zeichen)' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API-Schlüssel nicht konfiguriert. Bitte ANTHROPIC_API_KEY in .env.local setzen.' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const topicsStr = expectedTopics?.length
      ? `\nErwartete Schlüsselkonzepte in einer guten Antwort: ${expectedTopics.join(', ')}`
      : '';

    const prompt = `Du bist ein erfahrener Chemie-Lehrer an einer Berufsbildungsschule (Laboranten Fachrichtung Chemie).
Ein Lernender bearbeitet ein Fallbeispiel zu Aminen und hat eine Analysefrage beantwortet.

FALLBESCHREIBUNG:
"${scenario}"

FRAGE AN DEN LERNENDEN:
"${questionPrompt}"
${topicsStr}

ANTWORT DES LERNENDEN:
"${answer}"

FACHLICHER KONTEXT UND BEWERTUNGSKRITERIEN:
${aiContext}

Bewerte die Antwort nach UMFANG und TIEFE:

1. **Fachliche Korrektheit**: Sind die Aussagen chemisch korrekt?
2. **Vollständigkeit**: Werden die wichtigsten Aspekte abgedeckt?
3. **Tiefe der Analyse**: Zeigt der Lernende ein tiefes Verständnis oder bleibt die Antwort oberflächlich?
4. **Verbesserungsvorschlag**: Was könnte der Lernende noch ergänzen oder besser erklären?

Sei ermutigend und konstruktiv. Verwende einfache, klare Sprache. Gib konkrete Hinweise, die zum Weiterdenken anregen.

WICHTIG: Gib am Ende eine Punktzahl von 1 bis 10. Schreibe als allerletzte Zeile nur:
SCORE: X
wobei X eine Zahl von 1 bis 10 ist.
(1-3 = oberflächlich/falsch, 4-5 = Grundverständnis, 6-7 = gute Analyse, 8-9 = tiefgehend und vollständig, 10 = hervorragend)`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content
      .filter((b) => b.type === 'text')
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('\n');

    const scoreMatch = text.match(/SCORE:\s*(\d+)/i);
    const score = scoreMatch ? Math.min(10, Math.max(1, parseInt(scoreMatch[1], 10))) : 5;
    const feedbackText = text.replace(/\n?SCORE:\s*\d+\s*$/i, '').trim();

    return NextResponse.json({ feedback: feedbackText, score });
  } catch (error) {
    console.error('Case-Study-Fehler:', error);
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: `Fehler bei der Fallbewertung: ${message}` }, { status: 500 });
  }
}
