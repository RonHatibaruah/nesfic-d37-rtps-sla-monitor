import React from 'react';
import { DistrictSummary } from '../types/rtps';
import { Award, ChevronRight } from 'lucide-react';

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
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>District Performance & SLA Compliance Index</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
              35 Districts
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked by statutory on-time resolution percentage under Assam RTPS Act
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-700">
          <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200">
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
          <tbody className="divide-y divide-slate-200 font-medium text-xs">
            {districts.map((d) => {
              const isSelected = selectedDistrict === d.district;
              const isTop = d.rank <= 3;

              return (
                <tr
                  key={d.district}
                  onClick={() => onSelectDistrict(d.district)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sky-50 border-l-4 border-sky-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        d.rank === 1
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : d.rank === 2
                          ? 'bg-slate-200 text-slate-700 border border-slate-300'
                          : d.rank === 3
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {d.rank}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      {d.district}
                      {isTop && <Award className="h-3.5 w-3.5 text-amber-500" />}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
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
                            ? 'text-emerald-700'
                            : d.onTimePercent >= 80
                            ? 'text-amber-700'
                            : 'text-rose-600'
                        }`}
                      >
                        {d.onTimePercent}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-700">
                    {d.totalApplications.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 font-mono text-rose-600 font-bold">
                    {d.breachedCount}
                  </td>

                  <td className="py-3 px-4 font-mono text-amber-700 font-semibold">
                    {d.atRiskCount}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded border ${
                        d.topBottleneck.includes('Field')
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {d.topBottleneck}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-right">
                    <ChevronRight className="h-4 w-4 text-slate-400 inline" />
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
