import React, { useState, useMemo } from 'react';
import { IRIS_DATA, IrisRecord } from '../data/iris';
import { 
  getRawStats, 
  getUngroupedFrequencyTable, 
  getGroupedFrequencyTable, 
  getGroupedStats,
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateVariance,
  calculateStdDev,
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
  Presentation,
  Hash,
  AlertTriangle
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
            {'sepal_length': 4.7, 'sepal_width': 3.2, 'petal_length': 1.3, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.6, 'sepal_width': 3.1, 'petal_length': 1.5, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.6, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.4, 'sepal_width': 3.9, 'petal_length': 1.7, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 4.6, 'sepal_width': 3.4, 'petal_length': 1.4, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.4, 'petal_length': 1.5, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.4, 'sepal_width': 2.9, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.9, 'sepal_width': 3.1, 'petal_length': 1.5, 'petal_width': 0.1, 'species': 'setosa'},
            {'sepal_length': 5.4, 'sepal_width': 3.7, 'petal_length': 1.5, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.8, 'sepal_width': 3.4, 'petal_length': 1.6, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.8, 'sepal_width': 3.0, 'petal_length': 1.4, 'petal_width': 0.1, 'species': 'setosa'},
            {'sepal_length': 4.3, 'sepal_width': 3.0, 'petal_length': 1.1, 'petal_width': 0.1, 'species': 'setosa'},
            {'sepal_length': 5.8, 'sepal_width': 4.0, 'petal_length': 1.2, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.7, 'sepal_width': 4.4, 'petal_length': 1.5, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 5.4, 'sepal_width': 3.9, 'petal_length': 1.3, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.5, 'petal_length': 1.4, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 5.7, 'sepal_width': 3.8, 'petal_length': 1.7, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.8, 'petal_length': 1.5, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 5.4, 'sepal_width': 3.4, 'petal_length': 1.7, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.7, 'petal_length': 1.5, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 4.6, 'sepal_width': 3.6, 'petal_length': 1.0, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.3, 'petal_length': 1.7, 'petal_width': 0.5, 'species': 'setosa'},
            {'sepal_length': 4.8, 'sepal_width': 3.4, 'petal_length': 1.9, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.0, 'petal_length': 1.6, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.4, 'petal_length': 1.6, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 5.2, 'sepal_width': 3.5, 'petal_length': 1.5, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.2, 'sepal_width': 3.4, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.7, 'sepal_width': 3.2, 'petal_length': 1.6, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.8, 'sepal_width': 3.1, 'petal_length': 1.6, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.4, 'sepal_width': 3.4, 'petal_length': 1.5, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 5.2, 'sepal_width': 4.1, 'petal_length': 1.5, 'petal_width': 0.1, 'species': 'setosa'},
            {'sepal_length': 5.5, 'sepal_width': 4.2, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.9, 'sepal_width': 3.1, 'petal_length': 1.5, 'petal_width': 0.1, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.2, 'petal_length': 1.2, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.5, 'sepal_width': 3.5, 'petal_length': 1.3, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.9, 'sepal_width': 3.1, 'petal_length': 1.5, 'petal_width': 0.1, 'species': 'setosa'},
            {'sepal_length': 4.4, 'sepal_width': 3.0, 'petal_length': 1.3, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.4, 'petal_length': 1.5, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.5, 'petal_length': 1.3, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 4.5, 'sepal_width': 2.3, 'petal_length': 1.3, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 4.4, 'sepal_width': 3.2, 'petal_length': 1.3, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.5, 'petal_length': 1.6, 'petal_width': 0.6, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.8, 'petal_length': 1.9, 'petal_width': 0.4, 'species': 'setosa'},
            {'sepal_length': 4.8, 'sepal_width': 3.0, 'petal_length': 1.4, 'petal_width': 0.3, 'species': 'setosa'},
            {'sepal_length': 5.1, 'sepal_width': 3.8, 'petal_length': 1.6, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 4.6, 'sepal_width': 3.2, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.3, 'sepal_width': 3.7, 'petal_length': 1.5, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 5.0, 'sepal_width': 3.3, 'petal_length': 1.4, 'petal_width': 0.2, 'species': 'setosa'},
            {'sepal_length': 7.0, 'sepal_width': 3.2, 'petal_length': 4.7, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 6.4, 'sepal_width': 3.2, 'petal_length': 4.5, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 6.9, 'sepal_width': 3.1, 'petal_length': 4.9, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 5.5, 'sepal_width': 2.3, 'petal_length': 4.0, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.5, 'sepal_width': 2.8, 'petal_length': 4.6, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 5.7, 'sepal_width': 2.8, 'petal_length': 4.5, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.3, 'sepal_width': 3.3, 'petal_length': 4.7, 'petal_width': 1.6, 'species': 'versicolor'},
            {'sepal_length': 4.9, 'sepal_width': 2.4, 'petal_length': 3.3, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 6.6, 'sepal_width': 2.9, 'petal_length': 4.6, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 5.2, 'sepal_width': 2.7, 'petal_length': 3.9, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 5.0, 'sepal_width': 2.0, 'petal_length': 3.5, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 5.9, 'sepal_width': 3.0, 'petal_length': 4.2, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 6.0, 'sepal_width': 2.2, 'petal_length': 4.0, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 6.1, 'sepal_width': 2.9, 'petal_length': 4.7, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 5.6, 'sepal_width': 2.9, 'petal_length': 3.6, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.7, 'sepal_width': 3.1, 'petal_length': 4.4, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 5.6, 'sepal_width': 3.0, 'petal_length': 4.5, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 5.8, 'sepal_width': 2.7, 'petal_length': 4.1, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 6.2, 'sepal_width': 2.2, 'petal_length': 4.5, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 5.6, 'sepal_width': 2.5, 'petal_length': 3.9, 'petal_width': 1.1, 'species': 'versicolor'},
            {'sepal_length': 5.9, 'sepal_width': 3.2, 'petal_length': 4.8, 'petal_width': 1.8, 'species': 'versicolor'},
            {'sepal_length': 6.1, 'sepal_width': 2.8, 'petal_length': 4.0, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.3, 'sepal_width': 2.5, 'petal_length': 4.9, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 6.1, 'sepal_width': 2.8, 'petal_length': 4.7, 'petal_width': 1.2, 'species': 'versicolor'},
            {'sepal_length': 6.4, 'sepal_width': 2.9, 'petal_length': 4.3, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.6, 'sepal_width': 3.0, 'petal_length': 4.4, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 6.8, 'sepal_width': 2.8, 'petal_length': 4.8, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 6.7, 'sepal_width': 3.0, 'petal_length': 5.0, 'petal_width': 1.7, 'species': 'versicolor'},
            {'sepal_length': 6.0, 'sepal_width': 2.9, 'petal_length': 4.5, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 5.7, 'sepal_width': 2.6, 'petal_length': 3.5, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 5.5, 'sepal_width': 2.4, 'petal_length': 3.8, 'petal_width': 1.1, 'species': 'versicolor'},
            {'sepal_length': 5.5, 'sepal_width': 2.4, 'petal_length': 3.7, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 5.8, 'sepal_width': 2.7, 'petal_length': 3.9, 'petal_width': 1.2, 'species': 'versicolor'},
            {'sepal_length': 6.0, 'sepal_width': 2.7, 'petal_length': 5.1, 'petal_width': 1.6, 'species': 'versicolor'},
            {'sepal_length': 5.4, 'sepal_width': 3.0, 'petal_length': 4.5, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 6.0, 'sepal_width': 3.4, 'petal_length': 4.5, 'petal_width': 1.6, 'species': 'versicolor'},
            {'sepal_length': 6.7, 'sepal_width': 3.1, 'petal_length': 4.7, 'petal_width': 1.5, 'species': 'versicolor'},
            {'sepal_length': 6.3, 'sepal_width': 2.3, 'petal_length': 4.4, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 5.6, 'sepal_width': 3.0, 'petal_length': 4.1, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 5.5, 'sepal_width': 2.5, 'petal_length': 4.0, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 5.5, 'sepal_width': 2.6, 'petal_length': 4.4, 'petal_width': 1.2, 'species': 'versicolor'},
            {'sepal_length': 6.1, 'sepal_width': 3.0, 'petal_length': 4.6, 'petal_width': 1.4, 'species': 'versicolor'},
            {'sepal_length': 5.8, 'sepal_width': 2.6, 'petal_length': 4.0, 'petal_width': 1.2, 'species': 'versicolor'},
            {'sepal_length': 5.0, 'sepal_width': 2.3, 'petal_length': 3.3, 'petal_width': 1.0, 'species': 'versicolor'},
            {'sepal_length': 5.6, 'sepal_width': 2.7, 'petal_length': 4.2, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 5.7, 'sepal_width': 3.0, 'petal_length': 4.2, 'petal_width': 1.2, 'species': 'versicolor'},
            {'sepal_length': 5.7, 'sepal_width': 2.9, 'petal_length': 4.2, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.2, 'sepal_width': 2.9, 'petal_length': 4.3, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 5.1, 'sepal_width': 2.5, 'petal_length': 3.0, 'petal_width': 1.1, 'species': 'versicolor'},
            {'sepal_length': 5.7, 'sepal_width': 2.8, 'petal_length': 4.1, 'petal_width': 1.3, 'species': 'versicolor'},
            {'sepal_length': 6.3, 'sepal_width': 3.3, 'petal_length': 6.0, 'petal_width': 2.5, 'species': 'virginica'},
            {'sepal_length': 5.8, 'sepal_width': 2.7, 'petal_length': 5.1, 'petal_width': 1.9, 'species': 'virginica'},
            {'sepal_length': 7.1, 'sepal_width': 3.0, 'petal_length': 5.9, 'petal_width': 2.1, 'species': 'virginica'},
            {'sepal_length': 6.3, 'sepal_width': 2.9, 'petal_length': 5.6, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.5, 'sepal_width': 3.0, 'petal_length': 5.8, 'petal_width': 2.2, 'species': 'virginica'},
            {'sepal_length': 7.6, 'sepal_width': 3.0, 'petal_length': 6.6, 'petal_width': 2.1, 'species': 'virginica'},
            {'sepal_length': 4.9, 'sepal_width': 2.5, 'petal_length': 4.5, 'petal_width': 1.7, 'species': 'virginica'},
            {'sepal_length': 7.3, 'sepal_width': 2.9, 'petal_length': 6.3, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.7, 'sepal_width': 2.5, 'petal_length': 5.8, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 7.2, 'sepal_width': 3.6, 'petal_length': 6.1, 'petal_width': 2.5, 'species': 'virginica'},
            {'sepal_length': 6.5, 'sepal_width': 3.2, 'petal_length': 5.1, 'petal_width': 2.0, 'species': 'virginica'},
            {'sepal_length': 6.4, 'sepal_width': 2.7, 'petal_length': 5.3, 'petal_width': 1.9, 'species': 'virginica'},
            {'sepal_length': 6.8, 'sepal_width': 3.0, 'petal_length': 5.5, 'petal_width': 2.1, 'species': 'virginica'},
            {'sepal_length': 5.7, 'sepal_width': 2.5, 'petal_length': 5.0, 'petal_width': 2.0, 'species': 'virginica'},
            {'sepal_length': 5.8, 'sepal_width': 2.8, 'petal_length': 5.1, 'petal_width': 2.4, 'species': 'virginica'},
            {'sepal_length': 6.4, 'sepal_width': 3.2, 'petal_length': 5.3, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 6.5, 'sepal_width': 3.0, 'petal_length': 5.5, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 7.7, 'sepal_width': 3.8, 'petal_length': 6.7, 'petal_width': 2.2, 'species': 'virginica'},
            {'sepal_length': 7.7, 'sepal_width': 2.6, 'petal_length': 6.9, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 6.0, 'sepal_width': 2.2, 'petal_length': 5.0, 'petal_width': 1.5, 'species': 'virginica'},
            {'sepal_length': 6.9, 'sepal_width': 3.2, 'petal_length': 5.7, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 5.6, 'sepal_width': 2.8, 'petal_length': 4.9, 'petal_width': 2.0, 'species': 'virginica'},
            {'sepal_length': 7.7, 'sepal_width': 2.8, 'petal_length': 6.7, 'petal_width': 2.0, 'species': 'virginica'},
            {'sepal_length': 6.3, 'sepal_width': 2.7, 'petal_length': 4.9, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.7, 'sepal_width': 3.3, 'petal_length': 5.7, 'petal_width': 2.1, 'species': 'virginica'},
            {'sepal_length': 7.2, 'sepal_width': 3.2, 'petal_length': 6.0, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.2, 'sepal_width': 2.8, 'petal_length': 4.8, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.1, 'sepal_width': 3.0, 'petal_length': 4.9, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.4, 'sepal_width': 2.8, 'petal_length': 5.6, 'petal_width': 2.1, 'species': 'virginica'},
            {'sepal_length': 7.2, 'sepal_width': 3.0, 'petal_length': 5.8, 'petal_width': 1.6, 'species': 'virginica'},
            {'sepal_length': 7.4, 'sepal_width': 2.8, 'petal_length': 6.1, 'petal_width': 1.9, 'species': 'virginica'},
            {'sepal_length': 7.9, 'sepal_width': 3.8, 'petal_length': 6.4, 'petal_width': 2.0, 'species': 'virginica'},
            {'sepal_length': 6.4, 'sepal_width': 2.8, 'petal_length': 5.6, 'petal_width': 2.2, 'species': 'virginica'},
            {'sepal_length': 6.3, 'sepal_width': 2.8, 'petal_length': 5.1, 'petal_width': 1.5, 'species': 'virginica'},
            {'sepal_length': 6.1, 'sepal_width': 2.6, 'petal_length': 5.6, 'petal_width': 1.4, 'species': 'virginica'},
            {'sepal_length': 7.7, 'sepal_width': 3.0, 'petal_length': 6.1, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 6.3, 'sepal_width': 3.4, 'petal_length': 5.6, 'petal_width': 2.4, 'species': 'virginica'},
            {'sepal_length': 6.4, 'sepal_width': 3.1, 'petal_length': 5.5, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.0, 'sepal_width': 3.0, 'petal_length': 4.8, 'petal_width': 1.8, 'species': 'virginica'},
            {'sepal_length': 6.9, 'sepal_width': 3.1, 'petal_length': 5.4, 'petal_width': 2.1, 'species': 'virginica'},
            {'sepal_length': 6.7, 'sepal_width': 3.1, 'petal_length': 5.6, 'petal_width': 2.4, 'species': 'virginica'},
            {'sepal_length': 6.9, 'sepal_width': 3.1, 'petal_length': 5.1, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 5.8, 'sepal_width': 2.7, 'petal_length': 5.1, 'petal_width': 1.9, 'species': 'virginica'},
            {'sepal_length': 6.8, 'sepal_width': 3.2, 'petal_length': 5.9, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 6.7, 'sepal_width': 3.3, 'petal_length': 5.7, 'petal_width': 2.5, 'species': 'virginica'},
            {'sepal_length': 6.7, 'sepal_width': 3.0, 'petal_length': 5.2, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 6.3, 'sepal_width': 2.5, 'petal_length': 5.0, 'petal_width': 1.9, 'species': 'virginica'},
            {'sepal_length': 6.5, 'sepal_width': 3.0, 'petal_length': 5.2, 'petal_width': 2.0, 'species': 'virginica'},
            {'sepal_length': 6.2, 'sepal_width': 3.4, 'petal_length': 5.4, 'petal_width': 2.3, 'species': 'virginica'},
            {'sepal_length': 5.9, 'sepal_width': 3.0, 'petal_length': 5.1, 'petal_width': 1.8, 'species': 'virginica'}
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
    print("UNIFACEMA - ESTATÍSTICA")
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
    print("5 - Resumo Geral (Todos)")

    atributo = input("\\nDigite a opção: ")

    mapa = {
        "1":"sepal_length",
        "2":"sepal_width",
        "3":"petal_length",
        "4":"petal_width"
    }

    if atributo == "5":
        print("\\nRESUMO GERAL")
        print("-" * 60)
        print(f"{'Atributo':<25} | {'Média':<8} | {'Mediana':<8} | {'Moda'}")
        print("-" * 60)
        
        for cod, nome in mapa.items():
            v = [d[nome] for d in dados]
            media = round(calcular_media(v), 2)
            mediana = round(calcular_mediana(v), 2)
            moda = calcular_moda(v)
            print(f"{nome:<25} | {media:<8} | {mediana:<8} | {moda}")
        return

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

  const summaryStats = useMemo(() => {
    const data = selectedSpecies === 'All' 
      ? IRIS_DATA 
      : IRIS_DATA.filter(d => d.species === selectedSpecies);
    
    return ATTRIBUTES.map(attr => {
      const values = data.map(d => d[attr.value]);
      return {
        label: attr.label,
        count: values.length,
        mean: calculateMean(values),
        median: calculateMedian(values),
        mode: calculateMode(values),
        variance: calculateVariance(values),
        stdDev: calculateStdDev(values)
      };
    });
  }, [selectedSpecies]);

  const comparativeStats = useMemo(() => {
    const groups = [
      { label: 'Setosa', value: 'Iris-setosa', n: 50 },
      { label: 'Versicolor', value: 'Iris-versicolor', n: 50 },
      { label: 'Virginica', value: 'Iris-virginica', n: 50 },
    ];

    return groups.map(group => {
      const data = group.value === 'All' 
        ? IRIS_DATA 
        : IRIS_DATA.filter(d => d.species === group.value);
      
      const values = data.map(d => d[selectedAttr]);
      return {
        label: group.label,
        n: group.n,
        mean: calculateMean(values),
        median: calculateMedian(values),
        mode: calculateMode(values),
        variance: calculateVariance(values),
        stdDev: calculateStdDev(values)
      };
    });
  }, [selectedAttr]);

  const fullReportStats = useMemo(() => {
    const groups = [
      { label: 'Iris Setosa', value: 'Iris-setosa', n: 50 },
      { label: 'Iris Versicolor', value: 'Iris-versicolor', n: 50 },
      { label: 'Iris Virginica', value: 'Iris-virginica', n: 50 },
    ];

    return groups.map(group => {
      const data = group.value === 'All' 
        ? IRIS_DATA 
        : IRIS_DATA.filter(d => d.species === group.value);
      
      const stats = ATTRIBUTES.map(attr => {
        const values = data.map(d => d[attr.value]);
        return {
          attrLabel: attr.label,
          mean: calculateMean(values),
          median: calculateMedian(values),
          mode: calculateMode(values),
          variance: calculateVariance(values),
          stdDev: calculateStdDev(values)
        };
      });

      return { ...group, stats };
    });
  }, []);

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
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 15,
        duration: 0.6
      }
    }
  };

  const StatCard = ({ title, value, icon: Icon }: { title: string; value: number | string; icon: any }) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white border border-zinc-200 p-6 rounded-xl flex flex-col justify-between group relative"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-1.5 rounded bg-zinc-50 border border-zinc-100">
          <Icon className="w-3.5 h-3.5 text-zinc-500" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-mono font-bold text-zinc-900 tracking-tight">
          {typeof value === 'number' 
            ? (Number.isInteger(value) ? value : value.toFixed(4)) 
            : value}
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
                  UNIFACEMA
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <StatCard title="Amostras (n)" value={rawStats.count} icon={Hash} />
                <StatCard 
                  title="Média" 
                  value={rawStats.mean} 
                  icon={Calculator} 
                />
                <StatCard 
                  title="Mediana" 
                  value={rawStats.median} 
                  icon={TrendingUp} 
                />
                <div className="relative">
                  <StatCard 
                    title="Moda" 
                    value={rawStats.mode.length > 0 ? rawStats.mode.join(', ') : 'N/A'} 
                    icon={Hash} 
                  />
                </div>
                <StatCard title="Variância" value={rawStats.variance} icon={Layers} />
                <StatCard title="Desvio Padrão" value={rawStats.stdDev} icon={Maximize2} />
              </div>

              <motion.section 
                variants={itemVariants}
                className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl"
              >
                <div className="p-6 bg-zinc-800/50 border-b border-zinc-800 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold text-white italic font-serif">Visualização da Amostra (Dados Brutos)</h2>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Listagem Individual dos Registros ({SPECIES.find(s => s.value === selectedSpecies)?.label})</p>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-4 py-2 rounded-full border border-zinc-700">
                    Mostrando {selectedSpecies === 'All' ? 150 : 50} de 150 registros
                  </div>
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-zinc-950">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-zinc-900 z-10">
                      <tr className="border-b border-zinc-800">
                        <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">#</th>
                        <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Espécie</th>
                        <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Compr. Sépala</th>
                        <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Larg. Sépala</th>
                        <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Compr. Pétala</th>
                        <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center text-emerald-500">Larg. Pétala</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-[11px] text-zinc-400">
                      {(selectedSpecies === 'All' ? IRIS_DATA : IRIS_DATA.filter(d => d.species === selectedSpecies)).map((row, i) => (
                        <tr key={i} className="border-b border-zinc-900 hover:bg-zinc-800/20 transition-colors">
                          <td className="p-4 text-zinc-700 font-bold">{String(i + 1).padStart(3, '0')}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-tighter ${
                              row.species === 'Iris-setosa' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              row.species === 'Iris-versicolor' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                              'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                            }`}>
                              {row.species.replace('Iris-', '')}
                            </span>
                          </td>
                          <td className="p-4 text-center">{row.sepalLength.toFixed(1)}</td>
                          <td className="p-4 text-center">{row.sepalWidth.toFixed(1)}</td>
                          <td className="p-4 text-center">{row.petalLength.toFixed(1)}</td>
                          <td className="p-4 text-center font-bold text-zinc-300">{row.petalWidth.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>

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
                      <BarChart data={groupedTable} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis 
                          dataKey="label" 
                          fontSize={9} 
                          fontFamily="JetBrains Mono" 
                          tick={{fill: '#71717a'}}
                          axisLine={false}
                          tickLine={false}
                          dy={10}
                        />
                        <YAxis 
                          fontSize={9} 
                          fontFamily="JetBrains Mono" 
                          tick={{fill: '#71717a'}}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip 
                          cursor={{ fill: '#f8fafc', radius: 8 }}
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-4 border border-zinc-200 shadow-xl rounded-2xl">
                                  <p className="text-[10px] font-mono text-zinc-400 uppercase mb-2">Classe: {data.label}</p>
                                  <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                      <span className="text-2xl font-mono font-bold text-zinc-900">{data.fi}</span>
                                      <span className="text-[9px] text-zinc-400 uppercase font-bold">Frequência</span>
                                    </div>
                                    <div className="w-px h-8 bg-zinc-100" />
                                    <div className="flex flex-col">
                                      <span className="text-2xl font-mono font-bold text-zinc-900">{(data.fri * 100).toFixed(1)}%</span>
                                      <span className="text-[9px] text-zinc-400 uppercase font-bold">Relativa</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Bar 
                          dataKey="fi" 
                          fill="#18181b" 
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.section>

                <motion.section 
                  variants={itemVariants}
                  className="bg-zinc-50/50 rounded-2xl p-6 border border-zinc-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Estimativas Agrupadas</h2>
                    <div className="group relative">
                      <Calculator className="w-4 h-4 text-zinc-300 cursor-help" />
                      <div className="absolute right-0 top-6 w-48 p-3 bg-zinc-900 text-white text-[9px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-xl leading-relaxed">
                        Valores aproximados baseados nos pontos médios das classes. Podem divergir dos valores exatos.
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'Média', value: groupedStats.mean, icon: Calculator, color: 'text-emerald-600' },
                      { label: 'Mediana', value: groupedStats.median, icon: TrendingUp, color: 'text-blue-600' },
                      { label: 'Moda', value: groupedStats.mode, icon: Hash, color: 'text-indigo-600' },
                      { label: 'Variância', value: groupedStats.variance, icon: Layers, color: 'text-amber-600' },
                      { label: 'Desvio Padrão', value: groupedStats.stdDev, icon: BarChart3, color: 'text-rose-600' }
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between p-3 bg-white rounded-xl border border-zinc-100 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-zinc-50 ${stat.color}`}>
                            <stat.icon className="w-3 h-3" />
                          </div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{stat.label}</span>
                        </div>
                        <span className="text-lg font-mono font-bold text-zinc-900 tracking-tighter">
                          {stat.value.toFixed(4)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <p className="text-[9px] text-blue-700 leading-relaxed italic">
                      * A diferença ocorre porque o agrupamento assume que os dados estão no centro de cada classe.
                    </p>
                  </div>
                </motion.section>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <motion.div variants={itemVariants} className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                  <div className="p-6 bg-zinc-800/50 border-b border-zinc-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white">Tabela de Frequência (Não Agrupada)</h3>
                      <p className="text-[9px] font-mono text-zinc-500 mt-1">Valores discretos e suas ocorrências</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-700">
                      <Hash className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Valor (xi)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Freq (fi)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Relativa (fri)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Acumulada (Fi)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-right">Precisão (E)</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-[11px] text-zinc-400">
                        {ungroupedTable.map((row, i) => (
                          <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                            <td className="p-4 font-bold text-white">{row.value.toFixed(1)}</td>
                            <td className="p-4 text-center">{row.fi}</td>
                            <td className="p-4 text-center">{row.fri.toFixed(4)}</td>
                            <td className="p-4 text-center">{row.faci}</td>
                            <td className="p-4 text-right text-zinc-600">{row.fri.toExponential(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
                  <div className="p-6 bg-zinc-800/50 border-b border-zinc-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white">Tabela de Frequência (Agrupada)</h3>
                      <p className="text-[9px] font-mono text-zinc-500 mt-1">Intervalos de classe calculados via Sturges</p>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-700">
                      <Layers className="w-3 h-3 text-zinc-500" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-900/50">
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Classe</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Ponto Médio (xi)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Freq (fi)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Acumulada (Fi)</th>
                          <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-right">Precisão (E)</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-[11px] text-zinc-400">
                        {groupedTable.map((row, i) => (
                          <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                            <td className="p-4 font-bold text-white">{row.label}</td>
                            <td className="p-4 text-center">{row.xi.toFixed(2)}</td>
                            <td className="p-4 text-center">{row.fi}</td>
                            <td className="p-4 text-center">{row.faci}</td>
                            <td className="p-4 text-right text-zinc-600">{row.xi.toPrecision(6)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </motion.main>

              <motion.section 
                variants={itemVariants}
                className="bg-zinc-900 text-white rounded-xl p-8 border border-zinc-800 mt-12 shadow-2xl"
              >
                <div className="mb-10 text-center">
                  <h2 className="text-2xl font-bold italic font-serif">Relatório de Análise Comparativa</h2>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-2">Visão Multidimensional • Dataset Iris</p>
                </div>

                <div className="space-y-12">
                  {fullReportStats.map((group, groupIdx) => (
                    <div key={groupIdx} className="relative">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-zinc-800" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500">{group.label} (N={group.n})</h3>
                        <div className="h-px flex-1 bg-zinc-800" />
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-zinc-800/30">
                              <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Atributo</th>
                              <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Média</th>
                              <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Mediana</th>
                              <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Moda</th>
                              <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Variância</th>
                              <th className="p-4 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-right">Desvio Padrão</th>
                            </tr>
                          </thead>
                          <tbody className="font-mono text-[11px] text-zinc-400">
                            {group.stats.map((stat, i) => (
                              <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors">
                                <td className="p-4 font-bold text-white">{stat.attrLabel}</td>
                                <td className="p-4 text-center">{stat.mean.toFixed(2)}</td>
                                <td className="p-4 text-center">{stat.median.toFixed(2)}</td>
                                <td className="p-4 text-center text-emerald-400">{stat.mode.join(', ')}</td>
                                <td className="p-4 text-center">{stat.variance.toFixed(4)}</td>
                                <td className="p-4 text-right font-bold text-zinc-300">{stat.stdDev.toFixed(4)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

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
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-[#2a2a2a] w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#333333]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Terminal className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Implementação Python</h3>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Algoritmos Manuais • iris_stats.py</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-300 hover:text-white flex items-center gap-2 text-xs font-mono"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                  <button
                    onClick={() => setShowCode(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-8 overflow-auto max-h-[70vh] custom-scrollbar bg-[#2a2a2a]">
                <pre className="font-mono text-sm text-emerald-300 leading-relaxed">
                  <code>{PYTHON_CODE}</code>
                </pre>
              </div>
              <div className="p-4 bg-[#333333] border-t border-white/10 text-center">
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
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
