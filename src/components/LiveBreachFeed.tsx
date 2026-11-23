import React from 'react';
import { BreachAlert } from '../types/rtps';
import { Clock, ArrowUpRight } from 'lucide-react';

interface LiveBreachFeedProps {
  alerts: BreachAlert[];
}

export const LiveBreachFeed: React.FC<LiveBreachFeedProps> = ({ alerts }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Real-Time SLA Incident & Escalation Feed</span>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
              Active Telemetry
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
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
                  ? 'bg-rose-50/60 border-rose-200'
                  : isWarning
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-purple-50/60 border-purple-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : isWarning
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}
                  >
                    {alert.alertType.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs text-slate-900 font-bold">
                    {alert.applicationNo}
                  </span>
                  <span className="text-xs text-slate-600">· {alert.serviceName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span>{alert.timestamp}</span>
                </div>
              </div>

              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Applicant: </span>
                  <span className="text-slate-800 font-medium">{alert.applicantName}</span>
                </div>
                <div>
                  <span className="text-slate-500">Responsible DPS: </span>
                  <span className="text-slate-800 font-medium">{alert.dpsName}</span>
                </div>
                <div>
                  <span className="text-slate-500">District: </span>
                  <span className="text-slate-800 font-medium">{alert.district}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Escalated To:</span>
                  <span className="px-2 py-0.5 rounded bg-white text-sky-800 border border-sky-200 font-medium shadow-xs">
                    {alert.escalationLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  {alert.overdueDays > 0 ? (
                    <span className="text-rose-600 font-bold">
                      +{alert.overdueDays}d Overdue · Penalty: ₹{alert.penaltyINR}
                    </span>
                  ) : (
                    <span className="text-amber-700 font-semibold">
                      ⏳ SLA Expiry in 28 Hours
                    </span>
                  )}
                  <button className="text-xs text-sky-700 hover:text-sky-900 hover:underline flex items-center gap-0.5 font-medium">
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
