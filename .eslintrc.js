module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  globals: {
    React: true,
    ReactDOM: true,
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
    'import/no-unresolved': [2, { ignore: ['^components', '^Redx'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
