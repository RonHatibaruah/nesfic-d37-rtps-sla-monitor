import React, { useState } from 'react';
import { IndianRupee, Calculator, Award, AlertCircle, FileCheck, ShieldAlert } from 'lucide-react';

export const PenaltyCalculator: React.FC = () => {
  const [daysOverdue, setDaysOverdue] = useState<number>(5);
  const [perDayRate, setPerDayRate] = useState<number>(250); // Assam RTPS Section 7 statutory standard
  const [isWillfulDefault, setIsWillfulDefault] = useState<boolean>(true);
  const [applicantCompensationPercent, setApplicantCompensationPercent] = useState<number>(80);

  const rawPenalty = daysOverdue * perDayRate;
  const statutoryCap = 25000;
  const finalPenalty = Math.min(rawPenalty, statutoryCap);
  const applicantCompensation = Math.round((finalPenalty * applicantCompensationPercent) / 100);
  const stateTreasury = finalPenalty - applicantCompensation;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <span>Assam RTPS Act (Sec 7 & 9) Penalty & Incentive Engine</span>
          <span className="text-xs px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-normal">
            Automated Enforcement
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Computes statutory recovery from defaulting DPS officers and compensation payable to aggrieved citizens
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Days Overdue Beyond Mandated SLA Timeline:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="60"
                value={daysOverdue}
                onChange={(e) => setDaysOverdue(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <span className="font-mono text-base font-bold text-sky-400 w-12 text-right">
                {daysOverdue}d
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Statutory Fine / Day (INR):
              </label>
              <input
                type="number"
                value={perDayRate}
                onChange={(e) => setPerDayRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-sky-500"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                RTPS Act baseline: ₹250/day
              </span>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">
                Citizen Share (%):
              </label>
              <input
                type="number"
                value={applicantCompensationPercent}
                onChange={(e) => setApplicantCompensationPercent(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:border-sky-500"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Disbursed to citizen bank account
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={isWillfulDefault}
                onChange={(e) => setIsWillfulDefault(e.target.checked)}
                className="rounded accent-sky-500"
              />
              <span>Trigger Adverse Entry in Annual Confidential Report (ACR)</span>
            </label>
            <p className="text-[11px] text-slate-500 mt-1 pl-5">
              Recommended automatically by the platform for chronic underperformers with &gt;3 consecutive breaches.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase font-semibold tracking-wider">Statutory Recovery Order</span>
              <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                ENFORCEABLE DOCKET
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Total Penalty Deductible from DPS Salary</span>
              <div className="text-3xl font-extrabold text-rose-400 font-mono mt-1">
                ₹{finalPenalty.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                Calculated under Section 7(1) of Assam Right to Public Services Act
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                <span className="text-slate-400 block">Direct Citizen Compensation:</span>
                <span className="font-mono text-emerald-400 font-bold text-base mt-0.5 block">
                  ₹{applicantCompensation.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Auto-credited via DBT / PFMS</span>
              </div>

              <div className="p-3 rounded-lg bg-sky-950/20 border border-sky-800/40">
                <span className="text-slate-400 block">State Administrative Fund:</span>
                <span className="font-mono text-sky-400 font-bold text-base mt-0.5 block">
                  ₹{stateTreasury.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">Credited to Head of Account</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Status in appellate chain:</span>
            <button className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow transition-colors">
              Export Statutory Recovery Memo (.PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
