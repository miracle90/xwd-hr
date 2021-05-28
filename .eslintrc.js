module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-tabs': 'off',
    'indent': [1, 'tab', {
      'SwitchCase': 1
    }],
    'space-before-function-paren': 0,
    'Unexpected-trailing-comma': 0,
    'comma-dangle': 0,
    'camelcase': 0
  }
}
