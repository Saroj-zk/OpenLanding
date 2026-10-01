import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/context/ThemeContext';
import { BrandTile } from '@/components/ui/LedgerUI';


/* Light theme values from ais.openledger.xyz, so the panel reads as Council
   rather than as a marketing illustration. */
const C = {
  font: '"Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif',
  page: '#F5F4F0',
  surface: '#FFFFFF',
  chip: '#F1F1EF',
  border: '#DDDEE0',
  borderSoft: '#EAE9E6',
  text: '#262626',
  textSecondary: '#6D6C6A',
  muted: '#71717A',
  onInverse: '#F5F4F0',
  violetBg: '#F1EDFC',
  violetFg: '#7C5CD6',
  sendIdle: '#D8D7D3',
};

/* The first entry is the judge, which is how Council marks it. */
const COUNCIL = [
  { code: 'AN', name: 'Claude Opus 5', web: true, secs: '3.3', pick: 'Manten Sushi', note: 'Quality and value without premium pricing.' },
  { code: 'OA', name: 'GPT 5.6 Sol', web: false, secs: '4.1', pick: 'Sushi Tokyo Ten', note: 'Good value omakase, central location.' },
  { code: 'GG', name: 'Gemini 2.5 Pro', web: true, secs: '5.2', pick: 'Sushi no Midori', note: 'More casual and affordable, wide selection.' },
  { code: 'DS', name: 'Deepseek V4 Pro', web: true, secs: '2.6', pick: 'Manten Sushi', note: 'Best balance of quality, experience and price.' },
];

function Scales({ size = 15, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M3 8h18" />
      <path d="M6 8l-3 6h6z" />
      <path d="M18 8l-3 6h6z" />
    </svg>
  );
}

function Search({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function Pill({ label, bg, fg }) {
  return (
    <Box component="span" sx={{ px: 0.85, py: '2px', borderRadius: '9999px', backgroundColor: bg, color: fg, fontSize: '0.66rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
      {label}
    </Box>
  );
}

/* Off is the app's light track; on is its black one. */
function Toggle({ on, C: T }) {
  return (
    <Box
      sx={{
        width: 36, height: 21, flexShrink: 0, borderRadius: '9999px', p: '3px',
        display: 'flex', alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        backgroundColor: on ? T.text : '#E2E1DE',
        transition: 'background-color 0.35s ease',
      }}
    >
      <Box sx={{ width: 15, height: 15, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />
    </Box>
  );
}



export default function WhyAskMultipleModelsSection() {
  const { isDark } = useThemeMode();

  /* 0 picks the council, 1 runs it, 2 shows what came back. picked counts
     the models toggled on while phase 0 is on screen. */
  const [phase, setPhase] = React.useState(0);
  const [picked, setPicked] = React.useState(0);
  const panelRef = React.useRef(null);
  const [live, setLive] = React.useState(false);

  React.useEffect(() => {
    if (!panelRef.current) return undefined;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 });
    io.observe(panelRef.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!live) return undefined;
    const steps = [
      [2000, () => setPhase(1)],
      [700, () => setPicked(1)],
      [460, () => setPicked(2)],
      [420, () => setPicked(3)],
      [420, () => setPicked(4)],
      [1100, () => setPhase(2)],
      [2300, () => setPhase(3)],
      [4200, () => { setPhase(0); setPicked(0); }],
    ];
    let i = 0;
    let t;
    const run = () => {
      const [wait, act] = steps[i % steps.length];
      t = setTimeout(() => { act(); i += 1; run(); }, wait);
    };
    run();
    return () => clearTimeout(t);
  }, [live]);

  const sectionRef = React.useRef(null);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="consensus-mode"
      data-snap
      sx={{
        position: 'relative',
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        minHeight: { xs: 'auto', md: '100vh' },
        pt: { xs: '82px', sm: '86px', md: '76px' },
        pb: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        transition: 'background-color 0.35s ease',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: { xs: 'flex-start', md: 'space-between' }, my: 'auto' }}>

        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 5 } }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Multi-Model Consensus
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' }, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-heading)', mb: 2 }}>
            Ask four models. Get one answer.
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.6, maxWidth: 600, mx: 'auto' }}>
            Ask once and get four perspectives. Council compares the responses and brings the best thinking together in one clear answer.
          </Typography>
        </Box>

        {/* COUNCIL WINDOW — the app, start to finish: the empty state, the
            model list opening out of the composer, the four running, then the
            verdict. One fixed height so the window never resizes under the
            section, with the composer pinned to the foot of it throughout. */}
        <Box
          ref={panelRef}
          aria-hidden="true"
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', lg: 1060 },
            mx: 'auto',
            height: { xs: 'auto', md: 548 },
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `1px solid ${C.border}`,
            backgroundColor: C.page,
            boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)',
            fontFamily: C.font,
            '& *': { fontFamily: 'inherit' },
          }}
        >
          {/* ── Canvas ───────────────────────────────────────────── */}
          <Box sx={{ flex: 1, minHeight: 0, position: 'relative', px: { xs: 2, sm: 3 }, pt: { xs: 3, sm: 4 } }}>
            {phase <= 1 ? (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', pb: { xs: 2, md: 4 } }}>
                <Typography
                  sx={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 600,
                    fontSize: { xs: '1.6rem', sm: '2rem', md: '2.25rem' },
                    lineHeight: 1.2,
                    color: C.text,
                  }}
                >
                  Ask anything.
                  <br />
                  <Box component="span" sx={{ fontStyle: 'italic' }}>Think in the open.</Box>
                </Typography>
                <Typography sx={{ mt: 1.75, fontSize: { xs: '0.85rem', md: '0.92rem' }, lineHeight: 1.6, color: C.textSecondary }}>
                  A private, multi-model AI experience
                  <br />
                  with no account required to start.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ height: '100%', overflow: 'hidden', pb: 1 }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
                    gap: { xs: 1.25, md: 1.75 },
                    alignItems: 'start',
                  }}
                >
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 1.25, md: 1.5 } }}>
                    {COUNCIL.map((m) => (
                      <Box key={m.name} sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, p: 1.6 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
                          <BrandTile code={m.code} size={15} round />
                          <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.82rem', fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {m.name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.74rem', color: C.muted, flexShrink: 0 }}>{m.secs}s</Typography>
                        </Box>
                        {phase === 2 ? (
                          <Typography sx={{ fontSize: '0.8rem', color: C.muted }}>Generating&hellip;</Typography>
                        ) : (
                          <>
                            <Typography sx={{ fontSize: '0.84rem', fontWeight: 600, color: C.text, mb: 0.3 }}>{m.pick}</Typography>
                            <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.5, color: C.textSecondary }}>{m.note}</Typography>
                          </>
                        )}
                      </Box>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, md: 1.5 } }}>
                    <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, p: 1.6 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.9, mb: 1.2 }}>
                        <Scales size={14} color={C.text} />
                        <Typography sx={{ flex: 1, fontSize: '0.82rem', fontWeight: 600, color: C.text }}>Summary</Typography>
                        <BrandTile code={COUNCIL[0].code} size={13} round />
                        <Typography sx={{ fontSize: '0.72rem', color: C.muted, whiteSpace: 'nowrap' }}>{COUNCIL[0].name}</Typography>
                      </Box>
                      {phase === 2 ? (
                        <>
                          <Typography sx={{ fontSize: '0.8rem', color: C.muted, mb: 1 }}>Reading the answers&hellip;</Typography>
                          {[88, 100, 72].map((w, i) => (
                            <Box key={i} sx={{ height: 8, width: `${w}%`, mb: 0.7, borderRadius: '9999px', backgroundColor: C.chip }} />
                          ))}
                        </>
                      ) : (
                        <>
                          <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: C.text, mb: 0.4 }}>Manten Sushi</Typography>
                          <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.55, color: C.textSecondary }}>
                            Two of the four picked it, and it is the only one that clears an omakase
                            under $100 without dropping to a casual counter.
                          </Typography>
                        </>
                      )}
                    </Box>

                    <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, p: 1.6 }}>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: C.text, mb: 1 }}>Analysis</Typography>
                      {phase === 2
                        ? [100, 84].map((w, i) => (
                            <Box key={i} sx={{ height: 8, width: `${w}%`, mb: 0.7, borderRadius: '9999px', backgroundColor: C.chip }} />
                          ))
                        : (
                          <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.55, color: C.textSecondary }}>
                            The outliers traded price against experience, and neither held once the
                            budget was read as a ceiling.
                          </Typography>
                        )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* ── Foot: the picker opens out of the composer ────────── */}
          <Box sx={{ position: 'relative', px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2.5 }, pt: 1 }}>
            {phase === 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 'calc(100% - 4px)',
                  left: { xs: 16, sm: 24 },
                  right: { xs: 16, sm: 24 },
                  zIndex: 4,
                  p: { xs: 1.25, sm: 1.5 },
                  borderRadius: '18px',
                  backgroundColor: C.surface,
                  border: `1px solid ${C.border}`,
                  boxShadow: '0 18px 44px rgba(23, 23, 23, 0.13)',
                  animation: 'olPickerIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 1.35 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4 }}>
                    <Box sx={{ display: 'inline-flex', p: '3px', borderRadius: '9999px', backgroundColor: C.chip }}>
                      {['Text', 'Image'].map((t) => (
                        <Typography
                          key={t}
                          sx={{
                            px: 1.5, py: 0.4, borderRadius: '9999px', fontSize: '0.8rem',
                            fontWeight: t === 'Text' ? 600 : 400,
                            color: t === 'Text' ? C.text : C.muted,
                            backgroundColor: t === 'Text' ? C.surface : 'transparent',
                          }}
                        >
                          {t}
                        </Typography>
                      ))}
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem', color: C.muted }}>{picked}/4</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Scales size={14} color={C.muted} />
                    <Typography sx={{ fontSize: '0.8rem', color: C.textSecondary }}>
                      Judge:{' '}
                      <Box component="span" sx={{ color: C.text, fontWeight: 500 }}>
                        {picked >= 1 ? COUNCIL[0].name : 'None'}
                      </Box>
                    </Typography>
                    {picked >= 1 && (
                      <Typography sx={{ fontSize: '0.78rem', color: C.muted, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                        Clear
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.9, borderRadius: '9999px', backgroundColor: C.chip }}>
                    <Search size={13} color={C.muted} />
                    <Typography sx={{ fontSize: '0.82rem', color: C.muted }}>Search models&hellip;</Typography>
                  </Box>
                  <Box sx={{ px: 1.3, py: 0.9, borderRadius: '10px', backgroundColor: C.chip }}>
                    <Typography sx={{ fontSize: '0.8rem', color: C.text }}>A&ndash;Z</Typography>
                  </Box>
                </Box>

                <Box>
                  {COUNCIL.map((m, i) => {
                    const on = i < picked;
                    const judge = i === 0 && picked >= 1;
                    return (
                      <Box
                        key={m.name}
                        sx={{
                          display: 'flex', alignItems: 'center', gap: 1.1,
                          px: 1.25, py: 1.05,
                          borderRadius: '12px',
                          borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}`,
                          opacity: on ? 1 : 0.42,
                          transition: 'opacity 0.4s ease, box-shadow 0.35s ease',
                          boxShadow: judge ? `inset 0 0 0 1.5px ${C.text}` : 'none',
                        }}
                      >
                        <Box sx={{ width: 24, height: 24, flexShrink: 0, borderRadius: '50%', backgroundColor: C.chip, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BrandTile code={m.code} size={15} round />
                        </Box>
                        <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.86rem', fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.name}
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexShrink: 0 }}>
                          <Pill label="Incognito" bg={C.violetBg} fg={C.violetFg} />
                          {m.web && <Pill label="web" bg={C.chip} fg={C.textSecondary} />}
                        </Box>
                        <Box
                          sx={{
                            width: 23, height: 23, flexShrink: 0, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: judge ? C.text : 'transparent',
                            transition: 'background-color 0.35s ease',
                          }}
                        >
                          <Scales size={13} color={judge ? C.onInverse : C.muted} />
                        </Box>
                        <Toggle on={on} C={C} />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            {/* Composer, pinned */}
            <Box sx={{ borderRadius: '18px', backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.9, pt: 1.5, pb: 1.1 }}>
                <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.88rem', color: C.muted, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {phase >= 2 ? 'Ask the council\u2026' : 'Send a message\u2026  (@ to mention, / for commands)'}
                </Typography>
                <Box sx={{ display: 'flex', color: C.muted, flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.4, pb: 1.4 }}>
                {phase >= 2 ? (
                  <>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1, py: 0.45, borderRadius: '9999px', backgroundColor: C.chip }}>
                      <Scales size={12} color={C.textSecondary} />
                      <Typography sx={{ fontSize: '0.76rem', color: C.text }}>Council</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.35, ml: 0.3 }}>
                      {COUNCIL.map((m) => (
                        <BrandTile key={m.name} code={m.code} size={14} round />
                      ))}
                    </Box>
                    <Typography sx={{ fontSize: '0.78rem', color: C.textSecondary, whiteSpace: 'nowrap' }}>4 models</Typography>
                  </>
                ) : (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 0.7, py: 0.4, borderRadius: '16px', backgroundColor: phase === 1 ? C.chip : 'transparent', transition: 'background-color 0.25s ease' }}>
                    <BrandTile code={COUNCIL[1].code} size={16} round />
                    <Typography sx={{ fontSize: '0.84rem', color: C.text, whiteSpace: 'nowrap' }}>
                      {COUNCIL[1].name}
                    </Typography>
                    <Box sx={{ display: 'flex', color: C.muted, transform: phase === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </Box>
                  </Box>
                )}

                <Box sx={{ flex: 1 }} />

                <Box sx={{ width: 30, height: 30, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                  </svg>
                </Box>

                <Box
                  sx={{
                    width: 34, height: 34, flexShrink: 0, borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: phase === 2 ? C.text : C.sendIdle,
                    color: phase === 2 ? C.onInverse : C.textSecondary,
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {phase === 2 ? (
                    <Box sx={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: C.onInverse }} />
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Suggestion chips, as the app shows them before a first message */}
            {phase === 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 1.5 }}>
                {['Weather', 'Code', 'Write', 'Analyze', 'Brainstorm'].map((t) => (
                  <Box
                    key={t}
                    sx={{
                      px: 1.6, py: 0.7, borderRadius: '9999px',
                      backgroundColor: C.surface, border: `1px solid ${C.border}`,
                    }}
                  >
                    <Typography sx={{ fontSize: '0.8rem', color: C.text, whiteSpace: 'nowrap' }}>{t}</Typography>
                  </Box>
                ))}
              </Box>
            )}

            <style>{`
              @keyframes olPickerIn {
                from { opacity: 0; transform: translateY(8px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </Box>
        </Box>

        {/* BOTTOM CAPTION & CTA */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 3, md: 4 }, gap: 2 }}>
          <Typography sx={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: { xs: '0.95rem', md: '1.05rem' }, fontWeight: 500 }}>
            A verifiable way to query frontier AI and get consensus truth.
          </Typography>

          {/* Try Consensus Button */}
          <Box
            component="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer');
              }
            }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              px: { xs: 4, sm: 5 },
              py: { xs: 1, sm: 1.2 },
              borderRadius: '9999px',
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              background: isDark
                ? 'linear-gradient(180deg, rgba(255, 115, 30, 0.85) 0%, rgba(220, 80, 0, 0.95) 100%)'
                : 'linear-gradient(180deg, rgba(255, 125, 40, 0.85) 0%, rgba(240, 90, 0, 0.95) 100%)',
              color: '#ffffff',
              border: isDark ? '1px solid rgba(255, 160, 100, 0.4)' : '1px solid rgba(255, 140, 60, 0.5)',
              boxShadow: isDark
                ? '0 8px 24px rgba(255, 102, 0, 0.4), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35)'
                : '0 8px 24px rgba(255, 102, 0, 0.3), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.45)',
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                background: isDark
                  ? 'linear-gradient(180deg, rgba(255, 130, 45, 0.9) 0%, rgba(235, 90, 0, 1) 100%)'
                  : 'linear-gradient(180deg, rgba(255, 140, 55, 0.9) 0%, rgba(255, 100, 0, 1) 100%)',
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 12px 32px rgba(255, 102, 0, 0.5), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.45)'
                  : '0 12px 32px rgba(255, 102, 0, 0.4), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.55)',
              },
              '&:active': {
                transform: 'scale(0.96)',
              },
            }}
          >
            Try Consensus Now
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
