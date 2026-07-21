import React from 'react';
import { ThreatAlert } from '../../types';

interface ThreatFeedProps {
  threats: ThreatAlert[];
  onManualBlock?: (ip: string) => void;
}

export const ThreatFeed: React.FC<ThreatFeedProps> = ({ threats, onManualBlock }) => {
  const getBadgeStyle = (severity: ThreatAlert['severity']) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-cyber-red/20 text-cyber-red border-cyber-red/40 animate-pulse';
      case 'HIGH':
        return 'bg-cyber-amber/20 text-cyber-amber border-cyber-amber/40';
      case 'MEDIUM':
        return 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/40';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const getActionBadge = (status: ThreatAlert['actionStatus']) => {
    switch (status) {
      case 'AUTO-BLOCKED':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'FLAGGED':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'DROPPED':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 flex flex-col gap-3 font-mono h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="bi bi-shield-slash-fill text-cyber-red text-[16px]"></i>
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-white">
            Active Attack & Anomaly Stream
          </h3>
        </div>
        <span className="text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          {threats.length} Events Recorded
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto max-h-[300px] border border-white/10 rounded-lg">
        <table className="w-full text-left text-[12px] border-collapse">
          <thead className="bg-white/[0.04] text-white/50 uppercase text-[11px] sticky top-0 backdrop-blur-md">
            <tr>
              <th className="py-2.5 px-3">Time</th>
              <th className="py-2.5 px-3">Source IP</th>
              <th className="py-2.5 px-3">Geo Origin</th>
              <th className="py-2.5 px-3">Vector</th>
              <th className="py-2.5 px-3">Risk Score</th>
              <th className="py-2.5 px-3">Severity</th>
              <th className="py-2.5 px-3">Action</th>
              <th className="py-2.5 px-3 text-right">Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {threats.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-white/40 italic">
                  Monitoring clean traffic. No anomalies detected.
                </td>
              </tr>
            ) : (
              threats.map((threat) => (
                <tr key={threat.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-2 px-3 text-white/50 text-[11px]">
                    {threat.timestamp.split('T')[1]?.substring(0, 8) || threat.timestamp}
                  </td>
                  <td className="py-2 px-3 font-semibold text-white font-mono">
                    {threat.sourceIP}
                  </td>
                  <td className="py-2 px-3 text-white/70">
                    <span className="inline-block mr-1">{threat.countryCode}</span>
                    <span className="text-[11px] text-white/40">({threat.city})</span>
                  </td>
                  <td className="py-2 px-3 text-cyber-cyan">
                    {threat.vector}
                  </td>
                  <td className="py-2 px-3 font-bold">
                    <span
                      className={
                        threat.threatScore >= 80
                          ? 'text-cyber-red'
                          : threat.threatScore >= 50
                          ? 'text-cyber-amber'
                          : 'text-cyber-green'
                      }
                    >
                      {threat.threatScore}/100
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getBadgeStyle(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getActionBadge(threat.actionStatus)}`}>
                      {threat.actionStatus}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right">
                    {onManualBlock && threat.actionStatus !== 'AUTO-BLOCKED' && (
                      <button
                        onClick={() => onManualBlock(threat.sourceIP)}
                        className="px-2 py-1 bg-cyber-red/20 hover:bg-cyber-red/40 border border-cyber-red/40 rounded text-[10px] text-cyber-red font-bold transition-colors cursor-pointer"
                      >
                        Block IP
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
