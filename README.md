# Sewa-Drishti | Continuous RTPS SLA Monitoring Platform

[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-f38020.svg)](https://nesfic-d37-rtps-sla-monitor.pages.dev)
[![NESFIC 2026](https://img.shields.io/badge/NESFIC%202026-Challenge%20NESFIC--D--37-blue.svg)](https://startup.assam.gov.in/nesfic26/)
[![Govt of Assam](https://img.shields.io/badge/Government%20of%20Assam-Administrative%20Reforms%20Dept-emerald.svg)](https://art.assam.gov.in/)
[![Sewa Setu](https://img.shields.io/badge/Ecosystem-Sewa%20Setu%20%7C%20ASCRTPS-indigo.svg)](https://sewasetu.assam.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Challenge ID: NESFIC-D-37**  
> **Track:** Government Track / Governance & Administration  
> **Host Department:** Department of Administrative Reforms, Training, Pension & Public Grievances, Government of Assam  
> **Innovation Challenge:** North East Seva First Innovation Challenge (NESFIC) 2026 · Assam Innovation & Startup Foundation (AISF)

---

## 🏛️ Executive Summary & Context

Under the **Assam Right to Public Services (RTPS) Act, 2012 (amended 2019)**, time-bound delivery of over 400 citizen services is legally mandated through the **Sewa Setu** portal. However, administrative leaders currently lack a consolidated, real-time mechanism to monitor how individual **Designated Public Servants (DPS)** and circle/district offices perform relative to statutory timelines.

### The Problem
- **Data Fragmentation:** SLA breaches and recurring delays are scattered across periodic reports and static transaction logs, making it difficult to separate chronic underperformers from one-off volume surges.
- **Reactive Penalties:** Penalties under Sections 7 and 9 of the RTPS Act (₹250/day up to statutory limits) are typically invoked only after a citizen explicitly lodges an appeal, while stellar performers go unrecognized.
- **Intermediate Bottlenecks:** Intermediate stages (e.g. Lot Mandal field verification) account for **64.8% of statewide delays**, yet supervisors only detect failures after statutory deadlines lapse.

### The Solution: Sewa-Drishti
**Sewa-Drishti** transforms RTPS compliance from a passive legal statute into an active, algorithmic supervisory engine with real-time stream processing, dynamic DPS scoring, proactive T-48h early warnings, and automated Section 7 penalty memos.

---

## 🚀 Key Platform Features

1. **Executive SLA Telemetry Radar:** Real-time statewide SLA compliance velocity, active transaction ingestion streams, and 6-month historical trendlines.
2. **Dynamic DPS & Office Performance Index (DOPI):** Algorithmic scoring (0–100) normalizing for caseload volume and stage complexity, isolating chronic laggards from top performers.
3. **Workflow Bottleneck & Stage-Wise Delay Attribution:** Pinpoints exact stages where citizen files stall (Document Scrutiny -> Field Verification -> Final Approval -> Issuance).
4. **35-District Geographic Heatmap & Circle Matrix:** Multi-level drilldowns allowing District Commissioners to view circle-level bottlenecks (Dispur, Silchar, Dibrugarh West).
5. **Assam RTPS Act (Sec 7 & 9) Automated Penalty Engine:** Computes statutory deductions (₹250/day) from defaulting DPS payroll and Direct Benefit Transfer (DBT) compensation vouchers for citizens.
6. **Administrative Management Panel:** Live configuration for statutory service days, emergency flood/disaster clock pauses, and DPS load rebalancing.
7. **Printable Proof of Work PDF:** Formatted executive report with mathematical scoring formulations, ER diagrams, and budget breakdowns.

---

## 💰 Indicative Budget Allocation (₹40.00 Lakhs Total Grant)

| Budget Head / Cost Category | Allocation (INR) | % Share | Justification & Scope |
|---|:---:|:---:|---|
| **Technical Engineering Team** | **₹20,00,000** | **50.0%** | Full-stack GovTech architect, 2 React/Node engineers, data engineer (Kafka/TimescaleDB), and ML engineer for 6 months full-time development. |
| **Cloud Hosting, ASDC Staging & Telemetry Queues** | **₹6,00,000** | **15.0%** | TimescaleDB/PostgreSQL instances, Kafka streaming pipelines, Redis caching clusters, and SMS/WhatsApp early-warning notification gateway credits. |
| **Field Immersion, Pilot Rollout & District Workshops** | **₹6,00,000** | **15.0%** | On-ground pilot setup in Kamrup Metro, Jorhat, and Cachar; training sessions for Circle Officers and Lot Mandals; user manuals. |
| **Security Audit & CERT-In Empanelled VAPT** | **₹4,00,000** | **10.0%** | Third-party CERT-In empanelled security audit, VAPT penetration testing, DPDP Act 2023 compliance verification. |
| **RTPS Legal Advisory, Management & Contingency** | **₹4,00,000** | **10.0%** | Assam RTPS statutory rule calibration (Sections 7 & 9 penalty logic), project governance, documentation, and risk contingency buffer. |
| **Total Indicative Budget** | **₹40,00,000** | **100.0%** | **Full 24-week lifecycle from discovery through pilot validation.** |

---

## 🔐 Administrative Access & Demo Credentials

Click **"Admin Login"** in the top navigation bar or use the pre-configured accounts:

| Role | Email ID | Password | Scope & Administrative Authority |
|---|---|---|---|
| **State Administrator** | `admin.art@assam.gov.in` | `SewaDrishti@2026` | Statewide rulebook, holiday calendar, ASDC telemetry controls. |
| **District Commissioner** | `dc.kamrup@assam.gov.in` | `Dispur@2026` | Kamrup Metro circles, DPS workload rebalancing. |
| **Designated Public Servant** | `co.dispur@assam.gov.in` | `Circle@2026` | Circle Officer queue, pending verification dossiers. |

---

## 🛠️ Technology Stack & Architecture

- **Frontend:** React 18, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Build System:** Vite 6
- **Architecture:** Cloud-native microservices, TimescaleDB time-series event storage, Redis caching, Kafka message ingestion
- **Security & Compliance:** TLS 1.3, CERT-In compliance layout, DPDP Act 2023 zero-PII storage, cryptographic audit logging
- **Hosting Target:** Assam State Data Centre (ASDC) / MeghRaj (NIC Cloud)

---

## 💻 Quick Start & Local Execution

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions

```bash
# Clone repository
git clone https://github.com/RonHatibaruah/nesfic-d37-rtps-sla-monitor.git

# Navigate to project directory
cd nesfic-d37-rtps-sla-monitor

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) or [http://localhost:5181/](http://localhost:5181/) in your web browser.

---

## 📄 Proposal & Documentation Files

- **Complete 12-Section Proposal:** [PROPOSAL_NESFIC_D37.md](./PROPOSAL_NESFIC_D37.md)
- **Proof of Work & Evidence:** Click "Proof of Work (PDF)" inside the web application or refer to the printable dossier.

---

## ⚖️ License & Acknowledgments

Developed for the **North East Seva First Innovation Challenge (NESFIC) 2026**, initiated by the Assam Innovation & Startup Foundation (AISF), Government of Assam.
Licensed under the [MIT License](./LICENSE).
