/** @type {import('tailwindcss').Config} */
const { colors, borderRadius, boxShadow, fontSize, sizing, spacing, typography } = require('./tokens/tokens');

module.exports = {
  content: [
    './pages/**/*.{js,ts,tsx,json}',
    './components/**/*.{js,ts,tsx,json}',
    // './tokens/**/*.{css,json}',
  ],
  theme: {
    extend: {
      colors,
      ...spacing,
      borderRadius: borderRadius.border,
      boxShadow: boxShadow.shadow,
      fontSize: {
        ...fontSize.size.heading,
        ...fontSize.size.body,
      },
      borderWidth: {
        1: '1px',
        ...sizing.size,
      },
    },
  },
  plugins: [
  ],
  safelist: [
    { pattern: /(grid|pt|pr|pb|pl|mt|mr|mb|ml|border-t|border-r|border-b|border-l|rounded|shadow|bg)-.+/ },
  ],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    themes: [],
  },
};
