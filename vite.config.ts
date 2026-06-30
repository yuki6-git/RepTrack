import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              test: /node_modules\/react/,
              name: "react",
            },
            {
              test: /node_modules\/react-dom/,
              name: "react-dom",
            },
            {
              test: /node_modules\/recharts/,
              name: "charts",
            },
            {
              test: /node_modules\/@chakra-ui|node_modules\/@emotion|node_modules\/next-themes/,
              name: "chakra",
            },
          ],
        },
      },
    },
  },
});
