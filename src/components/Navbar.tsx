import React from 'react';
import { Shield, Bell, AlertTriangle, RefreshCw, IndianRupee, Lock, UserCheck, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  activeBreachCount: number;
  onOpenBudget: () => void;
  onOpenLogin: () => void;
  onOpenTutorial: () => void;
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
  onOpenTutorial,
  currentUser,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Gov Branding */}
          <a
            href="#overview"
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
              window.location.hash = 'overview';
            }}
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-md ring-1 ring-sky-500/20 group-hover:scale-105 transition-transform">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors">
                  SEWA-DRISHTI
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 rounded">
                  NESFIC-D-37
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Continuous RTPS Service Delivery &amp; SLA Monitor · Govt of Assam
              </p>
            </div>
          </a>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex space-x-1" aria-label="Main Navigation">
            {[
              { id: 'overview', label: 'Overview & Radar' },
              { id: 'dps-index', label: 'DPS & Office Index' },
              { id: 'bottlenecks', label: 'Bottleneck Heatmap' },
              { id: 'applications', label: 'Live Applications' },
              { id: 'penalties', label: 'RTPS Penalties & Incentives' },
              ...(currentUser ? [{ id: 'admin', label: 'Admin Panel' }] : []),
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                  window.location.hash = tab.id;
                }}
                aria-current={activeTab === tab.id ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </nav>

          {/* Right Side Tools */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Tutorial & Guide Link */}
            <button
              onClick={onOpenTutorial}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold hover:bg-sky-100 transition-all shadow-xs"
              title="Application Tutorial: What it does & How to use it"
            >
              <BookOpen className="h-3.5 w-3.5 text-sky-600" />
              <span>Tutorial</span>
            </button>

            {/* Grant Budget Button */}
            <button
              onClick={onOpenBudget}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold hover:bg-purple-100 transition-all shadow-xs"
              title="View Indicative Resource & Budget Allocation"
            >
              <IndianRupee className="h-3.5 w-3.5 text-purple-600" />
              <span className="hidden sm:inline">₹40L Budget</span>
            </button>

            {/* Admin Login / Session Button */}
            {currentUser ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold hover:bg-sky-100 transition-all"
              >
                <UserCheck className="h-3.5 w-3.5 text-sky-600" />
                <span className="hidden lg:inline">{currentUser.name.split(',')[0]}</span>
                <span className="lg:hidden">Admin</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all"
              >
                <Lock className="h-3.5 w-3.5 text-slate-600" />
                <span>Admin Login</span>
              </button>
            )}

            {/* Breach Alert Pill */}
            <div className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold animate-pulse">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
              <span>{activeBreachCount} Breaches</span>
            </div>

            <button
              onClick={() => window.location.reload()}
              title="Refresh Telemetry"
              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
