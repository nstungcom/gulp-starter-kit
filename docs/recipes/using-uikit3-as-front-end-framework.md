# Using UIkit 3 as front-end framework

First we need to install UIkit 3.

With npm:
```sh
$ npm i uikit
```

UIkit 3 supports modern browsers but also IE 11+, so we need to edit the `.browserslistrc` file:
```yaml
# Browsers support
# https://browserl.ist/?q=last+1+version%2C+safari+%3E%3D+9.1
# Global coverage: 67.58%

last 1 version 
safari >= 9.1
```

Next we need to import UIkit 3 SCSS and JS files by creating 2 new files:

`src/assets/scss/vendor/_uikit-custom.scss`
```scss
// Override variables
$global-color: #696969;

//
// Required
//

// With theme
@import "variables-theme.scss";
@import "mixins-theme.scss";
@import "./uikit-theme-custom";
// Without theme
// @import "variables.scss";
// @import "mixins.scss";

@import "components/variables.scss";
@import "components/mixin.scss";

//
// Optional import only files that we need
//

// Base
@import "components/base.scss";

// Elements
// @import "components/link.scss";
// @import "components/heading.scss";
// @import "components/divider.scss";
// @import "components/list.scss";
// @import "components/description-list.scss";
// @import "components/table.scss";
// @import "components/icon.scss";
// @import "components/form-range.scss";
// @import "components/form.scss"; // After: Icon, Form Range
@import "components/button.scss";

// Layout
// @import "components/section.scss";
@import "components/container.scss";
@import "components/grid.scss";
// @import "components/tile.scss";
@import "components/card.scss";

// Common
// @import "components/close.scss"; // After: Icon
// @import "components/spinner.scss"; // After: Icon
// @import "components/totop.scss"; // After: Icon
// @import "components/marker.scss"; // After: Icon
// @import "components/alert.scss"; // After: Close
// @import "components/badge.scss";
// @import "components/label.scss";
// @import "components/overlay.scss"; // After: Icon
// @import "components/article.scss"; // After: Subnav
// @import "components/comment.scss"; // After: Subnav
// @import "components/search.scss"; // After: Icon

// Navs
// @import "components/nav.scss";
// @import "components/navbar.scss"; // After: Card, Grid, Nav, Icon, Search
// @import "components/subnav.scss";
@import "components/breadcrumb.scss";
@import "components/pagination.scss";
// @import "components/tab.scss";
// @import "components/slidenav.scss"; // After: Icon
// @import "components/dotnav.scss";
// @import "components/thumbnav.scss";

// JavaScript
@import "components/accordion.scss";
// @import "components/drop.scss"; // After: Card
@import "components/dropdown.scss"; // After: Card
// @import "components/modal.scss"; // After: Close
// @import "components/lightbox.scss"; // After: Close
// @import "components/slideshow.scss";
// @import "components/slider.scss";
// @import "components/sticky.scss";
// @import "components/offcanvas.scss";
// @import "components/switcher.scss";
// @import "components/leader.scss";

// Scrollspy
// Toggle
// Scroll

// Additional
// @import "components/iconnav.scss";
// @import "components/notification.scss";
// @import "components/tooltip.scss";
// @import "components/placeholder.scss";
// @import "components/progress.scss";
// @import "components/sortable.scss";
// @import "components/countdown.scss";

// Utilities
// @import "components/animation.scss";
@import "components/width.scss";
// @import "components/height.scss";
// @import "components/text.scss";
// @import "components/column.scss";
// @import "components/cover.scss";
// @import "components/background.scss";
// @import "components/align.scss";
// @import "components/svg.scss";
// @import "components/utility.scss";
// @import "components/flex.scss"; // After: Utility
// @import "components/margin.scss";
// @import "components/padding.scss";
// @import "components/position.scss";
// @import "components/transition.scss";
// @import "components/visibility.scss";
// @import "components/inverse.scss";

// Need to be loaded last
// @import "components/print.scss";
```

`src/assets/scss/vendor/_uikit-theme-custom.scss`  
**You only need this file when you use UIkit theme.**
```scss
// Base
@import "theme/variables.scss";
@import "theme/base.scss";

// Elements
@import "theme/link.scss";
@import "theme/heading.scss";
@import "theme/divider.scss";
@import "theme/list.scss";
@import "theme/description-list.scss";
@import "theme/table.scss";
@import "theme/icon.scss";
@import "theme/form-range.scss";
@import "theme/form.scss";
@import "theme/button.scss";

// Layout
@import "theme/section.scss";
@import "theme/container.scss";
@import "theme/grid.scss";
@import "theme/tile.scss";
@import "theme/card.scss";

// Common
@import "theme/close.scss";
@import "theme/spinner.scss";
@import "theme/marker.scss";
@import "theme/totop.scss";
@import "theme/alert.scss";
@import "theme/badge.scss";
@import "theme/label.scss";
@import "theme/overlay.scss";
@import "theme/article.scss";
@import "theme/comment.scss";
@import "theme/search.scss";

// Navs
@import "theme/nav.scss";
@import "theme/navbar.scss";
@import "theme/subnav.scss";
@import "theme/breadcrumb.scss";
@import "theme/pagination.scss";
@import "theme/tab.scss";
@import "theme/slidenav.scss";
@import "theme/dotnav.scss";
@import "theme/thumbnav.scss";

// JavaScript
@import "theme/accordion.scss";
@import "theme/drop.scss";
@import "theme/dropdown.scss";
@import "theme/modal.scss";
@import "theme/lightbox.scss";
@import "theme/sticky.scss";
@import "theme/offcanvas.scss";
@import "theme/leader.scss";

// Additional
@import "theme/iconnav.scss";
@import "theme/notification.scss";
@import "theme/tooltip.scss";
@import "theme/placeholder.scss";
@import "theme/progress.scss";
@import "theme/sortable.scss";
@import "theme/countdown.scss";

// Utilities
@import "theme/animation.scss";
@import "theme/width.scss";
@import "theme/height.scss";
@import "theme/text.scss";
@import "theme/column.scss";
@import "theme/background.scss";
@import "theme/align.scss";
@import "theme/utility.scss";
@import "theme/margin.scss";
@import "theme/padding.scss";
@import "theme/position.scss";
@import "theme/transition.scss";
@import "theme/inverse.scss";
```

In `src/assets/scss/app.scss` add:
```scss
// Import vendor scss
@import "./vendor/uikit-custom";
```

In `src/assets/js/app.js` add:
```js
global.UIkit = require('uikit');
// Uncomment to use UIkit Icons
// global.UIkitIcons = require('uikit/dist/js/uikit-icons');
// UIkit.use(UIkitIcons);

// components can be called from the imported UIkit reference
// UIkit.lightbox('.lightbox');

// Import your js files here

// Add your codes here
```

That's it, you are now ready to use UIkit 3 as front-end framework.
