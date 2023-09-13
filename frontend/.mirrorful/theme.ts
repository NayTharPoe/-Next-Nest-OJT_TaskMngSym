
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = {
  colors: {
    text: {
      '50': '#9c9da2',
      '100': '#898b91',
      '200': '#777980',
      '300': '#66676d',
      '400': '#58595e',
      '500': '#47484c',
      '600': '#36373a',
      '700': '#171718',
      '800': '#050606',
      '900': '#000000',
      base: '#47484c',
    },
    error: {
      '50': '#ffffff',
      '100': '#fee4e4',
      '200': '#fdc1c1',
      '300': '#fd9f9f',
      '400': '#fc8383',
      '500': '#fb6060',
      '600': '#fa3d3d',
      '700': '#f10606',
      '800': '#ce0505',
      '900': '#ab0404',
      base: '#fb6060',
    },
    success: {
      '50': '#59e3ff',
      '100': '#36ddff',
      '200': '#12d7ff',
      '300': '#00c5ed',
      '400': '#00aed1',
      '500': '#0090ad',
      '600': '#007289',
      '700': '#003d49',
      '800': '#001f25',
      '900': '#000102',
      base: '#0090ad',
    },
    background: {
      '50': '#737373',
      '100': '#616161',
      '200': '#4f4f4f',
      '300': '#3d3d3d',
      '400': '#2f2f2f',
      '500': '#1d1d1d',
      '600': '#0b0b0b',
      '700': '#000000',
      '800': '#000000',
      '900': '#000000',
      base: '#1d1d1d',
    },
    grey: {
      '50': '#8c8c8c',
      '100': '#7a7a7a',
      '200': '#686868',
      '300': '#565656',
      '400': '#484848',
      '500': '#363636',
      '600': '#242424',
      '700': '#040404',
      '800': '#000000',
      '900': '#000000',
      base: '#363636',
    },
    skyblue: {
      '50': '#abdeff',
      '100': '#88cfff',
      '200': '#64c1ff',
      '300': '#40b3ff',
      '400': '#24a7ff',
      '500': '#0099ff',
      '600': '#0084db',
      '700': '#005d9b',
      '800': '#004877',
      '900': '#003254',
      base: '#0099ff',
    },
    milky: {
      '50': '#ffffff',
      '100': '#ffffff',
      '200': '#ffffff',
      '300': '#ffffff',
      '400': '#ffffff',
      '500': '#f9f9f9',
      '600': '#e7e7e7',
      '700': '#c7c7c7',
      '800': '#b5b5b5',
      '900': '#a3a3a3',
      base: '#f9f9f9',
    },
  },
  fontSizes: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
  fontWeights: {
    light: '200',
    normal: '400',
    bold: '700',
  },
  lineHeights: {
    short: '1',
    normal: '1.5',
    tall: '2',
  },
  boxShadows: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
}
  