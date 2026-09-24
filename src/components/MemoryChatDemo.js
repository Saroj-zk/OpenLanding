import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

const ORANGE = '#FF6600';

const MODEL_ORDER = ['GG', 'AN', 'OA', 'DS'];

export const MODELS = {
  GG: { code: 'GG', name: 'Gemini', full: 'Gemini 1.5 Pro' },
  AN: { code: 'AN', name: 'Claude', full: 'Claude 3.5 Sonnet' },
  OA: { code: 'OA', name: 'GPT-4o', full: 'GPT-4o' },
  DS: { code: 'DS', name: 'DeepSeek', full: 'DeepSeek R1' },
};

/* Four facts, written once from the first message. */
const MEMORY = [
  { id: 'veg', label: 'Vegetarian' },
  { id: 'budget', label: 'Budget: $2,000' },
  { id: 'quiet', label: 'Prefers quieter places' },
  { id: 'trip', label: 'Japan · 7 days · October' },
];

/* The visitor names the model they want; the thread hands over and the new
   model answers from memory. Each request after the first carries no context
   at all, so every detail in the answers comes out of the four saved facts,
   which is the only way to show what unified memory is actually for. */
const SCRIPT = [
  {
    kind: 'user',
    text: "I'm planning a 7-day trip to Japan in October. My budget is $2,000, I'm vegetarian, and I'd rather avoid crowds.",
  },
  {
    kind: 'reply',
    model: 'GG',
    saves: ['veg', 'budget', 'quiet', 'trip'],
    uses: [],
    parts: [
      { t: "Got it. I've saved four things: Japan for 7 days in October, a $2,000 budget, vegetarian, and quieter places. Any model you switch to reads the same notes, so you won't have to say this twice." },
    ],
  },

  { kind: 'switch', model: 'AN' },
  { kind: 'user', text: 'Where should I stay in Kyoto?' },
  {
    kind: 'reply',
    model: 'AN',
    uses: ['quiet', 'budget', 'veg'],
    parts: [
      { t: 'Higashiyama and northern Kyoto both stay ' },
      { t: 'quiet', chip: true },
      { t: ' once the day visitors leave. Small ryokan there are around ¥12,000 a night, so the week still fits ' },
      { t: 'inside $2,000', chip: true },
      { t: ', and both areas have ' },
      { t: 'vegetarian', chip: true },
      { t: ' places within walking distance.' },
    ],
  },

  { kind: 'switch', model: 'OA' },
  { kind: 'user', text: 'Continue where I left off. What should I do on day two?' },
  {
    kind: 'reply',
    model: 'OA',
    uses: ['quiet', 'trip'],
    parts: [
      { t: 'Start at Nanzen-ji when it opens, then walk the Philosopher\u2019s Path north to Shisen-d\u014d. It is a ' },
      { t: 'quieter', chip: true },
      { t: ' route than Fushimi Inari, and all of it is on foot. Early ' },
      { t: 'October', chip: true },
      { t: ' is the best window, before the maple crowds arrive.' },
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
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2.5 }}>
      <Box sx={{ flex: 1, height: '1px', backgroundColor: 'var(--border-normal)' }} />
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
        <BrandTile code={model} size={18} round />
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          Switched to {MODELS[model].name}
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

/* The model picker, shown mid-selection: it opens, the incoming model is
   highlighted, then it closes and the thread hands over. */
function PickerMenu({ target }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 'calc(100% - 6px)',
        left: { xs: 14, sm: 20 },
        zIndex: 6,
        minWidth: 232,
        p: 0.75,
        borderRadius: '14px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-normal)',
        boxShadow: 'var(--shadow-popup)',
        animation: 'olMenuIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      {MODEL_ORDER.map((code) => {
        const picked = code === target;
        return (
          <Box
            key={code}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.3,
              px: 1.25,
              py: 1.05,
              borderRadius: '10px',
              backgroundColor: picked ? 'rgba(255, 102, 0, 0.12)' : 'transparent',
              transition: 'background-color 0.25s ease',
            }}
          >
            <BrandTile code={code} size={22} />
            <Typography
              sx={{
                flex: 1,
                fontSize: '0.86rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: picked ? ORANGE : 'var(--text-primary)',
              }}
            >
              {MODELS[code].full}
            </Typography>
            {picked && (
              <Box sx={{ display: 'flex', flexShrink: 0, color: ORANGE }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/* Shown while the incoming model pulls the context across. */
function ReadingRow({ model }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.6, mb: 2.5, alignItems: 'center' }}>
      <Box sx={{ flexShrink: 0 }}>
        <BrandTile code={model} size={26} />
      </Box>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.2,
          px: 1.75,
          py: 1.05,
          borderRadius: '12px',
          backgroundColor: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.55 }}>
          {[0, 1, 2].map((d) => (
            <Box
              key={d}
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: ORANGE,
                animation: `olDot 1.05s ease-in-out ${d * 0.16}s infinite`,
              }}
            />
          ))}
        </Box>
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          {MODELS[model].name} is reading your memory
        </Typography>
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

function ThreadItem({ item }) {
  if (item.kind === 'user') return <UserBubble text={item.text} />;
  if (item.kind === 'reply') return <Reply model={item.model} parts={item.parts} />;
  return <SwitchDivider model={item.model} />;
}

/* ── Demo ────────────────────────────────────────────────────────── */

export function MemoryChatDemo() {
  const [shown, setShown] = React.useState(0);
  const [inView, setInView] = React.useState(false);
  const rootRef = React.useRef(null);

  // Only run while the demo is on screen. Without this the thread plays out
  // during page load and has already finished by the time anyone reaches it.
  React.useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const el = rootRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Each kind gets its own beat. The pause before a reply is where the
  // incoming model is shown reading memory.
  React.useEffect(() => {
    if (!inView) return undefined;

    const next = SCRIPT[shown];
    if (next) {
      const wait = shown === 0 ? 500 : { user: 1150, switch: 1900, reply: 1450 }[next.kind];
      const t = setTimeout(() => setShown((n) => n + 1), wait);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setShown(0), 3800);
    return () => clearTimeout(t);
  }, [shown, inView]);

  const thread = SCRIPT.slice(0, shown);
  const pending = SCRIPT[shown];
  const fetching = pending && pending.kind === 'reply' ? pending : null;
  // A pending switch is the moment the picker is open and being chosen from.
  const picking = pending && pending.kind === 'switch' ? pending.model : null;
  const lastReply = [...thread].reverse().find((m) => m.kind === 'reply');
  const lastSwitch = [...thread].reverse().find((m) => m.kind === 'switch');

  const usedNow = lastReply ? lastReply.uses : [];
  const savedNow = lastReply && lastReply.saves ? lastReply.saves : [];
  const readingNow = fetching ? fetching.uses : [];
  // The header shows whichever model is in effect. It only changes once the
  // pick has landed, so you watch the name change as the menu closes.
  const activeModel = lastSwitch ? lastSwitch.model : SCRIPT[1].model;

  return (
    <Box
      ref={rootRef}
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
        {/* Header: the model updates itself as the thread hands over */}
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
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              minWidth: 0,
              px: 1,
              py: 0.6,
              ml: -1,
              borderRadius: '10px',
              backgroundColor: picking ? 'var(--bg-glass)' : 'transparent',
              transition: 'background-color 0.25s ease',
            }}
          >
            <BrandTile code={activeModel} size={26} />
            <Typography
              sx={{
                fontSize: '0.95rem',
                fontWeight: 700,
                color: 'var(--text-heading)',
                whiteSpace: 'nowrap',
              }}
            >
              {MODELS[activeModel].name}
            </Typography>
            <Box
              aria-hidden="true"
              sx={{
                display: 'flex',
                color: 'var(--text-muted)',
                transform: picking ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.25s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Box>
          </Box>

          {picking && <PickerMenu target={picking} />}

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

        {/* Thread. A hidden copy of the finished conversation holds the height
            open, so the window is exactly as tall as the full thread at any
            width, so it never grows as messages land and never scrolls. */}
        <Box sx={{ position: 'relative', flex: 1 }}>
          <style>{`
            @keyframes olMsgIn {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes olDot {
              0%, 100% { opacity: 0.25; transform: translateY(0); }
              50%      { opacity: 1; transform: translateY(-2px); }
            }
            @keyframes olMenuIn {
              from { opacity: 0; transform: translateY(-6px) scale(0.98); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes olReading {
              0%, 100% { border-color: rgba(255, 102, 0, 0.3); }
              50%      { border-color: rgba(255, 102, 0, 0.85); }
            }
          `}</style>

          <Box aria-hidden="true" sx={{ visibility: 'hidden', px: { xs: 2.25, sm: 3 }, pt: 3, pb: 0.5 }}>
            {SCRIPT.map((m, i) => (
              <ThreadItem key={i} item={m} />
            ))}
          </Box>

          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, px: { xs: 2.25, sm: 3 }, pt: 3, pb: 0.5 }}>
            {thread.map((m, i) => (
              <Box key={i} sx={{ animation: 'olMsgIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                <ThreadItem item={m} />
              </Box>
            ))}
            {fetching && (
              <Box sx={{ animation: 'olMsgIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                <ReadingRow model={fetching.model} />
              </Box>
            )}
          </Box>
        </Box>

        {/* Composer: part of the window, not a control. Nothing here is typable. */}
        <Box
          aria-hidden="true"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            m: { xs: 1.75, sm: 2.25 },
            pl: 2,
            pr: 0.75,
            py: 1.1,
            borderRadius: '9999px',
            border: '1px solid var(--border-normal)',
            backgroundColor: 'var(--bg-glass)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <Box sx={{ display: 'flex', color: 'var(--text-muted)', flexShrink: 0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </Box>
          <Typography sx={{ flex: 1, minWidth: 0, fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            Ask anything...
          </Typography>
          <Box
            sx={{
              width: 32,
              height: 32,
              flexShrink: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              backgroundColor: ORANGE,
              boxShadow: `0 4px 12px ${ORANGE}55`,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
            const reading = readingNow.includes(item.id);
            const used = usedNow.includes(item.id);
            const saved = savedNow.includes(item.id);
            const lit = reading || used || saved;
            const tag = reading ? 'READING' : used ? 'USED' : saved ? 'SAVED' : null;
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
                  backgroundColor: lit ? 'rgba(255, 102, 0, 0.09)' : 'var(--bg-glass)',
                  border: `1px solid ${lit ? 'rgba(255, 102, 0, 0.35)' : 'var(--border-subtle)'}`,
                  animation: reading ? 'olReading 1.05s ease-in-out infinite' : 'none',
                  transition: 'background-color 0.45s ease, border-color 0.45s ease',
                }}
              >
                <Box sx={{ display: 'flex', flexShrink: 0, color: lit ? ORANGE : 'var(--text-muted)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </Box>
                <Typography sx={{ flex: 1, fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.label}
                </Typography>
                {tag && (
                  <Typography
                    sx={{ fontSize: '0.64rem', fontWeight: 800, letterSpacing: '0.08em', color: ORANGE, flexShrink: 0 }}
                  >
                    {tag}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        <Typography sx={{ mt: 2.5, fontSize: '0.86rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          Written once, from the first message. Every model after it reads the same four facts, so nobody had to
          repeat them.
        </Typography>

        <Box
          sx={{
            mt: 'auto',
            pt: 2.5,
          }}
        >
          <Box
            sx={{
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
        </Box>
      </Box>
    </Box>
  );
}

export default MemoryChatDemo;
