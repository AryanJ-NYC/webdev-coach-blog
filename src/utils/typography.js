import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.45,
  headerFontFamily: ['Roboto'],
  bodyFontFamily: ['Roboto', 'sans serif'],
  overrideStyles: () => ({
    h1: {
      color: '#FE7F2D',
    },
    h2: {
      color: '#FE7F2D',
    },
  }),
});

export default typography;
