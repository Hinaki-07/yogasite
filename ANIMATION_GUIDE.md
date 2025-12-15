# アニメーション & エフェクトガイド

## 🎨 実装された動的エフェクト

### 1. **ヒーローセクション (KV)**

#### 画像の形状変形
- **左側の画像**: 上部が丸い形状 `border-radius: 200px 200px 20px 20px`
- **右側の画像**: 下部が丸い形状 `border-radius: 20px 20px 200px 200px`

#### フロートアニメーション
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```
- 6秒周期でゆっくり上下に浮遊
- 左右の画像で3秒ずつずらして配置

#### ホバーエフェクト
- 上に10px浮き上がる
- 2度回転
- 画像は逆方向に2度回転しながら1.1倍拡大

#### 動的背景要素
- 400px × 400pxのゴールドグラデーション円
- 300px × 300pxのベージュグラデーション円
- 15秒/20秒周期で回転しながら移動

---

### 2. **レッスンカード**

#### 独特な形状 (clip-path)
- **カード1**: 右下が斜めカット `polygon(0 0, 100% 0, 100% 85%, 0 100%)`
- **カード2**: 左下が斜めカット `polygon(0 0, 100% 0, 100% 100%, 0 85%)`
- **カード3**: 左上が斜めカット `polygon(0 15%, 100% 0, 100% 100%, 0 100%)`
- **カード4**: 右上が斜めカット `polygon(0 0, 100% 15%, 100% 100%, 0 100%)`

#### ホバー時の変化
- 形状が長方形に戻る
- 画像が1.15倍拡大 + 2度回転
- 下部にゴールドグラデーションオーバーレイ

---

### 3. **パララックスセクション**

#### 斜めカット
```css
clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
```

#### パルスグローアニメーション
```css
@keyframes pulseGlow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```
- 8秒周期でゴールドグラデーションが脈打つ

#### 画像フィルター
- `brightness(0.85)` - 少し暗く
- `contrast(1.1)` - コントラスト強調
- オーバーレイブレンドモード

---

### 4. **インストラクター画像**

#### 円形画像のエフェクト
- 初期状態: 20%グレースケール
- ホバー時:
  - グレースケール解除
  - 1.15倍拡大
  - 5度回転

#### ゴールドボーダー
- グラデーションボーダー
- ホバー時に不透明度100%

---

### 5. **ブログカード**

#### 楕円形の切り抜き (clip-path)
- **カード1**: 上部楕円 `ellipse(100% 100% at 50% 0%)`
- **カード2**: 下部楕円 `ellipse(100% 100% at 50% 100%)`
- **カード3**: 左側楕円 `ellipse(100% 100% at 0% 50%)`

#### ホバーエフェクト
- 楕円が中心に移動
- 画像が1.2倍拡大
- 明度が1.05倍に
- ゴールドグラデーションオーバーレイ

---

### 6. **動的背景要素**

#### Aboutセクション
```css
@keyframes floatSlow {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(50px, 50px); }
}
```
- 20秒周期でゆっくり移動する円形グラデーション

#### レッスンセクション
```css
@keyframes morphShape {
  0%, 100% { border-radius: 50%; }
  33% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  66% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}
```
- 15秒周期で形状が変形
- 回転しながらスケール変化

---

### 7. **アイコンアニメーション**

#### 強みアイテムのアイコン
- ホバー時: 1.2倍拡大 + 10度回転
- ドロップシャドウが強調

#### インフォカードのアイコン
- ホバー時: 1.3倍拡大 + 上に10px浮上
- ドロップシャドウが強調

---

### 8. **テキストエフェクト**

#### 料金の価格
```css
background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
- グラデーションテキスト
- ホバー時に1.1倍拡大

#### ニュースカテゴリー
- グラデーション背景
- ホバー時に1.1倍拡大
- シャドウが強調

---

## 🎯 パフォーマンス最適化

### will-change プロパティ
```css
will-change: transform;
```
- パララックス画像に適用
- スムーズなアニメーション

### GPU アクセラレーション
- `transform` と `opacity` のみをアニメーション化
- `filter` は控えめに使用
- `clip-path` はホバー時のみ変化

---

## 🎨 アニメーションタイミング

| 要素 | 周期 | イージング |
|------|------|----------|
| KV画像フロート | 6秒 | ease-in-out |
| 動的背景（大） | 15秒 | ease-in-out |
| 動的背景（小） | 20秒 | ease-in-out |
| パルスグロー | 8秒 | ease-in-out |
| 形状変形 | 15秒 | ease-in-out |
| フロート回転 | 25秒 | ease-in-out |

---

## 🔧 カスタマイズ方法

### アニメーション速度の変更
```css
/* 遅くする */
animation: float 10s ease-in-out infinite;

/* 速くする */
animation: float 4s ease-in-out infinite;
```

### 形状の変更
```css
/* レッスンカードの形状 */
clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);

/* 他の形状例 */
clip-path: circle(50%);
clip-path: ellipse(50% 60%);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
```

### グラデーションの調整
```css
/* 色の変更 */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);

/* 角度の変更 */
background: linear-gradient(90deg, ...);  /* 横方向 */
background: linear-gradient(180deg, ...); /* 縦方向 */
```

---

## 📱 レスポンシブ対応

### モバイルでの調整
```css
@media (max-width: 768px) {
  /* アニメーションを簡略化 */
  .top-kv__image {
    animation: none; /* フロートを無効化 */
  }
  
  /* 形状を単純化 */
  .lesson-card__image {
    clip-path: none;
  }
}
```

### パフォーマンス優先モード
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 💡 Tips

### 1. **アニメーションの重ね合わせ**
複数のアニメーションを組み合わせることで、より複雑な動きを実現

### 2. **タイミングのずらし**
`animation-delay` を使って、要素ごとに開始タイミングをずらす

### 3. **イージング関数**
- `ease-in-out`: 自然な動き
- `cubic-bezier(0.4, 0, 0.2, 1)`: Material Design風
- `ease`: 標準的な動き

### 4. **パフォーマンス**
- アニメーションは3-5個まで
- 重いアニメーションは `will-change` を使用
- モバイルでは簡略化

---

**最終更新**: 2025年11月27日  
**バージョン**: 2.0.0 - Dynamic Edition

