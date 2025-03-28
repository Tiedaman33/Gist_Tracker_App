import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals"), 
  {
    rules: {
      // Custom rules
      "react/react-in-jsx-scope": "off", 
      "no-unused-vars": "warn", 
      "prettier/prettier": "error", 
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"], 
    },
    settings: {
      react: {
        version: "detect", // detect react version
      },
    },
    env: {
      browser: true, 
      node: true, 
      es2021: true,
    },
  },
];
