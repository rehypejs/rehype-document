'use strict';

var test = require('tape');
var rehype = require('rehype');
var document = require('./index.js');

test('document()', function (t) {
  t.equal(
    rehype().use(document).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document, {title: 'alpha'}).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document).process({filename: 'bravo', contents: 'charlie'}, {fragment: true}).toString(),
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
    'should get `title` from `file.filename`'
  );

  t.equal(
    rehype().use(document, {language: 'en-GB'}).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document, {responsive: false}).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document, {doctype: 4}).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document, {css: 'delta.css'}).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document, {css: ['echo.css', 'foxtrot.css']}).process('', {fragment: true}).toString(),
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
  );

  t.equal(
    rehype().use(document, {js: 'golf.js'}).process('', {fragment: true}).toString(),
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
    'should support `css` as `string`'
  );

  t.equal(
    rehype().use(document, {js: ['hotel.js', 'india.js']}).process('', {fragment: true}).toString(),
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
    'should support `css` as `Array.<string>`'
  );

  t.end();
});
