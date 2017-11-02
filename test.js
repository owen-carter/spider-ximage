/**
 * Created by owen-carter on 2017/10/31.
 */

'use strict';
const Spider = require('./src/index.js');
const should = require('should');
const Promise = require('bluebird');

describe('Spider Class', () => {

    describe('#urlList()', () => {
        it('should return a url list', () => {
            let urlList = new Spider().urlList();
            should(urlList.next()).be.instanceof(Object);
        });
    });

    describe('@curl()', () => {
        it('should return a Pormise', async () => {
            let url = (new Spider()).urlList().next().value;
            let promise = await Spider.curl(url);
            should(promise).be.a.json();
        });
    });

});
