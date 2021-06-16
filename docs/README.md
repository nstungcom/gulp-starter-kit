# Gulp Starter Kit Documentation

Quick and simple documentation to help you get started.

## Folder structure

Once downloaded, unzip the compressed folder or cloned you'll see something like this:

```
gulp-starter-kit/
├── .babelrc.js
├── .browserslistrc
├── .editorconfig
├── .eleventy.js
├── .eslintrc.js
├── .prettierrc.js
├── .stylelintrc.js
├── config.js
├── gulpfile.js
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
    ├── index.html
    ├── _data/
    │   └── site.json
    ├── _includes/
    │   ├── footer.html
    │   ├── header.html
    │   │── meta.html
    │   └── layouts/
    │       └── default.html
    └── assets/
        ├── css/
        │   ├── app.scss
        │   ├── css-copy/
        │   └── vendor/
        ├── fonts/
        ├── img/
        └── js/
            ├── app.js
            ├── js-copy/
            └── vendor/
```

Before you start, have a look at these files for a better understanding how **Gulp Starter Kit** works:

- .babelrc.js
- .browserslistrc
- .editorconfig
- .eleventy.js
- .eslintrc.js
- .prettierrc.js
- .stylelintrc.js
- config.js
- gulpfile.js
- package.json

It's recommended that you keep the folder structure as it is to avoid headaches :wink:. However you are free to rename the folders to your need but modify are needed.

`src/assets`  
Anything you put in here will be copy to `dist/assets` except for these folders:

- src/assets/js
- src/assets/img
- src/assets/css

`src/assets/fonts`  
This folder contains the Font files of your project. Anything you put in here will be copy by default to `dist/assets/fonts`.

`src/assets/img`  
This folder contains the Image files of your project. Files with these extension `jpg,jpeg,png,gif,svg,webp` will be copy by default to `dist/assets/img`. In production, only files with these extension are compressed: `jpg,jpeg,png,svg`.

`src/assets/js`  
This folder contains the JavaScript files of your project. By default only `app.js` will be compiled and the output folder is `dist/assets/js`.

`src/assets/js-copy`  
Any JS files in this folder will just be copy to `dist/assets/js`.

`src/assets/css`  
This folder contains the SCSS & CSS files of your project. By default only `app.scss` will be compiled and the output folder is `dist/assets/css`.

`src/assets/css-copy`  
Any CSS files in this folder will be copy to `dist/assets/css` and when `prodcution` flag ist set, prefixes will apply except for files with `*.min.css` prefix.

`src/`  
This folder contains the HTML files of your project. You can use these files extension `.njk, .html, .md`.  
**Please keep in mind that we are using Eleventy & Nunjucks.**

`src/_data`  
Any `.json` files in this folder will be added into a global data object available to all templates. [More information.](https://www.11ty.dev/docs/data-global/#global-data-files)

`src/_includes`  
This folder is meant for Eleventy layouts, include files, extends files, partials or macros. [More information.](https://www.11ty.dev/docs/config/#directory-for-includes)
