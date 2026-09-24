import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useThemeMode } from '@/context/ThemeContext';

const requests = [
  "Make a first call deck",
  "Summarise last three QBRs",
  "Explain this diagram",
  "What's our PTO policy?",
  "Turn this into a dashboard"
];

const models = [
  "Claude 3.5 Opus",
  "Claude 3.5 Sonnet",
  "Gemini 1.5 Flash",
  "GPT-4o",
  "GPT-4o mini"
];

const attributes = [
  "Reasoning level",
  "Quality",
  "Modality",
  "Complexity",
  "Cost",
  "Task type"
];

export default function TokenOptimizationSection() {
  const { isDark } = useThemeMode();

  return (
    <Container maxWidth="xl" sx={{ pb: { xs: 8, md: 10 }, overflow: 'hidden' }}>
      {/* NEW TOKEN OPTIMIZATION LAYOUT */}
      <Box sx={{ maxWidth: 1400, mx: 'auto', mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4, alignItems: 'stretch' }}>
          
          {/* Left Column (Text & Blue Card) */}
          <Box sx={{ width: { xs: '100%', lg: '33.333%' }, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: { xs: 4, md: 8 } }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', color: '#ff6600', textTransform: 'uppercase', mb: 2 }}>
                Token Optimisation
              </Typography>
              <Typography variant="h3" sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, fontWeight: 700, color: 'var(--text-primary)', mb: 2, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                And it keeps getting efficient.
              </Typography>
              <Typography sx={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                The router spends what a request needs, not what the biggest model charges.
              </Typography>
            </Box>
            
            {/* Orange Card */}
            <Box sx={{ 
              background: isDark ? 'linear-gradient(135deg, rgba(255,102,0,0.1) 0%, rgba(255,102,0,0.02) 100%)' : 'linear-gradient(135deg, rgba(255,102,0,0.05) 0%, #FFFFFF 100%)',
              borderRadius: '24px', p: 4, mt: 'auto',
              border: isDark ? '1px solid rgba(255, 102, 0, 0.2)' : '1px solid rgba(255, 102, 0, 0.1)',
              boxShadow: isDark ? 'none' : '0 10px 40px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 3 }}>
                  <Box>
                    <Typography sx={{ fontSize: '1rem', color: isDark ? '#ff6600' : '#ff6600', fontWeight: 600, lineHeight: 1, mb: 0.5 }}>Up to</Typography>
                    <Typography sx={{ fontSize: '4.5rem', fontWeight: 800, color: '#ff6600', lineHeight: 1, letterSpacing: '-0.03em' }}>60%</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.95rem', color: isDark ? '#ff6600' : '#ff6600', fontWeight: 600, lineHeight: 1.3, opacity: 0.8 }}>
                    fewer<br/>tokens<br/>billed.
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.95rem', color: isDark ? '#94A3B8' : '#64748B', mt: 3 }}>
                  Smarter model selection.<br/>Lower cost. Same quality.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Column (Big Interactive Infographic matching Image 1) */}
          <Box sx={{ 
            width: { xs: '100%', lg: '66.666%' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box 
              component="img"
              src="/images/optimization.png"
              alt="Token Optimization Router"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                display: 'block',
                borderRadius: '32px',
                boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.05)'
              }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
