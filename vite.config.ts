import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Runs the server code in worker/ alongside the page during `npm run dev`
import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  server: {
    // Always http://localhost:5173. The browser keeps saved pins separately
    // for each address (port included), so if this port is busy, stop with a
    // message rather than moving to another port where the pins seem missing.
    port: 5173,
    strictPort: true,
  },
});
