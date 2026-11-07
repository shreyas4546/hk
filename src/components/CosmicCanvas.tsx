import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouse coordinates for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const isMobile = () => window.innerWidth < 768;

    // Dynamic star count: mobile uses 45 stars max, desktop uses up to 180
    const getStarCount = () => {
      return isMobile() ? 45 : Math.min(180, Math.floor((width * height) / 9000));
    };

    let stars: Star[] = [];

    const initStars = () => {
      const count = getStarCount();
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 2 + 0.5,
          size: Math.random() * (isMobile() ? 1.4 : 1.8) + 0.4,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initStars();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      targetMouseX = (e.clientX - width / 2) * 0.04;
      targetMouseY = (e.clientY - height / 2) * 0.04;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render cosmic stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const parallaxX = star.x - (prefersReducedMotion ? 0 : mouseX * (1 / star.z));
        const parallaxY = star.y - (prefersReducedMotion ? 0 : mouseY * (1 / star.z));

        // Wrap around viewport
        const wrappedX = ((parallaxX % width) + width) % width;
        const wrappedY = ((parallaxY % height) + height) % height;

        const currentOpacity =
          star.opacity * (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed * 50 + star.twinklePhase));

        ctx.beginPath();
        ctx.arc(wrappedX, wrappedY, star.size, 0, Math.PI * 2);

        // Soft cyan, highlight ice-blue, or white stars
        if (i % 5 === 0) {
          ctx.fillStyle = `rgba(32, 207, 255, ${currentOpacity * 0.9})`;
        } else if (i % 7 === 0) {
          ctx.fillStyle = `rgba(141, 235, 255, ${currentOpacity * 0.85})`;
        } else {
          ctx.fillStyle = `rgba(245, 250, 255, ${currentOpacity * 0.75})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
