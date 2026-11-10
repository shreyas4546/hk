import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { AlertCircle, RefreshCw } from "lucide-react";

interface AstronautCanvasProps {
  className?: string;
}

export default function AstronautCanvas({ className = "" }: AstronautCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const testCanvas = document.createElement("canvas");
        const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
        if (!gl) return true;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 420;

    // 1. Scene Setup
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.6);

    // 3. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: "high-performance",
      });
    } catch (err: unknown) {
      setHasError(true);
      setErrorMessage(err instanceof Error ? err.message : "WebGL context initialization failed.");
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment & Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    // 5. Lighting Rig (Key, Fill, and Cinematic Blue Rim Lighting)
    const ambientLight = new THREE.AmbientLight(0x0a1724, 1.8);
    scene.add(ambientLight);

    // Key directional light (warm-white from top-front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cinematic Electric Cyan Rim Light (from behind right)
    const cyanRimLight = new THREE.DirectionalLight(0x20cfff, 6.0);
    cyanRimLight.position.set(-4, 3, -4);
    scene.add(cyanRimLight);

    // Deep Cosmic Blue Rim Light (from behind left)
    const blueRimLight = new THREE.DirectionalLight(0x168bff, 4.5);
    blueRimLight.position.set(4, -2, -3);
    scene.add(blueRimLight);

    // Visor specular accent light
    const visorAccent = new THREE.PointLight(0x8debff, 2.0, 10);
    visorAccent.position.set(0, 1, 2);
    scene.add(visorAccent);

    // 6. Model Pivot & GLTF Loader
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let mixer: THREE.AnimationMixer | null = null;
    let astronautScene: THREE.Group | null = null;

    const loader = new GLTFLoader();
    loader.load(
      "/models/astronaut.glb",
      (gltf) => {
        astronautScene = gltf.scene;

        // Compute bounding box and normalize scale & position
        const box = new THREE.Box3().setFromObject(astronautScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Center model geometry
        astronautScene.position.x = -center.x;
        astronautScene.position.y = -center.y - 0.15;
        astronautScene.position.z = -center.z;

        // Front face toward viewer (default model orientation is 0)
        astronautScene.rotation.y = 0;

        // Auto-scale to comfortably fit the viewport
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.6 / maxDim;
        modelGroup.scale.setScalar(scale);

        // Enhance materials for space environment
        astronautScene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = !isSoftwareGl;
            mesh.receiveShadow = !isSoftwareGl;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              // If it's a helmet visor or metal part, enhance reflectivity
              if (mat.name && /visor|helmet|glass/i.test(mat.name)) {
                mat.roughness = 0.08;
                mat.metalness = 0.95;
                mat.envMapIntensity = 2.5;
              } else {
                mat.envMapIntensity = 1.2;
              }
            }
          }
        });

        modelGroup.add(astronautScene);

        // Handle animations if present in GLB
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(astronautScene);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(percent);
        } else {
          setLoadingProgress(50);
        }
      },
      (error) => {
        setHasError(true);
        setErrorMessage("Failed to load 3D astronaut model asset.");
        console.error("GLTFLoader error:", error);
      }
    );

    // 7. Interactive Mouse & Touch Tracking
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let targetPosX = 0;
    let targetPosY = 0;
    let currentPosX = 0;
    let currentPosY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Controlled subtle rotation & translation limits
      targetRotY = normX * 0.45;
      targetRotX = -normY * 0.3;
      targetPosX = normX * 0.25;
      targetPosY = normY * 0.2;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // 8. Responsive Camera & Canvas Resizing with ResizeObserver
    const updateSize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 420;

      camera.aspect = newWidth / newHeight;
      // Adjust camera distance for portrait mobile vs landscape desktop
      if (newWidth < 450) {
        camera.position.set(0, 0, 4.2);
      } else if (newWidth < 768) {
        camera.position.set(0, 0, 3.8);
      } else {
        camera.position.set(0, 0, 3.4);
      }
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // 9. Animation & Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      const time = (now - startTime) / 1000;

      if (mixer) {
        mixer.update(delta);
      }

      // Smooth exponential damping for mouse/touch responsiveness
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentPosX += (targetPosX - currentPosX) * 0.05;
      currentPosY += (targetPosY - currentPosY) * 0.05;

      // Natural zero-gravity floating movement (sine oscillation on Y and subtle roll)
      const floatOffsetY = Math.sin(time * 1.4) * 0.12;
      const floatRotZ = Math.sin(time * 0.7) * 0.04;
      // Gentle oscillation around Y keeping front face visible
      const idleOscillateY = Math.sin(time * 0.4) * 0.22;

      modelGroup.position.set(currentPosX, currentPosY + floatOffsetY, 0);
      modelGroup.rotation.set(currentRotX, currentRotY + idleOscillateY, floatRotZ);

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resource Disposal & Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      resizeObserver.disconnect();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
          const mesh = object as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => mat.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full flex items-center justify-center select-none ${className}`}
      data-testid="threejs-astronaut-container"
    >
      {/* 3D Loading Progress Indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 cosmic-glass rounded-2xl p-6 border border-[#20CFFF]/30">
          <RefreshCw className="w-8 h-8 text-[#20CFFF] animate-spin mb-3" />
          <div className="text-xs font-['Space_Grotesk'] font-bold text-white tracking-widest uppercase mb-2">
            Loading 3D Model · {loadingProgress}%
          </div>
          <div className="w-48 h-1.5 bg-[#07111D] rounded-full overflow-hidden border border-[#20CFFF]/20">
            <div
              className="h-full bg-gradient-to-r from-[#168BFF] to-[#20CFFF] transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-[#9AAFC1] mt-2">
            GLB MESH · PBR MATERIALS · THREE.JS
          </div>
        </div>
      )}

      {/* Fallback View if WebGL fails */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 cosmic-glass rounded-2xl p-6 border border-rose-500/40 text-center">
          <AlertCircle className="w-10 h-10 text-rose-400 mb-2" />
          <h4 className="font-display font-bold text-sm text-white mb-1">
            WebGL 3D Context Notice
          </h4>
          <p className="text-xs text-[#9AAFC1] max-w-xs mb-4">{errorMessage}</p>
          <img
            src="/src/assets/images/hero_astronaut_floating_1794046417639.jpg"
            alt="3D Astronaut Visual Fallback"
            className="w-48 h-48 object-contain rounded-xl opacity-80"
          />
          <span className="text-[10px] font-mono text-[#20CFFF] mt-2">
            [Fallback Image Render Active]
          </span>
        </div>
      )}
    </div>
  );
}
