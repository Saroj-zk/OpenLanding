import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MemoryIcon from '@mui/icons-material/Memory';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import StorageIcon from '@mui/icons-material/Storage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useThemeMode } from '@/context/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  window.ScrollTrigger = ScrollTrigger;
}

const TABS = [
  {
    id: 'private',
    label: 'Private AI',
    fullLabel: 'Private AI',
    shortLabel: 'Private AI',
    icon: LockIcon,
    tagline: 'Private and uncensored, from the start.',
    description: 'Ask freely without your prompts being stored or used for training.',
    hasExplore: true,
    exploreLink: '/private',
    tagLeft: 'ZERO RETENTION',
    tagRight: 'UNCENSORED',
  },
  {
    id: 'multimodel',
    label: 'Multi-Model',
    fullLabel: 'Multi-Model & Tokens',
    shortLabel: 'Multi-Model',
    icon: AutoAwesomeIcon,
    tagline: 'More models. Fewer wasted tokens.',
    description: 'Access leading AI models from one place, with optimized token usage to reduce costs and keep every request efficient.',
    hasExplore: true,
    exploreLink: '/models',
    tagLeft: 'MULTI-MODEL',
    tagRight: 'TOKEN OPTIMIZED',
  },
  {
    id: 'memory',
    label: 'Unified Memory',
    fullLabel: 'Unified Memory',
    shortLabel: 'Memory',
    icon: MemoryIcon,
    tagline: 'Say it once. Every model knows.',
    description: 'Your context stays consistent across models, so you never have to start over.',
    hasExplore: true,
    exploreLink: '/memory',
    tagLeft: 'ONE MEMORY',
    tagRight: 'SHARED CONTEXT',
  },
  {
    id: 'agents',
    label: 'Built for Agents',
    fullLabel: 'Built for Agents',
    shortLabel: 'Agents',
    icon: SmartToyIcon,
    tagline: 'Connect once. Access any model.',
    description: 'Give agents direct access to leading AI models with x402, enabling seamless interactions across models without complex integrations.',
    hasExplore: true,
    exploreLink: '/capabilities',
    tagLeft: 'X402 ENABLED',
    tagRight: 'AGENT READY',
  },
];

export default function CoreFeaturesSection() {
  const { isDark } = useThemeMode();
  const [activeTab, setActiveTab] = React.useState(0);
  const [pressedIndex, setPressedIndex] = React.useState(null);
  const [isPressing, setIsPressing] = React.useState(false);
  const pressTargetRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const pinContainerRef = React.useRef(null);
  const imageContainerRef = React.useRef(null);
  const tabBarRef = React.useRef(null);
  const pillRef = React.useRef(null);
  const imageRefs = React.useRef([]);
  const scrollTriggerRef = React.useRef(null);
  const lastActiveTabRef = React.useRef(0);
  const isClickingRef = React.useRef(false);

  // Helper to get exact horizontal offset of each tab button relative to tab 0
  const getTabPositions = React.useCallback(() => {
    if (typeof document === 'undefined') return [0, 0, 0, 0];
    const b0 = document.getElementById('tab-btn-0');
    const b1 = document.getElementById('tab-btn-1');
    const b2 = document.getElementById('tab-btn-2');
    const b3 = document.getElementById('tab-btn-3');
    if (!b0 || !b1 || !b2 || !b3) {
      const w = tabBarRef.current ? (tabBarRef.current.offsetWidth - 12) / 4 : 0;
      return [0, w, w * 2, w * 3];
    }
    const x0 = b0.offsetLeft;
    return [
      0,
      b1.offsetLeft - x0,
      b2.offsetLeft - x0,
      b3.offsetLeft - x0,
    ];
  }, []);

  // Liquid Glass pointer press handler: swells pill, thins fill, sinks item contents, opens refraction
  const handlePointerDown = (idx) => {
    setPressedIndex(idx);
    setIsPressing(true);
    pressTargetRef.current = idx;

    // Immediately place the pill under the finger before activation
    if (pillRef.current) {
      const positions = getTabPositions();
      gsap.to(pillRef.current, {
        x: positions[idx] || 0,
        duration: 0.18,
        ease: 'power2.out',
      });
    }

    const release = () => {
      setIsPressing(false);
      setPressedIndex(null);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
    };
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
  };

  // Initialize GSAP ScrollTrigger for pinning and scroll-based tab navigation
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let mm = gsap.matchMedia();

    mm.add('(min-width: 900px)', () => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinContainerRef.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          if (isClickingRef.current) return;
          const p = self.progress;
          let idx = 0;
          if (p >= 0.75) {
            idx = 3;
          } else if (p >= 0.50) {
            idx = 2;
          } else if (p >= 0.25) {
            idx = 1;
          } else {
            idx = 0;
          }
          if (idx !== lastActiveTabRef.current) {
            lastActiveTabRef.current = idx;
            setActiveTab(idx);
          }
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        st.kill();
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, [getTabPositions]);

  // Synchronize pill position and feature cards smoothly whenever activeTab changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Move pill with organic spring & stretch to the active tab
    if (pillRef.current && tabBarRef.current) {
      const positions = getTabPositions();
      const targetX = positions[activeTab] || 0;
      gsap.to(pillRef.current, {
        x: targetX,
        duration: 0.42,
        ease: 'power3.out',
        overwrite: 'auto',
      });
      gsap.fromTo(
        pillRef.current,
        { scaleX: 1.14, scaleY: 0.92 },
        { scaleX: 1, scaleY: 1, duration: 0.38, ease: 'back.out(1.8)' }
      );
    }

    // 2. Crossfade feature card panels so activeTab is always 100% visible
    imageRefs.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === activeTab) {
        gsap.to(panel, {
          opacity: 1,
          scale: 1,
          duration: 0.42,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      } else {
        gsap.to(panel, {
          opacity: 0,
          scale: 0.98,
          duration: 0.32,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    });
  }, [activeTab, getTabPositions]);

  const handleTabClick = (index) => {
    setActiveTab(index);
    lastActiveTabRef.current = index;

    if (!scrollTriggerRef.current) return;

    isClickingRef.current = true;
    const trigger = scrollTriggerRef.current;
    const scrollDistance = trigger.end - trigger.start;

    const TAB_DWELL_PROGRESS = [
      0.05,
      0.35,
      0.65,
      0.92,
    ];
    const targetScroll = trigger.start + TAB_DWELL_PROGRESS[index] * scrollDistance;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, {
        duration: 0.8,
        onComplete: () => {
          isClickingRef.current = false;
        },
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      setTimeout(() => {
        isClickingRef.current = false;
      }, 800);
    }
  };

  // Render the high-fidelity UI mockup inside the center preview area of each tab
  const renderVisualPreview = (tabId) => {
    if (tabId === 'private') {
      return (
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 2, sm: 3 } }}>
          {/* Floating purge chip top right */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: -6, sm: 0 },
              right: { xs: 8, sm: 24 },
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              px: 1.2,
              py: 0.5,
              borderRadius: '8px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: '0.95rem', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }} />
            <Box sx={{ width: 22, height: 4, borderRadius: 2, backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#CBD5E1' }} />
          </Box>

          {/* Center Floating Privacy Controls Card */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 320,
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              border: '1px solid var(--border-normal)',
              boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.4)' : '0 12px 32px rgba(15,23,42,0.08)',
              p: { xs: 2, sm: 2.6 },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              zIndex: 2,
            }}
          >
            {/* Header with blue lock */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
              <LockOutlinedIcon sx={{ fontSize: '1rem', color: '#0284C7' }} />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                Privacy Controls
              </Typography>
            </Box>

            {/* Zero Retention Toggle Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Box>
                <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.2 }}>
                  Zero Retention
                </Typography>
                <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-secondary)', mt: 0.3 }}>
                  Prompts are never stored
                </Typography>
              </Box>

              {/* iOS Style Toggle Switch ON */}
              <Box
                sx={{
                  width: 44,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: '#22C55E',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  px: '2px',
                  boxShadow: '0 2px 8px rgba(34, 197, 94, 0.4)',
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    transform: 'translateX(20px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Floating purge chip bottom left */}
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: -6, sm: 0 },
              left: { xs: 8, sm: 20 },
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.8,
              px: 1.2,
              py: 0.5,
              borderRadius: '8px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: '0.95rem', color: isDark ? 'rgba(255,255,255,0.45)' : '#94A3B8' }} />
            <Box sx={{ width: 26, height: 4, borderRadius: 2, backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#CBD5E1' }} />
          </Box>
        </Box>
      );
    }

    if (tabId === 'multimodel') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, py: { xs: 2, sm: 3 } }}>
          {/* Select Model Dropdown Pill */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2.2,
              py: 0.9,
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-normal)',
              boxShadow: isDark ? '0 8px 24px rgba(0,0,0,0.4)' : '0 6px 20px rgba(15,23,42,0.06)',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: '1.05rem', color: '#A855F7' }} />
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-heading)' }}>
              Select Model...
            </Typography>
            <UnfoldMoreIcon sx={{ fontSize: '1.15rem', color: 'var(--text-secondary)', ml: 1 }} />
          </Box>

          {/* Model Badges Pill */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: { xs: 0.8, sm: 1.2 },
              px: { xs: 1.4, sm: 1.8 },
              py: 0.85,
              borderRadius: '9999px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-normal)',
              boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 28px rgba(15,23,42,0.08)',
            }}
          >
            {/* ChatGPT */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="img" src="/Models/Chatgpt.svg" alt="ChatGPT" sx={{ width: 18, height: 18, filter: 'invert(1)' }} />
            </Box>

            {/* Claude */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="img" src="/Models/Claude.svg" alt="Claude" sx={{ width: 18, height: 18 }} />
            </Box>

            {/* Gemini */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="img" src="/Models/Gemini.svg" alt="Gemini" sx={{ width: 18, height: 18 }} />
            </Box>

            {/* Meta Llama */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box component="img" src="/Models/Llama.svg" alt="Llama" sx={{ width: 18, height: 18, filter: 'invert(1)' }} />
            </Box>

            {/* +8 Count Tag */}
            <Box
              sx={{
                px: 1.1,
                py: 0.35,
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-section)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
              }}
            >
              +8
            </Box>
          </Box>
        </Box>
      );
    }

    if (tabId === 'memory') {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', py: { xs: 2, sm: 3 } }}>
          {/* Shared Context Pill */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.85,
              borderRadius: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-normal)',
              boxShadow: isDark ? '0 6px 24px rgba(0,0,0,0.35)' : '0 6px 20px rgba(15,23,42,0.06)',
              zIndex: 2,
            }}
          >
            <StorageIcon sx={{ fontSize: '1.15rem', color: 'var(--text-heading)' }} />
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              Shared Context
            </Typography>
          </Box>

          {/* Dotted Branching Circuit SVG */}
          <Box
            component="svg"
            viewBox="0 0 160 38"
            sx={{ width: 160, height: 38, my: 0.5, overflow: 'visible' }}
          >
            <path
              d="M80 0 L80 18 M80 18 L25 18 L25 38 M80 18 L80 38 M80 18 L135 18 L135 38"
              fill="none"
              stroke={isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.22)'}
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </Box>

          {/* 3 Model Connected Square Badges */}
          <Box sx={{ display: 'flex', gap: { xs: 2.2, sm: 2.8 }, alignItems: 'center', zIndex: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 12px rgba(15,23,42,0.06)',
              }}
            >
              <Box component="img" src="/Models/Chatgpt.svg" alt="ChatGPT" sx={{ width: 22, height: 22, filter: isDark ? 'invert(1)' : 'none' }} />
            </Box>

            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 12px rgba(15,23,42,0.06)',
              }}
            >
              <Box component="img" src="/Models/Claude.svg" alt="Claude" sx={{ width: 22, height: 22 }} />
            </Box>

            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 12px rgba(15,23,42,0.06)',
              }}
            >
              <Box component="img" src="/Models/Gemini.svg" alt="Gemini" sx={{ width: 22, height: 22 }} />
            </Box>
          </Box>
        </Box>
      );
    }

    if (tabId === 'agents') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: { xs: 1.5, sm: 3.5 }, width: '100%', maxWidth: 440, py: { xs: 2, sm: 3 } }}>
          {/* Left: 3 Stacked Agent Chips */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Research Agent', 'Support Agent', 'Ops Agent'].map((agent) => (
              <Box
                key={agent}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: { xs: 1.2, sm: 1.5 },
                  py: 0.6,
                  borderRadius: '8px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-normal)',
                  boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.3)' : '0 2px 8px rgba(15,23,42,0.06)',
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.6)' }} />
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                  {agent}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Center Green Connecting Circuit Lines */}
          <Box
            component="svg"
            viewBox="0 0 46 80"
            sx={{ width: { xs: 32, sm: 46 }, height: 74, overflow: 'visible', flexShrink: 0 }}
          >
            <path
              d="M0 14 L24 14 L38 40 M0 40 L38 40 M0 66 L24 66 L38 40 L46 40"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.6"
            />
          </Box>

          {/* Right: Dark Endpoint Card */}
          <Box
            sx={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              p: { xs: 1.4, sm: 1.8 },
              boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
              minWidth: { xs: 120, sm: 140 },
            }}
          >
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 0.4 }}>
              ENDPOINT
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: '0.78rem', sm: '0.86rem' }, fontWeight: 600 }}>
              <Box component="span" sx={{ color: '#22C55E', fontWeight: 800 }}>POST </Box>
              <Box component="span" sx={{ color: '#F1F5F9' }}>/v1/chat</Box>
            </Typography>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box
      ref={sectionRef}
      id="core-features"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '330vh' },
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Pinned Viewport Container - Perfectly fits within 100vh */}
      <Box
        ref={pinContainerRef}
        sx={{
          position: { xs: 'relative', md: 'sticky' },
          top: 0,
          height: { xs: 'auto', md: '100vh' },
          maxHeight: { md: '100vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: { xs: 6, md: 3 },
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 3, md: 4 } }}>
          {/* Top Pill Badge: • WHY OPENLEDGER */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1.6 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.9,
                px: 1.5,
                py: 0.5,
                borderRadius: '9999px',
                backgroundColor: 'var(--bg-pill)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Removed dot */}
              <Typography
                sx={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Why OpenLedger
              </Typography>
            </Box>
          </Box>

          {/* Two-Column Header matching content from design */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'flex-start' },
              justifyContent: 'space-between',
              gap: { xs: 2, md: 4 },
              mb: { xs: 2.5, md: 3.2 },
            }}
          >
            {/* Headline: Private by default. Uncensored by design. */}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.9rem', sm: '2.5rem', md: '2.85rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                maxWidth: 640,
              }}
            >
              <Box component="span" sx={{ color: 'var(--text-heading)', display: 'block' }}>
                Private by default.
              </Box>
              <Box component="span" sx={{ color: 'var(--text-secondary)', display: 'block' }}>
                Uncensored by design.
              </Box>
            </Typography>

            {/* Subtitle from design */}
            <Typography
              variant="body1"
              sx={{
                color: 'var(--text-secondary)',
                fontSize: { xs: '0.92rem', md: '1rem' },
                lineHeight: 1.6,
                maxWidth: 440,
                pt: { md: 0.8 },
              }}
            >
              Private access to leading AI models, shared memory, and agents without the usual switching or setup.
            </Typography>
          </Box>

          {/* Apple Liquid Glass Floating Tab Bar with Lens Optics & Stretching Pill */}
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 840 },
              mx: 'auto',
              mb: { xs: 2.2, md: 3 },
            }}
          >
            <Box
              ref={tabBarRef}
              sx={{
                position: 'relative',
                width: '100%',
                height: 58,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                p: '6px',
                borderRadius: '9999px',
                backgroundColor: isDark ? 'rgba(20, 24, 30, 0.48)' : 'rgba(255, 255, 255, 0.45)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(8px) saturate(180%)',
                boxShadow: isDark
                  ? '0 20px 45px -12px rgba(0, 0, 0, 0.5), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.22), inset 0 -1px 2px rgba(0, 0, 0, 0.4)'
                  : '0 20px 45px -12px rgba(15, 23, 42, 0.09), 0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.03)',
                boxSizing: 'border-box',
                userSelect: 'none',
              }}
            >
              {/* Apple Liquid Glass Nested Lens Pill with subtle #ff6600 accent tint */}
              <Box
                ref={pillRef}
                sx={{
                  position: 'absolute',
                  top: '6px',
                  bottom: '6px',
                  left: '6px',
                  width: 'calc((100% - 12px) / 4)',
                  height: 46,
                  borderRadius: '9999px',
                  backgroundColor: isPressing
                    ? (isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.1)')
                    : (isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)'),
                  background: isPressing
                    ? (isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.1)')
                    : (isDark
                        ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)'),
                  backdropFilter: 'blur(16px)',
                  border: isDark
                    ? '1px solid rgba(255, 102, 0, 0.28)'
                    : '1px solid rgba(255, 102, 0, 0.2)',
                  boxShadow: isPressing
                    ? (isDark
                        ? '0 6px 18px rgba(0, 0, 0, 0.5), inset 0 2px 3px rgba(255, 255, 255, 0.25)'
                        : '0 4px 12px rgba(15, 23, 42, 0.08), inset 0 2px 3px rgba(255, 255, 255, 0.95)')
                    : (isDark
                        ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.3), inset 0 -0.5px 1px rgba(0, 0, 0, 0.3)'
                        : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -0.5px 1px rgba(0, 0, 0, 0.04)'),
                  transform: isPressing ? 'scale(1.02, 1.15)' : 'scale(1, 1)',
                  transition: 'background 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  willChange: 'transform, left',
                  pointerEvents: 'none',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Specular curved lens rim highlight with warm orange touch */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '12%',
                    right: '12%',
                    height: '2px',
                    background: isDark
                      ? 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.6), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.45), transparent)',
                    borderRadius: '9999px',
                    opacity: isPressing ? 1 : 0.85,
                    transition: 'opacity 0.2s ease',
                  }}
                />
              </Box>

              {TABS.map((tab, idx) => {
                const isActive = activeTab === idx;
                const isItemPressed = pressedIndex === idx;
                const IconComponent = tab.icon;
                return (
                  <Box
                    key={tab.id}
                    id={`tab-btn-${idx}`}
                    data-tabbar-press
                    onPointerDown={() => handlePointerDown(idx)}
                    onClick={() => handleTabClick(idx)}
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      height: 46,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      px: { xs: 0.5, sm: 1.2 },
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      color: isActive
                        ? '#ff6600'
                        : (isDark ? 'rgba(255, 255, 255, 0.55)' : '#64748B'),
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: isActive ? '#ff6600' : (isDark ? '#FFFFFF' : '#1E293B'),
                      },
                    }}
                  >
                    {/* The sink target: contents sink under finger press */}
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: { xs: 0.5, sm: 0.8 },
                        transform: isItemPressed ? 'scale(0.9)' : 'scale(1)',
                        transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
                        pointerEvents: 'none',
                        width: '100%',
                      }}
                    >
                      {IconComponent && (
                        <IconComponent
                          sx={{
                            fontSize: { xs: '1.05rem', sm: '1.18rem' },
                            flexShrink: 0,
                            color: isActive
                              ? '#ff6600'
                              : (isDark ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8'),
                            transition: 'color 0.2s ease',
                          }}
                        />
                      )}
                      <Typography
                        component="span"
                        sx={{
                          fontFamily: '"Inter", -apple-system, sans-serif',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: { xs: '0.72rem', sm: '0.82rem', md: '0.86rem' },
                          lineHeight: 1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          letterSpacing: '-0.01em',
                          color: isActive ? '#ff6600' : 'inherit',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                          {tab.fullLabel || tab.label}
                        </Box>
                        <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
                          {tab.shortLabel || tab.label}
                        </Box>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Feature Display Container - Fluid, Silky Crossfading Panels */}
          <Box
            ref={imageContainerRef}
            sx={{
              position: 'relative',
              width: '100%',
              borderRadius: { xs: '16px', md: '22px' },
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-card)',
              backgroundColor: 'var(--bg-card)',
              height: { xs: '440px', sm: '460px', md: '500px' },
              maxHeight: { md: '56vh' },
            }}
          >
            {TABS.map((tab, idx) => (
              <Box
                key={tab.id}
                ref={(el) => (imageRefs.current[idx] = el)}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: { xs: 2.2, sm: 3.2, md: 3.8 },
                  boxSizing: 'border-box',
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'scale(1)' : 'scale(0.98)',
                  willChange: 'opacity, transform',
                  pointerEvents: activeTab === idx ? 'auto' : 'none',
                }}
              >
                {/* Corner Brackets matching reference aesthetic */}
                <Box sx={{ position: 'absolute', top: 10, left: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>┌</Box>
                <Box sx={{ position: 'absolute', top: 10, right: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>┐</Box>
                <Box sx={{ position: 'absolute', bottom: 10, left: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>└</Box>
                <Box sx={{ position: 'absolute', bottom: 10, right: 10, color: 'var(--text-secondary)', opacity: 0.35, fontSize: '0.78rem', fontFamily: 'monospace', pointerEvents: 'none' }}>┘</Box>

                {/* Top Section: Title, Copper Subtitle, and Description */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
                  <Box sx={{ maxWidth: 680 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '1.25rem', sm: '1.45rem', md: '1.6rem' },
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        mb: 0.4,
                      }}
                    >
                      {tab.label}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.88rem', sm: '0.98rem' },
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.3,
                        mb: 0.4,
                      }}
                    >
                      {tab.tagline}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.82rem', sm: '0.9rem' },
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {tab.description}
                    </Typography>
                  </Box>

                  {tab.hasExplore && (
                    <Box
                      component="a"
                      href={tab.exploreLink || '/models'}
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.6,
                        color: 'var(--text-heading)',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        pt: 0.5,
                        whiteSpace: 'nowrap',
                        transition: 'opacity 0.2s, transform 0.2s',
                        '&:hover': { opacity: 0.8, transform: 'translateX(2px)' },
                      }}
                    >
                      EXPLORE &rarr;
                    </Box>
                  )}
                </Box>

                {/* Center Section: High-Fidelity UI Graphic Preview */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.025)' : '#F5EFEB',
                    borderRadius: '16px',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
                    p: { xs: 1.5, sm: 2.5 },
                    my: 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {renderVisualPreview(tab.id)}
                </Box>

                {/* Bottom Section: Footer Tags Row */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1.2,
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tab.tagLeft}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tab.tagRight}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
