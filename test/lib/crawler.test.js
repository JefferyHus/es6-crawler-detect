var assert = require("assert");

const Crawler = require("../../src/lib/crawler");

describe("crawler", () => {
    var crawler = new Crawler();

    it("will identify crawlers correctly on subsequent calls", () => {
        assert.strictEqual(crawler.isCrawler("Zombie.js"), true);
        assert.strictEqual(crawler.isCrawler("Zombie.js"), true, "crawler was not identified on subsequent call");
    });
});
