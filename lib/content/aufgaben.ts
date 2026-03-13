import { Aufgabe } from '../types';

// Aufgaben werden in lib/molecules/index.ts mit SVGs verknüpft.
// Hier importieren wir die SVGs nach Erstellung.

export const aufgaben: Aufgabe[] = [
  // ============================================================
  // AUFGABE 1: Siedepunkte (1 Punkt) – OpenReflection + SVGs
  // ============================================================
  {
    id: 'aufgabe-1',
    nummer: 1,
    titel: 'Siedepunkte von Aminen und Alkanen',
    punkte: 1,
    typ: 'open-reflection',
    data: {
      id: 'a1-reflection',
      question: 'Während die Siedepunkte von A (Hexylamin, 131 °C) und B (Heptan, 98 °C) weit auseinander liegen, weisen die Verbindungen C (3-Ethylpentan, 93 °C) und D (Triethylamin, 89 °C) ähnliche Siedepunkte auf. Erkläre dies.',
      aiContext: 'Aufgabe 1 der Prüfung (1 Punkt). Korrekte Erklärung: Ein primäres Amin (A) kann H-Brücken ausbilden (N–H-Bindung vorhanden), daher höherer Siedepunkt als Alkan B gleicher Kettenlänge. Ein tertiäres Amin (D) kann KEINE H-Brücken ausbilden (keine N–H-Bindung), daher ähnlicher Siedepunkt wie der Alkan C ähnlicher Masse – es wirken nur van-der-Waals-Kräfte. Vollständige Antwort muss enthalten: (1) H-Brücken bei primären Aminen, (2) keine H-Brücken bei tertiären Aminen, (3) nur vdW-Kräfte bei D → ähnlich wie Alkan C.',
      hint: 'Vergleiche die intermolekularen Kräfte der vier Verbindungen.',
      svg: 'aufgabe1', // Marker for the page to render Aufgabe1 SVG grid
    },
  },

  // ============================================================
  // AUFGABE 2: Richtig/Falsch (2 Punkte) – TrueFalseQuiz
  // ============================================================
  {
    id: 'aufgabe-2',
    nummer: 2,
    titel: 'Richtig oder Falsch?',
    punkte: 2,
    typ: 'true-false',
    data: {
      id: 'a2-truefalse',
      instruction: 'Welche der folgenden Aussagen sind korrekt (richtig) und welche sind falsch? (je 0.5 Punkte)',
      statements: [
        {
          id: 'a2-s1',
          statement: 'Tertiäre Amine sind weniger basisch als primäre und sekundäre, weil sie keine H-Brücken ausbilden können.',
          isTrue: false,
          explanation: 'Die Basizität hängt nicht von H-Brücken ab, sondern von der Verfügbarkeit des freien Elektronenpaares am N. Die etwas geringere Basizität tertiärer Amine in Wasser liegt an sterischer Hinderung und schlechterer Solvatation des Ammonium-Ions.',
        },
        {
          id: 'a2-s2',
          statement: 'Aminoethan (Ethylamin) ist wasserlöslich.',
          isTrue: true,
          explanation: 'Ethylamin (CH₃CH₂NH₂) hat eine polare NH₂-Gruppe, die H-Brücken mit Wasser bildet. Amine bis ca. C₅ sind gut wasserlöslich.',
        },
        {
          id: 'a2-s3',
          statement: 'Aromatische Amine wie Anilin sind weniger nukleophil als Alkylamine, weil das freie Elektronenpaar in Konjugation mit dem Ring steht.',
          isTrue: true,
          explanation: 'Das freie Elektronenpaar am Stickstoff ist in das π-System des Aromaten delokalisiert. Dadurch steht es weniger für einen nukleophilen Angriff zur Verfügung.',
        },
        {
          id: 'a2-s4',
          statement: 'Bei der direkten Alkylierung von Ammoniak mit einem Halogenalkan entsteht ausschliesslich das primäre Amin.',
          isTrue: false,
          explanation: 'Es kommt zur Überalkylierung: Das gebildete primäre Amin ist nukleophiler als NH₃ und reagiert weiter zu sekundären, tertiären Aminen und quartären Ammoniumsalzen.',
        },
      ],
    },
  },

  // ============================================================
  // AUFGABE 3: Wasserlöslichkeit (2 Punkte) – SortChallenge
  // ============================================================
  {
    id: 'aufgabe-3',
    nummer: 3,
    titel: 'Wasserlöslichkeit von organischen Verbindungen',
    punkte: 2,
    typ: 'sort-challenge',
    data: {
      id: 'a3-sort',
      instruction: 'Ordne die folgenden Verbindungen: Welche sind gut und welche sind schlecht in Wasser löslich? Sortiere von schlecht löslich (links) nach gut löslich (rechts).',
      items: [
        { id: 'a3-a', label: 'Propionsäure', formula: 'CH₃CH₂COOH' },
        { id: 'a3-b', label: 'Diethylether', formula: '(C₂H₅)₂O' },
        { id: 'a3-c', label: 'Butylamin', formula: 'C₄H₉NH₂' },
        { id: 'a3-d', label: 'Cyclohexan', formula: 'C₆H₁₂' },
        { id: 'a3-e', label: 'Ethanol', formula: 'C₂H₅OH' },
        { id: 'a3-f', label: 'Buttersäureethylester', formula: 'CH₃(CH₂)₂COOC₂H₅' },
        { id: 'a3-g', label: 'Acetamid', formula: 'CH₃CONH₂' },
      ],
      correctOrder: ['a3-d', 'a3-b', 'a3-f', 'a3-a', 'a3-c', 'a3-e', 'a3-g'],
      orderLabel: 'schlecht löslich → gut löslich',
      explanation: 'Cyclohexan (rein unpolar, keine H-Brücken) < Diethylether (schwacher H-Brücken-Akzeptor) < Ester (Carbonyl-Akzeptor, aber langer Rest) < Propionsäure (H-Brücken-Donor + Akzeptor) < Butylamin (NH₂-Gruppe) < Ethanol (klein, starke H-Brücken) < Acetamid (klein, NH₂ + C=O, ausgezeichnete H-Brücken).',
    },
  },

  // ============================================================
  // AUFGABE 4: IUPAC-Nomenklatur (2 Punkte) – OpenReflection + SVGs
  // ============================================================
  {
    id: 'aufgabe-4',
    nummer: 4,
    titel: 'IUPAC-Nomenklatur',
    punkte: 2,
    typ: 'open-reflection',
    svg: 'aufgabe4',
    data: {
      id: 'a4-reflection',
      question: 'Benenne die beiden dargestellten Verbindungen nach IUPAC-Nomenklatur. Erkläre bei der ersten Verbindung deinen Lösungsweg (Prioritätsregeln).',
      aiContext: 'Aufgabe 4 der Prüfung (2 Punkte, je 1). Verbindung 1: 6-Amino-5-hydroxy-3-heptanon. Heptangerüst, Ketogruppe an C-3 bestimmt den Stammnamen (-on), OH an C-5 als Hydroxy-Präfix, NH₂ an C-6 als Amino-Präfix. Nummerierung: Ketogruppe bekommt niedrigste Nummer. Verbindung 2: N-Ethyl-N-methyl-3-pentanamin (oder äquivalent korrekte IUPAC-Benennung). Der Lernende soll die Prioritätsregeln erklären.',
      hint: 'Welche funktionelle Gruppe bestimmt den Stammnamen? Wie nummerierst du die Kette?',
      svg: 'aufgabe4',
    },
  },

  // ============================================================
  // AUFGABE 5: Nukleophilie (2 Punkte) – OpenReflection
  // ============================================================
  {
    id: 'aufgabe-5',
    nummer: 5,
    titel: 'Nukleophilie tertiärer Amine',
    punkte: 2,
    typ: 'open-reflection',
    data: {
      id: 'a5-reflection',
      question: 'Im letzten Schritt einer Synthese greift ein Alkohol (OH-Gruppe) ein Säurechlorid an, obwohl an demselben Molekül auch ein tertiäres Amin vorhanden ist. Gib zwei Gründe an, warum das tertiäre Amin hier nicht als Nukleophil reagiert.',
      aiContext: 'Aufgabe 5 der Prüfung (2 Punkte). Erwartete Antworten (2 von 3 Gründen): (1) Sterische Hinderung – drei Alkylgruppen behindern die Annäherung an das Carbonyl-C des Säurechlorids. (2) In Gegenwart von HCl (freigesetzt bei der Reaktion) wird das tert. Amin protoniert → Ammoniumsalz, das nicht nukleophil ist. (3) Tert. Amine besitzen keine N–H-Bindung, die für die nach dem nukleophilen Angriff nötige Protonenabgabe benötigt wird.',
      hint: 'Denke an sterische, elektronische und mechanistische Faktoren.',
    },
  },

  // ============================================================
  // AUFGABE 6: Basizitätsreihenfolge (3 Punkte) – SortChallenge + SVGs
  // ============================================================
  {
    id: 'aufgabe-6',
    nummer: 6,
    titel: 'Basizitätsreihenfolge',
    punkte: 3,
    typ: 'sort-challenge',
    svg: 'aufgabe6',
    data: {
      id: 'a6-sort',
      instruction: 'Ordne die folgenden sechs Verbindungen nach steigender Basizität. Beginne mit der schwächsten Base.',
      items: [
        { id: 'a6-a', label: 'Acetamid', formula: 'CH₃CONH₂' },
        { id: 'a6-b', label: 'Anilin', formula: 'C₆H₅NH₂' },
        { id: 'a6-c', label: 'Benzylamin', formula: 'C₆H₅CH₂NH₂' },
        { id: 'a6-d', label: 'Cyclohexylamin', formula: 'C₆H₁₁NH₂' },
        { id: 'a6-e', label: 'Piperidin', formula: 'C₅H₁₀NH' },
        { id: 'a6-f', label: 'Diethylamin', formula: '(C₂H₅)₂NH' },
      ],
      correctOrder: ['a6-a', 'a6-b', 'a6-c', 'a6-d', 'a6-e', 'a6-f'],
      orderLabel: 'schwächste Base → stärkste Base',
      explanation: 'Acetamid (Konjugation mit C=O, kaum basisch, pKb ~14) < Anilin (Konjugation mit Aromat, pKs ~4.6) < Benzylamin (kein konjugiertes Paar, aber Phenylgruppe nah, pKs ~9.3) < Cyclohexylamin (Alkylamin, pKs ~10.6) < Piperidin (sek. cycl. Amin, pKs ~11.1) < Diethylamin (sek. Alkylamin, pKs ~10.9).',
    },
  },

  // ============================================================
  // AUFGABE 7: Basizität Vergleich (2 Punkte) – ComparisonDuel + Erklärung
  // ============================================================
  {
    id: 'aufgabe-7',
    nummer: 7,
    titel: 'Basizitätsvergleich',
    punkte: 2,
    typ: 'open-reflection',
    svg: 'aufgabe7',
    data: {
      id: 'a7-reflection',
      question: 'Die beiden dargestellten Verbindungen enthalten je ein Stickstoffatom. Welche der beiden Verbindungen ist basischer? Begründe deine Antwort ausführlich.',
      aiContext: 'Aufgabe 7 der Prüfung (2 Punkte: 1 Punkt für korrekte Wahl, 1 Punkt für Begründung). Verbindung A hat ein Amin, dessen freies Elektronenpaar NICHT mit einem π-System konjugiert ist. Verbindung B hat ein Amin, dessen freies Elektronenpaar mit einer C=C-Doppelbindung konjugiert ist. Verbindung A ist basischer, weil das Elektronenpaar vollständig verfügbar ist. Bei B ist das Elektronenpaar durch Mesomerie/Konjugation mit der Doppelbindung delokalisiert und steht weniger für die Protonierung zur Verfügung.',
      hint: 'Vergleiche die Verfügbarkeit des freien Elektronenpaares am Stickstoff.',
    },
  },

  // ============================================================
  // AUFGABE 8: LSD-Analyse (2 Punkte) – ChemistryBuilder + OpenReflection
  // ============================================================
  {
    id: 'aufgabe-8',
    nummer: 8,
    titel: 'Lysergsäurediethylamid (LSD)',
    punkte: 2,
    typ: 'case-study',
    svg: 'aufgabe8',
    data: {
      id: 'a8-casestudy',
      title: 'LSD-Analyse',
      scenario: 'Das LSD-Molekül (Lysergsäurediethylamid, M = 323.44 g/mol) enthält drei verschiedene Stickstoffatome: ein Indol-NH (1), ein tertiäres Amin im Ring (2) und einen Amid-Stickstoff (3).',
      questions: [
        {
          id: 'a8-q1',
          prompt: 'Welcher der drei Stickstoffe wird bei Zugabe einer Säure am schnellsten protoniert? Begründe ausführlich für alle drei N-Atome.',
          hint: 'Vergleiche die Verfügbarkeit des Elektronenpaares an jedem N-Atom.',
          expectedTopics: ['tertiäres Amin protoniert', 'Indol-NH aromatisch', 'Amid-N Mesomerie mit C=O', 'sp³ vs sp² Hybridisierung', 'Elektronenpaar verfügbar'],
        },
        {
          id: 'a8-q2',
          prompt: 'Berechne die Molmasse von LSD anhand der Summenformel C₂₀H₂₅N₃O. (M(C)=12, M(H)=1, M(N)=14, M(O)=16)',
          hint: 'Multipliziere die Anzahl jedes Atoms mit seiner Atommasse und addiere.',
          expectedTopics: ['20×12=240', '25×1=25', '3×14=42', '1×16=16', 'Total: 323 g/mol'],
        },
      ],
      aiContext: 'Aufgabe 8 der Prüfung (2 Punkte). Teil a (1 Pt): Das tertiäre Amin (2) im Piperidinring wird protoniert – Elektronenpaar in sp³-Orbital, nicht konjugiert. Indol-NH: Elektronenpaar Teil des aromatischen π-Systems. Amid-N: Elektronenpaar durch Mesomerie mit C=O delokalisiert. Teil b (1 Pt): M = 20×12 + 25×1 + 3×14 + 16 = 240+25+42+16 = 323 g/mol.',
    },
  },

  // ============================================================
  // AUFGABE 9: Gabriel-Synthese (1 Punkt) – SynthesisOrder
  // ============================================================
  {
    id: 'aufgabe-9',
    nummer: 9,
    titel: 'Gabriel-Synthese',
    punkte: 1,
    typ: 'synthesis-order',
    data: {
      id: 'a9-synthesis',
      instruction: 'Bringe die Schritte der Gabriel-Synthese in die richtige Reihenfolge.',
      synthesisName: 'Gabriel-Synthese',
      steps: [
        { id: 'gs-1', label: 'Phthalimid mit KOH zum Kaliumsalz umsetzen' },
        { id: 'gs-2', label: 'Alkylierung: K-Phthalimid + Halogenalkan (R–X) → N-Alkylphthalimid' },
        { id: 'gs-3', label: 'Hydrolyse mit Hydrazin (N₂H₄)' },
        { id: 'gs-4', label: 'Primäres Amin (R–NH₂) + Phthalhydrazid isolieren' },
      ],
      correctOrder: ['gs-1', 'gs-2', 'gs-3', 'gs-4'],
      explanation: 'Die Gabriel-Synthese schützt den Stickstoff durch die Phthalimid-Gruppe vor Mehrfachalkylierung. Das Kaliumsalz reagiert als Nukleophil mit R–X, und die Schutzgruppe wird am Ende mit Hydrazin (Ing-Manske-Variante) entfernt. Vorteil: Selektiv nur primäre Amine, keine Überalkylierung.',
    },
  },

  // ============================================================
  // AUFGABE 10: Amin-Herstellung (2 Punkte) – CaseStudy
  // ============================================================
  {
    id: 'aufgabe-10',
    nummer: 10,
    titel: 'Herstellung eines sekundären Amins',
    punkte: 2,
    typ: 'case-study',
    data: {
      id: 'a10-casestudy',
      title: 'Synthese eines sekundären Amins',
      scenario: 'Ein sekundäres Amin (R₁R₂NH) soll hergestellt werden. Die direkte Alkylierung mit Halogenalkanen führt jedoch zu Problemen.',
      questions: [
        {
          id: 'a10-q1',
          prompt: 'Welches Problem tritt bei der direkten Alkylierung auf und warum ist sie für ein reines sekundäres Amin ungeeignet?',
          hint: 'Was passiert mit dem Produkt, nachdem es gebildet wurde?',
          expectedTopics: ['Überalkylierung', 'Produkt nukleophiler als Edukt', 'Gemisch aller Substitutionsgrade', 'sekundäres Amin reagiert weiter'],
        },
        {
          id: 'a10-q2',
          prompt: 'Schlage zwei alternative Synthese-Methoden vor, die das Problem der Überalkylierung vermeiden. Beschreibe jeden Weg kurz mit Edukten und Reagenzien.',
          hint: 'Denke an Schutzgruppen und an die Reduktion von C=N-Doppelbindungen.',
          expectedTopics: ['Reduktive Aminierung', 'Aldehyd/Keton + Amin → Imin → NaBH₃CN', 'Gabriel-Synthese für primäres Amin', 'Selektivität', 'NaBH₃CN oder NaBH₄'],
        },
      ],
      aiContext: 'Aufgabe 10 der Prüfung (2 Punkte). Erwartete Antworten: (1) Überalkylierung: Das gebildete sekundäre Amin ist nukleophiler als das primäre Amin-Edukt und reagiert weiter zum tertiären Amin und quartären Ammoniumsalz. (2a) Reduktive Aminierung: Aldehyd + primäres Amin → Imin → selektive Reduktion mit NaBH₃CN → sekundäres Amin. (2b) Gabriel-Synthese → primäres Amin, dann einmalige Alkylierung oder erneute reduktive Aminierung.',
    },
  },

  // ============================================================
  // AUFGABE 11: Mehrstufensynthese (3 Punkte) – CaseStudy
  // ============================================================
  {
    id: 'aufgabe-11',
    nummer: 11,
    titel: 'Mehrstufensynthese: Benzol → sekundäres Amid',
    punkte: 3,
    typ: 'case-study',
    data: {
      id: 'a11-casestudy',
      title: 'Benzol → N-Methylbenzamid',
      scenario: 'Ausgehend von Benzol soll N-Methylbenzamid (C₆H₅CONHCH₃) hergestellt werden. Formuliere eine vollständige Synthesesequenz mit allen Zwischenstufen und Reagenzien.',
      questions: [
        {
          id: 'a11-q1',
          prompt: 'Wie wird aus Benzol zunächst Benzoesäure hergestellt? Beschreibe die nötigen Schritte und Reagenzien.',
          hint: 'Über welches Zwischenprodukt kann man von einem Aromaten zu einer Carbonsäure gelangen? Denke an Grignard.',
          expectedTopics: ['Bromierung (Br₂/FeBr₃) → Brombenzol', 'Grignard: C₆H₅MgBr', 'CO₂-Addition', 'Hydrolyse → Benzoesäure'],
        },
        {
          id: 'a11-q2',
          prompt: 'Wie wird aus der Benzoesäure das gewünschte N-Methylbenzamid hergestellt? Nenne die Reagenzien und Zwischenstufen.',
          hint: 'Carbonsäuren reagieren nicht direkt mit Aminen zu Amiden. Wie aktiviert man die Carbonsäure?',
          expectedTopics: ['Aktivierung mit SOCl₂ → Benzoylchlorid', 'Benzoylchlorid + CH₃NH₂ → N-Methylbenzamid + HCl', 'Amid-Bindung'],
        },
      ],
      aiContext: 'Aufgabe 11 der Prüfung (3 Punkte). Vollständiger Weg: Benzol → (Br₂/FeBr₃) → Brombenzol → (Mg/THF) → C₆H₅MgBr → (+CO₂, dann H₃O⁺) → Benzoesäure → (SOCl₂) → Benzoylchlorid → (+CH₃NH₂) → N-Methylbenzamid. Bewerte Vollständigkeit, korrekte Reagenzien, und ob der Grignard-Weg korrekt beschrieben ist.',
    },
  },

  // ============================================================
  // AUFGABE 12: Mehrstufensynthese mit Ozonolyse (3 Punkte) – CaseStudy
  // ============================================================
  {
    id: 'aufgabe-12',
    nummer: 12,
    titel: 'Mehrstufensynthese mit Ozonolyse',
    punkte: 3,
    typ: 'case-study',
    data: {
      id: 'a12-casestudy',
      title: 'Grignard + Ozonolyse + Reduktive Aminierung',
      scenario: 'Ein Keton mit einer terminalen Doppelbindung soll über Grignard-Reaktion, Ozonolyse und reduktive Aminierung in ein sekundäres Amin mit Hydroxylgruppe umgewandelt werden.',
      questions: [
        {
          id: 'a12-q1',
          prompt: 'Erkläre den Ablauf einer Ozonolyse mit DMS (Dimethylsulfid) als Reduktionsmittel. Was passiert mit einer C=C-Doppelbindung?',
          hint: 'Ozonolyse spaltet Doppelbindungen. Was entsteht bei einer terminalen Doppelbindung?',
          expectedTopics: ['O₃ spaltet C=C', 'Ozonid-Zwischenstufe', 'DMS als mildes Reduktionsmittel', 'Terminale Doppelbindung → Formaldehyd + Aldehyd/Keton'],
        },
        {
          id: 'a12-q2',
          prompt: 'Wie kann der bei der Ozonolyse entstandene Aldehyd mittels reduktiver Aminierung in ein sekundäres Amin überführt werden? Gib die Reagenzien an.',
          hint: 'Welches Reagenz bildet mit einem Aldehyd ein Imin?',
          expectedTopics: ['Aldehyd + primäres Amin → Imin (Schiff-Base)', 'NaBH₃CN als selektives Reduktionsmittel', 'Sekundäres Amin als Produkt'],
        },
      ],
      aiContext: 'Aufgabe 12 der Prüfung (3 Punkte). Ozonolyse: O₃ spaltet C=C → Ozonid → reduktive Aufarbeitung mit DMS → Carbonylverbindungen. Terminale Doppelbindung gibt Formaldehyd + Aldehyd/Keton. Reduktive Aminierung: Aldehyd + R-NH₂ → Imin (Schiff-Base) → NaBH₃CN → sekundäres Amin.',
    },
  },

  // ============================================================
  // AUFGABE 13: Synthese + Gasgesetz-Berechnung (6 Punkte) – CaseStudy
  // ============================================================
  {
    id: 'aufgabe-13',
    nummer: 13,
    titel: 'Synthesesequenz mit Berechnung',
    punkte: 6,
    typ: 'case-study',
    svg: 'aufgabe13',
    data: {
      id: 'a13-casestudy',
      title: 'Cumol → Nitril → Amin + Gasgesetz',
      scenario: 'Isopropylbenzol (Cumol, Verbindung A) wird über ein Nitril (B) zum primären Amin (C) umgesetzt. Die Hydrierung von B zu C erfolgt in einem Autoklav (V = 10.0 L) bei 50.0 °C. Der Druck sinkt dabei von 10.0 bar auf 6.2 bar. R = 0.08314 bar·L/(mol·K).',
      questions: [
        {
          id: 'a13-q1',
          prompt: 'Beschreibe die Synthesesequenz von Cumol (A) zum Nitril (B). Welche Zwischenstufen und Reagenzien sind nötig? (2 Punkte)',
          hint: 'Du brauchst Nitrierung, Reduktion, Diazotierung und Sandmeyer als Schlüsselschritte.',
          expectedTopics: ['Nitrierung (HNO₃/H₂SO₄) → Nitro-Cumol', 'Reduktion (H₂/Pd/C) → Amino-Cumol', 'Diazotierung (NaNO₂/HCl, T<5°C) → Diazoniumsalz', 'Sandmeyer mit CuCN (T>5°C) → Nitril'],
        },
        {
          id: 'a13-q2',
          prompt: 'Berechne die Stoffmenge (mol) des verbrauchten Wasserstoffs bei der Hydrierung von B zu C. Verwende das ideale Gasgesetz pV = nRT. (2 Punkte)',
          hint: 'Δp = 10.0 − 6.2 = 3.8 bar. Vergiss nicht: T in Kelvin umrechnen!',
          expectedTopics: ['Δp = 3.8 bar', 'T = 323.15 K', 'n = ΔpV/(RT)', 'n = (3.8 × 10.0) / (0.08314 × 323.15)', 'n ≈ 1.41 mol'],
        },
        {
          id: 'a13-q3',
          prompt: 'Ein Nitril benötigt 2 mol H₂ für die vollständige Reduktion zum primären Amin (R–C≡N + 2 H₂ → R–CH₂–NH₂). Wie viele Gramm des Amins C werden theoretisch gebildet? M(C) = 149.12 g/mol. (2 Punkte)',
          hint: 'Berechne zuerst n(Amin) = n(H₂)/2, dann m = n × M.',
          expectedTopics: ['n(Amin) = n(H₂)/2 = 1.41/2 = 0.707 mol', 'm = n × M = 0.707 × 149.12', 'm ≈ 105.4 g', 'Stöchiometrie 1:2'],
        },
      ],
      aiContext: 'Aufgabe 13 der Prüfung (6 Punkte). Teil a (2 Pt): Sandmeyer-Route Cumol → (HNO₃/H₂SO₄) → Nitrocumol → (H₂/Pd/C) → Aminocumol → (NaNO₂/HCl, T<5°C) → Diazoniumsalz → (CuCN, T>5°C) → Nitril B. Teil b (2 Pt): n(H₂) = ΔpV/(RT) = 3.8×10.0/(0.08314×323.15) = 1.414 mol. Teil c (2 Pt): n(Amin) = 1.414/2 = 0.707 mol, m = 0.707 × 149.12 = 105.4 g. Bewerte Rechenwege streng: korrekte Formel, Einheiten, Einsetzen, Ergebnis.',
    },
  },

  // ============================================================
  // AUFGABE 14: Strichdarstellungen erkennen (2 Punkte) – TrueFalseQuiz + SVGs
  // ============================================================
  {
    id: 'aufgabe-14',
    nummer: 14,
    titel: 'Strichdarstellungen: Amine klassifizieren',
    punkte: 2,
    typ: 'true-false',
    svg: 'aufgabe14',
    data: {
      id: 'a14-truefalse',
      instruction: 'Betrachte die vier Strichdarstellungen (I–IV). Entscheide für jede Aussage, ob sie richtig oder falsch ist. (je 0.5 Punkte)',
      statements: [
        {
          id: 'a14-s1',
          statement: 'Verbindung I ist ein sekundäres Amin.',
          isTrue: true,
          explanation: 'Verbindung I (N-Methylbutylamin) hat am Stickstoff zwei C-Substituenten und ein H-Atom (R₁–NH–R₂). Das macht es zu einem sekundären Amin.',
        },
        {
          id: 'a14-s2',
          statement: 'Verbindung II ist ein sekundäres Amin, da zwei Methylgruppen am Stickstoff gebunden sind.',
          isTrue: false,
          explanation: 'Verbindung II (N,N-Dimethylethylamin) hat DREI C-Substituenten am Stickstoff (2× CH₃ + 1× C₂H₅). Es ist ein tertiäres Amin (R₃N), nicht sekundär. Die Klassifizierung richtet sich nach der Zahl der C-Substituenten am N, nicht nach der Grösse der Reste.',
        },
        {
          id: 'a14-s3',
          statement: 'Verbindung III ist ein Amid und daher praktisch nicht basisch.',
          isTrue: true,
          explanation: 'Verbindung III (Butanamid) hat eine C(=O)–NH₂-Gruppe. Das freie Elektronenpaar des Stickstoffs ist durch Mesomerie mit der Carbonylgruppe delokalisiert, wodurch die Basizität extrem gering ist (pKb ≈ 14).',
        },
        {
          id: 'a14-s4',
          statement: 'Verbindung IV ist ein tertiäres Amin, weil das Stickstoffatom an einem tertiären C-Atom gebunden ist.',
          isTrue: false,
          explanation: 'Verbindung IV (2-Aminobutan) ist ein primäres Amin (R–NH₂). Die Klassifizierung primär/sekundär/tertiär bezieht sich auf die Anzahl der C-Substituenten am Stickstoff, NICHT auf das C-Atom. Hier hat N nur einen C-Substituenten + 2 H → primäres Amin.',
        },
      ],
    },
  },

  // ============================================================
  // AUFGABE 15: Summenformel aus Strichdarstellung (2 Punkte) – OpenReflection + SVGs
  // ============================================================
  {
    id: 'aufgabe-15',
    nummer: 15,
    titel: 'Strichdarstellungen: Summenformel und Analyse',
    punkte: 2,
    typ: 'open-reflection',
    svg: 'aufgabe15',
    data: {
      id: 'a15-reflection',
      question: 'Bestimme für beide dargestellten Verbindungen (X und Y) die Summenformel. Zähle dazu alle C-, H-, N- und O-Atome systematisch ab. Vergiss die impliziten H-Atome nicht! Benenne ausserdem die funktionellen Gruppen, die in jeder Verbindung enthalten sind.',
      aiContext: 'Aufgabe 15 (2 Punkte, je 1 pro Verbindung). Verbindung X: 4-Amino-2-pentanon. Skelettformel zeigt 5 C-Atome in Zickzack, C=O an C2, NH₂ an C4. Summenformel: C₅H₁₁NO. Systematisch: C1(3H) + C2(0H, =O) + C3(2H) + C4(1H, NH₂) + C5(3H) = 5C, 11H, 1N, 1O. Funktionelle Gruppen: Ketogruppe (C=O) und primäre Aminogruppe (–NH₂). Verbindung Y: N-Ethyl-3-aminophenol. Benzolring (6C) + OH an C1 + NH an C3 + Ethylkette (2C) am N. Summenformel: C₈H₁₁NO. Systematisch: Ring 6C (4 ring-H, da 2 Positionen substituiert) + Ethyl 2C(5H) + NH(1H) + OH(1H) = 8C, 11H, 1N, 1O. Funktionelle Gruppen: Phenolgruppe (Ar–OH), sekundäre Aminogruppe (Ar–NH–R). Bewerte: korrekte Summenformeln (je 0.5 Pt) und korrekte funktionelle Gruppen (je 0.5 Pt).',
      hint: 'Denke daran: In Strichdarstellungen sind C-Atome an jedem Knick und Ende implizit. Jedes C-Atom braucht 4 Bindungen – fehlende werden mit H aufgefüllt.',
    },
  },
];
