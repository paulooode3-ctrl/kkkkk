import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Calculator, 
  Table as TableIcon, 
  Code2, 
  TrendingUp, 
  Layers,
  FileText,
  Terminal,
  Presentation,
  Users,
  Check,
  Flower2,
  Filter,
  BarChart3
} from 'lucide-react';

interface SlideProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: any;
}

const Slide: React.FC<SlideProps> = ({ title, subtitle, children, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="h-full flex flex-col p-8 md:p-12"
  >
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-2">
        {Icon && <Icon className="w-6 h-6 text-zinc-400" />}
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{subtitle}</p>}
    </div>
    <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
      {children}
    </div>
  </motion.div>
);

const TEAM_MEMBERS = [
  "CLEBERSON DIAS NASCIMENTO",
  "KLEDYSON DANIEL CAMPOS VIANA",
  "MARIA BIATRISSE BEZERRA FERREIRA",
  "MARIA SARAH DA SILVA SOUSA",
  "PAULO VICTOR SILVA CAMPOS",
  "WEVLYNN YASMIM MORAES DE OLIVEIRA"
].sort();

export const PresentationSlides: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Capa
    {
      title: "Análise Estatística: Dataset Iris",
      subtitle: "Projeto Interdisciplinar • UniFacema",
      icon: Presentation,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-zinc-900 text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-zinc-200"
          >
            <Flower2 className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-black text-zinc-900 mb-4 tracking-tighter italic">IRIS ANALYTICS</h1>
          <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase">Ciência de Dados & Estatística</p>
          <div className="mt-12 flex gap-2">
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">React + TS</div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Python</div>
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Estatística</div>
          </div>
        </div>
      )
    },
    // Slide 2: A Equipe
    {
      title: "A Equipe",
      subtitle: "Integrantes do Grupo",
      icon: Users,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div 
              key={member}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 bg-white border border-zinc-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-zinc-700 group-hover:text-emerald-900 transition-colors uppercase tracking-tight">{member}</span>
            </motion.div>
          ))}
        </div>
      )
    },
    // Slide 3: Objetivo
    {
      title: "Objetivo do Projeto",
      subtitle: "Contextualização",
      icon: FileText,
      content: (
        <div className="space-y-8">
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 italic text-xl text-zinc-600 leading-relaxed">
            "Desenvolver uma ferramenta capaz de automatizar a análise descritiva de dados biológicos, unindo a precisão matemática à agilidade do software."
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">01</div>
              <h4 className="font-bold text-zinc-900">Automação</h4>
              <p className="text-xs text-zinc-500">Eliminar erros manuais em cálculos complexos de variância e desvio.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">02</div>
              <h4 className="font-bold text-zinc-900">Visualização</h4>
              <p className="text-xs text-zinc-500">Transformar tabelas áridas em histogramas e gráficos compreensíveis.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold">03</div>
              <h4 className="font-bold text-zinc-900">Educação</h4>
              <p className="text-xs text-zinc-500">Servir como base para o ensino de estatística aplicada à computação.</p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 4: Interface - Dashboard
    {
      title: "Interface: Dashboard",
      subtitle: "Visão Geral do Sistema",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <p className="text-zinc-600">A interface foi projetada seguindo princípios de <strong>Design Minimalista</strong> para focar no que importa: os dados.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-5 h-5 text-emerald-500" />
                <h4 className="font-bold">Cards de Métricas</h4>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Localizados no topo, exibem Média, Mediana, Variância e Desvio Padrão. Eles mudam instantaneamente conforme o filtro é aplicado.
              </p>
            </div>
            <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="w-5 h-5 text-blue-500" />
                <h4 className="font-bold">Sistema de Filtros</h4>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Permite isolar espécies (Setosa, Versicolor, Virginica) para comparar como as medidas estatísticas variam entre elas.
              </p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 5: Filtros e Reatividade
    {
      title: "Filtros e Reatividade",
      subtitle: "Como o App Responde",
      icon: Filter,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">O sistema utiliza o estado do React para filtrar os 150 registros em tempo real.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
              <h4 className="font-bold text-xs uppercase text-zinc-400 mb-2">Estado: Atributo</h4>
              <p className="text-xs text-zinc-600">Muda o foco entre Comprimento e Largura da Sépala ou Pétala.</p>
            </div>
            <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
              <h4 className="font-bold text-xs uppercase text-zinc-400 mb-2">Estado: Espécie</h4>
              <p className="text-xs text-zinc-600">Filtra o array original para mostrar apenas a espécie desejada ou todas.</p>
            </div>
          </div>
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] font-mono text-emerald-700">
            {`const filteredData = data.filter(d => species === 'all' || d.species === species);`}
          </div>
        </div>
      )
    },
    // Slide 6: Algoritmo de Classes
    {
      title: "Algoritmo de Classes",
      subtitle: "Construindo a Tabela",
      icon: Layers,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">Para criar a tabela agrupada, seguimos 4 passos lógicos no código:</p>
          <div className="space-y-2">
            {[
              { t: "Amplitude Total", d: "Subtraímos o menor valor do maior (Máx - Mín)." },
              { t: "Número de Classes", d: "Aplicamos a Regra de Sturges para definir 'k'." },
              { t: "Intervalo de Classe", d: "Dividimos a Amplitude pelo número de classes." },
              { t: "Distribuição", d: "Percorremos os dados e contamos quantos caem em cada intervalo." }
            ].map((step, i) => (
              <div key={i} className="flex gap-4 p-3 bg-white border border-zinc-100 rounded-xl items-center">
                <div className="w-6 h-6 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">{i+1}</div>
                <div>
                  <h5 className="font-bold text-xs text-zinc-900">{step.t}</h5>
                  <p className="text-[10px] text-zinc-500">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    // Slide 7: Tabelas de Frequência
    {
      title: "Tabelas de Frequência",
      subtitle: "Organização e Sturges",
      icon: TableIcon,
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900 text-white rounded-3xl">
            <h4 className="text-emerald-400 font-mono text-sm mb-4">Regra de Sturges (Cálculo de Classes)</h4>
            <div className="flex items-center justify-center py-6 bg-zinc-800 rounded-xl mb-4">
              <code className="text-2xl font-mono">k = 1 + 3.322 * log10(n)</code>
            </div>
            <p className="text-xs text-zinc-400">
              Onde <strong>n</strong> é o número de amostras (150 no Iris). Essa fórmula define quantas "gavetas" (classes) usaremos para agrupar os dados contínuos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <h5 className="font-bold text-xs uppercase mb-1">Frequência Absoluta (fi)</h5>
              <p className="text-[10px] text-zinc-500">Contagem de vezes que um valor ou classe aparece.</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <h5 className="font-bold text-xs uppercase mb-1">Frequência Relativa (fri)</h5>
              <p className="text-[10px] text-zinc-500">Percentual daquela classe em relação ao todo.</p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 6: O Código - Processamento
    {
      title: "O Código: Processamento",
      subtitle: "Tratamento de Dados em TypeScript",
      icon: Code2,
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-[#1e1e1e] rounded-2xl overflow-hidden">
            <h4 className="text-blue-400 font-mono text-xs mb-4">// Estrutura de Dados (Interface)</h4>
            <pre className="text-zinc-300 font-mono text-[10px] leading-relaxed">
{`interface IrisRecord {
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
  species: 'setosa' | 'versicolor' | 'virginica';
}

// O dataset é carregado de um arquivo CSV e 
// convertido em um array de objetos tipados.`}
            </pre>
          </div>
          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl">
            <h4 className="font-bold text-amber-900 text-sm mb-2">Por que TypeScript?</h4>
            <p className="text-xs text-amber-700">
              O uso de interfaces garante que não tentaremos calcular a média de um campo que não existe ou que contém texto, evitando bugs em tempo de execução.
            </p>
          </div>
        </div>
      )
    },
    // Slide 7: O Código - Lógica Estatística
    {
      title: "O Código: Lógica Estatística",
      subtitle: "Algoritmos de Cálculo",
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <div className="p-6 bg-zinc-900 rounded-2xl">
            <h4 className="text-emerald-400 font-mono text-xs mb-4">// Cálculo da Variância Amostral</h4>
            <pre className="text-zinc-300 font-mono text-[10px] leading-relaxed">
{`const variance = useMemo(() => {
  if (data.length < 2) return 0;
  const avg = mean; // Média já calculada
  const squareDiffs = data.map(v => Math.pow(v - avg, 2));
  const sumSquareDiffs = squareDiffs.reduce((a, b) => a + b, 0);
  return sumSquareDiffs / (data.length - 1);
}, [data, mean]);`}
            </pre>
          </div>
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
            <p className="text-xs text-zinc-500">
              Utilizamos o hook <strong>useMemo</strong> do React para que os cálculos só sejam refeitos se os dados ou filtros mudarem, garantindo alta performance.
            </p>
          </div>
        </div>
      )
    },
    // Slide 8: O Código - Visualização
    {
      title: "O Código: Visualização",
      subtitle: "Gráficos com Recharts",
      icon: BarChart3,
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex-1 space-y-4">
              <p className="text-sm text-zinc-600">
                Para o histograma, mapeamos as classes da tabela de frequência para um formato que a biblioteca <strong>Recharts</strong> entenda.
              </p>
              <ul className="text-xs text-zinc-500 space-y-2 list-disc list-inside">
                <li>Eixo X: Intervalos de Classe</li>
                <li>Eixo Y: Frequência Absoluta (fi)</li>
                <li>Tooltip: Detalhes ao passar o mouse</li>
              </ul>
            </div>
            <div className="w-48 h-48 bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 flex items-center justify-center">
              <BarChart3 className="w-12 h-12 text-zinc-300" />
            </div>
          </div>
        </div>
      )
    },
    // Slide 9: Terminal - Python Script
    {
      title: "Terminal: Script Python",
      subtitle: "Análise via Linha de Comando",
      icon: Terminal,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">O script Python foi desenvolvido para ser uma alternativa leve e rápida ao dashboard web.</p>
          <div className="p-6 bg-[#0c0c0c] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex gap-1.5 mb-4">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <pre className="text-emerald-500 font-mono text-[10px] leading-relaxed">
{`# terminal_stats.py
import csv

def load_data(filename):
    with open(filename, 'r') as f:
        return list(csv.DictReader(f))

# O script processa o CSV, converte strings para float
# e aplica as mesmas fórmulas de Média e Desvio Padrão.`}
            </pre>
          </div>
        </div>
      )
    },
    // Slide 10: Terminal - Execução
    {
      title: "Terminal: Execução",
      subtitle: "Resultados no Console",
      icon: Terminal,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">Ao executar o comando <code className="bg-zinc-100 px-2 py-0.5 rounded text-zinc-900">python stats.py</code>, o terminal exibe:</p>
          <div className="p-6 bg-zinc-900 rounded-2xl font-mono text-[10px] text-zinc-300 space-y-2">
            <p className="text-zinc-500">$ python stats.py --species setosa</p>
            <p className="text-emerald-400">{">>>"} Carregando 50 registros de 'setosa'...</p>
            <p>------------------------------------</p>
            <p>MÉDIA: 5.006</p>
            <p>MEDIANA: 5.0</p>
            <p>VARIÂNCIA: 0.124</p>
            <p>DESVIO PADRÃO: 0.352</p>
            <p>------------------------------------</p>
            <p className="text-blue-400">{">>>"} Análise concluída com sucesso.</p>
          </div>
        </div>
      )
    },
    // Slide 13: Python - Algoritmos Manuais
    {
      title: "Python: Algoritmos Manuais",
      subtitle: "Lógica Pura",
      icon: Terminal,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">No Python, evitamos o uso de bibliotecas como NumPy para demonstrar o entendimento matemático.</p>
          <div className="p-6 bg-zinc-900 rounded-2xl">
            <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed">
{`# Cálculo da Média Manual
def media(lista):
    return sum(lista) / len(lista)

# Cálculo do Desvio Padrão
def desvio_padrao(lista):
    m = media(lista)
    variancia = sum((x - m)**2 for x in lista) / (len(lista) - 1)
    return variancia ** 0.5`}
            </pre>
          </div>
        </div>
      )
    },
    // Slide 14: Tecnologias Utilizadas
    {
      title: "Tecnologias Utilizadas",
      subtitle: "Stack de Desenvolvimento",
      icon: Layers,
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { n: "React 18", d: "Interface Reativa", c: "bg-blue-50 text-blue-600" },
            { n: "TypeScript", d: "Segurança de Tipos", c: "bg-blue-100 text-blue-700" },
            { n: "Tailwind CSS", d: "Estilização Moderna", c: "bg-emerald-50 text-emerald-600" },
            { n: "Framer Motion", d: "Animações Fluídas", c: "bg-rose-50 text-rose-600" },
            { n: "Recharts", d: "Gráficos Dinâmicos", c: "bg-amber-50 text-amber-600" },
            { n: "Python 3", d: "Scripts de Terminal", c: "bg-zinc-900 text-zinc-100" }
          ].map((tech, i) => (
            <div key={i} className={`p-4 rounded-2xl border border-transparent hover:border-zinc-200 transition-all ${tech.c}`}>
              <h5 className="font-bold text-xs mb-1">{tech.n}</h5>
              <p className="text-[10px] opacity-80">{tech.d}</p>
            </div>
          ))}
        </div>
      )
    },
    // Slide 15: Conclusão
    {
      title: "Conclusão",
      subtitle: "Encerramento",
      icon: Users,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <Check className="w-10 h-10" />
          </div>
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Trabalho Concluído</h3>
            <p className="text-zinc-600 leading-relaxed">
              Este projeto demonstrou que a estatística não é apenas sobre números, mas sobre a capacidade de construir ferramentas que tornam a informação acessível e útil.
            </p>
          </div>
          <div className="pt-8 border-t border-zinc-100 w-full">
            <p className="text-zinc-400 font-serif italic mb-4">Obrigado pela atenção!</p>
            <div className="flex justify-center gap-4">
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"><Flower2 className="w-4 h-4 text-zinc-400" /></div>
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"><Code2 className="w-4 h-4 text-zinc-400" /></div>
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"><Terminal className="w-4 h-4 text-zinc-400" /></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-white flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-900 text-white rounded-lg">
            <Presentation className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
            Slide {currentSlide + 1} de {slides.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-900"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <Slide 
            key={currentSlide}
            title={slides[currentSlide].title}
            subtitle={slides[currentSlide].subtitle}
            icon={slides[currentSlide].icon}
          >
            {slides[currentSlide].content}
          </Slide>
        </AnimatePresence>
      </div>

      {/* Footer / Controls */}
      <div className="p-8 border-t border-zinc-100 flex justify-between items-center bg-zinc-50/50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white border border-zinc-200 shadow-sm active:scale-95'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Anterior
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-zinc-900' : 'w-2 bg-zinc-200'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            currentSlide === slides.length - 1 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
            : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-200 active:scale-95'
          }`}
        >
          {currentSlide === slides.length - 1 ? 'Fim' : 'Próximo'} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
