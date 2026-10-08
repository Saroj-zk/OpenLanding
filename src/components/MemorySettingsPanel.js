import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/* The Memory pane of the app's settings, as it ships. Values are the app's own
   rather than the site's tokens, because the point is that this reads as the
   product and not as the page around it.

   Everything stated here is what the app actually says. The copy is lifted,
   not written: it is the only honest way to show someone what they will get. */
const APP = 'https://ais.openledger.xyz/chat';

const D = {
  shell: '#0B0B0D',
  rail: '#111113',
  panel: '#18181B',
  line: '#27272A',
  lineSoft: '#1F1F22',
  ink: '#ECECEC',
  inkMid: '#A1A1AA',
  inkDim: '#6D6D73',
};

const NAV = [
  { group: 'General', items: [['Appearance', 'palette'], ['Memory', 'brain']] },
  { group: 'Payments', items: [['Billing', 'card'], ['Usage', 'bolt']] },
  { group: 'Data & Information', items: [['Storage', 'drive']] },
];

const TOGGLES = [
  {
    label: 'Use memory',
    detail: 'Let the assistant use what it knows about you in new chats.',
    on: true,
  },
  {
    label: 'Generate memory from chats',
    detail: 'Automatically save durable facts as you chat.',
    on: true,
  },
  {
    label: 'Share memory with external models',
    detail:
      'Off by default. When off, memory is not sent to models routed to outside providers (OpenAI, Anthropic, Google, OpenRouter…).',
    on: false,
  },
];

const Glyph = ({ name, size = 13, color = D.inkMid }) => {
  const paths = {
    palette: <><circle cx="12" cy="12" r="9" /><circle cx="8.5" cy="10.5" r="1" /><circle cx="12" cy="8" r="1" /><circle cx="15.5" cy="10.5" r="1" /></>,
    brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8A3 3 0 0 0 9 20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8A3 3 0 0 1 15 20a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /></>,
    card: <><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20" /></>,
    bolt: <><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></>,
    drive: <><rect x="2" y="5" width="20" height="6" rx="2" /><rect x="2" y="13" width="20" height="6" rx="2" /><path d="M6 8h.01M6 16h.01" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

const Toggle = ({ on }) => (
  <Box
    sx={{
      width: 38,
      height: 21,
      flexShrink: 0,
      borderRadius: '9999px',
      backgroundColor: on ? '#FFFFFF' : '#2A2A2E',
      border: `1px solid ${on ? '#FFFFFF' : '#37373C'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: on ? 'flex-end' : 'flex-start',
      px: '2px',
      boxSizing: 'border-box',
    }}
  >
    <Box
      sx={{
        width: 15,
        height: 15,
        borderRadius: '50%',
        backgroundColor: on ? '#FFFFFF' : '#6D6D73',
        boxShadow: on ? '0 1px 3px rgba(0,0,0,0.45)' : 'none',
      }}
    />
  </Box>
);

const EmptyBox = ({ children }) => (
  <Box
    sx={{
      mt: 1.4,
      py: { xs: 3, md: 4.5 },
      px: 2,
      borderRadius: '14px',
      border: `1px dashed ${D.line}`,
      textAlign: 'center',
    }}
  >
    <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: D.inkDim }}>{children}</Typography>
  </Box>
);

export default function MemorySettingsPanel() {
  return (
    <Box
      component="a"
      href={APP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Hey Open and manage what it remembers"
      sx={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: { xs: '18px', md: '26px' },
        overflow: 'hidden',
        backgroundColor: D.shell,
        border: `1px solid ${D.line}`,
        boxShadow: '0 30px 70px -24px rgba(15, 23, 42, 0.45)',
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 40px 90px -24px rgba(15, 23, 42, 0.55)' },
      }}
    >
      <Box sx={{ display: 'flex', minHeight: { xs: 'auto', md: 560 } }}>
        {/* Rail */}
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            width: { sm: 180, md: 216 },
            flexShrink: 0,
            backgroundColor: D.rail,
            borderRight: `1px solid ${D.lineSoft}`,
            p: { sm: 1.6, md: 2 },
          }}
        >
          <Box sx={{ width: 28, height: 28, borderRadius: '10px', backgroundColor: '#1D1D20', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={D.inkMid} strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </Box>

          {NAV.map(({ group, items }) => (
            <Box key={group} sx={{ mb: 2.2 }}>
              <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: D.inkDim, mb: 1, pl: 1 }}>
                {group}
              </Typography>
              {items.map(([label, icon]) => {
                const on = label === 'Memory';
                return (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.1,
                      px: 1,
                      py: 0.9,
                      borderRadius: '12px',
                      backgroundColor: on ? '#1F1F23' : 'transparent',
                    }}
                  >
                    <Glyph name={icon} color={on ? D.ink : D.inkMid} />
                    <Typography sx={{ fontSize: 12.5, fontWeight: on ? 600 : 400, color: on ? D.ink : D.inkMid }}>
                      {label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          ))}

          <Box sx={{ flex: 1 }} />

          <Box sx={{ borderRadius: '14px', backgroundColor: '#1A1A1D', p: 1.4, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: D.ink, lineHeight: 1.25 }}>Hey Open</Typography>
              <Typography sx={{ fontSize: 10, color: D.inkDim, lineHeight: 1.3 }}>Unlock more capabilities</Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ px: 1.3, py: 0.55, borderRadius: '9999px', backgroundColor: '#FFFFFF', flexShrink: 0 }}>
              <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#0B0B0D' }}>Upgrade</Typography>
            </Box>
          </Box>
        </Box>

        {/* Pane */}
        <Box sx={{ flex: 1, minWidth: 0, p: { xs: 2.4, sm: 3, md: 4 } }}>
          <Typography sx={{ fontSize: { xs: '1.25rem', md: '1.6rem' }, fontWeight: 600, color: D.ink, mb: 1.6 }}>
            Memory
          </Typography>
          <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, lineHeight: 1.6, color: D.inkMid, mb: 2.6 }}>
            Memory is stored only in this browser. It never syncs and is removed if you clear site data.
          </Typography>

          {TOGGLES.map((row, i) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                py: { xs: 1.6, md: 2 },
                borderTop: i === 0 ? 'none' : `1px solid ${D.lineSoft}`,
              }}
            >
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 500, color: D.ink, mb: 0.5 }}>
                  {row.label}
                </Typography>
                <Typography sx={{ fontSize: { xs: 11, md: 12.5 }, lineHeight: 1.55, color: D.inkMid }}>
                  {row.detail}
                </Typography>
              </Box>
              <Toggle on={row.on} />
            </Box>
          ))}

          <Box sx={{ height: '1px', backgroundColor: D.lineSoft, my: { xs: 2, md: 2.6 } }} />

          <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600, color: D.ink, mb: 1.3 }}>
            Add a memory
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.2 }}>
            <Box sx={{ flex: 1, minWidth: 0, px: 1.8, py: 1.2, borderRadius: '12px', backgroundColor: D.panel, border: `1px solid ${D.line}` }}>
              <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: D.inkDim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                e.g. I prefer concise answers and use pnpm
              </Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.8, borderRadius: '12px', backgroundColor: '#242428', flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.ink} strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: D.ink }}>Add</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600, color: D.ink, mt: { xs: 2.4, md: 3 } }}>
            Saved memories <Box component="span" sx={{ color: D.inkDim, fontWeight: 400 }}>(0)</Box>
          </Typography>
          <EmptyBox>Nothing yet — memories build up as you chat.</EmptyBox>

          <Box sx={{ height: '1px', backgroundColor: D.lineSoft, my: { xs: 2.2, md: 3 } }} />

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontSize: { xs: 13, md: 15 }, fontWeight: 600, color: D.ink, mb: 0.6 }}>
                Files <Box component="span" sx={{ color: D.inkDim, fontWeight: 400 }}>(0)</Box>
              </Typography>
              <Typography sx={{ fontSize: { xs: 11, md: 12.5 }, lineHeight: 1.55, color: D.inkMid }}>
                Upload a PDF or text file. Its content is chunked and searched alongside your memories — up to 10.0 MB per file.
              </Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, px: 1.6, py: 1, borderRadius: '12px', backgroundColor: D.panel, border: `1px solid ${D.line}`, flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={D.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 18v2h16v-2" />
              </svg>
              <Typography sx={{ fontSize: { xs: 11.5, md: 13 }, color: D.ink }}>Upload</Typography>
            </Box>
          </Box>
          <EmptyBox>No documents yet — upload a PDF or text file to add it to memory.</EmptyBox>
        </Box>
      </Box>
    </Box>
  );
}
