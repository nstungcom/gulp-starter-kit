const jsBeautifierHtml = require('js-beautify').html
const markdownIt = require('markdown-it')
const pluginRss = require('@11ty/eleventy-plugin-rss')

// Load settings from `config.js` file
const loadConfig = () => {
  return require('./config.js')
}
const { PATHS } = loadConfig()

module.exports = (eleventyConfig) => {
  // Plugins
  eleventyConfig.addPlugin(pluginRss)

  // Markdown Parsing
  eleventyConfig.setLibrary(
    'md',
    markdownIt({
      html: true,
      breaks: true,
      typographer: true
    })
  )

  // Beautifier HTML Output
  eleventyConfig.addTransform('htmlbeautifier', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      return jsBeautifierHtml(content, {
        indent_size: 2,
        indent_char: ' ',
        max_preserve_newlines: 1
      })
    }
    return content
  })

  return {
    dir: {
      input: 'src',
      output: PATHS.dist
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
