import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";

export default {
  entry: "app/app.js",
  format: "cjs",
  plugins: [
    babel({
      exclude: "node_modules/**", // only transpile our source code
    }),
    json(),
    resolve({
      jsnext: true,
      main: true,
      preferBuiltins: true,
    }),
    commonjs({
      exclude: [
        "node_modules/statuses/**",
        "node_modules/mime/**",
        "node_modules/mime-db/**",
        "node_modules/iconv-lite/**",
        "node_modules/moment-timezone/**",
        "node_modules/math-interval-parser/**",
      ],

      extensions: [".js", ".json"], // Default: [ '.js' ]
    }),
  ],
  dest: "dist/index.js",
};
