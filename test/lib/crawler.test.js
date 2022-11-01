const readline = require('readline');
const fs = require('fs');
const assert = require('assert');
const Crawler = require('../../src/lib/crawler');

describe('crawler', () => {
  var crawler = new Crawler();

  describe('regex-compilation', () => {
    it('will join list of patterns with pipes', () => {
      assert.strictEqual(
        crawler.compileRegex(['some', 'patterns']).source,
        'some|patterns'
      );
      assert.strictEqual(crawler.compileRegex(['single']).source, 'single');
    });

    it('keeps the whitespace', () => {
      assert.strictEqual(
        crawler.compileRegex(['  keep-whitespaces ']).source,
        '  keep-whitespaces '
      );
    });

    it('will accept regex-flags for compilation', () => {
      var patterns = ['some', 'patterns'];
      assert.strictEqual(crawler.compileRegex(patterns, 'g').flags, 'g');
      assert.strictEqual(crawler.compileRegex(patterns, 'i').flags, 'i');
    });

    it('should be case insensitive', () => {
      assert.strictEqual(crawler.isCrawler('Facebot\\1.0'), true);
      assert.strictEqual(
        crawler.getMatches('Facebot\\1.0'),
        'Facebot',
        'Crawler was not able to indentify crawler correctly'
      );
    });
  });

  describe('crawler-identification', () => {
    it('should be able to identify crawlers', async () => {
      const rl = readline.createInterface({
        input: fs.createReadStream('./test/lib/database/crawlers.txt'),
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        assert.strictEqual(
          crawler.isCrawler(line),
          true,
          `${line} is not a crawler`
        );
      }

      rl.close();
    });

    it('should be able to identify devices', async () => {
      const rl = readline.createInterface({
        input: fs.createReadStream('./test/lib/database/devices.txt'),
        crlfDelay: Infinity,
      });

      for await (const line of rl) {
        assert.strictEqual(
          crawler.isCrawler(line),
          false,
          `${line} is not a device`
        );
      }

      rl.close();
    });

    it('should identify the crawler from a given headers', async () => {
      crawler = new Crawler(null, {
        host: '127.0.0.1:3000',
        'user-agent': 'curl/7.73.0',
        accept: '*/*',
      });

      assert.strictEqual(crawler.isCrawler(), true);
    });

    it('should identify the crawler from request headers', async () => {
      crawler = new Crawler({
        headers: { 'user-agent': 'curl/7.73.0', accept: '*/*' },
      });

      assert.strictEqual(crawler.isCrawler(), true);
    });

    it('should identify the crawler from request headers with exact pattern', async () => {
      crawler = new Crawler({
        headers: { 'user-agent': 'b0t', accept: '*/*' },
      });

      assert.strictEqual(crawler.isCrawler(), true);
    });

    it('should do not throw an exception on empty request header', async () => {
      crawler = new Crawler({
        headers: { accept: '*/*' },
      });

      assert.doesNotThrow(() => crawler.isCrawler());
    });
  });
});
