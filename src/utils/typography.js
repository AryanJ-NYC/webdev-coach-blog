import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Roboto'],
  bodyFontFamily: ['Roboto', 'sans serif'],
  overrideStyles: () => ({
    h1: {
      color: '#113643',
    },
    h2: {
      color: '#113643',
    },
  }),
});

export default typography;