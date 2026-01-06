

export enum OrixaName {
  Oxala = "Oxalá",
  Nana = "Nanã",
  Obaluaie = "Obaluaiê",
  Iansa = "Iansã",
  Ogum = "Ogum",
  Oxossi = "Oxóssi",
  Yemanja = "Yemanjá",
  Oxum = "Oxum",
  Xango = "Xangô",
  Exu = "Exu",
  Ibeji = "Ibeji",
  Ossain = "Ossain"
}

export interface OrixaInfo {
  name: OrixaName;
  color: string;
  hex: string;
  element: string;
  archetype: string;
  planet: string;
  greeting: string;
  metal: string;
  dayOfWeek: string;
  characteristics: string[];
  personalityTraits: string;
  zodiacConnections: string[];
  gifts: string[];
  herbs: string[];
  crystal: string;
  iconName: string;
  offeringSimbol: string;
  filter: string[];
}

export interface TarotCard {
  id: number;
  name: string;
  arcana: string;
  meaning: string;
  orixaConnection: string;
  image: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  // Added "Psicologia Espiritual" to the allowed categories to match the data in constants.tsx
  category: "Umbanda" | "Candomblé" | "Quimbanda" | "Esoterismo" | "Filosofia" | "Botânica Sagrada" | "Psicologia Espiritual";
  description: string;
  url: string;
}

export interface PsychTest {
  id: string;
  title: string;
  description: string;
  questions: {
    question: string;
    options: {
      text: string;
      score: Record<string, number>;
    }[];
  }[];
}

export interface UserData {
  name: string;
  email: string;
  birthDate: string;
  birthTime: string;
  city: string;
  state: string;
  guardianAngelName?: string;
  guardianAngelQuality?: string;
  guardianAngelHierarchy?: string;
}

export interface Forecast {
  daily: string;
  weekly: string;
  timestamp: string;
}

export interface GroundingLink {
  uri: string;
  title: string;
}

export interface GlobalMatrix {
  head: OrixaInfo;
  front: OrixaInfo;
  hourOrixa: OrixaInfo;
  soil: {
    name: string;
    reason: string;
    element: string;
    cityVibe: string;
    cityFrequency: string;
  };
  astro: {
    sunSign: string;
    ascendant: string;
    moonPhase: string;
    element: string;
    moonIcon: string;
    mercury: string;
    venus: string;
    mars: string;
  };
  numerology: {
    expression: number;
    soulUrge: number;
    personality: number;
    mission: string;
    lifePath: number;
  };
  angel: {
    name: string;
    quality: string;
    hierarchy: string;
  };
  guardianAngelName: string;
  guardianAngelQuality: string;
  guardianAngelHierarchy: string;
  transitHarmony: number;
  bioAxe: {
    physical: number;
    emotional: number;
    spiritual: number;
  };
  currentMoonSync: string;
  dailyAxeIndex: number;
  forecast?: Forecast;
}