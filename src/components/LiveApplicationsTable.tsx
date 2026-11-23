import React, { useState } from 'react';
import { ApplicationRecord } from '../types/rtps';
import { Search, Filter, AlertTriangle, Clock, CheckCircle2, AlertOctagon } from 'lucide-react';

interface LiveApplicationsTableProps {
  applications: ApplicationRecord[];
  selectedDistrict: string | null;
  onClearDistrictFilter: () => void;
}

export const LiveApplicationsTable: React.FC<LiveApplicationsTableProps> = ({
  applications,
  selectedDistrict,
  onClearDistrictFilter,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const filtered = applications.filter((app) => {
    const matchesDistrict = !selectedDistrict || app.district === selectedDistrict;
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesDept = departmentFilter === 'all' || app.department === departmentFilter;
    const matchesSearch =
      app.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.currentDPSName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesStatus && matchesDept && matchesSearch;
  });

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
      {/* Header and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">
              Sewa Setu Citizen Applications Ingestion Stream
            </h2>
            {selectedDistrict && (
              <span className="flex items-center gap-1 text-xs bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 rounded">
                District: {selectedDistrict}
                <button
                  onClick={onClearDistrictFilter}
                  className="hover:text-white font-bold ml-1"
                >
                  ×
                </button>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time transaction log with automated SLA countdown and risk probabilities
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search token, applicant, DPS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 w-44 sm:w-56"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All SLA Statuses</option>
            <option value="breached">🚨 Breached</option>
            <option value="warning">⚠️ Warning (&lt;48h)</option>
            <option value="on_track">🟢 On Track</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          >
            <option value="all">All Departments</option>
            <option value="Revenue & Disaster Management">Revenue & DM</option>
            <option value="Welfare of Plain Tribes & BC">WPT & BC</option>
            <option value="Housing & Urban Affairs">Urban Affairs</option>
            <option value="Home & Political Department">Home & Political</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="text-xs uppercase bg-slate-950/60 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-3 px-3">Token & Service</th>
              <th className="py-3 px-3">Applicant & District</th>
              <th className="py-3 px-3">SLA Mandate</th>
              <th className="py-3 px-3">Current Stage</th>
              <th className="py-3 px-3">Assigned DPS</th>
              <th className="py-3 px-3">Breach Risk</th>
              <th className="py-3 px-3">SLA Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filtered.map((app) => {
              const isBreached = app.status === 'breached';
              const isWarning = app.status === 'warning';

              return (
                <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-mono text-xs font-bold text-sky-400">
                      {app.applicationNo}
                    </div>
                    <div className="text-xs text-slate-300">{app.serviceName}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-semibold text-white text-xs">{app.applicantName}</div>
                    <div className="text-[11px] text-slate-500">{app.district}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <div>
                      <span className="text-slate-200 font-semibold">{app.daysElapsed}d</span>
                      <span className="text-slate-500"> / {app.slaStatutoryDays}d</span>
                    </div>
                    {isBreached && (
                      <span className="text-rose-400 text-[10px] font-bold">
                        +{app.daysElapsed - app.slaStatutoryDays}d OVERDUE
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-block text-xs px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {app.currentStage}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-xs text-slate-200 font-medium">{app.currentDPSName}</div>
                    <div className="text-[10px] text-slate-500">{app.dpsDesignation}</div>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            app.riskProbability > 70
                              ? 'bg-rose-500'
                              : app.riskProbability > 40
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${app.riskProbability}%` }}
                        />
                      </div>
                      <span
                        className={
                          app.riskProbability > 70
                            ? 'text-rose-400 font-bold'
                            : 'text-slate-400'
                        }
                      >
                        {app.riskProbability}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    {isBreached && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
                        <AlertOctagon className="h-3 w-3" />
                        Breached (₹{app.penaltyAccrued})
                      </span>
                    )}
                    {isWarning && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800">
                        <Clock className="h-3 w-3" />
                        T-48h Warning
                      </span>
                    )}
                    {app.status === 'on_track' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                        <CheckCircle2 className="h-3 w-3" />
                        On Track
                      </span>
                    )}
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
