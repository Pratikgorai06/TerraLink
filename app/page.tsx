'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Award,
  Bell,
  Building,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  FileCheck2,
  FilePlus2,
  GitPullRequest,
  HandCoins,
  Home,
  Landmark,
  Layers,
  Lock,
  MapPin,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  XCircle,
  Zap
} from 'lucide-react';

const workflowPipeline = [
  { step: '01', name: 'Proposal', section: 'Sec 4(1)', sla: '15d', icon: FilePlus2, highlight: 'Requisition & SIA study' },
  { step: '02', name: 'District Scrutiny', section: 'Sec 6', sla: '30d', icon: ClipboardCheck, highlight: 'Public hearings & appraisal' },
  { step: '03', name: 'State Approval', section: 'Sec 8', sla: '45d', icon: FileCheck2, highlight: 'Cabinet & Revenue sanctions' },
  { step: '04', name: 'Central Concurrence', section: 'Sec 9', sla: '30d', icon: Landmark, highlight: 'Inter-state line clearance' },
  { step: '05', name: 'Notification', section: 'Sec 11(1)', sla: '60d', icon: Bell, highlight: 'Gazette freeze & survey' },
  { step: '06', name: 'Award', section: 'Sec 23', sla: '90d', icon: Award, highlight: 'Collector legal inquiry' },
  { step: '07', name: 'Compensation', section: 'Sec 26', sla: '30d', icon: CircleDollarSign, highlight: 'Solatium & valuation' },
  { step: '08', name: 'Payment', section: 'Sec 30', sla: '15d', icon: HandCoins, highlight: 'Direct PFMS bank transfer' },
  { step: '09', name: 'Possession', section: 'Sec 38', sla: '45d', icon: Home, highlight: 'Corridor handover certificate' },
  { step: '10', name: 'R & R', section: 'Sec 31', sla: '60d', icon: Users, highlight: 'Housing & livelihood support' },
  { step: '11', name: 'Completed', section: 'Closure', sla: 'Done', icon: CheckCircle2, highlight: 'DILRMP digital archive' },
];

const challengesFlow = [
  { from: 'Uneven State Readiness', to: 'Roll out state-by-state, start where ready', icon: Zap },
  { from: 'No Common Data Format', to: 'Lightweight per-state adapters (Bhulekh / Bhoomi)', icon: Layers },
  { from: 'Insufficient AI Training Data', to: 'Start rule-based alerts, evolve into predictive ML', icon: Cpu },
  { from: 'Data Security & Privacy Risks', to: 'Hardened CERT-In & DPDP Act compliance', icon: ShieldCheck },
  { from: 'Poor Rural Field Connectivity', to: 'Offline-first caching with background sync', icon: Activity },
];

const mockParcels = [
  { id: '1', ulpin: 'RJ-ALW-4F8A2-01', survey: '142/1', owner: 'Om Prakash Yadav', area: '1.84 ha', status: 'Acquired', color: '#10b981' },
  { id: '2', ulpin: 'RJ-ALW-4F8A2-02', survey: '142/2', owner: 'Ramlal Gujjar', area: '2.30 ha', status: 'In Progress', color: '#0ea5e9' },
  { id: '3', ulpin: 'RJ-ALW-4F8A2-03', survey: '143', owner: 'Kailash Chand', area: '3.12 ha', status: 'Disputed', color: '#f43f5e' },
  { id: '4', ulpin: 'UP-PYG-19AC7-01', survey: '88/1', owner: 'Brijesh Tripathi', area: '1.45 ha', status: 'Acquired', color: '#10b981' },
];

export default function LandingPage() {
  const [activeParcel, setActiveParcel] = useState(mockParcels[0]);
  const [selectedStep, setSelectedStep] = useState(workflowPipeline[4]);

  return (
    <div className="v-landing">
      {/* 1. TOP NAVIGATION */}
      <nav className="v-nav">
        <div className="v-nav-content">
          <div className="v-brand">
            <Image
              src="/logo.png"
              alt="TerraLink"
              width={54}
              height={36}
              style={{ height: 36, width: 'auto' }}
              priority
            />
            <div className="v-brand-text">
              <span className="v-brand-title">TerraLink</span>
              <span className="v-brand-subtitle">Smart India Hackathon 2026 · PS 26016</span>
            </div>
          </div>

          <div className="v-nav-links">
            <a href="#pipeline">11-Stage Pipeline</a>
            <a href="#comparison">Problem vs Solution</a>
            <a href="#architecture">Architecture Flowchart</a>
            <a href="#gis-preview">GIS Cadastral</a>
            <a href="#strategy">Strategy Flow</a>
          </div>

          <div className="v-nav-actions">
            <Link href="/login" className="btn secondary v-btn-compact">
              <UserCheck size={14} />
              <span>Officer Login</span>
            </Link>
            <Link href="/dashboard" className="btn primary v-btn-compact">
              <span>Command Center</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION WITH VISUAL INFOGRAPHIC */}
      <header className="v-hero">
        <div className="v-hero-header">
          <div className="v-sih-tag">
            <Sparkles size={13} className="text-brand" />
            <span>Problem Statement ID 26016 · Smart Automation</span>
          </div>

          <h1 className="v-hero-title">
            Where Land Acquisition <span className="text-gradient">Finds Its Path.</span>
          </h1>

          <p className="v-hero-subtitle">
            End-to-end digital monitoring, ULPIN cadastral linking, statutory RFCTLARR 2013 compliance,
            and predictive decision support for India’s capital infrastructure corridors.
          </p>

          <div className="v-hero-btns">
            <Link href="/dashboard" className="btn primary v-btn-hero">
              <span>Open Live Command Center</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn secondary v-btn-hero">
              <ShieldCheck size={16} />
              <span>Statutory Officer Portal</span>
            </Link>
          </div>
        </div>

        {/* Hero Visual Image & Floating Badges */}
        <div className="v-hero-image-wrapper">
          <div className="v-hero-frame">
            <Image
              src="/platform_hero.jpg"
              alt="TerraLink Digital Land Governance Infographic"
              width={1100}
              height={620}
              className="v-hero-img"
              priority
            />
            {/* Overlay Badges */}
            <div className="v-float-badge badge-top-left">
              <MapPin size={15} className="text-emerald" />
              <div>
                <span className="v-badge-title">14-Digit ULPIN Geospatial Link</span>
                <span className="v-badge-sub">Survey of India BhuNaksha sync</span>
              </div>
            </div>

            <div className="v-float-badge badge-bottom-right">
              <Wallet size={15} className="text-brand" />
              <div>
                <span className="v-badge-title">Direct PFMS Disbursements</span>
                <span className="v-badge-sub">Sec 30 zero-leakage beneficiary payout</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. VISUAL FLOWCHART 1: 11-STAGE RFCTLARR PIPELINE */}
      <section id="pipeline" className="v-section">
        <div className="v-section-head">
          <span className="v-pill-label">BUSINESS WORKFLOW</span>
          <h2>End-to-End RFCTLARR 2013 Acquisition Pipeline</h2>
          <p>Every milestone legally sequenced, tracked against statutory SLA days, and digitally verified.</p>
        </div>

        {/* Flowchart Track */}
        <div className="v-flowchart-container">
          <div className="v-flowchart-track">
            {workflowPipeline.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedStep.step === item.step;
              return (
                <div key={item.step} className="v-flow-node-wrapper">
                  <button
                    type="button"
                    className={`v-flow-node ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedStep(item)}
                  >
                    <span className="v-flow-step">{item.step}</span>
                    <div className="v-flow-icon">
                      <Icon size={18} />
                    </div>
                    <span className="v-flow-name">{item.name}</span>
                    <span className="v-flow-sec">{item.section}</span>
                    <span className="v-flow-sla">SLA: {item.sla}</span>
                  </button>

                  {idx < workflowPipeline.length - 1 && (
                    <div className="v-flow-arrow">→</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Inspection Card */}
          <div className="v-flow-detail-card">
            <div className="v-detail-left">
              <div className="v-detail-badge">STAGE {selectedStep.step} OF 11</div>
              <h3>{selectedStep.name} · {selectedStep.section}</h3>
              <p>{selectedStep.highlight}</p>
            </div>
            <div className="v-detail-right">
              <div className="v-sla-pill">
                <Clock size={16} />
                <span>Statutory SLA: <strong>{selectedStep.sla}</strong></span>
              </div>
              <Link href="/dashboard" className="btn primary v-btn-compact">
                <span>View in Dashboard</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL PROBLEM VS SOLUTION (SIDE-BY-SIDE FLOW) */}
      <section id="comparison" className="v-section v-bg-subtle">
        <div className="v-section-head">
          <span className="v-pill-label">SYSTEM TRANSFORMATION</span>
          <h2>Fragmented Legacy Paperwork → Unified Digital Intelligence</h2>
          <p>Solving chronic delays, disjointed departments, and citizen grievances at national scale.</p>
        </div>

        <div className="v-comparison-grid">
          {/* Left: Problems */}
          <div className="v-comp-column v-prob-col">
            <div className="v-col-header">
              <XCircle size={20} className="text-rose" />
              <h3>The Problems Today</h3>
            </div>
            <div className="v-card-list">
              <div className="v-status-card error">
                <div className="v-card-icon-wrap"><Layers size={16} /></div>
                <div>
                  <h4>Fragmented Systems</h4>
                  <p>Revenue, Forest, and Highway departments work in isolated silos with zero live sync.</p>
                </div>
              </div>

              <div className="v-status-card error">
                <div className="v-card-icon-wrap"><AlertTriangle size={16} /></div>
                <div>
                  <h4>Blindspot Delay Detection</h4>
                  <p>Section 11 lapse deadlines and court stays are identified only after projects stall.</p>
                </div>
              </div>

              <div className="v-status-card error">
                <div className="v-card-icon-wrap"><Wallet size={16} /></div>
                <div>
                  <h4>Delayed Compensation</h4>
                  <p>Escrow balances and payment disbursements lack transparent real-time tracking.</p>
                </div>
              </div>

              <div className="v-status-card error">
                <div className="v-card-icon-wrap"><Users size={16} /></div>
                <div>
                  <h4>Disconnected R&R</h4>
                  <p>Land possession is pushed without verifying rehabilitation for affected families.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Connector Badge */}
          <div className="v-bridge-connector">
            <div className="v-bridge-line" />
            <div className="v-bridge-circle">
              <Image src="/logo.png" alt="TerraLink Bridge" width={36} height={24} style={{ height: 24, width: 'auto' }} />
              <span>VS</span>
            </div>
            <div className="v-bridge-line" />
          </div>

          {/* Right: Solutions */}
          <div className="v-comp-column v-sol-col">
            <div className="v-col-header">
              <CheckCircle2 size={20} className="text-emerald" />
              <h3>The TerraLink Solution</h3>
            </div>
            <div className="v-card-list">
              <div className="v-status-card success">
                <div className="v-card-icon-wrap"><Landmark size={16} /></div>
                <div>
                  <h4>Unified Digital Single Source of Truth</h4>
                  <p>Centre, State, District, and PIA collaborate in real time on one statutory platform.</p>
                </div>
              </div>

              <div className="v-status-card success">
                <div className="v-card-icon-wrap"><Cpu size={16} /></div>
                <div>
                  <h4>Predictive AI Early Warning</h4>
                  <p>ML risk models flag high-delay corridors months before statutory deadlines expire.</p>
                </div>
              </div>

              <div className="v-status-card success">
                <div className="v-card-icon-wrap"><CheckCircle2 size={16} /></div>
                <div>
                  <h4>Direct PFMS Integration</h4>
                  <p>Direct bank compensation tied transparently to Aadhaar and validated land Khatas.</p>
                </div>
              </div>

              <div className="v-status-card success">
                <div className="v-card-icon-wrap"><Users size={16} /></div>
                <div>
                  <h4>Possession Tied to Rehabilitation</h4>
                  <p>Section 38 handover is blocked digitally until Section 31 R&R awards are satisfied.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL FLOWCHART 2: TECHNICAL ARCHITECTURE (SLIDE 3) */}
      <section id="architecture" className="v-section">
        <div className="v-section-head">
          <span className="v-pill-label">TECHNICAL APPROACH</span>
          <h2>Multi-Tier Architecture Flowchart</h2>
          <p>From stakeholders to spatial databases, predictive AI, and real-time outputs.</p>
        </div>

        <div className="v-arch-diagram">
          {/* Level 1: Stakeholders */}
          <div className="v-diagram-block">
            <span className="v-block-label">1. USERS & STAKEHOLDERS (One Platform For All)</span>
            <div className="v-nodes-row">
              <div className="v-node-pill"><Landmark size={15} /><span>Central Ministry</span></div>
              <div className="v-node-pill"><Building size={15} /><span>State Government</span></div>
              <div className="v-node-pill"><ClipboardCheck size={15} /><span>District Admin</span></div>
              <div className="v-node-pill"><Activity size={15} /><span>Executing PIA</span></div>
              <div className="v-node-pill"><MapPin size={15} /><span>Field Officers</span></div>
              <div className="v-node-pill"><Users size={15} /><span>Affected Families</span></div>
            </div>
          </div>

          <div className="v-flow-down-arrow"><ArrowDown size={18} /></div>

          {/* Level 2: Secure Layer */}
          <div className="v-diagram-block highlight-gateway">
            <div className="v-gateway-content">
              <Lock size={16} className="text-brand" />
              <span><strong>Secure Access Layer:</strong> JWT / OAuth2 · Role-Based Access Control (RBAC) · 256-Bit Encrypted Audit Trail</span>
            </div>
          </div>

          <div className="v-flow-down-arrow"><ArrowDown size={18} /></div>

          {/* Level 3: Core Engines Grid */}
          <div className="v-diagram-block">
            <span className="v-block-label">2. CORE ENGINES & SPATIAL DATA PLATFORM</span>
            <div className="v-engines-grid">
              <div className="v-engine-box">
                <Activity size={18} className="text-brand" />
                <h4>Role Dashboard</h4>
                <p>React / Next.js 15 customized views, SLA notifications, and executive KPIs.</p>
              </div>

              <div className="v-engine-box">
                <GitPullRequest size={18} className="text-brand" />
                <h4>Workflow Engine</h4>
                <p>11-stage state machine enforcing RFCTLARR statutory rules and escalation.</p>
              </div>

              <div className="v-engine-box">
                <Database size={18} className="text-brand" />
                <h4>PostGIS Spatial DB</h4>
                <p>Cadastral boundary polygons, 14-digit ULPIN keys, and khata records.</p>
              </div>

              <div className="v-engine-box">
                <Cpu size={18} className="text-brand" />
                <h4>AI/ML Delay Engine</h4>
                <p>Scikit-learn model predicting delay risks from land type and litigation.</p>
              </div>

              <div className="v-engine-box">
                <Server size={18} className="text-brand" />
                <h4>Integration Layer</h4>
                <p>REST APIs connecting DILRMP, State Bhulekh, and PFMS treasury gateways.</p>
              </div>
            </div>
          </div>

          <div className="v-flow-down-arrow"><ArrowDown size={18} /></div>

          {/* Level 4: Outcomes */}
          <div className="v-diagram-block highlight-outcomes">
            <span className="v-block-label">3. OUTPUTS & STATUTORY OUTCOMES</span>
            <div className="v-nodes-row outcomes">
              <div className="v-outcome-pill"><MapPin size={15} /><span>Live GIS Parcel Map</span></div>
              <div className="v-outcome-pill"><TrendingUp size={15} /><span>Real-Time Multi-State MIS</span></div>
              <div className="v-outcome-pill"><Bell size={15} /><span>Instant SLA Breach Alerts</span></div>
              <div className="v-outcome-pill"><Wallet size={15} /><span>PFMS Due vs Paid Audit</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE GIS VISUALIZER */}
      <section id="gis-preview" className="v-section v-bg-subtle">
        <div className="v-section-head">
          <span className="v-pill-label">GIS PARCEL INTELLIGENCE</span>
          <h2>Interactive Cadastral GIS & ULPIN Mapping</h2>
          <p>Click any parcel on the interactive diagram to inspect survey numbers, ownership, and RoW buffers.</p>
        </div>

        <div className="v-gis-mockup-wrapper">
          {/* Left: Vector Map Illustration */}
          <div className="v-gis-map-canvas">
            <div className="v-gis-map-top">
              <span className="gis-live-dot" />
              <span>National Cadastral Layer · WGS84 EPSG:4326 · Delhi–Mumbai Expressway</span>
            </div>

            <svg viewBox="0 0 540 280" className="v-gis-svg">
              <defs>
                <pattern id="gis-grid-mini" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="540" height="280" fill="url(#gis-grid-mini)" />

              {/* Waterway */}
              <path d="M -10,140 Q 150,110 270,160 T 550,120" fill="none" stroke="#bae6fd" strokeWidth="18" />

              {/* Highway Corridor Buffer */}
              <path d="M 40,80 C 180,120 340,160 500,140" fill="none" stroke="rgba(37, 99, 235, 0.12)" strokeWidth="44" />
              <path d="M 40,80 C 180,120 340,160 500,140" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="5 3" />

              {/* Cadastral Parcels */}
              <polygon
                points="70,60 140,75 130,130 65,115"
                fill={activeParcel.id === '1' ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.25)'}
                stroke="#10b981"
                strokeWidth={activeParcel.id === '1' ? 3 : 1.5}
                onClick={() => setActiveParcel(mockParcels[0])}
                style={{ cursor: 'pointer' }}
              />
              <text x="95" y="100" fill="#065f46" fontSize="10" fontWeight="bold">142/1</text>

              <polygon
                points="140,75 220,90 205,150 130,130"
                fill={activeParcel.id === '2' ? 'rgba(14, 165, 233, 0.45)' : 'rgba(14, 165, 233, 0.25)'}
                stroke="#0ea5e9"
                strokeWidth={activeParcel.id === '2' ? 3 : 1.5}
                onClick={() => setActiveParcel(mockParcels[1])}
                style={{ cursor: 'pointer' }}
              />
              <text x="165" y="115" fill="#0369a1" fontSize="10" fontWeight="bold">142/2</text>

              <polygon
                points="220,90 310,85 295,155 205,150"
                fill={activeParcel.id === '3' ? 'rgba(244, 63, 94, 0.45)' : 'rgba(244, 63, 94, 0.25)'}
                stroke="#f43f5e"
                strokeWidth={activeParcel.id === '3' ? 3 : 1.5}
                onClick={() => setActiveParcel(mockParcels[2])}
                style={{ cursor: 'pointer' }}
              />
              <text x="245" y="120" fill="#9f1239" fontSize="10" fontWeight="bold">143</text>

              <polygon
                points="330,130 420,135 405,200 320,195"
                fill={activeParcel.id === '4' ? 'rgba(16, 185, 129, 0.45)' : 'rgba(16, 185, 129, 0.25)'}
                stroke="#10b981"
                strokeWidth={activeParcel.id === '4' ? 3 : 1.5}
                onClick={() => setActiveParcel(mockParcels[3])}
                style={{ cursor: 'pointer' }}
              />
              <text x="355" y="170" fill="#065f46" fontSize="10" fontWeight="bold">88/1</text>
            </svg>

            <div className="v-gis-legend">
              <span className="v-legend-item"><span className="v-leg-dot green" /> Acquired</span>
              <span className="v-legend-item"><span className="v-leg-dot blue" /> In Progress</span>
              <span className="v-legend-item"><span className="v-leg-dot red" /> Disputed / Stays</span>
            </div>
          </div>

          {/* Right: Live Cadastral Property Card */}
          <div className="v-gis-info-card">
            <div className="v-info-card-top">
              <span className="v-ulpin-code">{activeParcel.ulpin}</span>
              <span className={`v-status-tag ${activeParcel.status.toLowerCase().replace(' ', '-')}`}>
                {activeParcel.status}
              </span>
            </div>

            <h3 className="v-info-title">Survey Plot No. {activeParcel.survey}</h3>

            <div className="v-info-specs">
              <div className="v-spec-item">
                <span className="v-spec-lbl">Khatedar / Landowner</span>
                <span className="v-spec-val">{activeParcel.owner}</span>
              </div>
              <div className="v-spec-item">
                <span className="v-spec-lbl">Acquisition Perimeter</span>
                <span className="v-spec-val">{activeParcel.area}</span>
              </div>
              <div className="v-spec-item">
                <span className="v-spec-lbl">Statutory Stage</span>
                <span className="v-spec-val">Section 30 Compensation Escrow</span>
              </div>
            </div>

            <Link href="/dashboard" className="btn primary v-btn-compact" style={{ marginTop: 16 }}>
              <span>Launch Full GIS Workspace</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. VISUAL STRATEGY FLOW (SLIDE 4) */}
      <section id="strategy" className="v-section">
        <div className="v-section-head">
          <span className="v-pill-label">FEASIBILITY & ROLLOUT</span>
          <h2>Operational Challenges → Practical Strategy Flow</h2>
          <p>How TerraLink addresses real-world governance hurdles across varied state digitization levels.</p>
        </div>

        <div className="v-strategy-flow-list">
          {challengesFlow.map((item, idx) => (
            <div key={item.from} className="v-strat-row">
              <div className="v-strat-from">
                <span className="v-strat-num">{idx + 1}</span>
                <span className="v-strat-txt">{item.from}</span>
              </div>
              <div className="v-strat-arrow">
                <span>Solves with</span>
                <ArrowRight size={16} />
              </div>
              <div className="v-strat-to">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>{item.to}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VISUAL BENCHMARK MATRIX (SLIDE 6) */}
      <section className="v-section v-bg-subtle">
        <div className="v-section-head">
          <span className="v-pill-label">COMPETITIVE BENCHMARK</span>
          <h2>How TerraLink Surpasses Existing Systems</h2>
          <p>Direct comparison against MoRTH Bhoomi Rashi, DoLR NGDRS, and DILRMP records.</p>
        </div>

        <div className="v-matrix-wrapper">
          <table className="v-matrix-table">
            <thead>
              <tr>
                <th>Key Capability</th>
                <th>Bhoomi Rashi (MoRTH)</th>
                <th>NGDRS (DoLR)</th>
                <th>DILRMP</th>
                <th className="v-col-terralink">TerraLink (Ours)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Full Lifecycle (Proposal → Possession)</strong></td>
                <td><span className="text-muted">Highways Only</span></td>
                <td><span className="text-rose">✗ Registration Only</span></td>
                <td><span className="text-rose">✗ Titling Only</span></td>
                <td className="v-td-highlight"><CheckCircle2 size={15} className="text-emerald" /> All Multi-Ministry Sectors</td>
              </tr>
              <tr>
                <td><strong>Interactive Cadastral GIS & RoW</strong></td>
                <td><span className="text-rose">✗ No Cadastral Map</span></td>
                <td><span className="text-rose">✗ No Spatial View</span></td>
                <td><span className="text-muted">Partial Survey</span></td>
                <td className="v-td-highlight"><CheckCircle2 size={15} className="text-emerald" /> Live Parcel & RoW Buffer</td>
              </tr>
              <tr>
                <td><strong>Direct PFMS Compensation Audit</strong></td>
                <td><span className="text-muted">Highway Only</span></td>
                <td><span className="text-rose">✗ N/A</span></td>
                <td><span className="text-rose">✗ N/A</span></td>
                <td className="v-td-highlight"><CheckCircle2 size={15} className="text-emerald" /> Real-time Due vs Paid Sync</td>
              </tr>
              <tr>
                <td><strong>Displaced Family & R&R Module</strong></td>
                <td><span className="text-rose">✗ Untracked</span></td>
                <td><span className="text-rose">✗ N/A</span></td>
                <td><span className="text-rose">✗ N/A</span></td>
                <td className="v-td-highlight"><CheckCircle2 size={15} className="text-emerald" /> Linked directly to Possession</td>
              </tr>
              <tr>
                <td><strong>Predictive Delay-Risk ML Engine</strong></td>
                <td><span className="text-rose">✗ Not Available</span></td>
                <td><span className="text-rose">✗ Not Available</span></td>
                <td><span className="text-rose">✗ Not Available</span></td>
                <td className="v-td-highlight"><CheckCircle2 size={15} className="text-emerald" /> Early Warning Risk Engine</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 9. BOTTOM CTA BANNER */}
      <section className="v-cta-banner">
        <div className="v-cta-content">
          <Image src="/logo.png" alt="TerraLink" width={64} height={42} style={{ height: 42, width: 'auto', marginBottom: 12 }} />
          <h2>Experience the Command Center Now</h2>
          <p>Explore live project pipelines, cadastral maps, PFMS disbursements, and automated RFCTLARR compliance.</p>
          <div className="v-cta-actions">
            <Link href="/dashboard" className="btn primary v-btn-hero">
              <span>Open National Command Center</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn secondary v-btn-hero">
              <UserCheck size={16} />
              <span>Officer Persona Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="v-footer">
        <div className="v-footer-content">
          <div className="v-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Image src="/logo.png" alt="TerraLink" width={48} height={32} style={{ height: 32, width: 'auto' }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', fontFamily: 'Space Grotesk' }}>TerraLink</span>
            </div>
            <p>Smart India Hackathon 2026 · Problem Statement 26016 · Smart Automation</p>
          </div>
          <div className="v-footer-links">
            <Link href="/dashboard">Command Center</Link>
            <Link href="/login">Officer Portal</Link>
            <a href="https://bhoomirashi.gov.in" target="_blank" rel="noreferrer">Bhoomi Rashi <ExternalLink size={11} /></a>
            <a href="https://dilrmp.gov.in" target="_blank" rel="noreferrer">DILRMP <ExternalLink size={11} /></a>
          </div>
        </div>
        <div className="v-footer-bottom">
          <span>© {new Date().getFullYear()} TerraLink · Innovate, Integrate, Impact — For A Better Bharat.</span>
          <span>RFCTLARR 2013 Statutory Compliance · DPDP Act Compliant · CERT-In Security</span>
        </div>
      </footer>
    </div>
  );
}
