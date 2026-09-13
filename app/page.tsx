'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Building,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  GitPullRequest,
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
  Zap
} from 'lucide-react';

const workflowSteps = [
  { step: '01', name: 'Proposal', section: 'Sec 4(1)', sla: '15 Days', desc: 'SIA study initiation and preliminary project requisition by PIA.' },
  { step: '02', name: 'District Scrutiny', section: 'Sec 6', sla: '30 Days', desc: 'Collector committee review, social impact appraisal, and public hearings.' },
  { step: '03', name: 'State Approval', section: 'Sec 8', sla: '45 Days', desc: 'State Revenue Department review and administrative sanctions.' },
  { step: '04', name: 'Central Concurrence', section: 'Sec 9', sla: '30 Days', desc: 'Central line ministry clearance for multi-state and national corridors.' },
  { step: '05', name: 'Notification', section: 'Sec 11(1)', sla: '60 Days', desc: 'Statutory gazette notification and boundary survey freeze.' },
  { step: '06', name: 'Award', section: 'Sec 23', sla: '90 Days', desc: 'Collector inquiry and formal determination of land value & claims.' },
  { step: '07', name: 'Compensation', section: 'Sec 26', sla: '30 Days', desc: 'Solatium, market value assessment, and multiplication factor applied.' },
  { step: '08', name: 'Payment', section: 'Sec 30', sla: '15 Days', desc: 'Direct PFMS bank transfer to validated Aadhaar-linked accounts.' },
  { step: '09', name: 'Possession', section: 'Sec 38', sla: '45 Days', desc: 'Physical possession certificate issued after full payment receipt.' },
  { step: '10', name: 'R & R', section: 'Sec 31', sla: '60 Days', desc: 'Rehabilitation infrastructure, housing allocation, and livelihood support.' },
  { step: '11', name: 'Completed', section: 'Closure', sla: '0 Days', desc: 'Corridor unencumbered, digitised records archived in DILRMP.' },
];

const problemList = [
  {
    title: 'Fragmented Systems',
    desc: 'Different state, revenue, and infrastructure departments work in disconnected silos with no shared real-time project view.',
    icon: Layers,
    color: '#ef4444'
  },
  {
    title: 'No Real-Time Status',
    desc: 'Senior decision-makers lack a single national dashboard to track multi-corridor progress across multiple states.',
    icon: Eye,
    color: '#f97316'
  },
  {
    title: 'Delayed Compensation',
    desc: 'Landowners face opaque payment schedules, escrow bottlenecks, and prolonged disbursement tracking gaps.',
    icon: Wallet,
    color: '#eab308'
  },
  {
    title: 'Disconnected R&R Tracking',
    desc: 'Physical land possession and Rehabilitation & Resettlement are untracked together, leaving affected families vulnerable.',
    icon: Users,
    color: '#ec4899'
  },
  {
    title: 'Repeated Data Entry',
    desc: 'Survey numbers and khata files are manually duplicated across municipal, district, and state revenue ledgers.',
    icon: GitPullRequest,
    color: '#8b5cf6'
  },
  {
    title: 'Late Delay Detection',
    desc: 'Statutory lapse risks and Section 11 expiry dates are only discovered after projects face cost overruns and litigation.',
    icon: AlertTriangle,
    color: '#f43f5e'
  }
];

const solutionList = [
  {
    title: 'GIS Land Mapping',
    desc: 'Geo-tagged parcels with real-time statutory status, Right-of-Way alignment buffers, and ULPIN cadastral linking.',
    icon: MapPin,
    tag: 'Spatial Intelligence'
  },
  {
    title: 'Smart Executive Insights',
    desc: 'Single unified command center monitoring land pipeline, PFMS direct disbursements, and R&R fulfillment.',
    icon: Landmark,
    tag: 'Single Source of Truth'
  },
  {
    title: 'Unified Digital Workflow',
    desc: 'Central Ministry, State Governments, District Collectors, and PIAs collaborate seamlessly on one platform.',
    icon: GitPullRequest,
    tag: 'End-to-End Governance'
  },
  {
    title: 'Automated Instant Alerts',
    desc: 'Statutory notifications for pending approvals, PFMS release batches, and 60-day Section 11 lapse countdowns.',
    icon: Bell,
    tag: 'Proactive Escalation'
  },
  {
    title: 'AI Delay Prediction Engine',
    desc: 'Predictive machine learning flags high-risk corridors based on litigation history, land type, and regional readiness.',
    icon: Cpu,
    tag: 'Predictive Governance'
  }
];

const stakeholders = [
  {
    role: 'Central Ministry',
    badge: 'Policy & Oversight',
    desc: 'National infrastructure monitoring, capital expenditure tracking, inter-state corridor approvals, and macro SLA enforcement.',
    icon: Landmark,
    color: '#1e40af'
  },
  {
    role: 'State Government',
    badge: 'Approvals & Sanctions',
    desc: 'Cabinet sanctions, revenue department notifications, state-wide Bhulekh synchronization, and collector coordination.',
    icon: Building,
    color: '#2563eb'
  },
  {
    role: 'District Administration',
    badge: 'Implementation & Verification',
    desc: 'District Collector scrutiny, public inquiry hearings, Section 23 award declarations, and statutory compensation disbursement.',
    icon: ClipboardCheck,
    color: '#0d9488'
  },
  {
    role: 'Project Implementing Agency (PIA)',
    badge: 'Project Execution',
    desc: 'NHAI, Railways, Metro, and Energy authorities managing land requisitions, escrow fund transfers, and contractor alignment.',
    icon: Activity,
    color: '#4f46e5'
  },
  {
    role: 'Field Officers',
    badge: 'On-Ground Data Capture',
    desc: 'Cadastral ground truthing, mobile geotagging, dispute reporting, and biometric khatedar verification with offline support.',
    icon: MapPin,
    color: '#059669'
  },
  {
    role: 'Affected Families',
    badge: 'Compensation & R&R',
    desc: 'Transparent public portal for khata lookup, PFMS disbursement tracking, entitlement certificates, and grievance redressal.',
    icon: Users,
    color: '#d97706'
  }
];

const comparisonData = [
  {
    feature: 'End-to-end acquisition workflow',
    bhoomiRashi: 'Highways only (Proposal→Award)',
    ngdrs: 'Registration only',
    dilrmp: 'Records & titling only',
    terralink: 'Proposal → Award → Possession → R&R (All Sectors)'
  },
  {
    feature: 'Sector & Infrastructure scale',
    bhoomiRashi: 'MoRTH / NHAI highway projects',
    ngdrs: 'State-run deed registration',
    dilrmp: 'Nationwide revenue records',
    terralink: 'Multi-Ministry (Highways, Rail, Ports, Energy, Urban)'
  },
  {
    feature: 'GIS Geo-Tagging & Map Dashboard',
    bhoomiRashi: 'Not a core feature',
    ngdrs: 'No spatial mapping',
    dilrmp: 'GIS/GPS survey mapping',
    terralink: 'Interactive parcel-level GIS with RoW buffer & ULPIN'
  },
  {
    feature: 'Real-time compensation tracking',
    bhoomiRashi: 'PFMS-linked highway payouts',
    ngdrs: 'Not applicable',
    dilrmp: 'Not applicable',
    terralink: 'Direct PFMS payouts tied to possession & R&R milestones'
  },
  {
    feature: 'Displaced Family & R&R Monitoring',
    bhoomiRashi: 'Not tracked',
    ngdrs: 'Not applicable',
    dilrmp: 'Not applicable',
    terralink: 'Dedicated Section 31 R&R module linking families to possession'
  },
  {
    feature: 'Predictive Delay-Risk Engine',
    bhoomiRashi: 'Not available',
    ngdrs: 'Not available',
    dilrmp: 'Not available',
    terralink: 'AI/ML predictive model flags high-risk bottlenecks early'
  },
  {
    feature: 'Role-based Governance Dashboards',
    bhoomiRashi: 'Limited (PWD / Revenue / MoRTH)',
    ngdrs: 'Sub-registrar & citizen focused',
    dilrmp: 'Department-level only',
    terralink: 'Customized views: Ministry, State, District, PIA, Auditor'
  },
  {
    feature: 'Interoperability & Open APIs',
    bhoomiRashi: 'PFMS only',
    ngdrs: 'Standalone per-state instances',
    dilrmp: 'Feeds land archive, no acquisition layer',
    terralink: 'Two-way REST APIs for DILRMP, ULPIN, State Bhulekh & PFMS'
  },
  {
    feature: 'Statutory Audit Trail & Security',
    bhoomiRashi: 'Partial (LA notices only)',
    ngdrs: 'Deed documents only',
    dilrmp: 'Land record archive only',
    terralink: 'Immutable, timestamped RFCTLARR audit ledger (CERT-In / DPDP)'
  },
];

const challengeStrategies = [
  {
    challenge: 'Uneven State Digital Readiness',
    impact: 'Different states have varied digitization levels in revenue records.',
    strategy: 'Phased rollout starting in pilot states, expanding nationwide.'
  },
  {
    challenge: 'No Common Data Format',
    impact: 'Heterogeneous state schemas (Bhulekh, Bhoomi, Dharani, Banglarbhumi).',
    strategy: 'Lightweight per-state adapters standardizing to national ULPIN schema.'
  },
  {
    challenge: 'Limited Initial AI Training Data',
    impact: 'Predictive ML models require rich historical delay datasets.',
    strategy: 'Start with deterministic statutory SLA rules, maturing into ML as data builds.'
  },
  {
    challenge: 'Data Security & Citizen Privacy',
    impact: 'Sensitive land ownership records and direct bank compensation info.',
    strategy: 'Strict CERT-In compliance, DPDP Act adherence, and 256-bit encryption.'
  },
  {
    challenge: 'Poor Rural Field Connectivity',
    impact: 'Field officers conduct physical boundary inspections in remote areas.',
    strategy: 'Offline-first progressive web app with automatic background synchronization.'
  }
];

export default function LandingPage() {
  const [selectedWorkflowStep, setSelectedWorkflowStep] = useState(6);

  return (
    <div className="landing-page">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-brand">
            <Image
              src="/logo.png"
              alt="TerraLink"
              width={60}
              height={40}
              style={{ height: 40, width: 'auto' }}
              priority
            />
            <div className="brand-titles">
              <span className="brand-name">TerraLink</span>
              <span className="brand-sub">National Land Governance Portal</span>
            </div>
            <span className="sih-nav-badge">SIH 2026 · PS 26016</span>
          </div>

          <nav className="nav-links-desktop">
            <a href="#problems" className="nav-item-link">Problems</a>
            <a href="#solution" className="nav-item-link">Solution</a>
            <a href="#workflow" className="nav-item-link">11-Stage Pipeline</a>
            <a href="#stakeholders" className="nav-item-link">Stakeholders</a>
            <a href="#tech" className="nav-item-link">Architecture</a>
            <a href="#comparison" className="nav-item-link">Benchmark</a>
            <a href="#feasibility" className="nav-item-link">Feasibility</a>
          </nav>

          <div className="nav-cta-group">
            <Link href="/login" className="btn secondary nav-login-btn">
              <UserCheck size={14} />
              <span>Officer Login</span>
            </Link>
            <Link href="/dashboard" className="btn primary nav-dash-btn">
              <span>Command Center</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-eyebrow">
            <span className="sih-pill">Smart India Hackathon 2026 · Theme: Smart Automation</span>
            <span className="sih-id">Problem Statement ID: 26016</span>
          </div>

          <h1 className="hero-title">
            Real-Time National Land Acquisition & Management System
          </h1>

          <p className="hero-tagline">
            “Where land acquisition finds its path.”
          </p>

          <p className="hero-desc">
            A unified, secure, and intelligent digital command platform designed for end-to-end digital monitoring,
            statutory RFCTLARR 2013 compliance, ULPIN cadastral intelligence, and transparent rehabilitation.
          </p>

          <div className="hero-actions">
            <Link href="/dashboard" className="btn primary hero-btn-main">
              <span>Launch Command Center</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn secondary hero-btn-sec">
              <ShieldCheck size={16} />
              <span>Statutory Officer Portal</span>
            </Link>
            <a href="#workflow" className="btn outline hero-btn-learn">
              <span>Explore 11-Stage Pipeline</span>
            </a>
          </div>

          {/* Key Stat Cards / Hero Trust Counters */}
          <div className="hero-kpi-banner">
            <div className="hero-kpi-item">
              <div className="kpi-num">100%</div>
              <div className="kpi-txt">End-to-End Digital Pipeline</div>
            </div>
            <div className="hero-kpi-sep" />
            <div className="hero-kpi-item">
              <div className="kpi-num">11 Stages</div>
              <div className="kpi-txt">RFCTLARR 2013 Statutory Milestones</div>
            </div>
            <div className="hero-kpi-sep" />
            <div className="hero-kpi-item">
              <div className="kpi-num">14-Digit</div>
              <div className="kpi-txt">ULPIN Cadastral GIS Integration</div>
            </div>
            <div className="hero-kpi-sep" />
            <div className="hero-kpi-item">
              <div className="kpi-num">Direct PFMS</div>
              <div className="kpi-txt">Transparent Compensation Payouts</div>
            </div>
            <div className="hero-kpi-sep" />
            <div className="hero-kpi-item">
              <div className="kpi-num">Predictive AI</div>
              <div className="kpi-txt">Early Delay & Risk Detection</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM VS SOLUTION SECTION */}
      <section id="problems" className="landing-section bg-subtle">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>Current Gaps & Pain Points</span>
            </div>
            <h2 className="section-heading">The Challenges in Land Acquisition</h2>
            <p className="section-subtext">
              Capital infrastructure projects face multi-year delays, statutory breaches, and citizen distress
              due to fragmented legacy systems across departments.
            </p>
          </div>

          <div className="problem-grid">
            {problemList.map((prob) => {
              const Icon = prob.icon;
              return (
                <div key={prob.title} className="problem-card">
                  <div className="problem-icon-wrap" style={{ color: prob.color, background: `${prob.color}15` }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="problem-title">{prob.title}</h3>
                  <p className="problem-desc">{prob.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SOLUTION PILLARS & WHY DIFFERENT */}
      <section id="solution" className="landing-section">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>Comprehensive Solution</span>
            </div>
            <h2 className="section-heading">How TerraLink Solves It</h2>
            <p className="section-subtext">
              Transforming land acquisition from a disconnected paper trail into an intelligent,
              predictive, and transparent digital journey.
            </p>
          </div>

          <div className="solution-grid">
            {solutionList.map((sol) => {
              const Icon = sol.icon;
              return (
                <div key={sol.title} className="solution-card">
                  <div className="solution-card-top">
                    <div className="solution-icon-wrap">
                      <Icon size={22} />
                    </div>
                    <span className="solution-tag">{sol.tag}</span>
                  </div>
                  <h3 className="solution-title">{sol.title}</h3>
                  <p className="solution-desc">{sol.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Why Different Callout Banner */}
          <div className="why-different-box">
            <div className="why-diff-header">
              <Sparkles size={20} className="diff-icon" />
              <h3 className="why-diff-title">Why TerraLink is Different</h3>
            </div>
            <div className="why-diff-grid">
              <div className="diff-item">
                <div className="diff-bullet">1</div>
                <div>
                  <h4>Records → Journey</h4>
                  <p>Tracks the complete acquisition lifecycle, not just static land records.</p>
                </div>
              </div>
              <div className="diff-item">
                <div className="diff-bullet">2</div>
                <div>
                  <h4>Connects Existing Systems</h4>
                  <p>Directly integrates DILRMP, ULPIN & state land portals through REST APIs without replacing them.</p>
                </div>
              </div>
              <div className="diff-item">
                <div className="diff-bullet">3</div>
                <div>
                  <h4>Predictive, Not Reactive</h4>
                  <p>AI delay models flag statutory bottlenecks and legal risks before deadlines expire.</p>
                </div>
              </div>
              <div className="diff-item">
                <div className="diff-bullet">4</div>
                <div>
                  <h4>Possession → Rehabilitation</h4>
                  <p>Directly links physical land possession with Section 31 R&R so affected families are never overlooked.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 11-STAGE BUSINESS WORKFLOW */}
      <section id="workflow" className="landing-section bg-subtle">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>RFCTLARR 2013 Statutory Progression</span>
            </div>
            <h2 className="section-heading">The 11-Stage Land Acquisition Pipeline</h2>
            <p className="section-subtext">
              Every stage of the statutory land acquisition process is digitized, tracked against legal SLA timelines,
              and sealed with immutable officer audit logs.
            </p>
          </div>

          {/* Interactive Flow Ribbon */}
          <div className="workflow-pipeline-wrapper">
            <div className="workflow-steps-horizontal">
              {workflowSteps.map((s, idx) => {
                const isSelected = selectedWorkflowStep === idx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    className={`pipeline-step-node ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedWorkflowStep(idx)}
                  >
                    <span className="step-badge">{s.step}</span>
                    <span className="step-name">{s.name}</span>
                    <span className="step-sec">{s.section}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Step Detail Card */}
            <div className="selected-step-card">
              <div className="selected-step-left">
                <span className="selected-step-num">STAGE {workflowSteps[selectedWorkflowStep].step}</span>
                <h3 className="selected-step-title">{workflowSteps[selectedWorkflowStep].name}</h3>
                <span className="selected-step-statute">{workflowSteps[selectedWorkflowStep].section} · RFCTLARR 2013</span>
                <p className="selected-step-desc">{workflowSteps[selectedWorkflowStep].desc}</p>
              </div>
              <div className="selected-step-right">
                <div className="step-sla-box">
                  <Clock size={18} />
                  <div>
                    <div className="sla-label">Statutory SLA Window</div>
                    <div className="sla-value">{workflowSteps[selectedWorkflowStep].sla}</div>
                  </div>
                </div>
                <Link href="/dashboard" className="btn primary btn-sm">
                  <span>Inspect in Command Center</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. USERS & STAKEHOLDERS */}
      <section id="stakeholders" className="landing-section">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>Multi-Tier Stakeholder Governance</span>
            </div>
            <h2 className="section-heading">One Platform For All Stakeholders</h2>
            <p className="section-subtext">
              From central cabinet ministers to affected village families, TerraLink provides customized,
              role-based workspaces with dedicated permissions and tailored tools.
            </p>
          </div>

          <div className="stakeholders-grid">
            {stakeholders.map((sh) => {
              const Icon = sh.icon;
              return (
                <div key={sh.role} className="stakeholder-card">
                  <div className="stakeholder-card-top">
                    <div className="stakeholder-icon" style={{ color: sh.color, background: `${sh.color}15` }}>
                      <Icon size={22} />
                    </div>
                    <span className="stakeholder-badge">{sh.badge}</span>
                  </div>
                  <h3 className="stakeholder-role">{sh.role}</h3>
                  <p className="stakeholder-desc">{sh.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TECHNICAL ARCHITECTURE & ENGINES */}
      <section id="tech" className="landing-section bg-subtle">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>Technical Approach</span>
            </div>
            <h2 className="section-heading">Modular, Secure & Scalable Architecture</h2>
            <p className="section-subtext">
              Engineered with modern cloud standards, geospatial PostGIS databases, predictive AI/ML models,
              and hardened RBAC security to deliver transparent, actionable insights.
            </p>
          </div>

          <div className="arch-layer-grid">
            <div className="arch-layer-card">
              <div className="arch-layer-head">
                <Lock size={18} className="arch-icon" />
                <h4>1. Secure Access Layer</h4>
              </div>
              <p>JWT / OAuth2 tokenized security, Role-Based Access Control (RBAC), encrypted communication, and immutable audit logs.</p>
            </div>

            <div className="arch-layer-card">
              <div className="arch-layer-head">
                <Activity size={18} className="arch-icon" />
                <h4>2. Role-Based Dashboard</h4>
              </div>
              <p>React / Next.js responsive web UI with tailored views for Centre, State, and District with task and notification engines.</p>
            </div>

            <div className="arch-layer-card">
              <div className="arch-layer-head">
                <GitPullRequest size={18} className="arch-icon" />
                <h4>3. Workflow Engine</h4>
              </div>
              <p>State machine driving the full pipeline: Proposal, Scrutiny, Approval, GIS Mapping, Compensation, Payment & R&R.</p>
            </div>

            <div className="arch-layer-card">
              <div className="arch-layer-head">
                <Database size={18} className="arch-icon" />
                <h4>4. Spatial Data Layer</h4>
              </div>
              <p>PostgreSQL + PostGIS spatial database linking parcels, 14-digit ULPIN codes, khatas, payments, and legal records.</p>
            </div>

            <div className="arch-layer-card">
              <div className="arch-layer-head">
                <Cpu size={18} className="arch-icon" />
                <h4>5. AI/ML Delay Engine</h4>
              </div>
              <p>Scikit-Learn models analyzing state readiness, land classification, family counts, litigation, and historical timeline velocity.</p>
            </div>

            <div className="arch-layer-card">
              <div className="arch-layer-head">
                <Server size={18} className="arch-icon" />
                <h4>6. Integration Layer</h4>
              </div>
              <p>REST APIs interfacing with DILRMP, ULPIN registry, State Land Portals (Bhoomi/Bhulekh), and PFMS treasury payments.</p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="tech-stack-row">
            <div className="tech-badge"><strong>Frontend:</strong> Next.js 15 & React 19</div>
            <div className="tech-badge"><strong>Backend:</strong> Node.js / Express Services</div>
            <div className="tech-badge"><strong>Database:</strong> PostgreSQL + PostGIS</div>
            <div className="tech-badge"><strong>AI/ML:</strong> Python (Scikit-Learn)</div>
            <div className="tech-badge"><strong>APIs:</strong> Open REST Integration Layer</div>
            <div className="tech-badge"><strong>Deployment:</strong> Vercel & Cloud Infrastructure</div>
          </div>
        </div>
      </section>

      {/* 8. COMPARISON WITH EXISTING SYSTEMS */}
      <section id="comparison" className="landing-section">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>Competitive Benchmark</span>
            </div>
            <h2 className="section-heading">How TerraLink Compares With Existing Systems</h2>
            <p className="section-subtext">
              A comprehensive benchmark against national land platforms: Bhoomi Rashi (MoRTH), NGDRS (DoLR), and DILRMP.
            </p>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Platform Feature</th>
                  <th style={{ width: '18%' }}>Bhoomi Rashi (MoRTH)</th>
                  <th style={{ width: '18%' }}>NGDRS (DoLR)</th>
                  <th style={{ width: '18%' }}>DILRMP</th>
                  <th style={{ width: '24%' }} className="highlight-col">TerraLink (Ours)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature}>
                    <td className="feat-title">{row.feature}</td>
                    <td className="comp-cell-val">{row.bhoomiRashi}</td>
                    <td className="comp-cell-val">{row.ngdrs}</td>
                    <td className="comp-cell-val">{row.dilrmp}</td>
                    <td className="comp-cell-val highlight-val">
                      <CheckCircle2 size={14} className="val-icon" />
                      <span>{row.terralink}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reference Links Bar */}
          <div className="gov-reference-bar">
            <span className="gov-ref-label">Official System References:</span>
            <a href="https://bhoomirashi.gov.in" target="_blank" rel="noreferrer" className="gov-ref-link">
              Bhoomi Rashi (MoRTH) <ExternalLink size={11} />
            </a>
            <a href="https://dilrmp.gov.in" target="_blank" rel="noreferrer" className="gov-ref-link">
              DILRMP (DoLR) <ExternalLink size={11} />
            </a>
            <a href="https://jharnibandhan.gov.in" target="_blank" rel="noreferrer" className="gov-ref-link">
              NGDRS / JharNibandhan <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </section>

      {/* 9. FEASIBILITY & CHALLENGES STRATEGY */}
      <section id="feasibility" className="landing-section bg-subtle">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>Viability & Implementation Strategy</span>
            </div>
            <h2 className="section-heading">Feasibility Analysis & Risk Mitigation</h2>
            <p className="section-subtext">
              Designed for practical government adoption with low capital friction, seamless state integration,
              and strict cybersecurity compliance.
            </p>
          </div>

          {/* 3 Feasibility Dimensions */}
          <div className="feasibility-dimensions-grid">
            <div className="feasibility-card">
              <div className="feasibility-card-head">
                <Zap size={20} className="f-icon green" />
                <h3>Technical Feasibility</h3>
              </div>
              <ul className="f-list">
                <li>Connects existing state land systems (Bhoomi, Bhulekh)—no platform replacement required.</li>
                <li>Progressive ULPIN adoption accommodates states transitioning to complete GIS parcel coverage.</li>
                <li>AI delay prediction starts with deterministic rule-based alerts, evolving into predictive ML.</li>
              </ul>
            </div>

            <div className="feasibility-card">
              <div className="feasibility-card-head">
                <Building size={20} className="f-icon blue" />
                <h3>Operational Feasibility</h3>
              </div>
              <ul className="f-list">
                <li>Central, State, and District coordination structures already exist; TerraLink digitizes the handshake.</li>
                <li>Accommodates varied state digital readiness through phased, state-by-state onboarding.</li>
                <li>Offline capability ensures field officers in remote rural corridors can capture data reliably.</li>
              </ul>
            </div>

            <div className="feasibility-card">
              <div className="feasibility-card-head">
                <Wallet size={20} className="f-icon amber" />
                <h3>Economic Feasibility</h3>
              </div>
              <ul className="f-list">
                <li>Low incremental cost—existing NIC and cloud infrastructure covers core hardware and compute.</li>
                <li>Piloted across 2–3 ready states to empirically prove cost and timeline savings before national scale.</li>
                <li>Substantial national savings by reducing legal interest penalties and highway delay escalation.</li>
              </ul>
            </div>
          </div>

          {/* Challenges vs Strategies Table */}
          <div className="challenges-wrapper">
            <h3 className="challenges-title">Challenges vs. Our Strategic Solutions</h3>
            <div className="challenges-grid">
              {challengeStrategies.map((cs) => (
                <div key={cs.challenge} className="challenge-item-card">
                  <div className="challenge-header">
                    <AlertTriangle size={16} className="c-warn-icon" />
                    <h4>{cs.challenge}</h4>
                  </div>
                  <p className="challenge-impact"><strong>Problem:</strong> {cs.impact}</p>
                  <div className="challenge-solution">
                    <CheckCircle2 size={14} className="c-sol-icon" />
                    <span><strong>Strategy:</strong> {cs.strategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. IMPACT AND BENEFITS */}
      <section className="landing-section">
        <div className="section-container">
          <div className="section-head text-center">
            <div className="eyebrow justify-center">
              <span className="eyebrow-dot" />
              <span>National Impact</span>
            </div>
            <h2 className="section-heading">Transforming Land Governance For Bharat</h2>
            <p className="section-subtext">
              Delivering measurable economic, statutory, and human benefits across the nation’s infrastructure horizon.
            </p>
          </div>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon-circle green">
                <Users size={22} />
              </div>
              <h3>Empowering Affected Families</h3>
              <p>Directly links physical possession with Section 31 R&R entitlements, ensuring no displaced family is overlooked.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon-circle blue">
                <Eye size={22} />
              </div>
              <h3>System-Wide Transparency</h3>
              <p>Eliminates inter-departmental blind spots with a synchronized single source of truth for Centre, State, and District.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon-circle amber">
                <TrendingUp size={22} />
              </div>
              <h3>Predictive Delay Governance</h3>
              <p>Identifies projects approaching statutory lapse windows early, allowing corrective administrative intervention.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon-circle purple">
                <Wallet size={22} />
              </div>
              <h3>Transparent Compensation Tracking</h3>
              <p>Real-time audit of compensation due, assessed, and disbursed via direct PFMS bank transfer prevents financial leakage.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon-circle teal">
                <MapPin size={22} />
              </div>
              <h3>Cadastral GIS Monitoring</h3>
              <p>High-resolution parcel polygons with Right-of-Way alignment buffers protect corridors from encroachment and litigation.</p>
            </div>

            <div className="impact-card">
              <div className="impact-icon-circle rose">
                <ShieldCheck size={22} />
              </div>
              <h3>Accountability & Auditability</h3>
              <p>Cryptographically verified, timestamped activity trails ensure complete legal defensibility in high court proceedings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CALL TO ACTION BANNER */}
      <section className="cta-banner-section">
        <div className="cta-banner-container">
          <Image
            src="/logo.png"
            alt="TerraLink"
            width={72}
            height={48}
            style={{ height: 48, width: 'auto', marginBottom: 12 }}
          />
          <h2 className="cta-banner-title">Experience TerraLink in Action</h2>
          <p className="cta-banner-desc">
            Explore the live executive dashboard with interactive cadastral GIS mapping, PFMS disbursement analytics,
            and real-time statutory RFCTLARR 2013 workflow progression.
          </p>
          <div className="cta-banner-actions">
            <Link href="/dashboard" className="btn primary cta-btn-lg">
              <span>Open Command Center</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="btn secondary cta-btn-lg">
              <UserCheck size={16} />
              <span>Officer Persona Sign-In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-block">
              <div className="footer-brand-row">
                <Image
                  src="/logo.png"
                  alt="TerraLink"
                  width={54}
                  height={36}
                  style={{ height: 36, width: 'auto' }}
                />
                <span className="footer-brand-name">TerraLink</span>
              </div>
              <p className="footer-brand-motto">
                “Where land acquisition finds its path.”
              </p>
              <p className="footer-brand-desc">
                Smart India Hackathon 2026 submission for Problem Statement ID 26016:
                Real-Time National Land Acquisition & Management System for End-to-End Digital Monitoring and Decision Support.
              </p>
            </div>

            <div className="footer-links-block">
              <h4>Quick Navigation</h4>
              <ul>
                <li><a href="#problems">Key Challenges</a></li>
                <li><a href="#solution">TerraLink Solution</a></li>
                <li><a href="#workflow">11-Stage RFCTLARR Pipeline</a></li>
                <li><a href="#stakeholders">Stakeholder Ecosystem</a></li>
                <li><a href="#tech">Technical Architecture</a></li>
                <li><a href="#comparison">Competitive Benchmark</a></li>
                <li><a href="#feasibility">Feasibility & Strategy</a></li>
              </ul>
            </div>

            <div className="footer-links-block">
              <h4>Portals & Systems</h4>
              <ul>
                <li><Link href="/dashboard">National Command Dashboard</Link></li>
                <li><Link href="/login">Statutory Officer Portal</Link></li>
                <li><a href="https://bhoomirashi.gov.in" target="_blank" rel="noreferrer">Bhoomi Rashi (MoRTH)</a></li>
                <li><a href="https://dilrmp.gov.in" target="_blank" rel="noreferrer">DILRMP (DoLR)</a></li>
                <li><a href="https://jharnibandhan.gov.in" target="_blank" rel="noreferrer">NGDRS Platform</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © {new Date().getFullYear()} TerraLink · Innovate, Integrate, Impact — For A Better Bharat.
            </div>
            <div className="footer-compliance-tag">
              RFCTLARR 2013 Statutory Compliance · DPDP Act Compliant · CERT-In Guidelines
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
