import React from 'react';
import { Clock, CheckCircle2, AlertOctagon, TrendingUp, IndianRupee, ShieldAlert } from 'lucide-react';

interface MetricCardsProps {
  totalApps: number;
  complianceRate: number;
  breachCount: number;
  atRiskCount: number;
  totalPenaltiesINR: number;
  avgResolutionDays: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  totalApps,
  complianceRate,
  breachCount,
  atRiskCount,
  totalPenaltiesINR,
  avgResolutionDays,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* 1. Statewide Compliance */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-sky-500/40 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">SLA Compliance</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">{complianceRate}%</div>
        <div className="mt-2 flex items-center text-xs text-emerald-400">
          <TrendingUp className="h-3.5 w-3.5 mr-1" />
          <span>+2.8% vs last month</span>
        </div>
      </div>

      {/* 2. Total Ingested Applications */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-sky-500/40 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Stream</span>
          <Clock className="h-4 w-4 text-sky-400" />
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">{(totalApps).toLocaleString()}</div>
        <div className="mt-2 text-xs text-slate-400">
          Sewa Setu real-time sync
        </div>
      </div>

      {/* 3. T-48h Early Warning */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-xl p-4 shadow-sm hover:border-amber-500/40 transition-all">
        <div className="flex items-center justify-between text-amber-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">T-48h At Risk</span>
          <ShieldAlert className="h-4 w-4 text-amber-400" />
        </div>
        <div className="text-2xl font-bold text-amber-300 tracking-tight">{atRiskCount}</div>
        <div className="mt-2 text-xs text-amber-400/80">
          Proactive intervention triggered
        </div>
      </div>

      {/* 4. Breached Applications */}
      <div className="bg-slate-900/90 border border-rose-900/40 rounded-xl p-4 shadow-sm hover:border-rose-500/40 transition-all">
        <div className="flex items-center justify-between text-rose-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Active Breaches</span>
          <AlertOctagon className="h-4 w-4 text-rose-400" />
        </div>
        <div className="text-2xl font-bold text-rose-300 tracking-tight">{breachCount}</div>
        <div className="mt-2 text-xs text-rose-400/80">
          Auto-escalated to First Appellate
        </div>
      </div>

      {/* 5. Avg Turnaround Days */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-sky-500/40 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Avg Turnaround</span>
          <Clock className="h-4 w-4 text-indigo-400" />
        </div>
        <div className="text-2xl font-bold text-white tracking-tight">{avgResolutionDays} <span className="text-sm font-normal text-slate-400">Days</span></div>
        <div className="mt-2 text-xs text-slate-400">
          Statutory ceiling: 15.0d
        </div>
      </div>

      {/* 6. Statutory Penalties Accrued */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-sm hover:border-purple-500/40 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">RTPS Penalties</span>
          <IndianRupee className="h-4 w-4 text-purple-400" />
        </div>
        <div className="text-2xl font-bold text-purple-300 tracking-tight">₹{totalPenaltiesINR.toLocaleString()}</div>
        <div className="mt-2 text-xs text-purple-400/80">
          Sec 7(1) ₹250/day rule
        </div>
      </div>
    </div>
  );
};
