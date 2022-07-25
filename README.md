# Crawli

The goal of this repo is to create a CLI (and eventually a related GUI) to help crawl and find issues with a site from a third-party viewpoint.

## Development

1. Download the repository
2. Run `npm install`
3. Set up your configuration (see Configuration section)
4. Run `npm run crawli`

## Configuration

This project utilizes a configuration file to determine how to crawl. This will eventually be supported through direct command options (and partially does currently), the recommended approach is to set up a configuration file.

To set up configuration for local testing/development/usage, copy `.crawlirc.example.json` to `.crawlirc.json` and update the configuration to match your usage.