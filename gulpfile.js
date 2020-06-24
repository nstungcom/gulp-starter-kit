/*
 * This file is part of the package @nstungcom/gulp-starter-kit.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */
const gulp = require('gulp')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const gulpStylelint = require('gulp-stylelint')
const postcss = require('gulp-postcss')
const cleancss = require('gulp-clean-css')
const purgecss = require('gulp-purgecss')
const imagemin = require('gulp-imagemin')
const gulpEslint = require('gulp-eslint')
const rollup = require('gulp-better-rollup')
const revAll = require('gulp-rev-all')
const revDelete = require('gulp-rev-delete-original')
const gzip = require('gulp-gzip')
const rimraf = require('rimraf')
const browsersync = require('browser-sync')
const autoprefixer = require('autoprefixer')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminPngquant = require('imagemin-pngquant')
const babel = require('rollup-plugin-babel')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const commonjs = require('@rollup/plugin-commonjs')
const { terser } = require('rollup-plugin-terser')

// Check for `production` flag
const PRODUCTION = !!(process.env.NODE_ENV === 'production')

// Load settings from `config.js` file
const loadConfig = () => {
  return require('./config.js')
}
const { PATHS, PORT, PURGECSS } = loadConfig()

// Remove the `dist` folder
const clean = (done) => {
  rimraf(PATHS.dist, done)
}

// Stylelint for CSS & SCSS
const stylelint = (done) => {
  return gulp.src('src/**/*.{css,scss}').pipe(
    gulpStylelint({
      failAfterError: true,
      reporters: [{ formatter: 'string', console: true }]
    }).on('error', done)
  )
}

// Compile SCSS to CSS & copy additional CSS files which can be defined in `config.js`
const css = () => {
  return gulp
    .src('src/assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: PATHS.sassLibs }).on('error', sass.logError))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
    .pipe(gulp.src(PATHS.additionalCssFiles2Copy, { since: gulp.lastRun(css) }))
    .pipe(gulp.dest(`${PATHS.dist}/assets/css`))
}

// Remove unused CSS
const cleanCSS = () => {
  return gulp
    .src(`${PATHS.dist}/**/*.css`)
    .pipe(postcss([autoprefixer({ cascade: false })]))
    .pipe(cleancss({ level: { 1: { specialComments: false } } }))
    .pipe(
      purgecss({
        content: [`${PATHS.dist}/**/*.{html,js}`],
        whitelist: PURGECSS.whitelist,
        whitelistPatterns: PURGECSS.whitelistPatterns,
        whitelistPatternsChildren: PURGECSS.whitelistPatternsChildren
      })
    )
    .pipe(gulp.dest(PATHS.dist))
}

// Compress assets
const compressAssets = () => {
  return gulp
    .src(`${PATHS.dist}/**/*.{css,js,html}`)
    .pipe(gzip({ extension: 'gzip' }))
    .pipe(gulp.dest(PATHS.dist))
}

// Revisioning files
const revFiles = () => {
  return gulp
    .src(`${PATHS.dist}/**/*.{css,html,js}`)
    .pipe(
      revAll.revision({
        dontRenameFile: ['.html'],
        dontUpdateReference: ['.html']
      })
    )
    .pipe(revDelete())
    .pipe(gulp.dest(PATHS.dist))
}

// Eslint for JS
const eslint = () => {
  return gulp
    .src('src/**/*.js')
    .pipe(gulpEslint())
    .pipe(gulpEslint.format('stylish'))
}

// Compile JS and transform with Babel
// Copy additional JS files which can be defined in `config.js`
// When `--production` flag is set the js file will be compressed
const js = () => {
  const rollupPlugins = [
    resolve(),
    commonjs(),
    babel({ exclude: 'node_modules/**' })
  ]

  if (PRODUCTION) {
    rollupPlugins.push(terser({ output: { comments: false } }))
  }

  return gulp
    .src('src/assets/js/app.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({ plugins: rollupPlugins }, 'iife'))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
    .pipe(gulp.src(PATHS.additionalJsFiles2Copy, { since: gulp.lastRun(js) }))
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`))
}

// Copy files from the `src/assets` to "dist" folder
const copyAssets = () => {
  return gulp
    .src(PATHS.assets, { nodir: true })
    .pipe(gulp.dest(`${PATHS.dist}/assets`))
}

// Copy static files from `src` to `dist` folder
const copyStaticFiles = () => {
  return gulp
    .src(PATHS.staticFiles, { allowEmpty: true })
    .pipe(gulp.dest(PATHS.dist))
}

// Copy images
// When `--production` flag is set the images will be compressed
const images = () => {
  return gulp
    .src(PATHS.images)
    .pipe(
      gulpif(
        PRODUCTION,
        imagemin([
          imageminMozjpeg({ quality: 80 }),
          imageminPngquant({ quality: [0.5, 0.8] }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
          })
        ])
      )
    )
    .pipe(gulp.dest(`${PATHS.dist}/assets`))
}

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
  gulp.watch(
    'src/assets/scss/**/*.{css,scss}',
    gulp.series(stylelint, css, liveReload)
  )
  gulp.watch('src/assets/js/**/*.js', gulp.series(eslint, js, liveReload))
  gulp.watch('src/assets/img/**/*', gulp.series(images, liveReload))
  gulp.watch(['src/**/*.{html,md,njk}', 'src/**/*.json'], liveReload)
}

// Make tasks public which then can be run with the `gulp` command
module.exports.clean = clean
module.exports.default = gulp.series(
  stylelint,
  eslint,
  gulp.parallel(css, js),
  server,
  watchFiles
)
module.exports.build = gulp.series(
  eslint,
  stylelint,
  gulp.parallel(copyAssets, copyStaticFiles, images, css, js),
  cleanCSS,
  revFiles,
  compressAssets
)
