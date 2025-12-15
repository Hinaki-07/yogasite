# スタイルガイド (Style Guide)

## 🎨 カラーパレット

### メインカラー
```css
--color-primary: #5a7d6b;      /* 深緑 - メインブランドカラー */
--color-secondary: #8fa998;    /* ライトグリーン - サブカラー */
--color-accent: #c9a97f;       /* ベージュゴールド - アクセント */
```

### テキストカラー
```css
--color-text: #333333;         /* メインテキスト */
--color-text-light: #666666;   /* サブテキスト */
```

### 背景カラー
```css
--color-bg: #ffffff;           /* メイン背景 */
--color-bg-light: #f8f8f8;     /* ライト背景 */
--color-bg-dark: #2c2c2c;      /* ダーク背景（フッター） */
--color-border: #e0e0e0;       /* ボーダー */
```

## 📏 スペーシング

```css
--spacing-xs: 0.5rem;    /* 8px */
--spacing-sm: 1rem;      /* 16px */
--spacing-md: 2rem;      /* 32px */
--spacing-lg: 3rem;      /* 48px */
--spacing-xl: 4rem;      /* 64px */
--spacing-xxl: 6rem;     /* 96px */
```

## 🔤 タイポグラフィ

### フォントサイズ
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */
--font-size-5xl: 3rem;      /* 48px */
```

### フォントウェイト
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
```

### 行間
```css
--line-height-tight: 1.2;
--line-height-normal: 1.6;
--line-height-loose: 1.8;
```

## 🎭 アニメーション

### トランジション
```css
--transition-base: 0.3s ease;
--transition-fast: 0.15s ease;
--transition-slow: 0.5s ease;
```

### カスタムイージング
多くのアニメーションで使用されているcubic-bezier:
```css
cubic-bezier(0.4, 0, 0.2, 1)  /* Material Design標準 */
```

### 主要なアニメーション

#### フェードイン・アップ
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### パルス（固定ボタン用）
```css
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 8px 20px -5px rgba(90, 125, 107, 0.4);
  }
  50% {
    box-shadow: 0 8px 30px -5px rgba(90, 125, 107, 0.6);
  }
}
```

## 🔘 ボタンスタイル

### プライマリボタン
```css
background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
border-radius: var(--radius-full);
padding: var(--spacing-sm) calc(var(--spacing-md) * 1.5);
box-shadow: 0 4px 12px -3px rgba(90, 125, 107, 0.3);
```

### ホバー状態
```css
transform: translateY(-3px);
box-shadow: 0 6px 18px -3px rgba(90, 125, 107, 0.4);
```

## 📦 カードコンポーネント

### 基本スタイル
```css
background-color: var(--color-bg);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-md);
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### ホバー状態
```css
transform: translateY(-8px);
box-shadow: 0 20px 40px -10px rgba(90, 125, 107, 0.2);
```

## 🎯 シャドウ

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### カスタムシャドウ（ブランドカラー）
```css
/* プライマリカラー */
box-shadow: 0 20px 40px -10px rgba(90, 125, 107, 0.2);

/* アクセントカラー */
box-shadow: 0 20px 40px -10px rgba(201, 169, 127, 0.3);
```

## 🔲 ボーダーラジウス

```css
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 1rem;       /* 16px */
--radius-full: 9999px;   /* 完全な円形 */
```

## 📱 レスポンシブブレークポイント

```css
/* モバイル */
@media (max-width: 568px) { }

/* タブレット */
@media (max-width: 768px) { }

/* デスクトップ（小） */
@media (max-width: 968px) { }

/* デスクトップ（中） */
@media (max-width: 1024px) { }
```

## 🎨 特殊効果

### グラスモーフィズム（ヘッダー）
```css
background-color: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

### グラデーションオーバーレイ
```css
background: linear-gradient(135deg, 
  var(--color-secondary) 0%, 
  var(--color-primary) 100%);
```

### パララックス効果
```css
will-change: transform;
transform: translateY(${yPos}px);
```

## 🎯 ベストプラクティス

### 1. パフォーマンス
- `will-change`を使用してアニメーションを最適化
- `transform`と`opacity`のみをアニメーション化
- 不要な`box-shadow`の変更を避ける

### 2. アクセシビリティ
- 十分なカラーコントラストを確保
- フォーカス状態を明確に表示
- `prefers-reduced-motion`に対応

### 3. レスポンシブデザイン
- モバイルファーストアプローチ
- タッチターゲットは最低44×44px
- フォントサイズはビューポートに応じて調整

### 4. コードの整理
- CSS変数を活用
- コンポーネントベースの構造
- 明確なコメントとセクション分け

## 🔍 使用例

### セクションタイトル
```html
<h2 class="section-title">タイトル</h2>
```

### プライマリボタン
```html
<button class="button">ボタン</button>
```

### カード
```html
<div class="lesson-card">
  <div class="lesson-card__image">
    <img src="..." alt="...">
  </div>
  <h3 class="lesson-card__title">タイトル</h3>
  <p class="lesson-card__description">説明文</p>
</div>
```

### グリッドレイアウト
```html
<div class="lesson-grid">
  <!-- カードコンポーネント -->
</div>
```

---

**注意**: このスタイルガイドは、プロジェクトの一貫性を保つための参考資料です。新しいコンポーネントを追加する際は、既存のパターンに従ってください。

