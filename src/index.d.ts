export class Crawler {
    constructor(request: any, headers: { [k: string]: string }, userAgent?: string | undefined | null);
    isCrawler(userAgent?: string): boolean;
    compileRegex(patterns: string, flags: string): RegExp;
    setHttpHeaders(headers?: { [k: string]: string }): void;
    setUserAgent(userAgent?: string | null): void;
    getUaHttpHeaders(): string[];
    getMatches(): string | null;
}

export function middleware(cb: (req: any, res: any) => void): (req: any, res: any, next: () => void) => void;
