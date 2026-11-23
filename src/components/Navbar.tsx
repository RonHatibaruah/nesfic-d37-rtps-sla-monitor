import React from 'react';
import { Shield, Bell, AlertTriangle, RefreshCw, IndianRupee, Lock, FileText, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  activeBreachCount: number;
  onOpenBudget: () => void;
  onOpenLogin: () => void;
  onOpenProofOfWork: () => void;
  currentUser: { name: string; email: string; role: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedRole,
  setSelectedRole,
  activeBreachCount,
  onOpenBudget,
  onOpenLogin,
  onOpenProofOfWork,
  currentUser,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Gov Branding */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-md ring-1 ring-sky-400/30">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                  SEWA-DRISHTI
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-sky-950/80 text-sky-400 border border-sky-800 rounded">
                  NESFIC-D-37
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Continuous RTPS Service Delivery & SLA Monitor · Govt of Assam
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1">
            {[
              { id: 'overview', label: 'Overview & Radar' },
              { id: 'dps-index', label: 'DPS & Office Index' },
              { id: 'bottlenecks', label: 'Bottleneck Heatmap' },
              { id: 'applications', label: 'Live Applications' },
              { id: 'penalties', label: 'RTPS Penalties & Incentives' },
              ...(currentUser ? [{ id: 'admin', label: 'Admin Panel' }] : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Side Tools */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Proof of Work PDF Button */}
            <button
              onClick={onOpenProofOfWork}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 text-xs font-semibold hover:bg-emerald-900/80 transition-all shadow-sm"
              title="View & Export Proof of Work PDF"
            >
              <FileText className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Proof of Work (PDF)</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {/* Grant Budget Button */}
            <button
              onClick={onOpenBudget}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-800/80 text-xs font-semibold hover:bg-purple-900/80 transition-all shadow-sm"
              title="View Indicative Resource & Budget Allocation"
            >
              <IndianRupee className="h-3.5 w-3.5 text-purple-400" />
              <span className="hidden sm:inline">₹40L Budget</span>
            </button>

            {/* Admin Login / Session Button */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-sky-950 text-sky-300 border border-sky-800 text-xs font-semibold hover:bg-sky-900 transition-all"
              >
                <UserCheck className="h-3.5 w-3.5 text-sky-400" />
                <span className="hidden lg:inline">{currentUser.name.split(',')[0]}</span>
                <span className="lg:hidden">Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
              >
                <Lock className="h-3.5 w-3.5 text-amber-400" />
                <span>Admin Login</span>
              </button>
            )}

            {/* Breach Alert Pill */}
            <div className="hidden sm:flex items-center space-x-1 px-2 py-1 rounded-full bg-rose-950/70 text-rose-300 border border-rose-800/80 text-[11px] font-semibold animate-pulse">
              <AlertTriangle className="h-3 w-3 text-rose-400" />
              <span>{activeBreachCount} Breaches</span>
            </div>

            <button
              onClick={() => window.location.reload()}
              title="Refresh Telemetry"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
