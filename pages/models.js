import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useThemeMode } from '@/context/ThemeContext';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, ProviderTile } from '@/components/ui/LedgerUI';
import { MODELS, KINDS, PROVIDERS, MODEL_TOTAL } from '@/data/catalog';

/* Flagship showcase cards */
const FLAGSHIP_MODELS = [
  {
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    code: 'DS',
    logo: '/Models/DeepSeek.svg',
    context: '64K',
    tag: 'Deep Reasoning',
    desc: 'Open weights, chain-of-thought mathematical proof, and unfiltered logic.',
    color: '#4D6BFE',
  },
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    code: 'AN',
    logo: '/Models/Claude.svg',
    context: '200K',
    tag: 'Code & Analysis',
    desc: 'State-of-the-art programming, refactoring, and multi-file architecture.',
    color: '#D97757',
  },
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    code: 'OA',
    logo: '/Models/Chatgpt.svg',
    context: '128K',
    tag: 'Multimodal Flagship',
    desc: 'Rapid everyday reasoning, vision analysis, and audio understanding.',
    color: '#10A37F',
  },
  {
    name: 'Gemini 2.5 Pro',
    provider: 'Google',
    code: 'GG',
    logo: '/Models/Gemini.svg',
    context: '1M+',
    tag: 'Massive Context',
    desc: 'Ingest whole Git repositories, hours of video, and hundred-page PDFs.',
    color: '#4B6FD8',
  },
  {
    name: 'FLUX.1 [dev]',
    provider: 'Black Forest Labs',
    code: 'BF',
    logo: '/Models/Flux.svg',
    context: '2K Res',
    tag: 'Photoreal Image',
    desc: 'Superior typography rendering, prompt adherence, and photoreal output.',
    color: '#FF6600',
  },
  {
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    code: 'MT',
    logo: '/Models/Llama.svg',
    context: '128K',
    tag: 'Open Weights',
    desc: 'High throughput, customizable agent workflows with zero lock-in.',
    color: '#1d65c1',
  },
];

export default function ModelsPage() {
  const { isDark } = useThemeMode();
  const [selectedKind, setSelectedKind] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const getPrimaryCtaSx = (isDark) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 102, 0, 0.12)',
    color: '#FF6600',
    px: 4.5,
    py: 1.8,
    borderRadius: '9999px',
    fontSize: '1rem',
    fontWeight: 700,
    textDecoration: 'none',
    letterSpacing: '0.02em',
    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
    backdropFilter: 'blur(12px)',
    '&:hover': {
      backgroundColor: 'rgba(255, 102, 0, 0.18)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
    },
  });

  const filteredModels = React.useMemo(() => {
    return MODELS.filter((model) => {
      const matchesKind = selectedKind === 'all' || model.kind === selectedKind;
      const matchesSearch =
        !searchQuery.trim() ||
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (model.description && model.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (model.detail && model.detail.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesKind && matchesSearch;
    });
  }, [selectedKind, searchQuery]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px) saturate(180%)', position: 'relative', overflowX: 'hidden' }}>
      <Head>
        <title>AI Models Catalog — 50+ Frontier Models in One Subscription | OpenLedger</title>
        <meta
          name="description"
          content="Access GPT-4o, Claude 3.5 Sonnet, DeepSeek R1, Gemini 2.5, FLUX.1 and 50+ premier models in one unified subscription with zero tracking."
        />
      </Head>

      <PageHeader />

      {/* Hero with homepage styling */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 19 },
          pb: { xs: 14, md: 18 },
          backgroundImage: 'url(/images/hero_BG.png)',
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#EEF0F0',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: { xs: 5, lg: 8 },
            }}
          >
            {/* Center Copy */}
            <Reveal>
              <Box sx={{ maxWidth: '56rem', mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1.2,
                    color: '#FF6600',
                    mb: 3,
                    px: 1.8,
                    py: 0.6,
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 102, 0, 0.08)',
                    border: '1px solid rgba(255, 102, 0, 0.25)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                  Unified AI Catalog
                </Box>

                <Typography
                  component="h1"
                  sx={{
                    fontFamily: '"Inter", -apple-system, sans-serif',
                    fontSize: { xs: '2.8rem', sm: '3.8rem', md: '4.8rem' },
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.035em',
                    color: 'rgb(71, 85, 105)', // Homepage text color
                    mb: 3,
                  }}
                >
                  Every model.{' '}
                  <Box component="span" sx={{ color: '#FF6600' }}>
                    One subscription.
                  </Box>
                </Typography>

                <Typography
                  sx={{
                    mx: 'auto',
                    maxWidth: '56ch',
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    lineHeight: 1.65,
                    color: 'rgb(100, 116, 139)', // Homepage secondary text color
                    mb: 4,
                  }}
                >
                  Text, code, vision, images, audio, and music from every frontier provider. Pick any model by name, or use our smart router to automatically direct queries to the best model for the task.
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5, justifyContent: 'center' }}>
                  <Box
                    component="a"
                    href="https://ais.openledger.xyz/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={getPrimaryCtaSx(isDark)}
                  >
                    Launch All Models →
                  </Box>
                  <Box
                    component="a"
                    href="#catalog-list"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'rgb(71, 85, 105)',
                      px: 3.5,
                      py: 1.8,
                      borderRadius: '9999px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      border: '1px solid rgba(0,0,0,0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: '#FF6600',
                        color: '#FF6600',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Explore Model List ↓
                  </Box>
                </Box>
              </Box>
            </Reveal>

            {/* Bottom Telemetry Cards */}
            <Reveal delay={110}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                  gap: 2.5,
                  width: '100%',
                }}
              >
                {[
                  { value: `${MODEL_TOTAL}+`, label: 'Active Models', desc: 'Frontier reasoning, vision & media', accent: true },
                  { value: `${PROVIDERS.length}`, label: 'Compute Providers', desc: 'OpenAI, Anthropic, Google & more', accent: false },
                  { value: '1M+', label: 'Max Context', desc: 'Ingest massive codebases & books', accent: false },
                  { value: '0s', label: 'Data Retention', desc: 'Stateless execution in RAM only', accent: false },
                ].map((stat, i) => (
                  <Box
                    key={stat.label}
                    sx={{
                      p: { xs: 3, md: 3.5 },
                      borderRadius: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      textAlign: 'left',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderColor: 'rgba(255, 102, 0, 0.3)',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255,102,0,0.1), inset 0 0 0 1px #FFF',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '3px',
                        background: stat.accent ? 'linear-gradient(90deg, #FF6600, #ff8533)' : 'transparent',
                        borderRadius: '4px 4px 0 0',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        fontWeight: 800,
                        color: '#FF6600',
                        lineHeight: 1,
                        letterSpacing: '-0.03em',
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'rgb(71, 85, 105)' }}>
                      {stat.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.76rem', color: 'rgb(100, 116, 139)', mt: 0.4 }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>
        </Container>

        {/* Dynamic Curved Bottom Divider - matching homepage */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            width: '100%',
            height: { xs: 40, sm: 60, md: 80 },
            pointerEvents: 'none',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path
              d="M 0,80 Q 720,0 1440,80 L 1440,85 L 0,85 Z"
              fill="#FFFFFF"
            />
          </svg>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        {/* ── Section 2: Flagship Models Showcase Grid ───────────── */}
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box sx={{ textAlign: 'center', maxWidth: '42rem', mx: 'auto', mb: { xs: 5, md: 6 } }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600' }} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Premier Lineup
                </Typography>
              </Box>
              <Typography component="h2" sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.03em', lineHeight: 1.2 }}>
                Flagship Intelligence<br />at your fingertips.
              </Typography>
            </Box>
          </Reveal>

          <Box
            sx={{
              mt: 4.5,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {FLAGSHIP_MODELS.map((model, i) => (
              <Reveal key={model.name} delay={i * 80} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '100%',
                    p: 3.5,
                    borderRadius: 4,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      borderColor: '#FF6600',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 40px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255,102,0,0.1), inset 0 0 0 1px #FFF',
                    },
                  }}
                >
                  <Box>
                    {/* Top Row: Logo, Provider, Context badge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2.5,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={model.logo}
                            alt={model.provider}
                            sx={{
                              width: 24,
                              height: 24,
                              objectFit: 'contain',
                              filter: isDark && model.provider === 'OpenAI' ? 'invert(1)' : 'none',
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                            {model.name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            {model.provider}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          px: 1.4,
                          py: 0.4,
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255,102,0,0.1)',
                          border: '1px solid rgba(255,102,0,0.25)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: '#FF6600',
                        }}
                      >
                        {model.context}
                      </Box>
                    </Box>

                    {/* Tag & Description */}
                    <Box
                      sx={{
                        display: 'inline-flex',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        px: 1.4,
                        py: 0.3,
                        borderRadius: '9999px',
                        mb: 1.5,
                      }}
                    >
                      {model.tag}
                    </Box>
                    <Typography sx={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {model.desc}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
                      <Typography sx={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Live on API & Chat
                      </Typography>
                    </Box>
                    <Box
                      component="a"
                      href="https://ais.openledger.xyz/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#FF6600',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Chat →
                    </Box>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        {/* ── Section 3: Multi-Model Consensus Visual Feature ────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0,1.1fr) minmax(0,0.9fr)' },
              alignItems: 'center',
            }}
          >
            <Reveal>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  color: '#FF6600',
                  mb: 2,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Smart Routing & Consensus
              </Box>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  maxWidth: '22ch',
                  mb: 2.5,
                }}
              >
                Ask one model.{' '}
                <Box component="span" sx={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                  Or query the whole council.
                </Box>
              </Typography>
              <Typography sx={{ maxWidth: '56ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 4 }}>
                No single AI model is best at everything. Claude dominates code refactors; DeepSeek R1 dominates math and proofs; GPT-4o excels at everyday speed; Gemini handles whole codebases.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  ['Parallel Comparison', 'Run the same prompt simultaneously across Claude, GPT-4o, and DeepSeek.'],
                  ['Optimal Cost Routing', 'Save up to 60% tokens by routing lighter queries to lightweight models.'],
                  ['Unified Context Memory', 'Your session memory persists regardless of which model you switch to.'],
                ].map(([title, body]) => (
                  <Box key={title} sx={{ p: 2, borderRadius: 2.5, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)',
                    backdropFilter: 'blur(20px) saturate(180%)' }}>
                    <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', mb: 0.3 }}>
                      {title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      {body}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>

            {/* Right Visual Image Card */}
            <Reveal delay={120}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
                  backgroundColor: 'var(--bg-card)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <Box
                  component="img"
                  src="/images/multimodel.jpg"
                  alt="OpenLedger Multi-Model Consensus Architecture"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 4: Searchable Full Catalog Table ──────────── */}
        <Rule />
        <Box id="catalog-list" sx={{ py: { xs: 8, md: 12 } }}>
          <Reveal>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 3, mb: 4 }}>
              <Box>
                <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
                  Full Model Catalog
                </Typography>
                <Typography sx={{ fontSize: '0.92rem', color: 'var(--text-secondary)', mt: 0.5 }}>
                  Showing {filteredModels.length} of {MODELS.length} available models
                </Typography>
              </Box>

              {/* Search Box */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2.5,
                  py: 1.2,
                  borderRadius: '9999px',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--bg-card)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                  width: { xs: '100%', md: 340 },
                  transition: 'border-color 0.2s',
                  '&:focus-within': { borderColor: '#FF6600' },
                }}
              >
                <SearchIcon sx={{ fontSize: '1.2rem', color: 'var(--text-muted)' }} />
                <InputBase
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search model, provider, keyword..."
                  sx={{
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                    width: '100%',
                    '& input::placeholder': { color: 'var(--text-muted)', opacity: 1 },
                  }}
                />
              </Box>
            </Box>

            {/* Filter Pills */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              <Box
                onClick={() => setSelectedKind('all')}
                sx={{
                  px: 2.2,
                  py: 0.8,
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedKind === 'all' ? '#FF6600' : 'var(--border-normal)',
                  backgroundColor: selectedKind === 'all' ? '#FF6600' : 'var(--bg-card)',
                  color: selectedKind === 'all' ? '#fff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  '&:hover': { borderColor: '#FF6600', color: selectedKind === 'all' ? '#fff' : '#FF6600' },
                }}
              >
                All Modalities ({MODELS.length})
              </Box>
              {KINDS.map((k) => (
                <Box
                  key={k.id}
                  onClick={() => setSelectedKind(k.id)}
                  sx={{
                    px: 2.2,
                    py: 0.8,
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: selectedKind === k.id ? '#FF6600' : 'var(--border-normal)',
                    backgroundColor: selectedKind === k.id ? '#FF6600' : 'var(--bg-card)',
                    color: selectedKind === k.id ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#FF6600', color: selectedKind === k.id ? '#fff' : '#FF6600' },
                  }}
                >
                  {k.label} ({MODELS.filter((m) => m.kind === k.id).length})
                </Box>
              ))}
            </Box>
          </Reveal>

          {/* Model rows */}
          {/* One table, not fifty-five cards. Hairline rows keep a long
              catalogue scannable and let the columns line up down the page. */}
          <Reveal delay={60}>
            <Box
              sx={{
                borderRadius: { xs: '14px', md: '16px' },
                border: '1px solid var(--border-normal)',
                overflow: 'hidden',
              }}
            >
              {/* Column headings */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'grid' },
                  gridTemplateColumns: 'auto minmax(0, 2.1fr) minmax(0, 1.15fr) 92px 84px',
                  alignItems: 'center',
                  gap: 3,
                  px: 3,
                  py: 1.75,
                  backgroundColor: 'var(--bg-glass)',
                  borderBottom: '1px solid var(--border-normal)',
                }}
              >
                <Box sx={{ width: 32 }} />
                {['Model', 'Best for', 'Context', ''].map((label, i) => (
                  <Typography
                    key={label || i}
                    sx={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {label}
                  </Typography>
                ))}
              </Box>

              {filteredModels.map((model, idx) => (
                <Box
                  key={model.name}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'auto minmax(0, 1fr)',
                      md: 'auto minmax(0, 2.1fr) minmax(0, 1.15fr) 92px 84px',
                    },
                    alignItems: 'center',
                    columnGap: 3,
                    rowGap: 1,
                    px: { xs: 2, md: 3 },
                    py: { xs: 2.25, md: 2.5 },
                    borderTop: idx === 0 ? 'none' : '1px solid var(--border-subtle)',
                    transition: 'background-color 0.2s ease',
                    '&:hover': { backgroundColor: 'var(--bg-glass)' },
                    '&:hover .model-try': { borderColor: '#FF6600', color: '#FF6600' },
                  }}
                >
                  <ProviderTile code={model.code} size={32} />

                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {model.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {model.provider}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.82rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        mt: 0.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {model.description}
                    </Typography>
                  </Box>

                  {/* Best for: the field that was going unused while this column
                      showed the context size instead. */}
                  <Typography
                    sx={{
                      gridColumn: { xs: '2 / -1', md: 'auto' },
                      fontSize: '0.84rem',
                      lineHeight: 1.5,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {model.bestFor || 'General purpose'}
                  </Typography>

                  <Typography
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {model.detail || '—'}
                  </Typography>

                  <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                    <Box
                      component="a"
                      className="model-try"
                      href="https://ais.openledger.xyz/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        px: 2,
                        py: 0.7,
                        borderRadius: '9999px',
                        border: '1px solid var(--border-normal)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease',
                        '&:hover': { backgroundColor: '#FF6600', borderColor: '#FF6600', color: '#fff' },
                      }}
                    >
                      Try
                    </Box>
                  </Box>
                </Box>
              ))}

              {filteredModels.length === 0 && (
                <Box sx={{ px: 3, py: 6, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                    No models match that search.
                  </Typography>
                </Box>
              )}
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 5: Bottom Cinematic CTA Banner ─────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 14 } }}>
          <Reveal>
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: 4, md: 6 },
                p: { xs: 4, sm: 6, md: 8 },
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 102, 0, 0.16) 0%, rgba(255, 102, 0, 0.02) 70%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.2,
                  px: 2,
                  py: 0.6,
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 102, 0, 0.1)',
                  border: '1px solid rgba(255, 102, 0, 0.3)',
                  color: '#FF6600',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  mb: 3,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Instant Switching • Zero Account Headaches
              </Box>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  maxWidth: '22ch',
                  mb: 2.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Start chatting with any of these models right now.
              </Typography>

              <Typography
                sx={{
                  maxWidth: '54ch',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                No separate accounts, no API setup, and no recurring commitments per provider. Try OpenLedger with a single click.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2.5,
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#FF6600',
                    color: '#FFFFFF',
                    px: 5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(255,102,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,102,0,0.45)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 44px rgba(255,102,0,0.55)',
                    },
                  }}
                >
                  Launch OpenLedger Studio →
                </Box>
                <Link href="/private" passHref style={{ textDecoration: 'none' }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: 'var(--text-primary)',
                      px: 4,
                      py: 1.8,
                      borderRadius: '9999px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      border: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-glass)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: '#FF6600',
                        color: '#FF6600',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Learn About Private AI
                  </Box>
                </Link>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
