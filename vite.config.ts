import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pagesにデプロイする場合は、baseを設定する
// 独自ドメインを使う場合は、'/'に設定する
// リポジトリ名を使う場合は、'/リポジトリ名/'に設定する
export default defineConfig({
  plugins: [react()],
  base: "/",
});
