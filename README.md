# @sledge/theme - CSS Migration

このパッケージは、vanilla-extractからecsstaticへの移行準備として、CSS Custom Properties（CSS変数）を使ったテーマシステムに変換されています。

## 現在の状態

- ✅ フォント定義をCSSに変換済み
- ✅ テーマ色定義をCSS変数に変換済み
- ✅ グローバルスタイルをCSSに変換済み
- ✅ 動的テーマ読み込み機能を追加
- ✅ TypeScript型定義を維持

## ファイル構造

```
src/
├── fonts.css              # フォントface定義（CSS形式）
├── global.css             # グローバルスタイル（CSS形式）
├── builtin/               # テーマ定義（CSS変数）
│   ├── light.css
│   ├── dark.css
│   ├── dark-gyflip.css
│   └── black.css
├── ThemeLoader.ts         # 動的テーマ読み込み
├── FontConstants.ts       # フォント定数
├── CSSVariables.ts        # CSS変数ヘルパー
└── Theme.ts              # 後方互換性（非推奨）
```

## 使用方法

### 1. テーマの動的読み込み

```typescript
import { loadTheme, ThemeName } from '@sledge/theme';

// テーマを読み込み
await loadTheme('dark');

// OS設定に従う
await loadTheme('os');
```

### 2. CSS変数の使用

```css
/* CSSでの使用 */
.my-component {
  background-color: var(--color-background);
  color: var(--color-on-background);
  border: 1px solid var(--color-border);
}
```

```typescript
// TypeScriptでの使用
import { cssVar, getCSSProperty } from '@sledge/theme';

const backgroundColor = cssVar('color-background');
const currentAccent = getCSSProperty('color-accent');
```

### 3. フォントの使用

```css
/* CSSでの使用 */
.text {
  font-family: var(--font-body);
  /* または直接指定 */
  font-family: 'ZFB08', 'k12x8', monospace;
}
```

```typescript
// TypeScriptでの使用
import { FONTS, BODY_FONT_STACK } from '@sledge/theme';

const fontFamily = FONTS.ZFB08;
const bodyFont = BODY_FONT_STACK;
```

## 移行ガイド

### vanilla-extractから移行する場合

```typescript
// 旧（vanilla-extract）
import { vars } from '@sledge/theme';
const style = {
  backgroundColor: vars.color.background
};

// 新（CSS変数）
const style = {
  backgroundColor: 'var(--color-background)'
};
```

### テーマ切り替えの移行

```typescript
// 旧（vanilla-extract）
import { lightTheme, darkTheme } from '@sledge/theme';
document.body.className = isDark ? darkTheme : lightTheme;

// 新（CSS読み込み）
import { loadTheme } from '@sledge/theme';
await loadTheme(isDark ? 'dark' : 'light');
```
