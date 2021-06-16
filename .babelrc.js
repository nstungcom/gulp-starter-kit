module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        useBuiltIns: 'usage',
        corejs: 3,
        bugfixes: true
      }
    ]
  ]
}
