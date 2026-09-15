import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/context/ThemeContext';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule, ProviderTile } from '@/components/ui/LedgerUI';
import { MODELS, KINDS, PROVIDERS, MODEL_TOTAL } from '@/data/catalog';

function GroupHeading({ kind, count }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 3, borderBottom: '1px solid var(--border-strong)', pb: 1.5 }}>
      <Typography component="h2" sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' }, fontWeight: 600, color: 'var(--text-heading)' }}>
        {kind.label}
      </Typography>
      <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        {count} {count === 1 ? 'model' : 'models'}
      </Typography>
    </Box>
  );
}

function ModelRow({ model, delay }) {
  return (
    <Reveal row delay={delay} sx={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: { xs: 2, sm: 2.5 }, borderBottom: '1px solid var(--border-normal)', py: 2.5 }}>
      <ProviderTile code={model.code} size={34} />
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 1.5, rowGap: 0.5 }}>
          <Typography component="h3" sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {model.name}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            {model.provider}
          </Typography>
          <Typography sx={{ ml: 'auto', flexShrink: 0, fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {model.detail}
          </Typography>
        </Box>
        <Typography sx={{ mt: 1, maxWidth: '80ch', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {model.description}
        </Typography>
      </Box>
    </Reveal>
  );
}

export default function ModelsPage() {
  const { isDark } = useThemeMode();
  
  const groups = KINDS.map((kind) => ({
    kind,
    models: MODELS.filter((m) => m.kind === kind.id)
  })).filter((g) => g.models.length > 0);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>Models - OpenLedger</title>
      </Head>
      
      <PageHeader />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box sx={{ display: 'grid', gap: 4, py: { xs: 7, md: 10 }, gridTemplateColumns: { lg: 'minmax(0,1fr) auto' }, alignItems: { lg: 'flex-end' } }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              The model list
            </Box>
            <Typography component="h1" sx={{ fontSize: { xs: '2.2rem', sm: '3rem', md: '3.6rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)', mb: 2 }}>
              Every model, one subscription.
            </Typography>
            <Typography sx={{ maxWidth: '60ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Text, images, video, audio and music, from every provider worth routing to. Pick one by name, or send auto and let the router choose per request.
            </Typography>
          </Reveal>

          <Reveal delay={90}>
            <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'row', lg: 'column' }, borderLeft: { lg: '1px solid var(--border-normal)' }, pl: { lg: 4 } }}>
              <Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Models</Typography>
                <Typography sx={{ mt: 0.5, fontSize: '1.8rem', fontWeight: 700, color: '#FF6600', lineHeight: 1 }}>{MODEL_TOTAL}+</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Providers</Typography>
                <Typography sx={{ mt: 0.5, fontSize: '1.8rem', fontWeight: 700, color: '#FF6600', lineHeight: 1 }}>{PROVIDERS.length}</Typography>
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>

      {groups.map((group, i) => (
        <Box component="section" key={group.kind.id} sx={{ scrollMarginTop: '6rem' }}>
          <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
            <Rule />
            <Box sx={{ py: { xs: 7, md: 10 } }}>
              <Reveal delay={i * 50}>
                <GroupHeading kind={group.kind} count={group.models.length} />
              </Reveal>
              <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column' }}>
                {group.models.map((model, j) => (
                  <ModelRow key={model.name} model={model} delay={(j % 10) * 40} />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      ))}

      <Footer />
    </Box>
  );
}
