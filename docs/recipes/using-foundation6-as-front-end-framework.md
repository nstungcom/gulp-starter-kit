# Using Foundation 6 as front-end framework

Before continue reading, you really should checkout Foundation [offical build system](https://github.com/zurb/foundation-zurb-template) which powered by [Gulp](https://gulpjs.com/) & [Webpack](https://webpack.js.org/).

We need to install Foundation 6 and its dependencies first.

With npm:
```sh
$ npm i foundation-sites jquery
```

Next we need to import Foundation 6 SCSS and JS files by creating 2 new files:

`src/css/vendors/_foundation-custom.scss`
```scss
// Override variables
$body-font-color: #696969;

// Required
@import 'node_modules/foundation-sites/scss/foundation';

// Optional include only what we need, uncomment to load

// Global styles
@include foundation-global-styles;
// @include foundation-forms;
@include foundation-typography;

// Grids (choose one)
@include foundation-xy-grid-classes;
// @include foundation-grid;
// @include foundation-flex-grid;

// // Generic components
@include foundation-button;
// @include foundation-button-group;
// @include foundation-close-button;
// @include foundation-label;
// @include foundation-progress-bar;
// @include foundation-slider;
// @include foundation-switch;
// @include foundation-table;
// // Basic components
// @include foundation-badge;
// @include foundation-breadcrumbs;
// @include foundation-callout;
// @include foundation-card;
// @include foundation-dropdown;
// @include foundation-pagination;
// @include foundation-tooltip;

// // Containers
// @include foundation-accordion;
// @include foundation-media-object;
// @include foundation-orbit;
// @include foundation-responsive-embed;
// @include foundation-tabs;
// @include foundation-thumbnail;
// // Menu-based containers
// @include foundation-menu;
// @include foundation-menu-icon;
// @include foundation-accordion-menu;
// @include foundation-drilldown-menu;
// @include foundation-dropdown-menu;

// // Layout components
// @include foundation-off-canvas;
// @include foundation-reveal;
// @include foundation-sticky;
// @include foundation-title-bar;
// @include foundation-top-bar;

// // Helpers
@include foundation-float-classes;
@include foundation-flex-classes;
@include foundation-visibility-classes;
// @include foundation-prototype-classes;
```

`src/js/vendors/foundation-custom.js`
```js
// Required
require('foundation-sites/js/entries/plugins/foundation.core');

// Optional import only files that we need, uncomment to load

// require('foundation-sites/js/entries/plugins/foundation.util.box');
// require('foundation-sites/js/entries/plugins/foundation.util.imageLoader');
// require('foundation-sites/js/entries/plugins/foundation.util.keyboard');
// require('foundation-sites/js/entries/plugins/foundation.util.mediaQuery');
// require('foundation-sites/js/entries/plugins/foundation.util.motion');
// require('foundation-sites/js/entries/plugins/foundation.util.nest');
// require('foundation-sites/js/entries/plugins/foundation.util.timer');
// require('foundation-sites/js/entries/plugins/foundation.util.touch');
// require('foundation-sites/js/entries/plugins/foundation.util.triggers');
// require('foundation-sites/js/entries/plugins/foundation.abide');
// require('foundation-sites/js/entries/plugins/foundation.accordion');
// require('foundation-sites/js/entries/plugins/foundation.accordionMenu');
// require('foundation-sites/js/entries/plugins/foundation.drilldown');
// require('foundation-sites/js/entries/plugins/foundation.dropdown');
// require('foundation-sites/js/entries/plugins/foundation.dropdownMenu');
require('foundation-sites/js/entries/plugins/foundation.equalizer');
// require('foundation-sites/js/entries/plugins/foundation.interchange');
// require('foundation-sites/js/entries/plugins/foundation.magellan');
// require('foundation-sites/js/entries/plugins/foundation.offcanvas');
// require('foundation-sites/js/entries/plugins/foundation.orbit');
// require('foundation-sites/js/entries/plugins/foundation.responsiveMenu');
// require('foundation-sites/js/entries/plugins/foundation.responsiveToggle');
// require('foundation-sites/js/entries/plugins/foundation.reveal');
// require('foundation-sites/js/entries/plugins/foundation.slider');
// require('foundation-sites/js/entries/plugins/foundation.smoothScroll');
// require('foundation-sites/js/entries/plugins/foundation.sticky');
// require('foundation-sites/js/entries/plugins/foundation.tabs');
// require('foundation-sites/js/entries/plugins/foundation.toggler');
// require('foundation-sites/js/entries/plugins/foundation.tooltip');
// require('foundation-sites/js/entries/plugins/foundation.responsiveAccordionTabs');
```

In `src/css/main.scss` add:
```scss
// Import vendors scss
@import 'vendors/foundation-custom';
```

In `src/js/main.js` add:
```js
// Import vendors js
global.$ = global.jQUery = require('jquery');
require('./vendors/foundation-custom');

// Initializing Foundation
$(document).foundation();
```

That's it, you are now ready to use Foundation 6 as front-end framework.
