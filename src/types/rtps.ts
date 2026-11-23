export type SLAStatus = 'on_track' | 'warning' | 'breached' | 'disposed';

export interface ApplicationRecord {
  id: string;
  applicationNo: string;
  serviceName: string;
  department: string;
  district: string;
  applicantName: string;
  submissionDate: string;
  dueDate: string;
  slaStatutoryDays: number;
  daysElapsed: number;
  currentStage: 'Document Scrutiny' | 'Field Verification' | 'Appellate Review' | 'Final Approval' | 'Certificate Issuance';
  currentDPSName: string;
  dpsDesignation: string;
  status: SLAStatus;
  riskProbability: number; // 0 to 100%
  penaltyAccrued: number; // in INR (₹250/day under Assam RTPS Act)
}

export type DPSSeverity = 'stellar' | 'satisfactory' | 'at_risk' | 'chronic_underperformer';

export interface DPSRecord {
  id: string;
  name: string;
  designation: string;
  office: string;
  district: string;
  department: string;
  totalReceived: number;
  disposedOnTime: number;
  disposedLate: number;
  pendingInSLA: number;
  pendingBreached: number;
  onTimeRate: number; // percentage
  avgResolutionDays: number;
  complianceScore: number; // 0 - 100
  category: DPSSeverity;
  statutoryPenaltyNoticeIssued: boolean;
  totalPenaltiesINR: number;
  commendationEligible: boolean;
}

export interface DistrictSummary {
  district: string;
  totalApplications: number;
  onTimePercent: number;
  breachedCount: number;
  atRiskCount: number;
  rank: number;
  topBottleneck: string;
}

export interface StageBottleneck {
  stage: string;
  avgHoursSpent: number;
  statutoryBudgetHours: number;
  breachRate: number; // % of breaches originating in this stage
  activeStalledCount: number;
}

export interface BreachAlert {
  id: string;
  applicationNo: string;
  serviceName: string;
  applicantName: string;
  dpsName: string;
  district: string;
  overdueDays: number;
  penaltyINR: number;
  escalationLevel: 'Level 1 (DPS)' | 'Level 2 (First Appellate Authority)' | 'Level 3 (Revisional Authority / Assam RTPS Commission)';
  alertType: 'CRITICAL_BREACH' | 'T-48H_WARNING' | 'CHRONIC_PATTERN_DETECTED';
  timestamp: string;
}
