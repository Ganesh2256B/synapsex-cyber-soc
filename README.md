# SynapseX Neural-AI Landing & AI Cyber Threat Operations Matrix (Mini SOC)

![SynapseX Header](https://img.shields.io/badge/Platform-SynapseX%20v2.4-00f3ff?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Three.js](https://img.shields.io/badge/3D%20Graphics-Three.js%20WebGL-black?style=for-the-badge)
![ML](https://img.shields.io/badge/AI%20Engine-IsolationForest%20ML-ff0055?style=for-the-badge)

A production-ready dual application featuring:
1. **SynapseX Neural-AI Interface Landing Site**: Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lenis smooth scroll, and 5 full-viewport CloudFront video backgrounds.
2. **AI-Powered Global Cyber Threat Detection & Response System (Mini SOC)**: Real-time Security Operations Center driven by a Python/FastAPI backend, IsolationForest ML anomaly scoring, GeoIP mapping, interactive **Three.js Photorealistic 3D Earth Globe**, and active firewall null-routing defense.

---

## 📁 Repository Directory Structure

```
synapsex-soc/
├── .github/                     # GitHub Actions auto-deployment workflow
│   └── workflows/
│       └── deploy.yml
├── .gitignore                   # Files excluded from version control
├── README.md                    # Project documentation
├── vercel.json                  # Optional Vercel deployment configuration
│
├── frontend/                    # Complete React + TypeScript + Vite + Tailwind + Three.js App
│   ├── package.json
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── index.css
│       ├── types.ts
│       ├── App.tsx
│       ├── main.tsx
│       └── components/          # Landing sections, logo, 3D Globe, SOC panels
│
└── backend/                     # Complete Python FastAPI + Scikit-Learn ML Backend
    ├── requirements.txt
    ├── traffic_simulator.py     # Command-line synthetic attack generator
    └── app/
        ├── main.py              # FastAPI server & WebSocket endpoint (/ws/live-feed)
        ├── schemas.py           # Pydantic data schemas
        ├── packet_engine.py     # Sliding window feature extractor
        ├── threat_detector.py   # Hybrid IsolationForest ML + Heuristics engine
        ├── geo_ip.py            # IP Geolocation resolver
        └── response_engine.py   # Active defense firewall null-routing controller
```

---

## ⚡ How to Run the Project

### 1. Run the Frontend (React + Vite + Three.js)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 2. Run the Backend (Python FastAPI ML Engine)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Inspect live REST API documentation at `http://localhost:8000/docs`.

### 3. Run the Traffic Attack Simulator
```bash
python backend/traffic_simulator.py --attack syn_flood --duration 15
python backend/traffic_simulator.py --attack udp_spike --duration 15
```

---

## 🛡️ License & Copyright
Copyright (c) 2026 SynapseX Labs. All rights reserved.
