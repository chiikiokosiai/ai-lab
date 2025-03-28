// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pagesにデプロイする場合は、baseをリポジトリ名に設定
export default defineConfig({
  plugins: [react()],
  base: "/ai-lab/",
});
