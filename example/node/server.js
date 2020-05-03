'use strict';

const path = require('path')
const express = require('express')
const { middleware } = require('es6-crawler-detect')

const app = express()
const port = 3000

app.use(middleware)

app.use('/dist', express.static(path.join(__dirname + '/dist')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/crawler', function async (request, response) {
  // or check a user agent string
  request.Crawler.isCrawler('Mozilla/5.0 (compatible; Sosospider/2.0; +http://help.soso.com/webspider.htm)')
  
  // Output the name of the bot that matched (if any)
  response.send(request.Crawler.getMatches())
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))