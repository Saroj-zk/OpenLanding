import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

const ORANGE = '#FF6600';

export const MODELS = {
  GG: { code: 'GG', name: 'Gemini', full: 'Gemini 1.5 Pro' },
  AN: { code: 'AN', name: 'Claude', full: 'Claude 3.5 Sonnet' },
  OA: { code: 'OA', name: 'GPT-4o', full: 'GPT-4o' },
  DS: { code: 'DS', name: 'DeepSeek', full: 'DeepSeek R1' },
};

const MODEL_ORDER = ['GG', 'AN', 'OA', 'DS'];

/* Four facts, written once from the first message. */
const MEMORY = [
  { id: 'veg', label: 'Vegetarian' },
  { id: 'budget', label: 'Budget: $2,000' },
  { id: 'quiet', label: 'Prefers quieter places' },
  { id: 'trip', label: 'Japan · 7 days · October' },
];

/* The scripted thread. `chip` marks a phrase the model pulled from memory. */
const SCRIPT = [
  {
    kind: 'user',
    text: "I'm planning a 7-day trip to Japan in October. My budget is $2,000, I prefer quieter places, and I'm vegetarian.",
  },
  {
    kind: 'reply',
    model: 'GG',
    uses: [],
    parts: [{ t: "Got it. I'll keep the trip within $2,000, prioritize less crowded areas, and keep vegetarian options in mind." }],
  },
  { kind: 'switch', model: 'AN' },
  { kind: 'user', text: 'Find me a good place to stay in Kyoto.' },
  {
    kind: 'reply',
    model: 'AN',
    uses: ['quiet', 'budget', 'veg'],
    parts: [
      { t: "Since you're looking for " },
      { t: 'quieter places', chip: true },
      { t: ' and keeping the full Japan trip ' },
      { t: 'under $2,000', chip: true },
      { t: ", I'd focus on smaller stays around Higashiyama or northern Kyoto, with easy access to " },
      { t: 'vegetarian restaurants', chip: true },
      { t: '.' },
    ],
  },
  { kind: 'switch', model: 'GG' },
  { kind: 'user', text: 'What should I do there on day two?' },
  {
    kind: 'reply',
    model: 'GG',
    uses: ['quiet', 'trip'],
    parts: [
      { t: 'Keeping your preference for ' },
      { t: 'quieter experiences', chip: true },
      { t: " in mind, I'd start early at Nanzen-ji, walk the Philosopher's Path, and spend the afternoon around northern Higashiyama." },
    ],
  },
];

/* What each model says when you hand the thread to it mid-conversation. Every
   one of them opens from memory rather than asking you to repeat anything. */
const HANDOFF = {
  GG: {
    uses: ['veg', 'quiet'],
    parts: [
      { t: 'Picking this up with the same context — ' },
      { t: 'vegetarian', chip: true },
      { t: ' and ' },
      { t: 'quieter places', chip: true },
      { t: '. Ain Soph Journey in Kyoto books easily and stays well off the tourist run.' },
    ],
  },
  AN: {
    uses: ['quiet', 'budget'],
    parts: [
      { t: "I already have your " },
      { t: 'budget', chip: true },
      { t: ' and your preference for ' },
      { t: 'quieter places', chip: true },
      { t: ", so for day three I'd keep you in northern Kyoto rather than the centre." },
    ],
  },
  OA: {
    uses: ['trip', 'budget'],
    parts: [
      { t: 'Working from your ' },
      { t: '7-day October trip', chip: true },
      { t: ' and ' },
      { t: '$2,000 budget', chip: true },
      { t: ': the 7-day JR Pass covers the Tokyo–Kyoto legs with room to spare.' },
    ],
  },
  DS: {
    uses: ['budget', 'trip'],
    parts: [
      { t: 'Against ' },
      { t: '$2,000', chip: true },
      { t: ' across ' },
      { t: '7 days', chip: true },
      { t: ', that is roughly $128 a day once lodging and rail are set aside.' },
    ],
  },
};

const ASK_REPLIES = [
  {
    uses: ['veg', 'budget'],
    parts: [
      { t: 'Still working from the same four facts — ' },
      { t: 'vegetarian', chip: true },
      { t: ', ' },
      { t: 'under $2,000', chip: true },
      { t: '. Nothing to repeat.' },
    ],
  },
  {
    uses: ['quiet', 'trip'],
    parts: [
      { t: 'Noted against your ' },
      { t: 'Japan itinerary', chip: true },
      { t: ', and I am keeping to ' },
      { t: 'quieter places', chip: true },
      { t: '.' },
    ],
  },
];

/* ── Pieces ──────────────────────────────────────────────────────── */

function MemoryChip({ children }) {
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: 'rgba(255, 102, 0, 0.14)',
        color: 'var(--text-primary)',
        borderRadius: '5px',
        px: 0.7,
        py: '1px',
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
      }}
    >
      {children}
    </Box>
  );
}

function Parts({ parts }) {
  return (
    <>
      {parts.map((p, i) => (p.chip ? <MemoryChip key={i}>{p.t}</MemoryChip> : <React.Fragment key={i}>{p.t}</React.Fragment>))}
    </>
  );
}

function SwitchDivider({ model }) {
  const m = MODELS[model];
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2.5 }}>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: 'var(--border-normal)' }} />
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <BrandTile code={model} size={18} round />
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          Switched to {m.name}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: 'var(--border-normal)' }} />
    </Box>
  );
}

function UserBubble({ text }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
      <Box
        sx={{
          maxWidth: '82%',
          px: 2.25,
          py: 1.5,
          borderRadius: '16px 16px 4px 16px',
          backgroundColor: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          color: 'var(--text-primary)',
        }}
      >
        {text}
      </Box>
    </Box>
  );
}

function Reply({ model, parts }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.6, mb: 2.5, alignItems: 'flex-start' }}>
      <Box sx={{ mt: 0.3, flexShrink: 0 }}>
        <BrandTile code={model} size={26} />
      </Box>
      <Typography sx={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-primary)', pt: 0.1 }}>
        <Parts parts={parts} />
      </Typography>
    </Box>
  );
}

/* ── Demo ────────────────────────────────────────────────────────── */

export function MemoryChatDemo() {
  const [shown, setShown] = React.useState(0);
  const [extra, setExtra] = React.useState([]);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const askCount = React.useRef(0);
  const scrollRef = React.useRef(null);

  // Play the scripted thread out once.
  React.useEffect(() => {
    if (shown >= SCRIPT.length) return undefined;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 400 : 1150);
    return () => clearTimeout(t);
  }, [shown]);

  const thread = React.useMemo(() => [...SCRIPT.slice(0, shown), ...extra], [shown, extra]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread.length]);

  const lastReply = [...thread].reverse().find((m) => m.kind === 'reply');
  const usedNow = lastReply ? lastReply.uses : [];
  const activeModel = lastReply ? lastReply.model : 'GG';
  const done = shown >= SCRIPT.length;

  const handoff = (code) => {
    setMenuOpen(false);
    if (code === activeModel) return;
    setShown(SCRIPT.length);
    setExtra((e) => [...e, { kind: 'switch', model: code }, { kind: 'reply', model: code, ...HANDOFF[code] }]);
  };

  const send = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const canned = ASK_REPLIES[askCount.current % ASK_REPLIES.length];
    askCount.current += 1;
    setDraft('');
    setShown(SCRIPT.length);
    setExtra((x) => [...x, { kind: 'user', text }, { kind: 'reply', model: activeModel, ...canned }]);
  };

  const replay = () => {
    setExtra([]);
    askCount.current = 0;
    setShown(0);
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 0.62fr)' },
        gap: { xs: 2.5, md: 3 },
        alignItems: 'stretch',
      }}
    >
      {/* ── Chat window ─────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-normal)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Header: who is answering right now */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: { xs: 2.25, sm: 3 },
            py: 2,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              px: 1,
              py: 0.6,
              ml: -1,
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              backgroundColor: menuOpen ? 'var(--bg-glass)' : 'transparent',
              '&:hover': { backgroundColor: 'var(--bg-glass)' },
            }}
          >
            <BrandTile code={activeModel} size={26} />
            <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)' }}>
              {MODELS[activeModel].name}
            </Typography>
            <Box
              aria-hidden="true"
              sx={{
                display: 'flex',
                color: 'var(--text-muted)',
                transform: menuOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Box>
          </Box>

          {menuOpen && (
            <Box
              role="listbox"
              sx={{
                position: 'absolute',
                top: 'calc(100% - 4px)',
                left: { xs: 12, sm: 20 },
                zIndex: 5,
                minWidth: 210,
                p: 0.75,
                borderRadius: '14px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-normal)',
                boxShadow: 'var(--shadow-popup)',
              }}
            >
              {MODEL_ORDER.map((code) => (
                <Box
                  key={code}
                  component="button"
                  type="button"
                  role="option"
                  aria-selected={code === activeModel}
                  onClick={() => handoff(code)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.3,
                    px: 1.25,
                    py: 1.1,
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    backgroundColor: code === activeModel ? 'rgba(255, 102, 0, 0.1)' : 'transparent',
                    '&:hover': { backgroundColor: code === activeModel ? 'rgba(255, 102, 0, 0.14)' : 'var(--bg-glass)' },
                  }}
                >
                  <BrandTile code={code} size={22} />
                  <Typography
                    sx={{
                      flex: 1,
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      color: code === activeModel ? ORANGE : 'var(--text-primary)',
                    }}
                  >
                    {MODELS[code].full}
                  </Typography>
                  {code === activeModel && (
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, flexShrink: 0 }} />
                  )}
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ORANGE, boxShadow: `0 0 8px ${ORANGE}` }} />
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              {MEMORY.length} in memory
            </Typography>
          </Box>
        </Box>

        {/* Thread */}
        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            minHeight: { xs: 360, md: 440 },
            maxHeight: { md: 520 },
            overflowY: 'auto',
            px: { xs: 2.25, sm: 3 },
            pt: 3,
            pb: 1,
          }}
        >
          {thread.map((m, i) => (
            <Box
              key={i}
              sx={{
                animation: 'olMsgIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              {m.kind === 'user' && <UserBubble text={m.text} />}
              {m.kind === 'reply' && <Reply model={m.model} parts={m.parts} />}
              {m.kind === 'switch' && <SwitchDivider model={m.model} />}
            </Box>
          ))}
          <style>{`
            @keyframes olMsgIn {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </Box>

        {/* Composer */}
        <Box
          component="form"
          onSubmit={send}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            m: { xs: 1.75, sm: 2.25 },
            pl: 2,
            pr: 0.75,
            py: 0.75,
            borderRadius: '9999px',
            border: '1px solid var(--border-normal)',
            backgroundColor: 'var(--bg-glass)',
          }}
        >
          <Box aria-hidden="true" sx={{ display: 'flex', color: 'var(--text-muted)', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </Box>
          <Box
            component="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask anything..."
            aria-label="Ask anything"
            sx={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '0.92rem',
              fontFamily: 'inherit',
              color: 'var(--text-primary)',
              '&::placeholder': { color: 'var(--text-muted)' },
            }}
          />
          <Box
            component="button"
            type="submit"
            aria-label="Send"
            sx={{
              width: 34,
              height: 34,
              flexShrink: 0,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              backgroundColor: ORANGE,
              boxShadow: `0 4px 12px ${ORANGE}55`,
              transition: 'all 0.2s ease',
              '&:hover': { backgroundColor: '#E65C00' },
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </Box>
        </Box>
      </Box>

      {/* ── Unified memory ──────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          p: { xs: 2.25, sm: 3 },
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-normal)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.5 }}>
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Unified memory
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            {MEMORY.length} / {MEMORY.length}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {MEMORY.map((item) => {
            const used = usedNow.includes(item.id);
            return (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.3,
                  px: 1.75,
                  py: 1.4,
                  borderRadius: '12px',
                  backgroundColor: used ? 'rgba(255, 102, 0, 0.09)' : 'var(--bg-glass)',
                  border: `1px solid ${used ? 'rgba(255, 102, 0, 0.35)' : 'var(--border-subtle)'}`,
                  transition: 'background-color 0.45s ease, border-color 0.45s ease',
                }}
              >
                <Box sx={{ display: 'flex', flexShrink: 0, color: used ? ORANGE : 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </Box>
                <Typography sx={{ flex: 1, fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.label}
                </Typography>
                {used && (
                  <Typography
                    sx={{
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: ORANGE,
                      flexShrink: 0,
                    }}
                  >
                    USED
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        <Typography sx={{ mt: 2.5, fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Written once, from the first message. Every model after it reads the same four facts — nobody had to repeat
          them.
        </Typography>

        <Box
          sx={{
            mt: 2.5,
            p: 2,
            borderRadius: '14px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-glass)',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              mb: 1,
            }}
          >
            Yours to change
          </Typography>
          <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--text-secondary)', mb: 1.75 }}>
            Every entry can be reviewed, edited, or removed. Nothing is remembered that you have not chosen to keep.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Review', 'Edit', 'Delete'].map((label) => (
              <Typography
                key={label}
                sx={{
                  px: 1.5,
                  py: 0.6,
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-normal)',
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 'auto', pt: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
          <Box
            component="button"
            type="button"
            onClick={replay}
            disabled={!done}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.25,
              py: 1,
              borderRadius: '9999px',
              cursor: done ? 'pointer' : 'default',
              opacity: done ? 1 : 0.45,
              fontSize: '0.85rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-normal)',
              backgroundColor: 'var(--bg-card)',
              transition: 'all 0.2s ease',
              '&:hover': done ? { borderColor: ORANGE, color: ORANGE } : {},
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Replay
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MemoryChatDemo;
