import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Shield,
  Clock,
  AlertTriangle,
  Award,
  IndianRupee,
  FileText,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  MapPin,
  TrendingUp,
} from 'lucide-react';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: string) => void;
  onOpenLogin: () => void;
  onOpenBudget: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenLogin,
  onOpenBudget,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (!isOpen) return null;

  const tutorialSections = [
    {
      id: 'welcome',
      title: '1. What is Sewa-Drishti?',
      subtitle: 'Continuous RTPS Service Delivery & SLA Observability Platform',
      icon: Shield,
      color: 'sky',
      content: (
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <p>
            <strong className="text-slate-900 font-semibold">Sewa-Drishti</strong> is an AI-powered,
            real-time service delivery observability engine custom-engineered for the{' '}
            <strong>Assam Right to Public Services (RTPS) Act 2012</strong> and the <strong>Sewa Setu</strong> portal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg">
              <div className="flex items-center space-x-1.5 font-bold text-sky-900 text-xs mb-1">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>The Core Problem Addressed</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Traditional RTPS governance is post-facto: penalties are rarely enforced unless citizens explicitly file manual appeals, while Lot Mandal field inquest delays (64.8% of breaches) go unnoticed until deadlines lapse.
              </p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="flex items-center space-x-1.5 font-bold text-emerald-900 text-xs mb-1">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>The Sewa-Drishti Innovation</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Transforms static MIS into continuous telemetric supervision. Features predictive <strong>T-48h Amber early warnings</strong>, automated <strong>₹250/day statutory penalty calculation</strong>, and <strong>80% citizen DBT compensation vouchers</strong>.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <span className="font-bold text-slate-800 block mb-1">Key Operational Pillars:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11.5px]">
              <li><strong>Zero PII Ingestion:</strong> Evaluates service tokens only; zero Aadhaar or personal citizen data stored.</li>
              <li><strong>Objective DOPI Score (0–100):</strong> Separates chronic underperformers from seasonal flood/volume surges.</li>
              <li><strong>Statewide 35-District Coverage:</strong> Complete circle-level granularity for Deputy Commissioners.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'roles',
      title: '2. Role-Based Governance Walkthrough',
      subtitle: 'How Different Administrative Stakeholders Use the Platform',
      icon: UserCheck,
      color: 'indigo',
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Sewa-Drishti adapts its telemetry and command workflows based on user administrative roles:
          </p>
          <div className="space-y-2.5">
            <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11.5px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                  State Admin & Chief Secretary
                </span>
                <span className="text-[10px] uppercase font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Statewide Radar</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Monitors high-level SLA compliance rate (86.2%), 6-month compliance velocity, active statewide breaches, and cross-district league rankings.
              </p>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11.5px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                  Deputy Commissioner (DC)
                </span>
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">District Command</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Filters telemetry for their district (e.g. Kamrup Metro). Identifies lagging circles (Dispur, Azara), inspects bottleneck desks, and issues 1-click Section 7 administrative notices.
              </p>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded-lg shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-[11.5px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-600"></span>
                  Designated Public Servant (DPS)
                </span>
                <span className="text-[10px] uppercase font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Field Queue</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1">
                Accesses prioritized daily triage list. Receives Amber push alerts at T-48h to clear critical field verifications and avoid statutory salary deductions.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'navigation',
      title: '3. Platform Navigation & Live Modules',
      subtitle: 'Core Views and Diagnostic Capabilities Available in the App',
      icon: Layers,
      color: 'purple',
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <p>
            Explore the specialized modules available in the top navigation bar:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => { onNavigateTab('overview'); onClose(); }}
              className="p-2.5 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-all"
            >
              <span className="font-bold text-slate-900 block">📊 Overview & Radar</span>
              <span className="text-slate-500">Global metrics, 35-district compliance map, and 6-month velocity line chart.</span>
            </button>

            <button
              onClick={() => { onNavigateTab('dps-index'); onClose(); }}
              className="p-2.5 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-all"
            >
              <span className="font-bold text-slate-900 block">🏆 DPS & Office Index</span>
              <span className="text-slate-500">DOPI composite score leaderboard, Top Performers vs. Chronic Underperformers.</span>
            </button>

            <button
              onClick={() => { onNavigateTab('bottlenecks'); onClose(); }}
              className="p-2.5 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-all"
            >
              <span className="font-bold text-slate-900 block">🔍 Bottleneck Heatmap</span>
              <span className="text-slate-500">Stage-by-stage delay attribution (Document scrutiny, Field verification, Approvals).</span>
            </button>

            <button
              onClick={() => { onNavigateTab('applications'); onClose(); }}
              className="p-2.5 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-all"
            >
              <span className="font-bold text-slate-900 block">⚡ Live Applications Feed</span>
              <span className="text-slate-500">Real-time Sewa Setu telemetry feed with SLA countdown timers and breach risk.</span>
            </button>

            <button
              onClick={() => { onNavigateTab('penalties'); onClose(); }}
              className="p-2.5 text-left bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg transition-all"
            >
              <span className="font-bold text-slate-900 block">⚖️ RTPS Penalties (Sec 7 & 9)</span>
              <span className="text-slate-500">Automated ₹250/day fine simulator and 80% citizen DBT compensation voucher view.</span>
            </button>

            <button
              onClick={() => { onOpenBudget(); onClose(); }}
              className="p-2.5 text-left bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg transition-all"
            >
              <span className="font-bold text-purple-900 block">💰 ₹40 Lakhs Budget Plan</span>
              <span className="text-slate-500">Detailed breakdown allocating ₹20 Lakhs (50%) to the Technical Engineering Core.</span>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 'quickstart',
      title: '4. Quickstart Guide: How to Test the Prototype',
      subtitle: '3 Simple Actions to Experience the Full Capabilities',
      icon: TrendingUp,
      color: 'emerald',
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="space-y-2.5">
            <div className="flex items-start space-x-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">1</span>
              <div>
                <strong className="text-emerald-950 font-semibold block text-[11.5px]">Filter by District</strong>
                <p className="text-[11px] text-slate-600">On the Overview page, click on any district card or the <strong>District Dropdown</strong> to filter metrics specifically for that jurisdiction (e.g. Kamrup Metro or Cachar).</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-2 bg-sky-50 border border-sky-200 rounded-lg">
              <span className="h-5 w-5 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0">2</span>
              <div>
                <strong className="text-sky-950 font-semibold block text-[11.5px]">Log In as Admin or DC</strong>
                <p className="text-[11px] text-slate-600">Click <strong>"Admin Login"</strong> in the top header. Use the 1-click demo login buttons to authenticate as <em>State Administrator</em>, <em>Deputy Commissioner</em>, or <em>Designated Public Servant</em> to access the Admin Panel.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 p-2 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shrink-0">3</span>
              <div>
                <strong className="text-purple-950 font-semibold block text-[11.5px]">Explore Statutory Penalties & DBT Vouchers</strong>
                <p className="text-[11px] text-slate-600">Navigate to <strong>"RTPS Penalties (Sec 7 & 9)"</strong> to inspect automated ₹250/day penalty accruals, appellate show-cause notices, and 80% citizen compensation direct benefit transfer vouchers.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = tutorialSections[activeStep];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Application Tutorial & User Guide</span>
                <span className="text-[10px] bg-sky-100 text-sky-800 font-semibold px-2 py-0.5 rounded border border-sky-200">
                  Step {activeStep + 1} of {tutorialSections.length}
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Sewa-Drishti RTPS SLA Monitoring Platform · NESFIC-D-37
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6 overflow-x-auto">
          {tutorialSections.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={`py-2.5 px-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-all ${
                activeStep === idx
                  ? 'border-sky-600 text-sky-700 bg-sky-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {s.title.split('.')[1] || s.title}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Icon className="h-5 w-5 text-sky-600" />
              <span>{current.title}</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{current.subtitle}</p>
          </div>

          {current.content}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            {activeStep === tutorialSections.length - 1 ? (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1"
              >
                <span>Explore Platform</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setActiveStep((prev) => Math.min(tutorialSections.length - 1, prev + 1))}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1"
              >
                <span>Next Step</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
