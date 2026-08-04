module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'docs', 'node_modules', '.eslintrc.cjs', 'public/sw.js'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  globals: {
    // Browser APIs ESLint doesn't know about out of the box
    BarcodeDetector: 'readonly',
  },
  rules: {
    'react/prop-types': 'off',
    // Cosmetic: unescaped quotes in JSX text render fine, don't fail the build on them
    'react/no-unescaped-entities': 'off',
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-useless-catch': 'warn',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
