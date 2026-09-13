'use client';

import {
  AlertTriangle,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileSpreadsheet,
  MapPin,
  ShieldAlert,
  Users,
  X
} from 'lucide-react';
import { Project } from '@/types';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const paidPercent = project.compensationDue > 0
    ? Math.min(100, Math.round((project.compensationPaid / project.compensationDue) * 100))
    : 0;
  const balanceDue = Math.max(0, project.compensationDue - project.compensationPaid);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-eyebrow">
              <Image
                src="/logo.png"
                alt="TerraLink"
                width={33}
                height={22}
                style={{ height: 22, width: 'auto' }}
              />
              <span className="id-badge">{project.id}</span>
              <span className="ulpin-badge">ULPIN: {project.ulpin}</span>
            </div>
            <h2 className="modal-title">{project.name}</h2>
            <div className="modal-meta">
              <MapPin size={13} />
              <span>
                {project.village ? `${project.village}, ` : ''}
                {project.tehsil ? `${project.tehsil}, ` : ''}
                {project.district}, {project.state}
              </span>
              <span className="meta-sep">•</span>
              <Building size={13} />
              <span>PIA: {project.pia}</span>
              <span className="meta-sep">•</span>
              <span>Type: {project.landType}</span>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Risk Alert Banner */}
          <div className={`risk-banner ${project.risk.toLowerCase()}`}>
            <div className="risk-banner-icon">
              {project.risk === 'High' ? (
                <ShieldAlert size={18} />
              ) : project.risk === 'Medium' ? (
                <AlertTriangle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </div>
            <div className="risk-banner-content">
              <h4>{project.risk} Risk Profile · {project.slaDaysLeft} Days SLA Remaining</h4>
              <p>{project.riskFactor || 'Statutory RFCTLARR timelines progressing under standard scrutiny.'}</p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="modal-stats-grid">
            <div className="modal-stat-card">
              <span className="stat-card-label">Acquisition Area</span>
              <span className="stat-card-value">{project.area.toLocaleString()} ha</span>
              <span className="stat-card-sub">Surveyed perimeter</span>
            </div>
            <div className="modal-stat-card">
              <span className="stat-card-label">Affected Families</span>
              <span className="stat-card-value">
                <Users size={15} style={{ display: 'inline', marginRight: 4, verticalAlign: '-1px' }} />
                {project.families}
              </span>
              <span className="stat-card-sub">Verified Khatas</span>
            </div>
            <div className="modal-stat-card">
              <span className="stat-card-label">Compensation Assessed</span>
              <span className="stat-card-value">₹{project.compensationDue.toFixed(1)} Cr</span>
              <span className="stat-card-sub">Sec 26 Market Value</span>
            </div>
            <div className="modal-stat-card">
              <span className="stat-card-label">Current Stage</span>
              <span className="stat-card-value">{project.stage}</span>
              <span className="stat-card-sub">RFCTLARR 2013</span>
            </div>
          </div>

          {/* Detailed Progress Bars */}
          <div className="modal-section">
            <h4 className="section-title">Milestone & Financial Execution</h4>
            <div className="progress-group">
              <div className="progress-item">
                <div className="progress-item-header">
                  <span>Compensation Disbursed (PFMS Direct Transfer)</span>
                  <span className="progress-numbers">
                    ₹{project.compensationPaid.toFixed(1)} Cr / ₹{project.compensationDue.toFixed(1)} Cr ({paidPercent}%)
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill emerald" style={{ width: `${paidPercent}%` }} />
                </div>
                <div className="progress-item-sub">
                  <span>Outstanding compensation liability: ₹{balanceDue.toFixed(1)} Cr</span>
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-item-header">
                  <span>Physical Land Possession (Section 38)</span>
                  <span className="progress-numbers">{project.possession}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill sky" style={{ width: `${project.possession}%` }} />
                </div>
              </div>

              <div className="progress-item">
                <div className="progress-item-header">
                  <span>Rehabilitation & Resettlement (R&R Status)</span>
                  <span className="progress-numbers">{project.rr}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill indigo" style={{ width: `${project.rr}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Cadastral Parcels List */}
          {project.parcels && project.parcels.length > 0 && (
            <div className="modal-section">
              <div className="section-header-flex">
                <h4 className="section-title">Linked Cadastral Parcels (ULPIN Registered)</h4>
                <span className="parcel-count-tag">{project.parcels.length} survey plots</span>
              </div>
              <div className="parcel-list">
                {project.parcels.map((parcel) => (
                  <div key={parcel.id} className="parcel-card">
                    <div className="parcel-top">
                      <span className="parcel-surv">Khasra/Survey #{parcel.surveyNo}</span>
                      <span className={`parcel-pill ${parcel.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {parcel.status}
                      </span>
                    </div>
                    <div className="parcel-owner">{parcel.ownerName}</div>
                    <div className="parcel-bottom">
                      <span className="parcel-ulpin-code">{parcel.ulpin}</span>
                      <span className="parcel-size">{parcel.areaHa} ha</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="modal-footer-info">
            <Clock size={13} />
            <span>Last audit event updated: {project.updatedAt}</span>
          </div>
          <div className="modal-footer-actions">
            <button type="button" className="btn secondary" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn primary"
              onClick={() => {
                alert(`Exporting official RFCTLARR Dossier for project ${project.id}...`);
              }}
            >
              <FileSpreadsheet size={14} />
              <span>Export Dossier</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
