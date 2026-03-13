import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { image, instruction, aiContext } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'Kein Bild vorhanden' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API-Schlüssel nicht konfiguriert. Bitte ANTHROPIC_API_KEY in .env.local setzen.' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

    const prompt = `Du bist ein Chemie-Lehrer an einer Berufsbildungsschule und analysierst die Zeichnung eines Lernenden.

Aufgabe: "${instruction}"

Kontext für die Bewertung:
${aiContext}

Analysiere die Zeichnung und gib konstruktives Feedback auf Deutsch:

1. **Bewertung**: Ist die Zeichnung korrekt? (Korrekt / Teilweise korrekt / Nicht korrekt)
2. **Details**: Was ist gut gemacht? Was fehlt oder ist falsch?
3. **Tipps**: Konkrete Verbesserungsvorschläge
4. **Merkhilfe**: Ein kurzer Tipp zum Merken

Sei ermutigend und pädagogisch wertvoll. Verwende einfache Sprache.

WICHTIG: Gib am Ende eine Punktzahl von 1 bis 10. Schreibe als allerletzte Zeile nur:
SCORE: X
wobei X eine Zahl von 1 bis 10 ist.`;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/png', data: base64Data },
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
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
    console.error('Analyse-Fehler:', error);
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    return NextResponse.json({ error: `Fehler bei der Analyse: ${message}` }, { status: 500 });
  }
}
