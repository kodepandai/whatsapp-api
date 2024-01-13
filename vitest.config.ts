import {defineConfig} from "vitest/config"
export default defineConfig({
  test: {
    include: ["test/**/*.{test,spec}.ts"],
    reporters: "verbose",
    setupFiles: ["dotenv/config"],
  },
  base: "./src"
})
