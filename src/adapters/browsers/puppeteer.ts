import { BrowserAdapter } from '../../types/Adapters';
import Puppeteer from 'puppeteer';
import { CrawliOptions } from '../../options';
import { Page } from '../../types/Page';
import { fetch } from 'cross-fetch';

export const puppeteer: BrowserAdapter = async (config: CrawliOptions) => {
	const browser = await Puppeteer.launch();
	
	const results: Page[] = [];
	
	// Set throttling property
	// const client = await page.target().createCDPSession();
	// await client.send('Network.emulateNetworkConditions', {
	//     'offline': false,
	//     'downloadThroughput': 250 * 1024 / 8,
	//     'uploadThroughput': 50 * 1024 / 8,
	//     'latency': 300
	// });
		
	const crawl = async (url: string): Promise<Page | null> => {
		const page = await browser.newPage();
		await page.setUserAgent('crawlibot 0.9');
		const pageResult: Partial<Page> = {
			url,
		};

		if ( urlAlreadyCrawled(url) ) return null;
		if ( ! url.startsWith('http') ) return null;

		console.log('Crawling:', url);

		if ( urlInScope(url) ) {
			pageResult.crawlType = 'full';
			const response = await page.goto(url, {
				waitUntil: 'networkidle2',
			});
			if ( ! response ) return response;

			const links = await page.$$eval('a', elements => elements.map(element => (element as HTMLAnchorElement).href));
			const metrics = await page.metrics();
			const rawPerfEntries = await page.evaluate(function () {
				return JSON.stringify(window.performance.getEntries());
			});
			const performanceEntries = JSON.parse(rawPerfEntries);
			pageResult.timings = metrics;
			pageResult.links = links;
			pageResult.performance = performanceEntries;
			pageResult.statusCode = response.status();
		} else {
			const response = await fetch(url, { method: 'GET' });
			pageResult.crawlType = 'head';
			pageResult.statusCode = response.status;
		}
		page.close();

		results.push(pageResult as Page);
		return pageResult as Page;
	};

	const start = async (links?: string[], update?: Function) => {
		if ( ! links ) links = [config.startURL];
		for ( let i = 0; i < links.length; i++ ) {
			const link = links[i];
			if ( link.indexOf('#') >= 0 ) {
				console.log('Skipping', link);
				continue;
			}
			try {
				const page = await crawl(link);
				if ( page && page.links?.length > 0 ) await start(page.links);
			} catch {
				console.error('!! errored on', link);
			}
			if ( update ) update(results);
		}

		return results;
	};

	const urlAlreadyCrawled = (url: string) => {
		const urlResults = results.filter(page => page.url === url);
		return urlResults.length > 0;
	};

	const urlInScope = (url: string) => {
		return url.startsWith(config.startURL);
	};

	return {
		start,
		close: async () => await browser.close(),
	};
};
