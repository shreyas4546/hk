import React, { useEffect, useRef } from "react";
import { Brain, Wrench, Lightbulb, Target } from "lucide-react";

interface PillarItemData {
  num: string;
  id: string;
  title: string;
  desc: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  grid: string;
  dataSize: string;
  badge: string;
}

// Exactly the 4 official pillars for a single loop
const PILLARS_DATA: PillarItemData[] = [
  {
    num: "01",
    id: "ID-0921",
    title: "THINK",
    desc: "Explore challenges, frame systemic problems, and conceive transformative digital ideas.",
    image: "/assets/cards/pillar-think.webp",
    icon: Brain,
    grid: "4x4",
    dataSize: "28.4MB",
    badge: "ANALYSIS",
  },
  {
    num: "02",
    id: "ID-4882",
    title: "BUILD",
    desc: "Turn technical architectures and code repositories into robust working solutions.",
    image: "/assets/cards/pillar-build.webp",
    icon: Wrench,
    grid: "8x8",
    dataSize: "64.2MB",
    badge: "SYNTHESIS",
  },
  {
    num: "03",
    id: "ID-6859",
    title: "INNOVATE",
    desc: "Approach real-world obstacles with fresh algorithmic models and creative engineering.",
    image: "/assets/cards/pillar-innovate.webp",
    icon: Lightbulb,
    grid: "3x2",
    dataSize: "58.1MB",
    badge: "CREATION",
  },
  {
    num: "04",
    id: "ID-8322",
    title: "IMPACT",
    desc: "Deploy practical technology that creates tangible value for community and industry.",
    image: "/assets/cards/pillar-impact.webp",
    icon: Target,
    grid: "6x6",
    dataSize: "91.7MB",
    badge: "DEPLOYMENT",
  },
];

export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);

  // HUD element refs for 60fps direct DOM updates (zero re-render overhead)
  const velRef = useRef<HTMLSpanElement | null>(null);
  const fpsRef = useRef<HTMLSpanElement | null>(null);
  const coordRef = useRef<HTMLSpanElement | null>(null);
  const activePillarRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const worldEl = worldRef.current;
    const viewportEl = viewportRef.current;
    const containerEl = containerRef.current;
    if (!worldEl || !viewportEl || !containerEl) return;

    // --- CONFIGURATION: EXACTLY 1 SINGLE LOOP (THINK, BUILD, INNOVATE, IMPACT) ---
    // 4 cards + 4 matching 3D headline words = 8 items total
    const CONFIG = {
      pillarCount: 4,
      itemCount: 8,
      starCount: 110,
      zGap: 850,
      loopSize: 8 * 850, // 6800px single loop
      camSpeed: 2.2,
    };

    // --- STATE ---
    const state = {
      scroll: 0,
      targetScroll: 0,
      velocity: 0,
      targetVelocity: 0,
      mouseX: 0,
      mouseY: 0,
      isHovering: false,
    };

    const items: Array<{
      el: HTMLElement;
      type: "card" | "text" | "star";
      x: number;
      y: number;
      rot: number;
      baseZ: number;
      pillarIndex?: number;
      wordText?: string;
    }> = [];

    // Clear any existing children in world
    worldEl.innerHTML = "";

    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const isMobile = winW < 640;

    // 1. Build the Single Loop of the 4 Pillars
    // Interleaving: Pillar 01 Card -> "THINK" -> Pillar 02 Card -> "BUILD" -> Pillar 03 Card -> "INNOVATE" -> Pillar 04 Card -> "IMPACT"
    for (let i = 0; i < CONFIG.itemCount; i++) {
      const el = document.createElement("div");
      el.className = "absolute left-0 top-0 will-change-transform flex items-center justify-center";
      el.style.transformOrigin = "center center";
      el.style.backfaceVisibility = "hidden";

      const isText = i % 2 === 1;
      const pillarIndex = Math.floor(i / 2) % PILLARS_DATA.length;
      const pillar = PILLARS_DATA[pillarIndex];

      if (isText) {
        // Giant 3D Word for the corresponding pillar
        const txt = document.createElement("div");
        txt.className = "hyper-big-text";
        txt.innerText = pillar.title;
        el.appendChild(txt);

        items.push({
          el,
          type: "text",
          wordText: pillar.title,
          pillarIndex,
          x: 0,
          y: 0,
          rot: (Math.random() - 0.5) * 6,
          baseZ: -i * CONFIG.zGap,
        });
      } else {
        // 3D Pillar Card matching the HackIgnite electric cyan & ice-blue palette
        const card = document.createElement("div");
        card.className = "hyper-card group";

        card.innerHTML = `
          <!-- Card Header -->
          <div class="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#00C8E8] shadow-[0_0_8px_#00C8E8]"></span>
              <span class="font-mono text-xs font-bold text-[#8DEBFF] tracking-widest">${pillar.id}</span>
            </div>
            <div class="px-2.5 py-0.5 rounded bg-[#07131C] border border-[#00C8E8]/30 text-[10px] font-mono text-[#00C8E8] uppercase tracking-wider font-semibold">
              ${pillar.badge}
            </div>
          </div>

          <!-- 3D Artwork Preview Frame -->
          <div class="relative w-full h-36 sm:h-44 rounded-xl overflow-hidden my-3 border border-[#00C8E8]/30 bg-[#04080D]/80 shrink-0 shadow-[0_0_15px_rgba(0,200,232,0.1)]">
            <img src="${pillar.image}" alt="${pillar.title}" loading="lazy" decoding="async" class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#04080D]/90 via-transparent to-transparent pointer-events-none"></div>
            <div class="absolute top-2.5 right-2.5 font-mono text-xs font-bold text-[#8DEBFF] px-2.5 py-0.5 rounded-full bg-[#07131C]/90 backdrop-blur-md border border-[#00C8E8]/40 shadow-sm">
              ${pillar.num}
            </div>
          </div>

          <!-- Card Title & Description -->
          <div class="my-auto py-1">
            <h2 class="font-['Syncopate',sans-serif] font-bold text-2xl sm:text-3xl text-[#F3F8FA] tracking-wider uppercase mb-1.5 leading-none">
              ${pillar.title}
            </h2>
            <p class="text-xs sm:text-[13px] text-[#A4B6BF] font-['Inter',sans-serif] leading-relaxed line-clamp-3">
              ${pillar.desc}
            </p>
          </div>

          <!-- Card Footer Telemetry -->
          <div class="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10.5px] text-[#8DEBFF]/80 shrink-0">
            <span>GRID: ${pillar.grid}</span>
            <span>DATA: ${pillar.dataSize}</span>
          </div>

          <!-- Subtle Background Watermark Number -->
          <div class="absolute bottom-2 right-3 font-mono font-black text-5xl sm:text-6xl text-[#00C8E8]/[0.06] pointer-events-none select-none">
            ${pillar.num}
          </div>
        `;

        el.appendChild(card);

        // Orbital positioning through 3D space
        const angle = (pillarIndex / CONFIG.pillarCount) * Math.PI * 2;
        const radiusFactor = isMobile ? 0.16 : 0.28;
        const x = Math.cos(angle) * (winW * radiusFactor);
        const y = Math.sin(angle) * (winH * radiusFactor);
        const rot = (Math.random() - 0.5) * 14;

        items.push({
          el,
          type: "card",
          pillarIndex,
          x,
          y,
          rot,
          baseZ: -i * CONFIG.zGap,
        });
      }

      worldEl.appendChild(el);
    }

    // 2. 3D Stars (subtle cosmic dust in 3D depth, harmonious with ZeroGravityBackground)
    for (let i = 0; i < CONFIG.starCount; i++) {
      const el = document.createElement("div");
      el.className = "absolute rounded-full bg-[#8DEBFF] will-change-transform pointer-events-none";
      const size = Math.random() > 0.85 ? 2.5 : Math.random() > 0.5 ? 1.8 : 1.2;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.opacity = `${(0.2 + Math.random() * 0.5).toFixed(2)}`;
      el.style.transformOrigin = "center center";

      worldEl.appendChild(el);
      items.push({
        el,
        type: "star",
        x: (Math.random() - 0.5) * (isMobile ? 1800 : 3200),
        y: (Math.random() - 0.5) * (isMobile ? 1800 : 3200),
        rot: 0,
        baseZ: -Math.random() * CONFIG.loopSize,
      });
    }

    // --- EVENT LISTENERS ---
    const handleMouseMove = (e: MouseEvent) => {
      state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseEnter = () => {
      state.isHovering = true;
    };

    const handleMouseLeave = () => {
      state.isHovering = false;
      state.mouseX = 0;
      state.mouseY = 0;
    };

    // Calculate scroll progress from page scroll
    const updateScrollFromWindow = () => {
      if (!containerEl) return;
      const rect = containerEl.getBoundingClientRect();
      const scrollWithin = -rect.top;
      const maxScroll = containerEl.offsetHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      if (scrollWithin >= 0 && scrollWithin <= maxScroll) {
        const progress = scrollWithin / maxScroll;
        state.targetScroll = progress * (CONFIG.loopSize / CONFIG.camSpeed);
      } else if (scrollWithin < 0) {
        state.targetScroll = 0;
      } else {
        state.targetScroll = CONFIG.loopSize / CONFIG.camSpeed;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", updateScrollFromWindow, { passive: true });
    stickyRef.current?.addEventListener("mouseenter", handleMouseEnter);
    stickyRef.current?.addEventListener("mouseleave", handleMouseLeave);

    const handleWheel = (e: WheelEvent) => {
      if (!state.isHovering) return;
      state.targetVelocity += e.deltaY * 0.04;
    };
    window.addEventListener("wheel", handleWheel, { passive: true });

    // --- 60FPS RAF LOOP WITH VIEWPORT AWARENESS ---
    let animId: number = 0;
    let isVisible = false;
    let lastTime = performance.now();
    let frameCounter = 0;

    const raf = (time: number) => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(raf);

      const delta = time - lastTime;
      lastTime = time;
      frameCounter++;

      // Update FPS every 12 frames
      if (frameCounter % 12 === 0 && fpsRef.current) {
        const fps = Math.round(1000 / (delta || 16.6));
        fpsRef.current.innerText = `${Math.min(fps, 60)}`;
      }

      // Smooth scroll lerp
      const prevScroll = state.scroll;
      state.scroll += (state.targetScroll - state.scroll) * 0.08;

      // Add wheel / drag impulse with friction decay
      state.scroll += state.velocity * 0.8;
      state.velocity *= 0.92;

      const instantSpeed = Math.abs(state.scroll - prevScroll);
      state.targetVelocity = (state.scroll - prevScroll) * 0.5;

      // Telemetry updates
      if (velRef.current) {
        velRef.current.innerText = Math.abs(state.targetVelocity).toFixed(2);
      }

      if (coordRef.current) {
        coordRef.current.innerText = `${Math.round(state.scroll)}`;
      }

      // 1. Camera Tilt & Shake
      const tiltX = state.mouseY * 5 - state.targetVelocity * 0.35;
      const tiltY = state.mouseX * 5;
      worldEl.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      // 2. Dynamic Perspective Warp (FOV warp)
      const baseFov = isMobile ? 800 : 1000;
      const fov = Math.max(isMobile ? 420 : 500, baseFov - Math.min(instantSpeed * 12, 500));
      viewportEl.style.perspective = `${fov}px`;

      // 3. Render Items in Single Loop
      const cameraZ = state.scroll * CONFIG.camSpeed;
      const modC = CONFIG.loopSize;

      // Determine active pillar in focus (THINK, BUILD, INNOVATE, IMPACT)
      const normalizedCycle = (((cameraZ % modC) + modC) % modC) / modC;
      const activeIdx = Math.floor(normalizedCycle * PILLARS_DATA.length) % PILLARS_DATA.length;
      if (activePillarRef.current) {
        activePillarRef.current.innerText = PILLARS_DATA[activeIdx].title;
      }

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let relZ = item.baseZ + cameraZ;

        // Modulo wrapping for single loop
        let vizZ = ((relZ % modC) + modC) % modC;
        if (vizZ > 600) vizZ -= modC;

        // Opacity Fading
        let alpha = 1;
        if (vizZ < -3500) {
          alpha = 0;
        } else if (vizZ < -2200) {
          alpha = (vizZ + 3500) / 1300;
        }

        if (vizZ > 120 && item.type !== "star") {
          alpha = 1 - (vizZ - 120) / 450;
        }

        if (alpha < 0) alpha = 0;
        if (alpha > 1) alpha = 1;

        item.el.style.opacity = `${alpha.toFixed(3)}`;

        if (alpha > 0.01) {
          let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

          if (item.type === "star") {
            const stretch = Math.max(1, Math.min(1 + instantSpeed * 0.15, 12));
            trans += ` scale3d(1, 1, ${stretch})`;
          } else if (item.type === "text") {
            trans += ` rotateZ(${item.rot}deg)`;
            const textInner = item.el.firstElementChild as HTMLElement | null;
            if (textInner) {
              // Cyber cyan & turquoise RGB split (NO RED!)
              if (instantSpeed > 0.8) {
                const offset = Math.min(instantSpeed * 1.8, 24);
                textInner.style.textShadow = `${offset}px 0 rgba(0, 200, 232, 0.95), ${-offset}px 0 rgba(141, 235, 255, 0.95), 0 0 25px rgba(0, 200, 232, 0.5)`;
                textInner.style.webkitTextStroke = "2px rgba(243, 248, 250, 0.5)";
              } else {
                textInner.style.textShadow = "none";
                textInner.style.webkitTextStroke = "2px rgba(243, 248, 250, 0.2)";
              }
            }
          } else {
            const t = time * 0.001;
            const float = Math.sin(t + item.x) * 6;
            trans += ` rotateZ(${item.rot}deg) rotateY(${float}deg)`;
          }

          item.el.style.transform = trans;
        }
      }
    };

    const startRaf = () => {
      if (animId) return;
      lastTime = performance.now();
      animId = requestAnimationFrame(raf);
    };

    const stopRaf = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible) {
          updateScrollFromWindow();
          startRaf();
        } else {
          stopRaf();
        }
      },
      { rootMargin: "300px 0px" }
    );

    if (containerEl) observer.observe(containerEl);
    updateScrollFromWindow();

    return () => {
      stopRaf();
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateScrollFromWindow);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <section
      id="pillars"
      ref={containerRef}
      className="relative h-[280vh] bg-transparent z-20"
      style={{ cursor: "crosshair" }}
    >
      {/* Sticky Fullscreen 3D Viewport Frame with Transparent Background */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-transparent select-none text-[#F3F8FA] font-['Syncopate',sans-serif]"
      >
        {/* Subtle Ambient Cosmic Lighting Mesh behind 3D world */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-b from-[#00C8E8]/08 via-[#19D8E8]/04 to-transparent blur-[140px] pointer-events-none rounded-full -z-10" />

        {/* POST PROCESSING & OVERLAYS (Feathered so ZeroGravity particles shine through) */}
        <div className="hyper-scanlines" />
        <div className="hyper-vignette" />
        <div className="hyper-noise" />

        {/* Center Crosshair Reticle in Cyber Cyan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 opacity-35 text-[#00C8E8] font-mono text-lg">
          +
        </div>

        {/* TOP SECTION TITLE HUD BADGE */}
        <div className="absolute top-20 sm:top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center max-w-xl px-4 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#07131C]/90 backdrop-blur-md border border-[#00C8E8]/40 text-[10px] sm:text-[11px] font-mono text-[#8DEBFF] mb-2 shadow-[0_0_20px_rgba(0,200,232,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C8E8] animate-pulse" />
            <span>EVENT PILLARS // 3D HYPER SCROLL</span>
          </div>
          <h2 className="font-['Syncopate',sans-serif] font-bold text-base sm:text-2xl text-white tracking-widest uppercase">
            THINK • BUILD • <span className="cyan-turquoise-text">INNOVATE • IMPACT</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-[#A4B6BF] font-['Inter',sans-serif] mt-1 max-w-md mx-auto hidden sm:block">
            Scroll down to dive through the 24-hour innovation core.
          </p>
        </div>

        {/* HUD Top Bar (Desktop) */}
        <div className="absolute top-8 left-8 right-8 z-30 pointer-events-none hidden sm:flex justify-between items-center font-mono text-xs text-white/50 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-white/70">
            <span className="w-2 h-2 bg-[#00C8E8] rounded-xs shadow-[0_0_8px_#00C8E8]" />
            SYS.READY // FOCUS: <strong ref={activePillarRef} className="text-[#00C8E8] ml-1">THINK</strong>
          </span>
          <div className="hyper-hud-line" />
          <span>
            FPS: <strong ref={fpsRef} className="text-[#00C8E8]">60</strong>
          </span>
        </div>

        {/* HUD Bottom Bar (Desktop & Mobile) */}
        <div className="absolute bottom-5 sm:bottom-8 left-4 right-4 sm:left-8 sm:right-8 z-30 pointer-events-none flex justify-between items-center font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">
          <span>
            COORD: <strong ref={coordRef} className="text-[#00C8E8]">0000</strong>
          </span>
          <div className="hyper-hud-line" />
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00C8E8] rounded-xs shadow-[0_0_6px_#00C8E8]" />
            <span>HACKIGNITE 1.0 // 4 PILLARS</span>
          </span>
        </div>

        {/* HUD Left Edge Vertical Velocity Telemetry */}
        <div
          className="absolute left-2.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-none font-mono text-[9px] sm:text-[10px] text-white/50 tracking-wider hidden xs:block"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          SCROLL VELOCITY // <strong ref={velRef} className="text-[#00C8E8]">0.00</strong>
        </div>

        {/* 3D PERSPECTIVE VIEWPORT */}
        <div
          ref={viewportRef}
          className="absolute inset-0 overflow-hidden z-10"
          style={{ perspective: "1000px" }}
        >
          {/* 3D TILT WORLD */}
          <div
            ref={worldRef}
            className="absolute top-1/2 left-1/2 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      </div>
    </section>
  );
}
