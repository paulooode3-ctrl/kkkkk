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
  { name: "CLEBERSON DIAS NASCIMENTO", role: "Pesquisa e Documentação Técnica" },
  { name: "KLEDYSON DANIEL CAMPOS VIANA", role: "Design de Interface e Experiência (UI/UX)" },
  { name: "MARIA BIATRISSE BEZERRA FERREIRA", role: "Análise de Dados e Fórmulas Estatísticas" },
  { name: "MARIA SARAH DA SILVA SOUSA", role: "Revisão de Código e Qualidade" },
  { name: "PAULO VICTOR SILVA CAMPOS", role: "Líder Chave da Programação e Arquitetura" },
  { name: "WEVLYNN YASMIM MORAES DE OLIVEIRA", role: "Organização de Dataset e Pré-processamento" }
].sort((a, b) => a.name.localeCompare(b.name));

export const PresentationSlides: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Capa
    {
      title: "Análise Estatística & Python",
      subtitle: "Dataset Iris • Tutorial Completo",
      icon: Presentation,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-zinc-900 text-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-zinc-200"
          >
            <Terminal className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-black text-zinc-900 mb-4 tracking-tighter italic">PYTHON & STATS</h1>
          <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase">Do Código à Tabela de Frequência</p>
          <div className="mt-12 flex gap-2">
            <div className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Lógica Matemática</div>
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Python Script</div>
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">Tabelas</div>
          </div>
        </div>
      )
    },
    // Slide 2: A Equipe
    {
      title: "A Equipe",
      subtitle: "Integrantes e Funções",
      icon: Users,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group p-6 bg-white border rounded-2xl transition-all flex items-center gap-4 ${
                member.name.includes("PAULO VICTOR") 
                ? "border-emerald-500 bg-emerald-50/30" 
                : "border-zinc-100 hover:border-zinc-900 hover:bg-zinc-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                member.name.includes("PAULO VICTOR")
                ? "bg-emerald-500 text-white"
                : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white"
              }`}>
                <Users className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900 uppercase tracking-tight">{member.name}</span>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${
                  member.name.includes("PAULO VICTOR") ? "text-emerald-600 font-bold" : "text-zinc-400"
                }`}>
                  {member.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    // Slide 3: Objetivo do Projeto
    {
      title: "Objetivo do Projeto",
      subtitle: "O que estamos construindo?",
      icon: Filter,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Nossa missão é criar uma ferramenta que transforme dados brutos em conhecimento estatístico. Não queremos apenas o resultado, mas entender o <strong>processo matemático</strong> por trás de cada número.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <h4 className="font-bold text-zinc-900 text-[10px] mb-2 uppercase">Automação</h4>
              <p className="text-[10px] text-zinc-500">Eliminar o erro humano em cálculos repetitivos.</p>
            </div>
            <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <h4 className="font-bold text-zinc-900 text-[10px] mb-2 uppercase">Educação</h4>
              <p className="text-[10px] text-zinc-500">Ensinar como a lógica de programação aplica a estatística.</p>
            </div>
            <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
              <h4 className="font-bold text-zinc-900 text-[10px] mb-2 uppercase">Visualização</h4>
              <p className="text-[10px] text-zinc-500">Organizar dados em tabelas claras e interpretáveis.</p>
            </div>
          </div>
        </div>
      )
    },
    // Slide 4: O Dataset Iris
    {
      title: "O Dataset Iris",
      subtitle: "Contexto dos Dados",
      icon: Flower2,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            O conjunto de dados <strong>Iris</strong> é um dos mais famosos na estatística. Ele contém 150 amostras de três espécies de flores Iris. Para este projeto, focamos na variável quantitativa contínua: <strong>Comprimento da Sépala</strong>.
          </p>
          <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
            <h4 className="font-bold text-zinc-900 mb-4 text-xs uppercase tracking-widest">Estrutura do Arquivo CSV:</h4>
            <div className="p-4 bg-white border border-zinc-200 rounded-xl font-mono text-[10px] text-zinc-500">
              sepal_length,sepal_width,petal_length,petal_width,species<br/>
              5.1,3.5,1.4,0.2,setosa<br/>
              4.9,3.0,1.4,0.2,setosa<br/>
              ...
            </div>
          </div>
        </div>
      )
    },
    // Slide 5: Por que Python Nativo?
    {
      title: "Por que Python Nativo?",
      subtitle: "Lógica Pura vs Bibliotecas",
      icon: Code2,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 leading-relaxed">
            Poderíamos usar bibliotecas como <code>Pandas</code> ou <code>Numpy</code>, que fazem tudo em uma linha. No entanto, o objetivo deste trabalho é <strong>ensinar a lógica</strong>.
          </p>
          <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-xs text-amber-800">
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Transparência:</strong> Você vê como a soma e a divisão acontecem.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-amber-800">
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Portabilidade:</strong> O código roda em qualquer computador com Python instalado, sem precisar baixar nada extra.</span>
              </li>
              <li className="flex items-start gap-3 text-xs text-amber-800">
                <Check className="w-4 h-4 mt-0.5 shrink-0" />
                <span><strong>Aprendizado:</strong> Desenvolve o raciocínio algorítmico do programador.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    // Slide 6: Estrutura: Importações
    {
      title: "Estrutura: Importações",
      subtitle: "As Ferramentas Básicas",
      icon: Code2,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">O Python já vem com "baterias incluídas". Usamos dois módulos fundamentais:</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
{`import math  # Para logaritmos e raiz quadrada
import csv   # Para ler o arquivo de dados`}
            </pre>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] text-zinc-500"><strong>math.log10:</strong> Usado na Regra de Sturges.</p>
            <p className="text-[10px] text-zinc-500"><strong>csv.DictReader:</strong> Transforma cada linha do CSV em um dicionário fácil de manipular.</p>
          </div>
        </div>
      )
    },
    // Slide 7: Leitura do CSV
    {
      title: "Leitura do CSV",
      subtitle: "O Context Manager",
      icon: FileText,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">Abrir um arquivo exige cuidado. Se o programa travar e o arquivo continuar aberto, ele pode ser corrompido. O <code>with</code> resolve isso:</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-zinc-300 font-mono text-[10px] leading-relaxed">
{`dados = []
with open('iris.csv', 'r') as f:
    leitor = csv.DictReader(f)
    for linha in leitor:
        # Extraímos apenas a coluna que queremos
        valor = float(linha['sepal_length'])
        dados.append(valor)`}
            </pre>
          </div>
          <p className="text-[10px] text-zinc-500 italic">
            Aqui, o Python lê linha por linha, converte o texto para número e guarda na lista <code>dados</code>.
          </p>
        </div>
      )
    },
    // Slide 8: Processamento e Limpeza
    {
      title: "Processamento e Limpeza",
      subtitle: "Garantindo a Qualidade",
      icon: Filter,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">Dados reais podem ter erros. Antes de calcular, precisamos garantir que temos apenas números válidos e ordenados para a mediana.</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed">
{`# Ordenar os dados é CRUCIAL para a mediana e tabelas
dados.sort()

n = len(dados)
minimo = dados[0]
maximo = dados[-1]`}
            </pre>
          </div>
          <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-xl">
            <p className="text-[10px] text-zinc-500">Ao ordenar a lista, facilitamos encontrar o menor valor (índice 0) e o maior valor (último índice).</p>
          </div>
        </div>
      )
    },
    // Slide 9: Cálculo da Média
    {
      title: "Cálculo da Média",
      subtitle: "Lógica Matemática",
      icon: Calculator,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">A média aritmética é a soma de todos os valores dividida pela quantidade. No código, usamos as funções nativas <code>sum()</code> e <code>len()</code>.</p>
          <div className="p-6 bg-zinc-900 text-white rounded-2xl text-center">
            <p className="text-3xl font-mono">Média = Σx / n</p>
          </div>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px]">
{`def calcular_media(lista):
    soma = sum(lista)
    total = len(lista)
    return soma / total`}
            </pre>
          </div>
          <p className="text-[10px] text-zinc-500">Para o Iris, somamos os 150 comprimentos e dividimos por 150.</p>
        </div>
      )
    },
    // Slide 10: Cálculo da Mediana
    {
      title: "Cálculo da Mediana",
      subtitle: "Ordenação e Meio",
      icon: Calculator,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">A mediana é o valor central. Se o número de elementos for par, tiramos a média dos dois centrais.</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed">
{`def calcular_mediana(lista):
    n = len(lista)
    meio = n // 2
    if n % 2 == 0:
        return (lista[meio-1] + lista[meio]) / 2
    else:
        return lista[meio]`}
            </pre>
          </div>
          <p className="text-[10px] text-zinc-500">
            <strong>Importante:</strong> A lista DEVE estar ordenada antes deste cálculo.
          </p>
        </div>
      )
    },
    // Slide 11: Cálculo da Moda
    {
      title: "Cálculo da Moda",
      subtitle: "Dicionários de Frequência",
      icon: Calculator,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">A moda é o valor mais frequente. Usamos um dicionário para contar as ocorrências de cada número.</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed">
{`def calcular_moda(lista):
    frequencias = {}
    for x in lista:
        frequencias[x] = frequencias.get(x, 0) + 1
    
    max_f = max(frequencias.values())
    modas = [k for k, v in frequencias.items() if v == max_f]
    return modas`}
            </pre>
          </div>
          <p className="text-[10px] text-zinc-500 italic">
            Se houver empate, o código retorna uma lista com todas as modas (bimodal, trimodal, etc).
          </p>
        </div>
      )
    },
    // Slide 12: Variância e Desvio Padrão
    {
      title: "Variância e Desvio Padrão",
      subtitle: "Medindo a Dispersão",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">O desvio padrão nos diz o quão "espalhados" os dados estão da média. É a raiz quadrada da variância.</p>
          <div className="p-6 bg-zinc-900 text-white rounded-2xl text-center">
            <p className="text-2xl font-mono">s = √[ Σ(x - x̄)² / (n - 1) ]</p>
          </div>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px]">
{`def calcular_desvio_padrao(lista, media):
    soma_quadrados = sum((x - media)**2 for x in lista)
    variancia = soma_quadrados / (len(lista) - 1)
    return math.sqrt(variancia)`}
            </pre>
          </div>
        </div>
      )
    },
    // Slide 13: Tabela Não Agrupada: Lógica
    {
      title: "Tabela Não Agrupada",
      subtitle: "Frequência Simples",
      icon: TableIcon,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">Nesta tabela, contamos cada valor individual. É útil para ver a distribuição exata de cada medida.</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed">
{`# Lógica em Python:
contagem = {}
for x in dados:
    contagem[x] = contagem.get(x, 0) + 1

for valor in sorted(contagem.keys()):
    fi = contagem[valor]
    fri = (fi / n) * 100
    print(f"{valor} | {fi} | {fri:.2f}%")`}
            </pre>
          </div>
          <p className="text-[10px] text-zinc-500">No Iris, temos muitos valores decimais, o que torna essa tabela muito longa. Por isso, usamos o agrupamento.</p>
        </div>
      )
    },
    // Slide 14: Preparação: Amplitude
    {
      title: "Preparação: Amplitude",
      subtitle: "O Espaço dos Dados",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">A Amplitude Total (AT) define o "tamanho" do nosso intervalo de estudo. É a diferença entre o maior e o menor valor.</p>
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            <h4 className="text-zinc-400 font-mono text-[10px] uppercase mb-4">Cálculo de AT</h4>
            <p className="text-4xl font-mono text-zinc-900">AT = Xmax - Xmin</p>
            <p className="text-xl font-mono text-zinc-400 mt-2">AT = 7.9 - 4.3 = 3.6</p>
          </div>
          <div className="p-4 bg-zinc-900 text-emerald-400 rounded-xl font-mono text-[10px]">
            <p>at = max(dados) - min(dados)</p>
          </div>
        </div>
      )
    },
    // Slide 15: Regra de Sturges
    {
      title: "Regra de Sturges",
      subtitle: "Definindo o Número de Classes",
      icon: Layers,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">Quantas linhas nossa tabela deve ter? A Regra de Sturges usa logaritmos para encontrar um número equilibrado de classes (k).</p>
          <div className="p-6 bg-zinc-900 text-white rounded-3xl">
            <div className="flex items-center justify-center py-6 bg-zinc-800 rounded-xl mb-4">
              <code className="text-2xl font-mono">k = 1 + 3.322 * log10(n)</code>
            </div>
            <div className="p-4 bg-zinc-800/50 rounded-xl">
              <pre className="text-emerald-400 font-mono text-[10px]">
{`# n = 150 amostras
k = 1 + 3.322 * math.log10(150)
k = round(k)  # Resulta em 8 ou 9 classes`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    // Slide 16: Intervalo de Classe (h)
    {
      title: "Intervalo de Classe (h)",
      subtitle: "Largura da Classe",
      icon: TableIcon,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">O intervalo (h) é a largura de cada classe. Dividimos a amplitude total pelo número de classes.</p>
          <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
            <h4 className="text-zinc-400 font-mono text-[10px] uppercase mb-4">Cálculo de h</h4>
            <p className="text-4xl font-mono text-zinc-900">h = AT / k</p>
            <p className="text-xl font-mono text-zinc-400 mt-2">h = 3.6 / 9 = 0.4</p>
          </div>
          <p className="text-[10px] text-zinc-500 italic text-center">
            Cada linha da nossa tabela vai "pular" de 0.4 em 0.4.
          </p>
        </div>
      )
    },
    // Slide 17: Construção da Tabela Agrupada
    {
      title: "Construção da Tabela",
      subtitle: "Loops e Condicionais",
      icon: TableIcon,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">Para preencher a tabela, percorremos os dados e verificamos em qual "gaveta" (intervalo) cada valor se encaixa.</p>
          <div className="p-6 bg-[#1e1e1e] rounded-2xl border border-white/5">
            <pre className="text-emerald-400 font-mono text-[10px] leading-relaxed">
{`# Lógica do Agrupamento:
limite_inf = min(dados)
for i in range(k):
    limite_sup = limite_inf + h
    # Contar quantos estão entre inf e sup
    fi = len([x for x in dados if limite_inf <= x < limite_sup])
    # Se for a última classe, inclui o limite superior
    if i == k - 1:
        fi = len([x for x in dados if limite_inf <= x <= limite_sup])
    
    print(f"{limite_inf:.2f} |--- {limite_sup:.2f} | {fi}")
    limite_inf = limite_sup`}
            </pre>
          </div>
        </div>
      )
    },
    // Slide 18: Ponto Médio e Estimativas
    {
      title: "Ponto Médio e Estimativas",
      subtitle: "Representante da Classe",
      icon: Layers,
      content: (
        <div className="space-y-6">
          <p className="text-sm text-zinc-600">O Ponto Médio (xi) é o valor central de uma classe. Ele é usado para estimar a média quando não temos os dados originais.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl text-center">
              <h4 className="text-zinc-400 font-mono text-[10px] uppercase mb-2">Ponto Médio</h4>
              <p className="text-xl font-mono">xi = (Inf + Sup) / 2</p>
            </div>
            <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl text-center">
              <h4 className="text-zinc-400 font-mono text-[10px] uppercase mb-2">Média Agrupada</h4>
              <p className="text-xl font-mono">Σ(xi * fi) / n</p>
            </div>
          </div>
          <div className="p-4 bg-zinc-900 text-zinc-400 rounded-xl font-mono text-[10px]">
            <p># No código:</p>
            <p>xi = (limite_inf + limite_sup) / 2</p>
            <p>soma_agrupada += xi * fi</p>
          </div>
        </div>
      )
    },
    // Slide 19: Execução no Terminal
    {
      title: "Execução no Terminal",
      subtitle: "O Script em Ação",
      icon: Terminal,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">Ao rodar o script, o terminal exibe o relatório completo. É a prova de que nossa lógica matemática foi traduzida corretamente para o computador.</p>
          <div className="p-6 bg-[#0c0c0c] rounded-2xl border border-white/10 shadow-2xl">
            <div className="flex gap-1.5 mb-4">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <pre className="text-emerald-500 font-mono text-[10px] leading-relaxed">
{`$ python iris_analysis.py
------------------------------------
RESULTADOS: SEPAL_LENGTH
------------------------------------
Média: 5.84 | Mediana: 5.80 | Moda: [5.0]
Desvio Padrão: 0.83
------------------------------------
TABELA DE FREQUÊNCIA (STURGES)
9 Classes geradas com sucesso.
------------------------------------`}
            </pre>
          </div>
        </div>
      )
    },
    // Slide 20: Conclusão
    {
      title: "Conclusão",
      subtitle: "Encerramento do Projeto",
      icon: Check,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
            <Check className="w-10 h-10" />
          </div>
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight uppercase">Missão Cumprida</h3>
            <p className="text-zinc-600 leading-relaxed text-sm">
              Demonstramos que a estatística não é apenas sobre fórmulas, mas sobre como organizamos a informação para tomar decisões. Com Python, transformamos 150 linhas de texto em uma análise clara e precisa.
            </p>
          </div>
          <div className="pt-8 border-t border-zinc-100 w-full">
            <p className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest mb-4">Liderança de Programação: Paulo Victor</p>
            <div className="flex justify-center gap-4">
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"><Calculator className="w-4 h-4 text-zinc-400" /></div>
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
