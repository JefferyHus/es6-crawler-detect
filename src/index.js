const Crawler = require("./lib/crawler")
const vm = require('vm');
const CrawlerRunner = new vm.Script('new Crawler(req)');
module.exports = {
    Crawler,

    middleware(req, res, next) {
        req.Crawler = CrawlerRunner.runInThisContext({timeout: 100, microtaskMode: 'afterEvaluate'})
        next()
    }
}