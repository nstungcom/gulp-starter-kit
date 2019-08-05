# Gulp Starter Kit Documentation

Quick and simple documentation (FAQ) to help you get started.

### I need IE 11 support, how can I enable it?

Look into `package.json` and search for `browserslist` add `"IE 11"`. It will look like this:

```json
  "browserslist": [
    "last 1 version",
    "IE 11"
  ],
```

### I need to copy other static files, how do I do that?

Look into `package.json` and search for `filesToCopyGlobs` e.g. pdf add `"pdf": "src/**/*.pdf"`. It will look like this:

```json
  "filesToCopyGlobs": {
    "fonts": "src/**/*.{eot,svg,ttf,woff,woff2}",
    "pdf": "src/**/*.pdf"
  },
```
