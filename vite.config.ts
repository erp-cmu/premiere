import path from "path"; // 1. Import path

import { config } from "process";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  resolve: {
    alias: {
      // Define alias mapping
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
  server: {
    // allowedHosts: [".loclx.io"],
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "api"),
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("proxying request to:", proxyReq.path);
          });
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
        },
      },
      "/socket.io": {
        target: "http://localhost:9000",
        ws: true,
        rewriteWsOrigin: true,
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("proxying request to:", proxyReq.path);
          });
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
        },
      },
    },
  },
});
