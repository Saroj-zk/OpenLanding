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
      [520, () => setPicked(1)],
      [420, () => setPicked(2)],
      [380, () => setPicked(3)],
      [380, () => setPicked(4)],
      [900, () => setPhase(1)],
      [2200, () => setPhase(2)],
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

        {/* COUNCIL PANEL — the product's own flow: pick the models, name a
            judge, then watch the four answer in parallel while the judge
            reads them. Styling follows ais.openledger.xyz in its light
            theme. Display only; nothing here is operable. */}
        <Box
          ref={panelRef}
          aria-hidden="true"
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', lg: 1060 },
            mx: 'auto',
            borderRadius: '20px',
            overflow: 'hidden',
            border: `1px solid ${C.border}`,
            backgroundColor: C.page,
            boxShadow: '0 20px 48px rgba(15, 23, 42, 0.08)',
            fontFamily: C.font,
            '& *': { fontFamily: 'inherit' },
          }}
        >
          {phase === 0 ? (
            /* ── Pick the council ──────────────────────────────── */
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 1.75 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ display: 'inline-flex', p: '3px', borderRadius: '9999px', backgroundColor: C.chip }}>
                    {['Text', 'Image'].map((t) => (
                      <Typography
                        key={t}
                        sx={{
                          px: 1.6, py: 0.45, borderRadius: '9999px', fontSize: '0.82rem',
                          fontWeight: t === 'Text' ? 600 : 400,
                          color: t === 'Text' ? C.text : C.muted,
                          backgroundColor: t === 'Text' ? C.surface : 'transparent',
                        }}
                      >
                        {t}
                      </Typography>
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: '0.82rem', color: C.muted }}>{picked}/4</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.9 }}>
                  <Scales size={15} color={C.muted} />
                  <Typography sx={{ fontSize: '0.82rem', color: C.textSecondary }}>
                    Judge:{' '}
                    <Box component="span" sx={{ color: C.text, fontWeight: 500 }}>
                      {picked >= 1 ? COUNCIL[0].name : 'None'}
                    </Box>
                  </Typography>
                  {picked >= 1 && (
                    <Typography sx={{ fontSize: '0.8rem', color: C.muted, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                      Clear
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1, px: 1.6, py: 1, borderRadius: '9999px', backgroundColor: C.chip }}>
                  <Search size={14} color={C.muted} />
                  <Typography sx={{ fontSize: '0.84rem', color: C.muted }}>Search models&hellip;</Typography>
                </Box>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.4, py: 1, borderRadius: '10px', backgroundColor: C.chip }}>
                  <Typography sx={{ fontSize: '0.82rem', color: C.text }}>A&ndash;Z</Typography>
                </Box>
              </Box>

              <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                {COUNCIL.map((m, i) => {
                  const on = i < picked;
                  const judge = i === 0 && picked >= 1;
                  return (
                    <Box
                      key={m.name}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1.25,
                        px: { xs: 1.5, sm: 2 }, py: 1.4,
                        borderTop: i === 0 ? 'none' : `1px solid ${C.borderSoft}`,
                        opacity: on ? 1 : 0.45,
                        transition: 'opacity 0.45s ease',
                        ...(judge ? { boxShadow: `inset 0 0 0 1.5px ${C.text}`, borderRadius: '12px' } : null),
                      }}
                    >
                      <Box sx={{ width: 26, height: 26, flexShrink: 0, borderRadius: '50%', backgroundColor: C.chip, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BrandTile code={m.code} size={16} round />
                      </Box>
                      <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.88rem', fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {m.name}
                      </Typography>
                      <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexShrink: 0 }}>
                        <Pill label="Incognito" bg={C.violetBg} fg={C.violetFg} />
                        {m.web && <Pill label="web" bg={C.chip} fg={C.textSecondary} />}
                      </Box>
                      <Box
                        sx={{
                          width: 24, height: 24, flexShrink: 0, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: judge ? C.text : 'transparent',
                          transition: 'background-color 0.35s ease',
                        }}
                      >
                        <Scales size={14} color={judge ? C.onInverse : C.muted} />
                      </Box>
                      <Toggle on={on} C={C} />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ) : (
            /* ── The council answers ───────────────────────────── */
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
                  gap: { xs: 1.5, md: 2 },
                  alignItems: 'start',
                }}
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 1.25, md: 1.5 } }}>
                  {COUNCIL.map((m, i) => (
                    <Box key={m.name} sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, p: 1.75 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.4 }}>
                        <BrandTile code={m.code} size={16} round />
                        <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.84rem', fontWeight: 600, color: C.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.76rem', color: C.muted, flexShrink: 0 }}>{m.secs}s</Typography>
                      </Box>
                      {phase === 1 ? (
                        <Typography sx={{ fontSize: '0.82rem', color: C.muted }}>Generating&hellip;</Typography>
                      ) : (
                        <>
                          <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: C.text, mb: 0.4 }}>{m.pick}</Typography>
                          <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.55, color: C.textSecondary }}>{m.note}</Typography>
                        </>
                      )}
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.25, md: 1.5 } }}>
                  <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, p: 1.75 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.4 }}>
                      <Scales size={15} color={C.text} />
                      <Typography sx={{ flex: 1, fontSize: '0.84rem', fontWeight: 600, color: C.text }}>Summary</Typography>
                      <BrandTile code={COUNCIL[0].code} size={14} round />
                      <Typography sx={{ fontSize: '0.74rem', color: C.muted, whiteSpace: 'nowrap' }}>{COUNCIL[0].name}</Typography>
                    </Box>
                    {phase === 1 ? (
                      <>
                        <Typography sx={{ fontSize: '0.82rem', color: C.muted, mb: 1.2 }}>Reading the answers&hellip;</Typography>
                        {[88, 100, 72].map((w, i) => (
                          <Box key={i} sx={{ height: 9, width: `${w}%`, mb: 0.8, borderRadius: '9999px', backgroundColor: C.chip }} />
                        ))}
                      </>
                    ) : (
                      <>
                        <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: C.text, mb: 0.5 }}>Manten Sushi</Typography>
                        <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.6, color: C.textSecondary }}>
                          Two of the four picked it, and it is the only one that clears an omakase
                          under $100 without dropping to a casual counter.
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}`, p: 1.75 }}>
                    <Typography sx={{ fontSize: '0.84rem', fontWeight: 600, color: C.text, mb: 1.2 }}>Analysis</Typography>
                    {phase === 1
                      ? [100, 84, 94].map((w, i) => (
                          <Box key={i} sx={{ height: 9, width: `${w}%`, mb: 0.8, borderRadius: '9999px', backgroundColor: C.chip }} />
                        ))
                      : (
                        <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.6, color: C.textSecondary }}>
                          The two outliers traded price against experience. Neither held up once the
                          budget was treated as a ceiling rather than a target.
                        </Typography>
                      )}
                  </Box>
                </Box>
              </Box>

              {/* Council composer */}
              <Box sx={{ mt: { xs: 1.5, md: 2 }, borderRadius: '18px', backgroundColor: C.surface, border: `1px solid ${C.border}`, px: 1.75, py: 1.5 }}>
                <Typography sx={{ fontSize: '0.88rem', color: C.muted, mb: 1.4 }}>Ask the council&hellip;</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.7, px: 1.1, py: 0.5, borderRadius: '9999px', backgroundColor: C.chip }}>
                    <Scales size={13} color={C.textSecondary} />
                    <Typography sx={{ fontSize: '0.78rem', color: C.text }}>Council</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, ml: 0.5 }}>
                    {COUNCIL.map((m) => (
                      <BrandTile key={m.name} code={m.code} size={15} round />
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: C.textSecondary, whiteSpace: 'nowrap' }}>4 models</Typography>
                  <Box sx={{ flex: 1 }} />
                  <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '50%', backgroundColor: C.text, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: 11, height: 11, borderRadius: '3px', backgroundColor: C.onInverse }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
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
