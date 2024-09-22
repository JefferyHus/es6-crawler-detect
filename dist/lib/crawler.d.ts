import { Request } from 'express-serve-static-core';
import { IncomingHttpHeaders } from 'http2';
export declare class Crawler {
    private crawlers;
    private headers;
    private exclusions;
    private request;
    private compiledRegexList;
    private compiledExclusions;
    private httpHeaders;
    private userAgent;
    private matches?;
    constructor(request?: Request, headers?: IncomingHttpHeaders, userAgent?: string);
    compileRegex(patterns: string[], flags?: string): RegExp;
    private setHttpHeaders;
    private setUserAgent;
    private getUaHttpHeaders;
    getMatches(): string | null | object;
    isCrawler(userAgent?: string): boolean;
}
//# sourceMappingURL=crawler.d.ts.map