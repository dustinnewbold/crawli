#!/usr/bin/env node

import { program } from 'commander';
import { crawli } from './crawl';
import { getConfig } from './services/getConfig';

program
    .name('crawli')
    .description('A CLI to crawl a website and determine all related information about the site with options to crawl a full domain host.')
    .version('0.0.9');

program
    .argument('[url]', 'The URL you wish you crawl')
	.option('-d, --no-follow', 'Do not follow links', true)
	.option('-j, --no-js', 'Do not use JavaScript')
	.option('-v, --verbose', 'Verbose logging')
	.option('-s, --screenshot', 'Takes a screenshot of the page during crawl')
    .action((url, options) => {
        const config = getConfig({url}, options);
        if ( ! config.startURL ) {
            console.error('Please provide a valid URL');
            process.exit(1);
        }
        crawli(config);
    });

program.parse();