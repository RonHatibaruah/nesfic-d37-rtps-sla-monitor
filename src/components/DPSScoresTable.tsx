import React, { useState } from 'react';
import { DPSRecord } from '../types/rtps';
import { AlertTriangle, Award, FileText, CheckCircle, ShieldAlert, Search, Filter } from 'lucide-react';

interface DPSScoresTableProps {
  dpsRecords: DPSRecord[];
}

export const DPSScoresTable: React.FC<DPSScoresTableProps> = ({ dpsRecords }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDPS, setSelectedDPS] = useState<DPSRecord | null>(null);

  const filtered = dpsRecords.filter((dps) => {
    const matchesCategory =
      filterCategory === 'all' || dps.category === filterCategory;
    const matchesSearch =
      dps.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dps.office.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dps.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Designated Public Servant (DPS) & Office Accountability Index</span>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800 font-normal">
              Continuous Scoring
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Differentiates chronic underperformers from one-off delays under Assam RTPS Act rules
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search DPS officer or circle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-48 sm:w-60"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Performers</option>
            <option value="chronic_underperformer">🚨 Chronic Underperformers</option>
            <option value="at_risk">⚠️ At-Risk DPS</option>
            <option value="stellar">⭐ Stellar / Commendation</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs uppercase bg-slate-950/60 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-3">DPS Officer & Designation</th>
              <th className="py-3 px-4">Office & District</th>
              <th className="py-3 px-3">Handled</th>
              <th className="py-3 px-3">On-Time %</th>
              <th className="py-3 px-3">Avg Days</th>
              <th className="py-3 px-3">Compliance Index</th>
              <th className="py-3 px-3">Status Category</th>
              <th className="py-3 px-3">Statutory Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filtered.map((dps) => {
              const isChronic = dps.category === 'chronic_underperformer';
              const isStellar = dps.category === 'stellar';

              return (
                <tr
                  key={dps.id}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                  onClick={() => setSelectedDPS(dps)}
                >
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{dps.name}</div>
                    <div className="text-xs text-slate-400">{dps.designation}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-slate-300 text-xs">{dps.office}</div>
                    <div className="text-xs text-slate-500">{dps.district}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    {dps.totalReceived}
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <span
                      className={`font-bold ${
                        dps.onTimeRate >= 90
                          ? 'text-emerald-400'
                          : dps.onTimeRate >= 75
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {dps.onTimeRate}%
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs text-slate-300">
                    {dps.avgResolutionDays}d
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            dps.complianceScore >= 80
                              ? 'bg-emerald-500'
                              : dps.complianceScore >= 60
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${dps.complianceScore}%` }}
                        />
                      </div>
                      <span className="font-semibold">{dps.complianceScore}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {isChronic && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800">
                        <AlertTriangle className="h-3 w-3" />
                        Chronic Delay
                      </span>
                    )}
                    {dps.category === 'at_risk' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800">
                        <ShieldAlert className="h-3 w-3" />
                        Watchlist
                      </span>
                    )}
                    {isStellar && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        <Award className="h-3 w-3 text-emerald-400" />
                        Top Performer
                      </span>
                    )}
                    {dps.category === 'satisfactory' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300">
                        Satisfactory
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {isChronic ? (
                      <span className="text-xs text-rose-400 font-mono font-semibold">
                        Notice Issued (₹{dps.totalPenaltiesINR})
                      </span>
                    ) : isStellar ? (
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Commended
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Regular Monitoring</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal / Detail View when DPS is clicked */}
      {selectedDPS && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-sky-800/60 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{selectedDPS.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                  {selectedDPS.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {selectedDPS.designation} · {selectedDPS.office}, {selectedDPS.district}
              </p>
            </div>
            <button
              onClick={() => setSelectedDPS(null)}
              className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Total Applications:</span>
              <span className="font-mono text-white text-sm font-semibold">{selectedDPS.totalReceived}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Pending Breached:</span>
              <span className="font-mono text-rose-400 text-sm font-semibold">{selectedDPS.pendingBreached}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Statutory Liability (Sec 7):</span>
              <span className="font-mono text-amber-300 text-sm font-semibold">₹{selectedDPS.totalPenaltiesINR}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Performance Category:</span>
              <span className="font-bold uppercase text-sky-400">{selectedDPS.category.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
