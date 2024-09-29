import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brown: {
      900: 'hsl(22, 28%, 21%)',
      800: 'hsl(22, 28%, 29%)',
      700: 'hsl(22, 28%, 37%)',
      600: 'hsl(22, 28%, 45%)',
      500: 'hsl(22, 31%, 52%)',
      400: 'hsl(22, 31%, 60%)',
      300: 'hsl(22, 31%, 67%)',
      200: 'hsl(20, 31%, 74%)',
      100: 'hsl(22, 31%, 81%)',
      50: 'hsl(22, 31%, 88%)',
    },
  },
  // fonts: {
  //   body: "system-ui, sans-serif",
  //   heading: "Georgia, serif",
  //   mono: "Menlo, monospace",
  // },
  fontSizes: {
    xs: "11px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "22px",
    "3xl": "26px",
    "4xl": "34px",
    "5xl": "40px",
    "6xl": "56px",
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    normal: "normal",
    none: "1",
    shorter: "1.25",
    short: "1.375",
    base: "1.5",
    tall: "1.625",
    taller: "2",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
});

export default theme;