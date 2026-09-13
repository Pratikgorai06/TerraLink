export type Role = 'Ministry' | 'State' | 'District' | 'PIA' | 'Field Officer';

export type Stage =
  | 'Proposal'
  | 'District Scrutiny'
  | 'State Approval'
  | 'Central Concurrence'
  | 'Notification'
  | 'Award'
  | 'Compensation'
  | 'Payment'
  | 'Possession'
  | 'R&R'
  | 'Completed';

export interface GisParcel {
  id: string;
  ulpin: string;
  surveyNo: string;
  ownerName: string;
  areaHa: number;
  status: 'Acquired' | 'In Progress' | 'Disputed' | 'Pending Notification';
  coordinates: { x: number; y: number };
}

export interface Project {
  id: string;
  name: string;
  state: string;
  district: string;
  tehsil?: string;
  village?: string;
  pia: string;
  landType: string;
  families: number;
  area: number;
  stage: Stage;
  risk: 'Low' | 'Medium' | 'High';
  riskFactor?: string;
  slaDaysLeft: number;
  compensationDue: number;
  compensationPaid: number;
  possession: number;
  rr: number;
  ulpin: string;
  updatedAt: string;
  parcels?: GisParcel[];
}

export interface AuditEvent {
  id: string;
  projectId: string;
  projectName?: string;
  actor: string;
  role: Role;
  action: string;
  timestamp: string;
  status?: 'Success' | 'Warning' | 'Pending';
}
