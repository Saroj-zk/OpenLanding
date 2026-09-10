import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/context/ThemeContext';


const MODEL_CARDS = [
  {
    id: 'gpt',
    name: 'GPT-4o',
    time: '4.1s',
    type: 'openai',
    restaurant: 'Sushi Tokyo Ten',
    review: 'Great value for an omakase experience, with a central location.',
  },
  {
    id: 'claude',
    name: 'Claude 3.5',
    time: '3.3s',
    type: 'anthropic',
    restaurant: 'Manten Sushi',
    review: 'A strong pick for quality and value without premium pricing.',
  },
  {
    id: 'gemini',
    name: 'Gemini 2.5',
    time: '5.2s',
    type: 'google',
    restaurant: 'Sushi no Midori',
    review: 'More casual and affordable, with a wide selection.',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek R1',
    time: '2.6s',
    type: 'deepseek',
    restaurant: 'Manten Sushi',
    review: 'Best overall balance of quality, experience, and price.',
  },
];



export default function WhyAskMultipleModelsSection() {
  const { isDark } = useThemeMode();
  
  // Animation state
  const [activeTab, setActiveTab] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0); // 0 to 100 per tab
  const [inputValue, setInputValue] = React.useState(''); // For chat input
  const sectionRef = React.useRef(null);
  const [isInView, setIsInView] = React.useState(false);

  const monoIconColor = isDark ? '#FFFFFF' : '#0F172A';
  const monoBadgeBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)';
  const monoBadgeBorder = isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.08)';

  // Viewport intersection observer to avoid running animation when section is off-screen
  React.useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation Loop Effect - runs ONLY when playing AND section is visible in viewport
  React.useEffect(() => {
    if (!isPlaying || !isInView) return;

    let animationFrame;
    let lastTime = performance.now();
    const durationPerTab = 4000;

    const animate = (time) => {
      const deltaTime = time - lastTime;
      // Throttle updates to ~35ms intervals to keep CPU/GPU completely free for 60fps scrolling
      if (deltaTime >= 35) {
        setProgress((prev) => {
          let newProgress = prev + (deltaTime / durationPerTab) * 100;
          if (newProgress >= 100) {
            newProgress = 0;
            setActiveTab((t) => (t + 1) % 3);
          }
          return newProgress;
        });
        lastTime = time;
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, isInView]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      id="consensus-mode"
      sx={{
        position: 'relative',
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        py: { xs: 2, md: 3 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.35s ease',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* HEADER */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.9, mb: 0.5 }}>
            <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Multi-Model Consensus
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.08, letterSpacing: '-0.035em', color: 'var(--text-heading)', mb: 1.2 }}>
            Ask four models. Get one answer.
          </Typography>
          <Typography sx={{ color: 'var(--text-secondary)', fontSize: { xs: '0.9rem', md: '0.95rem' }, lineHeight: 1.55, maxWidth: 580, mx: 'auto' }}>
            The flagship feature. One question, four models, and the optimal<br />
            answer synthesized from their consensus.
          </Typography>
        </Box>

        {/* BROWSER WINDOW FRAME */}
        <Box sx={{
          maxWidth: { xs: '100%', lg: 1100 }, mx: 'auto', borderRadius: '24px', width: '100%',
          backgroundColor: isDark ? 'var(--bg-card)' : '#FFFFFF',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: isDark ? '0 32px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 24px 60px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,1)',
          overflow: 'hidden', position: 'relative'
        }}>
          {/* macOS Titlebar */}
          <Box sx={{
            height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5,
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
            backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#F8FAFC'
          }}>
            {/* Traffic Lights */}
            <Box sx={{ display: 'flex', gap: 0.8, width: 80 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FF5F56', border: '1px solid rgba(0,0,0,0.1)' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#FFBD2E', border: '1px solid rgba(0,0,0,0.1)' }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27C93F', border: '1px solid rgba(0,0,0,0.1)' }} />
            </Box>
            
            {/* Address Bar */}
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              borderRadius: '6px', px: { xs: 3, sm: 8 }, py: 0.6, fontSize: '0.8rem', color: 'var(--text-secondary)'
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              <span>openledger.ai/consensus</span>
            </Box>
            
            {/* Right Controls */}
            <Box sx={{ display: 'flex', gap: 1, width: 80, justifyContent: 'flex-end', color: 'var(--text-muted)' }}>
              <Box component="button" onClick={() => setIsPlaying(!isPlaying)} sx={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', '&:hover': { color: 'var(--text-primary)' }, display: 'flex', alignItems: 'center' }}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                )}
              </Box>
            </Box>
          </Box>

          {/* INNER APP CONTENT - The Canvas (Increased Height) */}
          <Box sx={{ p: { xs: 2.5, sm: 3, md: 3.5 }, minHeight: { xs: 540, sm: 620, md: 680 }, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', pb: { xs: 12, md: 14 } }}>
            
            <Box sx={{ 
              transform: activeTab === 2 ? { xs: 'translateY(-18px)', md: 'translateY(-10px)' } : 'translateY(0)',
              opacity: 1,
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1
            }}>
              {/* PHASE 1: Prompt Dispatch */}
            <Box sx={{ 
              opacity: activeTab === 0 ? (progress > 5 ? 1 : 0) : (activeTab > 0 ? 1 : 0), 
              transform: activeTab === 0 && progress <= 5 ? 'translateY(10px)' : 'translateY(0)',
              transition: 'all 0.5s ease', mb: 3 
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ maxWidth: { xs: '85%', md: '75%' } }}>
                  <Box sx={{
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '20px 20px 4px 20px', px: 2.5, py: 1.5, color: 'var(--text-primary)'
                  }}>
                    <Typography sx={{ fontSize: '0.94rem', fontWeight: 500, lineHeight: 1.45 }}>
                      {activeTab === 0 && progress < 100 
                        ? "Pick the best sushi restaurant in Tokyo for dinner under $100.".substring(0, Math.floor((Math.max(0, progress-10)/50)*65))
                        : "Pick the best sushi restaurant in Tokyo for dinner under $100."}
                      {activeTab === 0 && progress < 60 && progress > 10 && <span style={{ borderRight: '2px solid var(--text-primary)', marginLeft: 2, animation: 'blink 1s infinite' }} />}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: monoBadgeBg, border: monoBadgeBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-heading)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </Box>
              </Box>
            </Box>

            {/* PHASE 2: Parallel Stream */}
            <Box sx={{ 
              opacity: activeTab >= 1 ? 1 : 0, 
              transform: activeTab >= 1 ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.5s ease', flexGrow: 1
            }}>
              {/* Assistant Message */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                <Box sx={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: monoBadgeBg, border: monoBadgeBorder, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" fill="var(--text-heading)" style={{ width: 18, height: 18 }}><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
                </Box>
                <Box sx={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC', border: monoBadgeBorder, borderRadius: '20px 20px 20px 4px', px: 2.5, py: 1.5 }}>
                  <Typography sx={{ fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                    {activeTab === 1 && progress < 25 ? 'Evaluating 4 models in parallel...' : 'Here are the picks from each model, generated in parallel.'}
                  </Typography>
                </Box>
              </Box>

              {/* 4 Model Cards using Apple Liquid Glass */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
                {MODEL_CARDS.map((card, idx) => {
                  // Staggered reveal for models based on progress
                  const isRevealed = activeTab > 1 || (activeTab === 1 && progress > (25 + idx * 12));
                  return (
                    <Box
                      key={card.id}
                      sx={{
                        height: '100%',
                        borderRadius: '16px',
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        border: isDark ? '1px solid rgba(255, 255, 255, 0.09)' : '1px solid rgba(0, 0, 0, 0.07)',
                        boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.25)' : '0 4px 16px rgba(15, 23, 42, 0.04)',
                        opacity: isRevealed ? 1 : 0.4,
                        transform: isRevealed ? 'scale(1)' : 'scale(0.97)',
                        transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      }}
                    >
                      <Box sx={{ p: { xs: 1.8, sm: 2.2 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        
                        {/* Card Header: Official Monochrome Logo + Name + Run Time */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* Logo Box */}
                            <Box sx={{ width: 32, height: 32, borderRadius: '8px', backgroundColor: monoBadgeBg, border: monoBadgeBorder, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {card.type === 'openai' && (
                                <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: monoIconColor }}>
                                  <path d="M9.20508 8.75799V6.49833C9.20508 6.30802 9.27651 6.16525 9.44292 6.07022L13.9861 3.45378C14.6046 3.09701 15.342 2.93059 16.103 2.93059C18.9572 2.93059 20.7651 5.14272 20.7651 7.49741C20.7651 7.66388 20.7651 7.85418 20.7412 8.04449L16.0316 5.28529C15.7462 5.11887 15.4607 5.11887 15.1753 5.28529L9.20508 8.75799ZM19.8135 17.5588V12.1593C19.8135 11.8262 19.6707 11.5884 19.3854 11.4219L13.4152 7.94921L15.3656 6.83121C15.5321 6.73618 15.6748 6.73618 15.8413 6.83121L20.3845 9.44765C21.6928 10.2089 22.5728 11.8262 22.5728 13.396C22.5728 15.2037 21.5025 16.8688 19.8135 17.5586V17.5588ZM7.80173 12.8017L5.85129 11.66C5.68488 11.565 5.61345 11.4222 5.61345 11.2319V5.99903C5.61345 3.45403 7.56388 1.52724 10.2042 1.52724C11.2033 1.52724 12.1307 1.86032 12.9159 2.45494L8.23008 5.16661C7.94474 5.33302 7.80197 5.57087 7.80197 5.904V12.8019L7.80173 12.8017ZM12 15.2278L9.20508 13.6579V10.3281L12 8.75824L14.7947 10.3281V13.6579L12 15.2278ZM13.7958 22.4588C12.7967 22.4588 11.8693 22.1257 11.0841 21.5311L15.7699 18.8194C16.0553 18.653 16.198 18.4151 16.198 18.082V11.1841L18.1724 12.3258C18.3388 12.4208 18.4102 12.5636 18.4102 12.7539V17.9868C18.4102 20.5318 16.4359 22.4586 13.7958 22.4586V22.4588ZM8.1585 17.1545L3.61528 14.5381C2.30696 13.7769 1.427 12.1596 1.427 10.5897C1.427 8.75824 2.52116 7.11704 4.20985 6.42719V11.8503C4.20985 12.1834 4.35267 12.4213 4.63801 12.5877L10.5846 16.0365L8.63415 17.1545C8.46773 17.2496 8.32492 17.2496 8.1585 17.1545ZM7.89701 21.0554C5.20918 21.0554 3.23491 19.0336 3.23491 16.5361C3.23491 16.3458 3.25875 16.1555 3.2824 15.9651L7.96819 18.6768C8.25353 18.8433 8.53912 18.8433 8.82446 18.6768L14.7947 15.228V17.4877C14.7947 17.678 14.7233 17.8207 14.5568 17.9158L10.0137 20.5322C9.39519 20.889 8.65779 21.0554 7.89676 21.0554H7.89701ZM13.7958 23.8858C16.6739 23.8858 19.0762 21.8403 19.6234 19.1286C22.2874 18.4388 24 15.9413 24 13.3962C24 11.7312 23.2865 10.1139 22.002 8.9483C22.121 8.44876 22.1923 7.94922 22.1923 7.44992C22.1923 4.0486 19.4331 1.50335 16.2458 1.50335C15.6037 1.50335 14.9852 1.59838 14.3668 1.81258C13.2962 0.765956 11.8215 0.0999985 10.2042 0.0999985C7.32608 0.0999985 4.92384 2.14546 4.37656 4.85713C1.71258 5.54698 0 8.04449 0 10.5895C0 12.2546 0.713497 13.8719 1.99797 15.0374C1.87905 15.537 1.80766 16.0365 1.80766 16.5359C1.80766 19.9372 4.56687 22.4824 7.75419 22.4824C8.3963 22.4824 9.01477 22.3874 9.63323 22.1732C10.7035 23.2198 12.1782 23.8858 13.7958 23.8858Z" />
                                </svg>
                              )}
                              {card.type === 'anthropic' && (
                                <svg viewBox="0 0 24 24" style={{ width: 19, height: 19, fill: monoIconColor }}>
                                  <path fillRule="evenodd" clipRule="evenodd" d="M13.62 2.45a1.15 1.15 0 0 0-1.62.43L9.67 7.02 7.06 2.87a1.15 1.15 0 0 0-1.96 1.22l2.6 4.15-4.88-.63a1.15 1.15 0 0 0-.29 2.28l4.98.65-4.18 2.76a1.15 1.15 0 1 0 1.26 1.92l4.18-2.76-.83 5.01a1.15 1.15 0 0 0 2.27.38l.88-5.25 3.91 3.4a1.15 1.15 0 0 0 1.52-1.72l-3.86-3.36 4.93-.2a1.15 1.15 0 0 0 .1-2.3l-5.01.2 3.09-4.13a1.15 1.15 0 0 0-.76-1.86z" />
                                </svg>
                              )}
                              {card.type === 'google' && (
                                <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: monoIconColor }}>
                                  <path d="M21.3995 10.7291C19.5505 9.93273 17.9332 8.84182 16.545 7.455C15.1582 6.06818 14.0659 4.44955 13.2709 2.60045C12.9668 1.89273 12.72 1.16318 12.5318 0.415909C12.4705 0.171818 12.2523 0 12 0C11.7477 0 11.5295 0.171818 11.4682 0.415909C11.28 1.16318 11.0345 1.89 10.7291 2.60045C9.93273 4.44955 8.84182 6.06818 7.455 7.455C6.06818 8.84045 4.44955 9.93273 2.60045 10.7291C1.89273 11.0332 1.16318 11.28 0.415909 11.4682C0.171818 11.5295 0 11.7477 0 12C0 12.2523 0.171818 12.4705 0.415909 12.5318C1.16318 12.72 1.89 12.9655 2.60045 13.2709C4.44955 14.0673 6.06682 15.1582 7.455 16.545C8.84182 17.9318 9.93409 19.5505 10.7291 21.3995C11.0345 22.1086 11.28 22.8368 11.4682 23.5841C11.4979 23.7027 11.5664 23.808 11.6627 23.8833C11.759 23.9587 11.8777 23.9997 12 24C12.2523 24 12.4705 23.8282 12.5318 23.5841C12.72 22.8368 12.9655 22.11 13.2709 21.3995C14.0673 19.5505 15.1582 17.9332 16.545 16.545C17.9318 15.1582 19.5505 14.0659 21.3995 13.2709C22.1086 12.9655 22.8368 12.72 23.5841 12.5318C23.7027 12.5021 23.808 12.4336 23.8833 12.3373C23.9587 12.241 23.9997 12.1223 24 12C24 11.7477 23.8282 11.5295 23.5841 11.4682C22.8368 11.28 22.11 11.0345 21.3995 10.7291Z" />
                                </svg>
                              )}
                              {card.type === 'deepseek' && (
                                <Box component="img" src="/Models/DeepSeek.svg" alt="DeepSeek" sx={{ width: 20, height: 20, filter: isDark ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: isDark ? 0.95 : 0.85 }} />
                              )}
                            </Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-heading)' }}>{card.name}</Typography>
                          </Box>
                          <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{isRevealed ? card.time : 'streaming...'}</Typography>
                        </Box>
                        
                        {isRevealed ? (
                          <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.8 }}>
                              <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>{card.restaurant}</Typography>
                            </Box>
                            <Typography sx={{ fontSize: '0.82rem', lineHeight: 1.45, color: 'var(--text-secondary)' }}>
                              {card.review.substring(0, Math.floor((activeTab > 1 ? 1 : Math.min(1, Math.max(0, progress - (25 + idx * 12)) / 20)) * card.review.length))}
                              {activeTab === 1 && (progress - (25 + idx * 12) >= 0) && (progress - (25 + idx * 12) < 20) && (
                                <span style={{ borderRight: '2px solid var(--text-secondary)', marginLeft: 2, animation: 'blink 1s infinite' }} />
                              )}
                            </Typography>
                          </>
                        ) : (
                          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', mt: 1 }}>
                            {/* Skeleton loader animation */}
                            <Box sx={{ height: 14, width: '70%', backgroundColor: monoBadgeBg, borderRadius: 1, animation: 'pulse 1.5s infinite' }} />
                            <Box sx={{ height: 10, width: '100%', backgroundColor: monoBadgeBg, borderRadius: 1, animation: 'pulse 1.5s infinite', animationDelay: '0.2s' }} />
                            <Box sx={{ height: 10, width: '80%', backgroundColor: monoBadgeBg, borderRadius: 1, animation: 'pulse 1.5s infinite', animationDelay: '0.4s' }} />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            </Box> {/* End of Scrollable Container */}

            {/* PHASE 3: Consensus & Final Pick */}
            <Box sx={{ 
              position: 'absolute', bottom: { xs: 72, md: 80 }, left: { xs: 14, sm: 20, md: 24 }, right: { xs: 14, sm: 20, md: 24 },
              opacity: activeTab === 2 ? (progress > 10 ? 1 : 0) : 0, 
              transform: activeTab === 2 && progress > 10 ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
            }}>
              <Box sx={{ 
                borderRadius: '18px', 
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC', 
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.1)', 
                boxShadow: isDark ? '0 12px 32px rgba(0,0,0,0.5)' : '0 12px 32px rgba(0,0,0,0.08)',
                p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2.5, position: 'relative', overflow: 'hidden' 
              }}>
                {/* Glowing Background Effect for Final Pick */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: isDark ? 'radial-gradient(circle at 10% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)' : 'radial-gradient(circle at 10% 50%, rgba(0,0,0,0.04) 0%, transparent 60%)', zIndex: 0 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, zIndex: 1 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-secondary)', textTransform: 'uppercase', mb: 0.5 }}>Synthesized Final Pick</Typography>
                    <Typography sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-heading)', mb: 0.5 }}>Manten Sushi</Typography>
                    <Typography sx={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: 600, lineHeight: 1.5 }}>The strongest overall pick for an authentic omakase experience under $100, endorsed by Claude and DeepSeek consensus logic.</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Chat Input Component at the bottom */}
            <Box
              sx={{
                position: 'absolute',
                bottom: { xs: 14, md: 18 },
                left: { xs: 14, sm: 20, md: 24 },
                right: { xs: 14, sm: 20, md: 24 },
                zIndex: 10,
              }}
            >
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (inputValue.trim()) {
                    setInputValue('');
                    // Optional: reset animation to start
                    setActiveTab(0);
                    setProgress(0);
                    setIsPlaying(true);
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '999px',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                  p: '6px 8px 6px 16px',
                  gap: 1.2,
                  transition: 'border-color 0.2s ease',
                  boxShadow: isDark ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(8px)',
                  '&:focus-within': {
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.22)',
                  },
                }}
              >
                {/* Paperclip / Attach Icon */}
                <Box
                  sx={{
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: '50%',
                    '&:hover': {
                      color: 'var(--text-primary)',
                    },
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 19, height: 19 }}>
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </Box>

                {/* Input field */}
                <Box
                  component="input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything..."
                  sx={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: { xs: '0.88rem', sm: '0.94rem' },
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    '&::placeholder': {
                      color: 'var(--text-muted)',
                    },
                  }}
                />

                {/* Circular Up Arrow Send Button */}
                <Box
                  component="button"
                  type="submit"
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    backdropFilter: 'blur(12px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 243, 235, 0.85) 100%)',
                    border: '1px solid rgba(255, 102, 0, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff6600',
                    boxShadow: '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.18s cubic-bezier(0.2, 0, 0, 1)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 3px 8px rgba(15, 23, 42, 0.09), inset 0 1.5px 1.5px rgba(255, 255, 255, 1)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </Box>
              </Box>
            </Box>

            {/* Custom keyframes */}
            <style>
              {`
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                @keyframes pulse {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 0.2; }
                }
              `}
            </style>
          </Box>
        </Box>

        {/* BOTTOM CAPTION & CTA */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: { xs: 2, md: 2.5 }, gap: 1.5 }}>
          <Typography sx={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
            A verifiable way to query frontier AI and get consensus truth.
          </Typography>
          
          {/* Try Consensus Button */}
          <Box
            component="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer');
              }
            }}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              px: { xs: 4, sm: 5 },
              py: { xs: 1.2, sm: 1.4 },
              borderRadius: '9999px',
              backgroundColor: '#ff6600',
              color: '#ffffff',
              border: isDark ? '1px solid rgba(255, 102, 0, 0.4)' : '1px solid rgba(255, 102, 0, 0.2)',
              boxShadow: isDark
                ? '0 8px 32px rgba(255, 102, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 8px 32px rgba(255, 102, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              fontSize: { xs: '0.95rem', md: '1.02rem' },
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                backgroundColor: '#e65c00',
                transform: 'translateY(-2px)',
                boxShadow: isDark
                  ? '0 12px 36px rgba(255, 102, 0, 0.45), 0 0 20px rgba(255, 102, 0, 0.2)'
                  : '0 12px 36px rgba(255, 102, 0, 0.35), 0 0 20px rgba(255, 102, 0, 0.2)',
              },
              '&:active': {
                transform: 'scale(0.96)',
              },
            }}
          >
            Try Consensus Now
            <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
