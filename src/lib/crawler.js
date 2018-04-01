'use strict';

const Crawlers   = require('./crawler/crawlers');
const Exclusions = require('./crawler/exclusions');
const Headers    = require('./crawler/headers');

class Crawler
{
	constructor(request)
	{

    /**
     * Set userAgent and headers
     */

    const { headers } = request; 
    const userAgent = headers['user-agent'];

		/**
		 * Init classes
		 */

		this._init();

		/**
		 * This request must be an object
		 */
		this.request = typeof request === "object" ? request : {};

		/**
		 * Regex
		 */
		this.compiledRegexList  = this.compileRegex(this.crawlers.getAll());
		this.compiledExclusions = this.compileRegex(this.exclusions.getAll());

		/**
		 * Set http headers
		 */
		this.setHttpHeaders(headers);

		/**
		 * Set userAgent
		 */
		this.userAgent = this.setUserAgent(userAgent);
	}

	/**
	 * Init Classes Instances
	 */
	_init()
	{
		this.crawlers   = new Crawlers();
		this.headers    = new Headers();
		this.exclusions = new Exclusions();
	}

	/**
	 * Compile the regex patterns into one regex string.
	 */
	compileRegex(patterns)
	{
		// create a Regexp
		return new RegExp(patterns.join('|').trim(), "g");
	}

	/**
	 * Set HTTP headers.
	 */
	setHttpHeaders(headers)
	{
		// Use the Request headers if httpHeaders is not defined
        if ( typeof headers !== "object" || Object.keys(headers).length == 0 )
        {
        	headers = Object.keys(this.request).length ? this.request.headers : {};
        }

		// Clear existing headers.
		this.httpHeaders = [];

        // Only save HTTP headers. In NodeJS land, that means
        // Only Request vars that start with HTTP-.
		for ( const key in headers )
		{
			if ( key.substring(0, 5) === "http-" )
			{
				this.httpHeaders[key] = headers[key];
			}
		}
	}

	/**
	 * Set user agent
	 */
	setUserAgent(userAgent)
	{
		if ( typeof userAgent == "undefined" || userAgent == null || ! userAgent.length )
		{
			for ( const header of this.getUaHttpHeaders() )
			{
				if ( Object.keys(this.httpHeaders).indexOf(header.toLowerCase()) === 0 )
				{
					userAgent += this.httpHeaders[header] + ' ';
				}
			}
		}

		return userAgent;
	}

	/**
	 * Get user agent headers
	 */
	getUaHttpHeaders()
	{
		return this.headers.getAll();
	}

	/**
	 * Check user agent string against the regex.
	 */
	isCrawler(userAgent = undefined)
	{
		var agent = (typeof userAgent == "undefined" || userAgent == null ? this.userAgent : userAgent);

		// test on compiled regx
		agent = agent.replace(this.compiledExclusions, '');

		if ( agent.trim().length == 0 )
		{
			return false;
		}

		var matches = this.compiledRegexList.exec(agent.trim());

		if ( matches )
		{
			this.matches = matches;
		}

		return matches !== null ? (matches.length ? true : false) : false;
	}

	/**
	 * Return the matches.
	 */
	getMatches()
	{
		return this.matches !== undefined ? (this.matches.length ? this.matches[0] : null) : {};
	}
}

module.exports = Crawler;
