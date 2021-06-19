# Using Bootstrap 4 as front-end framework

First we need to install Bootstrap 4 and it's dependencies.

With npm:

```sh
$ npm install bootstrap jquery popper.js
```

Bootstrap 4 supports modern browsers but also IE 11+, so we need to edit the `.browserslistrc` file:

```yaml
# Browsers support
# https://browserl.ist/?q=%3E%3D+1%25%2C+last+1+major+version%2C+not+dead%2C+Chrome+%3E%3D+60%2C+Firefox+%3E%3D+60%2C+Edge+%3E%3D+15.15063%2C+Explorer+11%2C+iOS+%3E%3D+10%2C+Safari+%3E%3D+10%2C+Android+%3E%3D+6%2C+not+ExplorerMobile+%3C%3D+11
# Global coverage: 92.69%

>= 1%
last 1 major version
not dead
Chrome >= 45
Firefox >= 38
Edge >= 12
Explorer >= 10
iOS >= 9
Safari >= 9
Android >= 4.4
Opera >= 30
```

Next we need to import Bootstrap 4 SCSS and JS files by creating 3 new files:

`src/assets/css/vendor/_bootstrap-custom.scss`

```scss
// Override variables
$body-color: #696969;

// Required
@import '../../../../node_modules/bootstrap/scss/functions';
@import '../../../../node_modules/bootstrap/scss/variables';
@import '../../../../node_modules/bootstrap/scss/mixins';

// Optional import only files that we need
// @import '../../../../node_modules/bootstrap/scss/root';
@import '../../../../node_modules/bootstrap/scss/reboot';
@import '../../../../node_modules/bootstrap/scss/type';
@import '../../../../node_modules/bootstrap/scss/images';
// @import '../../../../node_modules/bootstrap/scss/code';
@import '../../../../node_modules/bootstrap/scss/grid';
@import '../../../../node_modules/bootstrap/scss/tables';
@import '../../../../node_modules/bootstrap/scss/forms';
@import '../../../../node_modules/bootstrap/scss/buttons';
@import '../../../../node_modules/bootstrap/scss/transitions';
@import '../../../../node_modules/bootstrap/scss/dropdown';
// @import '../../../../node_modules/bootstrap/scss/button-group';
// @import '../../../../node_modules/bootstrap/scss/input-group';
// @import '../../../../node_modules/bootstrap/scss/custom-forms';
@import '../../../../node_modules/bootstrap/scss/nav';
@import '../../../../node_modules/bootstrap/scss/navbar';
@import '../../../../node_modules/bootstrap/scss/card';
@import '../../../../node_modules/bootstrap/scss/breadcrumb';
@import '../../../../node_modules/bootstrap/scss/pagination';
// @import '../../../../node_modules/bootstrap/scss/badge';
// @import '../../../../node_modules/bootstrap/scss/jumbotron';
// @import '../../../../node_modules/bootstrap/scss/alert';
// @import '../../../../node_modules/bootstrap/scss/progress';
// @import '../../../../node_modules/bootstrap/scss/media';
// @import '../../../../node_modules/bootstrap/scss/list-group';
// @import '../../../../node_modules/bootstrap/scss/close';
// @import '../../../../node_modules/bootstrap/scss/toasts';
// @import '../../../../node_modules/bootstrap/scss/modal';
// @import '../../../../node_modules/bootstrap/scss/tooltip';
// @import '../../../../node_modules/bootstrap/scss/popover';
// @import '../../../../node_modules/bootstrap/scss/carousel';
// @import '../../../../node_modules/bootstrap/scss/spinners';
@import '../../../../node_modules/bootstrap/scss/utilities';
// @import '../../../../node_modules/bootstrap/scss/print';
```

`src/assets/js/vendor/jquery-global.js`

```js
import $ from 'jquery'

window.$ = $
window.jQuery = $
```

`src/assets/js/vendor/bootstrap-custom.js`

```js
// Required
import 'popper.js'

// Optional import only files that we need
// import 'bootstrap/js/dist/alert'
// import 'bootstrap/js/dist/button'
// import 'bootstrap/js/dist/carousel'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/dropdown'
// import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/popover'
import 'bootstrap/js/dist/scrollspy'
// import 'bootstrap/js/dist/tab'
// import 'bootstrap/js/dist/toast'
// import 'bootstrap/js/dist/tooltip'
import 'bootstrap/js/dist/util'
```

In `src/assets/css/app.scss` add:

```scss
// Import vendor scss
@import './vendor/bootstrap-custom';
```

In `src/assets/js/app.js` add:

```js
// Vendors
import './vendor/jquery-global'
import './vendor/bootstrap-custom'

// Import your js files here

// Remove `.no-js` class
$('html').removeClass('no-js')
```

That's it, you are now ready to use Bootstrap 4 as front-end framework.
