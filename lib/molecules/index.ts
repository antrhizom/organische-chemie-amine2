// SVG Structural Formulas for the Amine Exam
// Zigzag skeletal structures with labeled functional groups

// ============================================================
// AUFGABE 1: Siedepunkte (4 Verbindungen)
// ============================================================

// A: Hexylamin (CH₃(CH₂)₅NH₂) — primäres Amin, Sdp. 131°C
export const hexylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" width="280" height="80">
  <line x1="10" y1="55" x2="40" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="35" x2="70" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="55" x2="100" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="35" x2="130" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="130" y1="55" x2="160" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="35" x2="190" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="190" y1="55" x2="210" y2="42" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="212" y="47" font-family="sans-serif" font-size="16" fill="#2563eb" font-weight="bold">NH₂</text>
</svg>`;

// B: Heptan (C₇H₁₆) — Alkan, Sdp. 98°C
export const heptanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
  <line x1="10" y1="55" x2="40" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="35" x2="70" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="55" x2="100" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="35" x2="130" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="130" y1="55" x2="160" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="35" x2="190" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// C: 3-Ethylpentan — verzweigter Alkan, Sdp. 93°C
export const ethylpentanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  <line x1="10" y1="60" x2="40" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="40" x2="70" y2="60" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="60" x2="100" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="40" x2="130" y2="60" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="130" y1="60" x2="160" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Ethyl branch at C3 -->
  <line x1="100" y1="40" x2="100" y2="15" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="15" x2="125" y2="8" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// D: Triethylamin (Et₃N) — tertiäres Amin, Sdp. 89°C
export const triethylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 100" width="180" height="100">
  <text x="85" y="55" font-family="sans-serif" font-size="16" fill="#2563eb" font-weight="bold" text-anchor="middle">N</text>
  <!-- Ethyl 1: top-left -->
  <line x1="78" y1="45" x2="55" y2="28" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="55" y1="28" x2="25" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Ethyl 2: top-right -->
  <line x1="92" y1="45" x2="115" y2="28" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="115" y1="28" x2="145" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Ethyl 3: bottom -->
  <line x1="85" y1="60" x2="85" y2="85" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="85" y1="85" x2="115" y2="92" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// ============================================================
// AUFGABE 4: IUPAC-Nomenklatur
// ============================================================

// Verbindung 1: 6-Amino-5-hydroxy-3-heptanon
export const nomenklatur1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
  <!-- Main chain C1-C7 -->
  <line x1="10" y1="70" x2="40" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="50" x2="70" y2="70" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="70" x2="100" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="50" x2="130" y2="70" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="130" y1="70" x2="160" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="50" x2="190" y2="70" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="190" y1="70" x2="220" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- C=O at C3 (double bond) -->
  <line x1="100" y1="50" x2="100" y2="20" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <line x1="104" y1="50" x2="104" y2="20" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="95" y="15" font-family="sans-serif" font-size="14" fill="#dc2626" font-weight="bold">O</text>
  <!-- OH at C5 -->
  <line x1="160" y1="50" x2="160" y2="25" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="153" y="20" font-family="sans-serif" font-size="13" fill="#dc2626" font-weight="bold">OH</text>
  <!-- NH₂ at C6 -->
  <line x1="190" y1="70" x2="190" y2="95" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="178" y="110" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
  <!-- Labels -->
  <text x="5" y="85" font-family="sans-serif" font-size="10" fill="#9ca3af">1</text>
  <text x="38" y="42" font-family="sans-serif" font-size="10" fill="#9ca3af">2</text>
  <text x="98" y="83" font-family="sans-serif" font-size="10" fill="#9ca3af">3</text>
  <text x="128" y="42" font-family="sans-serif" font-size="10" fill="#9ca3af">4</text>
  <text x="168" y="55" font-family="sans-serif" font-size="10" fill="#9ca3af">5</text>
  <text x="195" y="65" font-family="sans-serif" font-size="10" fill="#9ca3af">6</text>
  <text x="218" y="42" font-family="sans-serif" font-size="10" fill="#9ca3af">7</text>
</svg>`;

// Verbindung 2: N-Ethyl-N-methyl-3-pentanamin
export const nomenklatur2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 120" width="280" height="120">
  <!-- Main chain: Pentane C1-C5 -->
  <line x1="10" y1="70" x2="40" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="50" x2="70" y2="70" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="70" x2="100" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="50" x2="130" y2="70" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="130" y1="70" x2="160" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- N at C3 -->
  <line x1="100" y1="50" x2="100" y2="25" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="94" y="20" font-family="sans-serif" font-size="14" fill="#2563eb" font-weight="bold">N</text>
  <!-- N-Methyl -->
  <line x1="94" y1="12" x2="70" y2="5" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <text x="45" y="10" font-family="sans-serif" font-size="11" fill="#1f2937">CH₃</text>
  <!-- N-Ethyl -->
  <line x1="106" y1="12" x2="135" y2="5" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="135" y1="5" x2="165" y2="12" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// ============================================================
// AUFGABE 6: Basizitätsreihenfolge (6 Strukturen)
// ============================================================

// Acetamid (CH₃CONH₂)
export const acetamidSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" width="160" height="80">
  <text x="10" y="50" font-family="sans-serif" font-size="13" fill="#1f2937">CH₃</text>
  <line x1="48" y1="45" x2="75" y2="45" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- C=O -->
  <line x1="75" y1="45" x2="75" y2="18" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <line x1="79" y1="45" x2="79" y2="18" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="70" y="14" font-family="sans-serif" font-size="13" fill="#dc2626" font-weight="bold">O</text>
  <!-- NH₂ -->
  <line x1="75" y1="45" x2="105" y2="45" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="108" y="50" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
</svg>`;

// Anilin (C₆H₅NH₂)
export const anilinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100">
  <!-- Benzol ring -->
  <polygon points="50,20 80,10 110,20 110,50 80,60 50,50" fill="none" stroke="#1f2937" stroke-width="2"/>
  <!-- Inner circle for aromaticity -->
  <circle cx="80" cy="35" r="13" fill="none" stroke="#1f2937" stroke-width="1" stroke-dasharray="3,2"/>
  <!-- NH₂ at top -->
  <line x1="80" y1="10" x2="80" y2="-5" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="70" y="-8" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
</svg>`;

// Benzylamin (C₆H₅CH₂NH₂)
export const benzylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100">
  <!-- Benzol ring -->
  <polygon points="40,25 65,15 90,25 90,50 65,60 40,50" fill="none" stroke="#1f2937" stroke-width="2"/>
  <circle cx="65" cy="37" r="12" fill="none" stroke="#1f2937" stroke-width="1" stroke-dasharray="3,2"/>
  <!-- CH₂ bridge -->
  <line x1="90" y1="37" x2="120" y2="37" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH₂ -->
  <line x1="120" y1="37" x2="145" y2="37" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="148" y="42" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
</svg>`;

// Cyclohexylamin (C₆H₁₁NH₂)
export const cyclohexylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100">
  <!-- Cyclohexane ring -->
  <polygon points="50,20 80,10 110,20 110,50 80,60 50,50" fill="none" stroke="#1f2937" stroke-width="2"/>
  <!-- NH₂ at top -->
  <line x1="80" y1="10" x2="80" y2="-5" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="70" y="-8" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
</svg>`;

// Piperidin (6-Ring mit NH)
export const piperidinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100" width="160" height="100">
  <!-- Ring: 5 C + 1 N -->
  <line x1="50" y1="20" x2="80" y2="10" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="80" y1="10" x2="110" y2="20" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="110" y1="20" x2="110" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="110" y1="50" x2="80" y2="60" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="80" y1="60" x2="50" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="50" y1="50" x2="50" y2="20" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH label at top -->
  <text x="72" y="7" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH</text>
</svg>`;

// Diethylamin ((C₂H₅)₂NH)
export const diethylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width="200" height="80">
  <!-- Left ethyl -->
  <line x1="10" y1="50" x2="40" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="35" x2="70" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH -->
  <line x1="70" y1="50" x2="95" y2="38" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="88" y="33" font-family="sans-serif" font-size="14" fill="#2563eb" font-weight="bold">NH</text>
  <!-- Right ethyl -->
  <line x1="108" y1="38" x2="135" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="135" y1="50" x2="165" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// ============================================================
// AUFGABE 7: Basizitätsvergleich
// ============================================================

// Verbindung A: Amin, freies e⁻-Paar NICHT konjugiert (Cyclohexyl-CH₂-NH₂)
export const verbindungASvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100" width="220" height="100">
  <!-- Cyclohexane ring -->
  <polygon points="40,25 65,15 90,25 90,50 65,60 40,50" fill="none" stroke="#1f2937" stroke-width="2"/>
  <!-- CH₂ bridge -->
  <line x1="90" y1="37" x2="120" y2="37" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH₂ -->
  <line x1="120" y1="37" x2="150" y2="37" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="153" y="42" font-family="sans-serif" font-size="14" fill="#2563eb" font-weight="bold">NH₂</text>
</svg>`;

// Verbindung B: Amin, freies e⁻-Paar konjugiert mit C=C (Vinylamin / Allylamin-artig)
export const verbindungBSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 100" width="220" height="100">
  <!-- C=C double bond -->
  <line x1="20" y1="50" x2="60" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="23" y1="55" x2="63" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- C -->
  <line x1="60" y1="35" x2="100" y2="50" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH₂ directly on sp2 C -->
  <line x1="60" y1="35" x2="60" y2="12" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="50" y="8" font-family="sans-serif" font-size="14" fill="#2563eb" font-weight="bold">NH₂</text>
  <!-- CH₃ end -->
  <text x="103" y="55" font-family="sans-serif" font-size="11" fill="#1f2937">CH₃</text>
</svg>`;

// ============================================================
// AUFGABE 8: LSD (vereinfachte Struktur)
// ============================================================

export const lsdSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 220" width="340" height="220">
  <!-- Simplified LSD structure showing the 3 N atoms -->
  <!-- Indole ring system (left) -->
  <polygon points="40,100 60,70 95,60 120,80 120,110 95,130 60,120" fill="none" stroke="#1f2937" stroke-width="2"/>
  <circle cx="85" cy="95" r="15" fill="none" stroke="#1f2937" stroke-width="1" stroke-dasharray="3,2"/>
  <!-- 5-membered ring fused -->
  <line x1="120" y1="80" x2="150" y2="65" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="150" y1="65" x2="160" y2="85" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="160" y1="85" x2="120" y2="110" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- N-H (Indol) — N₁ -->
  <text x="148" y="60" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH</text>
  <text x="148" y="48" font-family="sans-serif" font-size="10" fill="#6366f1">(1) Indol</text>
  <!-- 6-membered ring with N (Piperidin part) — N₂ -->
  <line x1="160" y1="85" x2="190" y2="75" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="190" y1="75" x2="220" y2="90" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="220" y1="90" x2="220" y2="120" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="220" y1="120" x2="190" y2="135" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="190" y1="135" x2="160" y2="120" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- N₂ marker (tert. Amin) -->
  <text x="192" y="70" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">N</text>
  <line x1="202" y1="68" x2="225" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <text x="228" y="55" font-family="sans-serif" font-size="11" fill="#1f2937">CH₃</text>
  <text x="202" y="50" font-family="sans-serif" font-size="10" fill="#6366f1">(2) tert. Amin</text>
  <!-- Amid arm — N₃ -->
  <line x1="120" y1="110" x2="120" y2="145" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- C=O -->
  <line x1="120" y1="145" x2="95" y2="165" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <line x1="117" y1="147" x2="92" y2="167" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="80" y="175" font-family="sans-serif" font-size="13" fill="#dc2626" font-weight="bold">O</text>
  <!-- N-diethyl (amid) -->
  <line x1="120" y1="145" x2="155" y2="160" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="158" y="165" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">N</text>
  <line x1="168" y1="158" x2="195" y2="148" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <text x="198" y="150" font-family="sans-serif" font-size="11" fill="#1f2937">C₂H₅</text>
  <line x1="168" y1="168" x2="195" y2="178" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <text x="198" y="183" font-family="sans-serif" font-size="11" fill="#1f2937">C₂H₅</text>
  <text x="158" y="198" font-family="sans-serif" font-size="10" fill="#6366f1">(3) Amid</text>
</svg>`;

// ============================================================
// AUFGABE 13: Cumol (Isopropylbenzol)
// ============================================================

export const cumolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120" width="180" height="120">
  <!-- Benzol ring -->
  <polygon points="50,40 75,30 100,40 100,65 75,75 50,65" fill="none" stroke="#1f2937" stroke-width="2"/>
  <circle cx="75" cy="52" r="12" fill="none" stroke="#1f2937" stroke-width="1" stroke-dasharray="3,2"/>
  <!-- Isopropyl at top -->
  <line x1="75" y1="30" x2="75" y2="10" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- CH(CH₃)₂ -->
  <line x1="75" y1="10" x2="50" y2="0" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="75" y1="10" x2="100" y2="0" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Labels -->
  <text x="75" y="95" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Cumol (A)</text>
</svg>`;

// ============================================================
// AUFGABE 14: Strichdarstellungen erkennen (4 Amine)
// ============================================================

// I: N-Methylbutylamin (sekundäres Amin) — CH₃NH(CH₂)₃CH₃
export const nMethylbutylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 90" width="240" height="90">
  <!-- Left methyl -->
  <line x1="10" y1="55" x2="40" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH -->
  <line x1="40" y1="35" x2="68" y2="50" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="60" y="62" font-family="sans-serif" font-size="14" fill="#2563eb" font-weight="bold">NH</text>
  <!-- Butyl chain: 4C zigzag -->
  <line x1="78" y1="50" x2="105" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="105" y1="35" x2="135" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="135" y1="55" x2="165" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="165" y1="35" x2="195" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Label -->
  <text x="100" y="82" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">I</text>
</svg>`;

// II: N,N-Dimethylethylamin (tertiäres Amin) — (CH₃)₂N–CH₂CH₃
export const dimethylethylaminSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 110" width="200" height="110">
  <!-- N center -->
  <text x="85" y="55" font-family="sans-serif" font-size="16" fill="#2563eb" font-weight="bold" text-anchor="middle">N</text>
  <!-- Methyl 1 (top-left) -->
  <line x1="78" y1="43" x2="50" y2="22" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Methyl 2 (bottom-left) -->
  <line x1="78" y1="57" x2="50" y2="78" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Ethyl (right) -->
  <line x1="95" y1="50" x2="125" y2="38" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="125" y1="38" x2="155" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Label -->
  <text x="95" y="100" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">II</text>
</svg>`;

// III: Butanamid (Amid) — CH₃CH₂CH₂–C(=O)–NH₂
export const butanamidSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 100" width="260" height="100">
  <!-- Propyl chain -->
  <line x1="10" y1="55" x2="40" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="35" x2="70" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="55" x2="100" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Carbonyl C -->
  <line x1="100" y1="35" x2="130" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- C=O double bond -->
  <line x1="130" y1="55" x2="130" y2="82" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <line x1="134" y1="55" x2="134" y2="82" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="125" y="96" font-family="sans-serif" font-size="13" fill="#dc2626" font-weight="bold">O</text>
  <!-- NH₂ -->
  <line x1="130" y1="55" x2="160" y2="40" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="163" y="42" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
  <!-- Label -->
  <text x="100" y="14" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">III</text>
</svg>`;

// IV: 2-Aminobutan (primäres Amin) — CH₃CH(NH₂)CH₂CH₃
export const aminobutanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 110" width="220" height="110">
  <!-- Butan chain: 4C zigzag -->
  <line x1="10" y1="55" x2="40" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="35" x2="70" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="55" x2="100" y2="35" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="35" x2="130" y2="55" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- NH₂ branch at C2 (position 40,35) -->
  <line x1="70" y1="55" x2="70" y2="82" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="58" y="97" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
  <!-- Label -->
  <text x="70" y="15" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">IV</text>
</svg>`;

// ============================================================
// AUFGABE 15: Summenformel aus Strichdarstellung
// ============================================================

// Verbindung X: 4-Amino-2-pentanon — CH₃–C(=O)–CH₂–CH(NH₂)–CH₃
export const aminopentanonSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 120" width="260" height="120">
  <!-- Pentan chain -->
  <line x1="10" y1="60" x2="40" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="40" y1="40" x2="70" y2="60" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="60" x2="100" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="100" y1="40" x2="130" y2="60" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="130" y1="60" x2="160" y2="40" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- C=O at C2 (position 40,40) -->
  <line x1="40" y1="40" x2="40" y2="12" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <line x1="44" y1="40" x2="44" y2="12" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="35" y="8" font-family="sans-serif" font-size="13" fill="#dc2626" font-weight="bold">O</text>
  <!-- NH₂ at C4 (position 100,40) -->
  <line x1="100" y1="40" x2="100" y2="12" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="88" y="8" font-family="sans-serif" font-size="13" fill="#2563eb" font-weight="bold">NH₂</text>
  <!-- C numbering -->
  <text x="5" y="75" font-family="sans-serif" font-size="10" fill="#9ca3af">1</text>
  <text x="38" y="30" font-family="sans-serif" font-size="10" fill="#9ca3af">2</text>
  <text x="68" y="75" font-family="sans-serif" font-size="10" fill="#9ca3af">3</text>
  <text x="108" y="35" font-family="sans-serif" font-size="10" fill="#9ca3af">4</text>
  <text x="128" y="75" font-family="sans-serif" font-size="10" fill="#9ca3af">5</text>
  <text x="80" y="110" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Verbindung X</text>
</svg>`;

// Verbindung Y: N-Ethyl-3-aminophenol — Phenol ring + NH–CH₂CH₃ substituent
export const aminophenolSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 130" width="260" height="130">
  <!-- Benzol ring -->
  <polygon points="60,30 90,20 120,30 120,60 90,70 60,60" fill="none" stroke="#1f2937" stroke-width="2"/>
  <circle cx="90" cy="45" r="13" fill="none" stroke="#1f2937" stroke-width="1" stroke-dasharray="3,2"/>
  <!-- OH at C1 (position 90,20 = top) -->
  <line x1="90" y1="20" x2="90" y2="2" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
  <text x="82" y="-2" font-family="sans-serif" font-size="13" fill="#dc2626" font-weight="bold">OH</text>
  <!-- NH at C3 (position 120,60 = bottom-right) -->
  <line x1="120" y1="60" x2="148" y2="75" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
  <text x="140" y="88" font-family="sans-serif" font-size="14" fill="#2563eb" font-weight="bold">NH</text>
  <!-- Ethyl on N -->
  <line x1="162" y1="78" x2="185" y2="65" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <line x1="185" y1="65" x2="210" y2="78" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Labels -->
  <text x="90" y="118" font-family="sans-serif" font-size="11" fill="#9ca3af" text-anchor="middle">Verbindung Y</text>
</svg>`;
