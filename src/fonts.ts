/**
 * Font family constants for use in CSS and JavaScript
 * These correspond to the @font-face declarations in fonts.css
 */

export const FONTS = {
  ZFB03: 'ZFB03',
  ZFB03B: 'ZFB03B',
  ZFB08: 'ZFB08',
  ZFB09: 'ZFB09',
  ZFB11: 'ZFB11',
  ZFB19: 'ZFB19',
  ZFB20: 'ZFB20',
  ZFB21: 'ZFB21',
  ZFB24: 'ZFB24',
  ZFB25: 'ZFB25',
  ZFB30: 'ZFB30',
  ZFB31: 'ZFB31',
  Terminus: 'Terminus',
  k8x12: 'k8x12',
  k8x12L: 'k8x12L',
  k8x12S: 'k8x12S',
  k12x8: 'k12x8',
  PM10: 'PM10',
  PM12: 'PM12',
} as const;

export type FontFamily = (typeof FONTS)[keyof typeof FONTS];

/**
 * Default body font stack used throughout the application
 */
export const BODY_FONT_STACK = `${FONTS.ZFB08}, ${FONTS.k12x8}, monospace`;

/**
 * Gets a CSS font-family value for the given font with fallbacks
 */
export function getFontFamily(font: FontFamily, fallbacks: string[] = ['monospace']): string {
  return [font, ...fallbacks].join(', ');
}

/**
 * Font size constants matching the design tokens
 */
export const FONT_SIZES = {
  xs: '6px',
  sm: '8px',
  md: '10px',
  lg: '12px',
  xl: '16px',
} as const;

export type FontSize = keyof typeof FONT_SIZES;
