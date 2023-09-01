/**
 * @typedef {import('hast').Element} Element
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {rehype} from 'rehype'
import rehypeDocument from './index.js'

test('rehypeDocument()', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should work', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument)
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `title`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {title: 'alpha'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<title>alpha</title>',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should get `title` from `file.stem`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument)
        .processSync({path: '~/bravo.md', value: 'charlie'})
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<title>bravo</title>',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        'charlie',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `language`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {language: 'en-GB'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en-GB">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `dir`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {dir: 'rtl'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html dir="rtl" lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `responsive: false`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {responsive: false})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `meta` as `object`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {meta: {content: 'Jane', name: 'author'}})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<meta content="Jane" name="author">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `meta` as `array`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          meta: [
            {content: 'Jane', name: 'author'},
            {content: 'article', property: 'og:type'}
          ]
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<meta content="Jane" name="author">',
        '<meta content="article" property="og:type">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `meta` without responsive', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          meta: {content: 'Jane', name: 'author'},
          responsive: false
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="Jane" name="author">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `link` as `object`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          link: {href: 'https://example.com', rel: 'canonical'}
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<link href="https://example.com" rel="canonical">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `link` as `array`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          link: [
            {href: 'https://example.com', rel: 'canonical'},
            {
              href: '/feed.xml',
              rel: 'alternate',
              title: 'Feed',
              type: 'application/atom+xml'
            }
          ]
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<link href="https://example.com" rel="canonical">',
        '<link href="/feed.xml" rel="alternate" title="Feed" type="application/atom+xml">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `style` as `string`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {style: 'body {color: blue}'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<style>body {color: blue}</style>',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `style` as `array`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          style: ['body {color: blue}', 'a {color: red}']
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<style>body {color: blue}</style>',
        '<style>a {color: red}</style>',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `css` as `string`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {css: 'delta.css'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<link href="delta.css" rel="stylesheet">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `css` as `Array<string>`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {css: ['echo.css', 'foxtrot.css']})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<link href="echo.css" rel="stylesheet">',
        '<link href="foxtrot.css" rel="stylesheet">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should inject `style` tags before `css`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {css: 'delta.css', style: 'a {color: red}'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '<style>a {color: red}</style>',
        '<link href="delta.css" rel="stylesheet">',
        '</head>',
        '<body>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `js` as `string`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {js: 'golf.js'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<script src="golf.js"></script>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `js` as `Array<string>`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {js: ['hotel.js', 'india.js']})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<script src="hotel.js"></script>',
        '<script src="india.js"></script>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `script` as `string`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {script: 'console.log("Hello");'})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<script>console.log("Hello");</script>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should support `script` as `Array<string>`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          script: ['console.log("Hello");', 'console.log("World");']
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<script>console.log("Hello");</script>',
        '<script>console.log("World");</script>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should inject `script` tags before `js`', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument, {
          js: 'world.js',
          script: 'console.log("Hello");'
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<script>console.log("Hello");</script>',
        '<script src="world.js"></script>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should wrap a root', async function () {
    assert.equal(
      rehype()
        .data('settings', {fragment: true})
        .use(rehypeDocument)
        .processSync('<a>a</a><b>b</b>')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<a>a</a><b>b</b>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })

  await t.test('should wrap an element', async function () {
    assert.equal(
      rehype()
        .use(function () {
          // @ts-expect-error: TypeScript is bad at `this`.
          // eslint-disable-next-line unicorn/no-this-assignment
          const self = /** @type {import('unified').Processor<Element>} */ (
            this
          )

          /** @type {import('unified').Parser<Element>} */
          self.parser = function () {
            /** @type {Element} */
            const node = {
              type: 'element',
              tagName: 'a',
              properties: {id: 'a'},
              children: [{type: 'text', value: 'a'}]
            }

            return node
          }
        })
        .use(rehypeDocument)
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta content="width=device-width, initial-scale=1" name="viewport">',
        '</head>',
        '<body>',
        '<a id="a">a</a>',
        '</body>',
        '</html>',
        ''
      ].join('\n')
    )
  })
})
