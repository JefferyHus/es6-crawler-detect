const Crawler = require("./lib/crawler")

module.exports = {
  Crawler,

  middleware (req, res, next) {
    req.Crawler = new Crawler(req)
    next()
  }
}