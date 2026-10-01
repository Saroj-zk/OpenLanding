import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BrandTile } from '@/components/ui/LedgerUI';

/* Light theme values from ais.openledger.xyz. These panels stand in for the
   screen recordings, so they follow the app rather than the marketing page. */
const C = {
  font: '"Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif',
  page: '#F5F4F0',
  surface: '#FFFFFF',
  chip: '#F1F1EF',
  border: '#DDDEE0',
  borderSoft: '#EAE9E6',
  text: '#262626',
  textSecondary: '#6D6C6A',
  muted: '#71717A',
  onInverse: '#F5F4F0',
  sendIdle: '#D8D7D3',
};

/* Each flow mirrors one of the recordings: Auto picking the model and
   answering, and a second model carrying the first one's context. */
const FLOWS = {
  multimodel: {
    loop: 9000,
    model: { name: 'Auto', code: null },
    question: 'Convert 2.5 ETH to USD at $4,200 per ETH.',
    typeStart: 300,
    typeSpan: 1700,
    send: 2300,
    thinking: 1000,
    meta: { name: 'Auto Model', secs: '2.28', steps: 'Worked for 1s · 2 steps' },
    answerStart: 3500,
    answerSpan: 1500,
    answer: [
      { t: '2.5 ETH at $4,200 per ETH equals ' },
      { t: '$10,500', b: true },
      { t: '.' },
    ],
  },
  memory: {
    loop: 11500,
    model: { name: 'GPT 5.6 Sol', code: 'OA' },
    switchTo: { name: 'Claude Opus 5', code: 'AN' },
    switchAt: 1400,
    priorFrom: 'GPT 5.6 Sol',
    prior: 'Lock the beta scope by October 16, sign off on the 18th, and hold the go/no-go review on the 27th.',
    question: 'Continue the launch plan from where I left off.',
    typeStart: 2400,
    typeSpan: 1800,
    send: 4500,
    thinking: 1100,
    meta: { name: 'Claude Opus 5', secs: '3.04' },
    answerStart: 5900,
    answerSpan: 2100,
    answer: [
      { t: 'Picking up after the ' },
      { t: 'October 27', b: true },
      { t: ' review: stage the rollout on the 28th, and freeze the metric definitions first so November stays comparable.' },
    ],
  },
};

function Caret() {
  return (
    <Box component="span" sx={{ ml: '1px', animation: 'pdCaret 0.9s steps(1) infinite' }}>
      &#9611;
    </Box>
  );
}

/* Shuffle mark, which is how the app badges the Auto router. */
function AutoMark({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', flexShrink: 0 }}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

function ModelMark({ code, size = 15, color }) {
  if (!code) return <AutoMark size={size} color={color} />;
  return <BrandTile code={code} size={size} round />;
}

/* Reveals a parts array one character at a time, keeping bold runs bold. */
function Streamed({ parts, n }) {
  let used = 0;
  const out = [];
  let total = 0;
  parts.forEach((p) => { total += p.t.length; });
  for (let i = 0; i < parts.length; i += 1) {
    const p = parts[i];
    const take = Math.max(0, Math.min(p.t.length, n - used));
    if (take > 0) {
      out.push(
        <Box key={i} component="span" sx={p.b ? { fontWeight: 600, color: C.text } : null}>
          {p.t.slice(0, take)}
        </Box>
      );
    }
    used += p.t.length;
  }
  return (
    <>
      {out}
      {n < total && <Caret />}
    </>
  );
}

export default function ProductDemo({ flow = 'multimodel', active = true }) {
  const F = FLOWS[flow];
  const ref = React.useRef(null);
  const [live, setLive] = React.useState(false);
  const [t, setT] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return undefined;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!live || !active) return undefined;
    const started = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const id = setInterval(() => {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      setT((now - started) % F.loop);
    }, 45);
    return () => clearInterval(id);
  }, [live, active, F.loop]);

  const ramp = (from, span) => Math.max(0, Math.min(1, (t - from) / span));
  const typedLen = Math.round(ramp(F.typeStart, F.typeSpan) * F.question.length);
  const sent = t >= F.send;
  const thinking = sent && t < F.send + F.thinking;
  const answerTotal = F.answer.reduce((a, p) => a + p.t.length, 0);
  const answerLen = Math.round(ramp(F.answerStart, F.answerSpan) * answerTotal);
  const switched = F.switchTo ? t >= F.switchAt : false;
  const current = switched ? F.switchTo : F.model;

  return (
    <Box
      ref={ref}
      aria-hidden="true"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: C.page,
        fontFamily: C.font,
        '& *': { fontFamily: 'inherit' },
      }}
    >
      {/* Thread */}
      <Box sx={{ flex: 1, minHeight: 0, px: { xs: 1.75, sm: 2.25 }, pt: { xs: 2, sm: 2.5 }, overflow: 'hidden' }}>
        {!sent && !F.prior ? (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography sx={{ fontFamily: '"Fraunces", Georgia, serif', fontWeight: 600, fontSize: { xs: '1.15rem', sm: '1.4rem' }, lineHeight: 1.2, color: C.text }}>
              Ask anything.
              <br />
              <Box component="span" sx={{ fontStyle: 'italic' }}>Think in the open.</Box>
            </Typography>
            <Typography sx={{ mt: 1.2, fontSize: '0.76rem', lineHeight: 1.55, color: C.textSecondary }}>
              A private, multi-model AI experience
              <br />
              with no account required to start.
            </Typography>
          </Box>
        ) : (
          <>
            {/* What the first model already said, in the memory flow */}
            {F.prior && (
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.8 }}>
                  <ModelMark code={F.model.code} size={14} color={C.textSecondary} />
                  <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: C.text }}>{F.priorFrom}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.78rem', lineHeight: 1.6, color: C.textSecondary, opacity: 0.75 }}>
                  {F.prior}
                </Typography>
              </Box>
            )}

            {sent && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.75 }}>
                  <Box sx={{ maxWidth: '82%', px: 1.6, py: 1, borderRadius: '16px', backgroundColor: C.chip }}>
                    <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.55, color: C.text }}>{F.question}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.9 }}>
                  <ModelMark code={current.code} size={14} color={C.textSecondary} />
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: C.text }}>
                    {thinking ? current.name : F.meta.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.74rem', color: C.muted }}>
                    &middot; {thinking ? 'Thinking' : `${F.meta.secs}s`}
                  </Typography>
                </Box>

                {!thinking && F.meta.steps && (
                  <Typography sx={{ fontSize: '0.72rem', color: C.muted, mb: 0.9 }}>
                    {F.meta.steps}
                  </Typography>
                )}

                {!thinking && (
                  <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.65, color: C.textSecondary }}>
                    <Streamed parts={F.answer} n={answerLen} />
                  </Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>

      {/* Composer */}
      <Box sx={{ px: { xs: 1.75, sm: 2.25 }, pb: 1, pt: 1 }}>
        <Box sx={{ borderRadius: '14px', backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <Box sx={{ px: 1.5, pt: 1.15, pb: 0.8 }}>
            <Typography
              sx={{
                fontSize: '0.78rem',
                color: typedLen > 0 && !sent ? C.text : C.muted,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {typedLen > 0 && !sent
                ? (<>{F.question.slice(0, typedLen)}{typedLen < F.question.length && <Caret />}</>)
                : 'Send a message…'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, px: 1, pb: 1 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                px: 0.7,
                py: 0.35,
                borderRadius: '14px',
                minWidth: 0,
                backgroundColor: switched && t < F.switchAt + 900 ? C.chip : 'transparent',
                transition: 'background-color 0.35s ease',
              }}
            >
              <ModelMark code={current.code} size={14} color={C.textSecondary} />
              <Typography sx={{ fontSize: '0.76rem', color: C.text, whiteSpace: 'nowrap' }}>
                {current.name}
              </Typography>
              <Box sx={{ display: 'flex', color: C.muted }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </Box>
            </Box>

            <Box sx={{ flex: 1 }} />

            <Box
              sx={{
                width: 26,
                height: 26,
                flexShrink: 0,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: typedLen > 0 || thinking ? C.text : C.sendIdle,
                color: typedLen > 0 || thinking ? C.onInverse : C.textSecondary,
                transition: 'background-color 0.3s ease',
              }}
            >
              {thinking ? (
                <Box sx={{ width: 8, height: 8, borderRadius: '2px', backgroundColor: C.onInverse }} />
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              )}
            </Box>
          </Box>
        </Box>

        <Typography sx={{ mt: 0.8, textAlign: 'center', fontSize: '0.64rem', color: C.muted }}>
          OpenLedger Studio can make mistakes. Verify important information.
        </Typography>
      </Box>

      <style>{`
        @keyframes pdCaret {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </Box>
  );
}
