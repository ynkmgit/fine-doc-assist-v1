# Mermaidダイアグラムスタイリングガイド

## 概要
このドキュメントでは、Mermaidダイアグラムのカスタムスタイリング方法について説明します。

## SVG要素の特定方法

### 1. 基本的なセレクタ構造
Mermaidダイアグラムは以下のような階層構造でレンダリングされます：

```html
.mermaid-diagram
  └── svg
      └── g (グループ要素)
          ├── g.node (ノード)
          │   └── rect (図形)
          └── g.edgePath (エッジ/線)
              └── path
```

### 2. 要素の特定方法

#### ノードの種類別セレクタ
```css
/* 開始ノード（最初の四角形） */
.mermaid-diagram g.node:first-of-type rect

/* 終了ノード（最後の四角形） */
.mermaid-diagram g.node:last-of-type rect

/* 処理ノード（中間の四角形） */
.mermaid-diagram g.node:not(:first-of-type):not(:last-of-type) rect

/* 条件分岐（ひし形） */
.mermaid-diagram g.node.rhombus rect
```

## スタイリング例

### 1. コンテナのスタイリング
```css
.mermaid-diagram {
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow-x: auto;
}
```

### 2. 各ノードのスタイリング
```css
/* 開始ノード */
.mermaid-diagram g.node:first-of-type rect {
  fill: #e3f2fd !important;  /* 背景色 */
  stroke: #1e88e5 !important;  /* 枠線の色 */
  stroke-width: 2px !important;  /* 枠線の太さ */
}

/* 開始ノードのサイズと形状カスタマイズ */
.mermaid-diagram g.node:first-of-type rect {
  width: 120px !important;     /* 幅を指定 */
  height: 60px !important;     /* 高さを指定 */
  x: -60px !important;        /* 中心位置調整（width の半分のマイナス値） */
  y: -30px !important;        /* 中心位置調整（height の半分のマイナス値） */
  rx: 10px !important;        /* 角の丸み */
  ry: 10px !important;        /* 角の丸み */
}

/* 条件分岐ノード */
.mermaid-diagram g.node.rhombus rect {
  fill: #e8f5e9 !important;
  stroke: #43a047 !important;
  stroke-width: 2px !important;
}
```

### 3. エッジ（線）のスタイリング
```css
.mermaid-diagram .edgePath .path {
  stroke: #78909c !important;
  stroke-width: 2px !important;
}
```

### 4. ラベルのスタイリング
```css
/* Yes/Noなどのエッジラベル */
.mermaid-diagram .edgeLabel {
  background-color: #ffffff !important;
  padding: 2px 4px !important;
  border-radius: 4px !important;
  font-weight: bold !important;
  color: #546e7a !important;
}

/* ノード内のテキスト */
.mermaid-diagram .label {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 14px !important;
  color: #37474f !important;
}

/* 特定のノードのテキストサイズ変更 */
.mermaid-diagram g.node:first-of-type .label {
  font-size: 16px !important;  /* テキストサイズを大きく */
}
```

## 図形のサイズと形状のカスタマイズ

### サイズ調整のポイント
1. **基本的な属性**
   - width: 図形の幅
   - height: 図形の高さ
   - x: 水平位置（中心からの距離）
   - y: 垂直位置（中心からの距離）
   - rx/ry: 角の丸みの半径

2. **中心位置の調整**
   - x値は通常、width値の半分のマイナス値を設定
   - y値は通常、height値の半分のマイナス値を設定

3. **注意点**
   - 必ず`!important`を付ける
   - サイズ変更時はテキストの位置やサイズも調整が必要な場合がある
   - 大きすぎるサイズは他のノードとの位置関係に影響する可能性がある

### サイズ調整の例
```css
/* 大きな開始ノード */
.mermaid-diagram g.node:first-of-type rect {
  width: 150px !important;
  height: 80px !important;
  x: -75px !important;
  y: -40px !important;
  rx: 15px !important;
  ry: 15px !important;
}

/* コンパクトな処理ノード */
.mermaid-diagram g.node:not(:first-of-type):not(:last-of-type) rect {
  width: 100px !important;
  height: 40px !important;
  x: -50px !important;
  y: -20px !important;
}
```

## 重要な注意点

1. **!important の使用**
   - Mermaidの内部スタイルを上書きするために必要です
   - 各スタイル宣言に `!important` を付加してください

2. **SVGのレスポンシブ対応**
```css
.mermaid-diagram svg {
  max-width: 100%;
  height: auto !important;
}
```

3. **モバイル対応**
```css
@media (max-width: 768px) {
  .mermaid-diagram {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .mermaid-diagram .label {
    font-size: 12px !important;
  }
}
```

## デバッグのヒント

1. ブラウザの開発者ツールを使用してSVG要素の構造を確認する
2. スタイルが適用されない場合は、セレクタの詳細度とimportantの使用を確認
3. キャッシュのクリアや開発サーバーの再起動を試す
4. サイズ変更時は中心位置（x/y）の調整を忘れずに

## カラーパレット例

```css
/* 基本カラー */
--node-start: #e3f2fd;
--node-end: #f5f5f5;
--node-process: #ffffff;
--node-condition: #e8f5e9;

/* 枠線カラー */
--border-start: #1e88e5;
--border-end: #616161;
--border-process: #2196f3;
--border-condition: #43a047;

/* テキストカラー */
--text-primary: #37474f;
--text-secondary: #546e7a;
```

これらの色は、アプリケーションの全体的なデザインシステムに合わせて調整してください。
