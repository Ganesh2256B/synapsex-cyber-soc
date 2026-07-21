import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
import uuid
from datetime import datetime
from typing import Tuple, Dict

class ThreatDetectorEngine:
    def __init__(self):
        # Initialize IsolationForest model with contamination rate
        self.model = IsolationForest(n_estimators=100, contamination=0.08, random_state=42)
        self._train_baseline_model()

    def _train_baseline_model(self):
        """Train IsolationForest on synthetic normal network telemetry baseline."""
        np.random.seed(42)
        # Features: [pps, bps, syn_ratio, udp_ratio, icmp_ratio, unique_ip_entropy]
        normal_samples = []
        for _ in range(500):
            pps = np.random.normal(2000, 300)
            bps = pps * 1200 * 8
            syn_ratio = np.random.uniform(0.05, 0.20)
            udp_ratio = np.random.uniform(0.10, 0.35)
            icmp_ratio = np.random.uniform(0.01, 0.08)
            entropy = np.random.uniform(3.5, 4.8)
            normal_samples.append([pps, bps, syn_ratio, udp_ratio, icmp_ratio, entropy])

        df_train = pd.DataFrame(
            normal_samples,
            columns=['pps', 'bps', 'syn_ratio', 'udp_ratio', 'icmp_ratio', 'entropy']
        )
        self.model.fit(df_train)

    def analyze_window(self, features: dict) -> Tuple[int, str, str, float]:
        """
        Analyze current telemetry window using Hybrid Heuristics + IsolationForest ML.
        Returns (threat_score 0-100, attack_vector, severity, ml_anomaly_score).
        """
        pps = features.get('pps', 0)
        bps = features.get('bps', 0)
        syn_count = features.get('syn_count', 0)
        syn_ratio = features.get('syn_ratio', 0.0)
        udp_ratio = features.get('udp_ratio', 0.0)
        icmp_ratio = features.get('icmp_ratio', 0.0)
        entropy = features.get('entropy', 4.0)

        # 1. Threshold-Based Heuristics
        heuristics_score = 0
        vector = "Anomaly Spike"

        if syn_count > 1000 or syn_ratio > 0.60:
            heuristics_score = max(heuristics_score, 95)
            vector = "SYN Flood"
        elif udp_ratio > 0.65 or (pps > 8000 and udp_ratio > 0.50):
            heuristics_score = max(heuristics_score, 88)
            vector = "UDP Amplification"
        elif icmp_ratio > 0.40:
            heuristics_score = max(heuristics_score, 82)
            vector = "ICMP Ping Death"
        elif entropy < 1.5 and pps > 4000:
            heuristics_score = max(heuristics_score, 75)
            vector = "Brute Force Scan"
        elif pps > 10000:
            heuristics_score = max(heuristics_score, 90)
            vector = "Anomaly Spike"

        # 2. Machine Learning Anomaly Detection
        sample = np.array([[pps, bps, syn_ratio, udp_ratio, icmp_ratio, entropy]])
        decision_score = self.model.decision_function(sample)[0] # lower decision score = more anomalous
        ml_is_anomaly = self.model.predict(sample)[0] == -1

        # Map decision score to 0-100 scale (decision_score typically ranges -0.5 to +0.3)
        ml_score = int(np.clip((0.2 - decision_score) * 120, 0, 100))

        # Combine Heuristics and ML Score
        final_score = max(heuristics_score, ml_score if ml_is_anomaly else ml_score // 2)

        # Classify Severity
        if final_score >= 80:
            severity = "CRITICAL"
        elif final_score >= 50:
            severity = "HIGH"
        else:
            severity = "MEDIUM"

        return final_score, vector, severity, decision_score
