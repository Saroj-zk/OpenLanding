import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, FormatTile } from '@/components/ui/LedgerUI';
import { CAPABILITIES } from '@/data/capabilities';
import { MODELS, countByKind } from '@/data/catalog';

function modelsFor(kind) {
  const list = MODELS.filter((m) => m.kind === kind);
  return kind === "audio" ? [...list, ...MODELS.filter((m) => m.kind === "music")] : list;
}

function countFor(kind) {
  return kind === "audio" ? countByKind("audio") + countByKind("music") : countByKind(kind);
}

export default function CapabilitiesPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>Capabilities - OpenLedger</title>
      </Head>
      
      <PageHeader />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              What you can do
            </Box>
            <Typography component="h1" sx={{ maxWidth: '18ch', fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)', mb: 2.5 }}>
              Uncensored chat, images, video and more.
            </Typography>
            <Typography sx={{ maxWidth: '58ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Text, image, video, audio, code and search in one place, all private or anonymous. One subscription, one thread, one memory across every one of them.
            </Typography>
          </Reveal>

          <Reveal delay={90} sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            {CAPABILITIES.map((c) => (
              <Box 
                key={c.kind} 
                component="a" 
                href={`#${c.kind}`} 
                sx={{ 
                  display: 'flex', alignItems: 'center', gap: 1, 
                  borderRadius: '9999px', border: '1px solid var(--border-normal)', 
                  py: 0.8, pl: 0.8, pr: 2, 
                  textDecoration: 'none', color: 'var(--text-secondary)',
                  transition: 'all 0.25s ease',
                  '&:hover': { borderColor: '#FF6600', color: 'var(--text-primary)', boxShadow: '0 0 14px rgba(255, 102, 0, 0.25)' }
                }}
              >
                <FormatTile kind={c.kind} size={22} />
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{c.label}</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{countFor(c.kind)}</Typography>
              </Box>
            ))}
          </Reveal>
        </Box>

        {CAPABILITIES.map((c, i) => (
          <Box component="section" key={c.kind} id={c.kind} sx={{ scrollMarginTop: '6rem' }}>
            <Rule />
            <Box sx={{ display: 'grid', gap: 5, py: { xs: 7, md: 8 }, gridTemplateColumns: { lg: 'minmax(0,0.95fr) minmax(0,1.05fr)' } }}>
              <Reveal>
                <FormatTile kind={c.kind} size={56} />
                <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                  <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 700, color: 'var(--text-heading)' }}>
                    {c.label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    {countFor(c.kind)} models
                  </Typography>
                </Box>
                <Typography sx={{ mt: 1, fontSize: '1rem', fontWeight: 600, color: '#FF6600' }}>
                  {c.line}
                </Typography>
                <Typography sx={{ mt: 1.5, maxWidth: '46ch', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {c.body}
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {modelsFor(c.kind).map((m) => (
                    <Box key={m.name} component="span" sx={{ borderRadius: '9999px', border: '1px solid var(--border-normal)', backgroundColor: 'var(--bg-card)', px: 1.5, py: 0.5, fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      {m.name}
                    </Box>
                  ))}
                </Box>
              </Reveal>

              <Reveal delay={90}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-normal)', pb: 1.5, mb: 3 }}>
                  <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    What people use it for
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {c.uses.map((use, index) => (
                    <Box key={index}>
                      <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {use[0]}
                      </Typography>
                      <Typography sx={{ mt: 0.5, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {use[1]}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Reveal>
            </Box>
          </Box>
        ))}

      </Container>

      <Footer />
    </Box>
  );
}
