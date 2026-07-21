import React from 'react';
import { SystemMetrics } from '../../types';

interface HealthMetricsProps {
  metrics: SystemMetrics | null;
}

export const HealthMetrics: React.FC<HealthMetricsProps> = ({ metrics }) => {
  const scanned = metrics?.totalPacketsScanned || 1248500;
  const vectors = metrics?.activeAttackVectors || 0;
  const mitigated = metrics?.autoMitigatedCount || 0;
  const risk = metrics?.riskIndex || 12;

  const getRiskBadge = (val: number) => {
    if (val >= 75) return { label: 'ELEVATED / DANGER', color: 'text-cyber-red border-cyber-red/50 bg-cyber-red/10' };
    if (val >= 40) return { label: 'MODERATE WARN', color: 'text-cyber-amber border-cyber-amber/50 bg-cyber-amber/10' };
    return { label: 'OPTIMAL / NOMINAL', color: 'text-cyber-green border-cyber-green/50 bg-cyber-green/10' };
  };

  const riskBadge = getRiskBadge(risk);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
      {/* Total Packets */}
      <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-white/50 text-[12px]">
          <span>Packets Ingested</span>
          <i className="bi bi-diagram-3 text-cyber-cyan"></i>
        </div>
        <div className="mt-3">
          <span className="text-[26px] font-bold text-white tracking-tight">
            {scanned.toLocaleString()}
          </span>
          <span className="text-[11px] text-white/40 block mt-1">Live sliding window</span>
        </div>
      </div>

      {/* Active Attack Vectors */}
      <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-white/50 text-[12px]">
          <span>Active Threat Vectors</span>
          <i className="bi bi-[#ff0055] bi-exclamation-triangle-fill"></i>
        </div>
        <div className="mt-3">
          <span className={`text-[26px] font-bold tracking-tight ${vectors > 0 ? 'text-cyber-red' : 'text-white'}`}>
            {vectors}
          </span>
          <span className="text-[11px] text-white/40 block mt-1">DoS / Anomaly clusters</span>
        </div>
      </div>

      {/* Auto-Mitigated Attacks */}
      <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-white/50 text-[12px]">
          <span>Mitigated Attacks</span>
          <i className="bi bi-shield-check text-cyber-green"></i>
        </div>
        <div className="mt-3">
          <span className="text-[26px] font-bold text-cyber-green tracking-tight">
            {mitigated}
          </span>
          <span className="text-[11px] text-white/40 block mt-1">Null-routed by active defense</span>
        </div>
      </div>

      {/* System Risk Index */}
      <div className="bg-cyber-card border border-cyber-border p-4 rounded-xl flex flex-col justify-between">
        <div className="flex items-center justify-between text-white/50 text-[12px]">
          <span>SOC System Risk Index</span>
          <i className="bi bi-speedometer2 text-cyber-amber"></i>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="text-[26px] font-bold text-white tracking-tight">
              {risk}
            </span>
            <span className="text-[12px] text-white/40">/100</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskBadge.color}`}>
            {riskBadge.label}
          </span>
        </div>
      </div>
    </div>
  );
};
