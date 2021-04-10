module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        useBuiltIns: 'usage',
        corejs: 3,
        bugfixes: true
      }
    ]
  ]
}
