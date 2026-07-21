import time
import math
from collections import defaultdict, deque
from typing import Dict, List, Tuple

class PacketEngine:
    def __init__(self, window_seconds: float = 2.0):
        self.window_seconds = window_seconds
        self.packets = deque() # Stores (timestamp, src_ip, dst_ip, size_bytes, protocol, flags)
        self.total_scanned = 0

    def ingest_packet(self, src_ip: str, dst_ip: str, size_bytes: int, protocol: str, flags: str = ""):
        """Ingest a single network packet into sliding window telemetry."""
        now = time.time()
        self.packets.append((now, src_ip, dst_ip, size_bytes, protocol, flags))
        self.total_scanned += 1
        self._prune_old_packets(now)

    def _prune_old_packets(self, now: float):
        cutoff = now - self.window_seconds
        while self.packets and self.packets[0][0] < cutoff:
            self.packets.popleft()

    def extract_features(self) -> dict:
        """Extract features over sliding window for ML & Heuristic analysis."""
        now = time.time()
        self._prune_old_packets(now)

        packet_count = len(self.packets)
        if packet_count == 0:
            return {
                'pps': 0,
                'bps': 0,
                'syn_count': 0,
                'syn_ratio': 0.0,
                'udp_ratio': 0.0,
                'icmp_ratio': 0.0,
                'entropy': 4.0,
                'total_scanned': self.total_scanned,
                'protocol_breakdown': {'tcp': 60, 'udp': 30, 'icmp': 7, 'other': 3},
                'top_src_ip': '0.0.0.0',
            }

        duration = max(0.1, self.window_seconds)
        pps = int(packet_count / duration)
        total_bytes = sum(p[3] for p in self.packets)
        bps = int((total_bytes * 8) / duration)

        ip_counts = defaultdict(int)
        protocol_counts = defaultdict(int)
        syn_count = 0

        for p in self.packets:
            src_ip = p[1]
            proto = p[4].upper()
            flags = p[5].upper()

            ip_counts[src_ip] += 1
            protocol_counts[proto] += 1
            if 'S' in flags or 'SYN' in flags:
                syn_count += 1

        # Entropy calculation of source IPs
        entropy = 0.0
        for count in ip_counts.values():
            p = count / packet_count
            entropy -= p * math.log2(p)

        syn_ratio = syn_count / packet_count
        udp_ratio = protocol_counts.get('UDP', 0) / packet_count
        icmp_ratio = protocol_counts.get('ICMP', 0) / packet_count
        tcp_ratio = protocol_counts.get('TCP', 0) / packet_count
        other_ratio = max(0.0, 1.0 - (tcp_ratio + udp_ratio + icmp_ratio))

        top_src_ip = max(ip_counts.items(), key=lambda x: x[1])[0] if ip_counts else '0.0.0.0'

        return {
            'pps': pps,
            'bps': bps,
            'syn_count': syn_count,
            'syn_ratio': syn_ratio,
            'udp_ratio': udp_ratio,
            'icmp_ratio': icmp_ratio,
            'entropy': entropy,
            'total_scanned': self.total_scanned,
            'protocol_breakdown': {
                'tcp': round(tcp_ratio * 100, 1),
                'udp': round(udp_ratio * 100, 1),
                'icmp': round(icmp_ratio * 100, 1),
                'other': round(other_ratio * 100, 1),
            },
            'top_src_ip': top_src_ip,
        }
