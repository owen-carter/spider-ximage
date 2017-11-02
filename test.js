/**
 * Created by owen-carter on 2017/10/31.
 */


'use strict';
const SpiderKit = require('./utils/spiderKit');
const should    = require('should');


describe('random seg', () => {
    describe('#randomSeg()', () => {
        it('should return a random seg', () => {
            let randomSeg = SpiderKit.randomSeg();
            should(randomSeg).be.instanceof(Number).and.lessThanOrEqual(255);
        });
    });
});


describe('random ip', () => {
    describe('#randomIp()', () => {
        it('should return a random ip', () => {
            let randomIp = SpiderKit.randomIp();
            should(randomIp.split('.')).be.instanceof(Array).and.have.lengthOf(4);
        });
    });
});


describe('random agent', () => {
    describe('#randomAgent()', () => {
        it('should return a random Agent', () => {
            let randomAgent = SpiderKit.randomAgent();
            should(randomAgent).be.instanceof(String);
        });
    });
});