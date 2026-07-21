import React, { useState } from 'react';
import { FirewallRule, SocConfig } from '../../types';

interface DefensePanelProps {
  firewallRules: FirewallRule[];
  config: SocConfig;
  onUpdateConfig: (newConfig: SocConfig) => void;
  onBlockIp: (ip: string) => void;
  onUnblockIp: (ip: string) => void;
}

export const DefensePanel: React.FC<DefensePanelProps> = ({
  firewallRules,
  config,
  onUpdateConfig,
  onBlockIp,
  onUnblockIp,
}) => {
  const [manualIp, setManualIp] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualIp.trim()) return;
    onBlockIp(manualIp.trim());
    setManualIp('');
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 flex flex-col gap-4 font-mono">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <i className="bi bi-cpu-fill text-cyber-cyan text-[16px]"></i>
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-white">
            Automated Active Defense & Firewall Engine
          </h3>
        </div>

        {/* Toggle & Sensitivity Slider */}
        <div className="flex items-center gap-6 bg-white/[0.03] px-3.5 py-2 rounded-lg border border-white/10">
          {/* Auto Block Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-white/70">Auto-Mitigation:</span>
            <button
              onClick={() =>
                onUpdateConfig({ ...config, autoBlockEnabled: !config.autoBlockEnabled })
              }
              className={`w-11 h-6 rounded-full transition-colors flex items-center px-0.5 cursor-pointer ${
                config.autoBlockEnabled ? 'bg-cyber-cyan' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  config.autoBlockEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sensitivity Slider */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-white/70">Threshold:</span>
            <input
              type="range"
              min="20"
              max="95"
              value={config.sensitivityThreshold}
              onChange={(e) =>
                onUpdateConfig({ ...config, sensitivityThreshold: Number(e.target.value) })
              }
              className="w-20 accent-cyber-cyan cursor-pointer"
            />
            <span className="text-[12px] font-bold text-cyber-cyan">
              {config.sensitivityThreshold}
            </span>
          </div>
        </div>
      </div>

      {/* Manual IP Block Form */}
      <form onSubmit={handleManualSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter IP address to block (e.g. 192.168.1.50)..."
          value={manualIp}
          onChange={(e) => setManualIp(e.target.value)}
          className="flex-1 bg-white/[0.04] border border-white/15 rounded-lg px-3.5 py-2 text-[12px] text-white focus:outline-none focus:border-cyber-cyan placeholder-white/30"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyber-red/20 hover:bg-cyber-red/30 border border-cyber-red/40 rounded-lg text-[12px] font-bold text-cyber-red transition-colors cursor-pointer"
        >
          Enforce Firewall Rule
        </button>
      </form>

      {/* Active Rules List */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-white/50 uppercase px-1">
          <span>Active Null-Routed / Dropped IPs ({firewallRules.length})</span>
          <span>Auto-Expire Policy Active</span>
        </div>

        <div className="overflow-y-auto max-h-[180px] border border-white/10 rounded-lg divide-y divide-white/5 bg-black/40">
          {firewallRules.length === 0 ? (
            <div className="py-6 text-center text-white/40 text-[12px] italic">
              No active firewall blocks. All clear.
            </div>
          ) : (
            firewallRules.map((rule) => (
              <div
                key={rule.ip}
                className="py-2.5 px-3 flex items-center justify-between hover:bg-white/[0.02] text-[12px]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyber-red animate-ping" />
                  <span className="font-bold text-white font-mono">{rule.ip}</span>
                  <span className="text-white/40 text-[11px]">({rule.reason})</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-cyber-amber">
                    Expires in: {rule.expiresInSeconds}s
                  </span>
                  <button
                    onClick={() => onUnblockIp(rule.ip)}
                    className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-[10px] text-white/80 transition-colors cursor-pointer"
                  >
                    Unblock IP
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
