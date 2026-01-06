
import { OrixaName, OrixaInfo, TarotCard, LibraryItem, PsychTest } from './types';

export const SPIRITUAL_LIBRARY: LibraryItem[] = [
  { id: "L1", title: "O Livro dos Espíritos", author: "Allan Kardec", category: "Esoterismo", description: "Base filosófica fundamental para o entendimento da mediunidade e das leis divinas.", url: "https://www.febnet.org.br/wp-content/uploads/2012/07/135.pdf" },
  { id: "L2", title: "O Evangelho Segundo o Espiritismo", author: "Allan Kardec", category: "Esoterismo", description: "Explicação das máximas morais do Cristo em concordância com o Espiritismo.", url: "https://www.febnet.org.br/wp-content/uploads/2012/07/136.pdf" },
  { id: "L3", title: "Mitologia dos Orixás", author: "Pesquisa Acadêmica", category: "Candomblé", description: "Compilado de Itãs e lendas tradicionais dos Orixás do panteão iorubá.", url: "https://ia800201.us.archive.org/30/items/LendasDosOrixas/LendasDosOrixas.pdf" },
  { id: "L4", title: "Umbanda: Religião Brasileira", author: "Domínio Público", category: "Umbanda", description: "Estudo sobre a formação e os fundamentos da Umbanda no Brasil.", url: "https://www.repositorio.ufba.br/bitstream/ri/30678/1/Umbanda_Candomble.pdf" },
  { id: "L5", title: "Guia de Ervas Rituais", author: "Botânica Ritual", category: "Botânica Sagrada", description: "Manual prático de ervas para banhos, defumações e fundamentos de axé.", url: "https://www.praiagrande.sp.gov.br/arquivos/cultura/guia_orixas.pdf" },
  { id: "L6", title: "Dogma e Ritual da Alta Magia", author: "Eliphas Levi", category: "Esoterismo", description: "Obra clássica sobre magia cerimonial e ocultismo ocidental.", url: "https://archive.org/details/LeviEliphasDogmaERitualDaAltaMagia" },
  { id: "L7", title: "Introdução ao Jyotish", author: "Sabedoria Indiana", category: "Esoterismo", description: "Estudo sobre a astrologia védica e os mapas rituais kármicos.", url: "https://ia800701.us.archive.org/15/items/jyotish-vedic-astrology/jyotish.pdf" },
  { id: "L8", title: "A Sabedoria do Eneagrama", author: "Riso & Hudson", category: "Psicologia Espiritual", description: "Guia completo para o mapeamento das personalidades e o desenvolvimento espiritual.", url: "https://pt.slideshare.net/slideshow/a-sabedoria-do-eneagrama-don-richard-riso-pdf/252277884" },
  { id: "L9", title: "Quimbanda: O Culto da Lira", author: "Estudos Ocultos", category: "Quimbanda", description: "Análise dos arquétipos de Exus e Pombagiras na Quimbanda tradicional.", url: "https://www.academia.edu/search?q=Quimbanda" },
  { id: "L10", title: "Filosofia Africana", author: "Pensamento Ancestral", category: "Filosofia", description: "Bases ontológicas e cosmológicas de matriz africana.", url: "https://www.scielo.br/j/ref/a/vTndzHn5QzVfC9L6k4GvDxF/" }
];

export const PSYCH_TESTS: PsychTest[] = [
  {
    id: "archetype_align",
    title: "Sincronia Arquetípica",
    description: "Analisa qual força dos Orixás está mais ativa em seu campo psíquico neste momento.",
    questions: [
      {
        question: "Diante de um conflito ético, qual sua primeira reação?",
        options: [
          { text: "Busco a justiça absoluta e o equilíbrio dos fatos.", score: { Xangô: 10, Oxalá: 5 } },
          { text: "Protejo os meus e busco uma solução pacífica.", score: { Yemanjá: 10, Oxum: 5 } },
          { text: "Enfrento o problema de frente com estratégia.", score: { Ogum: 10, Iansã: 5 } },
          { text: "Analiso as entrelinhas e busco o conhecimento.", score: { Oxóssi: 10, Ossain: 5 } }
        ]
      }
    ]
  },
  {
    id: "shadow_work",
    title: "Mapeamento da Sombra",
    description: "Identifique bloqueios energéticos e potenciais ocultos do seu subconsciente.",
    questions: [
      {
        question: "Como você lida com grandes mudanças imprevistas?",
        options: [
          { text: "Adapto-me rapidamente com entusiasmo.", score: { Iansã: 10, Exu: 5 } },
          { text: "Resisto e busco manter a estrutura antiga.", score: { Xangô: 10, Nanã: 5 } },
          { text: "Reflito profundamente antes de qualquer passo.", score: { Oxalá: 10, Oxóssi: 5 } },
          { text: "Busco apoio emocional no meu círculo íntimo.", score: { Yemanjá: 10, Oxum: 5 } }
        ]
      }
    ]
  }
];

export const ORIXAS_DATA: Record<OrixaName, OrixaInfo> = {
  [OrixaName.Oxala]: { 
    name: OrixaName.Oxala, color: "Branco", hex: "#FFFFFF", element: "Ar / Éter", 
    archetype: "O Pai da Humanidade, senhor da paz e da criação pura.", 
    planet: "Sol", greeting: "Epa Babá!", metal: "Ouro Branco", dayOfWeek: "Sexta-feira",
    characteristics: ["Paz", "Pureza"], personalityTraits: "Calmos e dignos.",
    zodiacConnections: ["Aquário", "Peixes"], gifts: ["Equilíbrio"], 
    herbs: ["Boldo", "Manjericão"], crystal: "Quartzo Branco", 
    iconName: "Sun", offeringSimbol: "Pomba", filter: ["paz"]
  },
  [OrixaName.Ogum]: { 
    name: OrixaName.Ogum, color: "Azul Marinho", hex: "#000080", element: "Ferro", 
    archetype: "O Guerreiro de Caminhos e tecnologia.", 
    planet: "Marte", greeting: "Ogunhê!", metal: "Aço", dayOfWeek: "Terça-feira",
    characteristics: ["Ação", "Lei"], personalityTraits: "Práticos e leais.",
    zodiacConnections: ["Áries"], gifts: ["Resiliência"], 
    herbs: ["Aroeira", "Espada de Ogum"], crystal: "Hematita", 
    iconName: "Hammer", offeringSimbol: "Ferramenta", filter: ["guerra"]
  },
  [OrixaName.Oxum]: { 
    name: OrixaName.Oxum, color: "Dourado", hex: "#FFD700", element: "Cachoeiras", 
    archetype: "Senhora do Amor e Prosperidade.", 
    planet: "Vênus", greeting: "Ora Yê Yê O!", metal: "Ouro", dayOfWeek: "Sábado",
    characteristics: ["Amor", "Diplomacia"], personalityTraits: "Estrategistas doces.",
    zodiacConnections: ["Touro", "Libra"], gifts: ["Magnetismo"], 
    herbs: ["Camomila", "Lírio"], crystal: "Pirita", 
    iconName: "Heart", offeringSimbol: "Abebé", filter: ["amor"]
  },
  [OrixaName.Iansa]: { 
    name: OrixaName.Iansa, color: "Vermelho", hex: "#FF0000", element: "Ventos", 
    archetype: "Senhora das Tempestades e Liberdade.", 
    planet: "Marte", greeting: "Eparrey!", metal: "Cobre", dayOfWeek: "Quarta-feira",
    characteristics: ["Mudança", "Paixão"], personalityTraits: "Independentes.",
    zodiacConnections: ["Sagitário"], gifts: ["Transmutação"], 
    herbs: ["Para-raios", "Pinhão"], crystal: "Granada", 
    iconName: "Wind", offeringSimbol: "Raio", filter: ["vento"]
  },
  [OrixaName.Yemanja]: { 
    name: OrixaName.Yemanja, color: "Azul Claro", hex: "#ADD8E6", element: "Mar", 
    archetype: "A Grande Mãe e Rainha do Mar.", 
    planet: "Lua", greeting: "Odoyá!", metal: "Prata", dayOfWeek: "Sábado",
    characteristics: ["Cuidado", "Psiquismo"], personalityTraits: "Acolhedores.",
    zodiacConnections: ["Câncer"], gifts: ["Intuição"], 
    herbs: ["Alfazema", "Jasmim"], crystal: "Pedra da Lua", 
    iconName: "Waves", offeringSimbol: "Abebé Prata", filter: ["mar"]
  },
  [OrixaName.Xango]: { 
    name: OrixaName.Xango, color: "Marrom", hex: "#8B4513", element: "Pedreiras", 
    archetype: "O Rei da Justiça e da Lei.", 
    planet: "Júpiter", greeting: "Kaô Kabecilê!", metal: "Bronze", dayOfWeek: "Quarta-feira",
    characteristics: ["Justiça", "Equilíbrio"], personalityTraits: "Íntegros.",
    zodiacConnections: ["Leão"], gifts: ["Autoridade"], 
    herbs: ["Quebra-pedra", "Levante"], crystal: "Olho de Tigre", 
    iconName: "Scale", offeringSimbol: "Machado", filter: ["justiça"]
  },
  [OrixaName.Exu]: { 
    name: OrixaName.Exu, color: "Preto", hex: "#222222", element: "Terra / Encruza", 
    archetype: "O Mensageiro dinâmico e vital.", 
    planet: "Mercúrio", greeting: "Laroyê!", metal: "Ferro", dayOfWeek: "Segunda-feira",
    characteristics: ["Vigor", "Comunicação"], personalityTraits: "Astutos.",
    zodiacConnections: ["Escorpião"], gifts: ["Sucesso"], 
    herbs: ["Pimenta", "Urtiga"], crystal: "Turmalina Negra", 
    iconName: "Zap", offeringSimbol: "Ogó", filter: ["comunicação"]
  },
  [OrixaName.Oxossi]: { 
    name: OrixaName.Oxossi, color: "Verde", hex: "#008000", element: "Matas", 
    archetype: "O Caçador de Conhecimento.", 
    planet: "Júpiter", greeting: "Okê Arô!", metal: "Latão", dayOfWeek: "Quinta-feira",
    characteristics: ["Foco", "Fartura"], personalityTraits: "Observadores.",
    zodiacConnections: ["Sagitário"], gifts: ["Visão"], 
    herbs: ["Guiné", "Samambaia"], crystal: "Quartzo Verde", 
    iconName: "Target", offeringSimbol: "Ofá", filter: ["caça"]
  },
  [OrixaName.Nana]: { 
    name: OrixaName.Nana, color: "Lilás", hex: "#9933FF", element: "Lama", 
    archetype: "A Anciã da Memória Ancestral.", 
    planet: "Saturno", greeting: "Saluba Nanã!", metal: "Chumbo", dayOfWeek: "Sábado",
    characteristics: ["Paciência", "Sabedoria"], personalityTraits: "Sábios.",
    zodiacConnections: ["Capricórnio"], gifts: ["Regeneração"], 
    herbs: ["Manacá", "Avenca"], crystal: "Ametista", 
    iconName: "Moon", offeringSimbol: "Ibiri", filter: ["ancestral"]
  },
  [OrixaName.Obaluaie]: { 
    name: OrixaName.Obaluaie, color: "Palha", hex: "#E3C985", element: "Terra", 
    archetype: "O Senhor da Cura.", 
    planet: "Saturno", greeting: "Atotô!", metal: "Prata Velha", dayOfWeek: "Segunda-feira",
    characteristics: ["Cura", "Silêncio"], personalityTraits: "Resilientes.",
    zodiacConnections: ["Virgem"], gifts: ["Saúde"], 
    herbs: ["Babosa", "Canela de Velho"], crystal: "Quartzo Fumê", 
    iconName: "ShieldCheck", offeringSimbol: "Xaxará", filter: ["cura"]
  },
  [OrixaName.Ibeji]: { 
    name: OrixaName.Ibeji, color: "Rosa", hex: "#FFC0CB", element: "Dualidade", 
    archetype: "A Alegria do Renascimento.", 
    planet: "Mercúrio", greeting: "Oni Beijada!", metal: "Estanho", dayOfWeek: "Domingo",
    characteristics: ["Alegria", "Nascimento"], personalityTraits: "Otimistas.",
    zodiacConnections: ["Gêmeos"], gifts: ["Sorte"], 
    herbs: ["Alecrim", "Melissa"], crystal: "Quartzo Rosa", 
    iconName: "Sparkles", offeringSimbol: "Doces", filter: ["alegria"]
  },
  [OrixaName.Ossain]: { 
    name: OrixaName.Ossain, color: "Verde Escuro", hex: "#2E8B57", element: "Folhas", 
    archetype: "O Mestre da Botânica Sagrada.", 
    planet: "Saturno", greeting: "Ewê Ewê!", metal: "Latão", dayOfWeek: "Quinta-feira",
    characteristics: ["Segredo", "Ciência"], personalityTraits: "Discretos.",
    zodiacConnections: ["Virgem"], gifts: ["Medicina"], 
    herbs: ["Peregum", "Guiné"], crystal: "Esmeralda", 
    iconName: "Leaf", offeringSimbol: "Ofá", filter: ["ervas"]
  }
};

export const BRAZIL_STATES: Record<string, { orixa: string, reason: string, element: string }> = {
  "AC": { orixa: "Oxóssi / Ossain", element: "Matas", reason: "Solo de floresta densa e segredos vegetais." },
  "AL": { orixa: "Yemanjá", element: "Mar", reason: "Litoral de águas claras e amparo maternal." },
  "AP": { orixa: "Oxóssi", element: "Matas", reason: "Fronteira preservada e fartura natural." },
  "AM": { orixa: "Ossain / Oxóssi", element: "Florestas", reason: "Coração da botânica sagrada mundial." },
  "BA": { orixa: "Yemanjá / Iansã", element: "Mar / Vento", reason: "Berço da ancestralidade e das águas profundas." },
  "CE": { orixa: "Yemanjá / Oxum", element: "Mar / Rios", reason: "Encontro do mar com a doçura das fontes sertanejas." },
  "DF": { orixa: "Xangô", element: "Pedreiras / Lei", reason: "Eixo central da justiça e do poder nacional." },
  "ES": { orixa: "Yemanjá / Ogum", element: "Mar / Ferro", reason: "Equilíbrio entre o mar e as montanhas de minério." },
  "GO": { orixa: "Oxóssi / Xangô", element: "Cerrado", reason: "Solo de caça e justiça nas chapadas." },
  "MA": { orixa: "Iansã / Oxum", element: "Ventos / Águas", reason: "Misticismo dos ventos e lençóis de águas doces." },
  "MT": { orixa: "Oxóssi", element: "Pantanal", reason: "Domínio da caça e do equilíbrio natural." },
  "MS": { orixa: "Oxóssi / Ogum", element: "Terra", reason: "Solo fértil e caminhos de expansão." },
  "MG": { orixa: "Xangô", element: "Minério / Pedra", reason: "Estrutura e justiça nas montanhas de ferro." },
  "PA": { orixa: "Oxum", element: "Água Doce", reason: "Majestade das águas fluviais amazônicas." },
  "PB": { orixa: "Yemanjá / Iansã", element: "Litoral", reason: "Onde o sol nasce primeiro no vigor do mar." },
  "PR": { orixa: "Oxóssi / Ogum", element: "Pinhais", reason: "Trabalho e precisão nas matas de araucária." },
  "PE": { orixa: "Xangô / Yemanjá", element: "Justiça / Mar", reason: "Equilíbrio do direito com a força do oceano." },
  "PI": { orixa: "Xangô", element: "Sol / Pedra", reason: "Calor intenso e justiça nas formações rochosas." },
  "RJ": { orixa: "Ogum / Yemanjá", element: "Mar / Montanha", reason: "Equilíbrio entre a lei e o amparo maternal." },
  "RN": { orixa: "Yemanjá / Iansã", element: "Dunas", reason: "Ventos fortes sobre as águas litorâneas." },
  "RS": { orixa: "Nanã / Obaluaie", element: "Lama / Terra", reason: "Frio e ancestralidade das raízes do sul." },
  "RO": { orixa: "Oxóssi", element: "Matas", reason: "Bravura dos desbravadores da floresta." },
  "RR": { orixa: "Oxalá", element: "Monte Roraima", reason: "Zênite espiritual das montanhas sagradas." },
  "SC": { orixa: "Yemanjá / Ogum", element: "Mar", reason: "Vigor do mar e disciplina do trabalho." },
  "SP": { orixa: "Ogum", element: "Aço / Ferro", reason: "Centro tecnológico e de caminhos de ferro." },
  "SE": { orixa: "Oxum", element: "Rio São Francisco", reason: "A doçura do rio que banha o menor solo." },
  "TO": { orixa: "Oxóssi / Xangô", element: "Cerrado", reason: "Novo horizonte de justiça e fartura." }
};

export const TAROT_DECK: TarotCard[] = [
  { id: 1, name: "O Mago", arcana: "Major", meaning: "Poder de manifestação.", orixaConnection: "Exu", image: "Zap" },
  { id: 2, name: "A Sacerdotisa", arcana: "Major", meaning: "Intuição.", orixaConnection: "Nanã", image: "Moon" },
  { id: 3, name: "A Imperatriz", arcana: "Major", meaning: "Abundância.", orixaConnection: "Oxum", image: "Heart" },
  { id: 4, name: "O Imperador", arcana: "Major", meaning: "Autoridade.", orixaConnection: "Xangô", image: "Scale" },
  { id: 5, name: "O Hierofante", arcana: "Major", meaning: "Tradição.", orixaConnection: "Oxalá", image: "Sun" },
  { id: 6, name: "Os Enamorados", arcana: "Major", meaning: "Escolha.", orixaConnection: "Oxum", image: "Heart" },
  { id: 7, name: "O Carro", arcana: "Major", meaning: "Vitória.", orixaConnection: "Ogum", image: "Hammer" },
  { id: 8, name: "A Justiça", arcana: "Major", meaning: "Equilíbrio.", orixaConnection: "Xangô", image: "Scale" },
  { id: 9, name: "O Eremita", arcana: "Major", meaning: "Introspecção.", orixaConnection: "Oxalá", image: "Sun" },
  { id: 10, name: "A Roda da Fortuna", arcana: "Major", meaning: "Ciclos.", orixaConnection: "Iansã", image: "Wind" }
];

export const ZODIAC_SIGNS = [
  { name: "Áries", start: "03-21", end: "04-19", element: "Fogo" },
  { name: "Touro", start: "04-20", end: "05-20", element: "Terra" },
  { name: "Gêmeos", start: "05-21", end: "06-20", element: "Ar" },
  { name: "Câncer", start: "06-21", end: "07-22", element: "Água" },
  { name: "Leão", start: "07-23", end: "08-22", element: "Fogo" },
  { name: "Virgem", start: "08-23", end: "09-22", element: "Terra" },
  { name: "Libra", start: "09-23", end: "10-22", element: "Ar" },
  { name: "Escorpião", start: "10-23", end: "11-21", element: "Água" },
  { name: "Sagitário", start: "11-22", end: "12-21", element: "Fogo" },
  { name: "Capricórnio", start: "12-22", end: "01-19", element: "Terra" },
  { name: "Aquário", start: "01-20", end: "02-18", element: "Ar" },
  { name: "Peixes", start: "02-19", end: "03-20", element: "Água" }
];

export const NUMEROLOGY_MAP: Record<number, string> = {
  1: "LIDERANÇA: Pioneirismo.",
  2: "HARMONIA: Dualidade.",
  3: "EXPRESSÃO: Comunicação.",
  4: "ESTRUTURA: Trabalho.",
  5: "MUDANÇA: Liberdade.",
  6: "EQUILÍBRIO: Amor.",
  7: "INTUIÇÃO: Busca espiritual.",
  8: "PODER: Realização material.",
  9: "SABEDORIA: Conclusão."
};
