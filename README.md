# Lazr Discord Bot

![CI](https://img.shields.io/github/actions/workflow/status/xaviermontane/lazr/ci.yml?branch=main&style=flat-round)
![License](https://img.shields.io/github/license/xaviermontane/lazr?style=flat-round)
![GitHub last commit](https://img.shields.io/github/last-commit/xaviermontane/lazr?style=flat-round)

A modular Discord bot built with [discord.js](https://discord.js.org/).

## Features

- Slash command support
- Modular command and event structure
- Easy command deployment

## Usage

**Install dependencies:**
```sh
npm install
```

**Start the bot:**
```sh
npm run start
```

**Deploy slash commands:**
```sh
npm run deploy
```

## Configuration

Create a `config.json` file in the root directory with the following structure:

```json
{
    "token": "your-bot-token",
    "clientId": "your-client-id",
    "guildId": "your-guild-id"
}
```

## License

[GPL-3.0-only](LICENSE)
