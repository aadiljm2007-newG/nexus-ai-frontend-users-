'use client';

import { useEffect, useRef } from 'react';

export default function CanvasMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000 };

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();

    const gridSize = 45;
    const mouseForce = 150;

    function applyPhysics(x: number, y: number) {
      let px = x;
      let py = y;
      
      const dxM = px - mouse.x;
      const dyM = py - mouse.y;
      const distM = Math.sqrt(dxM * dxM + dyM * dyM);
      
      if (distM < mouseForce) {
        const power = Math.pow((mouseForce - distM) / mouseForce, 2);
        px += dxM * power * 1.5;
        py += dyM * power * 1.5;
      }
      
      return { x: px, y: py };
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx!.lineWidth = 1;

      for (let x = 0; x <= width; x += gridSize) {
        ctx!.beginPath();
        for (let y = 0; y <= height; y += 4) {
          const pos = applyPhysics(x, y);
          if (y === 0) ctx!.moveTo(pos.x, pos.y);
          else ctx!.lineTo(pos.x, pos.y);
        }
        ctx!.stroke();
      }

      for (let y = 0; y <= height; y += gridSize) {
        ctx!.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const pos = applyPhysics(x, y);
          if (x === 0) ctx!.moveTo(pos.x, pos.y);
          else ctx!.lineTo(pos.x, pos.y);
        }
        ctx!.stroke();
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
