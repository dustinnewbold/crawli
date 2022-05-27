import { rcFile } from 'rc-config-loader';

import { adapters } from './adapters';
import { CrawliOptions } from './options';
import { CLIOptions } from './types/CLIOptions';


export const crawli = async (config: CrawliOptions) => {
    console.log(config);
	// const browser = await adapters.browser(config);
    // browser.close();
};
