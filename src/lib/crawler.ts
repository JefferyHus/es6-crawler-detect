import { Request } from 'express-serve-static-core';
import { IncomingHttpHeaders } from 'http2';

import { Crawlers } from './crawler/crawlers';
import { Exclusions } from './crawler/exclusions';
import { Headers } from './crawler/headers';

export class Crawler {
  private crawlers: Crawlers;
  private headers: Headers;
  private exclusions: Exclusions;

  private request: Request | NodeJS.Dict<string | string[]>;
  private compiledRegexList: RegExp;
  private compiledExclusions: RegExp;
  private httpHeaders: string | string[] | IncomingHttpHeaders;
  private userAgent: string;
  private matches?: RegExpExecArray | null;

  constructor(
    request?: Request,
    headers?: IncomingHttpHeaders,
    userAgent?: string
  ) {
    this.crawlers = new Crawlers();
    this.headers = new Headers();
    this.exclusions = new Exclusions();

    this.request = request ?? {};

    // The regex-list must not be used with g-flag!
    // See: https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results
    this.compiledRegexList = this.compileRegex(this.crawlers.getAll(), 'i');

    // The exclusions should be used with g-flag in order to remove each value.
    this.compiledExclusions = this.compileRegex(this.exclusions.getAll(), 'gi');

    this.httpHeaders = this.setHttpHeaders(headers);
    this.userAgent = this.setUserAgent(userAgent);
  }

  public compileRegex(patterns: string[], flags?: string): RegExp {
    return new RegExp(patterns.join('|'), flags);
  }

  private setHttpHeaders(
    headers?: string | string[] | IncomingHttpHeaders
  ): string | string[] | IncomingHttpHeaders {
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

  private setUserAgent(userAgent?: string): string {
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

  private getUaHttpHeaders() {
    return this.headers.getAll();
  }

  public getMatches(): string | null | object {
    if (this.matches !== undefined) {
      if (this.matches?.length) {
        return this.matches[0];
      }

      return null;
    }

    return {};
  }

  public isCrawler(userAgent?: string): boolean {
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
