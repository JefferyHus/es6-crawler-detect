import Crawler from './lib/crawler';

export default Crawler;

if (typeof window !== 'undefined' && typeof window.Crawler == 'undefined')
{
	window.Crawler = Crawler;
}