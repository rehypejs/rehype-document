export type {Options} from './lib/index.js'

export {default} from './lib/index.js'

interface DocumentFields {
  /**
   * Title of the document (optional, example: `'The New York City Subway Map
   * as You’ve Never Seen It Before'`).
   *
   * Inferred by `rehype-infer-title-meta` from HTML or `vfile-matter` from
   * frontmatter.
   * Used by `rehype-document` and `rehype-meta`.
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
