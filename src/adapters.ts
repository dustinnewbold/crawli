import { systemLogger } from './adapters/loggers/systemLogger';
import { puppeteer } from './adapters/browsers/puppeteer';
import { BrowserAdapter, LoggerAdapter } from './types/Adapters';

interface AdapterImplementationType {
	browser: BrowserAdapter;
	logger: LoggerAdapter;
}

export const adapters: AdapterImplementationType = {
	browser: puppeteer,
	logger: systemLogger,
};

export const browser = adapters.browser;
export const logger = adapters.logger;