import { Project } from '@/types';

function Badge({risk}:{risk:Project['risk']}){return <span className={`badge ${risk.toLowerCase()}`}><span>●</span>{risk} risk</span>}
export default function ProjectTable({projects}:{projects:Project[]}){
 return <div className="table-wrap"><table><thead><tr><th>Project / ULPIN</th><th>Location</th><th>Stage</th><th>SLA</th><th>Compensation</th><th>Possession</th><th>Risk</th></tr></thead><tbody>{projects.map(p=><tr key={p.id}><td><div className="project-name">{p.name}</div><div className="muted">{p.id} · {p.ulpin}</div></td><td>{p.district}, {p.state}</td><td>{p.stage}</td><td><span style={{color:p.slaDaysLeft<=5?'var(--red)':p.slaDaysLeft<=15?'var(--amber)':'#9ed8e7'}}>{p.slaDaysLeft} days</span></td><td><div className="progress-row"><div className="progress"><span style={{width:`${Math.round(p.compensationPaid/p.compensationDue*100)}%`}}/></div><small>₹{p.compensationPaid}Cr</small></div></td><td><div className="progress-row"><div className="progress"><span style={{width:`${p.possession}%`}}/></div><small>{p.possession}%</small></div></td><td><Badge risk={p.risk}/></td></tr>)}</tbody></table></div>
}
