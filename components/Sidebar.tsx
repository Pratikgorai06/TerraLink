'use client';

import {
  Bell,
  CheckCircle2,
  FileSpreadsheet,
  GitPullRequest,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  Shield,
  type LucideIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export type NavTab =
  | 'Overview'
  | 'Workflow'
  | 'GIS Map'
  | 'MIS Table'
  | 'Alerts & Audits'
  | 'Settings';

interface SidebarItem {
  id: NavTab;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const navItems: SidebarItem[] = [
  { id: 'Overview', label: 'Executive Overview', icon: LayoutDashboard },
  { id: 'Workflow', label: 'Acquisition Pipeline', icon: GitPullRequest },
  { id: 'GIS Map', label: 'GIS Cadastral Layer', icon: MapPin },
  { id: 'MIS Table', label: 'MIS Project Registry', icon: FileSpreadsheet },
  { id: 'Alerts & Audits', label: 'Alerts & Audit Logs', icon: Bell, badge: '2 Critical' },
  { id: 'Settings', label: 'Governance & Rules', icon: Settings },
];

interface SidebarProps {
  active?: NavTab;
  onSelect?: (tab: NavTab) => void;
  role?: string;
}

export default function Sidebar({ active = 'Overview', onSelect, role = 'District' }: SidebarProps) {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('terralink_token');
    localStorage.removeItem('terralink_role');
    localStorage.removeItem('bhoomisetu_token');
    localStorage.removeItem('bhoomisetu_role');
    router.push('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div style={{ padding: '0 10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image
            src="/logo.png"
            alt="TerraLink"
            width={57}
            height={38}
            style={{ height: 38, width: 'auto' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>
              TerraLink
            </span>
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Gov Command
            </span>
          </div>
        </div>
        <span className="sidebar-label">Navigation</span>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => onSelect?.(item.id)}
              >
                <div className="nav-link-left">
                  <Icon size={17} className="nav-icon" />
                  <span className="nav-text">{item.label}</span>
                </div>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-section compliance-card">
        <div className="compliance-header">
          <Shield size={14} className="compliance-icon" />
          <span>RFCTLARR 2013</span>
        </div>
        <p className="compliance-desc">
          Automated statutory compliance & Section 11/19 timeline verification engine active.
        </p>
        <div className="compliance-status">
          <CheckCircle2 size={13} className="compliance-check" />
          <span>Rules enforced</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="officer-card">
          <div className="officer-avatar">{role.slice(0, 2).toUpperCase()}</div>
          <div className="officer-info">
            <span className="officer-name">{role} Officer</span>
            <span className="officer-sub">TerraLink Gov Access</span>
          </div>
        </div>
        <button
          type="button"
          className="sign-out-btn"
          onClick={handleSignOut}
          title="Sign out of command center"
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
