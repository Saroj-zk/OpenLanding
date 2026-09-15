import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '@/context/ThemeContext';

export function GlyphTile({ name, size = 48 }) {
  const { isDark } = useThemeMode();
  
  const glyphIcons = {
    device: '💻',
    nostore: '🛡️',
    notrain: '🚫',
    noprofile: '🔒'
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: 2,
        backgroundColor: isDark ? 'rgba(255, 102, 0, 0.08)' : 'rgba(255, 102, 0, 0.06)',
        border: '1px solid rgba(255, 102, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FF6600',
        fontSize: size * 0.45,
        fontWeight: 700,
        boxShadow: '0 4px 14px rgba(255, 102, 0, 0.15)',
        transition: 'all 0.25s ease',
        '&:hover': {
          borderColor: '#FF6600',
          boxShadow: '0 6px 20px rgba(255, 102, 0, 0.3)',
          transform: 'scale(1.05)'
        }
      }}
    >
      {glyphIcons[name] || name.substring(0, 2).toUpperCase()}
    </Box>
  );
}

export function PrivacyPanel() {
  const { isDark } = useThemeMode();
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    {
      id: 0,
      title: 'Local Client Vault',
      sub: 'Keys & history on your device',
      badge: 'Client-Side Only',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      id: 1,
      title: 'Zero-Knowledge Pipe',
      sub: 'Encrypted ephemeral routing',
      badge: '0s Memory Buffer',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Stateless Inference',
      sub: 'Executes in RAM, never logged',
      badge: 'No Model Training',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      )
    }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 4,
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-normal)',
        p: { xs: 2.5, sm: 3.5 },
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Orange ambient glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(255, 102, 0, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2.5, borderBottom: '1px solid var(--border-subtle)', position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FF6600' }}>
            Zero-Knowledge Pipeline
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.8,
            px: 1.5,
            py: 0.4,
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 102, 0, 0.08)',
            border: '1px solid rgba(255, 102, 0, 0.3)',
            fontSize: '0.72rem',
            color: '#FF6600',
            fontWeight: 600
          }}
        >
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#FF6600' }} />
          ENCRYPTED IN TRANSIT
        </Box>
      </Box>

      {/* 3 Interactive Pipeline Cards */}
      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, position: 'relative', zIndex: 1 }}>
        {nodes.map((node, index) => {
          const isActive = activeStep === index;
          return (
            <Box
              key={node.id}
              onClick={() => setActiveStep(index)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2.5,
                backgroundColor: isActive ? 'rgba(255, 102, 0, 0.08)' : 'var(--bg-pill)',
                border: '1px solid',
                borderColor: isActive ? '#FF6600' : 'var(--border-subtle)',
                boxShadow: isActive ? '0 4px 20px rgba(255, 102, 0, 0.2)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '&:hover': {
                  borderColor: 'rgba(255, 102, 0, 0.6)',
                  backgroundColor: 'rgba(255, 102, 0, 0.05)'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? '#FF6600' : 'var(--bg-glass)',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 4px 14px rgba(255, 102, 0, 0.4)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {node.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {node.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {node.sub}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '9999px',
                  backgroundColor: isActive ? 'rgba(255, 102, 0, 0.2)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? '#FF6600' : 'var(--border-normal)',
                  color: isActive ? '#FF6600' : 'var(--text-muted)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                {node.badge}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Telemetry bottom bar */}
      <Box
        sx={{
          mt: 3,
          pt: 2.5,
          borderTop: '1px solid var(--border-subtle)',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Retention
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#FF6600', mt: 0.3 }}>
            0 Seconds
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AI Training
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#FF6600', mt: 0.3 }}>
            Disabled
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Profiling
          </Typography>
          <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: '#FF6600', mt: 0.3 }}>
            None
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
