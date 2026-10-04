"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface FloatingSpiceCanvasProps {
  className?: string;
  intensity?: number;
}

export function FloatingSpiceCanvas({
  className = "",
  intensity = 1,
}: FloatingSpiceCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle geometry - Organic spice flecks & golden turmeric dust
    const particleCount = Math.floor(140 * intensity);
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Palette: Gold turmeric (#D4AF37), Warm Cinnamon (#A95328), Tellicherry Black Pepper (#332822), Cardamom Green (#7D8B58)
    const palette = [
      new THREE.Color("#C27838"), // Warm saffron/turmeric
      new THREE.Color("#9E3C1B"), // Kashmiri chili
      new THREE.Color("#4A3B32"), // Clove / black pepper
      new THREE.Color("#6A784B"), // Cardamom
      new THREE.Color("#E2B870"), // Golden spice dust
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 32;
      positions[i3 + 1] = (Math.random() - 0.5) * 24;
      positions[i3 + 2] = (Math.random() - 0.5) * 16;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 2.8 + 1.2;

      velocities[i3] = (Math.random() - 0.5) * 0.004;
      velocities[i3 + 1] = Math.random() * 0.006 + 0.002; // gentle upward thermal drift
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Custom circle shader material for soft circular spice dust
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (26.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, dist) * 0.55;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse tracking with soft damping
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth mouse parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      scene.rotation.y = currentMouseX * 0.15;
      scene.rotation.x = -currentMouseY * 0.12;

      // Update particle positions
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += velocities[i3 + 1];
        pos[i3] += Math.sin(pos[i3 + 1] * 0.6) * 0.003;

        // Reset if reached ceiling
        if (pos[i3 + 1] > 12) {
          pos[i3 + 1] = -12;
          pos[i3] = (Math.random() - 0.5) * 32;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [intensity]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}
    />
  );
}
