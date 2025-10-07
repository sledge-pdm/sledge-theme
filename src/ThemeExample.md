# Theme System Usage Examples

新しいテーマシステムの使用例です。

## 基本的な使い方

### ビルトインテーマの適用

```typescript
import { applyTheme, applyBuiltinTheme } from '@sledge/theme';

// ビルトインテーマを適用
applyBuiltinTheme('dark');
applyBuiltinTheme('light');
applyBuiltinTheme('black');
applyBuiltinTheme('dark-gy-flip');

// OSテーマに従う
applyBuiltinTheme('os');

// 統一APIでも可能
applyTheme('dark');
```

### ユーザー定義テーマの適用

```typescript
import { applyTheme, applyUserTheme } from '@sledge/theme';

// CSS文字列でカスタムテーマを定義
const customTheme = `
:root {
  --color-background: #ff0000;
  --color-controls: #ff3333;
  --color-surface: #ff6666;
  --color-accent: #00ffff;
}
`;

// ユーザーテーマを適用
applyUserTheme(customTheme);

// または統一APIで
applyTheme({ name: 'Red Theme', css: customTheme });
```

### OSテーマ変更の監視

```typescript
import { watchOSTheme, applyBuiltinTheme } from '@sledge/theme';

// OSテーマ変更を自動で反映
const stopWatching = watchOSTheme((isDark) => {
  if (getCurrentThemeSetting() === 'os') {
    applyBuiltinTheme('os');
  }
});

// 監視停止
stopWatching();
```

## アプリケーションでの実装例

```typescript
// stores/ThemeStore.ts
import { createSignal } from 'solid-js';
import { applyTheme, watchOSTheme, type Theme, type UserTheme } from '@sledge/theme';

type ThemeSetting = Theme | 'custom';
type CurrentTheme = Theme | UserTheme;

class ThemeStore {
  private [setting, setSetting] = createSignal<ThemeSetting>('os');
  private [customTheme, setCustomTheme] = createSignal<UserTheme | null>(null);
  private stopOSWatch: (() => void) | null = null;

  constructor() {
    // 初期テーマを適用
    this.applyCurrentTheme();
    
    // OSテーマ変更監視を開始
    this.startOSThemeWatching();
  }

  // テーマ設定を変更
  changeSetting(newSetting: ThemeSetting, customTheme?: UserTheme) {
    this.setSetting(newSetting);
    
    if (newSetting === 'custom' && customTheme) {
      this.setCustomTheme(customTheme);
    }
    
    this.applyCurrentTheme();
  }

  // 現在のテーマを適用
  private applyCurrentTheme() {
    const currentSetting = this.setting();
    
    if (currentSetting === 'custom') {
      const custom = this.customTheme();
      if (custom) {
        applyTheme(custom);
      }
    } else {
      applyTheme(currentSetting);
    }
  }

  // OSテーマ監視を開始
  private startOSThemeWatching() {
    this.stopOSWatch = watchOSTheme(() => {
      if (this.setting() === 'os') {
        this.applyCurrentTheme();
      }
    });
  }

  // クリーンアップ
  dispose() {
    this.stopOSWatch?.();
  }
}

export const themeStore = new ThemeStore();
```

## CSS変数の直接操作

```typescript
import { setCSSProperty, getCSSProperty } from '@sledge/theme';

// CSS変数を個別に設定
setCSSProperty('--color-accent', '#ff0000');

// CSS変数を取得
const currentAccent = getCSSProperty('--color-accent');
```

## システムの特徴

### 利点

1. **パフォーマンス**: ビルトインテーマはCSS変数の変更のみで高速
2. **シンプルさ**: 統一されたAPIで簡単に使える
3. **柔軟性**: ユーザー定義テーマも完全サポート
4. **カプセル化**: ビルトインテーマの定義は@sledge/theme内に完結
5. **後方互換性**: 既存のコードも徐々に移行可能

### 実装のポイント

- ビルトインテーマは直接CSS変数を操作するため高速
- ユーザーテーマはCSSStyleSheet APIを使用して動的に注入
- OSテーマ変更の監視機能付き
- 既存のCSSファイルは読み込み専用として残存可能
