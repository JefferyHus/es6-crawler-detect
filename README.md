<p align="center"><a href="http://crawlerdetect.io/" target="_blank"><img src="https://cloud.githubusercontent.com/assets/340752/23082173/1bd1a396-f550-11e6-8aba-4d3c75edea2f.png" width="321" height="219" /></a><br><br>
<a href="http://crawlerdetect.io/" target="_blank">crawlerdetect.io</a>
<br><br>
</p>

# About ES6-CrawlerDetect
This Library is an ES6 version of the original PHP class @[CrawlerDetect](https://github.com/JayBizzle/Crawler-Detect), it helps you detect bots/crawlers and spiders only by scanning the user-agent string or from the global `request.headers`.

## Installation
`npm install es6-crawler-detect`

## Usage
```javascript
'use strict';

const express = require('express')
const Crawler = require("crawler")

const app = express()

app.get('your/route', function async (request, response) {
  // create a new Crawler instance
  var CrawlerDetector = new Crawler(request)
  
  // check the current visitor's useragent
  if ( CrawlerDetector.isCrawler() )
  {
    // true if crawler user agent detected
  }
  
  // or check a user agent string
  if ( CrawlerDetector.isCrawler('Mozilla/5.0 (compatible; Sosospider/2.0; +http://help.soso.com/webspider.htm)') )
  {
    // true if crawler user agent detected
  }
  
  // Output the name of the bot that matched (if any)
  response.send(CrawlerDetector.getMatches())
})
```

## Contributing
If you find a bot/spider/crawler user agent that CrawlerDetect fails to detect, please submit a pull request with the regex pattern added to the `data` array in `./crawler/crawlers.js`.