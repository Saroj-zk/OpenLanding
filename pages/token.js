import * as React from 'react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PageHeader from '@/components/PageHeader';
import Footer from '@/components/Footer';
import { Reveal, Rule } from '@/components/ui/LedgerUI';
import { TOKEN, STATS, FLOW, PRINCIPLES, UTILITY } from '@/data/token';

export default function TokenPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      <Head>
        <title>Tokenomics - OpenLedger</title>
      </Head>
      
      <PageHeader />

      <Container maxWidth="lg" sx={{ px: { xs: 2.5, sm: 4, md: 6 } }}>
        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FF6600', mb: 2.5, fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
              Tokenomics
            </Box>
            <Typography component="h1" sx={{ maxWidth: '20ch', fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' }, fontWeight: 700, lineHeight: 1.1, color: 'var(--text-heading)', mb: 2.5 }}>
              {TOKEN.symbol} is rewarded for real usage, not printed out of thin air.
            </Typography>
            <Typography sx={{ maxWidth: '62ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              Usage funds the loop. A share of every credit spent buys {TOKEN.symbol} on the open market, rewards the providers who served the work, and burns what is left over.
            </Typography>
          </Reveal>
        </Box>

        <Rule />

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' }, columnGap: 5, rowGap: 4, py: 5 }}>
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 70}>
              <Typography sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, color: '#FF6600', lineHeight: 1, mb: 1.5 }}>
                {stat.value}
              </Typography>
              <Typography sx={{ maxWidth: '26ch', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {stat.label}
              </Typography>
            </Reveal>
          ))}
        </Box>

        <Rule />

        <Box sx={{ py: { xs: 7, md: 10 } }}>
          <Reveal sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 3 }}>
            <Typography component="h2" sx={{ fontSize: { xs: '1.4rem', sm: '1.6rem' }, fontWeight: 600, color: 'var(--text-heading)' }}>
              How value flows
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              4 steps
            </Typography>
          </Reveal>

          <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', lg: 'repeat(4, 1fr)' }, gap: 2 }}>
            {FLOW.map((item, i) => (
              <Reveal key={item.step} delay={i * 90} sx={{ position: 'relative', display: 'flex' }}>
                {i < FLOW.length - 1 && (
                  <Box sx={{ display: { xs: 'none', lg: 'block' }, position: 'absolute', right: -8, top: '50%', width: 14, height: '1px', backgroundColor: 'var(--border-normal)', pointerEvents: 'none' }} />
                )}
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: item.highlight ? 'rgba(255, 102, 0, 0.45)' : 'var(--border-subtle)',
                    backgroundColor: item.highlight ? 'rgba(255, 102, 0, 0.08)' : 'var(--bg-card)',
                    boxShadow: item.highlight ? '0 8px 24px -6px rgba(255, 102, 0, 0.2)' : 'none',
                  }}
                >
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    [{item.step}]
                  </Typography>
                  <Typography component="h3" sx={{ mt: 2, fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 1.5, fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {item.body}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>
        
        <Rule />

        <Box sx={{ py: { xs: 7, md: 10 }, display: 'grid', gap: 5, gridTemplateColumns: { lg: 'minmax(0,1fr) auto' }, alignItems: { lg: 'flex-start' } }}>
          <Reveal>
            <Typography component="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 700, color: 'var(--text-heading)', mb: 2 }}>
              Built for the long term.
            </Typography>
            <Typography sx={{ maxWidth: '60ch', fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              A network that routes real money to real providers needs rules that cannot be changed quietly. These are the principles written into the contract.
            </Typography>
          </Reveal>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4, maxWidth: '800px' }}>
             {PRINCIPLES.map((p, i) => (
                <Reveal key={p.tag} delay={i * 80}>
                   <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', mb: 1 }}>{p.tag}</Typography>
                   <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{p.body}</Typography>
                </Reveal>
             ))}
          </Box>
        </Box>
        
      </Container>

      <Footer />
    </Box>
  );
}
