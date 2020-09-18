module.exports = {
  extends: '@studiometa/eslint-config',
  globals: {
    window: false,
    document: false,
    requestAnimationFrame: false,
    IntersectionObserver: false,
    Image: false,
    KeyboardEvent: false,
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_events',
          '_excludeFromAutoBind',
          '__base__',
          '__isChild__',
          '__isBase__',
          '__isAsync__',
          '__isTransitioning__',
          '__transitionEndHandler__',
        ],
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        vue: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: [['~', './src']],
      node: {
        extensions: ['.ts', '.js', '.vue', '.mjs', '.jsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/spec.js', 'tests/**/*.js'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'max-classes-per-file': 'off',
        'jest/no-test-callback': 'off',
        'require-jsdoc': 'off',
      },
    },
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
};
