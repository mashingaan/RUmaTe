module.exports = {
  root: true,
  extends: ['expo', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    jest: true
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {}
    }
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-hooks/exhaustive-deps': 'warn'
  }
};
