import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useThemeMode } from '@/context/ThemeContext';

/* Each of these resolves to a section on this page. #consensus and #privacy
   were in here before and matched nothing. */
const NAV_ITEMS = [
  { label: 'Models', href: '/models' },
  { label: 'Consensus', href: '#consensus-mode' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Token', href: null, isComingSoon: true },
];

export default function Header() {
  const { isDark } = useThemeMode();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          /* Measured off the hero rather than guessed from the viewport,
             and if a page has no hero the bar simply stays put. */
          const heroEl = document.getElementById('hero');
          const heroHeight = heroEl ? heroEl.offsetHeight * 0.75 : 0;
          if (currentScrollY < heroHeight) {
            setIsVisible(false);
          } else if (currentScrollY > lastScrollY.current) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTryClick = () => {
    window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: 0,
          right: 0,
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, md: 4 },
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1240,
            height: 64,
            borderRadius: '999px',
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.75)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: isDark ? '0 12px 32px rgba(0, 0, 0, 0.6)' : '0 12px 32px rgba(15, 23, 42, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 1.5, md: 2 },
            pointerEvents: isVisible ? 'auto' : 'none',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-150%)',
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Left: Logo & Input Box */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            {/* Optional Logo */}
            <Box
              component="a"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              sx={{
                display: { xs: 'none', lg: 'inline-flex' },
                alignItems: 'center',
                ml: 1,
              }}
            >
              <img
                src="/Open%20Ledegr%20Full%20Black.svg"
                alt="Hey Open"
                style={{
                  height: 20,
                  width: 'auto',
                  display: 'block',
                  filter: isDark ? 'brightness(0) invert(1)' : 'none',
                }}
              />
            </Box>

          </Box>

          {/* Center: Links */}
          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { md: 2.5, lg: 3.5 },
              flex: 'none',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.label}
                component={item.href ? 'a' : 'div'}
                href={item.href || undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  color: isDark ? 'rgba(255, 255, 255, 0.75)' : '#475569',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: item.href ? 'pointer' : 'default',
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: item.href ? (isDark ? '#FFFFFF' : '#0F172A') : (isDark ? 'rgba(255, 255, 255, 0.75)' : '#475569'),
                  },
                }}
              >
                {item.label}
                {item.isComingSoon && (
                  <Box
                    component="span"
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '999px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                      color: isDark ? 'rgba(255,255,255,0.6)' : '#64748B',
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          {/* Right: Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1,
              gap: { xs: 1, sm: 2 },
            }}
          >
            {/* $OPEN Button removed as requested */}

            {/* Log in Link */}
            <Box
              component="a"
              onClick={handleTryClick}
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: isDark ? '#FFFFFF' : '#0F172A',
                fontSize: '0.96rem',
                fontWeight: 700,
                textDecoration: 'none',
                cursor: 'pointer',
                fontFamily: '"Inter", -apple-system, sans-serif',
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Log in
            </Box>

            {/* Mobile Hamburger Toggle */}
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                display: { xs: 'flex', md: 'none' },
                color: isDark ? '#FFFFFF' : '#0F172A',
              }}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {mobileOpen && (
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            top: 86,
            left: 16,
            right: 16,
            borderRadius: '24px',
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(28px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
            px: 3,
            py: 3,
            zIndex: 1290,
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.label}
                component={item.href ? 'a' : 'div'}
                href={item.href || undefined}
                onClick={() => { if (item.href) setMobileOpen(false); }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#0F172A',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: '"Inter", -apple-system, sans-serif',
                }}
              >
                {item.label}
                {item.isComingSoon && (
                  <Box
                    component="span"
                    sx={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      px: 0.8,
                      py: 0.2,
                      borderRadius: '999px',
                      backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
                      color: isDark ? 'rgba(255,255,255,0.6)' : '#64748B',
                    }}
                  >
                    Coming Soon
                  </Box>
                )}
              </Box>
            ))}

            <Box sx={{ height: 1, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', my: 1 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* $OPEN button removed as requested */}
              
              <Box
                component="a"
                onClick={() => {
                  setMobileOpen(false);
                  handleTryClick();
                }}
                sx={{
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Log in
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
