import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule } from '@/components/ui/LedgerUI';
import { GlyphTile, PrivacyPanel } from '@/components/PrivacyVisuals';
import { useThemeMode } from '@/context/ThemeContext';

/* ─────────────────────────────────────────────────────────────────
   Privacy Pillars
──────────────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    glyph: 'device',
    title: 'Local-Only History',
    badge: 'On-Device Vault',
    body: 'Your conversation history and memories stay in your device storage, where you hold the only decryption keys.',
  },
  {
    glyph: 'nostore',
    title: 'Zero Retention',
    badge: '0s Memory Buffer',
    body: 'Prompts and outputs are never stored on intermediate servers. Once inference completes, the buffer is dropped immediately.',
  },
  {
    glyph: 'notrain',
    title: 'No Model Training',
    badge: 'Zero Ingestion',
    body: 'Your code, sensitive documents, and questions are strictly excluded from all base and fine-tuning model datasets.',
  },
  {
    glyph: 'noprofile',
    title: 'No Profiling & KYC',
    badge: 'Anonymous Access',
    body: 'No phone verification or personal identifiers required. What you query never maps to an ad identity or tracking dossier.',
  },
];

/* ─────────────────────────────────────────────────────────────────
   Data Flow Pipeline Nodes
──────────────────────────────────────────────────────────────────── */
const FLOW_NODES = [
  {
    id: 'you',
    label: 'You',
    sub: 'Local Client',
    isHighlight: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'device',
    label: 'Device Vault',
    sub: 'Encrypted at Rest',
    isHighlight: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    id: 'pipe',
    label: 'Zero-Knowledge Pipe',
    sub: 'Ephemeral Relay',
    isHighlight: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'Stateless Inference',
    sub: 'Volatile RAM Only',
    isHighlight: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
];

const FLOW_DETAILS = [
  {
    num: '01',
    title: 'Local Source Encryption',
    body: 'Your query is processed locally before dispatch. Ephemeral session tokens replace your IP and device fingerprints.',
  },
  {
    num: '02',
    title: 'Zero-Knowledge Transit',
    body: 'Transfers through an encrypted tunnel. Relays route packets without holding decryption keys to the payload.',
  },
  {
    num: '03',
    title: 'RAM-Only Execution',
    body: 'The chosen model executes the prompt purely in volatile memory. No writes occur to persistent disks or cold storage.',
  },
  {
    num: '04',
    title: 'Immediate Buffer Purge',
    body: 'Upon sending the final token back, session buffers are wiped. Your prompt is never retained for future training datasets.',
  },
];

/* ─────────────────────────────────────────────────────────────────
   Comparison Matrix
──────────────────────────────────────────────────────────────────── */
const COMPARISONS = [
  {
    feature: 'Prompt & Chat History',
    openledger: 'Device vault only (Encrypted locally)',
    traditional: 'Server databases (Retained 30–90+ days)',
    status: true,
  },
  {
    feature: 'AI Model Training',
    openledger: 'Zero training on user inputs, ever',
    traditional: 'Trained by default unless tedious opt-out',
    status: true,
  },
  {
    feature: 'Personal Identity & Sign-Up',
    openledger: 'Anonymous, wallet, or zero-log account',
    traditional: 'Requires phone number, email & payment KYC',
    status: true,
  },
  {
    feature: 'IP Address & Network Logging',
    openledger: 'Zero-knowledge relay masks origin IP',
    traditional: 'Tracked and mapped to your digital fingerprint',
    status: true,
  },
  {
    feature: 'Context Memory Portability',
    openledger: 'Client-controlled across 50+ models',
    traditional: 'Walled garden locked to one vendor',
    status: true,
  },
];

/* ─────────────────────────────────────────────────────────────────
   Interactive Chat Preview
──────────────────────────────────────────────────────────────────── */
function ChatPreview({ isDark }) {
  const messages = [
    { role: 'user', text: "Audit this confidential smart contract and check for reentrancy bugs." },
    { role: 'ai', text: 'Analyzing in volatile RAM... Zero vulnerabilities detected in lines 45-80. Local memory buffer scheduled for immediate purge.' },
    { role: 'user', text: 'Will this code snippet be logged to OpenAI or server training logs?' },
    { role: 'ai', text: 'No. The Zero-Knowledge Relay stripped your network identity, and inference was routed statelessly. Zero retention.' },
  ];

  return (
    <Box
      sx={{
        borderRadius: 4,
        border: '1px solid var(--border-normal)',
        backgroundColor: 'var(--bg-card)',
        overflow: 'hidden',
        boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.6)' : '0 12px 32px rgba(15,23,42,0.08)',
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-heading)' }}>
            Confidential Session
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.8,
            px: 1.4,
            py: 0.4,
            borderRadius: '9999px',
            backgroundColor: 'rgba(255,102,0,0.1)',
            border: '1px solid rgba(255,102,0,0.3)',
            fontSize: '0.72rem',
            color: '#FF6600',
            fontWeight: 700,
          }}
        >
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#FF6600' }} />
          RAM Only • Discard on Close
        </Box>
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.2 }}>
        {messages.map((m, i) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box
              sx={{
                maxWidth: '85%',
                px: 2.2,
                py: 1.4,
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                backgroundColor: m.role === 'user' ? '#FF6600' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: m.role === 'user' ? 'none' : '1px solid var(--border-subtle)',
                boxShadow: m.role === 'user' ? '0 4px 16px rgba(255,102,0,0.3)' : 'none',
              }}
            >
              <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.55, color: m.role === 'user' ? '#FFFFFF' : 'var(--text-primary)' }}>
                {m.text}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mx: 3,
          mb: 3,
          px: 2.2,
          py: 1.4,
          borderRadius: '9999px',
          border: '1px solid var(--border-normal)',
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Ask confidential questions, paste code, analyze contracts…
        </Typography>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#FF6600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(255,102,0,0.45)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </Box>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Model Selector Widget
──────────────────────────────────────────────────────────────────── */
function ModelSelector({ isDark }) {
  const [selected, setSelected] = React.useState('DS');
  const [activeMode, setActiveMode] = React.useState('Private');

  const models = [
    { code: 'DS', name: 'DeepSeek R1', vendor: 'DeepSeek', color: '#4D6BFE', desc: 'Open weights, chain-of-thought, uncensored logic' },
    { code: 'AN', name: 'Claude 3.5 Sonnet', vendor: 'Anthropic', color: '#D97757', desc: 'Superior code analysis and long context drafting' },
    { code: 'OA', name: 'GPT-4o', vendor: 'OpenAI', color: '#10A37F', desc: 'Multimodal vision and rapid everyday intelligence' },
  ];

  const modes = ['Private', 'Anonymous', 'Shielded'];

  return (
    <Box
      sx={{
        borderRadius: 4,
        border: '1px solid var(--border-normal)',
        backgroundColor: 'var(--bg-card)',
        overflow: 'hidden',
        boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.6)' : '0 12px 32px rgba(15,23,42,0.08)',
      }}
    >
      <Box sx={{ px: 3, pt: 2.5, pb: 0, display: 'flex', gap: 1 }}>
        {modes.map((m) => (
          <Box
            key={m}
            onClick={() => setActiveMode(m)}
            sx={{
              px: 2.2,
              py: 0.7,
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              backgroundColor: activeMode === m ? '#FF6600' : 'transparent',
              color: activeMode === m ? '#FFFFFF' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: activeMode === m ? '#FF6600' : 'var(--border-normal)',
              boxShadow: activeMode === m ? '0 4px 14px rgba(255,102,0,0.35)' : 'none',
              '&:hover': {
                borderColor: '#FF6600',
                color: activeMode === m ? '#FFFFFF' : '#FF6600',
              },
            }}
          >
            {m}
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', mb: 0.5 }}>
          Select Active Model
        </Typography>
        {models.map((model) => {
          const isActive = selected === model.code;
          return (
            <Box
              key={model.code}
              onClick={() => setSelected(model.code)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 3,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: isActive ? '#FF6600' : 'var(--border-subtle)',
                backgroundColor: isActive ? 'rgba(255,102,0,0.08)' : 'transparent',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'rgba(255,102,0,0.5)',
                  backgroundColor: 'rgba(255,102,0,0.04)',
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  backgroundColor: model.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 4px 12px ${model.color}40`,
                }}
              >
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff', letterSpacing: '0.03em' }}>
                  {model.code}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {model.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    • {model.vendor}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-secondary)', mt: 0.3 }}>
                  {model.desc}
                </Typography>
              </Box>
              {isActive && (
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: '#FF6600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 10px rgba(255,102,0,0.6)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          mx: 3,
          mb: 3,
          p: 2,
          borderRadius: 3,
          backgroundColor: isDark ? 'rgba(255,102,0,0.06)' : 'rgba(255,102,0,0.04)',
          border: '1px solid rgba(255,102,0,0.2)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1.5,
          textAlign: 'center',
        }}
      >
        {[
          ['Models', '50+ Supported'],
          ['Log Retention', '0 Seconds'],
          ['User Tracking', 'Zero / None'],
        ].map(([k, v]) => (
          <Box key={k}>
            <Typography sx={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {k}
            </Typography>
            <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: '#FF6600', mt: 0.3 }}>
              {v}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Page Component
──────────────────────────────────────────────────────────────────── */
export default function PrivatePage() {
  const { isDark } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', position: 'relative', overflowX: 'hidden' }}>
      <Head>
        <title>Private AI — Confidential, Zero-Retention Intelligence | OpenLedger</title>
        <meta
          name="description"
          content="Use 50+ leading AI models without compromising your privacy. Zero server logging, local-only conversation vaults, and zero model training on your prompts."
        />
      </Head>

      <PageHeader />

      {/* Ambient background glow streaks */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 1400,
          height: 650,
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 102, 0, 0.12) 0%, rgba(255, 102, 0, 0.02) 60%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        {/* ── Section 1: Hero Showcase with Visual Imagery ───────── */}
        <Box sx={{ pt: { xs: 14, sm: 16, md: 18 }, pb: { xs: 8, md: 12 } }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0,1.1fr) minmax(0,0.9fr)' },
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
                Zero-Knowledge Intelligence
              </Box>

              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'var(--text-heading)',
                  mb: 3,
                }}
              >
                What you ask{' '}
                <Box component="span" sx={{ color: '#FF6600' }}>
                  stays yours.
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
                Run confidential code audits, sensitive financial models, and research queries across 50+ frontier models. Your data runs purely in volatile RAM, is never written to disk, and is never used for training.
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2.5, mb: 5 }}>
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
                    '&:active': { transform: 'scale(0.98)' },
                  }}
                >
                  Start a Private Chat →
                </Box>

                <Box
                  component="a"
                  href="#how-it-works"
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
                  See Architecture
                </Box>
              </Box>

              {/* Quick telemetry badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3.5, pt: 2, borderTop: '1px solid var(--border-subtle)' }}>
                {[
                  ['0 Seconds', 'Data Retention'],
                  ['100% Client-Side', 'Encrypted Vault'],
                  ['Zero', 'Model Training'],
                ].map(([stat, label]) => (
                  <Box key={label}>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', lineHeight: 1 }}>
                      {stat}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)', mt: 0.4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Reveal>

            {/* Right Hero Image Card Showcase */}
            <Reveal delay={120}>
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: { xs: 4, md: 5 },
                  overflow: 'hidden',
                  border: '1px solid var(--border-normal)',
                  boxShadow: isDark
                    ? '0 25px 60px -15px rgba(0,0,0,0.8), 0 0 35px rgba(255,102,0,0.15)'
                    : '0 20px 45px -12px rgba(15,23,42,0.12)',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                {/* Hero Image */}
                <Box
                  component="img"
                  src="/images/Privacy.jpg"
                  alt="OpenLedger Private AI Enclave"
                  sx={{
                    width: '100%',
                    height: { xs: 260, sm: 320, md: 360 },
                    objectFit: 'cover',
                    display: 'block',
                    filter: isDark ? 'brightness(0.92) contrast(1.05)' : 'none',
                  }}
                />

                {/* Floating telemetry HUD over image */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 1.2,
                    borderRadius: '9999px',
                    backgroundColor: isDark ? 'rgba(10,12,16,0.75)' : 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-normal)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      ENCLAVE ACTIVE
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.4,
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,102,0,0.15)',
                      color: '#FF6600',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    Zero Disk Write
                  </Box>
                </Box>

                {/* Bottom integrated interactive widget */}
                <Box sx={{ p: { xs: 2.5, sm: 3 }, backgroundColor: 'var(--bg-card)' }}>
                  <PrivacyPanel />
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 2: Privacy Pillars Bento Grid ─────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
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
              Four Pillars of Confidentiality
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                maxWidth: '24ch',
              }}
            >
              Your conversations aren't the product.
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '62ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Unlike consumer chat platforms that collect queries for model training, ad profiling, and long-term logging, OpenLedger is engineered from the ground up for strict confidentiality.
            </Typography>
          </Reveal>

          {/* Bento Grid layout with imagery */}
          <Box
            sx={{
              mt: 6,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
              gap: 3,
            }}
          >
            {/* Visual Feature Card: Hand with App Shield (Spans 5 cols on desktop) */}
            <Box
              sx={{
                gridColumn: { xs: '1 / -1', md: 'span 5' },
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid var(--border-normal)',
                backgroundColor: 'var(--bg-card)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 10px 30px rgba(15,23,42,0.06)',
              }}
            >
              <Box
                component="img"
                src="/images/hand_holding_phone.jpg"
                alt="Local hardware encryption vault"
                sx={{
                  width: '100%',
                  height: 240,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Box sx={{ p: 3.5, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      px: 1.4,
                      py: 0.4,
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,102,0,0.1)',
                      color: '#FF6600',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    HARDWARE ENCLAVE
                  </Box>
                  <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1.2 }}>
                    Private by Device
                  </Typography>
                  <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    Your encryption keys and chat memory reside locally in your browser sandbox or native client. No administrator, employee, or third party has access.
                  </Typography>
                </Box>
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    AES-256 Client-Side Protected
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* 4 Pillars Grid (Spans 7 cols on desktop) */}
            <Box
              sx={{
                gridColumn: { xs: '1 / -1', md: 'span 7' },
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2.5,
              }}
            >
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 80} sx={{ display: 'flex' }}>
                  <Box
                    sx={{
                      width: '100%',
                      p: 3,
                      borderRadius: 3.5,
                      border: '1px solid var(--border-normal)',
                      backgroundColor: 'var(--bg-card)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                      '&:hover': {
                        borderColor: '#FF6600',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 32px rgba(255,102,0,0.12)',
                      },
                    }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                        <GlyphTile name={pillar.glyph} size={44} />
                        <Typography
                          sx={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: '#FF6600',
                            px: 1,
                            py: 0.3,
                            borderRadius: '9999px',
                            backgroundColor: 'rgba(255,102,0,0.08)',
                            border: '1px solid rgba(255,102,0,0.2)',
                          }}
                        >
                          {pillar.badge}
                        </Typography>
                      </Box>
                      <Typography component="h3" sx={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', mb: 1 }}>
                        {pillar.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {pillar.body}
                      </Typography>
                    </Box>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ── Section 3: Data Flow Pipeline ─────────────────────── */}
        <Rule />
        <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 } }}>
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
              Zero-Knowledge Architecture
            </Box>
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                color: 'var(--text-heading)',
                maxWidth: '26ch',
              }}
            >
              Your request travels.{' '}
              <Box component="span" sx={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                Your identity doesn't.
              </Box>
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '60ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              How queries travel between you and multi-model providers through our zero-knowledge routing network without leaving a trail.
            </Typography>
          </Reveal>

          <Reveal delay={100}>
            <Box
              sx={{
                mt: 6,
                p: { xs: 3, sm: 4.5 },
                borderRadius: 4,
                border: '1px solid var(--border-normal)',
                backgroundColor: 'var(--bg-card)',
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.6)' : '0 12px 36px rgba(15,23,42,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background radial accent */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '-30%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%',
                  height: '80%',
                  background: 'radial-gradient(ellipse, rgba(255,102,0,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Pipeline Nodes Flow */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                  gap: 2.5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {FLOW_NODES.map((node, idx) => (
                  <Box
                    key={node.id}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: node.isHighlight ? '#FF6600' : 'var(--border-subtle)',
                      backgroundColor: node.isHighlight ? 'rgba(255,102,0,0.08)' : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      boxShadow: node.isHighlight ? '0 8px 24px rgba(255,102,0,0.2)' : 'none',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        borderColor: '#FF6600',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: node.isHighlight ? '#FF6600' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                          color: node.isHighlight ? '#FFFFFF' : '#FF6600',
                          boxShadow: node.isHighlight ? '0 4px 16px rgba(255,102,0,0.4)' : 'none',
                        }}
                      >
                        {node.icon}
                      </Box>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                        STAGE 0{idx + 1}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: node.isHighlight ? '#FF6600' : 'var(--text-primary)' }}>
                        {node.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)', mt: 0.3 }}>
                        {node.sub}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Stage Detail Cards */}
              <Box sx={{ mt: 4, pt: 3.5, borderTop: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                  {FLOW_DETAILS.map((d) => (
                    <Box key={d.num}>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 800, color: '#FF6600', letterSpacing: '0.06em', textTransform: 'uppercase', mb: 0.8 }}>
                        {d.num} — {d.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {d.body}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 4: OpenLedger vs Traditional AI Matrix ─────── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
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
              Direct Comparison
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
              }}
            >
              Engineered differently from the ground up.
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '58ch', fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              See how OpenLedger Private AI compares to standard corporate AI interfaces in data stewardship, model training, and privacy protections.
            </Typography>
          </Reveal>

          <Reveal delay={100}>
            <Box
              sx={{
                mt: 6,
                borderRadius: 4,
                border: '1px solid var(--border-normal)',
                backgroundColor: 'var(--bg-card)',
                overflow: 'hidden',
                boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.6)' : '0 10px 30px rgba(15,23,42,0.06)',
              }}
            >
              {/* Header row */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1.2fr 1fr', md: '1.4fr 1.3fr 1.3fr' },
                  p: { xs: 2, md: 2.5 },
                  borderBottom: '1px solid var(--border-normal)',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                }}
              >
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                  Security Dimension
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 8px #FF6600' }} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#FF6600' }}>
                    OpenLedger Private AI
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                  }}
                >
                  Standard Consumer AI
                </Typography>
              </Box>

              {/* Rows */}
              {COMPARISONS.map((row, idx) => (
                <Box
                  key={row.feature}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1.2fr 1fr', md: '1.4fr 1.3fr 1.3fr' },
                    p: { xs: 2, md: 2.5 },
                    borderBottom: idx < COMPARISONS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    backgroundColor: idx % 2 === 1 ? (isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)') : 'transparent',
                    alignItems: 'center',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255,102,0,0.04)' : 'rgba(255,102,0,0.03)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                    {row.feature}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(16,185,129,0.15)',
                        border: '1px solid #10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </Box>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {row.openledger}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {row.traditional}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 5: Interactive Chat & Model Switcher Demo ──── */}
        <Rule />
        <Box sx={{ py: { xs: 8, md: 12 } }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 6, lg: 8 },
              gridTemplateColumns: { lg: 'minmax(0,1.05fr) minmax(0,0.95fr)' },
              alignItems: 'center',
            }}
          >
            {/* Left */}
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
                Hands-On Studio
              </Box>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-heading)',
                  mb: 2,
                }}
              >
                Private enough to ask.{' '}
                <Box component="span" sx={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
                  Free enough to explore.
                </Box>
              </Typography>

              <Typography sx={{ maxWidth: '52ch', fontSize: '1rem', lineHeight: 1.65, color: 'var(--text-secondary)', mb: 4 }}>
                Uncensored research, proprietary codebases, pitch decks, competitive intelligence, and medical data — finally ask what you actually need without fear of corporate leaks or data aggregation.
              </Typography>

              <ChatPreview isDark={isDark} />
            </Reveal>

            {/* Right */}
            <Reveal delay={110}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                <ModelSelector isDark={isDark} />

                {/* Ambient callout */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3.5,
                    border: '1px solid rgba(255,102,0,0.25)',
                    backgroundColor: isDark ? 'rgba(255,102,0,0.06)' : 'rgba(255,102,0,0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: '#FF6600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                      boxShadow: '0 4px 16px rgba(255,102,0,0.4)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                      Switch Models in the Same Private Thread
                    </Typography>
                    <Typography sx={{ fontSize: '0.82rem', color: 'var(--text-secondary)', mt: 0.3, lineHeight: 1.5 }}>
                      Compare responses between DeepSeek R1 and Claude 3.5 Sonnet side-by-side with zero data leaving your local sandbox.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 6: Bottom Cinematic CTA Banner ─────────────── */}
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
              {/* Background ambient radial glow */}
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
                Instant Access • No Credit Card Required
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
                Experience confidential AI with complete peace of mind.
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
                Start an encrypted session in seconds. Access every flagship model with zero tracking and full zero-retention architecture.
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
                  Launch Private Chat Now →
                </Box>
                <Link href="/models" passHref style={{ textDecoration: 'none' }}>
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
                    Browse 50+ Models
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
