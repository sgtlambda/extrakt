# extrakt

> Extract .tar and .tar.gz using the system's binary (fast!), with a javascript fallback (portable!)

[![Build Status][travis-image]][travis-url]
[![Code Quality][codeclimate-image]][codeclimate-url]
[![Code Coverage][coveralls-image]][coveralls-url]
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

Extract the given `archive` to the `extractTo` directory. Returns a Promise for the extraction.

#### archive

Type: `string`

Path to the archive

#### extractTo

Type: `string`

Destination directory

## License

MIT © [JM Versteeg](http://github.com/jmversteeg)

[![dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[travis-image]: https://img.shields.io/travis/jmversteeg/extrakt.svg?style=flat-square
[travis-url]: https://travis-ci.org/jmversteeg/extrakt

[codeclimate-image]: https://img.shields.io/codeclimate/github/jmversteeg/extrakt.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jmversteeg/extrakt

[david-image]: https://img.shields.io/david/jmversteeg/extrakt.svg?style=flat-square
[david-url]: https://david-dm.org/jmversteeg/extrakt

[david-dev-image]: https://img.shields.io/david/dev/jmversteeg/extrakt.svg?style=flat-square
[david-dev-url]: https://david-dm.org/jmversteeg/extrakt#info=devDependencies

[coveralls-image]: https://img.shields.io/coveralls/jmversteeg/extrakt.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jmversteeg/extrakt

[npm-image]: https://img.shields.io/npm/v/extrakt.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/extrakt