/**
 * CSS Custom Properties (CSS Variables) constants
 * These correspond to the variables defined in the theme CSS files
 */

// Colors
export const color = {
  background: '--color-background',
  controls: '--color-controls',
  surface: '--color-surface',
  canvasArea: '--color-canvas-area',
  canvas: '--color-canvas',
  canvasBorder: '--color-canvas-border',
  onBackground: '--color-on-background',
  selectionBorder: '--color-selection-border',
  selectionBorderFill: '--color-selection-border-fill',
  border: '--color-border',
  borderSecondary: '--color-border-secondary',
  accent: '--color-accent',
  active: '--color-active',
  enabled: '--color-enabled',
  muted: '--color-muted',
  error: '--color-error',
  warn: '--color-warn',
  overlay: '--color-overlay',
  button: {
    bg: '--color-button-bg',
    hover: '--color-button-hover',
    active: '--color-button-active',
    text: '--color-button-text',
    textOnAccent: '--color-button-text-on-accent',
    border: '--color-button-border',
  },
};

// Sizes
export const size = {
  bottomInfo: '--size-bottom-info',
  dialogRadius: '--size-dialog-radius',
  buttonRadius: '--size-button-radius',
};

// Spacing
export const spacing = {
  xs: '--spacing-xs',
  sm: '--spacing-sm',
  md: '--spacing-md',
  lg: '--spacing-lg',
  xl: '--spacing-xl',
};

// Text sizes
export const text = {
  xs: '--text-xs',
  sm: '--text-sm',
  md: '--text-md',
  lg: '--text-lg',
  xl: '--text-xl',
};

// Fonts
export const font = {
  body: '--font-body',
};

/**
 * Gets a CSS var() function call for the given variable
 * @param varName - The CSS variable name (with or without --)
 * @param fallback - Optional fallback value
 */
export function cssVar(varName: string, fallback?: string): string {
  const name = varName.startsWith('--') ? varName : `--${varName}`;
  return fallback ? `var(${name}, ${fallback})` : `var(${name})`;
}

/**
 * Type-safe CSS variable getter
 */
export function getCSSVar(path: string): string {
  return cssVar(path);
}

/**
 * Sets a CSS custom property on the document root
 * @param property - The CSS property name (with or without --)
 * @param value - The value to set
 */
export function setCSSProperty(property: string, value: string): void {
  const propName = property.startsWith('--') ? property : `--${property}`;
  document.documentElement.style.setProperty(propName, value);
}

/**
 * Gets a CSS custom property value from the document root
 * @param property - The CSS property name (with or without --)
 */
export function getCSSProperty(property: string): string {
  const propName = property.startsWith('--') ? property : `--${property}`;
  return getComputedStyle(document.documentElement).getPropertyValue(propName).trim();
}
