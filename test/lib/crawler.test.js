var assert = require("assert");

const Crawler = require("../../src/lib/crawler");

describe("crawler", () => {
    var crawler = new Crawler();

    it("will identify crawlers correctly on subsequent calls", () => {
        assert.strictEqual(crawler.isCrawler("Zombie.js"), true);
        assert.strictEqual(crawler.isCrawler("Zombie.js"), true, "crawler was not identified on subsequent call");
    });

    describe("regex-compilation", () => {
        it("will join list of patterns with pipes", () => {
            assert.strictEqual(crawler.compileRegex(["some", "patterns"]).source, "some|patterns");
            assert.strictEqual(crawler.compileRegex(["single"]).source, "single");
            assert.strictEqual(crawler.compileRegex(["  remove-whitespaces "]).source, "remove-whitespaces");
        });

        it("will accept regex-flags for compilation", () => {
            var patterns = ['some', 'patterns'];
            assert.strictEqual(crawler.compileRegex(patterns, "g").flags, "g");
            assert.strictEqual(crawler.compileRegex(patterns, "i").flags, "i");
        });
    });
});
