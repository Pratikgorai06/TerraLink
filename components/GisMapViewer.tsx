'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Compass,
  Layers,
  MapPin,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info
} from 'lucide-react';
import { Project, GisParcel } from '@/types';

interface GisMapViewerProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface CadastralPolygon {
  id: string;
  projectId: string;
  projectName: string;
  ulpin: string;
  surveyNo: string;
  ownerName: string;
  areaHa: number;
  status: GisParcel['status'];
  points: string;
  centroid: { x: number; y: number };
}

const polygons: CadastralPolygon[] = [
  {
    id: 'poly-1',
    projectId: 'TL-001',
    projectName: 'Delhi–Mumbai Expressway P-IV',
    ulpin: 'RJ-ALW-4F8A2-01',
    surveyNo: '142/1',
    ownerName: 'Om Prakash Yadav',
    areaHa: 1.84,
    status: 'Acquired',
    points: '120,90 220,110 210,190 110,170',
    centroid: { x: 165, y: 140 }
  },
  {
    id: 'poly-2',
    projectId: 'TL-001',
    projectName: 'Delhi–Mumbai Expressway P-IV',
    ulpin: 'RJ-ALW-4F8A2-02',
    surveyNo: '142/2',
    ownerName: 'Ramlal Gujjar',
    areaHa: 2.30,
    status: 'In Progress',
    points: '220,110 330,130 310,210 210,190',
    centroid: { x: 265, y: 160 }
  },
  {
    id: 'poly-3',
    projectId: 'TL-001',
    projectName: 'Delhi–Mumbai Expressway P-IV',
    ulpin: 'RJ-ALW-4F8A2-03',
    surveyNo: '143',
    ownerName: 'Kailash Chand',
    areaHa: 3.12,
    status: 'Disputed',
    points: '330,130 440,120 420,220 310,210',
    centroid: { x: 375, y: 170 }
  },
  {
    id: 'poly-4',
    projectId: 'TL-002',
    projectName: 'Eastern DFC Link',
    ulpin: 'UP-PYG-19AC7-01',
    surveyNo: '88/1',
    ownerName: 'Brijesh Tripathi',
    areaHa: 1.45,
    status: 'Acquired',
    points: '470,200 580,210 560,290 460,280',
    centroid: { x: 515, y: 245 }
  },
  {
    id: 'poly-5',
    projectId: 'TL-002',
    projectName: 'Eastern DFC Link',
    ulpin: 'UP-PYG-19AC7-02',
    surveyNo: '89',
    ownerName: 'Shyam Sundar',
    areaHa: 2.10,
    status: 'Acquired',
    points: '580,210 680,225 660,310 560,290',
    centroid: { x: 620, y: 260 }
  },
  {
    id: 'poly-6',
    projectId: 'TL-004',
    projectName: 'North–South Freight Link',
    ulpin: 'MP-DHR-22DE1-01',
    surveyNo: '312',
    ownerName: 'Devendra Patel',
    areaHa: 3.20,
    status: 'In Progress',
    points: '260,260 380,270 360,360 240,340',
    centroid: { x: 310, y: 310 }
  },
  {
    id: 'poly-7',
    projectId: 'TL-006',
    projectName: 'Coastal Economic Corridor',
    ulpin: 'OD-KHD-81F2B-01',
    surveyNo: '201',
    ownerName: 'Pratap Rout',
    areaHa: 4.10,
    status: 'Disputed',
    points: '670,120 780,140 760,230 650,210',
    centroid: { x: 715, y: 175 }
  },
  {
    id: 'poly-8',
    projectId: 'TL-003',
    projectName: 'Bengaluru–Chennai Corridor',
    ulpin: 'KA-KLR-7BC91-01',
    surveyNo: '23',
    ownerName: 'Venkatesh Murthy',
    areaHa: 2.65,
    status: 'Pending Notification',
    points: '480,330 600,340 580,420 460,400',
    centroid: { x: 530, y: 370 }
  }
];

export default function GisMapViewer({ projects, onSelectProject }: GisMapViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [activePolygon, setActivePolygon] = useState<CadastralPolygon | null>(null);
  const [selectedState, setSelectedState] = useState<string>('All');
  const [showRow, setShowRow] = useState(true);
  const [showDisputedOnly, setShowDisputedOnly] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const states = ['All', 'Rajasthan', 'Uttar Pradesh', 'Karnataka', 'Madhya Pradesh', 'Maharashtra', 'Odisha'];

  const filteredPolygons = polygons.filter((p) => {
    if (showDisputedOnly && p.status !== 'Disputed') return false;
    if (selectedState !== 'All') {
      const matchProj = projects.find((proj) => proj.id === p.projectId);
      if (matchProj && matchProj.state !== selectedState) return false;
    }
    return true;
  });

  const handlePolygonClick = (poly: CadastralPolygon) => {
    setActivePolygon(poly);
    const matched = projects.find((p) => p.id === poly.projectId);
    if (matched) {
      onSelectProject(matched);
    }
  };

  return (
    <div className={`gis-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="gis-topbar">
        <div className="gis-title-group">
          <Image
            src="/logo.png"
            alt="TerraLink"
            width={39}
            height={26}
            style={{ height: 26, width: 'auto' }}
          />
          <span className="gis-live-dot" />
          <h3 className="gis-heading">Live Cadastral GIS & ULPIN Map</h3>
          <span className="gis-crs-tag">EPSG:4326 · WGS84</span>
        </div>

        <div className="gis-controls">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="gis-select"
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All States' : st}
              </option>
            ))}
          </select>

          <div className="layer-toggle-btn-group">
            <button
              type="button"
              className={`layer-toggle-btn ${showRow ? 'active' : ''}`}
              onClick={() => setShowRow(!showRow)}
              title="Toggle Infrastructure Right of Way alignment"
            >
              <Layers size={13} />
              <span>RoW Buffer</span>
            </button>
            <button
              type="button"
              className={`layer-toggle-btn ${showDisputedOnly ? 'active' : ''}`}
              onClick={() => setShowDisputedOnly(!showDisputedOnly)}
              title="Filter to Disputed parcels"
            >
              <MapPin size={13} />
              <span>Disputed Only</span>
            </button>
          </div>

          <div className="zoom-controls">
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoom((z) => Math.min(1.8, Number((z + 0.15).toFixed(2))))}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <span className="zoom-level">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setZoom(1)}
              title="Reset View"
            >
              <RotateCcw size={13} />
            </button>
            <button
              type="button"
              className="zoom-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      <div className="gis-canvas-wrapper">
        <svg
          className="gis-svg"
          viewBox="0 0 900 480"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          <defs>
            <pattern id="gis-grid-pattern" width="45" height="45" patternUnits="userSpaceOnUse">
              <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
            <linearGradient id="row-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width="900" height="480" fill="url(#gis-grid-pattern)" />

          {/* Topographic Waterway */}
          <path
            d="M -20,240 Q 220,190 420,270 T 920,210"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            d="M -20,240 Q 220,190 420,270 T 920,210"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.6"
          />

          {/* Infrastructure Alignment (Right of Way) */}
          {showRow && (
            <g className="row-alignment">
              <path
                d="M 50,130 C 280,180 520,240 850,210"
                fill="none"
                stroke="url(#row-gradient)"
                strokeWidth="50"
                strokeLinecap="round"
              />
              <path
                d="M 50,130 C 280,180 520,240 850,210"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.8"
              />
            </g>
          )}

          {/* Cadastral Parcels */}
          {filteredPolygons.map((poly) => {
            const isHovered = activePolygon?.id === poly.id;
            let fill = 'rgba(16, 185, 129, 0.18)'; // Acquired - emerald
            let stroke = '#10b981';

            if (poly.status === 'In Progress') {
              fill = 'rgba(14, 165, 233, 0.2)';
              stroke = '#0ea5e9';
            } else if (poly.status === 'Disputed') {
              fill = 'rgba(244, 63, 94, 0.25)';
              stroke = '#f43f5e';
            } else if (poly.status === 'Pending Notification') {
              fill = 'rgba(245, 158, 11, 0.2)';
              stroke = '#f59e0b';
            }

            if (isHovered) {
              fill = 'rgba(37, 99, 235, 0.25)';
              stroke = '#1e40af';
            }

            return (
              <g
                key={poly.id}
                className="parcel-group"
                onClick={() => handlePolygonClick(poly)}
                onMouseEnter={() => setActivePolygon(poly)}
              >
                <polygon
                  points={poly.points}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  style={{ transition: 'all 0.15s ease', cursor: 'pointer' }}
                />
                <circle
                  cx={poly.centroid.x}
                  cy={poly.centroid.y}
                  r="3.5"
                  fill={stroke}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={poly.centroid.x}
                  y={poly.centroid.y - 8}
                  fill="#0f172a"
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                  className="parcel-map-label"
                >
                  #{poly.surveyNo}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Map Compass & Scale Info */}
        <div className="gis-overlay-compass">
          <Compass size={18} className="compass-icon" />
          <span>N</span>
        </div>

        <div className="gis-overlay-scale">
          <div className="scale-bar" />
          <span>500 m</span>
        </div>

        {/* Parcel Inspection Tooltip / Card */}
        {activePolygon && (
          <div className="gis-parcel-tooltip">
            <div className="tooltip-header">
              <span className={`status-pill ${activePolygon.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {activePolygon.status}
              </span>
              <span className="tooltip-id">{activePolygon.projectId}</span>
            </div>
            <h4 className="tooltip-title">Khasra #{activePolygon.surveyNo}</h4>
            <div className="tooltip-detail">
              <span className="detail-label">Owner:</span>
              <span className="detail-val">{activePolygon.ownerName}</span>
            </div>
            <div className="tooltip-detail">
              <span className="detail-label">Area:</span>
              <span className="detail-val">{activePolygon.areaHa} Hectares</span>
            </div>
            <div className="tooltip-detail">
              <span className="detail-label">ULPIN:</span>
              <span className="detail-val mono">{activePolygon.ulpin}</span>
            </div>
            <div className="tooltip-detail">
              <span className="detail-label">Project:</span>
              <span className="detail-val">{activePolygon.projectName}</span>
            </div>
            <div className="tooltip-tip">
              <Info size={11} /> Click to inspect complete project details
            </div>
          </div>
        )}

        {/* Clean Minimal Legend */}
        <div className="gis-legend">
          <div className="legend-item">
            <span className="legend-swatch acquired" />
            <span>Acquired (Sec 38)</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch in-progress" />
            <span>In Progress</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch disputed" />
            <span>Disputed</span>
          </div>
          <div className="legend-item">
            <span className="legend-swatch pending" />
            <span>Pending Notification</span>
          </div>
        </div>
      </div>
    </div>
  );
}
