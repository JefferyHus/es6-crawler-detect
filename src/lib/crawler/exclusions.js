'use strict';

const Provider = require("./provider");

class Exclusions extends Provider
{
	constructor()
	{
		super();

		this.data = ["Safari.[\\d\\.]*","Firefox.[\\d\\.]*","Chrome.[\\d\\.]*","Chromium.[\\d\\.]*","MSIE.[\\d\\.]","Opera\\\/[\\d\\.]*","Mozilla.[\\d\\.]*","AppleWebKit.[\\d\\.]*","Trident.[\\d\\.]*","Windows NT.[\\d\\.]*","Android [\\d\\.]*","Macintosh.","Ubuntu","Linux","[ ]Intel","Mac OS X [\\d_]*","(like )?Gecko(.[\\d\\.]*)?","KHTML,","CriOS.[\\d\\.]*","CPU iPhone OS ([0-9_])* like Mac OS X","CPU OS ([0-9_])* like Mac OS X","iPod","compatible","x86_..","i686","x64","X11","rv:[\\d\\.]*","Version.[\\d\\.]*","WOW64","Win64","Dalvik.[\\d\\.]*"," \\.NET CLR [\\d\\.]*","Presto.[\\d\\.]*","Media Center PC","BlackBerry","AppEngine-Google","developers\\.google\\.com\\\/\\+\\\/web\\\/snippet\\\/","Google favicon","Google Keyword Suggestion","Google Keyword Tool","Google Page Speed Insights","Google PP Default","Google Search Console","Google Web Preview","Google-Adwords","Google-Apps-Script","Google-Calendar-Importer","Google-HotelAdsVerifier","Google-HTTP-Java-Client","Google-Publisher-Plugin","Google-SearchByImage","Google-Site-Verification","Google-Structured-Data-Testing-Tool","Google-Youtube-Links","google_partner_monitoring","GoogleDocs","GoogleHC\\\/","GoogleProducer","Kml-Google","Mediapartners-Google","via ggpht\\.com GoogleImageProxy","Build","Opera Mini\\\/\\d{1,2}\\.\\d{1,2}\\.[\\d\\.]*\\\/\\d{1,2}\\.","Opera"," \\.NET[\\d\\.]*",";"];
	}
}

module.exports = Exclusions;