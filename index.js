/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module rehype:document
 * @fileoverview Wrap a document around the syntax tree.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies */
var u = require('unist-builder');
var h = require('hastscript');
var doctypes = require('doctype');

/** Create a newline. */
function line() {
    return u('text', '\n');
}

/**
 * Attacher.
 *
 * @param {Unified} origin - Origin processor.
 * @param {Object} [options={}] - Configuration.
 * @return {Function} - Transformer.
 */
function attacher(origin, options) {
    var settings = options || {};
    var css = settings.css || [];
    var js = settings.js || [];

    if (typeof css === 'string') {
        css = [css];
    }

    if (typeof js === 'string') {
        js = [js];
    }

    return function (tree, file) {
        var title = settings.title || file.filename;
        var body = tree.children.concat();
        var head = [line(), h('meta', { charset: 'utf-8' })];
        var length;
        var index;

        if (body.length) {
            body.unshift(line());
        }

        if (title) {
            head.push(line(), h('title', [title]));
        }

        if (settings.responsive !== false) {
            head.push(line(), h('meta', {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }));
        }

        length = css.length;
        index = -1;

        while (++index < length) {
            head.push(line(), h('link', {
                rel: 'stylesheet',
                href: css[index]
            }))
        }

        head.push(line());

        length = js.length;
        index = -1;

        while (++index < length) {
            body.push(line(), h('script', { src: js[index] }))
        }

        body.push(line());

        return u('root', [
            u('directive', {
                name: '!doctype'
            }, '!doctype ' + doctypes(settings.doctype || 5)),
            line(),
            h('html', { lang: settings.language || 'en' }, [
                line(),
                h('head', head),
                line(),
                h('body', body),
                line()
            ]),
            line()
        ])
    };
}

/* Expose. */
module.exports = attacher;
