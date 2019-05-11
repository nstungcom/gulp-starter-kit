# Using Bootstrap 4 as front-end framework

First we need to install Bootstrap 4 and it's dependencies.

With npm:
```sh
$ npm i bootstrap jquery popper.js
```

Next we need to import Bootstrap SCSS and JS files by creating 2 new files:

`src/css/vendors/_bootstrap-custom.scss`
```scss
// Required
@import "node_modules/bootstrap/scss/functions";
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins";

// Optional import only files that we need
@import "node_modules/bootstrap/scss/reboot";
@import "node_modules/bootstrap/scss/utilities";
@import "node_modules/bootstrap/scss/type";
@import "node_modules/bootstrap/scss/images";
@import "node_modules/bootstrap/scss/buttons";
@import "node_modules/bootstrap/scss/grid";
```

`src/js/vendors/bootstrap-custom.js`
```js
// Required
require('popper.js/dist/umd/popper');
require('bootstrap/js/dist/util');

// Optional import only files that we need
require('bootstrap/js/dist/tooltip');
```

In `src/css/main.scss` add:
```scss
// Import vendors scss
@import 'vendors/bootstrap-custom';
```

In `src/js/main.js` add:
```js
// Import vendors js
global.$ = global.jQUery = require('jquery/dist/jquery'); // jquery-slim won't work with bootstrap - 16.09.2019
require('./vendors/bootstrap-custom');
```

That's it, you are now ready to use Bootstrap 4 as front-end framework.
