# [![extrakt](media/logo.png)](https://github.com/sgtlambda/extrakt)

> Extract `.tar` and `.tar.gz` using the system binary (fast!), with a javascript fallback (portable!)

Makes a great team with [nectar](https://github.com/sgtlambda/nectar).

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]


## Install

```
$ npm install --save extrakt
```


## Usage

```js
const extrakt = require('extrakt');

extrakt('path/to/archive.tar.gz', 'output/directory');
```

## API

### extrakt(archive, extractTo)

Extract the archive at the given `archive` path to the `extractTo` directory.

**Returns** a Promise for the completion of the extraction.

#### archive

Type: `string`

Path to the archive

#### extractTo

Type: `string`

Destination directory

## License

MIT © [sgtlambda](http://github.com/sgtlambda)

[travis-image]: https://img.shields.io/travis/sgtlambda/extrakt.svg?style=flat-square
[travis-url]: https://travis-ci.org/sgtlambda/extrakt

[npm-image]: https://img.shields.io/npm/v/extrakt.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/extrakt
