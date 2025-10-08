import { getCSSProperty, setCSSProperty } from './vars';
import { blackTheme, darkTheme, darkThemeGYFlip, lightTheme } from './ve_global.css';

export type Theme = 'os' | 'light' | 'dark' | 'dark-gy-flip' | 'black';
export type UserTheme = { name: string; css: string };

export const themeOptions = [
  { label: 'os theme', value: 'os' },
  { label: 'light', value: 'light' },
  { label: 'dark', value: 'dark' },
  { label: 'dark-gy-flip', value: 'dark-gy-flip' },
  { label: 'black', value: 'black' },
] as const;

// ビルトインテーマのCSS変数定義
const builtinThemes = {
  light: {
    '--color-background': '#fdfdfd',
    '--color-controls': '#fafafa',
    '--color-surface': '#f0f0f0',
    '--color-canvas-area': '#f8f8f8',
    '--color-canvas': '#ffffff',
    '--color-canvas-border': 'rgba(3, 3, 3, 0.22)',
    '--color-on-background': '#202020',
    '--color-selection-border': '#808080',
    '--color-selection-border-fill': 'rgba(0, 0, 0, 0.06)',
    '--color-border': '#aaaaaa',
    '--color-border-secondary': '#dddddd',
    '--color-accent': '#0080ff',
    '--color-active': '#ff00ff',
    '--color-enabled': '#00dd00',
    '--color-muted': 'rgba(0, 0, 0, 0.35)',
    '--color-error': '#ff0000',
    '--color-warn': '#ffcc00',
    '--color-overlay': 'rgba(0, 0, 0, 0.5)',
    '--color-button-bg': '#ffffff',
    '--color-button-hover': '#e5e5e5',
    '--color-button-active': '#e0e0e0',
    '--color-button-text': 'rgba(32, 32, 32, 0.87)',
    '--color-button-text-on-accent': '#ffffff',
    '--color-button-border': 'rgba(32, 32, 32, 0.87)',
  },
  dark: {
    '--color-background': '#202020',
    '--color-controls': '#272727',
    '--color-surface': '#303030',
    '--color-canvas-area': '#1a1a1a',
    '--color-canvas': '#ffffff',
    '--color-canvas-border': 'rgba(128, 128, 128, 0.5)',
    '--color-on-background': '#eeeeee',
    '--color-selection-border': '#808080',
    '--color-selection-border-fill': 'rgba(128, 128, 128, 0.25)',
    '--color-border': '#565656',
    '--color-border-secondary': '#444444',
    '--color-accent': '#ffff00',
    '--color-active': '#00ff00',
    '--color-enabled': '#00ff00',
    '--color-muted': 'rgba(255, 255, 255, 0.3)',
    '--color-error': '#ff5f5f',
    '--color-warn': '#fffb00',
    '--color-overlay': 'rgba(255, 255, 255, 0.5)',
    '--color-button-bg': '#222222',
    '--color-button-hover': '#444444',
    '--color-button-active': '#555555',
    '--color-button-text': '#eeeeee',
    '--color-button-text-on-accent': '#222222',
    '--color-button-border': '#bbbbbb',
  },
  'dark-gy-flip': {
    '--color-background': '#202020',
    '--color-controls': '#272727',
    '--color-surface': '#303030',
    '--color-canvas-area': '#1a1a1a',
    '--color-canvas': '#ffffff',
    '--color-canvas-border': 'rgba(128, 128, 128, 0.5)',
    '--color-on-background': '#eeeeee',
    '--color-selection-border': '#808080',
    '--color-selection-border-fill': 'rgba(128, 128, 128, 0.25)',
    '--color-border': '#565656',
    '--color-border-secondary': '#444444',
    '--color-accent': '#00ff00', // flipped
    '--color-active': '#ffff00', // flipped
    '--color-enabled': '#00ff00',
    '--color-muted': 'rgba(255, 255, 255, 0.3)',
    '--color-error': '#ff5f5f',
    '--color-warn': '#fffb00',
    '--color-overlay': 'rgba(255, 255, 255, 0.5)',
    '--color-button-bg': '#222222',
    '--color-button-hover': '#444444',
    '--color-button-active': '#555555',
    '--color-button-text': '#eeeeee',
    '--color-button-text-on-accent': '#222222',
    '--color-button-border': '#bbbbbb',
  },
  black: {
    '--color-background': '#141414',
    '--color-controls': '#181818',
    '--color-surface': '#252525',
    '--color-canvas-area': '#000000',
    '--color-canvas': '#ffffff',
    '--color-canvas-border': 'rgba(128, 128, 128, 0.5)',
    '--color-on-background': '#eeeeee',
    '--color-selection-border': '#808080',
    '--color-selection-border-fill': 'rgba(128, 128, 128, 0.25)',
    '--color-border': '#505050',
    '--color-border-secondary': '#404040',
    '--color-accent': '#ff00ff',
    '--color-active': '#ff00ff',
    '--color-enabled': '#00ff00',
    '--color-muted': 'rgba(255, 255, 255, 0.3)',
    '--color-error': '#ff3030',
    '--color-warn': '#fffb00',
    '--color-overlay': 'rgba(255, 255, 255, 0.32)',
    '--color-button-bg': '#222222',
    '--color-button-hover': '#444444',
    '--color-button-active': '#555555',
    '--color-button-text': '#eeeeee',
    '--color-button-text-on-accent': '#101010',
    '--color-button-border': '#aaaaaa',
  },
} as const;

// ユーザーテーマ用のCSSStyleSheetを管理
let userThemeStyleSheet: CSSStyleSheet | null = null;

/**
 * ビルトインテーマを適用する
 * @param theme テーマ名
 */
export function applyBuiltinTheme(theme: Theme): void {
  // ユーザーテーマがあれば削除
  if (userThemeStyleSheet) {
    removeUserThemeStyleSheet();
  }

  let targetTheme: keyof typeof builtinThemes;

  if (theme === 'os') {
    // OS設定を確認
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    targetTheme = mq.matches ? 'dark' : 'light';
  } else {
    targetTheme = theme;
  }

  const themeVars = builtinThemes[targetTheme];

  // CSS変数を一括で更新
  Object.entries(themeVars).forEach(([property, value]) => {
    setCSSProperty(property, value);
  });
}

/**
 * ユーザー定義テーマを適用する
 * @param css テーマのCSS文字列
 */
export function applyUserTheme(css: string): void {
  // 既存のユーザーテーマシートを削除
  removeUserThemeStyleSheet();

  // 新しいスタイルシートを作成
  userThemeStyleSheet = new CSSStyleSheet();
  userThemeStyleSheet.replaceSync(css);

  // adoptedStyleSheetsに追加
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, userThemeStyleSheet];
}

/**
 * 統一されたテーマ適用API
 * @param theme ビルトインテーマ名またはユーザーテーマオブジェクト
 */
export function applyTheme(theme: Theme | UserTheme): void {
  if (typeof theme === 'string') {
    applyBuiltinTheme(theme);
  } else {
    applyUserTheme(theme.css);
  }
}

/**
 * 現在適用されているテーマの取得（ビルトインテーマのみ）
 */
export function getCurrentBuiltinTheme(): Theme | null {
  const background = getCSSProperty('--color-background');
  const accent = getCSSProperty('--color-accent');

  // 背景色とアクセントカラーでテーマを判定
  switch (background) {
    case '#fdfdfd':
      return 'light';
    case '#202020':
      // dark と dark-gy-flip を区別するためにaccentをチェック
      return accent === '#00ff00' ? 'dark-gy-flip' : 'dark';
    case '#141414':
      return 'black';
    default:
      return null;
  }
}

/**
 * ユーザーテーマスタイルシートを削除
 */
function removeUserThemeStyleSheet(): void {
  if (userThemeStyleSheet) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((sheet) => sheet !== userThemeStyleSheet);
    userThemeStyleSheet = null;
  }
}

/**
 * OSテーマの変更を監視して自動適用する
 * @param callback OSテーマ変更時のコールバック
 * @returns 監視を停止する関数
 */
export function watchOSTheme(callback?: (isDark: boolean) => void): () => void {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    callback?.(e.matches);
  };

  mq.addEventListener('change', handler);

  return () => {
    mq.removeEventListener('change', handler);
  };
}

export const getTheme = (theme: Theme) => {
  switch (theme) {
    case 'os':
      // OS設定を初期値に
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      return mq.matches ? darkTheme : lightTheme;
    case 'light':
      return lightTheme;
    case 'dark':
      return darkTheme;
    case 'dark-gy-flip':
      return darkThemeGYFlip;
    case 'black':
      return blackTheme;
  }
};
