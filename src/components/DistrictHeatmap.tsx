import React from 'react';
import { DistrictSummary } from '../types/rtps';
import { Award, AlertTriangle, ChevronRight } from 'lucide-react';

interface DistrictHeatmapProps {
  districts: DistrictSummary[];
  onSelectDistrict: (district: string) => void;
  selectedDistrict: string | null;
}

export const DistrictHeatmap: React.FC<DistrictHeatmapProps> = ({
  districts,
  onSelectDistrict,
  selectedDistrict,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>District Performance & SLA Compliance Index</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-normal">
              35 Districts
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked by statutory on-time resolution percentage under Assam RTPS Act
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs uppercase bg-slate-950/60 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-3">Rank</th>
              <th className="py-3 px-4">District</th>
              <th className="py-3 px-4">On-Time SLA %</th>
              <th className="py-3 px-4">Total Volume</th>
              <th className="py-3 px-4">Breached</th>
              <th className="py-3 px-4">T-48h At Risk</th>
              <th className="py-3 px-4">Primary Bottleneck</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {districts.map((d) => {
              const isSelected = selectedDistrict === d.district;
              const isTop = d.rank <= 3;
              const isCritical = d.onTimePercent < 80;

              return (
                <tr
                  key={d.district}
                  onClick={() => onSelectDistrict(d.district)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sky-950/40 border-l-4 border-sky-500'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        d.rank === 1
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : d.rank === 2
                          ? 'bg-slate-300/20 text-slate-200 border border-slate-400/40'
                          : d.rank === 3
                          ? 'bg-amber-700/20 text-amber-500 border border-amber-600/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {d.rank}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      {d.district}
                      {isTop && <Award className="h-3.5 w-3.5 text-amber-400" />}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            d.onTimePercent >= 90
                              ? 'bg-emerald-500'
                              : d.onTimePercent >= 80
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${d.onTimePercent}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-mono font-bold ${
                          d.onTimePercent >= 90
                            ? 'text-emerald-400'
                            : d.onTimePercent >= 80
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {d.onTimePercent}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-300">
                    {d.totalApplications.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 font-mono text-rose-400 font-semibold">
                    {d.breachedCount}
                  </td>

                  <td className="py-3 px-4 font-mono text-amber-400">
                    {d.atRiskCount}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded border ${
                        d.topBottleneck.includes('Field')
                          ? 'bg-amber-950/40 text-amber-300 border-amber-800/60'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {d.topBottleneck}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-right">
                    <ChevronRight className="h-4 w-4 text-slate-500 inline" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
