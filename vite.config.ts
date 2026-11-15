import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Runs the server code in worker/ alongside the page during `npm run dev`
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
});
