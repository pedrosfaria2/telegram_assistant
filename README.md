# Personal Assistant Bot - Telegram Bot

This project is a personal assistant Telegram bot that assists users by providing reminders and other helpful functionalities. The bot is designed to offer a modular and scalable structure to support future features, making it ideal for evolving into a complete personal assistant tool.

## Project Overview

The main purpose of this project is to deliver an interactive personal assistant using the Telegram API, with the primary feature being a reminder bot. Users can set reminders for specific dates and times, and the bot will send timely notifications via Telegram. The project leverages Domain-Driven Design (DDD) principles, which ensure a clear and organized code structure that is scalable and easy to maintain.

## Key Technologies

-   **Node.js**: The project is built with Node.js for its powerful asynchronous capabilities and broad community support.
-   **Telegram API**: The bot communicates with users over Telegram, providing an interactive and user-friendly interface.
-   **Sequelize ORM**: Sequelize is used to manage database interactions, enabling a simple way to handle and query data.
-   **Domain-Driven Design (DDD)**: The project follows DDD principles to create a structured and modular design that enhances maintainability and scalability.
-   **Custom Logging with Chalk**: A customized logging class utilizing Chalk for colored and well-formatted logs.

## Telegram API Integration

To enable communication via Telegram, the bot utilizes the Telegram Bot API. You can create a new bot token for this project by following these steps:

1. **Create a Telegram Bot**: Start a chat with [BotFather](https://core.telegram.org/bots#botfather) on Telegram and follow the prompts to create a new bot.
2. **Retrieve the Token**: After creating the bot, BotFather will provide a unique bot token. This token will be used to authorize API requests.
3. **Configure the Token**: Store this token in a `.env` file under `TELEGRAM_TOKEN` for local development.

Example `.env` file:

```plaintext
TELEGRAM_TOKEN=your_bot_token_here
PORT=intport
DATABASE_URL=./reminders.db
```

## Features

### Current Features

-   **Reminder**: Users can set reminders for specific dates and times using the `/reminder` command.
-   **What's for the day**: Users can see their agenda for the current or specific day using `/whats_the_day` command.
- **Upcoming Calendar**: Users can see their upcoming reminders using `/open_reminders` command.

### Planned Features

Planned improvements include additional functionalities that will help shape this bot into a comprehensive personal assistant. Upcoming features may incorporate integrations with Natural Language Processing (NLP) for better understanding and interaction capabilities, as well as additional productivity tools and integrations with various APIs.

## Setup & Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/pedrosfaria2/telegram_assistant.git
    cd telegram_assistant
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Environment Setup**:

    - Create a `.env` file in the root directory.
    - Add your `TELEGRAM_TOKEN` and other necessary environment variables.

4. **Run the Bot**:
    ```bash
    node src/main.js
    ```

## License

This project is licensed under the MIT License.
