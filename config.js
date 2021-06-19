module.exports = {
  // Browsersync port
  PORT: 8080,

  // Purgecss settings
  PURGECSS: {
    whitelist: ['w-100', 'vw-100'],
    whitelistPatterns: [/order/gm, /text/gm],
    whitelistPatternsChildren: []
  },

  // Gulp path references
  PATHS: {
    // Path to `dist` folder
    dist: 'dist',

    // Path to static assets & ignore some folders
    assets: ['src/assets/**/*', '!src/assets/{img,js,css}/**'],

    // Path to images & ignore some folders
    images: [
      'src/assets/**/*.{jpg,jpeg,png,gif,svg,webp}',
      '!src/assets/fonts/**'
    ],

    // Path to static files to copy to `dist`
    staticFiles: [
      'src/robots.txt',
      'src/favicon.ico',
      'src/.htaccess',
      'src/site.webmanifest'
    ],

    // Additional JS files to copy to "dist/assets/js"
    additionalJsFiles2Copy: ['src/assets/js/js-copy/**/*.js'],

    // Additional CSS files to copy to "dist/assets/css"
    additionalCssFiles2Copy: ['src/assets/css/css-copy/**/*.css']
  }
}
