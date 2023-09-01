export type {Options} from './lib/index.js'

export {default} from './lib/index.js'

declare module 'vfile' {
  interface DataMap {
    matter: {
      /**
       * Title of this document.
       *
       * Populated by `vfile-matter` from frontmatter; used by
       * `rehype-document` and `rehype-meta`.
       */
      title?: string
    }

    meta: {
      /**
       * Title of this document.
       *
       * Populated by `rehype-infer-title-meta` from the HTML; used by
       * `rehype-document` and `rehype-meta`.
       */
      title?: string
    }
  }
}
