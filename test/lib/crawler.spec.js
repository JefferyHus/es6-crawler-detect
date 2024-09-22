"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const assert_1 = __importDefault(require("assert"));
const src_1 = require("../../src");
let crawler = new src_1.Crawler();
describe('regex-compilation', () => {
    it('will join list of patterns with pipes', () => {
        assert_1.default.strictEqual(crawler.compileRegex(['some', 'patterns']).source, 'some|patterns');
        assert_1.default.strictEqual(crawler.compileRegex(['single']).source, 'single');
    });
    it('keeps the whitespace', () => {
        assert_1.default.strictEqual(crawler.compileRegex(['  keep-whitespaces ']).source, '  keep-whitespaces ');
    });
    it('will accept regex-flags for compilation', () => {
        const patterns = ['some', 'patterns'];
        assert_1.default.strictEqual(crawler.compileRegex(patterns, 'g').flags, 'g');
        assert_1.default.strictEqual(crawler.compileRegex(patterns, 'i').flags, 'i');
    });
    it('should be case insensitive', () => {
        assert_1.default.strictEqual(crawler.isCrawler('Facebot\\1.0'), true);
        assert_1.default.strictEqual(crawler.getMatches(), 'Facebot', 'Crawler was not able to identify crawler correctly');
    });
});
describe('crawler-identification', () => {
    it('should be able to identify crawlers', async () => {
        const rl = readline.createInterface({
            input: fs.createReadStream('./test/lib/database/crawlers.txt'),
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            assert_1.default.strictEqual(crawler.isCrawler(line), true, `${line} is not a crawler`);
        }
        rl.close();
    });
    it('should be able to identify devices', async () => {
        const rl = readline.createInterface({
            input: fs.createReadStream('./test/lib/database/devices.txt'),
            crlfDelay: Infinity,
        });
        for await (const line of rl) {
            assert_1.default.strictEqual(crawler.isCrawler(line), false, `${line} is not a device`);
        }
        rl.close();
    });
    it('should identify the crawler from given headers', async () => {
        crawler = new src_1.Crawler(undefined, {
            host: '127.0.0.1:3000',
            'user-agent': 'curl/7.73.0',
            accept: '*/*',
        });
        assert_1.default.strictEqual(crawler.isCrawler(), true);
    });
    it('should identify the crawler from request headers', async () => {
        crawler = new src_1.Crawler({
            headers: { 'user-agent': 'curl/7.73.0', accept: '*/*' },
        });
        assert_1.default.strictEqual(crawler.isCrawler(), true);
    });
    it('should identify the crawler from request headers with exact pattern', async () => {
        crawler = new src_1.Crawler({
            headers: { 'user-agent': 'b0t', accept: '*/*' },
        });
        assert_1.default.strictEqual(crawler.isCrawler(), true);
    });
    it('should not throw an exception on empty request header', async () => {
        crawler = new src_1.Crawler({
            headers: { accept: '*/*' },
        });
        assert_1.default.doesNotThrow(() => crawler.isCrawler());
    });
});
