import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

/* The model picker as it ships in the app, measured off ais.openledger.xyz in
   light mode: the 28px panel, the pill search and sort, the modality tabs, the
   rows with their capability pills, and the card that follows the cursor.

   Values here are the app's own, not the site's tokens, because the point is
   that this looks like the product rather than like the page around it. */
const P = {
  panel: '#FFFFFF',
  line: '#E9E8E4',
  lineStrong: '#C2C0BB',
  field: '#E9E8E4',
  ink: '#262626',
  inkMuted: '#6D6C6A',
};

/* Capability pills. The app colours incognito and TEE and leaves the rest
   slate, which is the whole legend. */
const PILL = {
  incognito: { bg: '#F3E8FF', bd: '#DDD6FE', fg: '#7C3AED' },
  tee: { bg: '#D1FAE5', bd: '#A7F3D0', fg: '#059669' },
  plain: { bg: '#E2E8F0', bd: '#CBD5E1', fg: '#475569' },
  signin: { bg: '#F1F1F1', bd: '#E9E8E4', fg: '#6D6C6A' },
};

const TABS = ['All', 'Text', 'Image', 'Video'];

/* A slice of the catalog, in the app's own order and wording. */
const ROWS = [
  { code: 'OA', name: 'GPT 3.5 Turbo', selected: true, pills: [['Incognito', 'incognito']] },
  { code: 'AN', name: 'Claude Fable 5', pills: [['Incognito', 'incognito']] },
  { code: 'AN', name: 'Claude Haiku 4.5', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'AN', name: 'Claude Opus 5', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'AN', name: 'Claude Sonnet 5', pills: [['Incognito', 'incognito']] },
  { code: 'MS', name: 'Codestral 2508', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'DS', name: 'Deepseek R1 0528', hovered: true, pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'DS', name: 'Deepseek V4 Flash', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
  { code: 'DS', name: 'Deepseek V4 Flash E2ee', pills: [['E2EE', 'plain'], ['TEE', 'tee']] },
  { code: 'DS', name: 'Deepseek V4 Pro', pills: [['Incognito', 'incognito'], ['web', 'plain']] },
];

const Pill = ({ label, tone }) => {
  const t = PILL[tone] || PILL.plain;
  return (
    <Box
      sx={{
        px: '8px',
        py: '2px',
        borderRadius: '9999px',
        backgroundColor: t.bg,
        border: `1px solid ${t.bd}`,
        flexShrink: 0,
      }}
    >
      <Typography sx={{ fontSize: '10px', fontWeight: 600, lineHeight: 1.1, color: t.fg, whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
  );
};

const Star = ({ filled = false }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? P.inkMuted : 'none'} stroke={P.inkMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function ModelPickerWindow() {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        /* An illustration of the app, not a control surface. */
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 520 }}>
      <Box
        sx={{
          width: '100%',
          backgroundColor: P.panel,
          border: `1px solid ${P.line}`,
          borderRadius: '28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          p: { xs: 1.75, sm: 2 },
          fontFamily: '"Geist", "Inter", sans-serif',
        }}
      >
        {/* Search, favourites, sort */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              height: 33,
              display: 'flex',
              alignItems: 'center',
              gap: 0.9,
              px: 1.4,
              borderRadius: '9999px',
              backgroundColor: P.field,
              border: `1px solid ${P.lineStrong}`,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={P.inkMuted} strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Typography sx={{ fontSize: '14px', color: P.inkMuted }}>Search models…</Typography>
          </Box>

          <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '9999px', border: `1px solid ${P.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star />
          </Box>

          <Box sx={{ height: 32, flexShrink: 0, px: 1.25, borderRadius: '9999px', backgroundColor: P.field, display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.inkMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h12M3 12h9M3 18h6" />
            </svg>
            <Typography sx={{ fontSize: '12px', color: P.inkMuted, whiteSpace: 'nowrap' }}>A–Z</Typography>
          </Box>
        </Box>

        {/* Modality tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1.5, mb: 0.5 }}>
          {TABS.map((t) => {
            const on = t === 'Text';
            return (
              <Box
                key={t}
                sx={{
                  height: 32,
                  px: 1.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  borderRadius: '9999px',
                  backgroundColor: on ? P.field : 'transparent',
                }}
              >
                <Typography sx={{ fontSize: '13px', fontWeight: on ? 600 : 500, color: on ? P.ink : P.inkMuted }}>
                  {t}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Rows. The list runs past the panel in the app, so it is clipped
            here and faded at the foot rather than given a false ending. */}
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ maxHeight: { xs: 300, sm: 352 }, overflow: 'hidden' }}>
            {ROWS.map((m) => (
              <Box
                key={m.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: 1.25,
                  py: 1,
                  borderRadius: '20px',
                  backgroundColor: m.selected ? P.panel : 'transparent',
                  border: `1px solid ${m.selected ? P.lineStrong : 'transparent'}`,
                }}
              >
                <BrandTile code={m.code} size={16} round />

                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                    <Typography sx={{ fontSize: '13.5px', fontWeight: 600, color: P.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {m.name}
                    </Typography>
                    {m.selected && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </Box>
                  {!m.selected && (
                    <Box sx={{ mt: 0.4 }}>
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.4, px: '8px', py: '2px', borderRadius: '9999px', backgroundColor: PILL.signin.bg, border: `1px solid ${PILL.signin.bd}` }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={PILL.signin.fg} strokeWidth="2.6" strokeLinecap="round">
                          <rect x="4" y="11" width="16" height="10" rx="2" />
                          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                        </svg>
                        <Typography sx={{ fontSize: '10px', fontWeight: 600, lineHeight: 1.1, color: PILL.signin.fg }}>Sign in</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 0.6, flexShrink: 0 }}>
                  {m.pills.map(([label, tone]) => (
                    <Pill key={label} label={label} tone={tone} />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', flexShrink: 0 }}>
                  <Star />
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 64,
              background: `linear-gradient(to bottom, rgba(255,255,255,0), ${P.panel})`,
            }}
          />
        </Box>
      </Box>

      {/* The card the app shows against whichever row is under the cursor. It
          sits clear of the panel, as it does in the app, so it never covers the
          rows it is describing. */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          left: '100%',
          ml: 2.5,
          top: '34%',
          width: 288,
          backgroundColor: P.panel,
          border: `1px solid ${P.line}`,
          borderRadius: '28px',
          p: 1.75,
          boxShadow: '0 18px 40px -16px rgba(0, 0, 0, 0.22)',
          fontFamily: '"Geist", "Inter", sans-serif',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BrandTile code="DS" size={18} round />
          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: P.ink }}>Deepseek R1 0528</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.6, mt: 1 }}>
          <Pill label="Incognito" tone="incognito" />
          <Pill label="web" tone="plain" />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2, mt: 1.5, pt: 1.25, borderTop: `1px solid ${P.line}` }}>
          <Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: P.ink }}>164K</Typography>
            <Typography sx={{ fontSize: '11px', color: P.inkMuted }}>Context</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: P.ink }}>$0.0005 – $0.0022</Typography>
            <Typography sx={{ fontSize: '11px', color: P.inkMuted }}>Est. cost/1k tokens</Typography>
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}
