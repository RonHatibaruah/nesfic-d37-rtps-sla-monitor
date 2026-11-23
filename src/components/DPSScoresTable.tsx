import React, { useState } from 'react';
import { DPSRecord } from '../types/rtps';
import { AlertTriangle, Award, CheckCircle, ShieldAlert, Search } from 'lucide-react';

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
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Designated Public Servant (DPS) & Office Accountability Index</span>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
              Continuous Scoring
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Differentiates chronic underperformers from one-off delays under Assam RTPS Act rules
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search DPS officer or circle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-48 sm:w-60"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500"
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
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200">
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
          <tbody className="divide-y divide-slate-200 font-medium text-xs">
            {filtered.map((dps) => {
              const isChronic = dps.category === 'chronic_underperformer';
              const isStellar = dps.category === 'stellar';

              return (
                <tr
                  key={dps.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDPS(dps)}
                >
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">{dps.name}</div>
                    <div className="text-xs text-slate-500">{dps.designation}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-slate-800 text-xs">{dps.office}</div>
                    <div className="text-xs text-slate-500">{dps.district}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs text-slate-700">
                    {dps.totalReceived}
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <span
                      className={`font-bold ${
                        dps.onTimeRate >= 90
                          ? 'text-emerald-700'
                          : dps.onTimeRate >= 75
                          ? 'text-amber-700'
                          : 'text-rose-600'
                      }`}
                    >
                      {dps.onTimeRate}%
                    </span>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs text-slate-700">
                    {dps.avgResolutionDays}d
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-100 border border-slate-200 rounded-full h-1.5">
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
                      <span className="font-semibold text-slate-800">{dps.complianceScore}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {isChronic && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <AlertTriangle className="h-3 w-3 text-rose-600" />
                        Chronic Delay
                      </span>
                    )}
                    {dps.category === 'at_risk' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <ShieldAlert className="h-3 w-3 text-amber-600" />
                        Watchlist
                      </span>
                    )}
                    {isStellar && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Award className="h-3 w-3 text-emerald-600" />
                        Top Performer
                      </span>
                    )}
                    {dps.category === 'satisfactory' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        Satisfactory
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {isChronic ? (
                      <span className="text-xs text-rose-600 font-mono font-bold">
                        Notice Issued (₹{dps.totalPenaltiesINR})
                      </span>
                    ) : isStellar ? (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-emerald-600" /> Commended
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
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-300 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">{selectedDPS.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                  {selectedDPS.id}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {selectedDPS.designation} · {selectedDPS.office}, {selectedDPS.district}
              </p>
            </div>
            <button
              onClick={() => setSelectedDPS(null)}
              className="text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-300 px-2.5 py-1 rounded"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Total Applications:</span>
              <span className="font-mono text-slate-900 text-sm font-bold">{selectedDPS.totalReceived}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Pending Breached:</span>
              <span className="font-mono text-rose-600 text-sm font-bold">{selectedDPS.pendingBreached}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Statutory Liability (Sec 7):</span>
              <span className="font-mono text-amber-800 text-sm font-bold">₹{selectedDPS.totalPenaltiesINR}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Performance Category:</span>
              <span className="font-bold uppercase text-sky-700">{selectedDPS.category.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
