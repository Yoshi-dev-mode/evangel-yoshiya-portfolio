"use client";

import { useEffect, useRef, useState } from "react";
import { certifications, profile, projects } from "@/data/portfolio";

const DURATION = 10;
const chapters = [
  "Introduction",
  "About",
  "Selected Projects",
  "What I’m Learning",
  "Certifications",
  "Let’s Connect",
];

type PortfolioFilmProps = {
  scrollProgress?: { current: number };
  onSceneReady?: () => void;
  onSceneError?: () => void;
};

export function PortfolioFilm({
  scrollProgress,
  onSceneReady,
  onSceneError,
}: PortfolioFilmProps = {}) {
  const host = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const playingRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduced(preference.matches);
      if (preference.matches) {
        playingRef.current = false;
        setPlaying(false);
        progressRef.current = 1;
        setProgress(1);
      }
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const container = host.current;
    if (!container) return;

    async function createScene() {
      const THREE = await import("three");
      await document.fonts.load("500 24px ConceptManrope");
      if (disposed || !container) return;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xe5ecf3);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.18;
      renderer.domElement.setAttribute("aria-hidden", "true");
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe5ecf3);
      scene.fog = new THREE.Fog(0xe5ecf3, 16, 38);
      const camera = new THREE.PerspectiveCamera(38, 16 / 9, 0.1, 60);
      scene.add(new THREE.HemisphereLight(0xf9fcff, 0x9baec3, 2.8));
      const key = new THREE.DirectionalLight(0xffffff, 4.2);
      key.position.set(-4, 8, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      Object.assign(key.shadow.camera, {
        left: -7,
        right: 7,
        top: 8,
        bottom: -7,
        near: 0.1,
        far: 22,
      });
      key.shadow.bias = -0.0005;
      key.shadow.normalBias = 0.025;
      key.shadow.radius = 5;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xc7ddf6, 1.4);
      fill.position.set(4, 3, -3);
      scene.add(fill);
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(160, 160),
        new THREE.MeshStandardMaterial({ color: 0xe5ecf3, roughness: 0.95 }),
      );
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      function rounded(w: number, h: number, r: number) {
        const s = new THREE.Shape();
        s.moveTo(-w / 2 + r, -h / 2);
        s.lineTo(w / 2 - r, -h / 2);
        s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        s.lineTo(w / 2, h / 2 - r);
        s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        s.lineTo(-w / 2 + r, h / 2);
        s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
        s.lineTo(-w / 2, -h / 2 + r);
        s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
        return s;
      }

      const phone = new THREE.Group();
      phone.position.set(0, 1.72, 0);
      phone.rotation.y = -0.11;
      scene.add(phone);
      const body = new THREE.Mesh(
        new THREE.ExtrudeGeometry(rounded(1.58, 3.18, 0.19), {
          depth: 0.12,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.025,
          bevelThickness: 0.025,
          curveSegments: 20,
        }),
        new THREE.MeshStandardMaterial({
          color: 0x566578,
          metalness: 0.8,
          roughness: 0.28,
        }),
      );
      body.position.z = -0.1;
      body.castShadow = true;
      body.receiveShadow = true;
      phone.add(body);
      const bezel = new THREE.Mesh(
        new THREE.ShapeGeometry(rounded(1.51, 3.1, 0.17), 24),
        new THREE.MeshStandardMaterial({ color: 0x0e1926, roughness: 0.23 }),
      );
      bezel.position.z = 0.049;
      phone.add(bezel);

      function canvas(width: number, height: number) {
        const element = document.createElement("canvas");
        element.width = width;
        element.height = height;
        const context = element.getContext("2d");
        if (!context) throw new Error("Canvas rendering unavailable");
        return { element, context };
      }
      function text(
        ctx: CanvasRenderingContext2D,
        value: string,
        x: number,
        y: number,
        size: number,
        color = "#142b47",
        weight = 500,
      ) {
        ctx.fillStyle = color;
        ctx.font = `${weight} ${size}px ConceptManrope, Arial, sans-serif`;
        ctx.fillText(value, x, y);
      }
      function rule(ctx: CanvasRenderingContext2D, y: number) {
        ctx.fillStyle = "#c9d7e5";
        ctx.fillRect(74, y, 876, 2);
      }
      function lines(
        ctx: CanvasRenderingContext2D,
        value: string,
        y: number,
        size = 42,
        maxWidth = 865,
      ) {
        const words = value.split(" ");
        let line = "";
        let row = y;
        ctx.font = `400 ${size}px ConceptManrope, Arial, sans-serif`;
        for (const word of words) {
          const next = line ? `${line} ${word}` : word;
          if (ctx.measureText(next).width > maxWidth && line) {
            text(ctx, line, 78, row, size, "#52677d", 400);
            line = word;
            row += size * 1.5;
          } else line = next;
        }
        if (line) text(ctx, line, 78, row, size, "#52677d", 400);
        return row;
      }

      const cover = canvas(1024, 2048);
      cover.context.fillStyle = "#f4f8fc";
      cover.context.fillRect(0, 0, 1024, 2048);
      text(cover.context, "Evangel Yoshiya", 78, 290, 83);
      text(cover.context, "Aranas", 78, 395, 106);
      text(cover.context, "Developer portfolio", 80, 530, 47, "#285da6");
      lines(
        cover.context,
        "Learning in public. Building one idea at a time.",
        680,
        49,
      );
      rule(cover.context, 890);
      text(cover.context, "Selected work", 78, 1030, 65);
      cover.context.fillStyle = "#dae7f4";
      cover.context.fillRect(78, 1110, 868, 440);
      text(cover.context, "Web development", 118, 1235, 54);
      text(cover.context, "AI & security", 118, 1340, 54);
      text(
        cover.context,
        `${projects.length} projects to explore`,
        118,
        1460,
        39,
        "#52677d",
        400,
      );
      rule(cover.context, 1660);
      text(cover.context, "Scroll to see the work", 78, 1810, 46, "#285da6");

      const print = canvas(1024, 4096);
      const ctx = print.context;
      ctx.fillStyle = "#fbfdff";
      ctx.fillRect(0, 0, 1024, 4096);
      text(ctx, "About", 74, 150, 85);
      lines(ctx, "A developing technologist, learning by building.", 270, 48);
      text(ctx, "Evangel Yoshiya Aranas", 78, 460, 48, "#285da6");
      rule(ctx, 580);
      text(ctx, "Selected Projects", 74, 730, 79);
      ctx.fillStyle = "#e3edf7";
      ctx.fillRect(76, 815, 872, 240);
      text(ctx, "Yoshiya Storefront", 108, 918, 56);
      text(ctx, "Next.js · TypeScript", 108, 995, 42, "#52677d", 400);
      ctx.fillStyle = "#edf3f9";
      ctx.fillRect(76, 1100, 872, 220);
      text(ctx, "LEBC Registration", 108, 1197, 56);
      text(ctx, "HTML · CSS · JavaScript", 108, 1270, 40, "#52677d", 400);
      ctx.fillStyle = "#edf3f9";
      ctx.fillRect(76, 1365, 872, 220);
      text(ctx, "Kabisera Ledger", 108, 1462, 56);
      text(ctx, "Next.js · Supabase", 108, 1535, 42, "#52677d", 400);
      rule(ctx, 1690);
      text(ctx, "What I’m Learning", 74, 1845, 77);
      [
        "Full-stack development",
        "AI engineering",
        "Networking & security",
        "Computer engineering",
      ].forEach((item, index) =>
        text(ctx, item, 78, 1990 + index * 112, 48, "#52677d", 400),
      );
      rule(ctx, 2450);
      text(ctx, "Certifications", 74, 2600, 85);
      text(
        ctx,
        `${certifications.length} credential entries`,
        78,
        2730,
        50,
        "#285da6",
      );
      lines(ctx, "Assets, Threats, and Vulnerabilities", 2870, 48);
      text(ctx, "Google · November 2026", 78, 3060, 43, "#52677d", 400);
      rule(ctx, 3210);
      ctx.fillStyle = "#e0ecf8";
      ctx.fillRect(0, 3290, 1024, 806);
      text(ctx, "Let’s Connect", 74, 3470, 85);
      lines(ctx, "Follow the projects. Start a conversation.", 3610, 49);
      text(ctx, "GitHub  /  LinkedIn", 78, 3860, 54, "#285da6");

      const screenTexture = new THREE.CanvasTexture(cover.element);
      screenTexture.colorSpace = THREE.SRGBColorSpace;
      screenTexture.anisotropy = Math.min(
        8,
        renderer.capabilities.getMaxAnisotropy(),
      );
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.36, 2.82),
        new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false }),
      );
      screen.position.set(0, -0.018, 0.052);
      phone.add(screen);
      const speaker = new THREE.Mesh(
        new THREE.ShapeGeometry(rounded(0.38, 0.055, 0.025)),
        new THREE.MeshStandardMaterial({ color: 0x111b28 }),
      );
      speaker.position.set(0, 1.47, 0.055);
      phone.add(speaker);
      const side = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.38, 0.06),
        new THREE.MeshStandardMaterial({
          color: 0x61758b,
          metalness: 0.8,
          roughness: 0.25,
        }),
      );
      side.position.set(0.816, 0.52, -0.025);
      phone.add(side);

      const paperTexture = new THREE.CanvasTexture(print.element);
      paperTexture.colorSpace = THREE.SRGBColorSpace;
      paperTexture.anisotropy = Math.min(
        8,
        renderer.capabilities.getMaxAnisotropy(),
      );
      const segments = 180;
      const positions = new Float32Array((segments + 1) * 2 * 3);
      const uvs = new Float32Array((segments + 1) * 2 * 2);
      const indices: number[] = [];
      for (let i = 0; i < segments; i++) {
        const a = i * 2;
        indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      const paper = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          map: paperTexture,
          color: 0xffffff,
          side: THREE.DoubleSide,
          toneMapped: false,
        }),
      );
      paper.castShadow = true;
      paper.receiveShadow = true;
      paper.frustumCulled = false;
      paper.rotation.y = -0.11;
      scene.add(paper);

      function compose(scrollValue: number) {
        const progress = scrollProgress
          ? Math.min(1, scrollValue / 0.7)
          : scrollValue;
        const q = Math.min(1, Math.max(0, (progress - 0.12) / 0.72));
        const amount = q * q * (3 - 2 * q);
        const length = Math.max(0.005, amount * 6.05);
        paper.visible = q > 0.001;
        for (let i = 0; i <= segments; i++) {
          const s = (i / segments) * length;
          let y: number, z: number;
          const radius = 0.245;
          if (s < (Math.PI * radius) / 2) {
            const angle = s / radius;
            y = 0.315 - radius * Math.sin(angle);
            z = 0.06 + radius * (1 - Math.cos(angle));
          } else {
            y = 0.07;
            z = 0.06 + radius + s - (Math.PI * radius) / 2;
          }
          const curlLength = Math.min(length, 0.72 * (1 - amount));
          if (curlLength > 0.015 && s > length - curlLength && s > 0.4) {
            const d = s - (length - curlLength);
            const maxAngle = Math.PI * 1.35 * (1 - amount);
            const r = curlLength / Math.max(0.01, maxAngle);
            const a = (d / curlLength) * maxAngle;
            z -= d - r * Math.sin(a);
            y += r * (1 - Math.cos(a));
          }
          for (let j = 0; j < 2; j++) {
            const vertex = i * 2 + j;
            positions[vertex * 3] = j === 0 ? -0.68 : 0.68;
            positions[vertex * 3 + 1] = y;
            positions[vertex * 3 + 2] = z;
            uvs[vertex * 2] = j;
            uvs[vertex * 2 + 1] = 1 - (i / segments) * amount;
          }
        }
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.uv.needsUpdate = true;
        geometry.computeVertexNormals();
        const drift = progress * progress * (3 - 2 * progress);
        camera.position.set(
          3.0 - drift * 0.45,
          3.9 + drift * 2.5,
          8.1 - drift * 0.25,
        );
        camera.fov = 36 + drift * 16;
        camera.lookAt(0, 1.24 - drift * 0.52, 0.25 + drift * 2.15);
        if (scrollProgress) {
          const phase = Math.min(1, Math.max(0, (scrollValue - 0.7) / 0.26));
          const zoom = phase * phase * (3 - 2 * phase);
          camera.position.lerp(new THREE.Vector3(-0.045, 0.78, 0.94), zoom);
          const target = new THREE.Vector3(
            0,
            1.24 - drift * 0.52,
            0.25 + drift * 2.15,
          );
          target.lerp(new THREE.Vector3(-0.035, 0.13, 0.3), zoom);
          camera.fov = (36 + drift * 16) * (1 - zoom) + 38 * zoom;
          camera.lookAt(target);
        }
        camera.updateProjectionMatrix();
      }
      function resize() {
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        compose(scrollProgress?.current ?? progressRef.current);
        renderer.render(scene, camera);
      }
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      let visible = true;
      const visibility = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      });
      visibility.observe(container);
      let previous = 0;
      let lastPublished = -1;
      let lastDrawn = -1;
      const thumbnail = new window.Image();
      thumbnail.onload = () => {
        if (disposed) return;
        // Crop only the project's food photography, excluding its wordmark.
        ctx.drawImage(thumbnail, 730, 218, 610, 540, 680, 848, 235, 176);
        cover.context.drawImage(
          thumbnail,
          730,
          218,
          610,
          540,
          680,
          1140,
          220,
          180,
        );
        paperTexture.needsUpdate = true;
        screenTexture.needsUpdate = true;
        lastDrawn = -1;
      };
      thumbnail.src = "/images/projects/storefront.webp";
      renderer.setAnimationLoop((now: number) => {
        const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
        previous = now;
        if (!visible || document.hidden) return;
        if (scrollProgress) progressRef.current = scrollProgress.current;
        else if (playingRef.current) {
          progressRef.current = Math.min(
            1,
            progressRef.current + delta / DURATION,
          );
          if (progressRef.current >= 1) {
            playingRef.current = false;
            setPlaying(false);
          }
        }
        const p = progressRef.current;
        if (p !== lastDrawn) {
          compose(p);
          renderer.render(scene, camera);
          lastDrawn = p;
        }
        if (
          !scrollProgress &&
          (Math.abs(p - lastPublished) > 0.006 || p === 1)
        ) {
          setProgress(p);
          lastPublished = p;
        }
      });
      const redraw = () => {
        lastDrawn = -1;
      };
      window.addEventListener("resize", redraw);
      cleanup = () => {
        thumbnail.onload = null;
        renderer.setAnimationLoop(null);
        resizeObserver.disconnect();
        visibility.disconnect();
        window.removeEventListener("resize", redraw);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material)
              ? object.material
              : [object.material];
            materials.forEach((material) => material.dispose());
          }
        });
        screenTexture.dispose();
        paperTexture.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
      setReady(true);
      onSceneReady?.();
    }
    createScene().catch(() => {
      if (!disposed) {
        setError(
          "The 3D preview couldn’t start. Try a browser with WebGL enabled, or reload this page.",
        );
        onSceneError?.();
      }
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [scrollProgress, onSceneReady, onSceneError]);

  const chapter =
    chapters[Math.min(5, Math.floor(Math.max(0, (progress - 0.1) / 0.15)))];
  function toggle() {
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      setProgress(0);
    }
    playingRef.current = !playingRef.current;
    setPlaying(playingRef.current);
  }
  function restart() {
    playingRef.current = false;
    setPlaying(false);
    progressRef.current = reduced ? 1 : 0;
    setProgress(progressRef.current);
  }

  return (
    <section
      aria-label={
        scrollProgress ? undefined : "Interactive 3D portfolio animation"
      }
      aria-hidden={scrollProgress ? true : undefined}
    >
      <div
        className="film-stage"
        role="img"
        aria-label="An unbranded phone displays a blue and white developer portfolio. As playback advances, a continuous printed webpage unfurls from the phone onto the studio floor."
      >
        <div ref={host} className="film-canvas" />
        {!ready && (
          <div className="film-loading" role="status">
            {error || "Preparing the studio…"}
          </div>
        )}
        {!scrollProgress && (
          <>
            <span className="film-stage-label">16:9 / Studio study</span>
            <span className="film-section-label">{chapter}</span>
          </>
        )}
      </div>
      {!scrollProgress && (
        <>
          <div className="film-controls">
            <div className="film-buttons">
              <button
                type="button"
                className="film-play"
                onClick={toggle}
                disabled={!ready || reduced}
                aria-pressed={playing}
              >
                {playing ? "Pause" : progress >= 1 ? "Replay" : "Play film"}
              </button>
              <button type="button" onClick={restart} disabled={!ready}>
                Reset
              </button>
            </div>
            <label className="film-scrubber" htmlFor="film-progress">
              <span>Scrub the animation</span>
              <input
                id="film-progress"
                type="range"
                min="0"
                max="1000"
                step="1"
                value={Math.round(progress * 1000)}
                disabled={!ready}
                aria-valuetext={`${(progress * DURATION).toFixed(1)} of 10 seconds`}
                onChange={(event) => {
                  playingRef.current = false;
                  setPlaying(false);
                  const value = Number(event.target.value) / 1000;
                  progressRef.current = value;
                  setProgress(value);
                }}
              />
            </label>
            <span className="film-time">
              {(progress * DURATION).toFixed(1)} / 10.0 s
            </span>
          </div>
          <p className="film-instructions">
            {reduced
              ? "Reduced motion is enabled. The finished composition is shown; use the slider to inspect individual frames."
              : "Press play for the ten-second shot, or drag the timeline to inspect the unfolding page. Playback pauses when this tab is hidden."}
          </p>
          <div className="sr-only">
            <h2>Portfolio content in the animation</h2>
            <p>
              {profile.name}. A developing technologist, learning by building.
              Sections: About, Selected Projects, What I’m Learning,
              Certifications, Let’s Connect. {projects.length} projects and{" "}
              {certifications.length} credential entries. The new Google
              credential is Assets, Threats, and Vulnerabilities, issued
              November 2026.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
