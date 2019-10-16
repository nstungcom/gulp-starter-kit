const jsBeautifierHtml = require('js-beautify').html
const markdownIt = require('markdown-it');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(pluginRss);

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
  eleventyConfig.addTransform('htmlbeautifier', function(content, outputPath) {
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
      output: 'dist',
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
