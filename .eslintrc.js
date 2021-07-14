module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules:  {
    'react/jsx-filename-extension': [2, { 'extensions': ['.jsx', '.tsx'] }],
    // must disable the base no-use-before-define rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // tsc doesn't like file extensions on imports
    'import/extensions': 'off'
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js','.jsx', '.ts', '.tsx']
       }
    }
  }
};
