# 画像ユーティリティガイド

## 概要

`image-placeholder.js`は、画像の読み込み、キャッシング、プレースホルダー生成を簡単に行うためのユーティリティです。

## 主な機能

### 1. 自動プレースホルダー生成

画像が見つからない場合、自動的に美しいSVGプレースホルダーを生成します。

**特徴:**
- ブランドカラーを使用したデザイン
- 画像のalt属性を表示
- 破線のボーダーで識別しやすい

### 2. 画像キャッシング

シンプルなLRU（Least Recently Used）キャッシュを実装しています。

**使用方法:**

```javascript
// キャッシュに画像を追加
window.imageCache.set('image-key', imageElement);

// キャッシュから画像を取得
const cachedImage = window.imageCache.get('image-key');

// キャッシュに存在するか確認
if (window.imageCache.has('image-key')) {
  // ...
}

// キャッシュをクリア
window.imageCache.clear();

// キャッシュサイズを確認
console.log(window.imageCache.size);
```

### 3. 画像プリロード

複数の画像を事前に読み込むことができます。

**使用方法:**

```javascript
// 単一画像のプリロード
window.preloadImages(['images/hero-1.jpg'])
  .then(() => {
    console.log('画像の読み込みが完了しました');
  });

// 複数画像のプリロード
const imagesToPreload = [
  'images/hero-1.jpg',
  'images/hero-2.jpg',
  'images/lesson-1.jpg',
  'images/lesson-2.jpg'
];

window.preloadImages(imagesToPreload)
  .then(() => {
    console.log('すべての画像の読み込みが完了しました');
  })
  .catch((failedUrls) => {
    console.error('一部の画像の読み込みに失敗しました:', failedUrls);
  });
```

### 4. カスタムプレースホルダー生成

独自のプレースホルダー画像を生成できます。

**使用方法:**

```javascript
// 基本的な使用方法
const placeholder = window.generatePlaceholder(800, 600, 'ヨガスタジオ');

// 画像要素に設定
const img = document.createElement('img');
img.src = placeholder;
document.body.appendChild(img);

// または既存の画像に設定
document.querySelector('#my-image').src = window.generatePlaceholder(1200, 630, 'OGP画像');
```

**パラメータ:**
- `width` (number): 画像の幅（デフォルト: 800）
- `height` (number): 画像の高さ（デフォルト: 600）
- `text` (string): 表示するテキスト（デフォルト: 'Placeholder'）

## 開発モード機能

ローカル環境（localhost または 127.0.0.1）で実行すると、以下の機能が有効になります:

### 1. 欠落画像の検出

コンソールに欠落している画像のリストを表示します。

```
📷 Missing Images
Found 3 missing image(s):
1. http://localhost:8000/images/hero-1.jpg
   Alt: "ヨガをする女性"
2. http://localhost:8000/images/hero-2.jpg
   Alt: "スタジオの様子"
3. http://localhost:8000/images/lesson-1.jpg
   Alt: "ハタヨガ"

💡 Tip: Add images to the /images folder or they will show placeholders.
```

### 2. 利用可能な関数の表示

コンソールに使用可能なユーティリティ関数を表示します。

```
🎨 Image Utilities Available
• generatePlaceholder(width, height, text) - Generate placeholder image
• preloadImages([urls]) - Preload multiple images
• imageCache - Simple image cache instance
```

## 自動機能

以下の機能は自動的に動作します:

### 1. エラーハンドリング

すべての画像要素に自動的にエラーハンドラーが設定され、読み込みに失敗した場合はプレースホルダーが表示されます。

### 2. フェードインアニメーション

画像が読み込まれると、自動的にフェードインアニメーションが適用されます。

### 3. 遅延読み込み最適化

`loading="lazy"`属性を持つ画像は、Intersection Observerを使用して最適化されます。

## 実装例

### ページ読み込み時に重要な画像をプリロード

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // ヒーローセクションの画像を優先的にプリロード
  window.preloadImages([
    'images/hero-1.jpg',
    'images/hero-2.jpg'
  ]).then(() => {
    console.log('ヒーロー画像の読み込みが完了しました');
  });
});
```

### スライダーの次の画像を先読み

```javascript
// Splideスライダーのイベントを利用
splide.on('moved', (newIndex) => {
  const nextIndex = (newIndex + 1) % totalSlides;
  const nextImageUrl = `images/instructor-${nextIndex + 1}.jpg`;
  
  if (!window.imageCache.has(nextImageUrl)) {
    window.preloadImages([nextImageUrl]);
  }
});
```

### 動的に画像を追加

```javascript
function addImageCard(imageUrl, title) {
  const card = document.createElement('div');
  card.className = 'image-card';
  
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = title;
  img.loading = 'lazy';
  
  // エラー時のプレースホルダーは自動的に設定されます
  
  card.appendChild(img);
  document.querySelector('.image-grid').appendChild(card);
}
```

## パフォーマンスのヒント

### 1. キャッシュサイズの調整

デフォルトのキャッシュサイズは50画像です。必要に応じて調整できます:

```javascript
// カスタムキャッシュサイズで新しいインスタンスを作成
window.imageCache = new SimpleImageCache(100); // 100画像まで
```

### 2. 重要な画像の優先読み込み

Above the fold（最初に表示される領域）の画像は、`loading="eager"`を使用して優先的に読み込みます:

```html
<img src="images/hero-1.jpg" alt="ヨガをする女性" loading="eager">
```

### 3. 遅延読み込みの活用

スクロールしないと見えない画像には`loading="lazy"`を使用します:

```html
<img src="images/lesson-1.jpg" alt="ハタヨガ" loading="lazy">
```

## トラブルシューティング

### プレースホルダーが表示されない

1. `image-placeholder.js`が正しく読み込まれているか確認
2. コンソールにエラーが表示されていないか確認
3. 画像のパスが正しいか確認

### キャッシュが機能しない

1. ブラウザのコンソールで`window.imageCache`が定義されているか確認
2. プライベートブラウジングモードを使用していないか確認

### パフォーマンスの問題

1. キャッシュサイズを調整
2. プリロードする画像の数を減らす
3. 画像を最適化（WebP形式、圧縮など）

## ブラウザサポート

- Chrome (最新版) ✅
- Firefox (最新版) ✅
- Safari (最新版) ✅
- Edge (最新版) ✅

**注意**: Intersection Observerをサポートしていない古いブラウザでは、一部の機能が制限されます。

## まとめ

この画像ユーティリティを使用することで:

- ✅ 画像の読み込みエラーを優雅に処理
- ✅ パフォーマンスを向上
- ✅ 開発体験を改善
- ✅ ユーザー体験を向上

画像がない状態でも、サイトのデザインを確認できるようになります！

