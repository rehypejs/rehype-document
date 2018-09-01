'use strict'

var u = require('unist-builder')
var h = require('hastscript')
var doctypes = require('doctype')

module.exports = document

function document(options) {
  var settings = options || {}
  var meta = settings.meta || []
  var link = settings.link || []
  var css = settings.css || []
  var js = settings.js || []

  if (!('length' in meta)) {
    meta = [meta]
  }

  if (settings.responsive !== false) {
    meta.unshift({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    })
  }

  if (!('length' in link)) {
    link = [link]
  }

  if (typeof css === 'string') {
    css = [css]
  }

  if (typeof js === 'string') {
    js = [js]
  }

  return transformer

  function transformer(tree, file) {
    var title = settings.title || file.stem
    var body = tree.children.concat()
    var head = [line(), h('meta', {charset: 'utf-8'})]
    var length
    var index

    if (body.length !== 0) {
      body.unshift(line())
    }

    if (title) {
      head.push(line(), h('title', [title]))
    }

    length = meta.length
    index = -1

    while (++index < length) {
      head.push(line(), h('meta', meta[index]))
    }

    length = link.length
    index = -1

    while (++index < length) {
      head.push(line(), h('link', link[index]))
    }

    length = css.length
    index = -1

    while (++index < length) {
      head.push(line(), h('link', {rel: 'stylesheet', href: css[index]}))
    }

    head.push(line())

    length = js.length
    index = -1

    while (++index < length) {
      body.push(line(), h('script', {src: js[index]}))
    }

    body.push(line())

    return u('root', [
      u('doctype', {name: doctypes(settings.doctype || 5)}),
      line(),
      h('html', {lang: settings.language || 'en'}, [
        line(),
        h('head', head),
        line(),
        h('body', body),
        line()
      ]),
      line()
    ])
  }
}

function line() {
  return u('text', '\n')
}
