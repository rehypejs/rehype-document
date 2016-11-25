# rehype-document [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Wrap a document around HTML with [**rehype**][rehype].

## Installation

[npm][]:

```bash
npm install rehype-document
```

## Usage

```javascript
var unified = require('unified');
var parse = require('remark-parse');
var mutate = require('remark-rehype');
var stringify = require('rehype-stringify');
var document = require('rehype-document');

process.stdin
    .pipe(unified())
    .use(parse)
    .use(mutate)
    .use(document, {title: 'Hi!'})
    .use(stringify)
    .on('error', console.log)
    .pipe(process.stdout);
```

When the following is given on **stdin**(4):

```md
## Hello world!

This is **my** document.
```

Yields the following on **stdout**(4):

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Hi!</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<h2>Hello world!</h2>
<p>This is <strong>my</strong> document.</p>
</body>
</html>
```

## API

### `rehype().use(document[, options])`

###### `options`

*   `title` (`string`, default: name of file, if any)
    — Text to use as title;
*   `language` (`string`, default: `'en'`)
    — Natural language of document (BCP 47);
*   `responsive` (`boolean`, default: `true`)
    — Whether to insert a `meta[viewport]`;
*   `doctype` (`string`, default: `'5'`)
    — [Doctype][doctype] to use;
*   `css` (`string` or `Array.<string>`, default: `[]`)
    — Stylesheets to include in `head`;
*   `js` (`string` or `Array.<string>`, default: `[]`)
    — Scripts to include at end of `body`.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/rehype-document.svg

[travis]: https://travis-ci.org/wooorm/rehype-document

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/rehype-document.svg

[codecov]: https://codecov.io/github/wooorm/rehype-document

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[rehype]: https://github.com/wooorm/rehype

[doctype]: https://github.com/wooorm/doctype
