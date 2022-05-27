import { puppeteer } from './adapters/puppeteer';
import { BrowserAdapter } from './types/Adapters';

interface AdapterImplementationType {
	browser: BrowserAdapter;
}

export const adapters: AdapterImplementationType = {
	browser: puppeteer,
};
