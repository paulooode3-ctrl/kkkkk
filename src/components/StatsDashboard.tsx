import React, { useState, useMemo } from 'react';
import { IRIS_DATA, IrisRecord } from '../data/iris';
import { 
  getRawStats, 
  getUngroupedFrequencyTable, 
  getGroupedFrequencyTable, 
  getGroupedStats,
} from '../utils/statistics';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Database, 
  Filter, 
  BarChart3, 
  Table as TableIcon, 
  Calculator,
  Flower2,
  Info,
  TrendingUp,
  Layers,
  Maximize2,
  Code2,
  Terminal,
  X,
  Copy,
  Check,
  Users,
  ChevronDown,
  Presentation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PresentationSlides } from './PresentationSlides';

type Attribute = keyof Omit<IrisRecord, 'species'>;
const ATTRIBUTES: { label: string; value: Attribute; color: string }[] = [
  { label: 'Comprimento da Sépala', value: 'sepalLength', color: '#10b981' }, 
  { label: 'Largura da Sépala', value: 'sepalWidth', color: '#3b82f6' },  
  { label: 'Comprimento da Pétala', value: 'petalLength', color: '#f43f5e' }, 
  { label: 'Largura da Pétala', value: 'petalWidth', color: '#8b5cf6' },  
];

const SPECIES = [
  { label: 'Todas as Espécies', value: 'All', color: 'bg-zinc-900' },
  { label: 'Setosa', value: 'Iris-setosa', color: 'bg-emerald-500' },
  { label: 'Versicolor', value: 'Iris-versicolor', color: 'bg-amber-500' },
  { label: 'Virginica', value: 'Iris-virginica', color: 'bg-rose-500' },
];

const TEAM_MEMBERS = [
  "CLEBERSON DIAS NASCIMENTO",
  "KLEDYSON DANIEL CAMPOS VIANA",
  "MARIA BIATRISSE BEZERRA FERREIRA",
  "MARIA SARAH DA SILVA SOUSA",
  "PAULO VICTOR SILVA CAMPOS",
  "WEVLYNN YASMIM MORAES DE OLIVEIRA"
].sort();

const PYTHON_CODE = `import math
import csv

def ler_csv(caminho):
    dados = []
    try:
        with open(caminho, mode='r', encoding='utf-8') as f:
            leitor = csv.DictReader(f)
            for linha in leitor:
                linha['sepal_length'] = float(linha['sepal_length'])
                linha['sepal_width'] = float(linha['sepal_width'])
                linha['petal_length'] = float(linha['petal_length'])
                linha['petal_width'] = float(linha['petal_width'])
                dados.append(linha)

    except FileNotFoundError:
        print("Arquivo iris.csv não encontrado, usando dados de exemplo.")

        return [
            {'sepal_length': 5.1, 'sepal_width': 3.5, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.9, 'sepal_width': 3.0, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 7.0, 'sepal_width': 3.2, 'petal_length': 4.7, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 6.4, 'sepal_width': 3.2, 'petal_length': 4.5, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 6.3, 'sepal_width': 3.3, 'petal_length': 6.0, 'petal_width': 2.5, 'species': 'virginica'},
            {'sepal_length': 5.8, 'sepal_width': 2.7, 'petal_length': 5.1, 'petal_width': 1.9, 'species': 'virginica'}
        ]

    return dados


def filtrar_especie(dados, opcao):

    if opcao == "4":
        return dados

    mapa = {
        "1": "setosa",
        "2": "versicolor",
        "3": "virginica"
    }

    especie = mapa.get(opcao)

    filtrado = []
    for d in dados:
        if d["species"] == especie:
            filtrado.append(d)

    return filtrado


def calcular_media(v):
    soma = 0
    for x in v:
        soma += x
    return soma / len(v)


def calcular_mediana(v):

    v = sorted(v)
    n = len(v)
    meio = n // 2

    if n % 2 == 0:
        return (v[meio-1] + v[meio]) / 2
    else:
        return v[meio]


def calcular_moda(v):

    contagem = {}

    for x in v:
        contagem[x] = contagem.get(x,0) + 1

    maior = max(contagem.values())

    moda = []

    for k in contagem:
        if contagem[k] == maior:
            moda.append(k)

    return moda


def calcular_variancia(v):

    media = calcular_media(v)

    soma = 0

    for x in v:
        soma += (x - media) ** 2

    return soma / (len(v)-1)


def calcular_desvio(v):

    return math.sqrt(calcular_variancia(v))


def main():

    print("="*50)
    print("UniFacema - Estatística Iris")
    print("="*50)
    print("Equipe:")
    print("- CLEBERSON DIAS NASCIMENTO")
    print("- KLEDYSON DANIEL CAMPOS VIANA")
    print("- MARIA BIATRISSE BEZERRA FERREIRA")
    print("- MARIA SARAH DA SILVA SOUSA")
    print("- PAULO VICTOR SILVA CAMPOS")
    print("- WEVLYNN YASMIM MORAES DE OLIVEIRA")
    print("="*50)

    dados = ler_csv("iris.csv")

    print("\\nEscolha a espécie:")

    print("1 - Iris Setosa")
    print("2 - Iris Versicolor")
    print("3 - Iris Virginica")
    print("4 - Todas")

    especie = input("\\nDigite a opção: ")

    dados = filtrar_especie(dados, especie)

    print("\\nEscolha o atributo:")

    print("1 - Comprimento da Sépala")
    print("2 - Largura da Sépala")
    print("3 - Comprimento da Pétala")
    print("4 - Largura da Pétala")

    atributo = input("\\nDigite a opção: ")

    mapa = {
        "1":"sepal_length",
        "2":"sepal_width",
        "3":"petal_length",
        "4":"petal_width"
    }

    nome = mapa.get(atributo)

    vetor = []

    for d in dados:
        vetor.append(d[nome])

    print("\\nRESULTADOS")
    print("-" * 40)

    print("Quantidade de dados:", len(vetor))
    print("Média:", round(calcular_media(vetor),4))
    print("Mediana:", round(calcular_mediana(vetor),4))
    print("Moda:", calcular_moda(vetor))
    print("Variância:", round(calcular_variancia(vetor),4))
    print("Desvio padrão:", round(calcular_desvio(vetor),4))


if __name__ == "__main__":
    main()`;

const StatsDashboard: React.FC = () => {
  const [selectedAttr, setSelectedAttr] = useState<Attribute>('petalLength');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('All');
  const [showCode, setShowCode] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showSlides, setShowSlides] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAttr = ATTRIBUTES.find(a => a.value === selectedAttr)!;

  const filteredData = useMemo(() => {
    let data = IRIS_DATA;
    if (selectedSpecies !== 'All') {
      data = data.filter(d => d.species === selectedSpecies);
    }
    return data.map(d => d[selectedAttr]);
  }, [selectedAttr, selectedSpecies]);

  const rawStats = useMemo(() => getRawStats(filteredData), [filteredData]);
  const ungroupedTable = useMemo(() => getUngroupedFrequencyTable(filteredData), [filteredData]);
  const groupedTable = useMemo(() => getGroupedFrequencyTable(filteredData), [filteredData]);
  const groupedStats = useMemo(() => getGroupedStats(groupedTable), [groupedTable]);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: number; icon: any }) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white border border-zinc-200 p-6 rounded-xl flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-1.5 rounded bg-zinc-50 border border-zinc-100">
          <Icon className="w-3.5 h-3.5 text-zinc-500" />
        </div>
        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Amostra</span>
      </div>
      <div>
        <p className="text-2xl font-mono font-bold text-zinc-900 tracking-tight">
          {value.toFixed(4)}
        </p>
        <p className="text-[10px] font-sans font-bold text-zinc-500 uppercase tracking-wider mt-1">{title}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-zinc-900 flex flex-col items-center justify-center p-6"
          >
            <div className="max-w-4xl w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-16"
              >
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">Apresenta</span>
                <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none">
                  UNIFACEMA
                </h1>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border-t border-white/10 pt-12">
                {TEAM_MEMBERS.map((member, i) => (
                  <motion.div
                    key={member}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-zinc-600 font-mono text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-white text-sm md:text-base font-medium tracking-tight uppercase">{member}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="mt-20 flex justify-center"
              >
                <button
                  onClick={() => setShowIntro(false)}
                  className="group relative px-8 py-4 bg-white text-zinc-900 rounded-full font-bold text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Explorar Análise</span>
                  <motion.div 
                    className="absolute inset-0 bg-emerald-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  />
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div key="dashboard" className="relative z-10 p-6 md:p-10 max-w-6xl mx-auto">
            <header className="mb-12 border-b border-zinc-100 pb-10">
              <div className="flex justify-between items-center mb-8">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <Flower2 className="w-5 h-5 text-zinc-900" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">UniFacema • Estatística</span>
                </motion.div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSlides(true)}
                    className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-2 hover:bg-emerald-600 shadow-sm"
                  >
                    <Presentation className="w-3 h-3" />
                    Slides
                  </button>
                  <button
                    onClick={() => setShowIntro(true)}
                    className="px-3 py-1.5 hover:bg-zinc-50 text-zinc-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-transparent hover:border-zinc-200 transition-all"
                  >
                    Intro
                  </button>
                  <button
                    onClick={() => setShowTeam(true)}
                    className="px-3 py-1.5 hover:bg-zinc-50 text-zinc-600 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-zinc-200 transition-colors"
                  >
                    Equipe
                  </button>
                  <button
                    onClick={() => setShowCode(true)}
                    className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Código Python
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900"
                >
                  Análise Iris
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-400 block px-1">Dimensão</label>
                    <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200/50">
                      {ATTRIBUTES.map(attr => (
                        <button
                          key={attr.value}
                          onClick={() => setSelectedAttr(attr.value)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 ${
                            selectedAttr === attr.value 
                            ? 'bg-white text-zinc-900 shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-700'
                          }`}
                        >
                          {attr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-400 block px-1">Espécie</label>
                    <div className="inline-flex p-1 bg-zinc-100 rounded-xl border border-zinc-200/50">
                      {SPECIES.map(s => (
                        <button
                          key={s.value}
                          onClick={() => setSelectedSpecies(s.value)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 flex items-center gap-2 ${
                            selectedSpecies === s.value 
                            ? 'bg-white text-zinc-900 shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-700'
                          }`}
                        >
                          {selectedSpecies === s.value && <div className={`w-1.5 h-1.5 rounded-full ${s.color}`} />}
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </header>

            <motion.main 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Média" value={rawStats.mean} icon={Calculator} />
                <StatCard title="Mediana" value={rawStats.median} icon={TrendingUp} />
                <StatCard title="Variância" value={rawStats.variance} icon={Layers} />
                <StatCard title="Desvio Padrão" value={rawStats.stdDev} icon={Maximize2} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.section 
                  variants={itemVariants}
                  className="lg:col-span-2 bg-white rounded-xl p-6 border border-zinc-200"
                >
                  <div className="mb-6">
                    <h2 className="text-lg font-bold text-zinc-900">Distribuição</h2>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Frequência Agrupada (Sturges)</p>
                  </div>

                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={groupedTable}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis 
                          dataKey="label" 
                          fontSize={9} 
                          fontFamily="JetBrains Mono" 
                          tick={{fill: '#71717a'}}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          fontSize={9} 
                          fontFamily="JetBrains Mono" 
                          tick={{fill: '#71717a'}}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          cursor={{ fill: '#f4f4f5' }}
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: '1px solid #e4e4e7',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontFamily: 'JetBrains Mono'
                          }}
                        />
                        <Bar 
                          dataKey="fi" 
                          fill="#18181b" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.section>

                <motion.section 
                  variants={itemVariants}
                  className="bg-zinc-50 rounded-xl p-6 border border-zinc-200"
                >
                  <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">Estimativas Agrupadas</h2>
                  <div className="space-y-6">
                    {[
                      { label: 'Média', value: groupedStats.mean },
                      { label: 'Mediana', value: groupedStats.median },
                      { label: 'Variância', value: groupedStats.variance },
                      { label: 'Desvio Padrão', value: groupedStats.stdDev }
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider mb-1">{stat.label}</p>
                        <p className="text-2xl font-mono font-bold text-zinc-900">{stat.value.toFixed(4)}</p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <motion.div variants={itemVariants} className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                  <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest">Tabela de Frequência (Não Agrupada)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50/50">
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Valor (xi)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Freq (fi)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Relativa (fri)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Acumulada (Fi)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Precisão (E)</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-[11px] text-zinc-600">
                        {ungroupedTable.map((row, i) => (
                          <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                            <td className="p-3 font-bold text-zinc-900">{row.value.toFixed(1)}</td>
                            <td className="p-3">{row.fi}</td>
                            <td className="p-3">{row.fri.toFixed(4)}</td>
                            <td className="p-3">{row.faci}</td>
                            <td className="p-3 text-zinc-400">{row.fri.toExponential(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
                  <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest">Tabela de Frequência (Agrupada)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100 bg-zinc-50/50">
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Classe</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Ponto Médio (xi)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Freq (fi)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Acumulada (Fi)</th>
                          <th className="p-3 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Precisão (E)</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-[11px] text-zinc-600">
                        {groupedTable.map((row, i) => (
                          <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                            <td className="p-3 font-bold text-zinc-900">{row.label}</td>
                            <td className="p-3">{row.xi.toFixed(2)}</td>
                            <td className="p-3">{row.fi}</td>
                            <td className="p-3">{row.faci}</td>
                            <td className="p-3 text-zinc-400">{row.xi.toPrecision(6)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </motion.main>

            <footer className="mt-20 border-t border-zinc-100 pt-8 flex justify-between items-center">
              <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">UniFacema • Estatística Aplicada • 2026</p>
              <div className="flex gap-4">
                <div className="w-1 h-1 rounded-full bg-zinc-200" />
                <div className="w-1 h-1 rounded-full bg-zinc-200" />
                <div className="w-1 h-1 rounded-full bg-zinc-200" />
              </div>
            </footer>
          </div>
        )}
      </AnimatePresence>

      {/* Slides View */}
      <AnimatePresence>
        {showSlides && (
          <PresentationSlides onClose={() => setShowSlides(false)} />
        )}
      </AnimatePresence>

      {/* Team Modal */}
      <AnimatePresence>
        {showTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-100"
            >
              <div className="p-8 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-900 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-zinc-900 font-bold text-lg font-serif italic">Nossa Equipe</h3>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">UniFacema • Estatística</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTeam(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-4">
                {TEAM_MEMBERS.map((member, i) => (
                  <motion.div 
                    key={member}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                      {member.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-sm font-semibold text-zinc-700 tracking-tight">{member}</span>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 bg-zinc-50 text-center">
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Trabalho de Disciplina • 2024
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Code Modal */}
      <AnimatePresence>
        {showCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1e1e1e] w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#252525]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Implementação Python</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Algoritmos Manuais • iris_stats.py</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white flex items-center gap-2 text-xs font-mono"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                  <button
                    onClick={() => setShowCode(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-8 overflow-auto max-h-[70vh] custom-scrollbar bg-[#1e1e1e]">
                <pre className="font-mono text-sm text-emerald-400/90 leading-relaxed">
                  <code>{PYTHON_CODE}</code>
                </pre>
              </div>
              <div className="p-4 bg-[#252525] border-t border-white/10 text-center">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  UniFacema • Construção de Algoritmos • TDE
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatsDashboard;
