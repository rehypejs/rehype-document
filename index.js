/**
 * @typedef {import('hast').ElementContent} ElementContent
 * @typedef {import('hast').Nodes} Nodes
 * @typedef {import('hast').Root} Root
 *
 * @typedef {import('hastscript').Properties} Properties
 *
 * @typedef {import('vfile').VFile} VFile
 */

/**
 * @typedef Options
 *   Configuration.
 * @property {Array<string> | string | null | undefined} [css]
 *   URLs to stylesheets to use in `<link>`s (optional).
 * @property {'auto' | 'ltr' | 'rtl' | null | undefined} [dir]
 *   Direction of the document (optional).
 * @property {Array<string> | string | null | undefined} [js]
 *   URLs to scripts to use as `src` on `<script>`s (optional).
 * @property {string | null | undefined} [language='en']
 *   Language of document (default: `'en'`); should be a
 *   [BCP 47](https://tools.ietf.org/html/bcp47) language tag.
 * @property {Array<Properties> | Properties | null | undefined} [link]
 *   Generate extra `<link>`s with these properties (optional); passed as
 *   `properties` to [`hastscript`](https://github.com/syntax-tree/hastscript)
 *   with `'link'`.
 * @property {Array<Properties> | Properties | null | undefined} [meta]
 *   Generate extra `<meta>`s with these properties (optional); passed as
 *   `properties` to [`hastscript`](https://github.com/syntax-tree/hastscript)
 *   with `'meta'`.
 * @property {boolean | null | undefined} [responsive=true]
 *   Generate a `meta[viewport]` (default: `true`).
 * @property {Array<string> | string | null | undefined} [script]
 *   JavaScript source code of `<script>`s to add at end of `body` (optional).
 * @property {Array<string> | string | null | undefined} [style]
 *   CSS source code of `<style>`s to add (optional).
 * @property {string | null | undefined} [title]
 *   Text to use as title (optional); defaults to the file name (if any).
 */

import {h} from 'hastscript'

/** @type {Options} */
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
  const dir = settings.dir
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
   * @param {Root} tree
   *   New tree.
   */
  return function (tree, file) {
    const titleText = title || file.stem
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
        h('html', {dir, lang: language}, [
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
 * @param {Array<Thing> | Thing | null | undefined} value
 *   Value to cast.
 * @returns {Array<Thing>}
 *   List.
 */
function toList(value) {
  return value === null || value === undefined
    ? []
    : Array.isArray(value)
    ? value
    : [value]
}
