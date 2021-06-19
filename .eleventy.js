const htmlmin = require('html-minifier')
const markdownIt = require('markdown-it')
const simpleSvgPlaceholder = require('@cloudfour/simple-svg-placeholder')
const prettier = require('prettier')

// Check for `production` flag
const PRODUCTION = process.env.NODE_ENV === 'production'

// Load settings from `config.js` file
const { PATHS } = require('./config.js')

module.exports = (eleventyConfig) => {
  // Markdown Parsing
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      typographer: true
    })
  )

  // Minify HTML Output when `production` flag is set
  if (PRODUCTION) {
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
      }
      return content
    })
  } else {
    // Prettier HTML Output
    eleventyConfig.addTransform('prettier', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        return prettier.format(content, { parser: 'html' })
      }
      return content
    })
  }

  // Universal filter for placeholder image
  const placeholderImageDefaults = {
    bgColor: '#f5f5f5',
    textColor: '#073983'
  }
  eleventyConfig.addFilter('placeholderImage', function (value) {
    const options = value || {}
    return simpleSvgPlaceholder({ ...placeholderImageDefaults, ...options })
  })

  return {
    dir: {
      input: 'src',
      output: PATHS.dist
    },
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
