# Using Bootstrap 4 as front-end framework

First we need to install Bootstrap 4 and its dependencies.

With npm:
```sh
$ npm i bootstrap jquery popper.js
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

Next we need to import Bootstrap 4 SCSS and JS files by creating 2 new files:

`src/assets/scss/vendor/_bootstrap-custom.scss`
```scss
// Override variables
$body-color: #696969;

// Required
@import "functions";
@import "variables";
@import "mixins";

// Optional import only files that we need
// @import "root";
@import "reboot";
@import "type";
@import "images";
// @import "code";
@import "grid";
@import "tables";
@import "forms";
@import "buttons";
@import "transitions";
@import "dropdown";
// @import "button-group";
// @import "input-group";
// @import "custom-forms";
@import "nav";
@import "navbar";
@import "card";
@import "breadcrumb";
@import "pagination";
// @import "badge";
// @import "jumbotron";
// @import "alert";
// @import "progress";
// @import "media";
// @import "list-group";
// @import "close";
// @import "toasts";
// @import "modal";
// @import "tooltip";
// @import "popover";
// @import "carousel";
// @import "spinners";
@import "utilities";
// @import "print";
```

`src/assets/js/vendor/bootstrap-custom.js`
```js
// Required 
require('popper.js');

// Optional import only files that we need
// require('bootstrap/js/dist/alert');
// require('bootstrap/js/dist/button');
// require('bootstrap/js/dist/carousel');
require('bootstrap/js/dist/collapse');
require('bootstrap/js/dist/dropdown');
// require('bootstrap/js/dist/modal');
// require('bootstrap/js/dist/popover');
// require('bootstrap/js/dist/scrollspy');
// require('bootstrap/js/dist/tab');
// require('bootstrap/js/dist/toast');
// require('bootstrap/js/dist/tooltip');
require('bootstrap/js/dist/util');
```

In `src/assets/scss/app.scss` add:
```scss
// Import vendor scss
@import './vendor/bootstrap-custom';
```

In `src/assets/js/app.js` add:
```js
// Import vendor js
global.$ = global.jQuery = require('jquery');
require('./vendor/bootstrap-custom');

// Import your js files here

$(function () {
  // Add your codes here
});
```

That's it, you are now ready to use Bootstrap 4 as front-end framework.
