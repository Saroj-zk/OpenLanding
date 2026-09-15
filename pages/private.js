import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule } from '@/components/ui/LedgerUI';
import { GlyphTile, PrivacyPanel } from '@/components/PrivacyVisuals';
import { useThemeMode } from '@/context/ThemeContext';

/* ─────────────────────────────────────────────────────────────────
   Section 2 Data: Privacy Pillars
──────────────────────────────────────────────────────────────────── */
const PILLARS = [
  ['device', 'Local-Only History', "Your conversation history stays on your device, where you control it."],
  ['nostore', 'Zero Retention', "Prompts and responses aren't stored on our servers after processing."],
  ['notrain', 'No Training', "Your conversations aren't collected or used to train AI models."],
  ['noprofile', 'No Profiling', "What you ask isn't used to build an advertising or behavioral profile."],
];

/* ─────────────────────────────────────────────────────────────────
   Section 3 Data: Data Flow Pipeline
──────────────────────────────────────────────────────────────────── */
const FLOW_NODES = [
  {
    id: 'you', label: 'You', sub: 'Local Client', isHighlight: false,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
  {
    id: 'device', label: 'Device Vault', sub: 'Keys on-device', isHighlight: false,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  },
  {
    id: 'pipe', label: 'Zero-Knowledge Pipe', sub: 'Encrypted transit', isHighlight: true,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    id: 'ai', label: 'Stateless AI', sub: 'Never logged', isHighlight: false,
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  },
];

const FLOW_DETAILS = [
  { title: '01 — Local Source', body: "Your prompt starts on your device. It's never seen in plaintext by any third-party network layer before encryption." },
  { title: '02 — Encrypted Pipe', body: "Traffic passes through our zero-knowledge routing layer. We can observe packet timing but never payload content." },
  { title: '03 — Stateless Inference', body: "The model processes your request purely in volatile memory. No write operation touches disk or a persistent log." },
  { title: '04 — Dropped immediately', body: "Once inference completes, the session buffer is discarded. No training pipeline, no data warehouse, no ad profile." },
];

/* ─────────────────────────────────────────────────────────────────
   Chat Preview Widget
──────────────────────────────────────────────────────────────────── */
function ChatPreview({ isDark }) {
  const messages = [
    { role: 'user', text: "What's the best route from Tokyo to Kyoto?" },
    { role: 'ai', text: 'The Shinkansen (bullet train) is fastest at ~2h 15m. Book at least a day ahead for reserved seats.' },
    { role: 'user', text: 'Is it expensive?' },
    { role: 'ai', text: 'Around ¥14,000 (~$90) one-way. A 7-day JR Pass covers it if you travel 3+ routes.' },
  ];
  return (
    <Box sx={{ borderRadius: 3, border: '1px solid var(--border-normal)', backgroundColor: 'var(--bg-card)', overflow: 'hidden' }}>
      <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 8px #FF6600' }} />
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FF6600' }}>Private Chat</Typography>
        </Box>
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.2, py: 0.3, borderRadius: '9999px', backgroundColor: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.25)', fontSize: '0.68rem', color: '#FF6600', fontWeight: 600 }}>
          <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#FF6600' }} />
          End-to-end encrypted
        </Box>
      </Box>
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {messages.map((m, i) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box sx={{ maxWidth: '82%', px: 2, py: 1.2, borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', backgroundColor: m.role === 'user' ? '#FF6600' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', border: m.role === 'user' ? 'none' : '1px solid var(--border-subtle)' }}>
              <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.5, color: m.role === 'user' ? '#FFFFFF' : 'var(--text-primary)' }}>{m.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mx: 2.5, mb: 2.5, px: 2, py: 1.2, borderRadius: 2, border: '1px solid var(--border-normal)', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ask anything privately…</Typography>
        <Box sx={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#FF6600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(255,102,0,0.4)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        </Box>
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Model Selector Widget
──────────────────────────────────────────────────────────────────── */
function ModelSelector({ isDark }) {
  const [selected, setSelected] = React.useState('OA');
  const [activeMode, setActiveMode] = React.useState('Private');
  const models = [
    { code: 'OA', name: 'GPT-4o', vendor: 'OpenAI', color: '#10A37F' },
    { code: 'AN', name: 'Claude 3.5', vendor: 'Anthropic', color: '#D97757' },
    { code: 'GG', name: 'Gemini Pro', vendor: 'Google', color: '#4B6FD8' },
  ];
  const modes = ['Private', 'Anonymous', 'Mask'];
  return (
    <Box sx={{ borderRadius: 3, border: '1px solid var(--border-normal)', backgroundColor: 'var(--bg-card)', overflow: 'hidden' }}>
      <Box sx={{ px: 2.5, pt: 2, pb: 0, display: 'flex', gap: 1 }}>
        {modes.map((m) => (
          <Box key={m} onClick={() => setActiveMode(m)} sx={{ px: 2, py: 0.6, borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', backgroundColor: activeMode === m ? '#FF6600' : 'transparent', color: activeMode === m ? '#FFFFFF' : 'var(--text-muted)', border: '1px solid', borderColor: activeMode === m ? '#FF6600' : 'var(--border-normal)', '&:hover': { borderColor: '#FF6600', color: activeMode === m ? '#FFFFFF' : '#FF6600' } }}>{m}</Box>
        ))}
      </Box>
      <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', mb: 0.5 }}>Choose Your Model</Typography>
        {models.map((model) => {
          const isActive = selected === model.code;
          return (
            <Box key={model.code} onClick={() => setSelected(model.code)} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 2, cursor: 'pointer', border: '1px solid', borderColor: isActive ? '#FF6600' : 'var(--border-subtle)', backgroundColor: isActive ? 'rgba(255,102,0,0.06)' : 'transparent', transition: 'all 0.2s', '&:hover': { borderColor: 'rgba(255,102,0,0.5)', backgroundColor: 'rgba(255,102,0,0.04)' } }}>
              <Box sx={{ width: 32, height: 32, borderRadius: 1.5, backgroundColor: model.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: '#fff', letterSpacing: '0.03em' }}>{model.code}</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{model.name}</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{model.vendor}</Typography>
              </Box>
              {isActive && (
                <Box sx={{ width: 18, height: 18, borderRadius: '50%', backgroundColor: '#FF6600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mx: 2.5, mb: 2.5, p: 1.5, borderRadius: 2, backgroundColor: isDark ? 'rgba(255,102,0,0.06)' : 'rgba(255,102,0,0.04)', border: '1px solid rgba(255,102,0,0.2)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, textAlign: 'center' }}>
        {[['Models', '50+'], ['Retention', '0s'], ['Profiling', 'None']].map(([k, v]) => (
          <Box key={k}>
            <Typography sx={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k}</Typography>
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#FF6600', mt: 0.2 }}>{v}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Arrow connector
──────────────────────────────────────────────────────────────────── */
function ArrowRight({ highlight }) {
  const color = highlight ? '#FF6600' : 'var(--border-normal)';
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0, px: 0.5 }}>
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <line x1="0" y1="8" x2="14" y2="8" stroke={color} strokeWidth="1.5" strokeDasharray="3 2"/>
        <polyline points="10,4 16,8 10,12" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </Box>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Page
──────────────────────────────────────────────────────────────────── */
export default function PrivatePage() {
  const { isDark } = useThemeMode();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>Private AI - OpenLedger</title>
      </Head>

      <PageHeader />

      {/* ── Section 1: Hero ─────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Box sx={{ display: 'grid', alignItems: 'center', gap: { xs: 6, lg: 10 }, gridTemplateColumns: { lg: 'minmax(0,1.15fr) minmax(0,0.85fr)' } }}>
            <Reveal>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Private AI
              </Box>
              <Typography component="h1" sx={{ maxWidth: '16ch', fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)', mb: 2.5 }}>
                What you ask stays yours.
              </Typography>
              <Typography sx={{ maxWidth: '54ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Use powerful AI without giving up your privacy. Your conversations stay private, aren't used for training, and aren't stored on our servers.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                <Box component="a" href="https://ais.openledger.xyz/chat" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF6600', color: '#FFFFFF', px: 4, py: 1.5, borderRadius: '9999px', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(255,102,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)', border: '1px solid rgba(255,102,0,0.4)', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', '&:hover': { backgroundColor: '#e65c00', transform: 'translateY(-2px)', boxShadow: '0 12px 36px rgba(255,102,0,0.5)' }, '&:active': { transform: 'scale(0.97)' } }}>
                  Start a Private Chat →
                </Box>
              </Box>
            </Reveal>
            <Reveal delay={110}>
              <PrivacyPanel />
            </Reveal>
          </Box>
        </Box>

        {/* ── Section 2: Pillars ──────────────────────────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              Privacy, built in
            </Box>
            <Typography component="h2" sx={{ maxWidth: '20ch', fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)' }}>
              Your conversations aren't the product.
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '56ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Your prompts, responses, files, and generated content belong to you. They stay on your device instead of becoming a permanent record on our servers.
            </Typography>
          </Reveal>
          <Box sx={{ mt: 6, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {PILLARS.map(([glyph, term, detail], i) => (
              <Reveal key={term} delay={i * 70} sx={{ display: 'flex' }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 3, borderRadius: 3, border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)', transition: 'border-color 0.3s, box-shadow 0.3s', '&:hover': { borderColor: 'rgba(255,102,0,0.4)', boxShadow: '0 4px 20px rgba(255,102,0,0.08)' } }}>
                  <GlyphTile name={glyph} />
                  <Typography component="h3" sx={{ mt: 3, fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{term}</Typography>
                  <Typography sx={{ mt: 1.5, fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{detail}</Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        {/* ── Section 3: Data Flow ─────────────────────────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              How it works
            </Box>
            <Typography component="h2" sx={{ maxWidth: '22ch', fontSize: { xs: '1.8rem', md: '2.6rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)' }}>
              Your request travels.{' '}
              <Box component="span" sx={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Your data doesn't stay.</Box>
            </Typography>
            <Typography sx={{ mt: 2, maxWidth: '56ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Privacy data flows between you and the AI through multiple encrypted layers — none of which retain your content.
            </Typography>
          </Reveal>

          <Reveal delay={100}>
            <Box sx={{ mt: 6, p: { xs: 2.5, sm: 3.5 }, borderRadius: 4, border: '1px solid var(--border-normal)', backgroundColor: 'var(--bg-card)', boxShadow: isDark ? '0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)' : '0 4px 24px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' }}>
              {/* Ambient glow */}
              <Box sx={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse, rgba(255,102,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Pipeline nodes */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', pb: 0.5, position: 'relative', zIndex: 1 }}>
                {FLOW_NODES.map((node, idx) => (
                  <React.Fragment key={node.id}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, minWidth: 90, flexShrink: 0 }}>
                      <Box sx={{ width: 52, height: 52, borderRadius: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: node.isHighlight ? '#FF6600' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', border: '1px solid', borderColor: node.isHighlight ? '#FF6600' : 'var(--border-normal)', color: node.isHighlight ? '#FFFFFF' : '#FF6600', boxShadow: node.isHighlight ? '0 4px 20px rgba(255,102,0,0.35)' : 'none', transition: 'all 0.25s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: node.isHighlight ? '0 8px 28px rgba(255,102,0,0.45)' : '0 4px 16px rgba(255,102,0,0.18)' } }}>
                        {node.icon}
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: node.isHighlight ? '#FF6600' : 'var(--text-primary)' }}>{node.label}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'var(--text-muted)', mt: 0.2 }}>{node.sub}</Typography>
                      </Box>
                    </Box>
                    {idx < FLOW_NODES.length - 1 && <ArrowRight highlight={idx === 1} />}
                  </React.Fragment>
                ))}
              </Box>

              {/* Divider */}
              <Box sx={{ my: 3, borderTop: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }} />

              {/* Detail cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 2, md: 3 }, position: 'relative', zIndex: 1 }}>
                {FLOW_DETAILS.map((d, i) => (
                  <Box key={i}>
                    <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#FF6600', mb: 1, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{d.title}</Typography>
                    <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{d.body}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Bottom telemetry */}
              <Box sx={{ mt: 3, pt: 2.5, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {[['Local storage', 'Device only'], ['Intermediate storage', 'Encrypted transit'], ['Server storage', 'Discarded immediately']].map(([label, val]) => (
                    <Box key={label}>
                      <Typography sx={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>{label}</Typography>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', mt: 0.2 }}>{val}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 2, py: 0.6, borderRadius: '9999px', backgroundColor: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.25)', fontSize: '0.72rem', color: '#FF6600', fontWeight: 600 }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 6px #FF6600' }} />
                  Zero-Knowledge Architecture
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>

        {/* ── Section 4: CTA ───────────────────────────────────────── */}
        <Rule />
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Box sx={{ display: 'grid', gap: { xs: 6, lg: 8 }, gridTemplateColumns: { lg: 'minmax(0,1fr) minmax(0,1fr)' } }}>
            {/* Left */}
            <Reveal>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                Start exploring
              </Box>
              <Typography component="h2" sx={{ maxWidth: '22ch', fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)', mb: 2 }}>
                Private enough to ask.{' '}
                <Box component="span" sx={{ color: 'var(--text-secondary)', fontWeight: 400 }}>Free enough to explore.</Box>
              </Typography>
              <Typography sx={{ maxWidth: '50ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 4 }}>
                Privacy protects what you ask. Unrestricted gives you the freedom to do it. Disposable research, difficult topics, deals, calls and budgets — you can finally ask what you actually need.
              </Typography>
              <ChatPreview isDark={isDark} />
              <Box sx={{ mt: 3.5, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                <Box component="a" href="https://ais.openledger.xyz/chat" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#FF6600', color: '#FFFFFF', px: 3.5, py: 1.3, borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 24px rgba(255,102,0,0.3)', border: '1px solid rgba(255,102,0,0.4)', transition: 'all 0.25s ease', '&:hover': { backgroundColor: '#e65c00', transform: 'translateY(-2px)', boxShadow: '0 10px 32px rgba(255,102,0,0.45)' } }}>
                  Full Privacy
                </Box>
                <Box component="a" href="https://ais.openledger.xyz/chat" target="_blank" rel="noopener noreferrer" sx={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', px: 3.5, py: 1.3, borderRadius: '9999px', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', border: '1px solid var(--border-normal)', transition: 'all 0.25s ease', '&:hover': { borderColor: '#FF6600', color: '#FF6600' } }}>
                  Browse model
                </Box>
              </Box>
            </Reveal>

            {/* Right */}
            <Reveal delay={110}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <ModelSelector isDark={isDark} />
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                  {[['50+ Models', 'All private by default'], ['GPT, Claude, +More', 'Your choice, your control'], ['Switch anytime', 'Same memory, different model']].map(([title, sub]) => (
                    <Box key={title}>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-muted)', mt: 0.3, lineHeight: 1.4 }}>{sub}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          </Box>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
