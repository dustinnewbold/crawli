import { Metrics } from 'puppeteer';

type PageBase = {
    url: string;
    statusCode: number;
    crawlType: 'full' | 'head' | 'none';
};

export type Page = PageBase & {
    links: string[];
    timings: Metrics; // TODO: Remove "puppeteer" interface to reduce reliance on library
    performance: any;
};

// Used for external pages that don't match followMatch
export type PageLite = PageBase;