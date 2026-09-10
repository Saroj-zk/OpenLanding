import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useThemeMode } from '@/context/ThemeContext';

export default function PricingSection() {
  const { isDark } = useThemeMode();
  
  // Progress from 0 (Left / $90 / 4 apps) to 100 (Right / $20 / 1 app)
  const [progress, setProgress] = React.useState(0);

  const orangeColor = '#D06038';

  // Theme-adaptive colors
  const primaryText = isDark ? '#FFFFFF' : '#111111';
  const secondaryText = isDark ? '#9CA3AF' : '#667085';
  const mutedText = isDark ? '#6B7280' : '#9CA3AF';
  
  const outerCardBg = isDark ? 'rgba(255, 255, 255, 0.03)' : '#F3F4F6';
  const outerBorder = isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)';
  
  const innerCardBg = isDark ? '#1E293B' : '#FFFFFF';
  const innerBorder = isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)';
  
  const trackBg = isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB';
  const trackFill = isDark ? '#FFFFFF' : '#111111';

  // Calculate dynamic values
  const currentTotal = Math.round(90 - (progress / 100) * 70);
  const monthlySavings = 90 - currentTotal;
  const annualSavings = monthlySavings * 12;

  // Visual opacities
  const oldOp = Math.max(0, 1 - (progress / 50)); // fades out completely by 50%
  const newOp = Math.max(0, (progress - 50) / 50); // fades in from 50% to 100%

  // SVG Icons
  const GptIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: primaryText }}>
      <path d="M9.20508 8.75799V6.49833C9.20508 6.30802 9.27651 6.16525 9.44292 6.07022L13.9861 3.45378C14.6046 3.09701 15.342 2.93059 16.103 2.93059C18.9572 2.93059 20.7651 5.14272 20.7651 7.49741C20.7651 7.66388 20.7651 7.85418 20.7412 8.04449L16.0316 5.28529C15.7462 5.11887 15.4607 5.11887 15.1753 5.28529L9.20508 8.75799ZM19.8135 17.5588V12.1593C19.8135 11.8262 19.6707 11.5884 19.3854 11.4219L13.4152 7.94921L15.3656 6.83121C15.5321 6.73618 15.6748 6.73618 15.8413 6.83121L20.3845 9.44765C21.6928 10.2089 22.5728 11.8262 22.5728 13.396C22.5728 15.2037 21.5025 16.8688 19.8135 17.5586V17.5588ZM7.80173 12.8017L5.85129 11.66C5.68488 11.565 5.61345 11.4222 5.61345 11.2319V5.99903C5.61345 3.45403 7.56388 1.52724 10.2042 1.52724C11.2033 1.52724 12.1307 1.86032 12.9159 2.45494L8.23008 5.16661C7.94474 5.33302 7.80197 5.57087 7.80197 5.904V12.8019L7.80173 12.8017ZM12 15.2278L9.20508 13.6579V10.3281L12 8.75824L14.7947 10.3281V13.6579L12 15.2278ZM13.7958 22.4588C12.7967 22.4588 11.8693 22.1257 11.0841 21.5311L15.7699 18.8194C16.0553 18.653 16.198 18.4151 16.198 18.082V11.1841L18.1724 12.3258C18.3388 12.4208 18.4102 12.5636 18.4102 12.7539V17.9868C18.4102 20.5318 16.4359 22.4586 13.7958 22.4586V22.4588ZM8.1585 17.1545L3.61528 14.5381C2.30696 13.7769 1.427 12.1596 1.427 10.5897C1.427 8.75824 2.52116 7.11704 4.20985 6.42719V11.8503C4.20985 12.1834 4.35267 12.4213 4.63801 12.5877L10.5846 16.0365L8.63415 17.1545C8.46773 17.2496 8.32492 17.2496 8.1585 17.1545ZM7.89701 21.0554C5.20918 21.0554 3.23491 19.0336 3.23491 16.5361C3.23491 16.3458 3.25875 16.1555 3.2824 15.9651L7.96819 18.6768C8.25353 18.8433 8.53912 18.8433 8.82446 18.6768L14.7947 15.228V17.4877C14.7947 17.678 14.7233 17.8207 14.5568 17.9158L10.0137 20.5322C9.39519 20.889 8.65779 21.0554 7.89676 21.0554H7.89701ZM13.7958 23.8858C16.6739 23.8858 19.0762 21.8403 19.6234 19.1286C22.2874 18.4388 24 15.9413 24 13.3962C24 11.7312 23.2865 10.1139 22.002 8.9483C22.121 8.44876 22.1923 7.94922 22.1923 7.44992C22.1923 4.0486 19.4331 1.50335 16.2458 1.50335C15.6037 1.50335 14.9852 1.59838 14.3668 1.81258C13.2962 0.765956 11.8215 0.0999985 10.2042 0.0999985C7.32608 0.0999985 4.92384 2.14546 4.37656 4.85713C1.71258 5.54698 0 8.04449 0 10.5895C0 12.2546 0.713497 13.8719 1.99797 15.0374C1.87905 15.537 1.80766 16.0365 1.80766 16.5359C1.80766 19.9372 4.56687 22.4824 7.75419 22.4824C8.3963 22.4824 9.01477 22.3874 9.63323 22.1732C10.7035 23.2198 12.1782 23.8858 13.7958 23.8858Z" />
    </svg>
  );

  const ClaudeIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: primaryText }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M13.62 2.45a1.15 1.15 0 0 0-1.62.43L9.67 7.02 7.06 2.87a1.15 1.15 0 0 0-1.96 1.22l2.6 4.15-4.88-.63a1.15 1.15 0 0 0-.29 2.28l4.98.65-4.18 2.76a1.15 1.15 0 1 0 1.26 1.92l4.18-2.76-.83 5.01a1.15 1.15 0 0 0 2.27.38l.88-5.25 3.91 3.4a1.15 1.15 0 0 0 1.52-1.72l-3.86-3.36 4.93-.2a1.15 1.15 0 0 0 .1-2.3l-5.01.2 3.09-4.13a1.15 1.15 0 0 0-.76-1.86z" />
    </svg>
  );

  const GeminiIcon = () => (
    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: primaryText }}>
      <path d="M21.3995 10.7291C19.5505 9.93273 17.9332 8.84182 16.545 7.455C15.1582 6.06818 14.0659 4.44955 13.2709 2.60045C12.9668 1.89273 12.72 1.16318 12.5318 0.415909C12.4705 0.171818 12.2523 0 12 0C11.7477 0 11.5295 0.171818 11.4682 0.415909C11.28 1.16318 11.0345 1.89 10.7291 2.60045C9.93273 4.44955 8.84182 6.06818 7.455 7.455C6.06818 8.84045 4.44955 9.93273 2.60045 10.7291C1.89273 11.0332 1.16318 11.28 0.415909 11.4682C0.171818 11.5295 0 11.7477 0 12C0 12.2523 0.171818 12.4705 0.415909 12.5318C1.16318 12.72 1.89 12.9655 2.60045 13.2709C4.44955 14.0673 6.06682 15.1582 7.455 16.545C8.84182 17.9318 9.93409 19.5505 10.7291 21.3995C11.0345 22.1086 11.28 22.8368 11.4682 23.5841C11.4979 23.7027 11.5664 23.808 11.6627 23.8833C11.759 23.9587 11.8777 23.9997 12 24C12.2523 24 12.4705 23.8282 12.5318 23.5841C12.72 22.8368 12.9655 22.11 13.2709 21.3995C14.0673 19.5505 15.1582 17.9332 16.545 16.545C17.9318 15.1582 19.5505 14.0659 21.3995 13.2709C22.1086 12.9655 22.8368 12.72 23.5841 12.5318C23.7027 12.5021 23.808 12.4336 23.8833 12.3373C23.9587 12.241 23.9997 12.1223 24 12C24 11.7477 23.8282 11.5295 23.5841 11.4682C22.8368 11.28 22.11 11.0345 21.3995 10.7291Z" />
    </svg>
  );

  const GrokIcon = () => (
    <Box sx={{ width: 18, height: 18, backgroundColor: primaryText, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 24 24" style={{ width: 12, height: 12, stroke: isDark ? '#000' : '#fff', strokeWidth: 2, strokeLinecap: 'round' }}>
        <line x1="4" y1="4" x2="20" y2="20" />
        <line x1="20" y1="4" x2="4" y2="20" />
      </svg>
    </Box>
  );

  const subscriptions = [
    { name: "ChatGPT Plus", price: 20, icon: <GptIcon /> },
    { name: "Claude Pro", price: 20, icon: <ClaudeIcon /> },
    { name: "Google AI Pro", price: 20, icon: <GeminiIcon /> },
    { name: "Grok", price: 30, icon: <GrokIcon /> }
  ];

  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14, stroke: secondaryText }}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        backgroundColor: 'var(--bg-section)',
        color: 'var(--text-primary)',
        py: { xs: 4, md: 6 },
        transition: 'background-color 0.35s ease',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { md: '100vh' }
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        
        {/* HERO HEADER */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Box sx={{ 
            display: 'inline-flex', px: 2, py: 0.5, borderRadius: '99px', 
            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F3F4F6', mb: 2
          }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: primaryText }}>
              $20/month flat rate
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, lineHeight: 1.1, letterSpacing: '-0.03em', color: primaryText, mb: 1.5 }}>
            Why pay for four AI apps?
          </Typography>
          <Typography sx={{ color: secondaryText, fontSize: { xs: '0.95rem', md: '1.1rem' }, fontWeight: 500 }}>
            Use them all. Pay once. One workspace, one shared memory.
          </Typography>
        </Box>

        {/* OUTER CARD (from new layout style) */}
        <Box sx={{ 
          backgroundColor: outerCardBg, 
          border: outerBorder, 
          borderRadius: '32px 32px 0 0', 
          p: { xs: 2, sm: 3, md: 3 },
          pb: { xs: 4, sm: 4, md: 5 },
          mx: 'auto',
          maxWidth: 600,
          boxShadow: isDark ? '0 30px 60px rgba(0,0,0,0.5)' : '0 30px 60px rgba(0,0,0,0.1)',
          WebkitMaskImage: 'radial-gradient(12px at 12px 0, transparent 12px, black 12.5px) 0 100% / 24px 12px repeat-x, linear-gradient(black 0 0) 0 0 / 100% calc(100% - 12px) no-repeat',
          maskImage: 'radial-gradient(12px at 12px 0, transparent 12px, black 12.5px) 0 100% / 24px 12px repeat-x, linear-gradient(black 0 0) 0 0 / 100% calc(100% - 12px) no-repeat',
        }}>
          
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: primaryText, mb: 0.5 }}>
              Savings Calculator
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: secondaryText }}>
              See what you're paying today — and what OpenLedger replaces.
            </Typography>
          </Box>

          {/* INNER WHITE CARD (from new layout style) */}
          <Box sx={{ 
            backgroundColor: innerCardBg, 
            borderRadius: '24px', 
            border: innerBorder,
            p: { xs: 3, md: 3 },
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.2)' : '0 10px 30px rgba(0,0,0,0.04)'
          }}>

            {/* ACTION PROMPT (Added per request to top of pricing card) */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography sx={{ fontSize: '1.05rem', fontWeight: 600, color: secondaryText }}>
                Try our price range slider to see your potential savings.
              </Typography>
            </Box>

            {/* SLIDER SECTION */}
            <Box sx={{ mb: 6 }}>
              
              {/* GIANT CENTERED PRICE */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: secondaryText, mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Your Current Bill
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
                  <Typography sx={{ fontSize: { xs: '4rem', sm: '5.5rem' }, fontWeight: 400, color: primaryText, lineHeight: 1, letterSpacing: '-0.04em' }}>
                    ${currentTotal}
                  </Typography>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, color: secondaryText }}>
                    /mo
                  </Typography>
                </Box>
              </Box>

              {/* Text moved ABOVE slider */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: mutedText }}>4 Subscriptions</Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: mutedText }}>OpenLedger Pro</Typography>
              </Box>

              {/* The Range Input */}
              <Box sx={{ position: 'relative', height: 48, display: 'flex', alignItems: 'center', mb: 2 }}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.01"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  aria-label="Calculate savings"
                  style={{
                    width: '100%',
                    appearance: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    zIndex: 2,
                    position: 'relative',
                    height: '100%'
                  }}
                />
                
                {/* Custom Thick Track */}
                <Box sx={{ 
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  pointerEvents: 'none', zIndex: 0 
                }}>
                  {/* Filled portion */}
                  <Box sx={{ 
                    position: 'absolute', top: 0, left: 0, bottom: 0, 
                    width: `${progress}%`,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  }} />

                  {/* Dots overlay */}
                  <Box sx={{
                    position: 'absolute', top: 0, left: '12px', right: '12px', bottom: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <Box key={i} sx={{
                        width: 4, height: 4, borderRadius: '50%',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'
                      }} />
                    ))}
                  </Box>
                </Box>
                
                {/* Custom Thumb Element */}
                <Box sx={{
                  position: 'absolute', top: '50%', left: `calc(${progress}% + ${24 - (progress/100)*48}px)`, // Adjust for thumb width so it doesn't overflow
                  transform: 'translate(-50%, -50%)',
                  width: 56, height: 56, borderRadius: '50%',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  pointerEvents: 'none', zIndex: 1,
                }}>
                  {/* Vertical line inside thumb */}
                  <Box sx={{ 
                    width: 4, height: 20, borderRadius: '2px', 
                    backgroundColor: isDark ? '#A9A9A9' : '#666' 
                  }} />
                </Box>
              </Box>
            </Box>

            {/* TRANSFORMING BILL AREA (from the original PRD) */}
            {/* The user specifically wanted this morphing bill inside the new layout style */}
            <Box sx={{ position: 'relative', minHeight: 200, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* OLD subscriptions list (fades out as progress increases) */}
              <Box sx={{ 
                position: 'absolute', top: 0, left: 0, right: 0,
                opacity: oldOp, 
                transform: `scale(${1 - (progress/100)*0.1}) translateY(${progress/2}px)`,
                pointerEvents: oldOp > 0 ? 'auto' : 'none',
                transition: 'transform 0.1s linear, opacity 0.1s linear'
              }}>
                <Box sx={{ maxWidth: 360, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {subscriptions.map((sub, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderRadius: '12px', backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {sub.icon}
                        </Box>
                        <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: primaryText }}>{sub.name}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: secondaryText }}>${sub.price}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* NEW OpenLedger Pro card (fades in as progress increases) */}
              <Box sx={{ 
                position: 'absolute',
                opacity: newOp,
                transform: `scale(${0.9 + (newOp * 0.1)}) translateY(${(1 - newOp)*-20}px)`,
                pointerEvents: newOp > 0 ? 'auto' : 'none',
                transition: 'transform 0.1s linear, opacity 0.1s linear',
                display: 'flex', justifyContent: 'center', width: '100%'
              }}>
                <Box sx={{ 
                  p: 4, borderRadius: '24px', textAlign: 'center', maxWidth: 400, width: '100%',
                  background: isDark ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)' : 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%)',
                  border: innerBorder,
                  boxShadow: isDark ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.05)'
                }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 800, color: orangeColor, letterSpacing: '0.1em', mb: 2 }}>⚡ OPENLEDGER PRO</Typography>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 700, color: primaryText, lineHeight: 1.3, mb: 3 }}>
                    Every model.<br/>One workspace.<br/>One memory.
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                    
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #3A3D42 0%, #17181A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { width: '100%', height: '100%', fill: '#fff' } }}><GptIcon /></Box>
                    </Box>

                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #E08767 0%, #C96646 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { width: '100%', height: '100%', fill: '#fff' } }}><ClaudeIcon /></Box>
                    </Box>

                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #8B90F7 0%, #5B63E6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { width: '100%', height: '100%', fill: '#fff' } }}><GeminiIcon /></Box>
                    </Box>

                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #3A3D42 0%, #17181A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                      <Box sx={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', '& svg': { width: '100%', height: '100%', fill: '#fff' }, '& .grok-bg': { background: 'transparent' }, '& .grok-svg': { stroke: '#fff' } }}><GrokIcon /></Box>
                    </Box>

                    <Box sx={{ 
                      height: 36, px: 2, borderRadius: '99px', 
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: primaryText, fontWeight: 600, fontSize: '0.95rem'
                    }}>
                      + 21
                    </Box>

                  </Box>
                </Box>
              </Box>

            </Box>

            {/* DYNAMIC SAVINGS AREA */}
            <Box sx={{ 
              textAlign: 'center', mb: 5,
              opacity: monthlySavings > 0 ? 1 : 0, 
              transform: monthlySavings > 0 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.4s ease'
            }} aria-live="polite">
              <Typography sx={{ 
                fontSize: progress === 100 ? { xs: '2rem', md: '2.5rem' } : '1.25rem', 
                fontWeight: 800, color: progress === 100 ? orangeColor : secondaryText, 
                lineHeight: 1.1, mb: progress === 100 ? 1 : 0,
                transition: 'all 0.3s ease'
              }}>
                {progress === 100 ? `$${monthlySavings} / MONTH SAVED` : (monthlySavings > 0 ? `Save $${monthlySavings} / month` : '')}
              </Typography>
              
              <Box sx={{ 
                overflow: 'hidden', maxHeight: progress === 100 ? 50 : 0,
                opacity: progress === 100 ? 1 : 0,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: secondaryText }}>
                  ${annualSavings} / YEAR
                </Typography>
              </Box>
            </Box>

            {/* Card end, no bottom prompt needed here */}

          </Box>
        </Box>

        {/* Buttons Added Below Calculator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 6, mb: { xs: 8, md: 10 } }}>
          <Button 
            variant="contained"
            sx={{ 
              display: 'inline-flex',
              cursor: 'pointer',
              userSelect: 'none',
              borderRadius: '9999px',
              px: { xs: 4, sm: 5 },
              py: { xs: 1.2, sm: 1.5 },
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              fontWeight: 700,
              letterSpacing: '0.02em',
              textTransform: 'none',
              backgroundColor: '#ff6600',
              color: '#ffffff',
              border: isDark ? '1px solid rgba(255, 102, 0, 0.4)' : '1px solid rgba(255, 102, 0, 0.2)',
              boxShadow: isDark
                ? '0 8px 32px rgba(255, 102, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                : '0 8px 32px rgba(255, 102, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
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
            }}>
            Try for free
          </Button>
          <Button sx={{ 
            borderRadius: '9999px',
            py: 1.2,
            px: 4,
            fontWeight: 600,
            fontSize: '0.95rem',
            textTransform: 'none',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            backgroundColor: isDark ? 'rgba(20, 24, 30, 0.45)' : 'rgba(255, 255, 255, 0.55)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
            color: 'var(--text-primary)',
            boxShadow: isDark
              ? '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)'
              : '0 2px 6px rgba(15, 23, 42, 0.04), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.8) 100%)',
              borderColor: isDark ? 'rgba(255, 102, 0, 0.35)' : 'rgba(255, 102, 0, 0.3)',
              color: '#ff6600',
              backdropFilter: 'blur(16px) saturate(200%)',
              WebkitBackdropFilter: 'blur(16px) saturate(200%)',
              boxShadow: isDark
                ? '0 4px 14px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.3)'
                : '0 4px 12px rgba(15, 23, 42, 0.08), inset 0 1.5px 2px rgba(255, 255, 255, 1)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
          }}>
            Check all pricing
          </Button>
        </Box>


      </Container>
      
      {/* Global styles to hide default range thumbs */}
      <style dangerouslySetInnerHTML={{__html: `
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          margin-top: -12px; 
        }
        input[type=range]::-moz-range-thumb {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          border: none;
        }
      `}} />
    </Box>
  );
}
