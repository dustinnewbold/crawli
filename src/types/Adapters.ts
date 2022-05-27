import { CrawliOptions } from '../options';

export type BrowserAdapter = (config: CrawliOptions) => Promise<{
	start: () => void;
    close: () => void;
}>;
