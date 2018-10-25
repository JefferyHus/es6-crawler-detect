<p align="center"><a href="http://crawlerdetect.io/" target="_blank"><img src="https://cloud.githubusercontent.com/assets/340752/23082173/1bd1a396-f550-11e6-8aba-4d3c75edea2f.png" width="321" height="219" /></a><br><br>
<a href="http://crawlerdetect.io/" target="_blank">crawlerdetect.io</a>
<br><br>
</p>

[![npm version](https://badge.fury.io/js/es6-crawler-detect.svg)](https://badge.fury.io/js/es6-crawler-detect) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/JefferyHus/es6-crawler-detect/issues)



# About ES6-CrawlerDetect
This Library is an ES6 version of the original PHP class @[CrawlerDetect](https://github.com/JayBizzle/Crawler-Detect), it helps you detect bots/crawlers and spiders only by scanning the user-agent string or from the global `request.headers`.

## Installation
`npm install es6-crawler-detect`

## Usage
#### ECMAScript 6 (ES6)/ ECMAScript 2015 (ES2015)
```javascript
'use strict';

const express = require('express')
const Crawler = require('es6-crawler-detect/src')

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
#### ECMAScript 5 (ES5)
```xml
<head>
	<!-- Metas -->
	<meta name="title" content="ES6-CrawlerDetect">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="keywords" content="">
	<title>CrawlerDetect - the web crawler detection library</title>
	<!-- Scripts -->
	<script type="text/javascript" src="./your/path/to/main.prod.js"></script>
</head>
```

```javascript
  // create a new Crawler instance
  var CrawlerDetector = new Crawler();
  var userAgentString = navigator.userAgent;
  
  // check the current visitor's useragent
  if ( CrawlerDetector.isCrawler(userAgentString) )
  {
    // true if crawler user agent detected
  }
  
  // Output the name of the bot that matched (if any)
  console.log(CrawlerDetector.getMatches());
```

## Contributing
If you find a bot/spider/crawler user agent that CrawlerDetect fails to detect, please submit a pull request with the regex pattern added to the `data` array in `./crawler/crawlers.js`.
