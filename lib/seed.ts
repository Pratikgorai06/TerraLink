import { Project, AuditEvent } from '@/types';

export const projects: Project[] = [
  { id: 'BS-001', name: 'Delhi–Mumbai Expressway Package IV', state: 'Rajasthan', district: 'Alwar', pia: 'NHAI', landType: 'Agricultural', families: 184, area: 612.4, stage: 'Compensation', risk: 'High', slaDaysLeft: 4, compensationDue: 42.8, compensationPaid: 31.2, possession: 64, rr: 48, ulpin: 'RJ-ALW-4F8A2', updatedAt: '8 min ago' },
  { id: 'BS-002', name: 'Eastern Dedicated Freight Corridor', state: 'Uttar Pradesh', district: 'Prayagraj', pia: 'DFCCIL', landType: 'Mixed', families: 96, area: 304.8, stage: 'Possession', risk: 'Medium', slaDaysLeft: 18, compensationDue: 26.1, compensationPaid: 25.4, possession: 82, rr: 73, ulpin: 'UP-PYG-19AC7', updatedAt: '21 min ago' },
  { id: 'BS-003', name: 'Bengaluru–Chennai Industrial Corridor', state: 'Karnataka', district: 'Kolar', pia: 'NICDC', landType: 'Industrial', families: 51, area: 188.7, stage: 'State Approval', risk: 'Low', slaDaysLeft: 37, compensationDue: 14.6, compensationPaid: 0, possession: 0, rr: 0, ulpin: 'KA-KLR-7BC91', updatedAt: '1 hr ago' },
  { id: 'BS-004', name: 'North–South Freight Corridor Link', state: 'Madhya Pradesh', district: 'Dhar', pia: 'RVNL', landType: 'Agricultural', families: 133, area: 476.1, stage: 'Award', risk: 'Medium', slaDaysLeft: 12, compensationDue: 33.2, compensationPaid: 18.9, possession: 41, rr: 36, ulpin: 'MP-DHR-22DE1', updatedAt: '2 hrs ago' },
  { id: 'BS-005', name: 'Mumbai–Nagpur Samruddhi Extension', state: 'Maharashtra', district: 'Wardha', pia: 'MSRDC', landType: 'Mixed', families: 74, area: 267.3, stage: 'Payment', risk: 'Low', slaDaysLeft: 25, compensationDue: 19.7, compensationPaid: 18.6, possession: 71, rr: 68, ulpin: 'MH-WRD-5E21A', updatedAt: '3 hrs ago' },
  { id: 'BS-006', name: 'Coastal Economic Corridor', state: 'Odisha', district: 'Khordha', pia: 'NHAI', landType: 'Agricultural', families: 211, area: 728.9, stage: 'Notification', risk: 'High', slaDaysLeft: 2, compensationDue: 51.9, compensationPaid: 0, possession: 0, rr: 0, ulpin: 'OD-KHD-81F2B', updatedAt: '4 hrs ago' }
];

export const auditEvents: AuditEvent[] = [
  { id: 'a1', projectId: 'BS-001', actor: 'Ananya Mehta', role: 'District', action: 'Compensation assessment submitted', timestamp: '09 Sep 2026 · 17:54' },
  { id: 'a2', projectId: 'BS-001', actor: 'Ravi Kumar', role: 'Field Officer', action: '184 affected families verified', timestamp: '09 Sep 2026 · 17:41' },
  { id: 'a3', projectId: 'BS-002', actor: 'State Land Cell', role: 'State', action: 'Possession certificate uploaded', timestamp: '09 Sep 2026 · 17:22' },
  { id: 'a4', projectId: 'BS-006', actor: 'AI Risk Engine', role: 'Ministry', action: 'High delay risk detected', timestamp: '09 Sep 2026 · 16:58' }
];
