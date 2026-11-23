import React from 'react';
import { BreachAlert } from '../types/rtps';
import { AlertOctagon, ArrowUpRight, Clock, ShieldAlert, IndianRupee } from 'lucide-react';

interface LiveBreachFeedProps {
  alerts: BreachAlert[];
}

export const LiveBreachFeed: React.FC<LiveBreachFeedProps> = ({ alerts }) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Real-Time SLA Incident & Escalation Feed</span>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-normal">
              Active Telemetry
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated statutory escalation under Assam Right to Public Services Act (Sec 7 & 9)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const isCritical = alert.alertType === 'CRITICAL_BREACH';
          const isWarning = alert.alertType === 'T-48H_WARNING';

          return (
            <div
              key={alert.id}
              className={`p-3.5 rounded-lg border transition-all ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-800/80'
                  : isWarning
                  ? 'bg-amber-950/20 border-amber-800/60'
                  : 'bg-purple-950/20 border-purple-800/60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : isWarning
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-purple-950 text-purple-300 border border-purple-800'
                    }`}
                  >
                    {alert.alertType.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs text-white font-semibold">
                    {alert.applicationNo}
                  </span>
                  <span className="text-xs text-slate-400">· {alert.serviceName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Applicant: </span>
                  <span className="text-slate-200 font-medium">{alert.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500">Responsible DPS: </span>
                  <span className="text-slate-200 font-medium">{alert.dpsName}</span>
                </div>
                <div>
                  <span className="text-slate-500">District: </span>
                  <span className="text-slate-200 font-medium">{alert.district}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Escalated To:</span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-sky-400 border border-sky-800 font-medium">
                    {alert.escalationLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  {alert.overdueDays > 0 ? (
                    <span className="text-rose-400 font-semibold">
                      +{alert.overdueDays}d Overdue · Penalty: ₹{alert.penaltyINR}
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold">
                      ⏳ SLA Expiry in 28 Hours
                    </span>
                  )}
                  <button className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-0.5">
                    View Docket <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
