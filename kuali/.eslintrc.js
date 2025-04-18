// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        endOfLine: 'auto',
        singleQuote: true,
        jsxSingleQuote: true,
      },
    ],
  },
}
