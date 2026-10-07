import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

/* The app itself, measured off ais.openledger.xyz in dark mode: the whole
   window, rail included, with the model picker open over it.

   Values here are the app's own rather than the site's tokens, because the
   point is that this reads as the product and not as the page around it. */
const APP = 'https://ais.openledger.xyz/chat';

const D = {
  page: '#09090B',
  panel: '#18181B',
  panelHi: '#1C1C1F',
  line: '#27272A',
  lineHi: '#3F3F46',
  ink: '#DCDCDC',
  inkMuted: '#A1A1AA',
};

const CHIPS = ['Weather', 'Code', 'Write', 'Analyze', 'Brainstorm'];

/* The rail, as glyphs rather than a nav: at this size they read as the app's
   shape, which is all they need to do. */
const RailIcon = ({ d, circle = false }) => (
  <Box
    sx={{
      width: 26,
      height: 26,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: circle ? `1px solid ${D.line}` : 'none',
      flexShrink: 0,
    }}
  >
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {d}
    </svg>
  </Box>
);

export default function ProductWindow() {
  return (
    <Box
      component="a"
      href={APP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Hey Open and pick a model"
      sx={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: { xs: '18px', md: '24px' },
        overflow: 'hidden',
        border: `1px solid ${D.line}`,
        backgroundColor: D.page,
        boxShadow: '0 30px 70px -24px rgba(15, 23, 42, 0.45)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 40px 90px -24px rgba(15, 23, 42, 0.55)',
        },
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', minHeight: { xs: 420, sm: 520, md: 620 } }}>
        {/* Rail */}
        <Box
          sx={{
            width: { xs: 44, md: 64 },
            flexShrink: 0,
            borderRight: `1px solid ${D.line}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.1,
            py: 2,
          }}
        >
          <RailIcon circle d={<><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18" /></>} />
          <RailIcon circle d={<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></>} />
          <RailIcon circle d={<><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} />
          {[
            <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 20h10" /></>,
            <><path d="M12 3v18" /><path d="M5 8l-2 6h4z" /><path d="M19 8l-2 6h4z" /></>,
            <><path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" /></>,
            <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="10" r="1" /><circle cx="15" cy="10" r="1" /></>,
            <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12h8" /></>,
          ].map((d, i) => <RailIcon key={i} d={d} />)}

          <Box sx={{ width: 22, height: '1px', backgroundColor: D.line, my: 0.6 }} />

          {[
            <><path d="M3 21V8l6-4 6 4v13" /><path d="M9 21v-5h3v5" /></>,
            <><path d="M5 19l5-9 4 4 5-9" /><circle cx="19" cy="5" r="2" /></>,
            <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
            <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
          ].map((d, i) => <RailIcon key={`b${i}`} d={d} />)}
        </Box>

        {/* Canvas */}
        <Box sx={{ flex: 1, minWidth: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: { xs: 1.2, md: 1.8 } }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.7, px: 1.4, py: 0.7, borderRadius: '9999px', backgroundColor: D.panel, border: `1px solid ${D.line}` }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="13" rx="2" /><path d="M16 12h2" />
              </svg>
              <Typography sx={{ fontSize: { xs: 10, md: 11.5 }, color: D.ink, whiteSpace: 'nowrap' }}>Connect wallet</Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: { xs: 2, md: 4 }, pb: { xs: 3, md: 5 } }}>
            <Typography
              sx={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontWeight: 500,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.6rem' },
                lineHeight: 1.18,
                color: D.ink,
                textAlign: 'center',
              }}
            >
              Ask anything.
              <Box component="span" sx={{ display: 'block', fontStyle: 'italic' }}>Think in the open.</Box>
            </Typography>

            <Typography sx={{ mt: { xs: 1.2, md: 1.8 }, fontSize: { xs: 11, md: 13.5 }, lineHeight: 1.6, color: D.inkMuted, textAlign: 'center', maxWidth: 360 }}>
              A private, multi-model AI experience with no account required to start.
            </Typography>

            {/* Composer */}
            <Box sx={{ width: '100%', maxWidth: 560, mt: { xs: 2.2, md: 3.2 }, backgroundColor: D.panel, border: `1px solid ${D.line}`, borderRadius: '20px', px: { xs: 1.6, md: 2 }, py: { xs: 1.3, md: 1.6 } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Typography sx={{ flex: 1, fontSize: { xs: 11.5, md: 13.5 }, color: D.inkMuted }}>
                  Send a message…  (@ to mention, / for commands)
                </Typography>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: { xs: 2, md: 2.6 } }}>
                <BrandTile code="OA" size={16} round />
                <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: D.ink, whiteSpace: 'nowrap' }}>GPT 3.5 Turbo</Typography>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <Box sx={{ flex: 1 }} />
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.inkMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
                <Box sx={{ width: { xs: 26, md: 30 }, height: { xs: 26, md: 30 }, borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={D.page} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.9, mt: { xs: 1.6, md: 2.2 } }}>
              {CHIPS.map((c) => (
                <Box key={c} sx={{ px: { xs: 1.2, md: 1.75 }, py: { xs: 0.5, md: 0.8 }, borderRadius: '9999px', backgroundColor: D.panel, border: `1px solid ${D.line}` }}>
                  <Typography sx={{ fontSize: { xs: 10, md: 12 }, color: D.ink, whiteSpace: 'nowrap' }}>{c}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
