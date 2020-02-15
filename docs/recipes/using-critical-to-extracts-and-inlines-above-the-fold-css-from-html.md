# Using critical to extracs and inlines above the fold css from html

First we need to install critical.

With npm:
```sh
$ npm i critical
```

Next we need to modify the **gulp.babel.js** file:
```js
// Import critical
const critical = require('critical').stream

// Create a task (function) to extracs and inlines above the fold css from html
// Create critical CSS
function criticalCSS () {
  return gulp.src(`${PATHS.dist}/**/*.html`)
    .pipe(critical({ base: PATHS.dist, inline: true, css: [`${PATHS.dist}/assets/css/app.css`] })
      .on('error', function (err) { console.error(err.message) }))
    .pipe(gulp.dest(PATHS.dist))
}

// Extend the build exports
exports.build = gulp.series(
  eslint, stylelint,
  gulp.parallel(copyAssets, copyStaticFiles, images, css, js),
  criticalCSS, cleanUnusedCSS, revFiles, compressAssets
)
```

That's it, try it out and see it for yourself.