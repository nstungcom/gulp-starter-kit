# Gulp Starter Kit Documentation

Quick and simple documentation to help you get started.

## Folder structure
Once downloaded, unzip the compressed folder or cloned you'll see something like this:
```
gulp-starter-kit
├── .browserslistrc
├── babel.config.js
├── config.yml
├── gulpfile.babel.js
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── docs
│   ├── README.md
│   └── recipes
│       ├── README.md
│       ├── ...
└── src
    ├── assets
    │   ├── fonts
    │   ├── img
    │   ├── js
    │   │   ├── app.js
    │   │   └── vendor
    │   └── scss
    │       ├── app.scss
    │       └── vendor
    ├── data
    │   └── data.yaml
    └── pages
        ├── index.html
        ├── layouts
        │   └── default.html
        ├── macros
        └── partials
```

Before you start, have a look at these files for a better understanding how **Gulp Starter Kit** works:
- babel.config.js
- .browserslistrc
- config.yml
- gulpfile.babel.js
- package.json

It's recommended that you keep the folder structure as it is to avoid headaches :wink:. However you are free to rename the `fonts` & `img` folder as CSS & HTML are referring to them, but you need to modified the config.yml file.

`src/assets`  
Anything you put in here will be copied to `dist/assets` except for these folders:
- src/assets/js
- src/assets/img
- src/assets/scss

`src/assets/fonts`  
This folder contains the Font files of your project. Anything you put in here will be copied by default to `dist/assets/fonts`.

`src/assets/img`  
This folder contains the Image files of your project. Anything you put in here will be copied by default to `dist/assets/img`. In production only these files are compressed: `gif,jpg,jpeg,png,svg`.

`src/assets/js`  
This folder contains the JavaScript files of your project. By default only `app.js` will be compiled and the output folder is `dist/assets/js`.

`src/assets/scss`  
This folder contains the SCSS files of your project. By default only `app.scss` will be compiled and the output folder is `dist/assets/css`.

`src/pages`  
This folder contains the HTML files of your project. Any HTML files in
 this folder will be compiled and copied to `dist` except for these folders: `layouts`, `macros` & `partials`.  
**Please notice that we are using Nunjucks.**

`src/data/data.yml`  
You can use this file to define reuseable data for Nunjucks to speed up your development.

## FAQ
- [CSS prefix doesn't work in development](#css-prefix-doesnt-work-in-development)

### CSS prefix doesn't work in development
By default we only enable CSS prefix in production. If you really need to enable it in development, you can edit the `gulpfile.babel.js` file.
