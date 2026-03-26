/**
 * Manual implementation of statistical functions as requested.
 * No external libraries like mathjs or numpy are used for core calculations.
 */

export interface RawStats {
  mean: number;
  median: number;
  mode: number[];
  variance: number;
  stdDev: number;
}

export interface FrequencyTableEntry {
  value: number;
  fi: number; // Absolute frequency
  fri: number; // Relative frequency
  faci: number; // Cumulative frequency
}

export interface GroupedFrequencyEntry {
  lowerBound: number;
  upperBound: number;
  label: string;
  xi: number; // Midpoint
  fi: number; // Absolute frequency
  fri: number; // Relative frequency
  faci: number; // Cumulative frequency
}

export interface GroupedStats {
  mean: number;
  median: number;
  mode: number;
  variance: number;
  stdDev: number;
}

// --- Raw Data Calculations ---

export function calculateMean(data: number[]): number {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
}

export function calculateMedian(data: number[]): number {
  if (data.length === 0) return 0;
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

export function calculateMode(data: number[]): number[] {
  if (data.length === 0) return [];
  const counts: { [key: number]: number } = {};
  let maxCount = 0;
  data.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
    if (counts[val] > maxCount) maxCount = counts[val];
  });

  const modes = Object.keys(counts)
    .filter(key => counts[Number(key)] === maxCount)
    .map(Number);
  
  return modes;
}

export function calculateVariance(data: number[]): number {
  if (data.length < 2) return 0;
  const mean = calculateMean(data);
  const sumSqDiff = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / (data.length - 1); // Sample variance
}

export function calculateStdDev(data: number[]): number {
  return Math.sqrt(calculateVariance(data));
}

export function getRawStats(data: number[]): RawStats {
  return {
    mean: calculateMean(data),
    median: calculateMedian(data),
    mode: calculateMode(data),
    variance: calculateVariance(data),
    stdDev: calculateStdDev(data),
  };
}

// --- Frequency Distribution (Ungrouped) ---

export function getUngroupedFrequencyTable(data: number[]): FrequencyTableEntry[] {
  if (data.length === 0) return [];
  const sorted = [...data].sort((a, b) => a - b);
  const counts: { [key: number]: number } = {};
  sorted.forEach(val => {
    counts[val] = (counts[val] || 0) + 1;
  });

  const uniqueValues = Object.keys(counts).map(Number).sort((a, b) => a - b);
  let cumulative = 0;
  const total = data.length;

  return uniqueValues.map(val => {
    const fi = counts[val];
    cumulative += fi;
    return {
      value: val,
      fi,
      fri: fi / total,
      faci: cumulative
    };
  });
}

// --- Frequency Distribution (Grouped) ---

export function getGroupedFrequencyTable(data: number[]): GroupedFrequencyEntry[] {
  if (data.length === 0) return [];
  
  const n = data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  // Sturges' Rule: k = 1 + 3.322 * log10(n)
  const k = Math.ceil(1 + 3.322 * Math.log10(n));
  
  // Handle case where all values are the same (range is 0)
  if (range === 0) {
    return [{
      lowerBound: min - 0.5,
      upperBound: min + 0.5,
      label: `${min.toFixed(2)}`,
      xi: min,
      fi: n,
      fri: 1,
      faci: n
    }];
  }

  const h = range / k; // Class width

  const table: GroupedFrequencyEntry[] = [];
  let cumulative = 0;

  for (let i = 0; i < k; i++) {
    const lower = min + i * h;
    const upper = min + (i + 1) * h;
    
    // Count values in [lower, upper) except for last class which is [lower, upper]
    const fi = data.filter(val => {
      if (i === k - 1) {
        return val >= lower && val <= upper;
      }
      return val >= lower && val < upper;
    }).length;

    cumulative += fi;
    table.push({
      lowerBound: lower,
      upperBound: upper,
      label: `${lower.toFixed(2)} |--- ${upper.toFixed(2)}`,
      xi: (lower + upper) / 2,
      fi,
      fri: fi / n,
      faci: cumulative
    });
  }

  return table;
}

// --- Grouped Data Calculations ---

export function calculateGroupedMean(table: GroupedFrequencyEntry[]): number {
  const totalFiXi = table.reduce((acc, entry) => acc + entry.fi * entry.xi, 0);
  const totalFi = table.reduce((acc, entry) => acc + entry.fi, 0);
  return totalFiXi / totalFi;
}

export function calculateGroupedMedian(table: GroupedFrequencyEntry[]): number {
  const n = table.reduce((acc, entry) => acc + entry.fi, 0);
  const halfN = n / 2;
  
  // Find median class
  const medianClassIndex = table.findIndex(entry => entry.faci >= halfN);
  if (medianClassIndex === -1) return 0;

  const medianClass = table[medianClassIndex];
  const prevFaci = medianClassIndex > 0 ? table[medianClassIndex - 1].faci : 0;
  const h = medianClass.upperBound - medianClass.lowerBound;
  
  // Median = L + ((n/2 - Fac_prev) / f_median) * h
  return medianClass.lowerBound + ((halfN - prevFaci) / medianClass.fi) * h;
}

export function calculateGroupedVariance(table: GroupedFrequencyEntry[]): number {
  const n = table.reduce((acc, entry) => acc + entry.fi, 0);
  if (n < 2) return 0;
  const mean = calculateGroupedMean(table);
  
  const sumFiXiSq = table.reduce((acc, entry) => acc + entry.fi * Math.pow(entry.xi - mean, 2), 0);
  return sumFiXiSq / (n - 1);
}

export function calculateGroupedMode(table: GroupedFrequencyEntry[]): number {
  if (table.length === 0) return 0;
  
  // Find modal class (class with highest frequency)
  let modalClassIndex = 0;
  let maxFi = -1;
  
  table.forEach((entry, i) => {
    if (entry.fi > maxFi) {
      maxFi = entry.fi;
      modalClassIndex = i;
    }
  });

  const modalClass = table[modalClassIndex];
  const fi = modalClass.fi;
  const fiPrev = modalClassIndex > 0 ? table[modalClassIndex - 1].fi : 0;
  const fiNext = modalClassIndex < table.length - 1 ? table[modalClassIndex + 1].fi : 0;
  const h = modalClass.upperBound - modalClass.lowerBound;

  const denominator = (fi - fiPrev) + (fi - fiNext);
  if (denominator === 0) return modalClass.xi; // Avoid division by zero if all classes have same frequency

  // Mode = L + ((fi - fi_prev) / ((fi - fi_prev) + (fi - fi_next))) * h
  return modalClass.lowerBound + ((fi - fiPrev) / denominator) * h;
}

export function getGroupedStats(table: GroupedFrequencyEntry[]): GroupedStats {
  return {
    mean: calculateGroupedMean(table),
    median: calculateGroupedMedian(table),
    mode: calculateGroupedMode(table),
    variance: calculateGroupedVariance(table),
    stdDev: Math.sqrt(calculateGroupedVariance(table))
  };
}
