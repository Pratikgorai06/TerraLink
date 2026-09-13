'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, AlertTriangle, Bell, CheckCircle2, ChevronDown, Clock3, Database, Download, FileWarning, MapPinned, RefreshCw, Search, ShieldCheck, Users, WalletCards } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Workflow from '@/components/Workflow';
import ProjectTable from '@/components/ProjectTable';
import { projects as seed } from '@/lib/seed';
import { getProjects } from '@/lib/firebase/projects';
import { Project, Role } from '@/types';

const monthBars=[38,52,47,63,59,76,68,82,74,91,85,96];

export default function Dashboard(){
 const [projects,setProjects]=useState<Project[]>(seed); const [role,setRole]=useState<Role>('District'); const [query,setQuery]=useState(''); const [loading,setLoading]=useState(false);
 useEffect(()=>{const saved=localStorage.getItem('bhoomisetu_role'); if(saved) setRole(saved as Role);},[]);
 async function refresh(){setLoading(true);try{setProjects(await getProjects())}finally{setLoading(false)}}
 const filtered=useMemo(()=>projects.filter(p=>`${p.name} ${p.state} ${p.district} ${p.ulpin}`.toLowerCase().includes(query.toLowerCase())),[projects,query]);
 const totalArea=projects.reduce((a,p)=>a+p.area,0); const due=projects.reduce((a,p)=>a+p.compensationDue,0); const paid=projects.reduce((a,p)=>a+p.compensationPaid,0); const high=projects.filter(p=>p.risk==='High').length;
 return <div className="app-shell"><header className="topbar"><div className="brand"><div className="brand-mark"><MapPinned size={22}/></div><div><h1>BHOOMISETU</h1><p>Integrated Land Acquisition & Management</p></div></div><div className="top-actions"><span className="role-pill">{role} Officer</span><Bell size={18} color="#86a8b7"/><div className="avatar">{role[0]}</div></div></header>
 <div className="layout"><Sidebar/><main className="main">
   <div className="page-head"><div><div className="eyebrow">National command center</div><h2 className="page-title">Good evening, {role} Officer</h2><p className="page-subtitle">Real-time view of proposal flow, SLA exposure, compensation and rehabilitation.</p></div><div style={{display:'flex',gap:8}}><button className="btn" onClick={refresh}><RefreshCw size={14} className={loading?'spin':''}/> Sync data</button><button className="btn primary"><Download size={14}/> Export MIS</button></div></div>
   <section className="grid kpi-grid">
    <Kpi icon={<Database size={16}/>} title="Active projects" value={String(projects.length).padStart(2,'0')} foot="Across 6 states"/>
    <Kpi icon={<MapPinned size={16}/>} title="Land in pipeline" value={`${totalArea.toFixed(1)} ha`} foot="+8.4% this month"/>
    <Kpi icon={<WalletCards size={16}/>} title="Compensation paid" value={`₹${paid.toFixed(1)} Cr`} foot={`₹${(due-paid).toFixed(1)} Cr outstanding`} footWarn/>
    <Kpi icon={<Users size={16}/>} title="Families tracked" value={String(projects.reduce((a,p)=>a+p.families,0))} foot="R&R linked to possession"/>
    <Kpi icon={<AlertTriangle size={16}/>} title="High-risk projects" value={String(high)} foot="Needs officer attention" footWarn/>
   </section>
   <section className="grid content-grid">
    <div className="card panel"><div className="panel-head"><div><h3 className="panel-title">Live GIS parcel status</h3><div className="panel-meta">PostGIS / ULPIN linked view · simulated map for MVP</div></div><button className="btn" style={{padding:'7px 9px'}}><ChevronDown size={13}/> All states</button></div><div className="map"><div className="map-grid"/><div className="river"/>
      <div className="parcel" style={{left:'13%',top:'22%',width:110,height:75}}/><div className="parcel" style={{left:'37%',top:'54%',width:145,height:82}}/><div className="parcel risk" style={{left:'65%',top:'20%',width:125,height:94}}/><div className="parcel" style={{left:'72%',top:'61%',width:88,height:58}}/>
      <div className="pin" style={{left:'23%',top:'35%'}}/><div className="pin" style={{left:'51%',top:'67%'}}/><div className="pin" style={{left:'77%',top:'39%',background:'var(--red)'}}/><div className="pin" style={{left:'80%',top:'70%'}}/>
      <div className="map-legend"><span><i className="legend-dot"/> Acquired / possessed</span><span><i className="legend-dot red"/> High risk</span></div>
    </div></div>
    <div className="card panel"><div className="panel-head"><div><h3 className="panel-title">Acquisition throughput</h3><div className="panel-meta">Milestones completed · last 12 months</div></div><Activity size={17} color="var(--cyan)"/></div><div className="bars">{monthBars.map((v,i)=><div className="bar-col" key={i}><div className="bar-value">{v}</div><div className="bar" style={{height:`${v*1.65}px`}}/><div className="bar-label">{['O','N','D','J','F','M','A','M','J','J','A','S'][i]}</div></div>)}</div></div>
   </section>
   <section className="card panel" style={{marginTop:14}}><div className="panel-head"><div><h3 className="panel-title">End-to-end acquisition workflow</h3><div className="panel-meta">Every stage streams into dashboards, SLA checks and the delay-risk model.</div></div><span className="badge medium"><Clock3 size={12}/> SLA engine live</span></div><Workflow/></section>
   <section className="grid content-grid" style={{marginTop:14}}>
     <div className="card panel"><div className="panel-head"><div><h3 className="panel-title">Projects requiring attention</h3><div className="panel-meta">Sorted by predicted delay risk and SLA proximity</div></div><div style={{position:'relative'}}><Search size={14} style={{position:'absolute',left:9,top:9,color:'#638997'}}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search project / ULPIN" style={{background:'#071d29',border:'1px solid var(--border)',borderRadius:8,padding:'7px 8px 7px 29px',color:'#dff8ff',width:210}}/></div></div><ProjectTable projects={filtered}/></div>
     <div className="card panel"><div className="panel-head"><div><h3 className="panel-title">Officer alerts</h3><div className="panel-meta">Auto-generated from SLA + ML risk signals</div></div><Bell size={16} color="var(--cyan)"/></div>
       <div className="alert"><AlertTriangle className="alert-icon" size={16}/><div><h4>BS-006 · SLA breach in 2 days</h4><p>Notification stage in Khordha is trending beyond RFCTLARR timeline. Immediate review recommended.</p></div></div>
       <div className="alert"><FileWarning className="alert-icon" size={16}/><div><h4>BS-001 · High compensation exposure</h4><p>₹11.6 Cr remains due across 184 families. Payment milestone should be escalated.</p></div></div>
       <div className="alert" style={{borderColor:'rgba(127,214,157,.18)',background:'rgba(127,214,157,.05)'}}><CheckCircle2 style={{color:'var(--green)'}} size={16}/><div><h4>BS-002 · Possession certificate verified</h4><p>82% possession completed and R&R progress is linked at 73%.</p></div></div>
       <div style={{display:'flex',gap:8,marginTop:12}}><span className="role-pill"><ShieldCheck size={12} style={{verticalAlign:'-2px'}}/> Audit trail intact</span><span className="role-pill">Last sync 2 min ago</span></div>
     </div>
   </section>
   <p className="footer-note">BhoomiSetu prototype · Frontend: Next.js · Data: Firebase/Firestore · Auth: demo token · GIS: PostGIS-ready interface</p>
 </main></div></div>
}

function Kpi({icon,title,value,foot,footWarn}:{icon:React.ReactNode;title:string;value:string;foot:string;footWarn?:boolean}){return <div className="card kpi"><div className="kpi-top"><span>{title}</span><span>{icon}</span></div><div className="kpi-value">{value}</div><div className="kpi-foot" style={footWarn?{color:'var(--amber)'}:{}}>{foot}</div></div>}
