import { filterTokensByType, Tokens } from './fns';

import typographyTokens from './json/alias/typography.json';
import functionalTokens from './json/global/functional.json';
import dimensionsTokens from './json/global/dimensions.json';
import wireframeTokens from './json/brand/wireframe/base.json';
import wireframeDeviceTokens from './json/brand/wireframe/device/desktop.json';
import forexBaseTokens from './json/brand/forex/base.json';
import forexThemeTokens from './json/brand/forex/base.json';
import forexDeviceTokens from './json/brand/forex/device/desktop.json';
import stonexBaseTokens from './json/brand/stonex/base.json';
import stonexThemeTokens from './json/brand/stonex/base.json';
import stonexDeviceTokens from './json/brand/stonex/device/desktop.json';
import cityindexBaseTokens from './json/brand/cityindex/base.json';
import cityindexThemeTokens from './json/brand/cityindex/base.json';
import cityindexDeviceTokens from './json/brand/cityindex/device/desktop.json';

export const tokens: Tokens = [
  ...Object.values(typographyTokens),
  ...Object.values(functionalTokens),
  ...Object.values(dimensionsTokens),
  ...Object.values(wireframeTokens),
  ...Object.values(wireframeDeviceTokens),
  ...Object.values(forexBaseTokens),
  ...Object.values(forexThemeTokens),
  ...Object.values(forexDeviceTokens),
  ...Object.values(stonexBaseTokens),
  ...Object.values(stonexThemeTokens),
  ...Object.values(stonexDeviceTokens),
  ...Object.values(cityindexBaseTokens),
  ...Object.values(cityindexThemeTokens),
  ...Object.values(cityindexDeviceTokens),
];

export const colors = filterTokensByType('color', tokens);
export const spacing = filterTokensByType('spacing', tokens);
export const borderRadius = filterTokensByType('borderRadius', tokens);
export const boxShadow = filterTokensByType('boxShadow', tokens);
export const fontSize = filterTokensByType('fontSizes', tokens);
export const typography = filterTokensByType('typography', tokens);
export const sizing = filterTokensByType('sizing', tokens);
