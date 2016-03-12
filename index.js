'use strict';

const gunzipMaybe = require('gunzip-maybe');
const fstream     = require('fstream');
const pify        = require('pify');
const mkdirp      = pify(require('mkdirp'));

// rewired in test
let which = pify(require('which'));
let execa = require('execa');
let tar   = require('tar-fs');

let hasBinaryTar = function () {
    if (process.platform === 'win32')
        return Promise.reject();
    else return which('tar');
};

/**
 * Extract using built-in tar binary with the node.js implementation as a fallback
 * @param {string} archive
 * @param {string} extractTo
 * @returns {Promise.<T>}
 */
const extrakt = function (archive, extractTo) {
    return hasBinaryTar()
        .then(() => true, () => false)
        .then(hasTar => {
            return hasTar ? extrakt.system(archive, extractTo) : extrakt.native(archive, extractTo);
        });
};

/**
 * Extract using the system's built-in tar binary
 * @param {string} archive
 * @param {string} extractTo
 * @returns {Promise}
 */
extrakt.system = function (archive, extractTo) {
    return mkdirp(extractTo).then(() => execa('tar', ['-xvf', archive, '-C', extractTo]));
};

/**
 * Extract using the tar-fs module
 * @param {string} archive
 * @param {string} extractTo
 * @returns {Promise}
 */
extrakt.native = function (archive, extractTo) {
    let extract = tar.extract(extractTo);
    fstream
        .Reader(archive)
        .pipe(gunzipMaybe())
        .pipe(extract);
    return new Promise((resolve, reject) => {
        extract.on('finish', resolve);
        extract.on('error', reject);
    });
};

module.exports = extrakt;