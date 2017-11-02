# spider-ximage
> 图片爬虫

### About
- 爬图片
- 下载图片
- 存错图片地址以及详情
- 存储图片Referer

### About promise
```ecmascript 6
    async bootstrap() {
        for (let url of this.urlList()) {
            let jsonRes = await Spider.curl(url);
            logger.info(`get a json ${url}`);
            let imageList = this.parseImage(jsonRes);

            Promise.map(imageList, (image) => {
                return this.downImage(image)
            }, this.concurrency).then(() => {
                logger.info(`download ${imageList.length} images`);
            });

        }
    }
```

### Changelog
+ v1.0
    - 可下载图片

+ v1.1
    - 引入bluebird
    - 使用Promise.map,并发下载，提高速度