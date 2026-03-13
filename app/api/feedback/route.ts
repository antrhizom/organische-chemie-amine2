import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question, answer, aiContext } = await req.json();

    if (!answer || answer.trim().length < 10) {
      return NextResponse.json({ error: 'Antwort zu kurz' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API-Schlüssel nicht konfiguriert. Bitte ANTHROPIC_API_KEY in .env.local setzen.' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });

    const prompt = `Du bist ein Chemie-Lehrer an einer Berufsbildungsschule und bewertest die schriftliche Antwort eines Lernenden.

Frage an den Lernenden:
"${question}"

Antwort des Lernenden:
"${answer}"

Fachlicher Kontext und Bewertungskriterien:
${aiContext}

Gib konstruktives Feedback auf Deutsch:

1. **Bewertung**: Wie vollständig und korrekt ist die Antwort? (Korrekt / Teilweise korrekt / Unvollständig)
2. **Stärken**: Was hat der Lernende gut gemacht?
3. **Verbesserungen**: Was fehlt oder könnte besser erklärt werden?
4. **Ergänzung**: Was wäre die ideale Antwort gewesen? (kurz zusammengefasst)

Sei ermutigend und pädagogisch wertvoll. Verwende einfache Sprache.

WICHTIG: Gib am Ende eine Punktzahl von 1 bis 10. Schreibe als allerletzte Zeile nur:
SCORE: X
wobei X eine Zahl von 1 bis 10 ist.`;

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
    console.error('Feedback-Fehler:', error);
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: `Fehler beim Feedback: ${message}` }, { status: 500 });
  }
}
