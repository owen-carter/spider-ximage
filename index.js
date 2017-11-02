'use strict';
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const request = require('request');
const Promise = require('bluebird');


const logger = log4js.getLogger();
logger.level = 'debug';

class Spider {

    constructor() {
        this.concurrency = {concurrency: 3};
        this.header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'}
    }

    init() {

    }

    * urlList() {
        let i;
        let baseUrl = 'http://www.ximage.pro/photos.json?page=';
        for (i = 1; i, 1000000; i++) {
            yield (baseUrl + i)
        }
    }

    static curl(url) {
        let reqConfig = {
            url: url,
            method: 'get',
            header: this.header
        };
        return new Promise((resolve, reject) => {
            request(reqConfig, (err, res, body) => {
                if (err) {
                    logger.error(`curl url err:${err}`);
                    reject(err);
                }
                resolve(body);
            })
        })
    }

    static wget(fileName, filePath) {
        let reqConfig = {
            url: filePath,
            method: 'get',
            header: this.header
        };
        let stream = fs.createWriteStream('./images/' + fileName);
        return new Promise((resolve, reject) => {
            request(reqConfig)
                .on('error', (err) => {
                    logger.error(`wget file err: ${err}`);
                    reject(err)
                })
                .pipe(stream)
                .on('close', () => {
                    resolve(void(0))
                });
        })
    }

    downImage(image) {
        return Spider.wget(image.name + '.jpg', image.url)
    }


    parseImage(jsonString) {
        let jsonObject = JSON.parse(jsonString);

        return jsonObject.result.map((item) => {
            return {
                name: item.id,
                url: item.large_image
            }
        });
    }

    async bootstrap() {
        for (let url of this.urlList()) {
            let jsonRes = await Spider.curl(url);
            logger.info(`get a json ${url}`);
            let imageList = this.parseImage(jsonRes);

            Promise.map(imageList, (image) => {
                return this.downImage(image)
            }, this.concurrency).then(() => {
                logger.info(`download ${imageList} `);
            });

        }
    }

    run() {
        this.init();
        this.bootstrap();
    }
}

(new Spider()).run();
