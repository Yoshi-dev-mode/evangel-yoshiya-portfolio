"use client";

import { useEffect, useRef } from "react";
import "./portrait-gaze.css";

type Eye = { x: number; y: number; rx: number; ry: number };
const clamp = (n: number, low = -1, high = 1) => Math.max(low, Math.min(high, n));

/** Reprojects just the photographed eye texture; the source portrait stays intact. */
export function PortraitGaze({ src, paused }: { src: string; paused: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const frame = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !frame || !context) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false, enabled = false, visible = true, raf = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0, previous = 0;
    let pixels: ImageData | undefined;
    let eyes: Eye[] = [];
    const photo = new window.Image();
    const patch = document.createElement("canvas");
    patch.width = 80; patch.height = 40;
    const patchContext = patch.getContext("2d");

    const clear = () => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
    const allowed = () => enabled && visible && !document.hidden && !!pixels;
    const draw = () => {
      clear();
      if (!pixels || !patchContext || (Math.abs(x) + Math.abs(y) < .008)) return;
      const width = frame.clientWidth, height = frame.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = Math.max(width / photo.width, height / photo.height);
      context.setTransform(scale * ratio, 0, 0, scale * ratio, (width - photo.width * scale) / 2 * ratio, 0);
      const source = pixels.data;
      for (const eye of eyes) {
        const left = Math.round(eye.x - 40), top = Math.round(eye.y - 20);
        const output = patchContext.createImageData(80, 40);
        for (let py = 0; py < 40; py++) for (let px = 0; px < 80; px++) {
          const tx = left + px, ty = top + py;
          const u = (tx - eye.x) / eye.rx, v = (ty - eye.y) / eye.ry;
          // A fixed, feathered boundary anchors the eyelids and surrounding skin.
          const weight = Math.max(0, 1 - u * u - v * v) ** 2;
          const sx = tx - x * 7 * weight, sy = ty - y * 3 * weight;
          const ix = Math.floor(sx), iy = Math.floor(sy), fx = sx - ix, fy = sy - iy;
          const dest = (py * 80 + px) * 4;
          for (let c = 0; c < 4; c++) {
            const a = source[(iy * photo.width + ix) * 4 + c];
            const b = source[(iy * photo.width + ix + 1) * 4 + c];
            const d = source[((iy + 1) * photo.width + ix) * 4 + c];
            const e = source[((iy + 1) * photo.width + ix + 1) * 4 + c];
            output.data[dest + c] = a * (1-fx)*(1-fy) + b * fx*(1-fy) + d*(1-fx)*fy + e*fx*fy;
          }
        }
        patchContext.putImageData(output, 0, 0);
        context.drawImage(patch, left, top);
      }
      canvas.dataset.gazeX = x.toFixed(2);
      canvas.dataset.gazeY = y.toFixed(2);
    };
    const tick = (now: number) => {
      raf = 0;
      if (!allowed()) return;
      const delta = previous ? Math.min(now - previous, 50) : 16;
      previous = now;
      const ease = 1 - Math.exp(-delta / 95);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      draw();
      if (Math.abs(targetX-x) + Math.abs(targetY-y) > .003) raf = requestAnimationFrame(tick);
      else previous = 0;
    };
    const schedule = () => { if (!raf && allowed()) raf = requestAnimationFrame(tick); };
    const reset = () => { targetX = 0; targetY = 0; schedule(); };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(frame.clientWidth * ratio);
      canvas.height = Math.round(frame.clientHeight * ratio);
      draw();
    };
    const move = (event: PointerEvent) => {
      if (!allowed() || event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      const scale = Math.max(rect.width / photo.width, rect.height / photo.height);
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + (eyes[0]?.y ?? 288) * scale;
      targetX = clamp((event.clientX - eyeX) / (window.innerWidth * .4));
      targetY = clamp((event.clientY - eyeY) / (window.innerHeight * .45));
      schedule();
    };
    const sync = () => {
      enabled = fine.matches && !reduced.matches && !paused;
      canvas.dataset.gazeActive = String(enabled);
      if (!enabled) {
        cancelAnimationFrame(raf); raf = 0;
        x = y = targetX = targetY = 0;
        canvas.dataset.gazeX = "0.00";
        canvas.dataset.gazeY = "0.00";
        clear();
      } else if (!photo.src) photo.src = src;
    };
    photo.onload = () => {
      if (disposed) return;
      try {
        const source = document.createElement("canvas");
        source.width = photo.width; source.height = photo.height;
        const ctx = source.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(photo, 0, 0);
        pixels = ctx.getImageData(0, 0, photo.width, photo.height);
        // Anchors belong to portrait-cutout.png. Refine against its dark iris texture.
        eyes = [.44, .562].map(nx => {
          const expectedX = nx * photo.width, expectedY = .1885 * photo.height;
          let sum = 0, cx = 0, cy = 0;
          for (let iy = Math.round(expectedY-10); iy <= expectedY+10; iy++)
            for (let ix = Math.round(expectedX-18); ix <= expectedX+18; ix++) {
              const index = (iy * photo.width + ix) * 4;
              const brightness = (pixels!.data[index] + pixels!.data[index+1] + pixels!.data[index+2]) / 3;
              const w = Math.max(0, 85-brightness) * Math.exp(-((ix-expectedX)**2 / 200 + (iy-expectedY)**2 / 65));
              sum += w; cx += ix*w; cy += iy*w;
            }
          return { x:sum ? cx/sum : expectedX, y:sum ? cy/sum : expectedY, rx:34, ry:14 };
        });
        canvas.dataset.gazeReady = "true";
        resize();
      } catch { clear(); }
    };
    const observer = new ResizeObserver(resize);
    observer.observe(frame);
    const intersection = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      if (!visible) { cancelAnimationFrame(raf); raf = 0; }
      else schedule();
    });
    intersection.observe(frame);
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else reset(); };
    window.addEventListener("pointermove", move, { passive:true });
    document.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      disposed = true; cancelAnimationFrame(raf); clear();
      photo.onload = null;
      observer.disconnect(); intersection.disconnect();
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", sync); reduced.removeEventListener("change", sync);
    };
  }, [src, paused]);
  return <canvas ref={ref} className="portrait-gaze" aria-hidden="true" />;
}
