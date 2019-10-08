module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-standard'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'no-empty-source': null,
    'number-leading-zero': 'never'
  }
}
