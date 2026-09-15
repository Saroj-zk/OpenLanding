import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6600',
      light: '#FF8533',
      dark: '#CC5200',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF6B35',
      light: '#FF885C',
      dark: '#CC4E1F',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0C10',
      paper: '#12161F',
    },
    text: {
      primary: '#F0F4F8',
      secondary: '#94A3B8',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0A0C10',
          color: '#F0F4F8',
          overflowX: 'hidden',
          scrollBehavior: 'auto',
        },
        '*::-webkit-scrollbar': {
          width: '6px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#0A0C10',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255, 255, 255, 0.16)',
          borderRadius: '3px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'none',
          fontWeight: 700,
          letterSpacing: '0.02em',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        },
        contained: {
          backgroundColor: '#ff6600',
          color: '#ffffff',
          boxShadow: '0 8px 32px rgba(255, 102, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          border: '1px solid rgba(255, 102, 0, 0.35)',
          '&:hover': {
            backgroundColor: '#e65c00',
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 36px rgba(255, 102, 0, 0.45), 0 0 20px rgba(255, 102, 0, 0.2)',
          },
          '&:active': {
            transform: 'scale(0.96)',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
