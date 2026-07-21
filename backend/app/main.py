import asyncio
import json
import random
import time
from datetime import datetime
from typing import List

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .packet_engine import PacketEngine
from .threat_detector import ThreatDetectorEngine
from .geo_ip import resolve_ip
from .response_engine import ResponseEngine
from .schemas import (
    SystemMetricsSchema,
    ThreatAlertSchema,
    FirewallRuleSchema,
    BlockRequestSchema,
)

app = FastAPI(
    title="SynapseX Cyber Threat Detection & Automated Response System",
    version="2.4.0",
    description="AI-Powered Real-Time Neural Packet Analysis & Automated Defense Operations Center API",
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Engine Instances
packet_engine = PacketEngine(window_seconds=2.0)
threat_detector = ThreatDetectorEngine()
response_engine = ResponseEngine()

# In-memory storage for threats log
historical_threats: List[dict] = []
active_websockets: List[WebSocket] = []

# Background Packet Generator to feed baseline traffic when no live scapy interface is bound
async def background_telemetry_loop():
    sample_ips = [
        "185.220.101.5", "91.240.118.99", "45.141.215.12",
        "193.142.146.210", "162.247.74.200", "8.8.8.8", "1.1.1.1"
    ]
    protocols = ["TCP", "UDP", "ICMP", "HTTP"]
    flags_list = ["SYN", "ACK", "FIN", "RST", "PSH", ""]

    while True:
        # Ingest batch of synthetic normal traffic
        for _ in range(random.randint(50, 150)):
            src = random.choice(sample_ips)
            dst = "10.0.4.1"
            size = random.randint(64, 1500)
            proto = random.choice(protocols)
            flg = random.choice(flags_list)
            packet_engine.ingest_packet(src, dst, size, proto, flg)

        # Extract telemetry features
        features = packet_engine.extract_features()
        score, vector, severity, ml_decision = threat_detector.analyze_window(features)

        now_str = datetime.utcnow().isoformat() + "Z"

        metrics_payload = {
            "timestamp": now_str,
            "bandwidthMbps": round(features['bps'] / 1_000_000, 2),
            "packetsPerSecond": features['pps'],
            "totalPacketsScanned": features['total_scanned'],
            "riskIndex": score,
            "activeAttackVectors": len([t for t in historical_threats[-10:] if t['severity'] == 'CRITICAL']),
            "autoMitigatedCount": len(response_engine.blocked_ips),
            "protocolBreakdown": features['protocol_breakdown'],
        }

        # Broadcast telemetry over WebSockets
        ws_message = json.dumps({"type": "telemetry", "metrics": metrics_payload})
        disconnected = []
        for ws in active_websockets:
            try:
                await ws.send_text(ws_message)
            except Exception:
                disconnected.append(ws)
        for ws in disconnected:
            if ws in active_websockets:
                active_websockets.remove(ws)

        await asyncio.sleep(1.0)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(background_telemetry_loop())

@app.get("/")
def read_root():
    return {
        "system": "SynapseX Cyber Threat Matrix API",
        "status": "OPERATIONAL",
        "engine": "IsolationForest ML + Heuristics",
        "version": "2.4.0",
    }

@app.get("/api/v1/metrics", response_model=SystemMetricsSchema)
def get_metrics():
    features = packet_engine.extract_features()
    score, vector, severity, _ = threat_detector.analyze_window(features)
    now_str = datetime.utcnow().isoformat() + "Z"
    return {
        "timestamp": now_str,
        "bandwidthMbps": round(features['bps'] / 1_000_000, 2),
        "packetsPerSecond": features['pps'],
        "totalPacketsScanned": features['total_scanned'],
        "riskIndex": score,
        "activeAttackVectors": len([t for t in historical_threats[-10:] if t['severity'] == 'CRITICAL']),
        "autoMitigatedCount": len(response_engine.blocked_ips),
        "protocolBreakdown": features['protocol_breakdown'],
    }

@app.get("/api/v1/threats", response_model=List[ThreatAlertSchema])
def get_threats():
    return historical_threats[-50:]

@app.get("/api/v1/blocklist", response_model=List[FirewallRuleSchema])
def get_blocklist():
    return response_engine.get_active_rules()

@app.post("/api/v1/blocklist")
def add_block_rule(req: BlockRequestSchema):
    rule = response_engine.block_ip(
        ip=req.ip,
        reason=req.reason,
        duration_seconds=req.durationSeconds or 300,
        auto_blocked=False,
    )
    return {"status": "SUCCESS", "rule": rule}

@app.delete("/api/v1/blocklist/{ip}")
def remove_block_rule(ip: str):
    success = response_engine.unblock_ip(ip)
    if not success:
        raise HTTPException(status_code=404, detail="IP not found in active blocklist")
    return {"status": "SUCCESS", "message": f"Unblocked {ip}"}

@app.websocket("/ws/live-feed")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_websockets.append(websocket)
    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        if websocket in active_websockets:
            active_websockets.remove(websocket)
