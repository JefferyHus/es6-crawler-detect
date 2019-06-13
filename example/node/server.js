'use strict';

const express = require('express')
const Crawler = require('../../src')

const app = express()
const port = 3000

app.get('/crawler', function async (request, response) {
  // create a new Crawler instance
  var CrawlerDetector = new Crawler(request)
  
  // or check a user agent string
  CrawlerDetector.isCrawler('Mozilla/5.0 (compatible; Sosospider/2.0; +http://help.soso.com/webspider.htm)')
  
  // Output the name of the bot that matched (if any)
  response.send(CrawlerDetector.getMatches())
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))