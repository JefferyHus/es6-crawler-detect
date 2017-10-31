'use strict';

const Provider = require("./provider");

class Headers extends Provider
{
	constructor()
	{
		super();

		this.data = ["HTTP-USER-AGENT","HTTP-X-OPERAMINI-PHONE-UA","HTTP-X-DEVICE-USER-AGENT","HTTP-X-ORIGINAL-USER-AGENT","HTTP-X-SKYFIRE-PHONE","HTTP-X-BOLT-PHONE-UA","HTTP-DEVICE-STOCK-UA","HTTP-X-UCBROWSER-DEVICE-UA","HTTP-FROM","HTTP-X-SCANNER"];
	}
}

module.exports = Headers;