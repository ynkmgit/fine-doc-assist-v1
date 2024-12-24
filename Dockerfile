FROM node:20-alpine

WORKDIR /app

# 基本的なLinuxツールとgitのインストール
RUN apk add --no-cache git python3 make g++ chromium \
  # マーメイド図のレンダリングに必要なフォントとライブラリ
  ttf-dejavu fontconfig

# 環境変数の設定
ENV CHROME_BIN=/usr/bin/chromium-browser \
  CHROME_PATH=/usr/lib/chromium/ \
  # マーメイド図のレンダリング設定
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# パッケージファイルのコピーと依存関係のインストール
COPY package.json package-lock.json* ./
RUN npm install

# ソースコードのコピー
COPY . .

# Viteの開発サーバーポートを公開
EXPOSE 5173

# 開発サーバーの起動
CMD ["npm", "run", "dev"]