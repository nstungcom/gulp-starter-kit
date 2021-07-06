// Import plugins and required libraries
const gulp = require('gulp')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const Fiber = require('fibers')
const gulpStylelint = require('gulp-stylelint')
const gulpPostcss = require('gulp-postcss')
const gulpCleancss = require('gulp-clean-css')
const gulpPurgecss = require('gulp-purgecss')
const gulpImagemin = require('gulp-imagemin')
const gulpEslint = require('gulp-eslint7')
const gulpRollup = require('gulp-better-rollup')
const rimraf = require('rimraf')
const browsersync = require('browser-sync')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const babel = require('rollup-plugin-babel')
const commonjs = require('@rollup/plugin-commonjs')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')

// Use Dart Sass as compiler
sass.compiler = require('sass')

// Check for `production` flag
const PRODUCTION = process.env.NODE_ENV === 'production'

// Load settings from `config.js` file
const { PATHS, PORT, PURGECSS } = require('./config.js')

// Remove the `dist` folder
const clean = (done) => {
  rimraf(PATHS.dist, done)
}

// Stylelint for CSS & SCSS
const stylelint = (done) =>
  gulp.src('src/**/*.{css,scss}').pipe(
    gulpStylelint({
      reporters: [{ formatter: 'string', console: true }]
    }).on('error', done)
  )

// Compile SCSS to CSS & copy additional CSS files which can be defined in `config.js`
const css = () =>
  gulp
    .src('src/assets/css/app.{css,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
    .pipe(gulpPostcss())
    .pipe(gulp.src(PATHS.additionalCssFiles2Copy, { since: gulp.lastRun(css) }))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
    .pipe(gulp.dest(`${PATHS.dist}/assets/css`))
    .pipe(browsersync.stream())

// Remove unused CSS
const cleanCSS = () =>
  gulp
    .src([`${PATHS.dist}/**/*.css`, `!${PATHS.dist}/**/*min.css`])
    .pipe(gulpPostcss())
    .pipe(gulpCleancss({ level: { 1: { specialComments: false } } }))
    .pipe(
      gulpPurgecss({
        content: [`${PATHS.dist}/**/*.{html,js}`],
        whitelist: PURGECSS.whitelist,
        whitelistPatterns: PURGECSS.whitelistPatterns,
        whitelistPatternsChildren: PURGECSS.whitelistPatternsChildren
      })
    )
    .pipe(gulp.dest(PATHS.dist))

// Eslint for JS
const eslint = () =>
  gulp.src('src/**/*.js').pipe(gulpEslint()).pipe(gulpEslint.failOnError())

// Compile JS and transform with Babel
// Copy additional JS files which can be defined in `config.js`
// When `production` flag is set the JS files will be compressed
const js = () => {
  const rollupPlugins = [
    nodeResolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' })
  ]

  if (PRODUCTION) {
    rollupPlugins.push(terser({ output: { comments: false } }))
  }

  return gulp
    .src('src/assets/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(gulpRollup({ plugins: rollupPlugins }, 'iife'))
    .pipe(gulp.src(PATHS.additionalJsFiles2Copy, { since: gulp.lastRun(js) }))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`))
}

// Copy files from the `src/assets` to "dist" folder
const copyAssets = () =>
  gulp
    .src(PATHS.assets, { nodir: true })
    .pipe(gulp.dest(`${PATHS.dist}/assets`))

// Copy static files from `src` to `dist` folder
const copyStaticFiles = () =>
  gulp.src(PATHS.staticFiles, { allowEmpty: true }).pipe(gulp.dest(PATHS.dist))

// Copy images
// When `production` flag is set the images will be compressed
const images = () =>
  gulp
    .src(PATHS.images)
    .pipe(
      gulpif(
        PRODUCTION,
        gulpImagemin([
          imageminMozjpeg({ quality: 90 }),
          imageminPngquant({ quality: [0.8, 0.9] }),
          gulpImagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
    )
    .pipe(gulp.dest(`${PATHS.dist}/assets`))

// Start a http server with browsersync
const server = (done) => {
  browsersync.init(
    {
      server: PATHS.dist,
      port: PORT,
      open: false,
      notify: false
    },
    done
  )
}

// Reload the browser with browsersync
const liveReload = (done) => {
  browsersync.reload()
  done()
}

// Watch modified files and run tasks
const watchFiles = () => {
  gulp.watch(PATHS.assets, copyAssets)
  gulp.watch(PATHS.staticFiles, copyStaticFiles)
  gulp.watch('src/assets/css/**/*.{css,scss}', gulp.series(stylelint, css))
  gulp.watch('src/assets/js/**/*.js', gulp.series(eslint, js, liveReload))
  gulp.watch('src/assets/img/**/*', gulp.series(images, liveReload))
  gulp.watch(`${PATHS.dist}/**/*.html`, liveReload)
}

// Make tasks public which then can be run with the `gulp` command
// It's still recommended to run tasks with npm scripts `npm <srcript_name>`
// Take a look at `package.json` file for more information
module.exports.clean = clean
module.exports.css = gulp.series(stylelint, css, cleanCSS)
module.exports.js = gulp.series(eslint, js)
module.exports.default = gulp.series(
  stylelint,
  eslint,
  gulp.parallel(copyAssets, copyStaticFiles, images, css, js),
  server,
  watchFiles
)
module.exports.build = gulp.series(
  eslint,
  stylelint,
  gulp.parallel(copyAssets, copyStaticFiles, images, css, js),
  cleanCSS
)
