'use strict';

// rewired in test
let hasbin = require('hasbin');

const gunzipMaybe = require('gunzip-maybe');
const execa       = require('execa');
const tar         = require('tar-fs');
const fstream     = require('fstream');
const mkdirp      = require('mkdirp');
const pify        = require('pify');

const hasbinAsPromised = binary => new Promise((resolve) => hasbin(binary, resolve));

const extrakt = function (archive, extractTo) {
    return hasbinAsPromised('tar').then(hasTar => {
        return hasTar ? extrakt.system(archive, extractTo) : extrakt.native(archive, extractTo);
    });
};

extrakt.system = function (archive, extractTo) {
    return pify(mkdirp)(extractTo)
        .then(() => execa('tar', ['-xvf', archive, '-C', extractTo]));
};

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