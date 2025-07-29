import { defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  base: '/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["26cc2fe1-8614-4c9b-b9f1-7ec1d5eedac6-00-1blq4erc0soru.sisko.replit.dev"]
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  }
});
