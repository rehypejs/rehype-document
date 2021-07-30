import {doctype} from 'doctype'
import {h} from 'hastscript'

export default function rehypeDocument(options) {
  const settings = options || {}
  const meta = cast(settings.meta)
  const link = cast(settings.link)
  const styles = cast(settings.style)
  const css = cast(settings.css)
  const scripts = cast(settings.script)
  const js = cast(settings.js)

  if (settings.responsive !== false) {
    meta.unshift({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    })
  }

  return transformer

  function transformer(tree, file) {
    const title = settings.title || file.stem
    const contents = tree.type === 'root' ? tree.children.concat() : [tree]
    const head = [{type: 'text', value: '\n'}, h('meta', {charset: 'utf-8'})]
    let index = -1

    if (contents.length > 0) {
      contents.unshift({type: 'text', value: '\n'})
    }

    if (title) {
      head.push({type: 'text', value: '\n'}, h('title', [title]))
    }

    while (++index < meta.length) {
      head.push({type: 'text', value: '\n'}, h('meta', meta[index]))
    }

    index = -1

    while (++index < link.length) {
      head.push({type: 'text', value: '\n'}, h('link', link[index]))
    }

    // Inject style tags before linked CSS
    index = -1

    while (++index < styles.length) {
      head.push({type: 'text', value: '\n'}, h('style', styles[index]))
    }

    index = -1

    while (++index < css.length) {
      head.push(
        {type: 'text', value: '\n'},
        h('link', {rel: 'stylesheet', href: css[index]})
      )
    }

    head.push({type: 'text', value: '\n'})

    // Inject script tags before linked JS
    index = -1

    while (++index < scripts.length) {
      contents.push({type: 'text', value: '\n'}, h('script', scripts[index]))
    }

    index = -1

    while (++index < js.length) {
      contents.push({type: 'text', value: '\n'}, h('script', {src: js[index]}))
    }

    contents.push({type: 'text', value: '\n'})

    return {
      type: 'root',
      children: [
        {type: 'doctype', name: doctype(settings.doctype || 5)},
        {type: 'text', value: '\n'},
        h('html', {lang: settings.language || 'en'}, [
          {type: 'text', value: '\n'},
          h('head', head),
          {type: 'text', value: '\n'},
          h('body', contents),
          {type: 'text', value: '\n'}
        ]),
        {type: 'text', value: '\n'}
      ]
    }
  }
}

function cast(value) {
  return value === null || value === undefined
    ? []
    : typeof value === 'string' || !('length' in value)
    ? [value]
    : value
}
