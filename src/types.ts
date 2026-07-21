export interface SystemMetrics {
  timestamp: string;
  bandwidthMbps: number;
  packetsPerSecond: number;
  totalPacketsScanned: number;
  riskIndex: number;
  activeAttackVectors: number;
  autoMitigatedCount: number;
  protocolBreakdown: {
    tcp: number;
    udp: number;
    icmp: number;
    other: number;
  };
}

export interface ThreatAlert {
  id: string;
  timestamp: string;
  sourceIP: string;
  targetIP: string;
  country: string;
  countryCode: string;
  city: string;
  lat: number;
  lng: number;
  vector: 'SYN Flood' | 'UDP Amplification' | 'ICMP Ping Death' | 'Brute Force Scan' | 'Anomaly Spike';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  threatScore: number;
  actionStatus: 'AUTO-BLOCKED' | 'FLAGGED' | 'MONITORED' | 'DROPPED';
  pps: number;
  bps: number;
}

export interface FirewallRule {
  ip: string;
  country: string;
  reason: string;
  blockedAt: string;
  expiresInSeconds: number;
  autoBlocked: boolean;
}

export interface SocConfig {
  autoBlockEnabled: boolean;
  sensitivityThreshold: number; // 0 to 100
}
