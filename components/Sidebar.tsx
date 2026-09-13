'use client';
import { BarChart3, Bell, FileText, LayoutDashboard, Map, Settings, Workflow, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Sidebar({ active = 'Overview' }: { active?: string }) {
  const router = useRouter();
  const items = [
    ['Overview', LayoutDashboard], ['Acquisition Workflow', Workflow], ['GIS Map', Map], ['Proposals & Files', FileText], ['Reports', BarChart3], ['Alerts', Bell], ['Settings', Settings]
  ] as const;
  return <aside className="sidebar">
    <div className="nav-label">Command center</div>
    {items.map(([label, Icon]) => <button key={label} className={`nav-item ${active===label?'active':''}`} onClick={()=>label==='Overview'&&router.push('/dashboard')}><Icon size={17}/><span>{label}</span></button>)}
    <div style={{height:20}}/>
    <button className="nav-item" onClick={()=>{localStorage.removeItem('bhoomisetu_token');router.push('/login')}}><LogOut size={17}/><span>Sign out</span></button>
  </aside>;
}
