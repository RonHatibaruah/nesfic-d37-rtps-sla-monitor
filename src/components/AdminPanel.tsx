import React, { useState } from 'react';
import {
  Sliders,
  Settings,
  ShieldCheck,
  UserCheck,
  BellRing,
  Database,
  Save,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Play,
  RotateCcw,
} from 'lucide-react';

interface AdminPanelProps {
  currentUser: { name: string; email: string; role: string };
  onLogout: () => void;
  onTriggerMockBatch: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  onLogout,
  onTriggerMockBatch,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sla-rules' | 'dps-mgmt' | 'alerts' | 'telemetry'>('sla-rules');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // SLA Rulebook State
  const [slaServices, setSlaServices] = useState([
    { id: 'SRV-01', name: 'Permanent Resident Certificate (PRC)', dept: 'Revenue & DM', slaDays: 10, penaltyPerDay: 250 },
    { id: 'SRV-02', name: 'Mutation by Right of Inheritance', dept: 'Revenue & DM', slaDays: 20, penaltyPerDay: 250 },
    { id: 'SRV-03', name: 'Issuance of Caste Certificate', dept: 'WPT & BC', slaDays: 14, penaltyPerDay: 250 },
    { id: 'SRV-04', name: 'Non-Creamy Layer (NCL) Certificate', dept: 'WPT & BC', slaDays: 7, penaltyPerDay: 250 },
    { id: 'SRV-05', name: 'Trade License Renewal', dept: 'Urban Affairs', slaDays: 7, penaltyPerDay: 250 },
    { id: 'SRV-06', name: 'Senior Citizen Identity Certificate', dept: 'Social Justice', slaDays: 7, penaltyPerDay: 250 },
  ]);

  // Alert Thresholds
  const [warningThresholdHours, setWarningThresholdHours] = useState(48);
  const [criticalThresholdHours, setCriticalThresholdHours] = useState(24);
  const [smsGatewayActive, setSmsGatewayActive] = useState(true);
  const [whatsappGatewayActive, setWhatsappGatewayActive] = useState(true);
  const [eOfficeSyncActive, setEOfficeSyncActive] = useState(true);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const updateServiceDays = (id: string, days: number) => {
    setSlaServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, slaDays: days } : s))
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center">
            <Settings className="h-6 w-6 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Sewa-Drishti System Administration Panel</h2>
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-sky-950 text-sky-400 border border-sky-800">
                Live Admin Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as: <strong className="text-slate-200">{currentUser.name}</strong> ({currentUser.role})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold animate-fadeIn">
              <CheckCircle2 className="h-4 w-4" /> Changes Applied
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Configuration</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 space-x-1">
        {[
          { id: 'sla-rules', label: 'Statutory SLA Rulebook', icon: Sliders },
          { id: 'dps-mgmt', label: 'DPS Desk & Reallocation', icon: UserCheck },
          { id: 'alerts', label: 'Early-Warning Escalation Rules', icon: BellRing },
          { id: 'telemetry', label: 'Sewa Setu Telemetry Sandbox', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
                isActive
                  ? 'border-sky-500 text-sky-400 bg-sky-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: SLA Rulebook */}
      {activeSubTab === 'sla-rules' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Notified Services & Mandated SLA Days</h3>
              <p className="text-xs text-slate-400">
                Adjust legal timelines mandated under Assam Right to Public Services Act notifications
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Service ID & Name</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Mandated SLA (Days)</th>
                  <th className="py-2.5 px-3">Sec 7 Fine (₹/Day)</th>
                  <th className="py-2.5 px-3">Disaster/Flood Pause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {slaServices.map((srv) => (
                  <tr key={srv.id} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-white">{srv.name}</div>
                      <div className="font-mono text-slate-500 text-[10px]">{srv.id}</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{srv.dept}</td>
                    <td className="py-2.5 px-3 font-mono">
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={srv.slaDays}
                        onChange={(e) => updateServiceDays(srv.id, Number(e.target.value))}
                        className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-center font-bold text-sky-400 focus:outline-none focus:border-sky-500"
                      />
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-rose-400">
                      ₹{srv.penaltyPerDay}
                    </td>
                    <td className="py-2.5 px-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" defaultChecked={srv.dept.includes('Revenue')} className="accent-sky-500" />
                        <span className="text-slate-400">Allow Legal Clock-Stop</span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: DPS Management */}
      {activeSubTab === 'dps-mgmt' && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-sm font-bold text-white">Designated Public Servant Allocation & Backlog Relief</h3>
            <p className="text-xs text-slate-400">
              Dynamically reassign pending citizen dossiers from chronic desks to standby officers during volume spikes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                High-Breach Office: Dispur Revenue Circle
              </h4>
              <p className="text-xs text-slate-400">
                Officer: <strong className="text-white">Sri Dipankar Sarmah, ACS</strong> · 66 Active Breaches
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Reassign 50% to Standby Circle Officer:</span>
                <button
                  onClick={() => alert('50% pending mutation dockets successfully routed to Standby ACS Officer.')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold"
                >
                  Execute Load Rebalance
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Statutory Show-Cause Notice Dispatcher
              </h4>
              <p className="text-xs text-slate-400">
                Auto-generate Section 7 recovery notices for officers with compliance score &lt; 50%
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Affected Officers: 2 Identified</span>
                <button
                  onClick={() => alert('Official Section 7 memos dispatched to First Appellate Authorities.')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold"
                >
                  Issue Show-Cause Notices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Alerts */}
      {activeSubTab === 'alerts' && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-sm font-bold text-white">Automated Escalation & Early-Warning Configuration</h3>
            <p className="text-xs text-slate-400">
              Configure pre-breach alerts triggered before statutory timelines elapse
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <label className="font-semibold text-slate-300 block">
                Level 1 Early Warning (Hours before SLA breach):
              </label>
              <input
                type="number"
                value={warningThresholdHours}
                onChange={(e) => setWarningThresholdHours(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-white font-mono"
              />
              <span className="text-slate-500 block text-[11px]">
                Notifies assigned DPS and Lot Mandal via SMS & Webhook (Default: 48 hours).
              </span>

              <label className="font-semibold text-slate-300 block pt-2">
                Level 2 Critical Escalation (Hours before breach):
              </label>
              <input
                type="number"
                value={criticalThresholdHours}
                onChange={(e) => setCriticalThresholdHours(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-white font-mono"
              />
              <span className="text-slate-500 block text-[11px]">
                Auto-copies First Appellate Authority & District Commissioner (Default: 24 hours).
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
                Integrated Notification Channels
              </span>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsGatewayActive}
                  onChange={(e) => setSmsGatewayActive(e.target.checked)}
                  className="accent-sky-500"
                />
                <span className="text-slate-300">National Mobile Governance SMS Gateway (C-DAC / NIC)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappGatewayActive}
                  onChange={(e) => setWhatsappGatewayActive(e.target.checked)}
                  className="accent-sky-500"
                />
                <span className="text-slate-300">Official Assam State WhatsApp Citizen Alert Channel</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eOfficeSyncActive}
                  onChange={(e) => setEOfficeSyncActive(e.target.checked)}
                  className="accent-sky-500"
                />
                <span className="text-slate-300">e-Office & Sewa Setu Workflow Webhook Dispatcher</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Telemetry Sandbox */}
      {activeSubTab === 'telemetry' && (
        <div className="space-y-4 animate-fadeIn">
          <div>
            <h3 className="text-sm font-bold text-white">Sewa Setu Telemetry Stream Simulator</h3>
            <p className="text-xs text-slate-400">
              Inject synthetic high-volume application batches to test pipeline elasticity and queue performance
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-white">Synthetic Batch Injection (500 Applications)</h4>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Simulates real-time application arrivals across all 35 Assam districts, computing live DOPI score shifts and early warnings.
              </p>
            </div>

            <button
              onClick={() => {
                onTriggerMockBatch();
                alert('Successfully injected 500 simulated Sewa Setu applications into the telemetry pipeline!');
              }}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-md sm:flex-shrink-0"
            >
              <Play className="h-4 w-4" />
              <span>Inject 500 Mock Records</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
