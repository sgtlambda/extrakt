'use strict';

const WritableStream = require('stream').Writable;

module.exports = tarExtract => {
    return {
        extract: dest => {
            tarExtract(dest);
            let ee    = new WritableStream();
            ee._write = () => true;
            setTimeout(() => ee.emit('finish'), 50);
            return ee;
        }
    };
};