'use client';

import { useState } from 'react';
import { ArrowUpDown, ChevronRight, ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Project } from '@/types';

interface ProjectTableProps {
  projects: Project[];
  onSelectProject?: (project: Project) => void;
}

type SortField = 'name' | 'slaDaysLeft' | 'compensationPaid' | 'possession' | 'risk';

export default function ProjectTable({ projects, onSelectProject }: ProjectTableProps) {
  const [sortField, setSortField] = useState<SortField>('slaDaysLeft');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    let result = 0;
    if (sortField === 'name') {
      result = a.name.localeCompare(b.name);
    } else if (sortField === 'slaDaysLeft') {
      result = a.slaDaysLeft - b.slaDaysLeft;
    } else if (sortField === 'compensationPaid') {
      result = a.compensationPaid - b.compensationPaid;
    } else if (sortField === 'possession') {
      result = a.possession - b.possession;
    } else if (sortField === 'risk') {
      const riskWeight = { High: 3, Medium: 2, Low: 1 };
      result = riskWeight[a.risk] - riskWeight[b.risk];
    }
    return sortAsc ? result : -result;
  });

  return (
    <div className="table-responsive">
      <table className="enterprise-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="sortable-th">
              <div className="th-content">
                <span>Project / ULPIN</span>
                <ArrowUpDown size={12} className="sort-icon" />
              </div>
            </th>
            <th>Location & Agency</th>
            <th>Stage</th>
            <th onClick={() => handleSort('slaDaysLeft')} className="sortable-th">
              <div className="th-content">
                <span>SLA Proximity</span>
                <ArrowUpDown size={12} className="sort-icon" />
              </div>
            </th>
            <th onClick={() => handleSort('compensationPaid')} className="sortable-th">
              <div className="th-content">
                <span>Compensation</span>
                <ArrowUpDown size={12} className="sort-icon" />
              </div>
            </th>
            <th onClick={() => handleSort('possession')} className="sortable-th">
              <div className="th-content">
                <span>Possession</span>
                <ArrowUpDown size={12} className="sort-icon" />
              </div>
            </th>
            <th onClick={() => handleSort('risk')} className="sortable-th">
              <div className="th-content">
                <span>Risk Index</span>
                <ArrowUpDown size={12} className="sort-icon" />
              </div>
            </th>
            <th className="action-th" />
          </tr>
        </thead>
        <tbody>
          {sortedProjects.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                style={{
                  textAlign: 'center',
                  padding: '48px 20px',
                  color: 'var(--text-tertiary)',
                  fontSize: 13,
                }}
              >
                No infrastructure projects match the selected search criteria or risk filter.
              </td>
            </tr>
          ) : (
            sortedProjects.map((project) => {
            const compPercent =
              project.compensationDue > 0
                ? Math.round((project.compensationPaid / project.compensationDue) * 100)
                : 0;

            const isUrgentSla = project.slaDaysLeft <= 5;
            const isMediumSla = project.slaDaysLeft > 5 && project.slaDaysLeft <= 15;

            return (
              <tr
                key={project.id}
                className="table-row-clickable"
                onClick={() => onSelectProject?.(project)}
              >
                <td>
                  <div className="project-title-cell">
                    <span className="project-name-text">{project.name}</span>
                    <div className="project-sub-tags">
                      <span className="project-id-chip">{project.id}</span>
                      <span className="project-ulpin-chip">{project.ulpin}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="location-cell">
                    <span className="location-main">
                      {project.district}, {project.state}
                    </span>
                    <span className="agency-badge">{project.pia}</span>
                  </div>
                </td>
                <td>
                  <span className="stage-cell-pill">{project.stage}</span>
                </td>
                <td>
                  <div className="sla-cell">
                    <span
                      className={`sla-number ${
                        isUrgentSla ? 'urgent' : isMediumSla ? 'warning' : 'safe'
                      }`}
                    >
                      {project.slaDaysLeft} days left
                    </span>
                    <span className="sla-sub">Statutory SLA</span>
                  </div>
                </td>
                <td>
                  <div className="comp-cell">
                    <div className="comp-meter-track">
                      <div
                        className="comp-meter-fill"
                        style={{ width: `${Math.min(100, compPercent)}%` }}
                      />
                    </div>
                    <div className="comp-labels">
                      <span className="comp-paid">₹{project.compensationPaid.toFixed(1)}Cr</span>
                      <span className="comp-total">/ ₹{project.compensationDue.toFixed(1)}Cr</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="possession-cell">
                    <div className="possession-meter-track">
                      <div
                        className="possession-meter-fill"
                        style={{ width: `${project.possession}%` }}
                      />
                    </div>
                    <span className="possession-text">{project.possession}%</span>
                  </div>
                </td>
                <td>
                  <span className={`risk-tag ${project.risk.toLowerCase()}`}>
                    {project.risk === 'High' ? (
                      <ShieldAlert size={12} />
                    ) : project.risk === 'Medium' ? (
                      <AlertTriangle size={12} />
                    ) : (
                      <ShieldCheck size={12} />
                    )}
                    <span>{project.risk}</span>
                  </span>
                </td>
                <td className="action-td">
                  <span className="row-action-icon" title="View details">
                    <ChevronRight size={15} />
                  </span>
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    </div>
  );
}
