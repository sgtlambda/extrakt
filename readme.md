# extrakt

> Extract .tar and .tar.gz using the system binary (fast!), with a javascript fallback (portable!)

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

Extract the archive at the given path `archive` to the `extractTo` directory (which will be created if it does not exist).

**Returns** a Promise for the completion of the extraction.

#### archive

Type: `string`

Path to the archive

#### extractTo

Type: `string`

Destination directory

## License

MIT © [sgtlambda](http://github.com/sgtlambda)

[![dependency Status][david-image]][david-url]
[![devDependency Status][david-dev-image]][david-dev-url]

[travis-image]: https://img.shields.io/travis/sgtlambda/extrakt.svg?style=flat-square
[travis-url]: https://travis-ci.org/sgtlambda/extrakt

[codeclimate-image]: https://img.shields.io/codeclimate/github/sgtlambda/extrakt.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/sgtlambda/extrakt

[david-image]: https://img.shields.io/david/sgtlambda/extrakt.svg?style=flat-square
[david-url]: https://david-dm.org/sgtlambda/extrakt

[david-dev-image]: https://img.shields.io/david/dev/sgtlambda/extrakt.svg?style=flat-square
[david-dev-url]: https://david-dm.org/sgtlambda/extrakt#info=devDependencies

[coveralls-image]: https://img.shields.io/coveralls/sgtlambda/extrakt.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/sgtlambda/extrakt

[npm-image]: https://img.shields.io/npm/v/extrakt.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/extrakt
