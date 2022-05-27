import { BrowserAdapter } from '../types/Adapters';
import Puppeteer from 'puppeteer';
import { CrawliOptions } from '../options';

export const puppeteer: BrowserAdapter = async (config: CrawliOptions) => {
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();

	return {
		start: () => {},
        close: () => {
            browser.close();
        }
	};
};
