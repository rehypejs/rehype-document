import assert from 'node:assert/strict'
import test from 'node:test'
import {rehype} from 'rehype'
import rehypeDocument from './index.js'

test('rehypeDocument()', async function (t) {
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<html lang="en" dir="rtl">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        .use(rehypeDocument, {meta: {name: 'author', content: 'Jane'}})
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<meta name="author" content="Jane">',
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
            {name: 'author', content: 'Jane'},
            {property: 'og:type', content: 'article'}
          ]
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<meta name="author" content="Jane">',
        '<meta property="og:type" content="article">',
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
          responsive: false,
          meta: {name: 'author', content: 'Jane'}
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="author" content="Jane">',
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
          link: {rel: 'canonical', href: 'https://example.com'}
        })
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<link rel="canonical" href="https://example.com">',
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
            {rel: 'canonical', href: 'https://example.com'},
            {
              rel: 'alternate',
              href: '/feed.xml',
              type: 'application/atom+xml',
              title: 'Feed'
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<link rel="canonical" href="https://example.com">',
        '<link rel="alternate" href="/feed.xml" type="application/atom+xml" title="Feed">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<link rel="stylesheet" href="delta.css">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<link rel="stylesheet" href="echo.css">',
        '<link rel="stylesheet" href="foxtrot.css">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        '<style>a {color: red}</style>',
        '<link rel="stylesheet" href="delta.css">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
          Object.assign(this, {
            parser: () => ({
              type: 'element',
              tagName: 'a',
              properties: {id: 'a'},
              children: [{type: 'text', value: 'a'}]
            })
          })
        })
        .use(rehypeDocument)
        .processSync('')
        .toString(),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
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
