'use client';

import {
  Award,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FilePlus2,
  Gavel,
  HandCoins,
  Home,
  Landmark,
  type LucideIcon
} from 'lucide-react';
import { Stage } from '@/types';

interface WorkflowStageInfo {
  name: Stage;
  icon: LucideIcon;
  section: string;
  slaDays: number;
}

const stages: WorkflowStageInfo[] = [
  { name: 'Proposal', icon: FilePlus2, section: 'Sec 4(1)', slaDays: 15 },
  { name: 'District Scrutiny', icon: ClipboardCheck, section: 'Sec 6', slaDays: 30 },
  { name: 'State Approval', icon: FileCheck2, section: 'Sec 8', slaDays: 45 },
  { name: 'Central Concurrence', icon: Landmark, section: 'Sec 9', slaDays: 30 },
  { name: 'Notification', icon: Bell, section: 'Sec 11(1)', slaDays: 60 },
  { name: 'Award', icon: Award, section: 'Sec 23', slaDays: 90 },
  { name: 'Compensation', icon: CircleDollarSign, section: 'Sec 26', slaDays: 30 },
  { name: 'Payment', icon: HandCoins, section: 'Sec 30', slaDays: 15 },
  { name: 'Possession', icon: Home, section: 'Sec 38', slaDays: 45 },
  { name: 'R&R', icon: Gavel, section: 'Sec 31', slaDays: 60 },
  { name: 'Completed', icon: CheckCircle2, section: 'Closure', slaDays: 0 },
];

interface WorkflowProps {
  current?: Stage;
  onSelectStage?: (stage: Stage) => void;
}

export default function Workflow({ current = 'Compensation', onSelectStage }: WorkflowProps) {
  const currentIndex = stages.findIndex((s) => s.name === current);

  return (
    <div className="workflow-container">
      <div className="workflow-track">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          let statusClass = 'pending';
          if (isDone) statusClass = 'done';
          if (isCurrent) statusClass = 'current';

          return (
            <button
              key={stage.name}
              type="button"
              className={`workflow-step ${statusClass}`}
              onClick={() => onSelectStage?.(stage.name)}
              title={`${stage.name} (${stage.section}) - SLA: ${stage.slaDays} days`}
            >
              <div className="step-icon-wrap">
                <Icon size={18} />
                {isDone && <span className="step-done-check">✓</span>}
              </div>
              <div className="step-meta">
                <span className="step-number">{String(idx + 1).padStart(2, '0')}</span>
                <span className="step-title">{stage.name}</span>
                <span className="step-section">{stage.section}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
