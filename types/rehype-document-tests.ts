import unified = require('unified')
import document = require('rehype-document')

unified().use(document)
unified().use(document, {title: ''})
unified().use(document, {language: ''})
unified().use(document, {doctype: ''})
unified().use(document, {style: ''})
unified().use(document, {style: ['']})
unified().use(document, {css: ''})
unified().use(document, {css: ['']})
unified().use(document, {meta: {}})
unified().use(document, {meta: [{}]})
unified().use(document, {link: {}})
unified().use(document, {link: [{}]})
unified().use(document, {script: ''})
unified().use(document, {script: ['']})
unified().use(document, {js: ''})
unified().use(document, {js: ['']})