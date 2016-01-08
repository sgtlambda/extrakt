'use strict';

const gunzipMaybe = require('gunzip-maybe');
const fstream     = require('fstream');
const pify        = require('pify');
const mkdirp      = pify(require('mkdirp'));
const which       = pify(require('which'));

// rewired in test
let exec = require('child-process-promise').exec;
let tar  = require('tar-fs');

let hasBinaryTar = function () {
    if (process.platform === 'win32')
        return Promise.reject();
    else return which('tar');
};

const extrakt = function (archive, extractTo) {
    return hasBinaryTar()
        .then(() => true, () => false)
        .then(hasTar => {
            return hasTar ? extrakt.system(archive, extractTo) : extrakt.native(archive, extractTo);
        });
};

extrakt.system = function (archive, extractTo) {
    return mkdirp(extractTo).then(() => exec(['tar', '-xvf', archive, '-C', extractTo].join(' ')));
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