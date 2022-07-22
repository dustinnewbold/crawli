import { rcFile } from 'rc-config-loader';
import fs from 'fs';
import merge from 'lodash.merge';

import { CrawliOptions } from '../options';
import { CLIArguments, CLIOptions } from '../types/CLIOptions';

const defaultOptions: CrawliOptions = {
	startURL: '',
	follow: true,
	useJavaScript: true,
	verboseLevel: 1,
};

export const getConfig = (cliArguments: CLIArguments, cliOptions: CLIOptions): CrawliOptions => {
	let configFile: any = {};
	try {
		const configLocation: string | undefined = (() => {
			if (!process.env.CRAWLI_CONFIG) return undefined;
			const envFileExists = fs.existsSync(process.env.CRAWLI_CONFIG);
			return envFileExists ? process.env.CRAWLI_CONFIG : undefined;
		})();
		const results = rcFile('crawli', {
			configFileName: configLocation,
		});
		if (results) configFile = results.config;
	} catch (error) {}

	const combinedConfig = merge<CrawliOptions, CrawliOptions>(defaultOptions, configFile);

	if (cliArguments.url) combinedConfig.startURL = cliArguments.url;
	if (cliOptions.follow) combinedConfig.follow = cliOptions.follow;
	if (cliOptions.js) combinedConfig.useJavaScript = cliOptions.js;

	return combinedConfig;
};
