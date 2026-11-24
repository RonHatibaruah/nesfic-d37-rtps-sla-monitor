import React, { useState, useEffect } from 'react';
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
import { IndianRupee, ArrowRight, ShieldCheck, Lock, MapPin, Compass, FileText } from 'lucide-react';
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

  // Synchronize activeTab with URL hash for SEO & Deep Linking
  useEffect(() => {
    const handleHashSync = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['overview', 'dps-index', 'bottlenecks', 'applications', 'penalties', 'admin'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else if (hash === 'tutorial') {
        setIsTutorialOpen(true);
      } else if (hash === 'budget') {
        setIsBudgetOpen(true);
      } else if (!hash) {
        setActiveTab('overview');
      }
    };

    handleHashSync();
    window.addEventListener('hashchange', handleHashSync);
    return () => window.removeEventListener('hashchange', handleHashSync);
  }, []);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    if (window.location.hash !== `#${newTab}`) {
      window.history.pushState(null, '', `#${newTab}`);
    }
  };

  const handleSelectDistrict = (district: string) => {
    setSelectedDistrict(district);
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setCurrentUser(user);
    handleTabChange('admin');
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
        setActiveTab={handleTabChange}
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
          <section id="overview" className="space-y-6">
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
                        handleTabChange('admin');
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
          </section>
        )}

        {/* Admin Panel Tab */}
        {activeTab === 'admin' && (
          <section id="admin" className="space-y-6">
            {currentUser ? (
              <AdminPanel
                currentUser={currentUser}
                onLogout={() => {
                  setCurrentUser(null);
                  handleTabChange('overview');
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
          </section>
        )}

        {/* DPS and Office Tab */}
        {activeTab === 'dps-index' && (
          <section id="dps-index" className="space-y-6">
            <DPSScoresTable dpsRecords={MOCK_DPS_RECORDS} />
            <PenaltyCalculator />
          </section>
        )}

        {/* Bottlenecks Tab */}
        {activeTab === 'bottlenecks' && (
          <section id="bottlenecks" className="space-y-6">
            <BottleneckSankey bottlenecks={MOCK_BOTTLENECKS} />
            <DistrictHeatmap
              districts={MOCK_DISTRICTS}
              onSelectDistrict={handleSelectDistrict}
              selectedDistrict={selectedDistrict}
            />
          </section>
        )}

        {/* Live Applications Tab */}
        {activeTab === 'applications' && (
          <section id="applications" className="space-y-6">
            <LiveApplicationsTable
              applications={MOCK_APPLICATIONS}
              selectedDistrict={selectedDistrict}
              onClearDistrictFilter={() => setSelectedDistrict(null)}
            />
            <LiveBreachFeed alerts={MOCK_ALERTS} />
          </section>
        )}

        {/* Penalties Tab */}
        {activeTab === 'penalties' && (
          <section id="penalties" className="space-y-6">
            <PenaltyCalculator />
            <DPSScoresTable dpsRecords={MOCK_DPS_RECORDS} />
          </section>
        )}
      </main>

      {/* Grant Budget Modal */}
      <BudgetModal isOpen={isBudgetOpen} onClose={() => setIsBudgetOpen(false)} />

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateTab={(tab) => handleTabChange(tab)}
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
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Main Footer Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-slate-200">
            {/* Column 1: Platform & Challenge */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-sm">SEWA-DRISHTI</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200 rounded">
                  NESFIC-D-37
                </span>
              </div>
              <p className="text-slate-600 font-medium text-xs leading-relaxed">
                Continuous RTPS Service Delivery Performance &amp; SLA Monitoring Platform.
              </p>
              <p className="text-[11px] text-slate-400">
                Production: <a href="https://nesfic-d37-rtps-sla-monitor.pages.dev" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">nesfic-d37-rtps-sla-monitor.pages.dev</a>
              </p>
            </div>

            {/* Column 2: Applicant & Organization */}
            <div className="space-y-1.5">
              <span className="text-slate-900 font-bold block text-xs uppercase tracking-wider">
                Innovation Lead &amp; Engineering
              </span>
              <p className="text-xs text-slate-700">
                <strong>Lead Applicant:</strong> <span className="text-slate-900 font-bold">Abhisekh Satyam</span>
              </p>
              <p className="text-xs text-slate-700">
                <strong>Entity / Organization:</strong> <span className="text-slate-900 font-bold">RazorNext Software Pvt Ltd</span>
              </p>
              <p className="text-[11px] text-slate-500">
                North East Seva First Innovation Challenge 2026 (AISF)
              </p>
            </div>

            {/* Column 3: Government Stakeholder & GEO Location */}
            <div className="space-y-1.5 md:text-right">
              <span className="text-slate-900 font-bold block text-xs uppercase tracking-wider">
                Host Department &amp; State
              </span>
              <p className="text-xs text-slate-700 font-medium">
                Department of Administrative Reforms, Training, Pension &amp; Public Grievances
              </p>
              <p className="text-xs text-slate-600 flex items-center md:justify-end gap-1">
                <MapPin className="h-3 w-3 text-sky-600 inline" />
                <span>Dispur, Guwahati, Kamrup Metropolitan, Assam 781006, India</span>
              </p>
              <p className="text-[10px] text-slate-400">
                Coordinates: 26.1445° N, 91.7362° E · Region: IN-AS
              </p>
            </div>
          </div>

          {/* Deep Navigation & GEO-Friendly Index Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2 border-b border-slate-200 text-[11px]">
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Deep Link Navigation</span>
              <ul className="space-y-1 text-slate-600">
                <li><a href="#overview" onClick={() => handleTabChange('overview')} className="hover:text-sky-600 transition-colors">→ Executive Radar &amp; KPIs</a></li>
                <li><a href="#dps-index" onClick={() => handleTabChange('dps-index')} className="hover:text-sky-600 transition-colors">→ DPS Accountability Index</a></li>
                <li><a href="#bottlenecks" onClick={() => handleTabChange('bottlenecks')} className="hover:text-sky-600 transition-colors">→ Bottleneck Stage Heatmap</a></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Live Telemetry &amp; Operations</span>
              <ul className="space-y-1 text-slate-600">
                <li><a href="#applications" onClick={() => handleTabChange('applications')} className="hover:text-sky-600 transition-colors">→ Citizen Application Stream</a></li>
                <li><a href="#penalties" onClick={() => handleTabChange('penalties')} className="hover:text-sky-600 transition-colors">→ Section 7 Penalty Ledger</a></li>
                <li><a href="#tutorial" onClick={() => setIsTutorialOpen(true)} className="hover:text-sky-600 transition-colors">→ Platform Guide &amp; Tutorial</a></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Official Submission Artifacts</span>
              <ul className="space-y-1 text-slate-600">
                <li><a href="/NESFIC-D-37_Complete_Proposal.pdf" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline flex items-center gap-1"><FileText className="h-3 w-3" /> Technical Proposal (PDF)</a></li>
                <li><a href="/Sewa-Drishti_NESFIC-D-37_Proof_of_Work.pdf" target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline flex items-center gap-1"><FileText className="h-3 w-3" /> Proof of Work (PDF)</a></li>
                <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:underline">XML Geo-Sitemap</a></li>
              </ul>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Assam GovTech Ecosystem</span>
              <ul className="space-y-1 text-slate-600">
                <li><a href="https://art.assam.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">ARTPG Department, Assam</a></li>
                <li><a href="https://sewasetu.assam.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Sewa Setu Citizen Portal</a></li>
                <li><a href="https://assam.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Government of Assam Portal</a></li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-[11px] text-slate-600 leading-relaxed shadow-2xs">
            <div className="flex items-center gap-1.5 mb-1 text-slate-800 font-bold uppercase tracking-wider text-[10px]">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-600" />
              <span>Official Prototype &amp; Innovation Disclaimer</span>
            </div>
            This application (<span className="font-semibold text-slate-700">Sewa-Drishti</span>) is an advanced GovTech decision-support and telemetric SLA observability prototype engineered by <strong>RazorNext Software Pvt Ltd</strong> (Lead Applicant: <strong>Abhisekh Satyam</strong>) for the <strong>North East Seva First Innovation Challenge 2026 (Challenge ID: NESFIC-D-37)</strong> under the Assam Innovation &amp; Startup Foundation (AISF), Department of Administrative Reforms, Training, Pension &amp; Public Grievances, Government of Assam. Telemetry data feeds, citizen service queues, and compliance scores demonstrated herein are simulated for architectural validation, load testing, and technical evaluation.
          </div>

          {/* Bottom Copyright Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-2">
            <div>
              <span className="font-semibold text-slate-700">© 2026 RazorNext Software Pvt Ltd.</span> <span>All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>Lead Applicant: <strong className="text-slate-800 font-semibold">Abhisekh Satyam</strong></span>
              <span>·</span>
              <span>State of Assam RTPS Ecosystem (NESFIC-D-37)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
