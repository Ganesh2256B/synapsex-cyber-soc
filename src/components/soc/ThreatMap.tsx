import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ThreatAlert } from '../../types';

interface ThreatMapProps {
  threats: ThreatAlert[];
}

export const ThreatMap: React.FC<ThreatMapProps> = ({ threats }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [autoSpin, setAutoSpin] = useState<boolean>(true);
  const autoSpinRef = useRef<boolean>(true);
  autoSpinRef.current = autoSpin;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const arcsGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Helper: Convert Lat/Lng to 3D Sphere Coordinates
  const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // Generate Photorealistic 3D Earth Surface Texture Canvas
  const createEarthTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Deep Ocean Dark Blue/Black Base
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    oceanGrad.addColorStop(0, '#02050f');
    oceanGrad.addColorStop(0.5, '#050b18');
    oceanGrad.addColorStop(1, '#02050f');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Latitude/Longitude Tech Grid Lines
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 128) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Render Continent Outlines & High-Tech Glowing Landmasses
    ctx.fillStyle = '#0a1d33';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;

    const landPolygons: [number, number][][] = [
      // North America
      [[60, -130], [65, -160], [70, -100], [50, -60], [25, -80], [15, -90], [20, -105], [35, -120], [60, -130]],
      // South America
      [[12, -75], [-5, -35], [-35, -50], [-55, -70], [-20, -80], [12, -75]],
      // Europe
      [[70, 10], [60, 30], [45, 40], [36, 30], [36, -10], [50, -10], [70, 10]],
      // Africa
      [[35, -10], [32, 32], [10, 50], [-35, 20], [-34, 18], [5, -10], [35, -10]],
      // Asia
      [[75, 60], [75, 170], [60, 170], [40, 145], [10, 105], [20, 75], [30, 50], [55, 55], [75, 60]],
      // Australia
      [[-12, 130], [-15, 150], [-38, 145], [-35, 115], [-12, 130]],
    ];

    landPolygons.forEach((poly) => {
      ctx.beginPath();
      poly.forEach(([lat, lng], i) => {
        const x = ((lng + 180) / 360) * canvas.width;
        const y = ((90 - lat) / 180) * canvas.height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Add Glowing Neural City Dots
      for (let k = 0; k < 12; k++) {
        const p1 = poly[k % poly.length];
        const p2 = poly[(k + 1) % poly.length];
        const cx = (( (p1[1] + p2[1]) / 2 + 180) / 360) * canvas.width;
        const cy = ((90 - (p1[0] + p2[0]) / 2) / 180) * canvas.height;
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Initialize Three.js 3D Scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f3ff, 2.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xff0055, 1.5);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    // 4. Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 5. Main 3D Earth Mesh (Radius = 2.5)
    const earthRadius = 2.5;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTex = createEarthTexture();

    const earthMat = new THREE.MeshPhongMaterial({
      map: earthTex,
      shininess: 25,
      specular: new THREE.Color(0x00f3ff),
      emissive: new THREE.Color(0x020a15),
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // 6. Outer 3D Atmosphere Glow Shell
    const atmosGeo = new THREE.SphereGeometry(earthRadius * 1.06, 64, 64);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 7. Arcs Group
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);
    arcsGroupRef.current = arcsGroup;

    // 8. Interactive Mouse Orbit Rotation Setup
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !globeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroupRef.current.rotation.y += deltaX * 0.005;
      globeGroupRef.current.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 9. Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoSpinRef.current && globeGroupRef.current && !isDragging) {
        globeGroupRef.current.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update 3D Attack Arcs & Markers dynamically when threats update
  useEffect(() => {
    if (!arcsGroupRef.current) return;

    // Clear previous arcs
    while (arcsGroupRef.current.children.length > 0) {
      const child = arcsGroupRef.current.children[0];
      arcsGroupRef.current.remove(child);
    }

    const earthRadius = 2.5;
    const targetLat = 37.77; // San Francisco SOC Node
    const targetLng = -122.41;
    const targetVec = latLngToVector3(targetLat, targetLng, earthRadius);

    // Add 3D Target Node Marker (Glowing Cyan Ring)
    const targetGeo = new THREE.RingGeometry(0.08, 0.12, 32);
    const targetMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      side: THREE.DoubleSide,
    });
    const targetMesh = new THREE.Mesh(targetGeo, targetMat);
    targetMesh.position.copy(targetVec.clone().multiplyScalar(1.01));
    targetMesh.lookAt(targetVec.clone().multiplyScalar(2));
    arcsGroupRef.current.add(targetMesh);

    // Add 3D Attack Arcs
    threats.slice(0, 12).forEach((threat) => {
      const srcVec = latLngToVector3(threat.lat, threat.lng, earthRadius);

      // Mid-point elevated vector for curved 3D trajectory
      const midVec = srcVec.clone().add(targetVec).multiplyScalar(0.5);
      const distance = srcVec.distanceTo(targetVec);
      midVec.setLength(earthRadius + distance * 0.35);

      // Create 3D Bezier Curve
      const curve = new THREE.QuadraticBezierCurve3(srcVec, midVec, targetVec);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const colorHex = threat.severity === 'CRITICAL' ? 0xff0055 : threat.severity === 'HIGH' ? 0xffaa00 : 0x00f3ff;
      const curveMat = new THREE.LineBasicMaterial({
        color: colorHex,
        linewidth: 2,
        transparent: true,
        opacity: 0.85,
      });

      const line = new THREE.Line(curveGeo, curveMat);
      arcsGroupRef.current?.add(line);

      // Attacker Origin 3D Marker
      const srcGeo = new THREE.SphereGeometry(0.04, 16, 16);
      const srcMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const srcMesh = new THREE.Mesh(srcGeo, srcMat);
      srcMesh.position.copy(srcVec.clone().multiplyScalar(1.01));
      arcsGroupRef.current?.add(srcMesh);
    });
  }, [threats]);

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-5 flex flex-col gap-3 font-mono relative overflow-hidden h-full min-h-[340px] select-none">
      {/* Header Controls */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <i className="bi bi-globe-central-south-asia text-cyber-cyan text-[18px] animate-pulse"></i>
          <h3 className="text-[14px] font-bold tracking-wider uppercase text-white flex items-center gap-2">
            Real Photorealistic 3D Earth Globe
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
              WebGL 3D Engine
            </span>
          </h3>
        </div>

        <button
          onClick={() => setAutoSpin(!autoSpin)}
          className={`px-3 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
            autoSpin
              ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/40'
              : 'bg-white/10 text-white/70 border-white/20'
          }`}
        >
          {autoSpin ? 'Pause Orbit' : 'Auto Orbit'}
        </button>
      </div>

      {/* WebGL 3D Canvas Container */}
      <div
        ref={mountRef}
        className="relative w-full h-[270px] flex-1 bg-black/90 rounded-lg overflow-hidden border border-white/10 cursor-grab active:cursor-grabbing flex items-center justify-center"
      >
        {/* Interaction Drag Guide */}
        <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2 text-[10px] text-white/50 bg-black/80 px-2.5 py-1 rounded border border-white/10 pointer-events-none">
          <i className="bi bi-arrows-move text-cyber-cyan"></i>
          <span>Click & Drag to rotate Real 3D Earth</span>
        </div>
      </div>
    </div>
  );
};
