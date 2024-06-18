module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'next/core-web-vitals',
    'standard',
    'next',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
      modules: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    'init-declarations': ['error', 'always'],
    'no-unused-vars': ['error', { args: 'all' }],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/no-unused-state': 'error',
    'no-confusing-arrow': [
      'error',
      { allowParens: true, onlyOneSimpleParam: false },
    ],
    'react/no-array-index-key': 'error',
    semi: ['error', 'never'],
    'jsx-a11y/anchor-is-valid': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  globals: {
    JSX: true,
  },
}
