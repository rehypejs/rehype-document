# rehype-document

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**rehype**][rehype] plugin to wrap a document around a fragment.

## Install

[npm][]:

```sh
npm install rehype-document
```

## Use

Say `example.md` looks as follows:

```markdown
## Hello world!

This is **my** document.
```

…and `example.js` like this:

```js
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

Text to use as title (`string`, default: name of file, if any).

###### `options.language`

Natural language of document (`string`, default: `'en'`).
should be a [BCP 47][bcp47] language tag.

###### `options.responsive`

Whether to insert a `meta[viewport]` (`boolean`, default: `true`).

###### `options.doctype`

[Doctype][] to use (`string`, default: `'5'`).

###### `options.style`

CSS to include in `head` in `<style>` elements (`string` or `Array.<string>`,
default: `[]`).

###### `options.css`

Links to stylesheets to include in `head` (`string` or `Array.<string>`,
default: `[]`).

###### `options.meta`

Metadata to include in `head` (`Object` or `Array.<Object>`, default: `[]`).
Each object is passed as [`properties`][props] to [`hastscript`][h] with a
`meta` element.

###### `options.link`

Link tags to include in `head` (`Object` or `Array.<Object>`, default: `[]`).
Each object is passed as [`properties`][props] to [`hastscript`][h] with a
`link` element.

###### `options.script`

Inline scripts to include at end of `body` (`string` or `Array.<string>`,
default: `[]`).

###### `options.js`

External scripts to include at end of `body` (`string` or `Array.<string>`,
default: `[]`).

## Security

Use of `rehype-document` can open you up to a [cross-site scripting (XSS)][xss]
attack if you pass user provided content in options.

Always be wary of user input and use [`rehype-sanitize`][sanitize].

## Related

*   [`rehype-meta`](https://github.com/rehypejs/rehype-meta)
    — Add metadata to the head of a document
*   [`rehype-format`](https://github.com/rehypejs/rehype-format)
    — Format HTML
*   [`rehype-minify`](https://github.com/rehypejs/rehype-minify)
    — Minify HTML

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-document.svg

[build]: https://travis-ci.org/rehypejs/rehype-document

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-document.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-document

[downloads-badge]: https://img.shields.io/npm/dm/rehype-document.svg

[downloads]: https://www.npmjs.com/package/rehype-document

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-document.svg

[size]: https://bundlephobia.com/result?p=rehype-document

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/master/contributing.md

[support]: https://github.com/rehypejs/.github/blob/master/support.md

[coc]: https://github.com/rehypejs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[doctype]: https://github.com/wooorm/doctype

[bcp47]: https://tools.ietf.org/html/bcp47

[props]: https://github.com/syntax-tree/hastscript#hselector-properties-children

[h]: https://github.com/syntax-tree/hastscript

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[sanitize]: https://github.com/rehypejs/rehype-sanitize
