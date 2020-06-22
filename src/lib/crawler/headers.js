'use strict';

const Provider = require("./provider");

class Headers extends Provider
{
	constructor()
	{
		super();

		this.data = ["USER-AGENT","X-OPERAMINI-PHONE-UA","X-DEVICE-USER-AGENT","X-ORIGINAL-USER-AGENT","X-SKYFIRE-PHONE","X-BOLT-PHONE-UA","DEVICE-STOCK-UA","X-UCBROWSER-DEVICE-UA","FROM","X-SCANNER"];
	}
}

module.exports = Headers;