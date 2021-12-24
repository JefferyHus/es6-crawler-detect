const Crawler = require("./lib/crawler")

module.exports = {
  Crawler,

  middleware (cb) {
    return (req, res, next) => {
      // If there is a cb, execute it
      if (typeof cb === 'function') {
        cb.call(req, res);
      }
      // Initiate
      req.Crawler = new Crawler(req)
      next()
    }
  }
}