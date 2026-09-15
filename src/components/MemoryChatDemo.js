import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import MemoryIcon from '@mui/icons-material/Memory';
import { useThemeMode } from '@/context/ThemeContext';
import { BrandTile } from '@/components/ui/LedgerUI';

export const MODELS = {
  AN: { code: 'AN', name: 'Claude 3.5 Sonnet', vendor: 'Anthropic', color: '#D97757' },
  OA: { code: 'OA', name: 'GPT-4o', vendor: 'OpenAI', color: '#10A37F' },
  GG: { code: 'GG', name: 'Gemini 1.5 Pro', vendor: 'Google', color: '#4B6FD8' },
  DS: { code: 'DS', name: 'DeepSeek R1', vendor: 'DeepSeek', color: '#4D6BFE' },
};

const STEPS = [
  {
    modelCode: 'AN',
    stepNumber: 1,
    label: 'Initial Prompt',
    userPrompt: "Planning a 7-day trip to Japan in October. Budget is $2,000. I'm vegetarian and prefer concise answers.",
    replyIntro: "Here is your 7-day itinerary for Tokyo & Kyoto:",
    replyParts: [
      { text: "• " },
      { text: "Days 1-3 (Tokyo):", bold: true },
      { text: " Shibuya & Asakusa. Pre-booked plant-based dining at Kyushu Jangara ramen.\n• " },
      { text: "Days 4-6 (Kyoto):", bold: true },
      { text: " Arashiyama Bamboo Grove & Fushimi Inari. Zen Shojin Ryori temple cuisine.\n• " },
      { text: "Day 7:", bold: true },
      { text: " Return to Haneda for departure." },
    ],
    replyOutro: "Accommodations and transit planned within your $2,000 budget.",
    activeMemoryKeys: ['vegetarian', 'concise', 'japan', 'october', '7days', 'budget', 'kyoto'],
    activeAction: 'Captured 5 memory items',
  },
  {
    modelCode: 'OA',
    stepNumber: 2,
    label: 'Switch to GPT-4o',
    userPrompt: "Switching to GPT-4o. Which train pass should I buy, and recommend 3 dinner spots?",
    replyIntro: "For your ",
    replyParts: [
      { text: "7-day Tokyo to Kyoto journey", memoryKey: 'japan', memoryLabel: 'From Memory: 7 days, Tokyo & Kyoto' },
      { text: ", the 7-day National JR Pass is your best option for roundtrip Shinkansen bullet train rides.\n\nHere are 3 top-rated " },
      { text: "vegetarian", memoryKey: 'vegetarian', memoryLabel: 'From Memory: Vegetarian' },
      { text: " dinner spots in Kyoto that fit your " },
      { text: "$2,000 budget", memoryKey: 'budget', memoryLabel: 'From Memory: $2,000 Budget' },
      { text: ":\n1. Shigetsu — Zen vegan banquet inside Tenryu-ji temple\n2. Ain Soph Journey — Plant-based organic seasonal menu\n3. Choice Cafe — Vegan & gluten-free handcrafted dishes" },
    ],
    replyOutro: "You never repeated your dietary needs or dates—GPT-4o read them directly from Unified Memory.",
    activeMemoryKeys: ['japan', 'vegetarian', 'budget'],
    activeAction: 'Read 3 memory items (No repeat input)',
  },
  {
    modelCode: 'GG',
    stepNumber: 3,
    label: 'Switch to Gemini',
    userPrompt: "Switching to Gemini. Can you give me essential phrases in Japanese for ordering at restaurants?",
    replyIntro: "Here are essential Japanese phrases customized for your ",
    replyParts: [
      { text: "vegetarian diet", memoryKey: 'vegetarian', memoryLabel: 'From Memory: Vegetarian' },
      { text: " with " },
      { text: "concise translations", memoryKey: 'concise', memoryLabel: 'From Memory: Concise Answers' },
      { text: ":\n\n1. 肉と魚は食べられません (Niku to sakana wa taberaremasen)\n   → 'I cannot eat meat or fish.'\n2. 出汁にかつお節は入っていますか (Dashi ni katsuobushi wa haitte imasu ka?)\n   → 'Does the soup broth contain bonito/fish flakes?'\n3. 野菜だけで作っていただけますか (Yasai dake de tsukutte itadakemasu ka?)\n   → 'Can this be prepared with vegetables only?'" },
    ],
    replyOutro: "Gemini automatically anticipated dietary restrictions from Unified Memory.",
    activeMemoryKeys: ['vegetarian', 'concise'],
    activeAction: 'Read 2 memory items',
  },
  {
    modelCode: 'DS',
    stepNumber: 4,
    label: 'Switch to DeepSeek',
    userPrompt: "Calculate my daily spend to stay strictly under my target.",
    replyIntro: "Synthesizing expense limits for ",
    replyParts: [
      { text: "7 days", memoryKey: '7days', memoryLabel: 'From Memory: 7 Days' },
      { text: " against your " },
      { text: "$2,000 total budget", memoryKey: 'budget', memoryLabel: 'From Memory: $2,000 Budget' },
      { text: ":\n\n• Shinkansen Bullet Train: $220 reserved\n• Lodging (6 nights @ $125 avg): $750\n• Daily Meals & Activities: $128 / day ($896 total)\n• Contingency reserve: $134\n\nTotal: $2,000. This maintains strict discipline while reserving enough for temple admissions." },
    ],
    replyOutro: "Full context preserved across 4 distinct AI vendors seamlessly.",
    activeMemoryKeys: ['7days', 'budget', 'japan'],
    activeAction: 'Read 3 memory items',
  },
];

const MEMORY_ITEMS = [
  { id: 'vegetarian', category: 'Preferences', label: 'Vegetarian Diet', detail: 'Strict no meat/fish' },
  { id: 'concise', category: 'Preferences', label: 'Response Style', detail: 'Concise answers preferred' },
  { id: 'japan', category: 'Ongoing Context', label: 'Destination', detail: 'Japan (Tokyo & Kyoto)' },
  { id: 'october', category: 'Ongoing Context', label: 'Timing', detail: 'October travel window' },
  { id: '7days', category: 'Ongoing Context', label: 'Duration', detail: '7 days itinerary' },
  { id: 'budget', category: 'Important Details', label: 'Total Budget', detail: '$2,000 USD limit' },
  { id: 'kyoto', category: 'Decisions', label: 'Key Cities', detail: 'Tokyo + Kyoto selected' },
];

export function MemoryChatDemo() {
  const { isDark } = useThemeMode();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const activeStep = STEPS[currentStep];
  const activeModel = MODELS[activeStep.modelCode];

  // Auto play simulation timer
  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1180,
        mx: 'auto',
        borderRadius: { xs: '20px', md: '28px' },
        backgroundColor: isDark ? 'rgba(14, 16, 21, 0.85)' : '#FFFFFF',
        backdropFilter: 'blur(20px)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark
          ? '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 20px 50px -10px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Top Model Switcher & Simulation Controls */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {/* Model Tabs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, overflowX: 'auto', pb: { xs: 0.5, sm: 0 } }}>
          {STEPS.map((s, idx) => {
            const m = MODELS[s.modelCode];
            const isCurrent = idx === currentStep;
            return (
              <Box
                key={s.stepNumber}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsPlaying(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: { xs: 1.5, sm: 2 },
                  py: 1,
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  backgroundColor: isCurrent
                    ? isDark
                      ? 'rgba(255, 102, 0, 0.15)'
                      : 'rgba(255, 102, 0, 0.1)'
                    : 'transparent',
                  border: isCurrent
                    ? '1px solid rgba(255, 102, 0, 0.4)'
                    : '1px solid transparent',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    backgroundColor: isCurrent
                      ? isDark
                        ? 'rgba(255, 102, 0, 0.2)'
                        : 'rgba(255, 102, 0, 0.15)'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <BrandTile code={s.modelCode} size={24} />
                <Typography
                  sx={{
                    fontSize: { xs: '0.78rem', sm: '0.82rem' },
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent
                      ? 'var(--text-heading)'
                      : 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {m.name}
                </Typography>
                {isCurrent && (
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#FF6600',
                      boxShadow: '0 0 8px #FF6600',
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        {/* Step Play Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-muted)', mr: 1, display: { xs: 'none', sm: 'block' } }}>
            Turn {currentStep + 1} of {STEPS.length}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setCurrentStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1));
              setIsPlaying(false);
            }}
            sx={{
              minWidth: 32,
              width: 32,
              height: 32,
              p: 0,
              borderRadius: '50%',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
              '&:hover': { borderColor: 'var(--border-normal)', backgroundColor: 'var(--bg-pill)' },
            }}
          >
            <SkipPreviousRoundedIcon sx={{ fontSize: '1.2rem' }} />
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => setIsPlaying(!isPlaying)}
            sx={{
              height: 32,
              px: 2,
              borderRadius: '9999px',
              backgroundColor: '#FF6600',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.78rem',
              boxShadow: '0 0 16px rgba(255, 102, 0, 0.4)',
              '&:hover': {
                backgroundColor: '#e65c00',
              },
            }}
            startIcon={isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          >
            {isPlaying ? 'Pause' : 'Auto Play'}
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setCurrentStep((prev) => (prev + 1) % STEPS.length);
              setIsPlaying(false);
            }}
            sx={{
              minWidth: 32,
              width: 32,
              height: 32,
              p: 0,
              borderRadius: '50%',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
              '&:hover': { borderColor: 'var(--border-normal)', backgroundColor: 'var(--bg-pill)' },
            }}
          >
            <SkipNextRoundedIcon sx={{ fontSize: '1.2rem' }} />
          </Button>
        </Box>
      </Box>

      {/* Main Split Demo Area: Left Chat Window + Right Memory Store */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 520 }}>
        {/* Left Column: Live Chat Thread (62% width) */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '0 0 62%' },
            p: { xs: 2.5, sm: 3.5 },
            borderRight: { md: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)' },
            borderBottom: { xs: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)', md: 'none' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          {/* Active Model Banner */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <BrandTile code={activeStep.modelCode} size={28} />
              <Box>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  {activeModel.name}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Active Engine · {activeStep.activeAction}
                </Typography>
              </Box>
            </Box>
            <Chip
              size="small"
              label={currentStep === 0 ? "Initial Capture" : "Memory Read Active"}
              sx={{
                fontSize: '0.7rem',
                fontWeight: 700,
                backgroundColor: 'rgba(255, 102, 0, 0.12)',
                color: '#FF6600',
                border: '1px solid rgba(255, 102, 0, 0.3)',
              }}
            />
          </Box>

          {/* User Message Bubble */}
          <Box
            sx={{
              alignSelf: 'flex-end',
              maxWidth: '86%',
              p: 2,
              borderRadius: '20px',
              borderBottomRightRadius: '4px',
              backgroundColor: isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 102, 0, 0.08)',
              border: '1px solid rgba(255, 102, 0, 0.28)',
              boxShadow: '0 4px 14px rgba(255, 102, 0, 0.08)',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#FF6600', mb: 0.5, letterSpacing: '0.02em' }}>
              YOU
            </Typography>
            <Typography sx={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
              {activeStep.userPrompt}
            </Typography>
          </Box>

          {/* Assistant Reply Bubble with Memory Markers */}
          <Box
            sx={{
              alignSelf: 'flex-start',
              maxWidth: '92%',
              p: { xs: 2, sm: 2.5 },
              borderRadius: '20px',
              borderBottomLeftRadius: '4px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.025)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.07)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: activeModel.color,
                  boxShadow: `0 0 8px ${activeModel.color}`,
                }}
              />
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                {activeModel.name}
              </Typography>
            </Box>

            <Typography component="div" sx={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
              {activeStep.replyIntro}
              {activeStep.replyParts.map((part, i) => {
                if (part.memoryKey) {
                  return (
                    <Box
                      key={i}
                      component="span"
                      sx={{
                        mx: 0.5,
                        px: 1,
                        py: 0.2,
                        borderRadius: '6px',
                        backgroundColor: 'rgba(255, 102, 0, 0.15)',
                        border: '1px solid rgba(255, 102, 0, 0.45)',
                        color: isDark ? '#FFA055' : '#D95300',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        display: 'inline-block',
                        boxShadow: '0 0 10px rgba(255, 102, 0, 0.25)',
                        animation: 'pulseGlow 2.5s infinite ease-in-out',
                        '@keyframes pulseGlow': {
                          '0%, 100%': { borderColor: 'rgba(255, 102, 0, 0.4)', boxShadow: '0 0 8px rgba(255, 102, 0, 0.2)' },
                          '50%': { borderColor: 'rgba(255, 102, 0, 0.8)', boxShadow: '0 0 14px rgba(255, 102, 0, 0.45)' },
                        },
                      }}
                      title={part.memoryLabel}
                    >
                      {part.text}
                    </Box>
                  );
                }
                return (
                  <Box
                    key={i}
                    component="span"
                    sx={{ fontWeight: part.bold ? 700 : 400 }}
                  >
                    {part.text}
                  </Box>
                );
              })}
            </Typography>

            <Box
              sx={{
                mt: 2,
                pt: 1.5,
                borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <MemoryIcon sx={{ fontSize: '0.95rem', color: '#FF6600' }} />
              <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {activeStep.replyOutro}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Column: Unified Memory Live Store (38% width) */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '0 0 38%' },
            p: { xs: 2.5, sm: 3 },
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.015)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShieldOutlinedIcon sx={{ fontSize: '1rem', color: '#10B981' }} />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-heading)' }}>
                Unified Memory Store
              </Typography>
            </Box>
            <Box
              sx={{
                px: 1.2,
                py: 0.3,
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#10B981',
                fontSize: '0.68rem',
                fontWeight: 700,
              }}
            >
              ENCRYPTED
            </Box>
          </Box>

          <Typography sx={{ fontSize: '0.78rem', color: 'var(--text-secondary)', mb: 2.5, lineHeight: 1.45 }}>
            Context extracted automatically and available to any model you switch to:
          </Typography>

          {/* Memory Items Stack */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flex: 1 }}>
            {MEMORY_ITEMS.map((item) => {
              const isItemActive = activeStep.activeMemoryKeys.includes(item.id);
              return (
                <Box
                  key={item.id}
                  sx={{
                    p: 1.5,
                    borderRadius: '12px',
                    backgroundColor: isItemActive
                      ? isDark
                        ? 'rgba(255, 102, 0, 0.12)'
                        : 'rgba(255, 102, 0, 0.08)'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.02)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: isItemActive
                      ? '1px solid rgba(255, 102, 0, 0.45)'
                      : isDark
                      ? '1px solid rgba(255, 255, 255, 0.05)'
                      : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isItemActive ? '0 4px 14px rgba(255, 102, 0, 0.18)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                      <Typography sx={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {item.category}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {item.detail}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: 'right' }}>
                    {isItemActive ? (
                      <Box
                        sx={{
                          px: 1.2,
                          py: 0.4,
                          borderRadius: '6px',
                          backgroundColor: '#FF6600',
                          color: '#fff',
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                          boxShadow: '0 2px 8px rgba(255, 102, 0, 0.4)',
                        }}
                      >
                        READ BY {activeModel.code}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          px: 1,
                          py: 0.3,
                          borderRadius: '6px',
                          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                          color: 'var(--text-muted)',
                          fontSize: '0.66rem',
                          fontWeight: 600,
                        }}
                      >
                        STORED
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Metric Footer */}
          <Box
            sx={{
              mt: 2.5,
              pt: 2,
              borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography sx={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Context Retention</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#10B981' }}>100% Shared</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Repeated Info</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#FF6600' }}>0 Tokens Wasted</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MemoryChatDemo;
