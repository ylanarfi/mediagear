import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7F56D9',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF5733',
      contrastText: '#FFFFFF',
    },
    // Добавьте другие палитры по необходимости
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          gap: '4px',
          marginLeft: '0 !important',
          padding: '9px 14px',
          boxShadow: '0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

        },
        // contained: {
        //   backgroundColor: '#33FF57',
        //   color: '#ffffff',
        //   '&:hover': {
        //     backgroundColor: '#28a745',
        //   },
        // },
        // outlined: {
        //   borderColor: '#FF5733',
        //   color: '#FF5733',
        //   '&:hover': {
        //     borderColor: '#C70039',
        //     backgroundColor: '#FFE5E5',
        //   },
        // },
        // Добавьте стили для других вариантов кнопок при необходимости
      },
    },
  },
});

export default theme;
