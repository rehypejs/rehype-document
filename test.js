'use strict'

var test = require('tape')
var rehype = require('rehype')
var document = require('.')

test('document()', function(t) {
  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document)
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
    ].join('\n'),
    'should work'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {title: 'alpha'})
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
    ].join('\n'),
    'should support `title`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document)
      .processSync({path: '~/bravo.md', contents: 'charlie'})
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
    ].join('\n'),
    'should get `title` from `file.stem`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {language: 'en-GB'})
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
    ].join('\n'),
    'should support `language`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {responsive: false})
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
    ].join('\n'),
    'should support `responsive: false`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {doctype: 4})
      .processSync('')
      .toString(),
    [
      '<!doctype HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '</head>',
      '<body>',
      '</body>',
      '</html>',
      ''
    ].join('\n'),
    'should support `doctype`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {meta: {name: 'author', content: 'Jane'}})
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
    ].join('\n'),
    'should support `meta` as `object`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {
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
    ].join('\n'),
    'should support `meta` as `array`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {
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
    ].join('\n'),
    'should support `meta` without responsive'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {link: {rel: 'canonical', href: 'https://example.com'}})
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
    ].join('\n'),
    'should support `link` as `object`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {
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
    ].join('\n'),
    'should support `link` as `array`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {style: 'body {color: blue}'})
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
    ].join('\n'),
    'should support `style` as `string`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {style: ['body {color: blue}', 'a {color: red}']})
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
    ].join('\n'),
    'should support `style` as `array`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {css: 'delta.css'})
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
    ].join('\n'),
    'should support `css` as `string`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {css: ['echo.css', 'foxtrot.css']})
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
    ].join('\n'),
    'should support `css` as `Array.<string>`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {css: 'delta.css', style: 'a {color: red}'})
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
    ].join('\n'),
    'should inject `style` tags before `css`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {js: 'golf.js'})
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
    ].join('\n'),
    'should support `js` as `string`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {js: ['hotel.js', 'india.js']})
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
    ].join('\n'),
    'should support `js` as `Array.<string>`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {script: 'console.log("Hello");'})
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
    ].join('\n'),
    'should support `script` as `string`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {
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
    ].join('\n'),
    'should support `script` as `Array.<string>`'
  )

  t.equal(
    rehype()
      .data('settings', {fragment: true})
      .use(document, {js: 'world.js', script: 'console.log("Hello");'})
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
    ].join('\n'),
    'should inject `script` tags before `js`'
  )

  t.end()
})
