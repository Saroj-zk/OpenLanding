import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, BrandTile } from '@/components/ui/LedgerUI';
import { useThemeMode } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';

const MemoryChatDemo = dynamic(() => import('@/components/MemoryChatDemo'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1180,
        height: 520,
        mx: 'auto',
        borderRadius: { xs: '20px', md: '28px' },
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-normal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 12px #FF6600' }} />
    </Box>
  ),
});

const MODEL_NAMES = {
  OA: 'GPT-4o',
  AN: 'Claude',
  GG: 'Gemini',
  DS: 'DeepSeek',
};

/* =====================================================================
   /memory - Unified Memory
   Rebuilt according to the master design specifications and reference.
   ===================================================================== */

const REMEMBERS = [
  {
    glyph: 'sliders',
    term: 'Preferences',
    detail: 'How you like things written, explained, recommended, or structured.',
    entries: ['Vegetarian', 'Concise answers', 'Avoid crowded places'],
  },
  {
    glyph: 'layers',
    term: 'Ongoing Context',
    detail: 'The projects, plans, research, and tasks you’re currently working on.',
    entries: ['Japan trip', 'October', '7 days'],
  },
  {
    glyph: 'note',
    term: 'Important Details',
    detail: 'Information that helps future responses understand what you’re trying to do.',
    entries: ['Budget: $2,000', 'Travelling solo'],
  },
  {
    glyph: 'check',
    term: 'Decisions',
    detail: 'Choices you’ve already made, so AI doesn’t keep taking you back to the beginning.',
    entries: ['Kyoto added', 'Hotel selected'],
  },
];

const MECHANICS = [
  {
    step: '01',
    term: 'Remember',
    line: 'Context worth keeping.',
    detail: 'Useful preferences, decisions, and ongoing context are identified from your conversations.',
  },
  {
    step: '02',
    term: 'Unify',
    line: 'One memory, independent of the model.',
    detail: 'Your context lives in a shared memory layer instead of being locked inside individual AI models.',
  },
  {
    step: '03',
    term: 'Retrieve',
    line: 'Only what’s relevant.',
    detail: 'When you ask something new, relevant context is retrieved instead of passing your entire conversation history to the model.',
  },
  {
    step: '04',
    term: 'Control',
    line: 'You decide what stays.',
    detail: 'Review, update, or remove memories and control what context is available to AI.',
  },
];

const STACK_MODELS = ['OA', 'AN', 'GG', 'DS'];
const STACK_FACTS = ['Preferences', 'Projects', 'Decisions', 'Context'];

function SpecLine({ items, sx = {} }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, ...sx }}>
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && (
            <Typography component="span" sx={{ fontSize: '0.6rem', color: 'var(--border-strong)', userSelect: 'none' }}>
              ◆
            </Typography>
          )}
          <Typography
            component="span"
            sx={{
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            {item}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
}

function Eyebrow({ children }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.2,
        color: '#FF6600',
        mb: 2.5,
        fontSize: '0.78rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: '#FF6600',
          boxShadow: '0 0 10px #FF6600',
        }}
      />
      {children}
    </Box>
  );
}

function CatGlyph({ name }) {
  const s = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <svg viewBox="0 0 20 20" width={18} height={18} aria-hidden="true" style={{ display: 'block' }}>
      {name === 'sliders' && (
        <>
          <path d="M3 6h14M3 14h14" {...s} />
          <circle cx="8" cy="6" r="2.1" {...s} />
          <circle cx="13" cy="14" r="2.1" {...s} />
        </>
      )}
      {name === 'layers' && (
        <>
          <path d="M10 2.6 17.4 6.5 10 10.4 2.6 6.5z" {...s} />
          <path d="M2.6 10.5 10 14.4l7.4-3.9" {...s} />
        </>
      )}
      {name === 'note' && (
        <>
          <rect x="4" y="2.8" width="12" height="14.4" rx="2.2" {...s} />
          <path d="M7.2 7h5.6M7.2 10.4h5.6M7.2 13.8h3.2" {...s} />
        </>
      )}
      {name === 'check' && (
        <>
          <circle cx="10" cy="10" r="7.4" {...s} />
          <path d="m6.6 10.2 2.3 2.3 4.5-4.7" {...s} />
        </>
      )}
    </svg>
  );
}

function Drop({ delay = 0, height = 24 }) {
  return (
    <Box
      sx={{
        position: 'relative',
        mx: 'auto',
        display: 'block',
        height,
        width: '1px',
        overflow: 'hidden',
        backgroundColor: 'var(--border-normal)',
      }}
      aria-hidden="true"
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FF6600',
          boxShadow: '0 0 8px #FF6600',
          animation: 'travelY 2.2s ease-in-out infinite',
          animationDelay: `${delay}ms`,
          '@keyframes travelY': {
            '0%': { transform: 'translateY(-100%)' },
            '50%, 100%': { transform: 'translateY(100%)' },
          },
        }}
      />
    </Box>
  );
}

function MemoryStack() {
  const { isDark } = useThemeMode();

  return (
    <Box
      sx={{
        p: { xs: 3, sm: 5 },
        borderRadius: { xs: '20px', md: '28px' },
        backgroundColor: isDark ? 'rgba(14, 16, 21, 0.8)' : '#FFFFFF',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark
          ? '0 20px 50px -10px rgba(0, 0, 0, 0.6)'
          : '0 20px 50px -10px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          mb: 4,
        }}
      >
        Architecture
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* You Badge */}
        <Box
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: '9999px',
            border: '1px solid var(--border-normal)',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
            color: 'var(--text-heading)',
            fontSize: '0.85rem',
            fontWeight: 700,
          }}
        >
          You
        </Box>

        <Drop height={26} />

        {/* Your Unified Memory Container */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 580,
            borderRadius: '16px',
            p: { xs: 2.5, sm: 3 },
            border: '1px solid rgba(255, 102, 0, 0.45)',
            background: isDark
              ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.12) 0%, rgba(255, 102, 0, 0.03) 100%)'
              : 'linear-gradient(180deg, rgba(255, 102, 0, 0.08) 0%, rgba(255, 102, 0, 0.02) 100%)',
            boxShadow: '0 14px 36px -12px rgba(255, 102, 0, 0.35)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 2 }}>
            <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: '#FF6600' }}>
              Your Unified Memory
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Encrypted & Yours
            </Typography>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {STACK_FACTS.map((f) => (
              <Box
                key={f}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '9999px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                }}
              >
                {f}
              </Box>
            ))}
          </Box>
        </Box>

        <Drop delay={200} height={26} />

        {/* Relevant context filtered slice */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 380,
            borderRadius: '12px',
            border: '1px dashed var(--border-strong)',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            px: 3,
            py: 1.5,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Relevant Context (Filtered Slice)
          </Typography>
        </Box>

        {/* Branching Lines Out to Models */}
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 440, mt: 0 }} aria-hidden="true">
          <Drop delay={400} height={18} />
          <Box
            sx={{
              position: 'absolute',
              left: '12.5%',
              right: '12.5%',
              top: 18,
              height: '1px',
              backgroundColor: 'var(--border-normal)',
            }}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {STACK_MODELS.map((code, i) => (
              <Drop key={code} delay={520 + i * 120} height={18} />
            ))}
          </Box>
        </Box>

        {/* 4 Models Row */}
        <Box sx={{ display: 'grid', width: '100%', maxWidth: 440, gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {STACK_MODELS.map((code) => (
            <Box key={code} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <BrandTile code={code} size={34} />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {MODEL_NAMES[code] || code}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography component="div" sx={{ mt: 4.5, textAlign: 'center', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          The model gets the context it needs.{' '}
          <Box component="span" sx={{ fontWeight: 700, color: '#FF6600' }}>
            Your memory stays yours.
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default function MemoryPage() {
  const { isDark } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      <Head>
        <title>Unified Memory - OpenLedger</title>
        <meta
          name="description"
          content="One memory across every model. Your preferences, projects, decisions, and context live in one private memory, independent of the model you choose."
        />
      </Head>

      <PageHeader />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        {/* =================================================================
            01 INTRO SECTION
            ================================================================= */}
        <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
          <Reveal>
            <Eyebrow>Unified Memory</Eyebrow>
            <Typography
              component="h1"
              sx={{
                maxWidth: '18ch',
                fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                mb: 3,
              }}
            >
              One memory across every model.
            </Typography>
            <Typography
              sx={{
                maxWidth: '60ch',
                fontSize: { xs: '1.05rem', sm: '1.15rem' },
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              Your preferences, projects, decisions, and context live in one private memory, independent of the model
              you choose. Switch models without starting over.
            </Typography>
          </Reveal>

          <Reveal delay={140}>
            <SpecLine
              items={['User controlled', 'Cross-model', 'Private']}
              sx={{ mt: 5, pt: 4, borderTop: '1px solid var(--border-subtle)' }}
            />
          </Reveal>
        </Box>

        {/* =================================================================
            02 IN ACTION SECTION (INTERACTIVE DEMO)
            ================================================================= */}
        <Box component="section" sx={{ scrollMarginTop: '96px', pb: { xs: 10, md: 14 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              <Eyebrow>Same context. Different model.</Eyebrow>
              <Typography
                component="h2"
                sx={{
                  maxWidth: '22ch',
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-heading)',
                  mb: 4,
                }}
              >
                Switch models without repeating yourself.
              </Typography>
            </Reveal>

            <Reveal delay={80} sx={{ mt: 2 }}>
              <MemoryChatDemo />
            </Reveal>

            <Reveal delay={140} sx={{ mt: 3.5, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#FF6600' }}>
                You only said it once. Every model had the context.
              </Typography>
            </Reveal>
          </Box>
        </Box>

        {/* =================================================================
            03 WHAT IT REMEMBERS SECTION (4 CATEGORY CARDS)
            ================================================================= */}
        <Box component="section" sx={{ scrollMarginTop: '96px', pb: { xs: 10, md: 14 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              <Eyebrow>More than chat history</Eyebrow>
              <Typography
                component="h2"
                sx={{
                  maxWidth: '20ch',
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-heading)',
                  mb: 2,
                }}
              >
                It remembers what matters.
              </Typography>
              <Typography
                sx={{
                  maxWidth: '58ch',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  mb: 6,
                }}
              >
                Unified Memory builds a private understanding of the context you choose to carry across conversations
                and models.
              </Typography>
            </Reveal>

            <Grid container spacing={2.5}>
              {REMEMBERS.map((cat, i) => (
                <Grid item xs={12} sm={6} lg={3} key={cat.term}>
                  <Reveal delay={i * 70} sx={{ height: '100%' }}>
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 3,
                        borderRadius: '20px',
                        backgroundColor: isDark ? 'rgba(14, 16, 21, 0.6)' : '#FFFFFF',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          borderColor: 'rgba(255, 102, 0, 0.4)',
                          boxShadow: '0 12px 30px -10px rgba(255, 102, 0, 0.25)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'rgba(255, 102, 0, 0.12)',
                          border: '1px solid rgba(255, 102, 0, 0.35)',
                          color: '#FF6600',
                          mb: 2.5,
                        }}
                      >
                        <CatGlyph name={cat.glyph} />
                      </Box>

                      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                        {cat.term}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: '0.86rem',
                          lineHeight: 1.55,
                          color: 'var(--text-secondary)',
                          minHeight: 64,
                          mb: 2.5,
                        }}
                      >
                        {cat.detail}
                      </Typography>

                      <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {cat.entries.map((entry) => (
                          <Box key={entry} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <Box
                              sx={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                backgroundColor: '#FF6600',
                                boxShadow: '0 0 6px rgba(255, 102, 0, 0.6)',
                                flexShrink: 0,
                              }}
                            />
                            <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                              {entry}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Reveal>
                </Grid>
              ))}
            </Grid>

            <Reveal delay={140} sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: '#FF6600' }}>
                Less repeating. More relevant responses.
              </Typography>
            </Reveal>
          </Box>
        </Box>

        {/* =================================================================
            04 UNDER THE HOOD SECTION (ARCHITECTURE & MECHANICS)
            ================================================================= */}
        <Box component="section" sx={{ scrollMarginTop: '96px', pb: { xs: 12, md: 16 } }}>
          <Rule />
          <Box sx={{ py: { xs: 7, md: 9 } }}>
            <Reveal>
              <Eyebrow>How Unified Memory works</Eyebrow>
              <Typography
                component="h2"
                sx={{
                  maxWidth: '24ch',
                  fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-heading)',
                  mb: 2,
                }}
              >
                Your memory stays with you, not the model.
              </Typography>
              <Typography
                sx={{
                  maxWidth: '62ch',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  mb: 6,
                }}
              >
                Your context lives in one private memory layer, independent of any AI model. When you switch models,
                only the relevant context is made available so the conversation can continue without starting over.
              </Typography>
            </Reveal>

            {/* Architecture Stack */}
            <Reveal delay={80} sx={{ mb: 4 }}>
              <MemoryStack />
            </Reveal>

            {/* 4 Connected Mechanics Steps */}
            <Reveal delay={140}>
              <Box
                sx={{
                  borderRadius: { xs: '20px', md: '24px' },
                  backgroundColor: isDark ? 'rgba(14, 16, 21, 0.7)' : '#FFFFFF',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                }}
              >
                {MECHANICS.map((item, i) => (
                  <Box
                    key={item.term}
                    sx={{
                      p: { xs: 3, sm: 3.5 },
                      position: 'relative',
                      borderBottom: { xs: '1px solid var(--border-subtle)', sm: i < 2 ? '1px solid var(--border-subtle)' : 'none', lg: 'none' },
                      borderRight: { lg: i < 3 ? '1px solid var(--border-subtle)' : 'none', sm: i % 2 === 0 ? '1px solid var(--border-subtle)' : 'none' },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', mb: 1.5, letterSpacing: '0.04em' }}>
                      {item.step} · {item.term}
                    </Typography>
                    <Typography sx={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                      {item.line}
                    </Typography>
                    <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </Typography>

                    {i < MECHANICS.length - 1 && (
                      <Box
                        sx={{
                          display: { xs: 'none', lg: 'flex' },
                          position: 'absolute',
                          right: -12,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          zIndex: 2,
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: isDark ? '#161922' : '#FFFFFF',
                          border: '1px solid var(--border-normal)',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--text-secondary)',
                          fontSize: '0.75rem',
                        }}
                      >
                        →
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Reveal>

            {/* CTA Buttons Row */}
            <Reveal delay={180} sx={{ mt: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
              <Button
                component="a"
                href="#demo"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                sx={{
                  px: 4,
                  py: 1.6,
                  borderRadius: '9999px',
                  backgroundColor: '#FF6600',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  boxShadow: '0 8px 28px rgba(255, 102, 0, 0.35)',
                  '&:hover': {
                    backgroundColor: '#e65c00',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Try Interactive Demo
              </Button>

              <Link href="/models" passHref style={{ textDecoration: 'none' }}>
                <Button
                  sx={{
                    px: 3.5,
                    py: 1.6,
                    borderRadius: '9999px',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                    border: '1px solid var(--border-normal)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  See every model
                </Button>
              </Link>

              <SpecLine
                items={['Remember', 'Unify', 'Retrieve', 'Control']}
                sx={{ ml: { xs: 0, lg: 'auto' }, display: { xs: 'none', md: 'flex' } }}
              />
            </Reveal>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
