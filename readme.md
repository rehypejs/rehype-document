# rehype-document

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]

**[rehype][github-rehype]** plugin to wrap a fragment in a document.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`unified().use(rehypeDocument[, options])`](#unifieduserehypedocument-options)
  * [`Options`](#options)
* [Example](#example)
  * [Example: language and direction](#example-language-and-direction)
  * [Example: CSS](#example-css)
  * [Example: JS](#example-js)
  * [Example: metadata and links](#example-metadata-and-links)
* [Compatibility](#compatibility)
* [Security](#security)
* [Related](#related)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a [unified][github-unified] ([rehype][github-rehype])
plugin to wrap a fragment in a document.
It’s especially useful when going from a markdown file that represents an
article and turning it into a complete HTML document.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**rehype** adds support for HTML to unified.
**hast** is the HTML AST that rehype uses.
This is a rehype plugin that wraps a fragment in a document.

## When should I use this?

This project is useful when you want to turn a fragment
(specifically,
some nodes that can exist in a `<body>` element)
into a whole document
(a `<html>`, `<head>`, and `<body>`, where the latter will contain the
fragment).

This plugin can make fragments valid whole documents.
It’s not a (social) metadata manager.
That’s done by [`rehype-meta`][github-rehype-meta].
You can use both together.

## Install

This package is [ESM only][github-gist-esm].
In Node.js (version 16+),
install with [npm][npmjs-install]:

```sh
npm install rehype-document
```

In Deno with [`esm.sh`][esmsh]:

```js
import rehypeDocument from 'https://esm.sh/rehype-document@7'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import rehypeDocument from 'https://esm.sh/rehype-document@7?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
# Pluto

Pluto is a dwarf planet in the Kuiper belt.
```

…and a module `example.js` :

```js
import rehypeDocument from 'rehype-document'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {read} from 'to-vfile'
import {unified} from 'unified'

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument, {title: 'Pluto'})
  .use(rehypeStringify)
  .process(await read('example.md'))

console.log(String(file))
```

…then running `node example.js` yields:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Pluto</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
</head>
<body>
<h1>Pluto</h1>
<p>Pluto is a dwarf planet in the Kuiper belt.</p>
</body>
</html>
```

## API

This package exports no identifiers.
It exports the [TypeScript][] type [`Options`][api-options].
The default export is [`rehypeDocument`][api-rehype-document].

### `unified().use(rehypeDocument[, options])`

Wrap a fragment in a document.

###### Parameters

* `options` ([`Options`][api-options], optional)
  — configuration

###### Returns

Transform ([`Transformer`][github-unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

* `css`
  (`Array<string>` or `string`, optional)
  — URLs to stylesheets to use in `<link>`s
* `dir`
  (`'auto'`, `'ltr'`, or `'rtl'`, optional)
  — direction of the document
* `js`
  (`Array<string>` or `string`, optional)
  — URLs to scripts to use as `src` on `<script>`s
* `language`
  (`string`, default: `'en'`)
  — language of document; should be a [BCP 47][ietf-bcp47] language tag
* `link`
  (`Array<Properties>` or `Properties`, optional)
  — generate extra `<link>`s with these properties;
  passed as `properties` to [`hastscript`][github-hastscript] with `'link'`
* `meta`
  (`Array<Properties>` or `Properties`, optional)
  — generate extra `<meta>`s with these properties;
  passed as `properties` to [`hastscript`][github-hastscript] with `'meta'`
* `responsive`
  (`boolean`, default: `true`)
  — generate a `meta[viewport]`
* `script`
  (`Array<string>` or `string`, optional)
  — JavaScript source code of `<script>`s to add at end of `body`
* `style`
  (`Array<string>` or `string`, optional)
  — CSS source code of `<style>`s to add
* `title`
  (`string`, optional)
  — text to use as title;
  defaults to the file name (if any);
  can bet set with `file.data.matter.title`
  ([`vfile-matter`][github-vfile-matter])
  and `file.data.meta.title`
  ([`rehype-infer-title-meta`][github-rehype-infer-title-meta]),
  which are preferred

## Example

### Example: language and direction

This example shows how to set a language:

```js
import rehypeDocument from 'rehype-document'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

const file = await unified()
  .use(rehypeParse, {fragment: true})
  .use(rehypeDocument, {title: 'פּלוטאָ', language: 'yi', dir: 'rtl'})
  .use(rehypeStringify)
  .process('<h1>העלא, פּלוטאָ!</h1>')

console.log(String(file))
```

Yields:

```html
<!doctype html>
<html dir="rtl" lang="yi">
<head>
<meta charset="utf-8">
<title>פּלוטאָ</title>
<meta content="width=device-width, initial-scale=1" name="viewport">
</head>
<body>
<h1>העלא, פּלוטאָ!</h1>
</body>
</html>
```

### Example: CSS

This example shows how to reference CSS files and include stylesheets:

```js
import rehypeDocument from 'rehype-document'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

const file = await unified()
  .use(rehypeParse, {fragment: true})
  .use(rehypeDocument, {
    css: 'https://example.com/index.css',
    style: 'body { color: red }'
  })
  .use(rehypeStringify)
  .process('')

console.log(String(file))
```

Yields:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<style>body { color: red }</style>
<link href="https://example.com/index.css" rel="stylesheet">
</head>
<body>
</body>
</html>
```

### Example: JS

This example shows how to reference JS files and include scripts:

```js
import rehypeDocument from 'rehype-document'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

const file = await unified()
  .use(rehypeParse, {fragment: true})
  .use(rehypeDocument, {
    js: 'https://example.com/index.js',
    script: 'console.log(1)'
  })
  .use(rehypeStringify)
  .process('')

console.log(String(file))
```

Yields:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
</head>
<body>
<script>console.log(1)</script>
<script src="https://example.com/index.js"></script>
</body>
</html>
```

### Example: metadata and links

This example shows how to define metadata and include links (other than styles):

```js
import rehypeDocument from 'rehype-document'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

const file = await unified()
  .use(rehypeParse, {fragment: true})
  .use(rehypeDocument, {
    link: [
      {href: '/favicon.ico', rel: 'icon', sizes: 'any'},
      {href: '/icon.svg', rel: 'icon', type: 'image/svg+xml'}
    ],
    meta: [{content: 'rehype-document', name: 'generator'}]
  })
  .use(rehypeStringify)
  .process('')

console.log(String(file))
```

Yields:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta content="rehype-document" name="generator">
<link href="/favicon.ico" rel="icon" sizes="any">
<link href="/icon.svg" rel="icon" type="image/svg+xml">
</head>
<body>
</body>
</html>
```

> 💡 **Tip**:
> [`rehype-meta`][github-rehype-meta] is a (social) metadata manager.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release,
we drop support for unmaintained versions of Node.
This means we try to keep the current release line,
`rehype-document@7`,
compatible with Node.js 16.

This plugin works with `rehype-parse` version 3+,
`rehype-stringify` version 3+,
`rehype` version 5+,
and `unified` version 6+.

## Security

Use of `rehype-document` can open you up to a
[cross-site scripting (XSS)][wikipedia-xss]
attack if you pass user provided content in options.
Always be wary of user input and use
[`rehype-sanitize`][github-rehype-sanitize].

## Related

* [`rehype-meta`][github-rehype-meta]
  — add metadata to the head of a document
* [`rehype-format`](https://github.com/rehypejs/rehype-format)
  — format HTML
* [`rehype-minify`](https://github.com/rehypejs/rehype-minify)
  — minify HTML

## Contribute

See [`contributing.md`][health-contributing] in [`rehypejs/.github`][health]
for ways to get started.
See [`support.md`][health-support] for ways to get help.

This project has a [code of conduct][health-coc].
By interacting with this repository,
organization,
or community you agree to abide by its terms.

## License

[MIT][file-license] © [Titus Wormer][wooorm]

<!-- Definitions -->

[api-options]: #options

[api-rehype-document]: #unifieduserehypedocument-options

[badge-build-image]: https://github.com/rehypejs/rehype-document/workflows/main/badge.svg

[badge-build-url]: https://github.com/rehypejs/rehype-document/actions

[badge-coverage-image]: https://img.shields.io/codecov/c/github/rehypejs/rehype-document.svg

[badge-coverage-url]: https://codecov.io/github/rehypejs/rehype-document

[badge-downloads-image]: https://img.shields.io/npm/dm/rehype-document.svg

[badge-downloads-url]: https://www.npmjs.com/package/rehype-document

[badge-size-image]: https://img.shields.io/bundlejs/size/rehype-document

[badge-size-url]: https://bundlejs.com/?q=rehype-document

[esmsh]: https://esm.sh

[file-license]: license

[github-gist-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[github-hastscript]: https://github.com/syntax-tree/hastscript

[github-rehype]: https://github.com/rehypejs/rehype

[github-rehype-infer-title-meta]: https://github.com/rehypejs/rehype-infer-title-meta

[github-rehype-meta]: https://github.com/rehypejs/rehype-meta

[github-rehype-sanitize]: https://github.com/rehypejs/rehype-sanitize

[github-unified]: https://github.com/unifiedjs/unified

[github-unified-transformer]: https://github.com/unifiedjs/unified#transformer

[github-vfile-matter]: https://github.com/vfile/vfile-matter

[health]: https://github.com/rehypejs/.github

[health-coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[health-contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[health-support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[ietf-bcp47]: https://tools.ietf.org/html/bcp47

[npmjs-install]: https://docs.npmjs.com/cli/install

[typescript]: https://www.typescriptlang.org

[wikipedia-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[wooorm]: https://wooorm.com
