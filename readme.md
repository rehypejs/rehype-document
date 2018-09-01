# rehype-document [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Wrap a document around HTML with [**rehype**][rehype].

## Installation

[npm][]:

```bash
npm install rehype-document
```

## Usage

Say `example.md` looks as follows:

```markdown
## Hello world!

This is **my** document.
```

...and `example.js` like this:

```javascript
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('remark-parse')
var mutate = require('remark-rehype')
var stringify = require('rehype-stringify')
var doc = require('rehype-document')

unified()
  .use(parse)
  .use(mutate)
  .use(doc, {title: 'Hi!'})
  .use(stringify)
  .process(vfile.readSync('example.md'), function(err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
example.md: no issues found
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

Wrap a document around a fragment.

##### `options`

###### `options.title`

`string`, default: name of file, if any — Text to use as title.

###### `options.language`

`string`, default: `'en'` — Natural language of document (BCP 47).

###### `options.responsive`

`boolean`, default: `true` — Whether to insert a `meta[viewport]`.

###### `options.doctype`

`string`, default: `'5'` — [Doctype][doctype] to use.

###### `options.css`

`string` or `Array.<string>`, default: `[]` — Stylesheets to include in `head`.

###### `options.meta`

`Object` or `Array.<Object>`, default: `[]` — Metadata to include in `head`.
Each object is passed as [`properties`][props] to [`hastscript`][h] with a `meta`
element.

###### `options.link`

`Object` or `Array.<Object>`, default: `[]` — Link tags to include in `head`.
Each object is passed as [`properties`][props] to [`hastscript`][h] with a `link`
element.

###### `options.js`

`string` or `Array.<string>`, default: `[]` — Scripts to include at end of
`body`.

## Related

*   [`rehype-format`](https://github.com/rehypejs/rehype-format)
    — Format HTML
*   [`rehype-minify`](https://github.com/rehypejs/rehype-minify)
    — Minify HTML

## Contribute

See [`contributing.md` in `rehypejs/rehype`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/rehypejs/rehype-document.svg

[travis]: https://travis-ci.org/rehypejs/rehype-document

[codecov-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-document.svg

[codecov]: https://codecov.io/github/rehypejs/rehype-document

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: http://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[doctype]: https://github.com/wooorm/doctype

[contributing]: https://github.com/rehypejs/rehype/blob/master/contributing.md

[coc]: https://github.com/rehypejs/rehype/blob/master/code-of-conduct.md

[props]: https://github.com/syntax-tree/hastscript#hselector-properties-children

[h]: https://github.com/syntax-tree/hastscript
