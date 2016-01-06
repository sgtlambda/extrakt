'use strict';

const chai           = require('chai');
const sinon          = require('sinon');
const sinonChai      = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

chai.should();

const _      = require('lodash');
const fs     = require('fs');
const del    = require('del');
const rewire = require('rewire');

const extrakt = rewire('./');

const verifyExtraction = () => {
    _.forEach([
        'index.js',
        'package.json',
        'readme.md',
        'test.js'
    ], file => fs.accessSync('test/extract/' + file));
};

describe('extrakt', () => {
    afterEach(() => {
        return del('test/extract');
    });
    describe('cross-platform compatibility', () => {
        beforeEach(() => {
            sinon.stub(extrakt, 'system');
            sinon.stub(extrakt, 'native');
        });
        afterEach(() => {
            extrakt.system.restore();
            extrakt.native.restore();
        });
        it('should invoke .system() if tar is found in PATH', () => {
            extrakt.__set__('which', () => Promise.resolve());
            return extrakt('test/archive.tar', 'test/extract').then(() => {
                extrakt.system.should.have.been.called;
                extrakt.native.should.have.not.been.called;
            });
        });
        it('should invoke .native() if tar is not found in PATH', () => {
            extrakt.__set__('which', () => Promise.reject());
            return extrakt('test/archive.tar', 'test/extract').then(() => {
                extrakt.native.should.have.been.called;
                extrakt.system.should.have.not.been.called;
            });
        });
    });
    describe('.native', () => {
        it('should extract all the files from the .tar archive', () => {
            return extrakt.native('test/archive.tar', 'test/extract').then(() => verifyExtraction());
        });
        it('should extract all the files from the .tar.gz archive', () => {
            return extrakt.native('test/archive.tar.gz', 'test/extract').then(() => verifyExtraction());
        });
    });
    describe('.system', () => {
        it('should extract all the files from the .tar archive', () => {
            return extrakt.system('test/archive.tar', 'test/extract').then(() => verifyExtraction());
        });
        it('should extract all the files from the .tar.gz archive', () => {
            return extrakt.system('test/archive.tar.gz', 'test/extract').then(() => verifyExtraction());
        });
    });
});