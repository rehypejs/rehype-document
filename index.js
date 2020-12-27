'use strict'

var u = require('unist-builder')
var h = require('hastscript')
var doctypes = require('doctype')

module.exports = document

function document(options) {
  var settings = options || {}
  var meta = cast(settings.meta)
  var link = cast(settings.link)
  var styles = cast(settings.style)
  var css = cast(settings.css)
  var scripts = cast(settings.script)
  var js = cast(settings.js)

  if (settings.responsive !== false) {
    meta.unshift({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    })
  }

  return transformer

  function transformer(tree, file) {
    var title = settings.title || file.stem
    var contents = tree.type === 'root' ? tree.children.concat() : [tree]
    var head = [line(), h('meta', {charset: 'utf-8'})]
    var length
    var index

    if (contents.length > 0) {
      contents.unshift(line())
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

    // Inject style tags before linked CSS
    length = styles.length
    index = -1

    while (++index < length) {
      head.push(line(), h('style', styles[index]))
    }

    length = css.length
    index = -1

    while (++index < length) {
      head.push(line(), h('link', {rel: 'stylesheet', href: css[index]}))
    }

    head.push(line())

    // Inject script tags before linked JS
    length = scripts.length
    index = -1

    while (++index < length) {
      contents.push(line(), h('script', scripts[index]))
    }

    length = js.length
    index = -1

    while (++index < length) {
      contents.push(line(), h('script', {src: js[index]}))
    }

    contents.push(line())

    return u('root', [
      u('doctype', {name: doctypes(settings.doctype || 5)}),
      line(),
      h('html', {lang: settings.language || 'en'}, [
        line(),
        h('head', head),
        line(),
        h('body', contents),
        line()
      ]),
      line()
    ])
  }
}

function line() {
  return u('text', '\n')
}

function cast(value) {
  if (value === null || value === undefined) {
    return []
  }

  return typeof value === 'string' || !('length' in value) ? [value] : value
}
