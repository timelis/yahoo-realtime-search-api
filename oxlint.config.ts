import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";

export default defineConfig({
  env: { browser: false, serviceworker: true },
  extends: [core, antiSlop],
  ignorePatterns: core.ignorePatterns,
  options: { typeAware: true, typeCheck: true },
});
