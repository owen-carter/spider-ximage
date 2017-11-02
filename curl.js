/**
 * Created by owen-carter on 2017/11/2.
 */
'use strict';
const fs      = require('fs');
const path    = require('path');
const log4js  = require('log4js');
const request = require('request');


const logger = log4js.getLogger();
logger.level = 'debug';

/***
 * 全局配置
 * 下载目录
 * 最大并发数量
 * header
 *
 * 局部配置
 * task对象
 */


class Curl {
    constructor(maxTaskNumber = 10, targetPath = '~') {
        this.maxTaskNumber   = maxTaskNumber;
        this.targetPath      = targetPath;
        this.header          = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'}
        this.taskQueen       = [];
        this.taskFailedQueen = [];
    }

    config() {

    }

    taskScheduler(tasks = []) {
        let taskNumber = this.maxTaskNumber;
        return new Promise(async (resolve, reject) => {
            await this.start('', '');
            taskNumber--;
            if (taskNumber < this.maxTaskNumber) {
                resolve(void(0))
            }
        })
    }

    addTasks(tasks = []) {
        this.taskQueen.push(...tasks)
    }

    recordFailedTasks(tasks) {
        this.taskFailedQueen.push(...tasks)
    }

    sendToExecute(task) {
        let reqConfig = {
            url   : task.url,
            method: 'get',
            header: this.header
        };
        let stream    = fs.createWriteStream((task.targetPath || this.targetPath ) + task.fileName);
        request(reqConfig)
            .on('error', (err) => {
                logger.error(`wget file err: ${err}`);
                this.recordFailedTasks({})
            })
            .pipe(stream)
            .on('close', () => {

            });
    }


    start(fileName, filePath) {
        let reqConfig = {
            url   : filePath,
            method: 'get',
            header: this.header
        };
        let stream    = fs.createWriteStream((filePath || this.targetPath ) + fileName);
        return new Promise((resolve, reject) => {
            request(reqConfig)
                .on('error', (err) => {
                    logger.error(`wget file err: ${err}`);
                    reject(err);
                })
                .pipe(stream)
                .on('close', () => {
                    resolve(void(0));
                });
        })
    }

}
