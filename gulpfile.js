// Define required plugins
const { dest, lastRun, parallel, series, src, watch } = require('gulp');
const path = require('path');
const fs = require('fs-extra');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGiflossy = require('imagemin-giflossy');
const nunjucksRender  = require('gulp-nunjucks-render');
const data = require('gulp-data');
const yaml = require('js-yaml');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

// Read package.json to use later on
const config = fs.readJsonSync('package.json',  {throws: false });

// Remove the dist folder
function clean() {
  return fs.remove('dist/');
}

// Transpile css
function css(done) {
  return src(config.globs.scss)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src/scss'}))
    .pipe(dest('dist/'));
  done();
}
// Optimize CSS
function optimizeCSS(done) {
  var plugins = [
    autoprefixer(),
    cssnano()
  ];
  return src('dist/**/*.css')
    .pipe(postcss(plugins))
    .pipe(dest('dist/'));
  done();
}

// Transpile js
function js(done) {
  const bundler = browserify(config.main, { debug: true }).transform(babel);
  return bundler.bundle()
    .on('error', function(err) { console.error(err.stack); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../../'}))
    .pipe(dest('dist/js/'));
  done();
}
// Optimize JS
function optimizeJS(done) {
  return src('dist/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/'));
  done();
}

// Transpile html
function html(done) {
  return src([config.globs.html, '!src/layouts/**', '!src/partials/**'])
    .pipe(data(function(file) {
      let filename = 'src/data/'+path.basename(file.basename)+'.yml';
      try {
        return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
      } catch (error) {
        console.error(error.message);
        return {};
      }
    }))
    .pipe(nunjucksRender({path: 'src'}))
    .pipe(dest('dist/'));
  done();
}

// Copy files
function copyFiles(done) {
  config.filesToCopyGlobs.notImages = '!src/images/**';
  return src(Object.values(config.filesToCopyGlobs))
    .pipe(dest('dist/'));
  done();
}

// Copy files
function copyImages(done) {
  return src([config.globs.images, '!src/fonts/**'])
    .pipe(dest('dist/'));
  done();
}
// Optimize Images
function optimizeImages(done) {
  return src(['dist/**/*.{jpg,jpeg,png,gif,svg}', '!dist/fonts/**', '!src/fonts/**'])
    .pipe(imagemin([
      imageminGiflossy({interlaced: true, optimizationLevel: 3, lossy: 85}),
      imageminMozjpeg({quality: 85}),
      imageminPngquant({quality: 85}),
      imagemin.svgo({plugins: [{removeViewBox: true}, {cleanupIDs: false}]})
    ]))
    .pipe(dest('dist/'));
  done();
}

// BrowserSync local http server
function server(done) {
  browsersync.init({
    server: {baseDir: 'dist/'},
    port: 8080,
    open: false
  });
  done();
}
// BrowserSync live reload
function liveReload(done) {
  browsersync.reload();
  done();
}

// Watch for file changes and run tasks
function watchFiles(done) {
  // Watch scss
  watch(config.globs.scss, series(css, liveReload));
  // Watch js
  watch(config.globs.js, series(js, liveReload));
  // Watch yaml
  watch(config.globs.yaml, series(html, liveReload));
  // Watch and delete fonts
  const watchFonts = watch(config.globs.fonts, series(copyFiles, liveReload));
  watchFonts.on('unlink', function (filepath) {
    const filePathFromSrc = path.relative(path.resolve('src'), filepath);
    const destFilePath = path.resolve('dist', filePathFromSrc);
    fs.removeSync(destFilePath);
  });
  // Watch and delete html
  const watchHTML = watch(config.globs.html, series(html, liveReload));
  watchHTML.on('unlink', function (filepath) {
    const filePathFromSrc = path.relative(path.resolve('src'), filepath);
    const destFilePath = path.resolve('dist', filePathFromSrc);
    fs.removeSync(destFilePath);
  });
  // Watch and delete images
  const watchImages = watch(config.globs.images, series(copyImages, liveReload));
  watchImages.on('unlink', function (filepath) {
    const filePathFromSrc = path.relative(path.resolve('src'), filepath);
    const destFilePath = path.resolve('dist', filePathFromSrc);
    fs.removeSync(destFilePath);
  });
  done();
}

// Export tasks which can be use later with "gulp taskname"
// Run "gulp --tasks" to see all the avaiable runable tasks
exports.clean = clean;
exports.dev = series(html, parallel(copyFiles, copyImages, css, js), server, watchFiles);
exports.build = series(clean, parallel(copyFiles, copyImages, html, css, js), parallel(optimizeCSS, optimizeJS, optimizeImages));
exports.buildCSS = series(clean, css, optimizeCSS);
exports.buildJS = series(clean, js, optimizeJS);
exports.buildImages = series(clean, copyImages, optimizeImages);
