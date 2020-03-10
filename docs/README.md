# Gulp Starter Kit Documentation

Quick and simple documentation to help you get started.

## Folder structure
Once downloaded, unzip the compressed folder or cloned you'll see something like this:
```
gulp-starter-kit/
├── .browserslistrc
├── .editorconfig
├── .eleventy.js
├── .eslintrc.js
├── .stylelintrc.js
├── babel.config.js
├── config.yml
├── gulpfile.babel.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── docs/
│   ├── README.md
│   └── recipes/
│       ├── README.md
│       ├── ...
└── src/
    ├── .htaccess
    ├── favicon.ico
    ├── index.html
    ├── robots.txt
    ├── _data/
    │   └── site.json
    ├── _includes/
    │   ├── footer.html
    │   ├── header.html
    │   │── meta.html
    │   └── layouts/
    │       └── default.html
    └── assets/
        ├── fonts/
        ├── img/
        ├── js/
        │   ├── app.js
        │   ├── js-copy/
        │   └── vendor/
        └── scss/
            ├── app.scss
            ├── css-copy/
            └── vendor/
```

Before you start, have a look at these files for a better understanding how **Gulp Starter Kit** works:
- gulpfile.babel.js
- .eleventy.js
- config.yml
- package.json
- babel.config.js
- .eslintrc.js
- .stylelintrc.js
- .browserslistrc

It's recommended that you keep the folder structure as it is to avoid headaches :wink:. However you are free to rename the `fonts` & `img` folder as CSS & HTML are referring to them, but you need to modified the config.yml file.

`src/assets`  
Anything you put in here will be copied to `dist/assets` except for these folders:
- src/assets/js
- src/assets/img
- src/assets/scss

`src/assets/fonts`  
This folder contains the Font files of your project. Anything you put in here will be copied by default to `dist/assets/fonts`.

`src/assets/img`  
This folder contains the Image files of your project. Files with these extension `jpg,jpeg,png,gif,svg,webp` will be copied by default to `dist/assets/img`. In production only files with these extension are compressed: `jpg,jpeg,png,svg`.

`src/assets/js`  
This folder contains the JavaScript files of your project. By default only `app.js` will be compiled and the output folder is `dist/assets/js`.

`src/assets/js-copy`  
Any JS files in this folder will just be copied to `dist/assets/js`.

`src/assets/scss`  
This folder contains the SCSS files of your project. By default only `app.scss` will be compiled and the output folder is `dist/assets/css`.

`src/assets/css-copy`  
Any CSS files in this folder will just be copied to `dist/assets/css`.

`src/`  
This folder contains the HTML files of your project.  
**Please keep in mind that we are using Eleventy & Nunjucks.**

`src/_data`  
Any `.json` files in this folder will be added into a global data object available to all templates. [More information.](https://www.11ty.dev/docs/data-global/#global-data-files)

`src/_includes`  
This folder is meant for Eleventy layouts, include files, extends files, partials, or macros. [More information.](https://www.11ty.dev/docs/config/#directory-for-includes)

## FAQ
- [CSS prefix doesn't work in development](#css-prefix-doesnt-work-in-development)

### CSS prefix doesn't work in development
By default we only enable CSS prefix in production. If you really need to enable it in development, you can edit the `gulpfile.babel.js` file.
