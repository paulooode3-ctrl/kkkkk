import React, { useState, useMemo } from 'react';
import { IRIS_DATA, IrisRecord } from '../data/iris';
import { 
  getRawStats, 
  getUngroupedFrequencyTable, 
  getGroupedFrequencyTable, 
  getGroupedStats,
  RawStats,
  GroupedStats,
  FrequencyTableEntry,
  GroupedFrequencyEntry
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
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

type Attribute = keyof Omit<IrisRecord, 'species'>;
const ATTRIBUTES: { label: string; value: Attribute }[] = [
  { label: 'Sepal Length', value: 'sepalLength' },
  { label: 'Sepal Width', value: 'sepalWidth' },
  { label: 'Petal Length', value: 'petalLength' },
  { label: 'Petal Width', value: 'petalWidth' },
];

const SPECIES = ['All', 'Iris-setosa', 'Iris-versicolor', 'Iris-virginica'];

const StatsDashboard: React.FC = () => {
  const [selectedAttr, setSelectedAttr] = useState<Attribute>('petalLength');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('All');

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

  const StatCard = ({ title, value, unit = '' }: { title: string; value: string | number; unit?: string }) => (
    <div className="bg-white border border-zinc-200 p-4 rounded-lg shadow-sm">
      <p className="text-[11px] font-serif italic text-zinc-500 uppercase tracking-wider mb-1">{title}</p>
      <p className="text-2xl font-mono font-medium text-zinc-900">
        {typeof value === 'number' ? value.toFixed(4) : value}
        <span className="text-sm ml-1 text-zinc-400">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans p-6 md:p-10">
      <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Flower2 className="w-5 h-5 text-zinc-600" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">Biological Data Analysis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic tracking-tight leading-none">
            Iris Stats Explorer
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-1">
              <Database className="w-3 h-3" /> Attribute
            </label>
            <select 
              value={selectedAttr}
              onChange={(e) => setSelectedAttr(e.target.value as Attribute)}
              className="bg-white border border-zinc-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
            >
              {ATTRIBUTES.map(attr => (
                <option key={attr.value} value={attr.value}>{attr.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Species
            </label>
            <select 
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="bg-white border border-zinc-300 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
            >
              {SPECIES.map(s => (
                <option key={s} value={s}>{s.replace('Iris-', '')}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        {/* Raw Data Stats */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-300 pb-2">
            <Calculator className="w-4 h-4" />
            <h2 className="text-sm font-mono uppercase tracking-widest font-bold">Descriptive Statistics (Raw Data)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard title="Mean" value={rawStats.mean} />
            <StatCard title="Median" value={rawStats.median} />
            <StatCard title="Mode" value={rawStats.mode.length > 5 ? 'Multiple' : rawStats.mode.join(', ')} />
            <StatCard title="Variance" value={rawStats.variance} />
            <StatCard title="Std. Deviation" value={rawStats.stdDev} />
          </div>
        </section>

        {/* Frequency Distribution Visual */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <h2 className="text-sm font-mono uppercase tracking-widest font-bold">Frequency Distribution</h2>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">n = {filteredData.length}</span>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={groupedTable}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="label" 
                    fontSize={10} 
                    fontFamily="JetBrains Mono" 
                    tick={{fill: '#888'}}
                    axisLine={{stroke: '#ddd'}}
                  />
                  <YAxis 
                    fontSize={10} 
                    fontFamily="JetBrains Mono" 
                    tick={{fill: '#888'}}
                    axisLine={{stroke: '#ddd'}}
                  />
                  <Tooltip 
                    contentStyle={{ fontFamily: 'JetBrains Mono', fontSize: '12px', borderRadius: '8px', border: '1px solid #eee' }}
                    cursor={{fill: '#f5f5f5'}}
                  />
                  <Bar dataKey="fi" fill="#141414" radius={[4, 4, 0, 0]}>
                    {groupedTable.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#141414' : '#444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <TableIcon className="w-4 h-4" />
              <h2 className="text-sm font-mono uppercase tracking-widest font-bold">Grouped Data Stats</h2>
            </div>
            <div className="space-y-4 flex-1">
              <div className="border-b border-zinc-100 pb-3">
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Grouped Mean</p>
                <p className="text-2xl font-mono">{groupedStats.mean.toFixed(4)}</p>
              </div>
              <div className="border-b border-zinc-100 pb-3">
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Grouped Median</p>
                <p className="text-2xl font-mono">{groupedStats.median.toFixed(4)}</p>
              </div>
              <div className="border-b border-zinc-100 pb-3">
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Grouped Variance</p>
                <p className="text-2xl font-mono">{groupedStats.variance.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400 mb-1">Grouped Std. Dev</p>
                <p className="text-2xl font-mono">{groupedStats.stdDev.toFixed(4)}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-100">
              <p className="text-[9px] font-mono text-zinc-400 leading-relaxed italic">
                * Calculated using class midpoints (xi) and Sturges' rule for interval determination.
              </p>
            </div>
          </div>
        </section>

        {/* Data Tables */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Ungrouped Table */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase tracking-widest font-bold">Frequency Table (Ungrouped)</h3>
              <span className="text-[10px] font-mono text-zinc-400">Discrete Values</span>
            </div>
            <div className="max-height-[400px] overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="border-b border-zinc-200">
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Value (xi)</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Freq (fi)</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Rel. Freq (fri)</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Cum. Freq (Fac)</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {ungroupedTable.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                      <td className="p-3">{row.value.toFixed(1)}</td>
                      <td className="p-3">{row.fi}</td>
                      <td className="p-3">{row.fri.toFixed(4)}</td>
                      <td className="p-3">{row.faci}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grouped Table */}
          <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase tracking-widest font-bold">Frequency Table (Grouped)</h3>
              <span className="text-[10px] font-mono text-zinc-400">Interval Classes</span>
            </div>
            <div className="max-height-[400px] overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-white shadow-sm">
                  <tr className="border-b border-zinc-200">
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Class Interval</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Midpoint (xi)</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Freq (fi)</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Rel. Freq (fri)</th>
                    <th className="p-3 text-[10px] font-serif italic text-zinc-500 uppercase">Cum. Freq (Fac)</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {groupedTable.map((row, i) => (
                    <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                      <td className="p-3">{row.label}</td>
                      <td className="p-3">{row.xi.toFixed(2)}</td>
                      <td className="p-3">{row.fi}</td>
                      <td className="p-3">{row.fri.toFixed(4)}</td>
                      <td className="p-3">{row.faci}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Analysis Summary */}
        <section className="bg-[#141414] text-[#E4E3E0] rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif italic mb-6">Statistical Insights</h2>
            <div className="space-y-6 font-sans text-lg opacity-90 leading-relaxed">
              <p>
                The analysis of the <span className="font-mono text-sm bg-zinc-800 px-2 py-0.5 rounded">{selectedAttr}</span> for 
                <span className="font-mono text-sm bg-zinc-800 px-2 py-0.5 rounded">{selectedSpecies}</span> species reveals 
                a distribution with a mean of <span className="font-bold">{rawStats.mean.toFixed(2)}</span>.
              </p>
              <p>
                Using Sturges' rule, we've divided the data into <span className="font-bold">{groupedTable.length}</span> classes. 
                The grouped mean (<span className="font-bold">{groupedStats.mean.toFixed(2)}</span>) shows a high degree of 
                consistency with the raw mean, indicating that the chosen class intervals effectively represent the underlying distribution.
              </p>
              <div className="pt-6 border-t border-zinc-800 flex flex-wrap gap-8">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Variability</p>
                  <p className="text-sm">The standard deviation of {rawStats.stdDev.toFixed(3)} suggests {rawStats.stdDev > 1 ? 'significant' : 'low'} dispersion in the measurements.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Centrality</p>
                  <p className="text-sm">The proximity of mean ({rawStats.mean.toFixed(2)}) and median ({rawStats.median.toFixed(2)}) indicates a {Math.abs(rawStats.mean - rawStats.median) < 0.1 ? 'highly symmetric' : 'slightly skewed'} distribution.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto mt-20 pb-10 border-t border-zinc-300 pt-6 flex justify-between items-center">
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">© 2026 Iris Stats Explorer • Manual Algorithm Implementation</p>
        <div className="flex gap-4">
          <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
          <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
          <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
        </div>
      </footer>
    </div>
  );
};

export default StatsDashboard;
