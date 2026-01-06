
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, Sun, Moon, Zap, Wind, Hammer, 
  Target, Waves, Heart, Scale, ShieldCheck, Compass, 
  Cpu, Leaf, MessageSquare, 
  Scan, Share2, BookOpen, Layers, FlaskConical, ExternalLink,
  ClipboardCheck, RefreshCcw, User, Globe, Activity, X,
  ArrowRight, Calendar, Flame, Music, Gem, BookMarked, Clock,
  Save, Trash2, Download, Shield, Map, Star, ZapOff, Copy, Check,
  Navigation, Store, Search, LayoutGrid, Info, ChevronRight, Binary
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { UserData, GlobalMatrix, TarotCard, OrixaInfo, LibraryItem, PsychTest, Forecast, GroundingLink } from './types';
import { calculateGlobalMatrix } from './logic';
import { BRAZIL_STATES, TAROT_DECK, SPIRITUAL_LIBRARY, PSYCH_TESTS, ZODIAC_SIGNS } from './constants';

const IconMap: Record<string, React.ElementType> = {
  Sun, Zap, Wind, Hammer, Target, Waves, Heart, Scale, Moon, Compass, Leaf, MessageSquare, Sparkles, ShieldCheck, Flame, Music, Gem, Clock, Shield, Star
};

const OrixaIcon = ({ name, className, size = 24, style }: { name: string, className?: string, size?: number, style?: React.CSSProperties }) => {
  const Icon = IconMap[name] || Sparkles;
  return <Icon className={className} size={size} style={style} />;
};

const FrequencyVisualizer = ({ active, color = "cyan" }: { active: boolean, color?: string }) => (
  <div className="flex items-end justify-center gap-1.5 h-10">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className={`w-1 rounded-full transition-all duration-300 ${active ? 'animate-bounce' : 'h-1'}`}
        style={{
          backgroundColor: active ? color : 'rgba(255,255,255,0.05)',
          height: active ? `${30 + Math.random() * 70}%` : '4px',
          animationDuration: `${0.5 + Math.random() * 0.5}s`,
          animationDelay: `${i * 0.03}s`
        }}
      />
    ))}
  </div>
);

const AstroWheel = ({ astro }: { astro: GlobalMatrix['astro'] }) => {
  const signs = ZODIAC_SIGNS.map(s => s.name);
  const getAngle = (signName: string) => (signs.indexOf(signName) * 30) - 90;

  const planets = useMemo(() => [
    { name: 'Sol', sign: astro.sunSign, icon: Sun, color: '#fbbf24' },
    { name: 'Asc', sign: astro.ascendant, icon: Compass, color: '#22d3ee' },
    { name: 'Merc', sign: astro.mercury, icon: MessageSquare, color: '#34d399' },
    { name: 'Lua', sign: astro.sunSign, icon: Moon, color: '#cbd5e1' }, 
  ], [astro]);

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-8 group">
      <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-1000 group-hover:rotate-3">
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="0.5" />
        {signs.map((sign, i) => {
          const angle = i * 30 - 75;
          const x = 50 + 44 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 44 * Math.sin((angle * Math.PI) / 180);
          return (
            <text key={sign} x={x} y={y} fontSize="1.8" fill="rgba(0, 229, 255, 0.3)" textAnchor="middle" className="font-futuristic" transform={`rotate(${angle + 90}, ${x}, ${y})`}>
              {sign.substring(0, 3).toUpperCase()}
            </text>
          );
        })}
        {planets.map((p, idx) => {
          const angle = getAngle(p.sign) + (idx * 5 - 10);
          const x = 50 + 38 * Math.cos((angle * Math.PI) / 180);
          const y = 50 + 38 * Math.sin((angle * Math.PI) / 180);
          return (
            <g key={p.name}>
              <line x1="50" y1="50" x2={x} y2={y} stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.2" />
              <circle cx={x} cy={y} r="2.2" fill={p.color} className="opacity-70 filter blur-[0.5px]" />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="bg-cyan-500/10 p-5 rounded-full border border-cyan-500/20 backdrop-blur-xl animate-pulse">
          <Binary className="text-cyan-400" size={24} />
        </div>
      </div>
    </div>
  );
};

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
  neonColor?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", title = "", onClick, neonColor = "cyan" }) => (
  <div 
    onClick={onClick}
    className={`glass rounded-3xl p-6 relative overflow-hidden transition-all duration-500 border border-white/5 group glass-shine ${onClick ? 'cursor-pointer hover:border-white/20 active:scale-[0.98]' : ''} ${className}`}
  >
    {title && (
      <h3 className="text-[10px] font-futuristic text-white/50 mb-6 flex items-center gap-2 uppercase tracking-widest">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-cyan-400" />
        {title}
      </h3>
    )}
    {children}
  </div>
);

const App: React.FC = () => {
  const [matrix, setMatrix] = useState<GlobalMatrix | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<'matrix' | 'grimorio' | 'lab' | 'nearby'>('matrix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [wiki, setWiki] = useState<OrixaInfo | null>(null);
  const [ritualMsg, setRitualMsg] = useState<string | null>(null);
  const [isLoadingRitual, setIsLoadingRitual] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);
  const [isLoadingNearby, setIsLoadingNearby] = useState(false);
  const [tarotDraw, setTarotDraw] = useState<TarotCard | null>(null);
  const [testResults, setTestResults] = useState<Record<string, number> | null>(null);
  const [activeTest, setActiveTest] = useState<PsychTest | null>(null);
  const [ritualCategory, setRitualCategory] = useState<string>('Limpeza e Purificação');
  const [copied, setCopied] = useState(false);
  const [nearbyResults, setNearbyResults] = useState<string>("");
  const [nearbyLinks, setNearbyLinks] = useState<GroundingLink[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('matriz_ancestral_v8.5');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setMatrix(calculateGlobalMatrix(parsed));
    }
  }, []);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData(e.currentTarget);
    const newUser: UserData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      birthDate: formData.get('birthDate') as string,
      birthTime: formData.get('birthTime') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
    };
    setTimeout(() => {
      localStorage.setItem('matriz_ancestral_v8.5', JSON.stringify(newUser));
      setUser(newUser);
      setMatrix(calculateGlobalMatrix(newUser));
      setIsProcessing(false);
    }, 2800);
  };

  const getNearbySpiritualEnergy = async () => {
    setIsLoadingNearby(true);
    setNearbyResults("");
    setNearbyLinks([]);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Localize terreiros de Umbanda, Candomblé, Quimbanda e lojas de artigos religiosos num raio de 10km. Descreva brevemente a vibe espiritual do local. Use grounding para endereços reais.",
          config: {
            tools: [{ googleSearch: {} }],
          },
        });
        setNearbyResults(response.text || "Sem sinal de axé próximo.");
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
          setNearbyLinks(chunks.filter((c: any) => c.web).map((c: any) => ({ uri: c.web.uri, title: c.web.title || "Localizar" })));
        }
      } catch (err) {
        setNearbyResults("Erro na conexão com as redes terrestres.");
      } finally {
        setIsLoadingNearby(false);
      }
    });
  };

  const generateForecast = async () => {
    if (!matrix || !user) return;
    setIsLoadingForecast(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Gere previsão espiritual curta para ${user.name}, filho de ${matrix.head.name}, Sol em ${matrix.astro.sunSign}.`,
      });
      const resText = response.text || "";
      setMatrix(prev => prev ? { ...prev, forecast: { daily: resText, weekly: resText.substring(0, 100), timestamp: new Date().toLocaleTimeString() } } : null);
    } finally {
      setIsLoadingForecast(false);
    }
  };

  const generateRitual = async () => {
    if (!matrix || !user) return;
    setIsLoadingRitual(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Como um Engenheiro de Software Full-Stack e Especialista em Teologia Umbandista Afrofuturista, gere um protocolo ritualístico detalhado para ${user.name}.
        
        Parâmetros de Entrada:
        - Objetivo: ${ritualCategory}
        - Regente de Cabeça: ${matrix.head.name}
        - Elemento: ${matrix.head.element}
        - Ervas Sugeridas: ${matrix.head.herbs.join(', ')}
        - Cristal Base: ${matrix.head.crystal}
        
        O protocolo deve conter:
        1. "Sincronização de Ambiente" (Preparação do local).
        2. "Fitoenergética Digital" (Instruções detalhadas para o banho de ervas, temperatura, intenção e descarte).
        3. "Mapeamento de Cristais" (Como posicionar e consagrar o ${matrix.head.crystal}).
        4. "Frequência de Ressonância" (Sugestão de música Hz e por que essa frequência específica ajuda na conexão com ${matrix.head.name}).
        5. "Oração de Iniciação" (Um texto para ser recitado).
        
        Mantenha um tom solene, tecnológico e profundamente espiritual. Use Markdown para estrutura.`,
      });
      setRitualMsg(response.text || "Grimório indisponível.");
    } finally {
      setIsLoadingRitual(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020205] text-cyan-400 font-futuristic p-8">
        <Scan className="animate-spin text-cyan-500 mb-8" size={80} />
        <h2 className="text-2xl tracking-[1.2em] animate-pulse">SINCRO-DNA ATIVO</h2>
      </div>
    );
  }

  if (!matrix) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020205] p-6">
        <GlassCard className="max-w-xl w-full border border-cyan-500/20">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black font-futuristic bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">MATRIZ ANCESTRAL</h1>
            <p className="text-xs uppercase tracking-[0.5em] text-cyan-300/30 mt-2">v8.5 Cyber-Terreiro</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            <input required name="name" placeholder="NOME COMPLETO" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-cyan-500 transition-all font-secondary text-lg" />
            <div className="grid grid-cols-2 gap-4">
              <input required name="birthDate" type="date" className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none font-secondary" />
              <input required name="birthTime" type="time" className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none font-secondary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input required name="city" placeholder="CIDADE" className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none font-secondary" />
              <select name="state" className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none font-secondary">
                {Object.keys(BRAZIL_STATES).sort().map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </div>
            <button className="w-full bg-cyan-600 hover:bg-cyan-500 p-6 rounded-2xl font-futuristic text-sm tracking-[0.5em] uppercase transition-all flex items-center justify-center gap-3">
              <Zap size={20} /> Iniciar Iniciação
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 font-sans relative pb-40">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ background: `radial-gradient(circle at center, ${matrix.head.hex}, transparent 80%)` }} />
      
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full p-2 shadow-2xl">
        {[
          { id: 'matrix', label: 'Matriz', icon: Layers },
          { id: 'grimorio', label: 'Grimório', icon: BookMarked },
          { id: 'lab', label: 'Psiquê', icon: FlaskConical },
          { id: 'nearby', label: 'Radar', icon: Navigation }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)} 
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-futuristic uppercase transition-all duration-300 ${activeTab === tab.id ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' : 'text-gray-500 hover:text-white'}`}
          >
            <tab.icon size={16}/> <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </nav>

      <header className="max-w-7xl mx-auto p-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
            <Cpu className="text-cyan-400" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black font-futuristic">MATRIZ <span className="text-cyan-500"> ancestral</span></h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">{user?.name} • NODE {user?.city.toUpperCase()}</p>
          </div>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="p-3 bg-white/5 rounded-full hover:text-red-400 transition-all"><RefreshCcw size={18}/></button>
      </header>

      <main className="max-w-7xl mx-auto px-8 relative z-10">
        {activeTab === 'matrix' && (
          <div className="grid md:grid-cols-12 gap-8 animate-fade-in">
            <div className="md:col-span-8 space-y-8">
              <GlassCard 
                className="py-20 text-center border-t-[8px]" 
                style={{ borderTopColor: matrix.head.hex }}
                onClick={() => setWiki(matrix.head)}
              >
                <div className="mx-auto w-24 h-24 rounded-3xl glass flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                  <OrixaIcon name={matrix.head.iconName} size={48} style={{ color: matrix.head.hex }} />
                </div>
                <p className="text-[10px] font-futuristic text-gray-500 tracking-[0.5em] mb-3 uppercase">Regência de Cabeça</p>
                <h2 className="text-6xl font-black font-futuristic text-white tracking-tighter">{matrix.head.name}</h2>
                <div className="flex justify-center gap-4 mt-8">
                  <span className="px-5 py-2 bg-white/5 rounded-full text-[9px] font-futuristic uppercase border border-white/5">{matrix.head.element}</span>
                  <span className="px-5 py-2 bg-white/5 rounded-full text-[9px] font-futuristic uppercase border border-white/5" style={{ color: matrix.head.hex }}>{matrix.head.greeting}</span>
                </div>
              </GlassCard>

              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard title="SINAL DE SOLO (ESTADO)" neonColor="amber">
                  <div className="flex items-center gap-4 mb-4">
                    <Map className="text-amber-500" size={24} />
                    <span className="text-2xl font-black font-futuristic">{BRAZIL_STATES[user?.state || "SP"].orixa}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-secondary italic leading-relaxed">{BRAZIL_STATES[user?.state || "SP"].reason}</p>
                </GlassCard>
                <GlassCard title="FREQUÊNCIA LOCAL" neonColor="indigo">
                  <div className="flex items-center gap-4 mb-4">
                    <Activity className="text-indigo-400" size={24} />
                    <span className="text-2xl font-black font-futuristic">{matrix.soil.cityFrequency}</span>
                  </div>
                  <FrequencyVisualizer active={true} color="rgba(129, 140, 248, 1)" />
                </GlassCard>
              </div>

              <GlassCard title="TENDÊNCIA VIBRACIONAL" neonColor="cyan">
                {matrix.forecast ? (
                  <div className="space-y-4">
                    <p className="text-lg font-secondary text-gray-300 italic">"{matrix.forecast.daily}"</p>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                      <p className="text-[8px] text-gray-600 font-futuristic uppercase">Sync: {matrix.forecast.timestamp}</p>
                      <button onClick={generateForecast} className="text-[9px] font-futuristic text-cyan-400 hover:text-white uppercase flex items-center gap-2">
                        <RefreshCcw size={12}/> Recalibrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={generateForecast} disabled={isLoadingForecast} className="w-full py-10 border-2 border-dashed border-cyan-500/20 rounded-3xl text-cyan-500 hover:bg-cyan-500/5 transition-all font-futuristic uppercase text-[10px] tracking-widest flex flex-col items-center gap-4">
                    {isLoadingForecast ? <RefreshCcw className="animate-spin"/> : <Sparkles size={24}/>} Extrair Previsão
                  </button>
                )}
              </GlassCard>
            </div>

            <div className="md:col-span-4 space-y-8">
              <GlassCard title="SINCRO-CHART" neonColor="cyan">
                <AstroWheel astro={matrix.astro} />
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {['Sol', 'Asc', 'Merc', 'Lua'].map(p => (
                    <div key={p} className="p-3 bg-white/5 rounded-xl border border-white/5">
                      <p className="text-[8px] text-gray-500 uppercase font-futuristic">{p}</p>
                      <p className="text-[10px] text-white font-secondary tracking-widest mt-1">{(matrix.astro as any)[p === 'Sol' ? 'sunSign' : p === 'Asc' ? 'ascendant' : p.toLowerCase()] || matrix.astro.sunSign}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              <GlassCard title="BIO-AXÉ" neonColor="green">
                <div className="space-y-5">
                  {Object.entries(matrix.bioAxe).map(([k, v]) => (
                    <div key={k}>
                      <div className="flex justify-between text-[9px] font-futuristic text-gray-500 uppercase mb-2">
                        <span>{k}</span> <span className="text-green-400">{v}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000" style={{ width: `${v}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'grimorio' && (
          <div className="grid lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-4 space-y-8">
              <GlassCard title="CONFIGURAÇÃO RITUAL" neonColor="purple">
                <div className="space-y-6">
                   <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10 flex items-center gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <OrixaIcon name={matrix.head.iconName} size={20} style={{ color: matrix.head.hex }} />
                      </div>
                      <div>
                        <p className="text-[8px] font-futuristic text-gray-500 uppercase">Filtro de Regência</p>
                        <p className="text-xs font-secondary text-white uppercase">{matrix.head.name}</p>
                      </div>
                   </div>

                  <select 
                    value={ritualCategory}
                    onChange={(e) => setRitualCategory(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white outline-none font-secondary"
                  >
                    <option value="Limpeza e Purificação">Limpeza e Purificação</option>
                    <option value="Prosperidade e Caminhos">Prosperidade e Caminhos</option>
                    <option value="Amor e Equilíbrio">Amor e Equilíbrio</option>
                    <option value="Proteção e Defesa">Proteção e Defesa</option>
                    <option value="Conexão Ancestral">Conexão Ancestral</option>
                  </select>
                  
                  <button 
                    onClick={generateRitual} 
                    disabled={isLoadingRitual}
                    className="w-full py-8 bg-purple-600 hover:bg-purple-500 text-white rounded-3xl font-futuristic text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex flex-col items-center gap-4 shadow-lg shadow-purple-900/30 group"
                  >
                    {isLoadingRitual ? (
                      <RefreshCcw className="animate-spin" size={32} />
                    ) : (
                      <Flame size={32} className="group-hover:scale-110 transition-transform" />
                    )}
                    {isLoadingRitual ? "Codificando..." : "Manifestar Ritual"}
                  </button>
                </div>
              </GlassCard>

              <GlassCard title="REFERÊNCIAS RITUALÍSTICAS" neonColor="cyan" className="hidden lg:block">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Leaf className="text-green-500" size={16} />
                      <span className="text-[10px] text-gray-400 font-secondary uppercase tracking-wider">Ervas: {matrix.head.herbs.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gem className="text-blue-500" size={16} />
                      <span className="text-[10px] text-gray-400 font-secondary uppercase tracking-wider">Cristal: {matrix.head.crystal}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Music className="text-purple-500" size={16} />
                      <span className="text-[10px] text-gray-400 font-secondary uppercase tracking-wider">Freq: 432Hz / 528Hz</span>
                    </div>
                 </div>
              </GlassCard>

              <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[300px]">
                {SPIRITUAL_LIBRARY.slice(0, 5).map(item => (
                  <GlassCard key={item.id} title={item.category} className="p-5">
                    <h4 className="text-sm font-black font-futuristic text-white mb-2">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 mb-4">{item.description}</p>
                    <a href={item.url} target="_blank" className="text-[9px] font-futuristic text-cyan-400 uppercase flex items-center gap-2 hover:text-white">
                      Acessar Obra <ExternalLink size={12}/>
                    </a>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="h-full min-h-[700px] glass rounded-[3rem] border border-white/10 p-12 overflow-y-auto bg-black/50 relative">
                {ritualMsg ? (
                  <div className="animate-fade-in space-y-8">
                    <div className="flex justify-between items-center border-b border-white/5 pb-8">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                           <span className="text-[10px] font-futuristic text-purple-400 uppercase tracking-widest">{ritualCategory}</span>
                        </div>
                        <h3 className="text-4xl font-black font-futuristic text-white tracking-tighter uppercase">PROTOCOLO DE {matrix.head.name.toUpperCase()}</h3>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => { 
                            navigator.clipboard.writeText(ritualMsg); 
                            setCopied(true); 
                            setTimeout(() => setCopied(false), 2000); 
                          }} 
                          className="p-4 bg-white/5 rounded-full border border-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
                          title="Copiar Ritual"
                        >
                          {copied ? <Check size={20} className="text-green-500"/> : <Copy size={20}/>}
                        </button>
                        <button 
                          onClick={() => setRitualMsg(null)} 
                          className="p-4 bg-white/5 hover:bg-red-500/10 rounded-full text-gray-500 transition-all border border-white/5 hover:text-red-400"
                          title="Limpar Grimório"
                        >
                          <Trash2 size={20}/>
                        </button>
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none text-xl font-secondary leading-relaxed text-gray-300 whitespace-pre-wrap selection:bg-purple-500/30">
                      {ritualMsg}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4 text-center">
                       <ShieldCheck className="text-green-500/40" size={40} />
                       <p className="text-[10px] font-futuristic text-gray-600 uppercase tracking-widest">Protocolo Consagrado pela Matriz Ancestral</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-10 py-40">
                    <div className="relative">
                      <BookMarked size={160} className="relative z-10" />
                      <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse" />
                    </div>
                    <p className="text-4xl font-black font-futuristic mt-8 tracking-widest">GRIMÓRIO LATENTE</p>
                    <p className="text-xs font-secondary text-gray-500 mt-4 uppercase tracking-[0.2em]">Aguardando Injeção de Protocolo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lab' && (
          <div className="max-w-5xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-black font-futuristic text-white tracking-tighter">LABORATÓRIO <span className="text-purple-500">PSIQUÊ</span></h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.8em] font-secondary mt-2">Mapeamento Arquetípico</p>
            </div>

            {testResults ? (
              <GlassCard title="RESULTADO SINCRO-SCAN" className="p-16 text-center" neonColor="green">
                <ClipboardCheck size={64} className="text-green-500 mx-auto mb-10" />
                <h3 className="text-4xl font-black font-futuristic text-white mb-10">ASSINATURA DETECTADA</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {Object.entries(testResults).map(([k, v]) => (
                    <div key={k} className="p-8 bg-white/5 rounded-3xl border border-white/10">
                      <p className="text-[10px] text-gray-500 uppercase font-futuristic mb-2">{k}</p>
                      <p className="text-4xl font-black text-white font-futuristic">{v}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setTestResults(null)} className="mt-12 px-12 py-5 bg-white/5 border border-white/10 rounded-full font-futuristic text-[11px] uppercase tracking-widest hover:bg-cyan-600 transition-all">Novo Protocolo</button>
              </GlassCard>
            ) : activeTest ? (
              <GlassCard title="SINCRO-SCAN EM CURSO" className="p-16" neonColor="purple">
                <h3 className="text-3xl font-black font-futuristic text-white mb-12">{activeTest.title}</h3>
                <div className="space-y-12">
                  {activeTest.questions.map((q, idx) => (
                    <div key={idx} className="space-y-6">
                      <p className="text-2xl font-secondary text-gray-200 border-l-4 border-purple-500 pl-6">{q.question}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {q.options.map((opt, oIdx) => (
                          <button key={oIdx} onClick={() => { setTestResults(opt.score); setActiveTest(null); }} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-purple-500/10 hover:border-purple-500/50 transition-all text-left group flex justify-between items-center">
                            <span className="text-lg font-secondary text-gray-300 group-hover:text-white">{opt.text}</span>
                            <ArrowRight size={20} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {PSYCH_TESTS.map(test => (
                  <GlassCard key={test.id} title="PROTOCOLO DISPONÍVEL" className="p-10 hover:scale-[1.02] transition-transform">
                    <h3 className="text-2xl font-black font-futuristic text-white mb-4">{test.title}</h3>
                    <p className="text-gray-400 font-secondary text-lg mb-8">{test.description}</p>
                    <button onClick={() => setActiveTest(test)} className="w-full py-5 bg-purple-700 hover:bg-purple-600 rounded-2xl font-futuristic text-[11px] uppercase tracking-widest transition-all">Iniciar Scan</button>
                  </GlassCard>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'nearby' && (
          <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-5xl font-black font-futuristic text-white tracking-tighter">RADAR DE <span className="text-cyan-500">AXÉ</span></h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.8em] font-secondary mt-2">Geolocalização de Frequências</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <GlassCard title="SISTEMA DE BUSCA" className="h-fit">
                <p className="text-lg text-gray-400 font-secondary italic mb-8 leading-relaxed">"Onde houver um ponto riscado ou um tambor tocando, haverá uma conexão com a Matriz."</p>
                <button 
                  onClick={getNearbySpiritualEnergy} 
                  disabled={isLoadingNearby}
                  className="w-full py-10 bg-cyan-600 hover:bg-cyan-500 text-black rounded-3xl font-futuristic text-[11px] uppercase tracking-widest transition-all flex flex-col items-center gap-4 disabled:opacity-50 group"
                >
                  {isLoadingNearby ? <RefreshCcw className="animate-spin" size={32}/> : <Navigation size={32} className="group-hover:rotate-45 transition-transform" />}
                  {isLoadingNearby ? "Mapeando..." : "Rastrear Pontos"}
                </button>
              </GlassCard>

              <div className="lg:col-span-2">
                <div className="h-full min-h-[500px] glass rounded-[3rem] border border-white/10 p-12 overflow-y-auto bg-black/40">
                  {isLoadingNearby ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-8 py-20">
                      <Navigation size={80} className="text-cyan-500 animate-pulse" />
                      <p className="text-lg font-futuristic uppercase tracking-[0.5em] text-cyan-400 animate-pulse">Descriptografando coordenadas...</p>
                    </div>
                  ) : nearbyResults ? (
                    <div className="animate-fade-in space-y-10">
                      <div className="flex items-center gap-6 border-b border-white/5 pb-8">
                        <div className="p-4 bg-cyan-500/10 rounded-2xl">
                          <Navigation size={28} className="text-cyan-400" />
                        </div>
                        <h3 className="text-3xl font-black font-futuristic text-white tracking-tighter uppercase">Relatório de Proximidade</h3>
                      </div>
                      <div className="text-gray-200 font-secondary text-2xl leading-relaxed whitespace-pre-wrap">
                        {nearbyResults}
                      </div>
                      {nearbyLinks.length > 0 && (
                        <div className="grid md:grid-cols-2 gap-4 mt-8">
                          {nearbyLinks.map((link, idx) => (
                            <a key={idx} href={link.uri} target="_blank" className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all flex items-center justify-between group">
                              <span className="text-xs font-futuristic text-white tracking-widest">{link.title}</span>
                              <ExternalLink size={16} className="text-white/20 group-hover:text-cyan-400" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-10 text-center py-40">
                      <Map size={140} />
                      <p className="text-4xl font-black font-futuristic mt-8 tracking-widest">MAPA INATIVO</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {wiki && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/98 backdrop-blur-3xl animate-fade-in">
          <div className="max-w-4xl w-full glass rounded-[4rem] p-16 border border-white/10 relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setWiki(null)} className="absolute top-12 right-12 p-4 bg-white/5 hover:bg-red-500/10 rounded-full text-gray-500 hover:text-red-400 transition-all">
              <X size={32} />
            </button>
            <div className="flex flex-col md:flex-row gap-16">
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="w-40 h-40 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-white/5">
                  <OrixaIcon name={wiki.iconName} size={80} style={{ color: wiki.hex }} />
                </div>
                <p className="text-[10px] font-futuristic text-gray-600 uppercase mb-2">Saudação</p>
                <p className="text-4xl font-black font-futuristic mb-8" style={{ color: wiki.hex }}>{wiki.greeting}</p>
                <p className="text-[10px] font-futuristic text-gray-600 uppercase mb-2">Planeta</p>
                <p className="text-2xl font-futuristic text-white uppercase">{wiki.planet}</p>
              </div>
              <div className="flex-grow space-y-12">
                <div>
                  <h3 className="text-7xl font-black font-futuristic mb-4 tracking-tighter" style={{ color: wiki.hex }}>{wiki.name}</h3>
                  <p className="text-2xl font-secondary text-cyan-400/60 uppercase tracking-[0.4em] italic leading-tight">{wiki.archetype}</p>
                </div>
                <div className="space-y-8 border-t border-white/5 pt-8">
                  <p className="text-xl font-secondary text-gray-300 leading-relaxed italic border-l-4 border-white/10 pl-8">"{wiki.personalityTraits}"</p>
                  <div className="grid grid-cols-2 gap-8 pt-6">
                    <div>
                      <h4 className="text-[11px] font-futuristic text-gray-500 uppercase mb-4">Materialidades</h4>
                      <p className="text-sm font-secondary text-white">Metal: {wiki.metal}</p>
                      <p className="text-sm font-secondary text-white">Cristal: {wiki.crystal}</p>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-futuristic text-gray-500 uppercase mb-4">Ressonância</h4>
                      <p className="text-sm font-secondary text-white">Dia: {wiki.dayOfWeek}</p>
                      <p className="text-sm font-secondary text-white">Elemento: {wiki.element}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-7xl mx-auto p-24 text-center border-t border-white/5 mt-20 opacity-30">
        <p className="text-[10px] font-futuristic text-gray-600 tracking-[1.5em] uppercase">Deep Soul Engineering • Matriz Ancestral © 2025</p>
      </footer>
    </div>
  );
};

export default App;
