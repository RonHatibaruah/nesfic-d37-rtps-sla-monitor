import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SLA_TREND_DATA, DEPARTMENT_COMPLIANCE } from '../data/mockData';

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Statewide SLA Trend */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>SLA Compliance Velocity & Breach Trends</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              Current: 86.2%
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tracking month-over-month compliance % and average resolution days
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SLA_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#38bdf8" fontSize={12} domain={[60, 100]} />
              <YAxis yAxisId="right" orientation="right" stroke="#f43f5e" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="complianceRate"
                name="SLA Compliance %"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ r: 4, fill: '#0284c7' }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageDays"
                name="Avg Resolution (Days)"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Departmental Comparison */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>Departmental Performance vs 90% Statutory Target</span>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Benchmark: 90%
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Key departments under Assam Right to Public Services (Sewa Setu)
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DEPARTMENT_COMPLIANCE}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
              <XAxis type="number" domain={[50, 100]} stroke="#94a3b8" fontSize={12} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                fontSize={11}
                width={110}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                }}
              />
              <Bar
                dataKey="compliance"
                name="Compliance %"
                fill="#0284c7"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
