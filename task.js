/**
 * Created by owen-carter on 2017/11/2.
 */

const uuid = require('uuid/v4');

class Task {
    constructor() {
        this.id              = uuid();
        this.name            = '';
        this.fileName        = '';
        this.url             = '';
        this.targetLocalPath = '~/';
    }

    set id(id) {
        console.dir('can not modify the task id')
    }

    set name(name) {
        this.name = name
    }

    set fileName(fileName) {
        this.fileName = fileName
    }

    set url(url) {
        this.url = url
    }

    set targetLocalPath(targetLocalPath) {
        this.targetLocalPath = targetLocalPath
    }

}


module.exports = Task;

