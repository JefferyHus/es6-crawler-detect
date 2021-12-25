'use strict';

const path = require('path');
const express = require('express');
const { middleware } = require('../../src/index');

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
    'Mozilla/5.0 (Linux; Android 7.0; M bot 60 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/67.0.3396.87 Mobile Safari/537.36'
  );

  // Output the name of the bot that matched (if any)
  response.send(request.Crawler.getMatches());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
