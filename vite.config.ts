import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Read package.json to get homepage field
const getBasePath = () => {
  try {
    const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
    if (pkg.homepage) {
      const url = new URL(pkg.homepage);
      let pathname = url.pathname;
      // Ensure trailing slash for Vite base
      if (!pathname.endsWith('/')) pathname += '/';
      return pathname;
    }
  } catch (error) {
    console.warn('Could not read homepage from package.json');
  }
  return '/';
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: getBasePath(),
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
