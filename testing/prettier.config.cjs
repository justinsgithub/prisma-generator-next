/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 150,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  trailingComma: "all"
};
