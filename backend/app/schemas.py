from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class ProtocolBreakdown(BaseModel):
    tcp: float
    udp: float
    icmp: float
    other: float

class SystemMetricsSchema(BaseModel):
    timestamp: str
    bandwidthMbps: float
    packetsPerSecond: int
    totalPacketsScanned: int
    riskIndex: int
    activeAttackVectors: int
    autoMitigatedCount: int
    protocolBreakdown: ProtocolBreakdown

class ThreatAlertSchema(BaseModel):
    id: str
    timestamp: str
    sourceIP: str
    targetIP: str
    country: str
    countryCode: str
    city: str
    lat: float
    lng: float
    vector: str
    severity: str
    threatScore: int
    actionStatus: str
    pps: int
    bps: int

class FirewallRuleSchema(BaseModel):
    ip: str
    country: str
    reason: str
    blockedAt: str
    expiresInSeconds: int
    autoBlocked: bool

class BlockRequestSchema(BaseModel):
    ip: str
    reason: Optional[str] = "Manual Administrator Action"
    durationSeconds: Optional[int] = 300
