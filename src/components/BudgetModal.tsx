import React from 'react';
import { IndianRupee, PieChart, ShieldCheck, Cpu, HardDrive, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetModal: React.FC<BudgetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const budgetItems = [
    {
      category: 'Technical Engineering Team',
      allocationINR: 2000000,
      sharePercent: 50,
      color: 'bg-sky-500',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      icon: Cpu,
      scope: 'GovTech Solution Architect, 2 Senior Full-Stack Engineers (React/Node), Data Engineer (Kafka/TimescaleDB), and ML Data Scientist for 6 months full-time development.',
    },
    {
      category: 'Cloud Hosting, ASDC Staging & Telemetry Queues',
      allocationINR: 600000,
      sharePercent: 15,
      color: 'bg-indigo-500',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      icon: HardDrive,
      scope: 'High-availability TimescaleDB instances, Kafka message brokers, Redis caching clusters, ASDC staging sandbox, and SMS/WhatsApp early-warning notification gateway credits.',
    },
    {
      category: 'Field Immersion, Pilot Rollout & District Workshops',
      allocationINR: 600000,
      sharePercent: 15,
      color: 'bg-emerald-500',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      icon: MapPin,
      scope: 'On-ground deployment across 3 pilot districts (Kamrup Metro, Jorhat, Cachar); hands-on training sessions for Circle Officers, ADCs, and Lot Mandals; user guidebooks in Assamese/English.',
    },
    {
      category: 'Security Audit & CERT-In Empanelled VAPT',
      allocationINR: 400000,
      sharePercent: 10,
      color: 'bg-amber-500',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      icon: ShieldCheck,
      scope: 'Comprehensive Vulnerability Assessment & Penetration Testing (VAPT) by CERT-In empanelled auditor, DPDP Act 2023 compliance verification, and cryptographic audit log validation.',
    },
    {
      category: 'RTPS Legal Advisory, Project Governance & Contingency',
      allocationINR: 400000,
      sharePercent: 10,
      color: 'bg-purple-500',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      icon: Award,
      scope: 'Assam RTPS statutory rule calibration (Sections 7 & 9 penalty logic), stakeholder coordination with Administrative Reforms Department, documentation, and operational contingency buffer.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <IndianRupee className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Indicative Resource & Budget Allocation</h3>
                <span className="px-2 py-0.5 text-xs font-bold rounded bg-purple-950 text-purple-300 border border-purple-800">
                  ₹40 Lakhs Total Grant
                </span>
              </div>
              <p className="text-xs text-slate-400">
                NESFIC-D-37 · Continuous RTPS Service Delivery Performance & SLA Monitoring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Total Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Total Problem Statement Grant</span>
            <div className="text-2xl font-bold text-white font-mono mt-0.5">₹40,00,000</div>
            <span className="text-[11px] text-purple-400">100% Grant Utilization</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Technical Engineering Team</span>
            <div className="text-2xl font-bold text-sky-400 font-mono mt-0.5">₹20,00,000</div>
            <span className="text-[11px] text-sky-400">50% Core Engineering</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Operational, Cloud, Audit & Pilot</span>
            <div className="text-2xl font-bold text-emerald-400 font-mono mt-0.5">₹20,00,000</div>
            <span className="text-[11px] text-emerald-400">50% Infrastructure & Validation</span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Budget Allocation Breakdown</span>
            <span>5 Cost Categories</span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
            <div style={{ width: '50%' }} className="bg-sky-500 h-full" title="Technical Engineering (50%)" />
            <div style={{ width: '15%' }} className="bg-indigo-500 h-full" title="Cloud & ASDC Staging (15%)" />
            <div style={{ width: '15%' }} className="bg-emerald-500 h-full" title="Pilot Rollout (15%)" />
            <div style={{ width: '10%' }} className="bg-amber-500 h-full" title="Security & VAPT (10%)" />
            <div style={{ width: '10%' }} className="bg-purple-500 h-full" title="Legal & Management (10%)" />
          </div>
        </div>

        {/* Detailed Item List */}
        <div className="space-y-3">
          {budgetItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${item.badgeColor} mt-0.5`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{item.category}</h4>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.sharePercent}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.scope}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:flex-shrink-0">
                  <div className="text-base font-bold font-mono text-white">
                    ₹{item.allocationINR.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500">Fixed Cost Head</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Compliant with NESFIC 2026 Financial Guidelines</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-md"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
