# Yoga Studio Website

ヨガスタジオのウェブサイトプロジェクトです。

## 📁 プロジェクト構成

```
YogaSite/
├── index.html              # メインHTMLファイル
├── css/
│   ├── reset.css           # リセットCSS
│   ├── common.css          # 共通スタイル（変数、ユーティリティ）
│   └── style.css           # メインスタイルシート
├── js/
│   ├── main.js             # メインJavaScript
│   ├── smooth-scroll.js    # スムーススクロール機能
│   ├── modal.js            # モーダル・ドロワーメニュー機能
│   └── image-placeholder.js # 画像プレースホルダー・キャッシング
├── images/                 # 画像ファイル用ディレクトリ
├── docs/                   # ドキュメント
│   └── IMAGE_UTILITIES.md  # 画像ユーティリティガイド
├── README.md               # このファイル
├── CHANGELOG.md            # 変更履歴
├── STYLE_GUIDE.md          # スタイルガイド
└── CHECKLIST.md            # プロジェクトチェックリスト
```

## 🚀 セットアップ

### 0. ローカルサーバーの起動

このサイトを正しく表示するには、ローカルサーバーが必要です：

**方法1: VS Code Live Server拡張機能**
1. VS Codeで`index.html`を開く
2. 右クリック → "Open with Live Server"

**方法2: Pythonの簡易サーバー**
```bash
# Python 3の場合
python -m http.server 8000

# Python 2の場合
python -m SimpleHTTPServer 8000
```

**方法3: Node.jsのhttp-server**
```bash
npx http-server -p 8000
```

その後、ブラウザで `http://localhost:8000` にアクセスしてください。

### 1. 画像の配置

`images/` ディレクトリに画像を配置してください。

**✅ 現在の状態:**
8枚の画像（`yoga1.jpeg` ~ `yoga8.jpg`）が配置済みです。

**📍 画像の使用箇所:**
- ヒーローセクション: `yoga1.jpeg`, `yoga2.jpeg`
- パララックス: `yoga3.jpeg`
- レッスン: `yoga4.jpg` ~ `yoga7.jpg`
- インストラクター: `yoga8.jpg`, `yoga1.jpeg`, `yoga2.jpeg`
- ブログ: `yoga3.jpeg`, `yoga4.jpg`, `yoga5.jpg`

詳細は [IMAGE_MAPPING.md](IMAGE_MAPPING.md) をご覧ください。

**画像を追加・変更する場合:**
1. `images/` フォルダに新しい画像を追加
2. `index.html` で該当箇所の `src` 属性を変更
3. または既存のファイル名で上書き保存

**推奨画像サイズ:**
- ヒーロー: 600×800px
- パララックス: 1920×600px
- レッスン: 800×600px
- インストラクター: 400×400px
- ブログ: 800×450px

### 2. 外部ライブラリ

より良い体験のために、以下のライブラリを使用しています：

#### Lenis（スムーススクロール）
既に`index.html`に含まれています。

#### Splide（スライダー）
既に`index.html`に含まれています。

**注意**: これらのライブラリはCDN経由で読み込まれるため、インターネット接続が必要です。

### 3. Google Analytics の設定

`index.html` の以下の部分を実際のトラッキングIDに変更してください：

```javascript
gtag('config', 'G-XXXXXXXXXX'); // ← ここを変更
```

### 4. reCAPTCHA の設定

フォームのreCAPTCHAを有効にするには：

1. [Google reCAPTCHA](https://www.google.com/recaptcha/)でサイトキーを取得
2. `index.html`の以下の部分を変更：

```html
<div class="g-recaptcha" data-sitekey="your_site_key"></div>
```

## 🎨 デザインの特徴

### 洗練されたアニメーション
- スムーズなページトランジション
- ホバーエフェクトによるインタラクティブな体験
- スクロールトリガーアニメーション
- グラデーション背景とシャドウ効果

### モダンなUI/UX
- グラスモーフィズムデザイン（ヘッダー）
- カスタムスクロールバー
- レスポンシブグリッドレイアウト
- アクセシブルなカラーコントラスト
- タッチフレンドリーなボタンサイズ

### パフォーマンス最適化
- CSS変数による効率的なスタイル管理
- ハードウェアアクセラレーション（will-change）
- 画像の遅延読み込み
- 最適化されたアニメーション（cubic-bezier）

## 🎨 カスタマイズ

### カラーテーマの変更

`css/common.css` の CSS変数を変更してください：

```css
:root {
  --color-primary: #5a7d6b;      /* メインカラー */
  --color-secondary: #8fa998;    /* サブカラー */
  --color-accent: #c9a97f;       /* アクセントカラー */
  /* その他の変数... */
}
```

### フォントの変更

Google Fontsを使用する場合は、`<head>`セクションにフォントリンクを追加し、`css/common.css`の`body`フォントファミリーを変更してください。

### セクションの追加・削除

`index.html`で必要なセクションを追加・削除できます。各セクションは独立しているため、自由に編集可能です。

## 📱 レスポンシブデザイン

以下のブレークポイントで最適化されています：
- デスクトップ: 1200px以上
- タブレット: 768px - 1199px
- モバイル: 767px以下

## 🔧 機能

### 実装済みの機能
- ✅ レスポンシブデザイン
- ✅ スムーススクロール（Lenis）
- ✅ ハンバーガーメニュー（ドロワー）
- ✅ インストラクターモーダル
- ✅ スライダー（インストラクター紹介）
- ✅ パララックス効果
- ✅ イントロアニメーション
- ✅ フォームバリデーション
- ✅ スクロール進捗バー
- ✅ スクロールに応じたヘッダー表示/非表示
- ✅ Intersection Observerによるアニメーション
- ✅ グラデーション背景とホバーエフェクト
- ✅ カスタムスクロールバー
- ✅ プリント対応スタイル
- ✅ アクセシビリティ対応
- ✅ パフォーマンス最適化（遅延読み込み）
- ✅ 画像プレースホルダー自動生成
- ✅ シンプルな画像キャッシング
- ✅ 画像プリロード機能

## 📝 フォーム送信

現在、フォームはデモモードで動作しています。実際の送信機能を実装するには：

1. バックエンドAPIを用意
2. `js/main.js`のフォーム送信部分を修正
3. エンドポイントURLを設定

## 🌐 ブラウザサポート

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📄 ライセンス

このプロジェクトは個人利用・商用利用ともに自由にご使用いただけます。

## 📚 ドキュメント

- [README.md](README.md) - プロジェクト概要とセットアップ
- [CHANGELOG.md](CHANGELOG.md) - 変更履歴
- [STYLE_GUIDE.md](STYLE_GUIDE.md) - スタイルガイド
- [ANIMATION_GUIDE.md](ANIMATION_GUIDE.md) - アニメーション & エフェクトガイド
- [CHECKLIST.md](CHECKLIST.md) - プロジェクトチェックリスト
- [IMAGE_UTILITIES.md](docs/IMAGE_UTILITIES.md) - 画像ユーティリティガイド
- [IMAGE_MAPPING.md](IMAGE_MAPPING.md) - 画像配置マップ

## 🙏 使用ライブラリ

- [Splide](https://splidejs.com/) - スライダー
- [Lenis](https://github.com/studio-freight/lenis) - スムーススクロール
- [Google reCAPTCHA](https://www.google.com/recaptcha/) - スパム対策

## 💡 今後の改善案

- [ ] ブログ機能の実装
- [ ] スケジュール表示機能
- [ ] オンライン予約システムの統合
- [ ] 多言語対応
- [ ] ダークモード対応
- [ ] PWA化

## 📞 お問い合わせ

ご質問やご要望がございましたら、お気軽にお問い合わせください。

---

**作成日**: 2025年11月26日  
**最終更新**: 2025年11月27日  
**バージョン**: 2.1.0 - Dynamic & Creative Edition

