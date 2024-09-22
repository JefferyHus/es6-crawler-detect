'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Crawler = void 0;
const crawlers_1 = require('./crawler/crawlers');
const exclusions_1 = require('./crawler/exclusions');
const headers_1 = require('./crawler/headers');
class Crawler {
  crawlers;
  headers;
  exclusions;
  request;
  compiledRegexList;
  compiledExclusions;
  httpHeaders;
  userAgent;
  matches;
  constructor(request, headers, userAgent) {
    this.crawlers = new crawlers_1.Crawlers();
    this.headers = new headers_1.Headers();
    this.exclusions = new exclusions_1.Exclusions();
    this.request = request ?? {};
    // The regex-list must not be used with g-flag!
    // See: https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results
    this.compiledRegexList = this.compileRegex(this.crawlers.getAll(), 'i');
    // The exclusions should be used with g-flag in order to remove each value.
    this.compiledExclusions = this.compileRegex(this.exclusions.getAll(), 'gi');
    this.httpHeaders = this.setHttpHeaders(headers);
    this.userAgent = this.setUserAgent(userAgent);
  }
  compileRegex(patterns, flags) {
    return new RegExp(patterns.join('|'), flags);
  }
  setHttpHeaders(headers) {
    // Use the Request headers if httpHeaders is not defined
    if (!headers || Object.keys(headers).length === 0) {
      if (Object.keys(this.request).length) {
        if (this.request.headers) {
          return this.request.headers;
        }
      }
      return '';
    }
    // Save the headers.
    return headers;
  }
  setUserAgent(userAgent) {
    if (!userAgent?.length) {
      userAgent = '';
      for (const header of this.getUaHttpHeaders()) {
        if (
          typeof this.httpHeaders === 'object' &&
          !Array.isArray(this.httpHeaders)
        ) {
          if (Object.hasOwn(this.httpHeaders, header.toLowerCase())) {
            const headerValue = this.httpHeaders[header.toLowerCase()];
            if (typeof headerValue === 'string') {
              const separator = userAgent.length > 0 ? ' ' : '';
              userAgent += separator + headerValue;
            } else if (Array.isArray(headerValue)) {
              const separator = userAgent.length > 0 ? ' ' : '';
              userAgent += separator + headerValue.join(' ');
            }
          }
        }
      }
    }
    return userAgent;
  }
  getUaHttpHeaders() {
    return this.headers.getAll();
  }
  getMatches() {
    if (this.matches !== undefined) {
      if (this.matches?.length) {
        return this.matches[0];
      }
      return null;
    }
    return {};
  }
  isCrawler(userAgent) {
    if (Buffer.byteLength(userAgent ?? '', 'utf8') > 4096) {
      return false;
    }
    let agent = userAgent ?? this.userAgent;
    // test on compiled regx
    agent = agent.replace(this.compiledExclusions, '');
    if (agent.trim().length === 0) {
      return false;
    }
    const matches = this.compiledRegexList.exec(agent);
    if (matches) {
      this.matches = matches;
    }
    return matches !== null && matches.length > 0;
  }
}
exports.Crawler = Crawler;
