import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E50', // Deep blue
      light: '#34495E',
      dark: '#1A252F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1ABC9C', // Teal
      light: '#2EE4C3',
      dark: '#138D76',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E74C3C', // Soft red
      light: '#FF6B6B',
      dark: '#C0392B',
    },
    warning: {
      main: '#F39C12', // Amber
      light: '#F1C40F',
      dark: '#D35400',
    },
    info: {
      main: '#3498DB',
      light: '#5DADE2',
      dark: '#2980B9',
    },
    success: {
      main: '#27AE60',
      light: '#2ECC71',
      dark: '#219A52',
    },
    background: {
      default: '#F5F7FA', // Light gray
      paper: '#FFFFFF',
    },
    grey: {
      50: '#F5F7FA',
      100: '#E5E9F2',
      200: '#D1D9E6',
      300: '#B8C2CC',
      400: '#8795A1',
      500: '#6C7A89',
      600: '#4A5568',
      700: '#34495E', // Dark gray
      800: '#2D3748',
      900: '#1A202C',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2C3E50',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#34495E',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#6C7A89',
    },
    body1: {
      fontSize: '1rem',
      color: '#4A5568',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6C7A89',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
          border: '1px solid #E5E9F2',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1ABC9C',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E5E9F2',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            backgroundColor: '#1ABC9C',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#138D76',
            },
          },
        },
      },
    },
  },
}, ruRU); 