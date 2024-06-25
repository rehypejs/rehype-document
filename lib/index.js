/**
 * @import {ElementContent, Nodes, Root} from 'hast'
 * @import {Options} from 'rehype-document'
 * @import {VFile} from 'vfile'
 */

import {h} from 'hastscript'

/** @type {Readonly<Options>} */
const emptyOptions = {}

/**
 * Wrap a fragment in a document.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeDocument(options) {
  const settings = options || emptyOptions
  const css = toList(settings.css)
  const direction = settings.dir
  const js = toList(settings.js)
  const language = settings.language || 'en'
  const link = toList(settings.link)
  let meta = toList(settings.meta)
  const script = toList(settings.script)
  const style = toList(settings.style)
  const title = settings.title

  if (settings.responsive !== false) {
    meta = [
      {content: 'width=device-width, initial-scale=1', name: 'viewport'},
      ...meta
    ]
  }

  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {Root}
   *   New tree.
   */
  return function (tree, file) {
    const titleText =
      file.data.meta?.title || file.data.matter?.title || title || file.stem
    /** @type {Array<Nodes>} */
    const contents = tree.type === 'root' ? [...tree.children] : [tree]
    /** @type {Array<ElementContent>} */
    const head = [{type: 'text', value: '\n'}, h('meta', {charSet: 'utf-8'})]
    let index = -1

    if (contents.length > 0) {
      contents.unshift({type: 'text', value: '\n'})
    }

    if (titleText) {
      head.push({type: 'text', value: '\n'}, h('title', titleText))
    }

    while (++index < meta.length) {
      head.push({type: 'text', value: '\n'}, h('meta', meta[index]))
    }

    index = -1

    while (++index < link.length) {
      head.push({type: 'text', value: '\n'}, h('link', link[index]))
    }

    // Inject style tags after linked CSS
    index = -1

    while (++index < style.length) {
      head.push({type: 'text', value: '\n'}, h('style', style[index]))
    }

    index = -1

    while (++index < css.length) {
      head.push(
        {type: 'text', value: '\n'},
        h('link', {href: css[index], rel: 'stylesheet'})
      )
    }

    head.push({type: 'text', value: '\n'})

    // Inject script tags before linked JS
    index = -1

    while (++index < script.length) {
      contents.push({type: 'text', value: '\n'}, h('script', script[index]))
    }

    index = -1

    while (++index < js.length) {
      contents.push({type: 'text', value: '\n'}, h('script', {src: js[index]}))
    }

    contents.push({type: 'text', value: '\n'})

    return {
      type: 'root',
      children: [
        {type: 'doctype'},
        {type: 'text', value: '\n'},
        h('html', {dir: direction, lang: language}, [
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

/**
 * Cast `value` to a list.
 *
 * @template Thing
 *   Value kind.
 * @param {ReadonlyArray<Thing> | Thing | null | undefined} value
 *   Value to cast.
 * @returns {Array<Thing>}
 *   List.
 */
function toList(value) {
  return value === null || value === undefined
    ? []
    : Array.isArray(value)
      ? [...value]
      : [value]
}
