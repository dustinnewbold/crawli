import { adapters } from './adapters';
import { CrawliOptions } from './options';
import { log } from './services/log';
import fs from 'fs';
import { Page } from './types/Page';


export const crawli = async (config: CrawliOptions) => {
    const onUpdate = (results: Page[]) => {
        fs.writeFileSync('results.json', JSON.stringify(results), 'utf-8');
    };

	const browser = await adapters.browser(config);
    // @ts-ignore
    const results = await browser.start(undefined, onUpdate);
    await browser.close();

    // @ts-ignore
    onUpdate(results);

    console.log('Done!');
};
