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

export interface Project {
  id: string;
  name: string;
  state: string;
  district: string;
  pia: string;
  landType: string;
  families: number;
  area: number;
  stage: Stage;
  risk: 'Low' | 'Medium' | 'High';
  slaDaysLeft: number;
  compensationDue: number;
  compensationPaid: number;
  possession: number;
  rr: number;
  ulpin: string;
  updatedAt: string;
}

export interface AuditEvent {
  id: string;
  projectId: string;
  actor: string;
  role: Role;
  action: string;
  timestamp: string;
}
