
import { UserData, GlobalMatrix, OrixaName, OrixaInfo } from './types';
import { ORIXAS_DATA, ZODIAC_SIGNS, BRAZIL_STATES, NUMEROLOGY_MAP } from './constants';

const reduceToUnit = (num: number): number => {
  if (num === 0) return 0;
  const sum = String(num).split('').reduce((acc, d) => acc + parseInt(d), 0);
  return sum > 9 ? reduceToUnit(sum) : sum;
};

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; 
  }
  return Math.abs(hash);
};

const getNumerologyData = (name: string) => {
  const table: Record<string, number> = {
    a:1, j:1, s:1, b:2, k:2, t:2, c:3, l:3, u:3, d:4, m:4, v:4, e:5, n:5, w:5, f:6, o:6, x:6, g:7, p:7, y:7, h:8, q:8, z:8, i:9, r:9
  };
  const normalized = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, '');
  
  const vowels = "aeiou";
  let soulSum = 0;
  let personalitySum = 0;
  let expressionSum = 0;

  normalized.split('').forEach(char => {
    const val = table[char] || 0;
    expressionSum += val;
    if (vowels.includes(char)) soulSum += val;
    else personalitySum += val;
  });

  return {
    expression: reduceToUnit(expressionSum),
    soulUrge: reduceToUnit(soulSum),
    personality: reduceToUnit(personalitySum)
  };
};

const calculateBioAxe = (birthDate: string) => {
  const birth = new Date(birthDate).getTime();
  const now = new Date().getTime();
  const days = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
  
  return {
    physical: Math.round(50 + 50 * Math.sin((2 * Math.PI * days) / 23)),
    emotional: Math.round(50 + 50 * Math.sin((2 * Math.PI * days) / 28)),
    spiritual: Math.round(50 + 50 * Math.sin((2 * Math.PI * days) / 33))
  };
};

const getAngelByDate = (day: number, month: number) => {
  const dayOfYear = (month - 1) * 31 + day;
  const index = Math.floor(dayOfYear / 5) % 72;
  
  const angels = [
    { name: "Vehuiah", quality: "Vontade e Empreendedorismo", hierarchy: "Serafins" },
    { name: "Jeliel", quality: "Amor e Sabedoria", hierarchy: "Serafins" },
    { name: "Sitael", quality: "Construção e Expansão", hierarchy: "Serafins" },
    { name: "Elemiah", quality: "Poder Divino", hierarchy: "Serafins" },
    { name: "Mahasiah", quality: "Paz e Retificação", hierarchy: "Serafins" },
    { name: "Lelahel", quality: "Luz e Entendimento", hierarchy: "Serafins" },
    { name: "Achaiah", quality: "Paciência", hierarchy: "Serafins" },
    { name: "Cahetel", quality: "Bênção de Deus", hierarchy: "Serafins" },
    { name: "Haziel", quality: "Misericórdia Divina", hierarchy: "Querubins" },
    { name: "Aladiah", quality: "Graça Divina", hierarchy: "Querubins" },
    { name: "Lauviah", quality: "Vitória e Brilho", hierarchy: "Querubins" },
    { name: "Hahaiah", quality: "Refúgio e Mistério", hierarchy: "Querubins" },
    { name: "Iezalel", quality: "Fidelidade e União", hierarchy: "Querubins" },
    { name: "Mebahel", quality: "Verdade e Justiça", hierarchy: "Querubins" },
    { name: "Hariel", quality: "Purificação", hierarchy: "Querubins" },
    { name: "Hakamiah", quality: "Lealdade", hierarchy: "Querubins" },
    { name: "Lauviah II", quality: "Revelação", hierarchy: "Tronos" },
    { name: "Caliel", quality: "Justiça e Verdade", hierarchy: "Tronos" },
    { name: "Pahaliah", quality: "Redenção", hierarchy: "Tronos" },
    { name: "Nelchael", quality: "Desejo de Aprender", hierarchy: "Tronos" },
    { name: "Ieiaiel", quality: "Fortuna e Renome", hierarchy: "Tronos" },
    { name: "Melahel", quality: "Capacidade de Cura", hierarchy: "Tronos" },
    { name: "Haheuiah", quality: "Proteção", hierarchy: "Tronos" },
    { name: "Nith-Haiah", quality: "Sabedoria Espiritual", hierarchy: "Dominações" },
    { name: "Haaiah", quality: "Ciência Política", hierarchy: "Dominações" },
    { name: "Ierathel", quality: "Confusão dos Inimigos", hierarchy: "Dominações" },
    { name: "Seeheiah", quality: "Vida Longa", hierarchy: "Dominações" },
    { name: "Reiyel", quality: "Libertação", hierarchy: "Dominações" },
    { name: "Omael", quality: "Multiplicação", hierarchy: "Dominações" },
    { name: "Lecabel", quality: "Talento Intelectual", hierarchy: "Dominações" },
    { name: "Vasariah", quality: "Memória e Justiça", hierarchy: "Dominações" },
    { name: "Iehuiah", quality: "Submissão e Ordem", hierarchy: "Potestades" }
  ];
  
  return angels[index % angels.length];
};

export const calculateGlobalMatrix = (data: UserData): GlobalMatrix => {
  const dateParts = data.birthDate.split('-').map(Number);
  const [y, m, d] = dateParts;
  const lifePath = reduceToUnit(dateParts.reduce((acc, n) => acc + n, 0));
  
  const headMapping: Record<number, OrixaName> = {
    1: OrixaName.Oxala, 2: OrixaName.Nana, 3: OrixaName.Obaluaie, 4: OrixaName.Iansa,
    5: OrixaName.Ogum, 6: OrixaName.Oxossi, 7: OrixaName.Yemanja, 8: OrixaName.Oxum, 9: OrixaName.Xango
  };
  const head = ORIXAS_DATA[headMapping[lifePath] || OrixaName.Oxala];

  const birthDay = new Date(data.birthDate + "T12:00:00Z").getUTCDay();
  const frontMapping: Record<number, OrixaName> = {
    0: OrixaName.Nana, 1: OrixaName.Exu, 2: OrixaName.Ogum, 3: OrixaName.Xango,
    4: OrixaName.Oxossi, 5: OrixaName.Oxala, 6: OrixaName.Yemanja
  };
  const front = ORIXAS_DATA[frontMapping[birthDay]];

  const [h, min] = data.birthTime.split(':').map(Number);
  const hourMapping: OrixaName[] = [
    OrixaName.Exu, OrixaName.Ogum, OrixaName.Oxossi, OrixaName.Ossain, 
    OrixaName.Oxum, OrixaName.Yemanja, OrixaName.Oxala, OrixaName.Xango,
    OrixaName.Iansa, OrixaName.Obaluaie, OrixaName.Nana, OrixaName.Ibeji
  ];
  const hourOrixa = ORIXAS_DATA[hourMapping[Math.floor(h / 2) % 12]];

  const stateData = BRAZIL_STATES[data.state] || { orixa: "Oxalá", element: "Ar", reason: "Solo de luz universal." };
  const cityHash = hashString(data.city);
  const cityVibes = ["Vanguarda", "Ancestral", "Efervescente", "Equilibrada", "Resiliente"];
  const cityVibe = cityVibes[cityHash % cityVibes.length];
  const cityFrequency = `${(432 + (cityHash % 100)).toFixed(0)} Hz`;
  
  const soil = { 
    name: stateData.orixa, 
    reason: stateData.reason, 
    element: stateData.element,
    cityVibe: cityVibe,
    cityFrequency: cityFrequency
  };

  const mmdd = `${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const zodiac = ZODIAC_SIGNS.find(z => mmdd >= z.start && mmdd <= z.end) || ZODIAC_SIGNS[9];
  
  // Cálculo de Ascendente simplificado por hora
  const ascIndex = (ZODIAC_SIGNS.findIndex(z => z.name === zodiac.name) + Math.floor((h + min / 60) / 2)) % 12;
  const ascendant = ZODIAC_SIGNS[ascIndex].name;

  // Planetas Pessoais (Lógica de hash baseada na data)
  const planetHash = (d + m + y + h);
  const personalPlanets = ZODIAC_SIGNS;
  
  const numData = getNumerologyData(data.name);
  const angelInfo = getAngelByDate(d, m);

  const today = new Date();
  const dailyAxe = Math.round(75 + Math.sin(today.getDate()) * 15 + (cityHash % 10));

  return {
    head, front, hourOrixa, soil,
    astro: { 
      sunSign: zodiac.name, 
      ascendant: ascendant,
      moonPhase: "Fluxo", 
      element: zodiac.element,
      moonIcon: "Moon",
      mercury: personalPlanets[(planetHash + 3) % 12].name,
      venus: personalPlanets[(planetHash + 5) % 12].name,
      mars: personalPlanets[(planetHash + 7) % 12].name
    },
    numerology: { 
      ...numData,
      mission: NUMEROLOGY_MAP[numData.expression] || "Busca de propósito.",
      lifePath 
    },
    angel: { 
      name: angelInfo.name, 
      quality: angelInfo.quality,
      hierarchy: angelInfo.hierarchy
    },
    guardianAngelName: angelInfo.name,
    guardianAngelQuality: angelInfo.quality,
    guardianAngelHierarchy: angelInfo.hierarchy,
    transitHarmony: 85 + (cityHash % 15),
    bioAxe: calculateBioAxe(data.birthDate),
    currentMoonSync: "Convergente",
    dailyAxeIndex: dailyAxe
  };
};
