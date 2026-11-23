import React from 'react';
import { Printer, Download, FileText } from 'lucide-react';

interface ProofOfWorkViewProps {
  onClose: () => void;
}

export const ProofOfWorkView: React.FC<ProofOfWorkViewProps> = ({ onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
      {/* Action Bar (Hidden in Print) */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 print:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Official Proof of Work & Solution Evidence Dossier</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              PDF Ready
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            Formatted for NESFIC-D-37 submission · Direct PDF Download or Print to PDF (&lt; 10 MB)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/Sewa-Drishti_NESFIC-D-37_Proof_of_Work.pdf"
            download="Sewa-Drishti_NESFIC-D-37_Proof_of_Work.pdf"
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Download className="h-4 w-4" />
            <span>Download Proof of Work PDF</span>
          </a>
          <a
            href="/NESFIC-D-37_Complete_Proposal.pdf"
            download="NESFIC-D-37_Complete_Proposal.pdf"
            className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <FileText className="h-4 w-4" />
            <span>Download Proposal PDF</span>
          </a>
          <button
            onClick={handlePrint}
            className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 transition-all"
          >
            <Printer className="h-4 w-4" />
            <span>Print View</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-200"
          >
            Close
          </button>
        </div>
      </div>

      {/* Printable Document Container */}
      <div className="space-y-8 font-sans">
        {/* Cover / Title Block */}
        <div className="border-b-2 border-sky-600 pb-6 print:border-black">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 print:text-blue-700">
                North East Seva First Innovation Challenge (NESFIC) 2026
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 print:text-black mt-1">
                PROOF OF WORK & SOLUTION EVIDENCE DOSSIER
              </h1>
              <p className="text-sm text-slate-700 print:text-gray-700 font-medium mt-1">
                Challenge ID: <strong className="text-sky-800 print:text-black">NESFIC-D-37</strong> · Continuous RTPS Service Delivery Performance & SLA Monitoring
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 print:text-gray-600">
              <div>Govt of Assam</div>
              <div>Dept of Administrative Reforms & Training</div>
              <div>Date: November 2026</div>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary & Validated Prototype Status */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-sky-800 print:text-blue-800 uppercase tracking-wider border-b border-slate-200 pb-1 print:border-gray-300">
            1. Executive Prototype Status & Live Verification
          </h2>
          <p className="text-xs text-slate-700 print:text-gray-800 leading-relaxed">
            The platform prototype <strong>"Sewa-Drishti"</strong> has been fully built, packaged, and verified on a live development server and Cloudflare Pages (<code className="bg-slate-100 px-1 py-0.5 rounded print:bg-gray-100 text-sky-800 print:text-black font-mono">https://nesfic-d37-rtps-sla-monitor.pages.dev</code>). The application ingests simulated Sewa Setu telemetry across 35 Assam districts, computing real-time SLA compliance velocity, DPS performance scores, and automated statutory recovery liabilities under Sections 7 and 9 of the Assam RTPS Act.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 rounded-lg bg-slate-50 print:bg-gray-100 border border-slate-200 print:border-gray-300">
              <span className="text-slate-500 print:text-gray-600 block">SLA Compliance Rate</span>
              <strong className="text-emerald-700 print:text-black text-lg font-mono">86.2%</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 print:bg-gray-100 border border-slate-200 print:border-gray-300">
              <span className="text-slate-500 print:text-gray-600 block">Active Telemetry Stream</span>
              <strong className="text-sky-700 print:text-black text-lg font-mono">168,900</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 print:bg-gray-100 border border-slate-200 print:border-gray-300">
              <span className="text-slate-500 print:text-gray-600 block">T-48h Early Warnings</span>
              <strong className="text-amber-700 print:text-black text-lg font-mono">5,880</strong>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 print:bg-gray-100 border border-slate-200 print:border-gray-300">
              <span className="text-slate-500 print:text-gray-600 block">Total Grant Budget</span>
              <strong className="text-purple-700 print:text-black text-lg font-mono">₹40.00 Lakhs</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Mathematical Scoring Formulation (DOPI) */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-sky-800 print:text-blue-800 uppercase tracking-wider border-b border-slate-200 pb-1 print:border-gray-300">
            2. Mathematical Formulation: Dynamic DPS Performance Index (DOPI)
          </h2>
          <p className="text-xs text-slate-700 print:text-gray-800 leading-relaxed">
            To isolate chronic underperformance from one-off volume surges, DOPI incorporates a weighted multi-factor formula normalizing for caseload density and stage complexity:
          </p>
          <div className="p-4 rounded-xl bg-slate-50 print:bg-gray-100 border border-slate-200 print:border-gray-300 font-mono text-xs text-sky-900 print:text-black space-y-1">
            <div>DOPI = 0.40 × (On-Time Disposal %) + 0.30 × (100 - Overdue Aging Penalty) + 0.20 × (Velocity Ratio) + 0.10 × (Citizen Feedback Score)</div>
            <div className="text-[11px] text-slate-500 print:text-gray-600 pt-1">
              * Overdue Aging Penalty = Σ [ (Days Overdue_i × ₹250) / Case_Budget_i ] · normalized over 90 days.
            </div>
          </div>
        </div>

        {/* Section 3: Statutory Section 7 Penalty Recovery Model */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-sky-800 print:text-blue-800 uppercase tracking-wider border-b border-slate-200 pb-1 print:border-gray-300">
            3. Assam RTPS Act Section 7 & 9 Enforcement Logic
          </h2>
          <table className="w-full text-left text-xs text-slate-700 print:text-black border border-slate-200 print:border-gray-300">
            <thead className="bg-slate-50 print:bg-gray-200">
              <tr>
                <th className="p-2 border border-slate-200 print:border-gray-300">Statutory Provision</th>
                <th className="p-2 border border-slate-200 print:border-gray-300">Rule Mechanism</th>
                <th className="p-2 border border-slate-200 print:border-gray-300">Platform Implementation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Section 7(1) Penalty</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">₹250 per day of delay up to statutory ceiling.</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Auto-calculated daily upon statutory SLA breach timestamp.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Section 9 Citizen Compensation</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Aggrieved applicant awarded compensation from penalty recovered.</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Direct Benefit Transfer (DBT/PFMS) auto-voucher generated.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Quasi-Judicial Safeguard</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Principles of natural justice; right to be heard.</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Human-in-the-loop digital sign-off by First Appellate Authority.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 4: Budget Allocation Breakdown (₹40 Lakhs Grant) */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-sky-800 print:text-blue-800 uppercase tracking-wider border-b border-slate-200 pb-1 print:border-gray-300">
            4. Indicative Resource & Budget Allocation (₹40 Lakhs Total Grant)
          </h2>
          <table className="w-full text-left text-xs text-slate-700 print:text-black border border-slate-200 print:border-gray-300">
            <thead className="bg-slate-50 print:bg-gray-200">
              <tr>
                <th className="p-2 border border-slate-200 print:border-gray-300">Cost Category</th>
                <th className="p-2 border border-slate-200 print:border-gray-300">Allocation (INR)</th>
                <th className="p-2 border border-slate-200 print:border-gray-300">% Share</th>
                <th className="p-2 border border-slate-200 print:border-gray-300">Key Deliverables</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Technical Engineering Team</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-mono">₹20,00,000</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-bold">50.0%</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">GovTech Architect, 2 React/Node engineers, Data & ML engineers (6 months).</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Cloud Hosting & Telemetry Infrastructure</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-mono">₹6,00,000</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">15.0%</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">TimescaleDB, Kafka stream, Redis cluster, ASDC sandbox, SMS/WhatsApp credits.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Pilot Rollout & District Workshops</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-mono">₹6,00,000</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">15.0%</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">On-ground pilots in Kamrup Metro, Jorhat, Cachar; user manuals.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">Security Audit & CERT-In VAPT</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-mono">₹4,00,000</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">10.0%</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Third-party CERT-In empanelled audit, VAPT clearance, DPDP compliance.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-semibold text-slate-900">RTPS Legal Advisory & Management</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-mono">₹4,00,000</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">10.0%</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Statutory alignment with Assam RTPS rules, project governance.</td>
              </tr>
              <tr className="bg-slate-50 print:bg-gray-100 font-bold">
                <td className="p-2 border border-slate-200 print:border-gray-300">Total Indicative Grant</td>
                <td className="p-2 border border-slate-200 print:border-gray-300 font-mono text-purple-700 print:text-black">₹40,00,000</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">100.0%</td>
                <td className="p-2 border border-slate-200 print:border-gray-300">Full 24-week lifecycle from discovery through pilot validation.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 5: Signature & Verification Block */}
        <div className="pt-6 border-t border-slate-200 print:border-gray-400 flex items-center justify-between text-xs text-slate-500 print:text-gray-600">
          <div>
            <div>Repository: <code className="text-sky-700 print:text-black">https://github.com/RonHatibaruah/nesfic-d37-rtps-sla-monitor</code></div>
            <div>Submitted for: NESFIC 2026 (Govt of Assam · AISF)</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-slate-900 print:text-black">Verified & Compiled for Submission</div>
            <div>Status: Functional MVP Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};
