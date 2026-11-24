import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { DistrictHeatmap } from './components/DistrictHeatmap';
import { DPSScoresTable } from './components/DPSScoresTable';
import { BottleneckSankey } from './components/BottleneckSankey';
import { LiveBreachFeed } from './components/LiveBreachFeed';
import { PenaltyCalculator } from './components/PenaltyCalculator';
import { AnalyticsCharts } from './components/AnalyticsCharts';
import { LiveApplicationsTable } from './components/LiveApplicationsTable';
import { BudgetModal } from './components/BudgetModal';
import { LoginModal } from './components/LoginModal';
import { AdminPanel } from './components/AdminPanel';
import { TutorialModal } from './components/TutorialModal';
import { IndianRupee, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import {
  MOCK_APPLICATIONS,
  MOCK_DPS_RECORDS,
  MOCK_DISTRICTS,
  MOCK_BOTTLENECKS,
  MOCK_ALERTS,
} from './data/mockData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedRole, setSelectedRole] = useState<string>('State Admin');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Modals & Panels State
  const [isBudgetOpen, setIsBudgetOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Dynamic telemetry counters
  const [totalApps, setTotalApps] = useState<number>(168900);
  const [complianceRate, setComplianceRate] = useState<number>(86.2);
  const [breachCount, setBreachCount] = useState<number>(4945);
  const [atRiskCount, setAtRiskCount] = useState<number>(5880);
  const [totalPenaltiesINR, setTotalPenaltiesINR] = useState<number>(1236250);
  const avgResolutionDays = 9.4;

  const handleSelectDistrict = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    setActiveTab('admin');
  };

  const handleTriggerMockBatch = () => {
    setTotalApps((prev) => prev + 500);
    setAtRiskCount((prev) => prev + 12);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        activeBreachCount={MOCK_ALERTS.length}
        onOpenBudget={() => setIsBudgetOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* District selection banner if active */}
        {selectedDistrict && (
          <div className="bg-sky-50 border border-sky-200 rounded-lg px-4 py-2.5 flex items-center justify-between text-xs text-sky-800 shadow-xs">
            <span>
              Currently filtering analytics and metrics for district:{' '}
              <strong className="text-slate-900 text-sm">{selectedDistrict}</strong>
            </span>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-sky-700 hover:text-sky-900 underline font-semibold"
            >
              Clear District Filter (View Statewide)
            </button>
          </div>
        )}

        {/* Global Metric Cards (Always visible on Overview) */}
        {activeTab === 'overview' && (
          <>
            <MetricCards
              totalApps={totalApps}
              complianceRate={complianceRate}
              breachCount={breachCount}
              atRiskCount={atRiskCount}
              totalPenaltiesINR={totalPenaltiesINR}
              avgResolutionDays={avgResolutionDays}
            />

            {/* Quick Action Banners: Budget & Admin Access */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Indicative Resource & Budget Allocation Banner */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-sm hover:border-slate-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">NESFIC-D-37 Budget Allocation</h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                        ₹40 Lakhs Grant
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Engineering Team: <span className="text-sky-700 font-semibold font-mono">₹20L (50%)</span> · Operations: <span className="text-emerald-700 font-mono">₹20L (50%)</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBudgetOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-xs flex-shrink-0"
                >
                  <span>Details</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* 2. Administrative Command Console Banner */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-sm hover:border-slate-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Administrative Command Console</h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        Demo Ready
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Statutory SLA rules, DPS load rebalancing, early warnings, and automated show-cause workflows.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => {
                      if (currentUser) {
                        setActiveTab('admin');
                      } else {
                        setIsLoginOpen(true);
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Lock className="h-3 w-3" />
                    <span>{currentUser ? 'Admin Console' : 'Admin Login'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Analytics */}
            <AnalyticsCharts />

            {/* Workflow Bottlenecks */}
            <BottleneckSankey bottlenecks={MOCK_BOTTLENECKS} />

            {/* Two column grid: District Heatmap & Live Breaches */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DistrictHeatmap
                  districts={MOCK_DISTRICTS}
                  onSelectDistrict={handleSelectDistrict}
                  selectedDistrict={selectedDistrict}
                />
              </div>
              <div className="lg:col-span-1">
                <LiveBreachFeed alerts={MOCK_ALERTS} />
              </div>
            </div>

            {/* DPS Index Preview */}
            <DPSScoresTable dpsRecords={MOCK_DPS_RECORDS} />
          </>
        )}

        {/* Admin Panel Tab */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {currentUser ? (
              <AdminPanel
                currentUser={currentUser}
                onLogout={() => {
                  setCurrentUser(null);
                  setActiveTab('overview');
                }}
                onTriggerMockBatch={handleTriggerMockBatch}
              />
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-4 max-w-lg mx-auto shadow-sm">
                <Lock className="h-10 w-10 text-amber-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Administrative Authentication Required</h3>
                <p className="text-xs text-slate-500">
                  Please log in with pre-configured demo credentials to manage SLA rules, reassign DPS dockets, and configure early warnings.
                </p>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-all shadow-sm"
                >
                  Open Sign-In Dialog
                </button>
              </div>
            )}
          </div>
        )}

        {/* DPS and Office Tab */}
        {activeTab === 'dps-index' && (
          <div className="space-y-6">
            <DPSScoresTable dpsRecords={MOCK_DPS_RECORDS} />
            <PenaltyCalculator />
          </div>
        )}

        {/* Bottlenecks Tab */}
        {activeTab === 'bottlenecks' && (
          <div className="space-y-6">
            <BottleneckSankey bottlenecks={MOCK_BOTTLENECKS} />
            <DistrictHeatmap
              districts={MOCK_DISTRICTS}
              onSelectDistrict={handleSelectDistrict}
              selectedDistrict={selectedDistrict}
            />
          </div>
        )}

        {/* Live Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <LiveApplicationsTable
              applications={MOCK_APPLICATIONS}
              selectedDistrict={selectedDistrict}
              onClearDistrictFilter={() => setSelectedDistrict(null)}
            />
            <LiveBreachFeed alerts={MOCK_ALERTS} />
          </div>
        )}

        {/* Penalties Tab */}
        {activeTab === 'penalties' && (
          <div className="space-y-6">
            <PenaltyCalculator />
            <DPSScoresTable dpsRecords={MOCK_DPS_RECORDS} />
          </div>
        )}
      </main>

      {/* Grant Budget Modal */}
      <BudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenBudget={() => setIsBudgetOpen(true)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-6 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-700">
              NESFIC-D-37 · Government Track · Assam Innovation & Startup Foundation (AISF)
            </span>
            <p className="mt-0.5">
              Continuous RTPS Service Delivery Performance & SLA Monitoring Platform · Cloudflare: <a href="https://nesfic-d37-rtps-sla-monitor.pages.dev" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline">nesfic-d37-rtps-sla-monitor.pages.dev</a>
            </p>
          </div>
          <div className="text-right">
            <span className="text-slate-600 font-medium">
              Department of Administrative Reforms, Training, Pension & Public Grievances
            </span>
            <p className="mt-0.5 text-slate-500">Government of Assam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
