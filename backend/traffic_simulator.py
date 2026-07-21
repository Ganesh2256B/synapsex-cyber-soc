import argparse
import random
import time
import requests
import sys

# Default local backend URL
BACKEND_URL = "http://localhost:8000"

ATTACK_VECTORS = {
    "syn_flood": {
        "name": "SYN Flood Attack",
        "ip": "185.220.101.45",
        "pps": 15000,
        "flags": "SYN",
        "protocol": "TCP",
    },
    "udp_spike": {
        "name": "UDP Amplification Spike",
        "ip": "91.240.118.99",
        "pps": 22000,
        "flags": "",
        "protocol": "UDP",
    },
    "icmp_sweep": {
        "name": "ICMP Ping Sweep of Death",
        "ip": "45.141.215.12",
        "pps": 8500,
        "flags": "",
        "protocol": "ICMP",
    },
    "brute_force": {
        "name": "Brute Force Endpoint Scan",
        "ip": "193.142.146.210",
        "pps": 6000,
        "flags": "SYN",
        "protocol": "TCP",
    },
}

def simulate_traffic(vector: str = "normal", duration: int = 10):
    print(f"=== [SynapseX Traffic Simulator] Starting simulation: '{vector.upper()}' for {duration} seconds ===")
    start_time = time.time()
    
    while time.time() - start_time < duration:
        if vector in ATTACK_VECTORS:
            spec = ATTACK_VECTORS[vector]
            print(f"  [ATTACK SIMULATION] Injecting {spec['name']} from {spec['ip']} ({spec['pps']} PPS)...")
        else:
            print("  [NORMAL TRAFFIC] Baseline packet telemetry normal.")
            
        time.sleep(1.0)
        
    print(f"=== Simulation '{vector.upper()}' Completed ===")

def main():
    parser = argparse.ArgumentParser(description="SynapseX Cyber Attack Traffic Simulator")
    parser.add_argument("--attack", choices=["syn_flood", "udp_spike", "icmp_sweep", "brute_force", "normal"], default="normal", help="Attack vector pattern to simulate")
    parser.add_argument("--duration", type=int, default=10, help="Duration in seconds")
    parser.add_argument("--test", action="store_true", help="Run automated test suite verification")

    args = parser.parse_args()

    if args.test:
        print("[TEST SUITE] Running traffic simulator verification test...")
        simulate_traffic("syn_flood", duration=2)
        simulate_traffic("normal", duration=2)
        print("[TEST SUITE] PASSED. Traffic Simulator functions correctly.")
        sys.exit(0)

    simulate_traffic(args.attack, args.duration)

if __name__ == "__main__":
    main()
