'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, KeyRound, ShieldCheck, UserCheck } from 'lucide-react';
import { DEMO_TOKEN, isValidDemoToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Role } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState(DEMO_TOKEN);
  const [role, setRole] = useState<Role>('District');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidDemoToken(token)) {
      setError('Invalid officer authentication token. Use the default demo token.');
      return;
    }
    localStorage.setItem('terralink_token', token);
    localStorage.setItem('terralink_role', role);
    router.push('/dashboard');
  }

  return (
    <main className="login-wrapper">
      <section className="login-card">
        <div className="login-brand" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 20 }}>
          <Image
            src="/logo.png"
            alt="TerraLink"
            width={128}
            height={85}
            style={{ height: 85, width: 'auto', marginBottom: 10 }}
            priority
          />
          <h2 className="login-title">TerraLink</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
            National Land Acquisition Command Center
          </p>
        </div>

        <div className="eyebrow" style={{ marginBottom: 12 }}>
          <span className="eyebrow-dot" />
          <span>Statutory Officer Portal · RFCTLARR 2013</span>
        </div>

        <p className="login-desc">
          Unified command center for real-time monitoring of land acquisition, ULPIN cadastral linking, statutory SLA tracking, and PFMS direct beneficiary disbursements.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label">Officer Role</label>
            <select
              className="field-select"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              {(['Ministry', 'State', 'District', 'PIA', 'Field Officer'] as Role[]).map((r) => (
                <option key={r} value={r}>
                  {r} Officer
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label className="field-label">Security Access Token</label>
            <div style={{ position: 'relative' }}>
              <KeyRound
                size={16}
                style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-tertiary)' }}
              />
              <input
                className="field-input"
                style={{ paddingLeft: 38 }}
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter demo token"
              />
            </div>
          </div>

          {error && (
            <div style={{ color: 'var(--rose)', fontSize: 12, marginBottom: 14 }}>
              {error}
            </div>
          )}

          <button className="btn primary login-btn" type="submit">
            <span>Enter Command Center</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="login-helper-box">
          <div className="helper-text">
            <UserCheck size={13} style={{ display: 'inline', marginRight: 4, verticalAlign: '-2px' }} />
            Demo token ready
          </div>
          <button
            type="button"
            className="helper-btn"
            onClick={() => setToken(DEMO_TOKEN)}
          >
            Reset Default Token
          </button>
        </div>

        <div className="login-footer-security">
          <ShieldCheck size={13} />
          <span>256-bit Encrypted Officer Session · Ready for Vercel</span>
        </div>
      </section>
    </main>
  );
}
