'use strict';

const chai           = require('chai');
const sinon          = require('sinon');
const sinonChai      = require('sinon-chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.use(sinonChai);

chai.should();

const _       = require('lodash');
const fs      = require('fs');
const del     = require('del');
const rewire  = require('rewire');
const tarMock = require('./test/mocks/tarmock');

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
        let revert;
        let whichStub = sinon.stub();
        beforeEach(() => {
            sinon.stub(extrakt, 'system');
            sinon.stub(extrakt, 'native');
            revert = extrakt.__set__('which', whichStub);
        });
        afterEach(() => {
            extrakt.system.restore();
            extrakt.native.restore();
            revert();
        });
        it('should invoke .system() if tar is found in PATH', () => {
            whichStub.withArgs('tar').returns(Promise.resolve('/path/to/tar'));
            return extrakt('test/archive.tar', 'test/extract').then(() => {
                extrakt.system.should.have.been.called;
                extrakt.native.should.have.not.been.called;
            });
        });
        it('should invoke .native() if tar is not found in PATH', () => {
            whichStub.withArgs('tar').returns(Promise.reject(new Error('tar not found in path')));
            return extrakt('test/archive.tar', 'test/extract').then(() => {
                extrakt.native.should.have.been.called;
                extrakt.system.should.have.not.been.called;
            });
        });
    });
    describe('auto', () => {
        it('should extract all the files from the .tar archive', () => {
            return extrakt('test/archive.tar', 'test/extract').then(() => verifyExtraction());
        });
        it('should extract all the files from the .tar.gz archive', () => {
            return extrakt('test/archive.tar.gz', 'test/extract').then(() => verifyExtraction());
        });
    });
    describe('.native', () => {
        let revert;
        let tarExtract = sinon.spy();
        before(() => revert = extrakt.__set__('tar', tarMock(tarExtract)));
        after(() => revert());
        it('should call tar.extract', () => {
            return extrakt.native('test/archive.tar.gz', 'test/extract').then(() => {
                tarExtract.should.have.been.calledWith('test/extract');
            });
        });
    });
    describe('.system', () => {
        let revert;
        let execaShell = sinon.spy();
        let whichStub  = sinon.stub();
        before(() => revert = extrakt.__set__({
            'execa': {shell: execaShell},
            'which': whichStub
        }));
        after(() => revert());
        it('should issue the right command', () => {
            whichStub.withArgs('tar').returns(Promise.resolve('/path/to/tar'));
            return extrakt.system('test/archive.tar.gz', 'test/extract').then(() => {
                execaShell.should.have.been.calledWith('/path/to/tar -xvf test/archive.tar.gz -C test/extract');
            });
        });
    });
});