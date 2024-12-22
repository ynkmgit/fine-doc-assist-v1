FROM node:20-alpine

WORKDIR /app

# 基本的なLinuxツールとgitのインストール
RUN apk add --no-cache git

# パッケージファイルのコピーと依存関係のインストール
COPY package.json package-lock.json* ./
RUN npm install

# ソースコードのコピー
COPY . .

# Viteの開発サーバーポートを公開
EXPOSE 5173

# 開発サーバーの起動
CMD ["npm", "run", "dev"]