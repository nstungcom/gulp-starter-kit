## Gulp Starter Kit
[![Build Status](https://travis-ci.org/nstungcom/gulp-starter-kit.svg?branch=master)](https://travis-ci.org/nstungcom/gulp-starter-kit)

### Features
| Feature | Summary |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Independent front-end framework | Use any of your favorite front-end framework like Bootstrap 4, Foundation 6, UIKit 3 etc. Check out our [recipes](/docs/recipes/). |
| Sass support (SCSS) | Compile [Sass](http://sass-lang.com/) into CSS with ease, bringing support for variables, mixins and more. |
| Performance optimization | Minify and concatenate JavaScript, CSS and Images to help keep your pages lean. |
| ES6+ via Babel | ES6+ support using [Babel](https://babeljs.io/). ES6+ source code will be automatically transpiled to ES5 for wide browser support. Pollyfill will also be taken care of automatically. |
| Nunjucks templating engine support | Compile [Nunjucks](https://mozilla.github.io/nunjucks/) into HTML with ease, bringing support for include, extends, block inheritance, macros and more. |
| Built-in HTTP Server | A built-in server for previewing your site locally while you develop and iterate. |
| Live Browser Reloading | Reload the browser in real-time anytime an edit is made without the need for an extension. |
| Cross-device Synchronization | Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by [BrowserSync](http://browsersync.io). |

## Requirements
- [Node.js](https://nodejs.org/en/) 8 (tested with 8.16.1 and 10.16.3)
- [Gulp](https://gulpjs.com/) 4
- gulp-cli 2

## Quick start
- [Download the latest release](https://github.com/nstungcom/gulp-starter-kit/archive/master.zip) or 
- Clone the repo `git clone https://github.com/nstungcom/gulp-starter-kit.git my-project/`
- With [npm](https://www.npmjs.com/): `npm i`
- Development: `npm run dev`
- Build for production: `npm run build`
- Build CSS only: `npm run build-css`
- Build HTML only: `npm run build-html`
- Build JS only: `npm run build-js`
- Build Images only: `npm run build-img`
- Copy assets: `npm run copy`
- Remove the `dist` folder: `npm run clean`

## Quick start guides:
- [Documentation](docs/README.md)
- YAML: https://learnxinyminutes.com/docs/yaml/
- Nunjucks: https://mozilla.github.io/nunjucks/templating.html
