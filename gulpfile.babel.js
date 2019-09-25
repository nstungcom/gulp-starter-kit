import gulp from 'gulp';
import fs from 'fs-extra';
import gulpif from 'gulp-if';
import yargs from 'yargs';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import nunjucksRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import beautify from 'gulp-jsbeautifier';
import yaml from 'js-yaml';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import babel from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';

// Check for "--production" flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from config.yml
function loadConfig() {
  const configFile = fs.readFileSync('config.yml');
  return yaml.load(configFile);
}
const { PATHS, PORT } = loadConfig();

// Remove the "dist" folder
function cleanUp(done) {
  fs.removeSync(PATHS.dist);
  done();
}

// Compile SCSS into CSS
// In production CSS is prefixed and compressed
function css() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: PATHS.sassLibs }).on('error', sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([autoprefixer(), cssnano()])))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
    .pipe(gulp.dest(`${PATHS.dist}/assets/css`))
    // .pipe(browserSync.stream());
}

// Compile JS and transform with Babel
// In production JS is compressed
function js() {
  const bundler = browserify('src/assets/js/app.js', { debug: true }).transform(babel);
  return bundler.bundle()
    .on('error', (err) => { console.error(err.stack); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write('.')))
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(gulp.dest(`${PATHS.dist}/assets/js`));
}

// Compile Nunjucks into HTML
// but skip the "layouts", "partials" & "macros" folders
function html() {
  return gulp.src([
    'src/pages/**/*.html',
    '!src/pages/layouts/**',
    '!src/pages/partials/**',
    '!src/pages/macros/**',
  ])
    .pipe(data(() => yaml.safeLoad(fs.readFileSync('src/data/data.yml'))))
    .pipe(nunjucksRender({ path: 'src/pages' }))
    .pipe(beautify({
      html: {
        indent_size: 2,
        indent_char: ' ',
      },
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Copy files from the "src/assets" folder
// but skip the "img", "js", and "scss" folders.
function copyAssets() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(`${PATHS.dist}/assets`));
}

// Copy images
// In production images are compressed
function images() {
  return gulp.src('src/assets/**/*.{jpg,jpeg,png,gif,svg,webp}')
    .pipe(gulpif(PRODUCTION,
      imagemin([
        imageminGifsicle({ interlaced: true, optimizationLevel: 3 }),
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.5, 0.8] }),
        imagemin.svgo({ plugins: [{ removeViewBox: true }, { cleanupIDs: false }] }),
      ])))
    .pipe(gulp.dest(`${PATHS.dist}/assets`));
}

// Start a server with Browsersync
function server(done) {
  browserSync.init({
    server: PATHS.dist, port: PORT, open: false,
  }, done);
}
// Reload the browser with Browsersync
function liveReload(done) {
  browserSync.reload();
  done();
}

// Watch for file changes and run tasks
function watchFiles() {
  gulp.watch(PATHS.assets, copyAssets);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(css, liveReload));
  gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(js, liveReload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, liveReload));
  gulp.watch(['src/pages/**/*.html', 'src/data/**/*.yml']).on('all', gulp.series(html, liveReload));
}

// Export tasks which can be used later with "gulp taskname"
// Run "gulp --tasks" to see all the avaiable runable tasks
exports.cleanUp = cleanUp;
exports.copyAssets = gulp.series(cleanUp, copyAssets);
exports.development = gulp.series(
  html, gulp.parallel(copyAssets, images, css, js), server, watchFiles,
);
exports.build = gulp.series(cleanUp, gulp.parallel(copyAssets, images, html, css, js));
exports.buildCSS = gulp.series(cleanUp, css);
exports.buildHTML = gulp.series(cleanUp, html);
exports.buildJS = gulp.series(cleanUp, js);
exports.buildImages = gulp.series(cleanUp, images);
