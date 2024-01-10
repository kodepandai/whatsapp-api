import { defineConfig } from "tsup";
export default defineConfig([
  {
    entry: ["./src/*.ts"],
    format: ["cjs", "esm"],
    target: "es2022",
    minify: true,
    clean: true
  },
  {
    entry: ["./src/*.ts"],
    format: ["esm"],
    target: "es2022",
    dts: {
      only: true
    }
  }
]);
