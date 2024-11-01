'use strict';

const path = require('path');
const express = require('express');
const { middleware, Crawler } = require('../../dist/index');

const app = express();
const port = 3000;

app.use(
  middleware(() => {
    console.log('Testing the callback\n');
  })
);

app.use('/dist', express.static(path.join(__dirname + '/dist')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/crawler', function async(request, response) {
  // or check a user agent string
  request.Crawler.isCrawler(
    'TinEye-bot/0.51 (see http://www.tineye.com/crawler.html)'
  );

  // Output the name of the bot that matched (if any)
  response.send(request.Crawler.getMatches());
});

app.get('/curl', function async(request, response) {
  const CrawlerDetector = new Crawler(request);
  CrawlerDetector.isCrawler(); // true
  response.send(CrawlerDetector.getMatches());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));