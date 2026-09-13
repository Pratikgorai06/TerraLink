import { Award, Bell, CheckCircle2, CircleDollarSign, ClipboardCheck, FileCheck2, FilePlus2, Gavel, HandCoins, Home, Landmark, MapPinned } from 'lucide-react';
import { Stage } from '@/types';

const stages: {name: Stage; icon: any}[] = [
  {name:'Proposal',icon:FilePlus2},{name:'District Scrutiny',icon:ClipboardCheck},{name:'State Approval',icon:FileCheck2},{name:'Central Concurrence',icon:Landmark},{name:'Notification',icon:Bell},{name:'Award',icon:Award},{name:'Compensation',icon:CircleDollarSign},{name:'Payment',icon:HandCoins},{name:'Possession',icon:Home},{name:'R&R',icon:Gavel},{name:'Completed',icon:CheckCircle2}
];
export default function Workflow({current='Compensation'}:{current?:Stage}) {
 const currentIndex=stages.findIndex(s=>s.name===current);
 return <div className="workflow">{stages.map((s,i)=>{const Icon=s.icon;return <div key={s.name} className={`stage ${i<currentIndex?'done':''} ${i===currentIndex?'current':''}`}><div className="stage-icon"><Icon size={20}/></div><div className="stage-label">{s.name}</div><div className="stage-num">{String(i+1).padStart(2,'0')}</div></div>})}</div>;
}
