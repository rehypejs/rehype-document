import type {Properties} from 'hastscript'

export {default} from './lib/index.js'

/**
 * Fields supported by `rehype-document`.
 */
interface DocumentFields {
  /**
   * Title of the document
   * (optional,
   * example: `'The New York City Subway Map as You’ve Never Seen It Before'`).
   *
   * Inferred by `rehype-infer-title-meta` from HTML or `vfile-matter` from
   * frontmatter.
   * Used by `rehype-document` and `rehype-meta`.
   */
  title?: string | null | undefined
}

/**
 * Configuration.
 */
export interface Options {
  /**
   * URLs to stylesheets to use in `<link>`s (optional).
   */
  css?: ReadonlyArray<string> | string | null | undefined

  // To do: next major: rename to `direction`?
  /**
   * Direction of the document (optional).
   */
  dir?: 'auto' | 'ltr' | 'rtl' | null | undefined

  /**
   * URLs to scripts to use as `src` on `<script>`s (optional).
   */
  js?: ReadonlyArray<string> | string | null | undefined

  /**
   * Language of document
   * (default: `'en'`);
   * should be a [BCP 47](https://tools.ietf.org/html/bcp47) language tag.
   */
  language?: string | null | undefined

  /**
   * Generate extra `<link>`s with these properties
   * (optional);
   * passed as `properties` to
   * [`hastscript`](https://github.com/syntax-tree/hastscript) with `'link'`.
   */
  link?:
    | ReadonlyArray<Readonly<Properties>>
    | Readonly<Properties>
    | null
    | undefined

  /**
   * Generate extra `<meta>`s with these properties
   * (optional);
   * passed as `properties` to
   * [`hastscript`](https://github.com/syntax-tree/hastscript) with `'meta'`.
   */
  meta?:
    | ReadonlyArray<Readonly<Properties>>
    | Readonly<Properties>
    | null
    | undefined

  /**
   * Generate a `meta[viewport]`
   * (default: `true`).
   */
  responsive?: boolean | null | undefined

  /**
   * JavaScript source code of `<script>`s to add at end of `body`
   * (optional).
   */
  script?: ReadonlyArray<string> | string | null | undefined

  /**
   * CSS source code of `<style>`s to add
   * (optional).
   */
  style?: ReadonlyArray<string> | string | null | undefined

  /**
   * Text to use as title
   * (optional);
   * defaults to the file name (if any);
   * can bet set with `file.data.matter.title`
   * (`vfile-matter`)
   * and `file.data.meta.title`
   * (`rehype-infer-title-meta`),
   * which are preferred.
   */
  title?: string | null | undefined
}

// Add custom data supported when `rehype-document` is added.
declare module 'vfile' {
  interface DataMapMatter extends DocumentFields {}
  interface DataMapMeta extends DocumentFields {}

  interface DataMap {
    matter: DataMapMatter
    meta: DataMapMeta
  }
}
