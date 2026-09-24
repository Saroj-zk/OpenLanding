import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useThemeMode } from '@/context/ThemeContext';
import LockIcon from '@mui/icons-material/Lock';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MemoryIcon from '@mui/icons-material/Memory';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const TABS = [
  {
    id: 'private',
    label: 'Private AI',
    fullLabel: 'Private AI',
    shortLabel: 'Private AI',
    icon: LockIcon,
    href: '/private',
  },
  {
    id: 'multimodel',
    label: 'Multi-Model',
    fullLabel: 'Multi-Model & Tokens',
    shortLabel: 'Multi-Model',
    icon: AutoAwesomeIcon,
    href: '/models',
  },
  {
    id: 'memory',
    label: 'Unified Memory',
    fullLabel: 'Unified Memory',
    shortLabel: 'Memory',
    icon: MemoryIcon,
    href: '/memory',
  },
  {
    id: 'agents',
    label: 'Built for Agents',
    fullLabel: 'Built for Agents',
    shortLabel: 'Agents',
    icon: SmartToyIcon,
    href: '/capabilities',
  },
];

export default function FeatureTabBar() {
  const { isDark } = useThemeMode();
  const router = useRouter();

  const activeIndex = TABS.findIndex((t) => router.pathname.startsWith(t.href));
  const activeTab = activeIndex === -1 ? 0 : activeIndex;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 840 },
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 58,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          p: '6px',
          borderRadius: '9999px',
          backgroundColor: isDark ? 'rgba(20, 24, 30, 0.48)' : 'rgba(255, 255, 255, 0.45)',
          border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(8px) saturate(180%)',
          boxShadow: isDark
            ? '0 20px 45px -12px rgba(0, 0, 0, 0.5), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.22), inset 0 -1px 2px rgba(0, 0, 0, 0.4)'
            : '0 20px 45px -12px rgba(15, 23, 42, 0.09), 0 2px 8px rgba(0, 0, 0, 0.02), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(0, 0, 0, 0.03)',
          boxSizing: 'border-box',
          userSelect: 'none',
        }}
      >
        {/* The Active Pill */}
        <Box
          sx={{
            position: 'absolute',
            top: '6px',
            bottom: '6px',
            left: `calc(6px + ${activeTab} * ((100% - 12px) / 4))`,
            width: 'calc((100% - 12px) / 4)',
            height: 46,
            borderRadius: '9999px',
            backgroundColor: isDark ? 'rgba(255, 102, 0, 0.12)' : 'rgba(255, 255, 255, 0.88)',
            background: isDark
                ? 'linear-gradient(180deg, rgba(255, 102, 0, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)'
                : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 243, 235, 0.84) 100%)',
            backdropFilter: 'blur(16px)',
            border: isDark
              ? '1px solid rgba(255, 102, 0, 0.28)'
              : '1px solid rgba(255, 102, 0, 0.2)',
            boxShadow: isDark
                ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.3), inset 0 -0.5px 1px rgba(0, 0, 0, 0.3)'
                : '0 2px 6px rgba(15, 23, 42, 0.06), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95), inset 0 -0.5px 1px rgba(0, 0, 0, 0.04)',
            transition: 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Specular highlight */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: '12%',
              right: '12%',
              height: '2px',
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.6), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255, 102, 0, 0.45), transparent)',
              borderRadius: '9999px',
              opacity: isDark ? 0.8 : 0.6,
            }}
          />
        </Box>

        {TABS.map((tab, idx) => {
          const isActive = activeTab === idx;
          const IconComponent = tab.icon;
          return (
            <Link key={tab.id} href={tab.href} passHref style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  height: 46,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: { xs: 0.5, sm: 1.2 },
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  color: isActive
                    ? '#ff6600'
                    : (isDark ? 'rgba(255, 255, 255, 0.55)' : '#64748B'),
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: isActive ? '#ff6600' : (isDark ? '#FFFFFF' : '#1E293B'),
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: { xs: 0.5, sm: 0.8 },
                    pointerEvents: 'none',
                    width: '100%',
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      sx={{
                        fontSize: { xs: '1.05rem', sm: '1.18rem' },
                        flexShrink: 0,
                        color: isActive
                          ? '#ff6600'
                          : (isDark ? 'rgba(255, 255, 255, 0.5)' : '#94A3B8'),
                        transition: 'color 0.2s ease',
                      }}
                    />
                  )}
                  <Typography
                    component="span"
                    sx={{
                      fontFamily: '"Inter", -apple-system, sans-serif',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: { xs: '0.72rem', sm: '0.82rem', md: '0.86rem' },
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      letterSpacing: '-0.01em',
                      color: isActive ? '#ff6600' : 'inherit',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                      {tab.fullLabel || tab.label}
                    </Box>
                    <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
                      {tab.shortLabel || tab.label}
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
