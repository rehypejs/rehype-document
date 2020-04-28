// Minimum TypeScript Version: 3.2
import {Plugin} from 'unified'

/**
 * Wrap a document around a fragment.
 */
declare const document: Plugin<[document.Options?]>

declare namespace document {
  interface Options {
    /**
     * Text to use as title
     *
     * default: name of file, if any
     */
    title?: string

    /**
     * Natural language of document.
     *
     * should be a [BCP 47](https://tools.ietf.org/html/bcp47) language tag.
     *
     * @default 'en'
     */
    language?: string

    /**
     * Whether to insert a `meta[viewport]`.
     *
     * @default true
     */
    responsive?: boolean

    /**
     * [Doctype](https://github.com/wooorm/doctype) to use.
     *
     * @default '5'
     */
    doctype?: string

    /**
     * CSS to include in `head` in `<style>` elements.
     *
     * @default []
     */
    style?: string | string[]

    /**
     * Links to stylesheets to include in `head`
     *
     * @default []
     */
    css?: string | string[]

    /**
     * Metadata to include in `head`.
     *
     * Each object is passed as
     * [`properties`](https://github.com/syntax-tree/hastscript#hselector-properties-children)
     * to [`hastscript`](https://github.com/syntax-tree/hastscript) with a
     * `meta` element.
     *
     * @default []
     */
    meta?: Record<string, any> | Array<Record<string, any>>

    /**
     * Link tags to include in `head`.
     *
     * Each object is passed as
     * [`properties`](https://github.com/syntax-tree/hastscript#hselector-properties-children)
     * to [`hastscript`](https://github.com/syntax-tree/hastscript) with a `link` element.
     *
     * @default []
     */
    link?: Record<string, any> | Array<Record<string, any>>

    /**
     * Inline scripts to include at end of `body`.
     *
     * @default []
     */
    script?: string | string[]

    /**
     * External scripts to include at end of `body`
     *
     * @default []
     */
    js?: string | string[]
  }
}

export = document
