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
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
            <span>SLA Compliance Velocity & Breach Trends</span>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Current: 86.2%
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tracking month-over-month compliance % and average resolution days
          </p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={SLA_TREND_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#0284c7" fontSize={12} domain={[60, 100]} />
              <YAxis yAxisId="right" orientation="right" stroke="#e11d48" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: '#0f172a'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="complianceRate"
                name="SLA Compliance %"
                stroke="#0284c7"
                strokeWidth={3}
                dot={{ r: 4, fill: '#0284c7' }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="averageDays"
                name="Avg Resolution (Days)"
                stroke="#d97706"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Departmental Comparison */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
            <span>Departmental Performance vs 90% Statutory Target</span>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Benchmark: 90%
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[50, 100]} stroke="#64748b" fontSize={12} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                width={110}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: '#0f172a'
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
