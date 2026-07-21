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

The repository is modularized into decoupled `frontend/` and `backend/` directories:

```
synapsex-soc/
├── .gitignore                   # Defines files to exclude from Git (node_modules, venv, pycache, dist)
├── README.md                    # Repository documentation and setup guide
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
│       └── components/          # Landing sections, logo, hamburger, 3D Globe, SOC panels
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

## 🐙 How to Upload This Project to GitHub

Follow these steps to initialize and push your repository to GitHub:

### Step 1: Initialize Git Repository
Open your terminal in the project root folder (`internship_project`):
```bash
git init
```

### Step 2: Add Remote GitHub URL
Create a new repository on GitHub (name it e.g. `synapsex-cyber-soc`), then link it:
```bash
git remote add origin https://github.com/YOUR_USERNAME/synapsex-cyber-soc.git
```

### Step 3: Stage and Commit Files
```bash
git add .
git commit -m "Initial commit: SynapseX Landing Page & AI Mini SOC System"
```

### Step 4: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

---

## 🚫 WHAT TO ADD vs WHAT NOT TO ADD TO GITHUB

### ✅ WHAT TO ADD (Commit these files):
- `frontend/` source folder (`src/`, `public/`, `package.json`, `vite.config.ts`, `tailwind.config.js`, `tsconfig.json`, `index.html`)
- `backend/` source folder (`app/`, `requirements.txt`, `traffic_simulator.py`)
- `.gitignore` file
- `README.md` documentation file

### ❌ WHAT NOT TO ADD (Must be ignored via `.gitignore`):
- `node_modules/` or `frontend/node_modules/` (Heavy dependency folders; installed via `npm install`)
- `__pycache__/` or `backend/app/__pycache__/` (Python compiled bytecode)
- `.venv/` or `venv/` or `env/` (Python virtual environment folders)
- `dist/` or `build/` (Production build outputs)
- `.env` or `.env.local` (Environment secret files)
- `.idea/` or `.vscode/` (IDE settings)

---

## ⚡ How to Run Frontend and Backend Separately

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

## 🛡️ License
Copyright (c) 2026 SynapseX Labs. All rights reserved.
