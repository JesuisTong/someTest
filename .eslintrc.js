module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    mocha: true,
  },
  globals: {
    $: true,
    TZ: true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': [2, { 'ignore': ['^components', '^Redx'] }],
    'import/no-extraneous-dependencies': 0,
    'no-underscore-dangle': ["error", { "allowAfterThis": true }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  },
};
