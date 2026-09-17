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
    });

    window.lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    // ── Gentle Section Snapping on Desktop ─────────────────────────
    let snapTimer = null;
    let isSnapping = false;

    const findNearestSnapTarget = (currentScrollY) => {
      // Only snap on desktop screens where sections fit 100vh
      if (window.innerWidth < 900) return null;

      const sections = Array.from(document.querySelectorAll('section[data-snap], [data-snap]'));
      if (!sections.length) return null;

      const vh = window.innerHeight;
      let bestTarget = null;
      let bestDist = Infinity;

      sections.forEach((el) => {
        // Skip pinned or scroll-driven sections
        if (el.id === 'core-features' || el.id === 'why-openledger' || el.closest('#core-features')) {
          return;
        }

        const rect = el.getBoundingClientRect();
        const sectionTop = currentScrollY + rect.top;
        const dist = Math.abs(sectionTop - currentScrollY);

        // Only snap if user stopped within 28% of viewport height to the section boundary
        if (dist < vh * 0.28 && dist < bestDist) {
          bestDist = dist;
          bestTarget = sectionTop;
        }
      });

      return bestTarget;
    };

    const doSnap = () => {
      if (isSnapping || !window.lenis) return;

      const current = lenis.scroll;
      const target = findNearestSnapTarget(current);

      if (target === null || Math.abs(target - current) < 6) return;

      isSnapping = true;
      lenis.scrollTo(target, {
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3), // smooth cubic ease out
        lock: false,
        onComplete: () => {
          isSnapping = false;
        },
      });
    };

    const handleUserScroll = () => {
      // Cancel any ongoing snap if user interacts
      if (isSnapping) {
        isSnapping = false;
      }
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(doSnap, 260);
    };

    lenis.on('scroll', handleUserScroll);

    return () => {
      gsap.ticker.remove(updateTicker);
      if (snapTimer) clearTimeout(snapTimer);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
