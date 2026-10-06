import * as React from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // ── Lenis: smooth inertia scrolling ────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
      infinite: false,
      /* Lenis takes over in-page links now that globals.css no longer applies
         native scroll-behavior while Lenis is mounted. The offset matches the
         `[id] { scroll-margin-top: 90px }` rule the browser used to honour, so
         anchored sections still clear the fixed header. */
      anchors: { offset: -90 },
    });

    window.lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
