import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsPaths()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
