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
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <Head>
        <title>AI Models Catalog — 50+ Frontier Models in One Subscription | OpenLedger</title>
        <meta
          name="description"
          content="Access GPT-4o, Claude 3.5 Sonnet, DeepSeek R1, Gemini 2.5, FLUX.1 and 50+ premier models in one unified subscription with zero tracking."
        />
      </Head>

      <PageHeader />

      {/* Hero with backdrop image */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 14, sm: 16, md: 19 },
          pb: { xs: 8, md: 12 },
          backgroundImage: isDark
            ? 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 102, 0, 0.15) 0%, transparent 70%), url(/images/model_bg_dark_theme.png)'
            : 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 102, 0, 0.08) 0%, transparent 70%), url(/images/model_bg_light_theme.png)',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 5, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0,1.2fr) minmax(0,0.8fr)' },
              alignItems: 'center',
            }}
          >
            {/* Left Copy */}
            <Reveal>
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
                  fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
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
                  maxWidth: '56ch',
                  fontSize: { xs: '1.05rem', md: '1.15rem' },
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  mb: 4,
                }}
              >
                Text, code, vision, images, audio, and music from every frontier provider. Pick any model by name, or use our smart router to automatically direct queries to the best model for the task.
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
                <Box
                  component="a"
                  href="https://ais.openledger.xyz/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF6600',
                    color: '#FFFFFF',
                    px: 4.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.02em',
                    boxShadow: '0 8px 32px rgba(255,102,0,0.38), inset 0 1px 0 rgba(255,255,255,0.25)',
                    border: '1px solid rgba(255,102,0,0.4)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      backgroundColor: '#e65c00',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 14px 40px rgba(255,102,0,0.52)',
                    },
                  }}
                >
                  Launch All Models →
                </Box>
                <Box
                  component="a"
                  href="#catalog-list"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'var(--text-secondary)',
                    px: 3.5,
                    py: 1.8,
                    borderRadius: '9999px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid var(--border-normal)',
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
                  Explore Model List ↓
                </Box>
              </Box>
            </Reveal>

            {/* Right Telemetry Cards */}
            <Reveal delay={110}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' },
                  gap: 2.5,
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
                      p: 3,
                      borderRadius: 3.5,
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-card)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.4)' : '0 10px 25px rgba(15,23,42,0.06)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: 'rgba(255, 102, 0, 0.4)',
                        transform: 'translateY(-3px)',
                        boxShadow: isDark
                          ? '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,102,0,0.15)'
                          : '0 16px 36px rgba(15,23,42,0.1), 0 0 0 1px rgba(255,102,0,0.1)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        height: '2px',
                        background: i === 0 ? 'linear-gradient(90deg, #FF6600, rgba(255,102,0,0))' : 'transparent',
                        borderRadius: '3.5px 3.5px 0 0',
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
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      {stat.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.76rem', color: 'var(--text-secondary)', mt: 0.4 }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        {/* ── Section 2: Flagship Models Showcase Grid ───────────── */}
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600' }} />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#FF6600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Premier Lineup
              </Typography>
            </Box>
            <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
              Flagship Intelligence at your fingertips.
            </Typography>
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
                    border: '1px solid var(--border-normal)',
                    backgroundColor: 'var(--bg-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: isDark ? '0 12px 32px rgba(0,0,0,0.5)' : '0 8px 24px rgba(15,23,42,0.06)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    '&:hover': {
                      borderColor: '#FF6600',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 40px rgba(255,102,0,0.15)',
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
                            border: '1px solid var(--border-normal)',
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
                  <Box key={title} sx={{ p: 2, borderRadius: 2.5, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
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
                  border: '1px solid var(--border-normal)',
                  boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6)' : '0 12px 35px rgba(15,23,42,0.08)',
                  backgroundColor: 'var(--bg-card)',
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
                  border: '1px solid var(--border-normal)',
                  backgroundColor: 'var(--bg-card)',
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredModels.map((model, idx) => (
              <Reveal key={model.name} delay={(idx % 15) * 30}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: '1px solid var(--border-subtle)',
                    backgroundColor: 'var(--bg-card)',
                    display: 'grid',
                    gridTemplateColumns: { xs: 'auto 1fr', md: 'auto 1.8fr 1fr auto' },
                    gap: { xs: 2, md: 3 },
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#FF6600',
                      backgroundColor: isDark ? 'rgba(255,102,0,0.03)' : 'rgba(255,102,0,0.02)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <ProviderTile code={model.code} size={36} />

                  <Box sx={{ minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, flexWrap: 'wrap' }}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                        {model.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {model.provider}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.84rem', color: 'var(--text-secondary)', mt: 0.5, lineHeight: 1.5 }}>
                      {model.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Best For
                    </Typography>
                    <Typography sx={{ fontSize: '0.84rem', color: 'var(--text-primary)', mt: 0.3 }}>
                      {model.detail || 'General Purpose'}
                    </Typography>
                  </Box>

                  <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                    <Box
                      component="a"
                      href="https://ais.openledger.xyz/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        px: 2.5,
                        py: 0.8,
                        borderRadius: '9999px',
                        border: '1px solid var(--border-normal)',
                        color: 'var(--text-primary)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        '&:hover': {
                          backgroundColor: '#FF6600',
                          borderColor: '#FF6600',
                          color: '#fff',
                        },
                      }}
                    >
                      Try →
                    </Box>
                  </Box>
                </Box>
              </Reveal>
            ))}
          </Box>
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
                border: '1px solid var(--border-normal)',
                boxShadow: isDark
                  ? '0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(255,102,0,0.15)'
                  : '0 20px 45px rgba(15,23,42,0.1)',
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
                      border: '1px solid var(--border-normal)',
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
