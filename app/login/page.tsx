'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, Building2, KeyRound, ShieldCheck } from 'lucide-react';
import { DEMO_TOKEN } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState(DEMO_TOKEN);
  const [role, setRole] = useState('District');
  const [error, setError] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    if (token !== DEMO_TOKEN) { setError('Invalid demo token. Check your .env file.'); return; }
    localStorage.setItem('bhoomisetu_token', token);
    localStorage.setItem('bhoomisetu_role', role);
    router.push('/dashboard');
  }

  return <main className="login">
    <section className="login-card">
      <div className="login-brand">
        <div className="brand-mark"><Building2 size={22}/></div>
        <div><h2>BhoomiSetu</h2><p style={{margin: '2px 0 0'}}>National Land Acquisition Command Center</p></div>
      </div>
      <div className="eyebrow">Smart India Hackathon · PS-26016</div>
      <h3 style={{fontFamily:'Space Grotesk',fontSize:20,margin:'8px 0'}}>Secure officer access</h3>
      <p>Demo authentication is intentionally token-based for now. Firebase is already wired as the persistence layer; plug in your project config when ready.</p>
      <form onSubmit={submit}>
        <div className="field"><label>Role</label><select value={role} onChange={e=>setRole(e.target.value)}>{['Ministry','State','District','PIA','Field Officer'].map(r=><option key={r}>{r}</option>)}</select></div>
        <div className="field"><label>Demo token</label><div style={{position:'relative'}}><KeyRound size={15} style={{position:'absolute',left:12,top:13,color:'#5c8997'}}/><input style={{paddingLeft:36}} value={token} onChange={e=>setToken(e.target.value)} /></div></div>
        {error && <p style={{color:'var(--red)',marginBottom:0}}>{error}</p>}
        <button className="btn primary" type="submit">Enter command center <ArrowRight size={16}/></button>
      </form>
      <p className="token-note"><ShieldCheck size={12} style={{verticalAlign:'-2px'}}/> Demo token loaded from NEXT_PUBLIC_DEMO_TOKEN</p>
      <div className="footer-note">For prototype use only · Replace demo auth with Firebase Auth / OAuth2 in production.</div>
    </section>
  </main>;
}
