import * as React from 'react';

/**
 * Tracks whether a node is on screen.
 *
 * Used to keep <video> decoding off the main thread while a section is out of
 * view. Several sections on the home page hold looping clips; left to their own
 * autoPlay they all decode for the whole visit, which shows up as dropped
 * frames while scrolling somewhere else entirely.
 *
 * `margin` starts the work slightly before the section arrives so playback has
 * already begun by the time it is visible.
 */
export default function useInView(margin = '200px') {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: margin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return [ref, inView];
}
