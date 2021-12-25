const Crawler = require("./lib/crawler")
const vm = require('vm');
const CrawlerRunner = new vm.Script('new Crawler(req)');

module.exports = {
  Crawler,
  middleware(cb) {
    return (req, res, next) => {
      // If there is a cb, execute it
      if (typeof cb === 'function') {
        cb.call(req, res);
      }
      // Initiate
      req.Crawler = CrawlerRunner.runInThisContext({timeout: 100, microtaskMode: 'afterEvaluate'});
      next();
    };
  },
};
