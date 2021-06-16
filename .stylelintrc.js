module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'no-empty-source': null
  }
}
