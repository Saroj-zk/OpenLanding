import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useThemeMode } from '@/context/ThemeContext';

const NAV_LINKS = [
  { label: 'Models', href: '/models' },
  { label: 'Memory', href: '/memory' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Private AI', href: '/private' },
  { label: 'Token', href: '/token' },
];

export default function PageHeader() {
  const { isDark, toggleTheme } = useThemeMode();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* ── Floating pill header ─────────────────────────────── */}
      <Box
        component="header"
        sx={{
          position: 'fixed',
          top: { xs: 14, md: 20 },
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
            height: 60,
            borderRadius: '999px',
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.80)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.10)'
              : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: isDark
              ? '0 12px 32px rgba(0, 0, 0, 0.6)'
              : '0 12px 32px rgba(15, 23, 42, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 1.5, md: 2 },
            pointerEvents: 'auto',
          }}
        >
          {/* Left — Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
            <Link href="/" passHref style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginLeft: 8 }}>
              <img
                src="/Open%20Ledegr%20Full%20Black.svg"
                alt="OpenLedger"
                style={{
                  height: 20,
                  width: 'auto',
                  display: 'block',
                  filter: isDark ? 'brightness(0) invert(1)' : 'none',
                }}
              />
            </Link>
          </Box>

          {/* Center — Nav links */}
          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: { md: 2.5, lg: 3.5 },
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {NAV_LINKS.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link key={link.href} href={link.href} passHref style={{ textDecoration: 'none' }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 0.6,
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: isActive
                        ? '#FF6600'
                        : isDark ? 'rgba(255,255,255,0.75)' : '#475569',
                      textDecoration: 'none',
                      fontFamily: '"Inter", -apple-system, sans-serif',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: isActive
                          ? '#FF6600'
                          : isDark ? '#FFFFFF' : '#0F172A',
                      },
                    }}
                  >
                    {isActive && (
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: '#FF6600',
                          boxShadow: '0 0 7px #FF6600',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {link.label}
                  </Box>
                </Link>
              );
            })}
            {/* Back to home */}
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Box
                component="span"
                sx={{
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: isDark ? 'rgba(255,255,255,0.55)' : '#94a3b8',
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  transition: 'color 0.2s ease',
                  '&:hover': { color: isDark ? '#FFFFFF' : '#0F172A' },
                }}
              >
                ← Home
              </Box>
            </Link>
          </Box>

          {/* Right — Actions */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
              flexShrink: 0,
            }}
          >
            {/* $OPEN pill button */}
            <Button
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: '9999px',
                py: 0.6,
                px: 2.2,
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'none',
                color: '#ff6600',
                backdropFilter: 'blur(8px) saturate(180%)',
                WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                background: isDark
                  ? 'linear-gradient(180deg, rgba(255,102,0,0.18) 0%, rgba(255,255,255,0.08) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,243,235,0.84) 100%)',
                border: isDark
                  ? '1px solid rgba(255,102,0,0.32)'
                  : '1px solid rgba(255,102,0,0.24)',
                boxShadow: isDark
                  ? '0 2px 8px rgba(0,0,0,0.35), inset 0 1.5px 1.5px rgba(255,255,255,0.35)'
                  : '0 2px 6px rgba(15,23,42,0.06), inset 0 1.5px 1.5px rgba(255,255,255,1)',
                transition: 'all 0.2s cubic-bezier(0.2,0,0,1)',
                fontFamily: '"Inter", -apple-system, sans-serif',
                '&:hover': {
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(255,102,0,0.26) 0%, rgba(255,255,255,0.12) 100%)'
                    : 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,238,226,0.95) 100%)',
                  borderColor: isDark ? 'rgba(255,102,0,0.45)' : 'rgba(255,102,0,0.35)',
                  transform: 'translateY(-1px)',
                },
                '&:active': { transform: 'scale(0.92)' },
              }}
            >
              $OPEN
            </Button>

            {/* Start a chat */}
            <Button
              onClick={() => window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer')}
              sx={{
                borderRadius: '9999px',
                py: 0.75,
                px: { xs: 2, sm: 2.5 },
                fontSize: '0.88rem',
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: '#FF6600',
                color: '#FFFFFF',
                fontFamily: '"Inter", -apple-system, sans-serif',
                boxShadow: isDark
                  ? '0 4px 14px rgba(255,102,0,0.35)'
                  : '0 4px 12px rgba(255,102,0,0.25)',
                border: isDark
                  ? '1px solid rgba(255,102,0,0.4)'
                  : '1px solid rgba(255,102,0,0.2)',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                '&:hover': {
                  backgroundColor: '#e65c00',
                  transform: 'translateY(-1px)',
                  boxShadow: isDark
                    ? '0 6px 20px rgba(255,102,0,0.45)'
                    : '0 6px 20px rgba(255,102,0,0.35)',
                },
                '&:active': { transform: 'scale(0.95)' },
              }}
            >
              Start a chat
            </Button>

            {/* Theme toggle */}
            <Tooltip title={isDark ? 'Switch to light theme' : 'Switch to dark theme'} arrow>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  width: 36,
                  height: 36,
                  color: isDark ? '#FFFFFF' : '#0F172A',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.05)',
                  },
                }}
              >
                {isDark
                  ? <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
                  : <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>

            {/* Mobile hamburger */}
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

      {/* ── Mobile drawer ────────────────────────────────────── */}
      {mobileOpen && (
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
            position: 'fixed',
            top: 86,
            left: 16,
            right: 16,
            borderRadius: '24px',
            backgroundColor: isDark
              ? 'rgba(10, 10, 10, 0.95)'
              : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(28px)',
            border: isDark
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.1)',
            px: 3,
            py: 3,
            zIndex: 1290,
            boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  passHref
                  style={{ textDecoration: 'none' }}
                  onClick={() => setMobileOpen(false)}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      color: isActive
                        ? '#FF6600'
                        : isDark ? 'rgba(255,255,255,0.9)' : '#0F172A',
                      fontSize: '1.1rem',
                      fontWeight: isActive ? 700 : 600,
                    }}
                  >
                    {isActive && (
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
                    {link.label}
                  </Box>
                </Link>
              );
            })}
            <Box
              sx={{
                height: 1,
                backgroundColor: isDark
                  ? 'rgba(255,255,255,0.1)'
                  : 'rgba(0,0,0,0.1)',
                my: 1,
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link href="/" passHref style={{ textDecoration: 'none' }}>
                <Box
                  component="span"
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.6)' : '#94a3b8',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  ← Home
                </Box>
              </Link>
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  window.open('https://ais.openledger.xyz/chat', '_blank', 'noopener,noreferrer');
                }}
                sx={{
                  borderRadius: '9999px',
                  py: 0.8,
                  px: 2.5,
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  backgroundColor: '#FF6600',
                  color: '#FFFFFF',
                }}
              >
                Start a chat
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* ── Spacer so page content doesn't sit under the fixed header ── */}
      <Box sx={{ height: { xs: 78, md: 92 } }} />
    </>
  );
}
