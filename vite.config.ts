import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 3006,
    allowedHosts: ["homeseek.mywarning.top"], // 👈 aqui adiciona seu domínio
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  base: "/imovelcenter",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

