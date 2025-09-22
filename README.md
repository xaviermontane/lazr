# Lazr Discord Bot

A modular Discord bot built with [discord.js](https://discord.js.org/).

## Features

- Slash command support
- Modular command and event structure
- Easy command deployment
- File logging with structured metadata

## Usage

**Install dependencies:**

```sh
npm install
```

**Configure environment:**

```sh
cp .env.example .env
# Edit .env with your bot credentials
```

**Deploy slash commands:**

```sh
npm run deploy
```

**Start the bot:**

```sh
npm run start
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
LOG_LEVEL=info
WELCOME_CHANNEL_ID=your_welcome_channel_id_here
```

## Docker Support

**Build and run with Docker:**

```sh
npm run docker:build
npm run docker:run
```

## License

[GPL-3.0-only](LICENSE)
