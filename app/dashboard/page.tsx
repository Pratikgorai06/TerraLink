'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  Landmark,
  Layers,
  MapPin,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  Sliders,
  Users,
  Wallet
} from 'lucide-react';
import Sidebar, { NavTab } from '@/components/Sidebar';
import Workflow from '@/components/Workflow';
import ProjectTable from '@/components/ProjectTable';
import ProjectModal from '@/components/ProjectModal';
import GisMapViewer from '@/components/GisMapViewer';
import { projects as seedProjects, auditEvents as seedAuditEvents } from '@/lib/seed';
import { getProjects } from '@/lib/firebase/projects';
import { Project, Role, Stage } from '@/types';

const throughputMonths = [
  { label: 'Oct', value: 38 },
  { label: 'Nov', value: 52 },
  { label: 'Dec', value: 47 },
  { label: 'Jan', value: 63 },
  { label: 'Feb', value: 59 },
  { label: 'Mar', value: 76 },
  { label: 'Apr', value: 68 },
  { label: 'May', value: 82 },
  { label: 'Jun', value: 74 },
  { label: 'Jul', value: 91 },
  { label: 'Aug', value: 85 },
  { label: 'Sep', value: 98 },
];

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [role, setRole] = useState<Role>('District');
  const [activeTab, setActiveTab] = useState<NavTab>('Overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'HIGH' | 'SLA_URGENT' | 'COMP_PENDING'>('ALL');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Hydration-safe initial state
  useEffect(() => {
    setMounted(true);
    const savedRole = localStorage.getItem('terralink_role') || localStorage.getItem('bhoomisetu_role');
    if (savedRole) {
      setRole(savedRole as Role);
    }
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleRefresh() {
    setLoading(true);
    try {
      const fetched = await getProjects();
      setProjects(fetched);
    } catch {
      // Keep seed projects if network error
      setProjects(seedProjects);
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  }

  // Export MIS as CSV
  function handleExportMIS() {
    const headers = [
      'Project ID',
      'Name',
      'ULPIN',
      'State',
      'District',
      'PIA',
      'Land Type',
      'Area (ha)',
      'Affected Families',
      'Stage',
      'Risk Level',
      'SLA Days Left',
      'Compensation Assessed (Cr)',
      'Compensation Disbursed (Cr)',
      'Possession (%)',
      'R&R (%)'
    ];

    const rows = projects.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.ulpin,
      p.state,
      p.district,
      p.pia,
      p.landType,
      p.area,
      p.families,
      p.stage,
      p.risk,
      p.slaDaysLeft,
      p.compensationDue,
      p.compensationPaid,
      p.possession,
      p.rr
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `TerraLink_National_MIS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }

  // Filtering Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = `${p.name} ${p.state} ${p.district} ${p.ulpin} ${p.id} ${p.pia}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (riskFilter === 'HIGH') return p.risk === 'High';
      if (riskFilter === 'SLA_URGENT') return p.slaDaysLeft <= 5;
      if (riskFilter === 'COMP_PENDING') return p.compensationDue > p.compensationPaid;

      return true;
    });
  }, [projects, searchQuery, riskFilter]);

  // Aggregate Metrics
  const totalArea = projects.reduce((sum, p) => sum + p.area, 0);
  const totalDue = projects.reduce((sum, p) => sum + p.compensationDue, 0);
  const totalPaid = projects.reduce((sum, p) => sum + p.compensationPaid, 0);
  const totalFamilies = projects.reduce((sum, p) => sum + p.families, 0);
  const highRiskCount = projects.filter((p) => p.risk === 'High').length;
  const urgentSlaCount = projects.filter((p) => p.slaDaysLeft <= 5).length;

  // Active Project for Workflow inspection
  const inspectedProject = selectedProject || projects[0];

  return (
    <div className="app-shell">
      {/* Topbar */}
      <header className="topbar">
        <div className="brand">
          <Image
            src="/logo.png"
            alt="TerraLink"
            width={66}
            height={44}
            className="brand-logo-img"
            style={{ height: 44, width: 'auto' }}
            priority
          />
          <div className="brand-info">
            <h1>
              TERRALINK <span className="brand-badge">Command Center</span>
            </h1>
            <p>National Land Acquisition & Rehabilitation Infrastructure Portal</p>
          </div>
        </div>

        <div className="top-actions">
          {mounted && currentTime && (
            <div className="system-clock">
              <Clock size={12} />
              <span>IST {currentTime}</span>
            </div>
          )}

          <span className="role-pill">
            <Shield size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: '-1px' }} />
            {role} Officer
          </span>

          <button
            type="button"
            className="notification-btn"
            onClick={() => setActiveTab('Alerts & Audits')}
            title="Notifications & Statutory Alerts"
          >
            <Bell size={17} />
            {urgentSlaCount > 0 && <span className="notification-badge" />}
          </button>

          <div className="avatar">{role.slice(0, 2).toUpperCase()}</div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="layout">
        <Sidebar active={activeTab} onSelect={(tab) => setActiveTab(tab)} role={role} />

        <main className="main-workspace">
          {/* Executive Page Header */}
          <div className="page-head">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>Integrated Land Governance · RFCTLARR 2013</span>
              </div>
              <h2 className="page-title">
                {activeTab === 'Overview' && `National Command Dashboard`}
                {activeTab === 'Workflow' && `Acquisition Lifecycle & Statutory Milestones`}
                {activeTab === 'GIS Map' && `Cadastral Parcel GIS & ULPIN Intelligence`}
                {activeTab === 'MIS Table' && `National MIS Project Registry`}
                {activeTab === 'Alerts & Audits' && `Officer Alerts & Immutable Audit Trail`}
                {activeTab === 'Settings' && `Statutory Governance & Compliance Parameters`}
              </h2>
              <p className="page-subtitle">
                Real-time tracking of land pipelines, PFMS disbursements, ULPIN validations, and delay-risk metrics.
              </p>
            </div>

            <div className="head-actions">
              <button
                type="button"
                className="btn secondary"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw size={14} className={loading ? 'spin' : ''} />
                <span>Sync Node</span>
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={handleExportMIS}
              >
                <Download size={14} />
                <span>Export MIS (CSV)</span>
              </button>
            </div>
          </div>

          {/* Executive KPI Banner */}
          <section className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">Active Capital Projects</span>
                <div className="kpi-icon-pill">
                  <Landmark size={15} />
                </div>
              </div>
              <div className="kpi-value">{String(projects.length).padStart(2, '0')}</div>
              <div className="kpi-footer">
                <span>Across 6 State Corridors</span>
                <span className="kpi-trend positive">100% Tracked</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">Total Land in Pipeline</span>
                <div className="kpi-icon-pill">
                  <MapPin size={15} />
                </div>
              </div>
              <div className="kpi-value">{totalArea.toFixed(1)} ha</div>
              <div className="kpi-footer">
                <span>Surveyed boundary</span>
                <span className="kpi-trend positive">+8.4% YoY</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">Direct PFMS Disbursed</span>
                <div className="kpi-icon-pill">
                  <Wallet size={15} />
                </div>
              </div>
              <div className="kpi-value">₹{totalPaid.toFixed(1)} Cr</div>
              <div className="kpi-footer">
                <span>Outstanding balance</span>
                <span className="kpi-trend warning">₹{(totalDue - totalPaid).toFixed(1)} Cr</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">Project-Affected Families</span>
                <div className="kpi-icon-pill">
                  <Users size={15} />
                </div>
              </div>
              <div className="kpi-value">{totalFamilies.toLocaleString()}</div>
              <div className="kpi-footer">
                <span>Biometric verification</span>
                <span className="kpi-trend positive">R&R Linked</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">High Delay-Risk Alert</span>
                <div className="kpi-icon-pill" style={{ color: 'var(--rose)' }}>
                  <AlertTriangle size={15} />
                </div>
              </div>
              <div className="kpi-value" style={{ color: 'var(--rose)' }}>
                {highRiskCount}
              </div>
              <div className="kpi-footer">
                <span>Statutory intervention</span>
                <span className="kpi-trend danger">{urgentSlaCount} SLA urgent</span>
              </div>
            </div>
          </section>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <>
              {/* GIS & Throughput Split Row */}
              <section className="dashboard-grid">
                <div className="panel">
                  <GisMapViewer
                    projects={projects}
                    onSelectProject={(proj) => setSelectedProject(proj)}
                  />
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div className="panel-header-left">
                      <h3 className="panel-title">Acquisition Velocity</h3>
                      <p className="panel-subtitle">Section 11 to Section 38 milestones concluded (L12M)</p>
                    </div>
                    <Activity size={16} color="var(--sky)" />
                  </div>

                  <div className="throughput-bars">
                    {throughputMonths.map((m) => (
                      <div key={m.label} className="throughput-col">
                        <span className="bar-val">{m.value}</span>
                        <div
                          className="bar-pillar"
                          style={{ height: `${(m.value / 100) * 150}px` }}
                        />
                        <span className="bar-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span>Average clearance cycle: <strong>142 days</strong></span>
                    <span style={{ color: 'var(--emerald)' }}>● SLA compliance: 94.2%</span>
                  </div>
                </div>
              </section>

              {/* End-to-End Workflow Ribbon */}
              <section className="panel" style={{ marginBottom: 24 }}>
                <div className="panel-header">
                  <div className="panel-header-left">
                    <h3 className="panel-title">
                      RFCTLARR 2013 Pipeline · {inspectedProject.name} ({inspectedProject.id})
                    </h3>
                    <p className="panel-subtitle">
                      Active stage: <strong>{inspectedProject.stage}</strong> · ULPIN {inspectedProject.ulpin} · District: {inspectedProject.district}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => setSelectedProject(inspectedProject)}
                    style={{ fontSize: 12, padding: '5px 10px' }}
                  >
                    View Project Dossier
                  </button>
                </div>

                <Workflow
                  current={inspectedProject.stage}
                  onSelectStage={(stage: Stage) => {
                    alert(`Stage: ${stage}\nStatutory scrutiny requirements active for ${inspectedProject.name}`);
                  }}
                />
              </section>

              {/* Projects Table & Alerts Split */}
              <section className="dashboard-grid dashboard-table-grid">
                <div className="panel">
                  <div className="panel-header">
                    <div className="panel-header-left">
                      <h3 className="panel-title">Active Projects Directory</h3>
                      <p className="panel-subtitle">Click any row to inspect complete legal & cadastral records</p>
                    </div>

                    <div className="search-wrapper">
                      <Search size={14} className="search-icon" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter project, state, ULPIN..."
                        className="search-input"
                      />
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="filter-pills-row">
                    <button
                      type="button"
                      className={`filter-pill ${riskFilter === 'ALL' ? 'active' : ''}`}
                      onClick={() => setRiskFilter('ALL')}
                    >
                      All ({projects.length})
                    </button>
                    <button
                      type="button"
                      className={`filter-pill ${riskFilter === 'HIGH' ? 'active' : ''}`}
                      onClick={() => setRiskFilter('HIGH')}
                    >
                      High Risk ({highRiskCount})
                    </button>
                    <button
                      type="button"
                      className={`filter-pill ${riskFilter === 'SLA_URGENT' ? 'active' : ''}`}
                      onClick={() => setRiskFilter('SLA_URGENT')}
                    >
                      SLA Urgent (≤5d)
                    </button>
                    <button
                      type="button"
                      className={`filter-pill ${riskFilter === 'COMP_PENDING' ? 'active' : ''}`}
                      onClick={() => setRiskFilter('COMP_PENDING')}
                    >
                      Disbursement Pending
                    </button>
                  </div>

                  <ProjectTable
                    projects={filteredProjects}
                    onSelectProject={(proj) => setSelectedProject(proj)}
                  />
                </div>

                <div className="panel">
                  <div className="panel-header">
                    <div className="panel-header-left">
                      <h3 className="panel-title">Statutory Alerts & Risk Engine</h3>
                      <p className="panel-subtitle">Algorithmic SLA monitoring & delay prediction</p>
                    </div>
                    <ShieldAlert size={16} color="var(--rose)" />
                  </div>

                  <div className="alerts-list">
                    <div className="alert-item danger">
                      <AlertTriangle size={17} className="alert-icon" />
                      <div className="alert-body">
                        <div className="alert-head">
                          <span className="alert-heading">TL-006 · Statutory SLA Breach in 48h</span>
                          <span className="alert-time">Khordha, OD</span>
                        </div>
                        <p className="alert-text">
                          Preliminary notification under Section 11(1) approaching 12-month statutory lapse deadline. Immediate Competent Authority declaration required.
                        </p>
                      </div>
                    </div>

                    <div className="alert-item warning">
                      <AlertTriangle size={17} className="alert-icon" />
                      <div className="alert-body">
                        <div className="alert-head">
                          <span className="alert-heading">TL-001 · Compensation Escrow Balance</span>
                          <span className="alert-time">Alwar, RJ</span>
                        </div>
                        <p className="alert-text">
                          ₹11.6 Cr remaining balance across 184 project-affected families. PFMS batch 04 pending district treasury release.
                        </p>
                      </div>
                    </div>

                    <div className="alert-item success">
                      <CheckCircle2 size={17} className="alert-icon" />
                      <div className="alert-body">
                        <div className="alert-head">
                          <span className="alert-heading">TL-002 · Possession Certificate Uploaded</span>
                          <span className="alert-time">Prayagraj, UP</span>
                        </div>
                        <p className="alert-text">
                          Section 38 handover completed for 82% corridor length. R&R rehabilitation colony verification cleared.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={() => setActiveTab('Alerts & Audits')}
                      style={{ width: '100%', justifyContent: 'center', fontSize: 12 }}
                    >
                      View All Audit Events & Logs
                    </button>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB 2: WORKFLOW */}
          {activeTab === 'Workflow' && (
            <div className="panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <h3 className="panel-title">End-to-End RFCTLARR 2013 Statutory Progression</h3>
                  <p className="panel-subtitle">Select any project to inspect statutory compliance stages and documents</p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select
                    className="gis-select"
                    value={inspectedProject.id}
                    onChange={(e) => {
                      const p = projects.find((x) => x.id === e.target.value);
                      if (p) setSelectedProject(p);
                    }}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} — {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ margin: '20px 0 30px' }}>
                <Workflow current={inspectedProject.stage} />
              </div>

              <div className="dashboard-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-secondary)' }}>
                    Current Milestone Requirements
                  </h4>
                  <div className="alert-item success">
                    <FileCheck2 size={18} className="alert-icon" />
                    <div className="alert-body">
                      <span className="alert-heading">Current Stage: {inspectedProject.stage}</span>
                      <p className="alert-text">
                        All prior statutory phases have passed state scrutiny and central concurrence.
                        ULPIN {inspectedProject.ulpin} is verified against state Bhulekh cadastral records.
                      </p>
                    </div>
                  </div>
                  <div className="alert-item warning">
                    <Clock size={18} className="alert-icon" />
                    <div className="alert-body">
                      <span className="alert-heading">Statutory SLA: {inspectedProject.slaDaysLeft} Calendar Days Remaining</span>
                      <p className="alert-text">
                        Next milestone auto-triggers digital signoff once district collector submits Section 31 R&R award.
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--text-secondary)' }}>
                    Project Metadata
                  </h4>
                  <div style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 16, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
                    <div>Project Name: <strong>{inspectedProject.name}</strong></div>
                    <div>Location: <strong>{inspectedProject.district}, {inspectedProject.state}</strong></div>
                    <div>Executing Authority: <strong>{inspectedProject.pia}</strong></div>
                    <div>Area Required: <strong>{inspectedProject.area} ha</strong></div>
                    <div>Affected Families: <strong>{inspectedProject.families}</strong></div>
                    <div>Risk Classification: <strong style={{ color: inspectedProject.risk === 'High' ? 'var(--rose)' : 'var(--emerald)' }}>{inspectedProject.risk} Risk</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GIS MAP */}
          {activeTab === 'GIS Map' && (
            <div className="panel">
              <GisMapViewer
                projects={projects}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
              <div className="gis-feature-cards">
                <div style={{ padding: 14, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--emerald)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                    <Layers size={14} />
                    <span>ULPIN Verification</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    14-digit Unique Land Parcel Identification Number synced with Survey of India base layers.
                  </p>
                </div>
                <div style={{ padding: 14, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--sky)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                    <MapPin size={14} />
                    <span>Cadastral RoW Buffer</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Right-of-Way width dynamically computed to prevent structural encroachments and court injunctions.
                  </p>
                </div>
                <div style={{ padding: 14, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--rose)', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                    <AlertTriangle size={14} />
                    <span>Dispute Spatial Overlay</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    Parcels with pending civil writs or boundary discord are isolated with automated legal escrow routing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MIS TABLE */}
          {activeTab === 'MIS Table' && (
            <div className="panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <h3 className="panel-title">National Capital Land Acquisition MIS Registry</h3>
                  <p className="panel-subtitle">Comprehensive tabular view of statutory compliance, PFMS disbursement, and physical possession</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div className="search-wrapper">
                    <Search size={14} className="search-icon" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search registry..."
                      className="search-input"
                    />
                  </div>
                  <button type="button" className="btn primary" onClick={handleExportMIS}>
                    <Download size={14} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              <ProjectTable
                projects={filteredProjects}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </div>
          )}

          {/* TAB 5: ALERTS & AUDIT LOGS */}
          {activeTab === 'Alerts & Audits' && (
            <div className="panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <h3 className="panel-title">National Land Governance Audit Ledger</h3>
                  <p className="panel-subtitle">Cryptographically verified trail of officer determinations and statutory milestones</p>
                </div>
                <span className="brand-badge">Immutable Ledger Active</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {seedAuditEvents.map((event) => (
                  <div
                    key={event.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 'var(--radius-sm)',
                          display: 'grid',
                          placeItems: 'center',
                          background:
                            event.status === 'Warning'
                              ? 'var(--rose-subtle)'
                              : event.status === 'Pending'
                              ? 'var(--amber-subtle)'
                              : 'var(--emerald-subtle)',
                          color:
                            event.status === 'Warning'
                              ? 'var(--rose)'
                              : event.status === 'Pending'
                              ? 'var(--amber)'
                              : 'var(--emerald)'
                        }}
                      >
                        {event.status === 'Warning' ? (
                          <AlertTriangle size={15} />
                        ) : event.status === 'Pending' ? (
                          <Clock size={15} />
                        ) : (
                          <CheckCircle2 size={15} />
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                          {event.action}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                          Project: <strong>{event.projectId}</strong> · Actor: {event.actor} ({event.role})
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: 'var(--text-tertiary)' }}>
                        {event.timestamp}
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color:
                            event.status === 'Warning'
                              ? 'var(--rose)'
                              : event.status === 'Pending'
                              ? 'var(--amber)'
                              : 'var(--emerald)'
                        }}
                      >
                        ● {event.status || 'Verified'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="panel">
              <div className="panel-header">
                <div className="panel-header-left">
                  <h3 className="panel-title">Statutory Governance & Compliance Configuration</h3>
                  <p className="panel-subtitle">Rule parameters for RFCTLARR 2013 automatic escalation</p>
                </div>
                <Sliders size={16} color="var(--sky)" />
              </div>

              <div className="settings-grid">
                <div style={{ padding: 18, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h4 style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>SLA Escalation Windows</h4>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Section 11(1) Preliminary Notification Lapse Alert</label>
                    <input type="text" readOnly value="60 Calendar Days prior to expiry" className="field-input" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Section 26 Compensation Assessment Grace Period</label>
                    <input type="text" readOnly value="30 Calendar Days" className="field-input" />
                  </div>
                </div>

                <div style={{ padding: 18, background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h4 style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>Security & RBAC Controls</h4>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Active Officer Persona</label>
                    <select
                      className="field-select"
                      value={role}
                      onChange={(e) => {
                        const newRole = e.target.value as Role;
                        setRole(newRole);
                        localStorage.setItem('terralink_role', newRole);
                      }}
                    >
                      {['Ministry', 'State', 'District', 'PIA', 'Field Officer'].map((r) => (
                        <option key={r} value={r}>
                          {r} Officer
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Ledger Audit Engine</label>
                    <input type="text" readOnly value="SHA-256 State Hashing Active" className="field-input" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project Details Modal Slide-Over */}
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* Footer Note */}
          <p style={{ marginTop: 32, textAlign: 'center', fontSize: 11, color: 'var(--text-tertiary)' }}>
            TerraLink National Command Center · RFCTLARR 2013 Statutory Compliance · PostGIS Cadastral Layer · Ready for Vercel Cloud Hosting
          </p>
        </main>
      </div>
    </div>
  );
}
