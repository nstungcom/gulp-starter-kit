module.exports = {
  root: true,
  env: {
    browser: true
  },
  plugins: ['prettier'],
  extends: ['standard', 'prettier-standard'],
  globals: {
    $: 'readonly',
    jQuery: 'readonly'
  },
  rules: {}
}
