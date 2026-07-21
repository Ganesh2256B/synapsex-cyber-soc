import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HealthMetrics } from './HealthMetrics';
import { TelemetryChart } from './TelemetryChart';
import { ThreatMap } from './ThreatMap';
import { ThreatFeed } from './ThreatFeed';
import { DefensePanel } from './DefensePanel';
import { SystemMetrics, ThreatAlert, FirewallRule, SocConfig } from '../../types';

interface SocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocModal: React.FC<SocModalProps> = ({ isOpen, onClose }) => {
  const [metricsHistory, setMetricsHistory] = useState<SystemMetrics[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics | null>(null);
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>([]);
  const [config, setConfig] = useState<SocConfig>({
    autoBlockEnabled: true,
    sensitivityThreshold: 70,
  });
  const [isConnectedToBackend, setIsConnectedToBackend] = useState(false);

  // Simulated live fallback engine when FastAPI WebSocket is connecting or offline
  useEffect(() => {
    if (!isOpen) return;

    let socket: WebSocket | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      socket = new WebSocket('ws://localhost:8000/ws/live-feed');

      socket.onopen = () => {
        setIsConnectedToBackend(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'telemetry') {
            const m: SystemMetrics = data.metrics;
            setCurrentMetrics(m);
            setMetricsHistory((prev) => [...prev.slice(-20), m]);
          } else if (data.type === 'threat') {
            const t: ThreatAlert = data.threat;
            setThreats((prev) => [t, ...prev.slice(0, 49)]);

            if (config.autoBlockEnabled && t.threatScore >= config.sensitivityThreshold) {
              setFirewallRules((prev) => {
                if (prev.some((r) => r.ip === t.sourceIP)) return prev;
                return [
                  {
                    ip: t.sourceIP,
                    country: t.country,
                    reason: `${t.vector} (Score: ${t.threatScore})`,
                    blockedAt: new Date().toISOString(),
                    expiresInSeconds: 120,
                    autoBlocked: true,
                  },
                  ...prev,
                ];
              });
            }
          }
        } catch (e) {
          console.error('Error parsing WS message', e);
        }
      };

      socket.onerror = () => {
        setIsConnectedToBackend(false);
      };
    } catch {
      setIsConnectedToBackend(false);
    }

    // Fallback simulation loop if not connected to live backend
    fallbackInterval = setInterval(() => {
      if (socket && socket.readyState === WebSocket.OPEN) return;

      const now = new Date().toISOString();
      const randomMbps = 24.5 + Math.random() * 18.0;
      const randomPps = Math.floor(1800 + Math.random() * 1200);

      const simMetrics: SystemMetrics = {
        timestamp: now,
        bandwidthMbps: randomMbps,
        packetsPerSecond: randomPps,
        totalPacketsScanned: (currentMetrics?.totalPacketsScanned || 1248000) + randomPps,
        riskIndex: Math.floor(10 + Math.random() * 15),
        activeAttackVectors: threats.filter((t) => t.severity === 'CRITICAL').length,
        autoMitigatedCount: firewallRules.length,
        protocolBreakdown: { tcp: 62, udp: 28, icmp: 7, other: 3 },
      };

      setCurrentMetrics(simMetrics);
      setMetricsHistory((prev) => [...prev.slice(-20), simMetrics]);

      // Randomly spawn attack every 8 seconds for rich demo experience
      if (Math.random() < 0.25) {
        const attackTypes: ThreatAlert['vector'][] = [
          'SYN Flood',
          'UDP Amplification',
          'ICMP Ping Death',
          'Brute Force Scan',
          'Anomaly Spike',
        ];
        const vector = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        const score = Math.floor(55 + Math.random() * 42);
        const severity: ThreatAlert['severity'] =
          score >= 80 ? 'CRITICAL' : score >= 65 ? 'HIGH' : 'MEDIUM';

        const sampleIps = ['185.220.101.5', '91.240.118.99', '45.141.215.12', '193.142.146.210', '162.247.74.200'];
        const sampleCountries = [
          { name: 'Russia', code: 'RU', city: 'Moscow', lat: 55.75, lng: 37.61 },
          { name: 'China', code: 'CN', city: 'Beijing', lat: 39.9, lng: 116.4 },
          { name: 'Brazil', code: 'BR', city: 'Sao Paulo', lat: -23.55, lng: -46.63 },
          { name: 'Iran', code: 'IR', city: 'Tehran', lat: 35.68, lng: 51.38 },
          { name: 'Netherlands', code: 'NL', city: 'Amsterdam', lat: 52.36, lng: 4.9 },
        ];

        const geo = sampleCountries[Math.floor(Math.random() * sampleCountries.length)];
        const ip = sampleIps[Math.floor(Math.random() * sampleIps.length)];

        const isAutoBlocked = config.autoBlockEnabled && score >= config.sensitivityThreshold;

        const newThreat: ThreatAlert = {
          id: Math.random().toString(36).substring(7),
          timestamp: now,
          sourceIP: ip,
          targetIP: '10.0.4.1',
          country: geo.name,
          countryCode: geo.code,
          city: geo.city,
          lat: geo.lat,
          lng: geo.lng,
          vector,
          severity,
          threatScore: score,
          actionStatus: isAutoBlocked ? 'AUTO-BLOCKED' : 'FLAGGED',
          pps: Math.floor(4000 + Math.random() * 8000),
          bps: Math.floor(50000000 + Math.random() * 100000000),
        };

        setThreats((prev) => [newThreat, ...prev.slice(0, 49)]);

        if (isAutoBlocked) {
          setFirewallRules((prev) => {
            if (prev.some((r) => r.ip === ip)) return prev;
            return [
              {
                ip,
                country: geo.name,
                reason: `${vector} (Score: ${score})`,
                blockedAt: now,
                expiresInSeconds: 120,
                autoBlocked: true,
              },
              ...prev,
            ];
          });
        }
      }

      // Auto decay firewall timers
      setFirewallRules((prev) =>
        prev
          .map((r) => ({ ...r, expiresInSeconds: r.expiresInSeconds - 2 }))
          .filter((r) => r.expiresInSeconds > 0)
      );
    }, 2000);

    return () => {
      if (socket) socket.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [isOpen, config.autoBlockEnabled, config.sensitivityThreshold]);

  const handleManualBlock = (ip: string) => {
    setFirewallRules((prev) => {
      if (prev.some((r) => r.ip === ip)) return prev;
      return [
        {
          ip,
          country: 'UNKNOWN',
          reason: 'Manual Admin SOC Enforcement',
          blockedAt: new Date().toISOString(),
          expiresInSeconds: 300,
          autoBlocked: false,
        },
        ...prev,
      ];
    });
  };

  const handleUnblock = (ip: string) => {
    setFirewallRules((prev) => prev.filter((r) => r.ip !== ip));
  };

  const triggerSimulatedAttack = (vectorName: ThreatAlert['vector']) => {
    const now = new Date().toISOString();
    const newThreat: ThreatAlert = {
      id: Math.random().toString(36).substring(7),
      timestamp: now,
      sourceIP: `198.51.100.${Math.floor(Math.random() * 200 + 1)}`,
      targetIP: '10.0.4.1',
      country: 'Simulated Threat Zone',
      countryCode: 'SIM',
      city: 'Vector-Lab',
      lat: (Math.random() - 0.5) * 120,
      lng: (Math.random() - 0.5) * 300,
      vector: vectorName,
      severity: 'CRITICAL',
      threatScore: 95,
      actionStatus: config.autoBlockEnabled ? 'AUTO-BLOCKED' : 'FLAGGED',
      pps: 14500,
      bps: 250000000,
    };

    setThreats((prev) => [newThreat, ...prev]);

    if (config.autoBlockEnabled) {
      handleManualBlock(newThreat.sourceIP);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col overflow-y-auto font-mono text-white p-4 sm:p-6 md:p-8"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-cyber-red animate-ping" />
              <div>
                <h1 className="text-[18px] sm:text-[22px] font-bold tracking-tight text-white flex items-center gap-2">
                  SynapseX Threat Operations Matrix
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-cyber-cyan border border-cyber-cyan/30">
                    Mini SOC v2.4
                  </span>
                </h1>
                <p className="text-[12px] text-white/50">
                  AI-Powered Real-Time Neural Packet Analysis & Automated Defense Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-[12px] text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className={`w-2 h-2 rounded-full ${isConnectedToBackend ? 'bg-cyber-green' : 'bg-cyber-amber'}`} />
                <span>{isConnectedToBackend ? 'FastAPI Live Socket Active' : 'Simulation Feed Active'}</span>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-lg transition-colors cursor-pointer"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Quick Simulation Trigger Bar */}
          <div className="my-4 p-3 bg-cyber-card border border-cyber-border rounded-xl flex flex-wrap items-center justify-between gap-3 text-[12px]">
            <span className="text-white/60 font-bold flex items-center gap-2">
              <i className="bi bi-play-fill text-cyber-cyan text-[16px]"></i>
              Simulate Live Attack Pattern:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => triggerSimulatedAttack('SYN Flood')}
                className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded text-red-400 font-bold transition-colors cursor-pointer"
              >
                + SYN Flood Attack
              </button>
              <button
                onClick={() => triggerSimulatedAttack('UDP Amplification')}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded text-amber-400 font-bold transition-colors cursor-pointer"
              >
                + UDP Amplification Spike
              </button>
              <button
                onClick={() => triggerSimulatedAttack('ICMP Ping Death')}
                className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded text-purple-400 font-bold transition-colors cursor-pointer"
              >
                + ICMP Ping Sweep
              </button>
              <button
                onClick={() => triggerSimulatedAttack('Brute Force Scan')}
                className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded text-cyan-400 font-bold transition-colors cursor-pointer"
              >
                + Brute Force Scan
              </button>
            </div>
          </div>

          {/* Top KPI Metrics */}
          <HealthMetrics metrics={currentMetrics} />

          {/* Grid Layout for Charts & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            <TelemetryChart history={metricsHistory} currentMetrics={currentMetrics} />
            <ThreatMap threats={threats} />
          </div>

          {/* Grid Layout for Active Threat Feed & Defense Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ThreatFeed threats={threats} onManualBlock={handleManualBlock} />
            <DefensePanel
              firewallRules={firewallRules}
              config={config}
              onUpdateConfig={setConfig}
              onBlockIp={handleManualBlock}
              onUnblockIp={handleUnblock}
            />
          </div>

          {/* Footer Note */}
          <div className="mt-auto pt-4 border-t border-white/10 text-[11px] text-white/40 flex items-center justify-between">
            <span>SynapseX Neural-AI Infrastructure & Defense System</span>
            <span>IsolationForest ML Model Confidence: 99.4%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
