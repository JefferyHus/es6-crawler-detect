# Crawler Detect

<p align="center"><a href="http://crawlerdetect.io/" target="_blank"><img src="https://cloud.githubusercontent.com/assets/340752/23082173/1bd1a396-f550-11e6-8aba-4d3c75edea2f.png" width="321" height="219" /></a><br><br>
<a href="http://crawlerdetect.io/" target="_blank">crawlerdetect.io</a>
<br><br>
</p>

[![DeepScan grade](https://deepscan.io/api/teams/16465/projects/19756/branches/518343/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16465&pid=19756&bid=518343)
![Static Badge](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=fff)
[![npm version](https://badge.fury.io/js/es6-crawler-detect.svg?icon=si%3Anpm)](https://badge.fury.io/js/es6-crawler-detect)
![NPM Downloads](https://img.shields.io/npm/dy/es6-crawler-detect)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/JefferyHus/es6-crawler-detect/issues)

## About

This Library is an ES6 version of the original PHP class @[CrawlerDetect](https://github.com/JayBizzle/Crawler-Detect), it helps you detect bots/crawlers and spiders only by scanning the user-agent string or from the global `request.headers`.

## Installation

`npm install es6-crawler-detect`

## Usage

### ECMAScript 6 (ES6)

```javascript
'use strict';

const express = require('express')
const { Crawler, middleware } = require('es6-crawler-detect')

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

/**
 * Or by using the middleware
*/
app.use(middleware((request, reponse) => {
  // do something here
  // e.g. console.log(request.body)
  // e.g. return response.status(403).send('Forbidden')
}))

app.get('/crawler', function async (request, response) {
  // or check a user agent string
  request.Crawler.isCrawler('Mozilla/5.0 (compatible; Sosospider/2.0; +http://help.soso.com/webspider.htm)')
  
  // Output the name of the bot that matched (if any)
  response.send(request.Crawler.getMatches())
})
```

### TypeScript

```typescript
import { Crawler, middleware } from 'es6-crawler-detect'

const CrawlerDetector = new Crawler()

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
console.log(CrawlerDetector.getMatches())

/**
 * Or by using the middleware
*/
middleware((request, reponse) => {
  // do something here
  // e.g. console.log(request.body)
  // e.g. return response.status(403).send('Forbidden')
})

```

## Contributing

If you find a `bot/spider/crawler` user agent that CrawlerDetect fails to detect, please submit a pull request with the regex pattern added to the `data` array in `./crawler/crawlers.ts`.
