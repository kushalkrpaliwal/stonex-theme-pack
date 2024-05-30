import { filterTokensByType } from './fns';

import functionalTokens from './global/functional.json';
import wireframeTokens from './json/wireframe/desktop.json';
import forexTokens from './json/forex/dark/desktop.json';
import stonexTokens from './json/stonex/dark/desktop.json';
import ciTokens from './json/ci/dark/desktop.json';

export const tokens = [
  ...Object.values(functionalTokens),
  ...Object.values(wireframeTokens),
  ...Object.values(forexTokens),
  ...Object.values(stonexTokens),
  ...Object.values(ciTokens),
];

export const colors = filterTokensByType('color', tokens);
export const spacing = filterTokensByType('spacing', tokens);
export const borderRadius = filterTokensByType('borderRadius', tokens);
export const boxShadow = filterTokensByType('boxShadow', tokens);
export const fontSize = filterTokensByType('fontSizes', tokens);
export const typography = filterTokensByType('typography', tokens);
export const sizing = filterTokensByType('sizing', tokens);
