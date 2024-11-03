# Personal Assistant Bot - Telegram Bot

This project is a personal assistant Telegram bot that assists users by providing reminders, shopping list management, and other helpful functionalities. The bot is designed with a modular and scalable structure to support future features, making it ideal for evolving into a complete personal assistant tool.

## Project Overview

The main purpose of this project is to deliver an interactive personal assistant using the Telegram API, with the primary features being reminder management and shopping list management. The bot now also leverages GPT language model integration for improved natural language understanding, offering more intuitive interactions and responses. The project follows Domain-Driven Design (DDD) principles to ensure a clear, scalable, and maintainable code structure.

## Key Technologies

-   **Node.js**: The project is built with Node.js for its powerful asynchronous capabilities and broad community support.
-   **Telegram API**: The bot communicates with users via Telegram, providing an interactive and user-friendly interface.
-   **Sequelize ORM**: Sequelize is used to manage database interactions, enabling easy handling and querying of data.
-   **Domain-Driven Design (DDD)**: The project follows DDD principles to create a structured and modular design that enhances maintainability and scalability.
-   **GPT for Natural Language Processing**: Integration with GPT allows for natural language understanding and intention identification from users.

## Telegram API Integration

To enable communication via Telegram, the bot utilizes the Telegram Bot API. You can create a new bot token for this project by following these steps:

1. **Create a Telegram Bot**: Start a chat with [BotFather](https://core.telegram.org/bots#botfather) on Telegram and follow the prompts to create a new bot.
2. **Retrieve the Token**: After creating the bot, BotFather will provide a unique bot token. This token will be used to authorize API requests.
3. **Configure the Token**: Store this token in a `.env` file under `TELEGRAM_TOKEN` for local development.

Example `.env` file:

```plaintext
TELEGRAM_TOKEN=your_bot_token_here
PORT=intport
DATABASE_URL=./telegram_bot.db
OPENAI_API_KEY=you_open_api_key
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
OPENAI_MODEL=the_model_you_want
OPENAI_MAX_TOKENS=100
OPENAI_TEMPERATURE=0.5
```

## GPT Integration

With the addition of GPT, the bot can interpret natural language commands from users more effectively and intuitively. The GPT language model enables the bot to understand complex commands and extract specific intentions, simplifying user interaction with the bot's interface.

**How GPT Works in the Bot**:

-   The bot uses GPT to process messages and identify the intention behind user commands (e.g., setting a reminder, adding an item to the shopping list, etc.).
-   Natural language processing improves usability as the bot can now understand sentences in natural language and respond according to the identified intent.
-   Relevant extracted data (like dates and items) are then passed to specific handlers for execution.

### Command Examples with GPT

-   "Remind me to buy milk tomorrow at 10 am" ➔ GPT identifies the intent to add a reminder with a specific date and time.
-   "Add bread and eggs to my shopping list" ➔ GPT interprets the user’s intention to add items to the shopping list.
-   "What are my reminders for next week?" ➔ GPT understands the intention to list reminders for the specified period.

## Features

### Current Features

-   **Reminder Management**:
    -   **Set Reminder**: Users can set reminders for specific dates and times using the `/reminder` command.
    -   **View Daily Agenda**: Users can view their agenda for the current or a specific day using `/whats_the_day` command.
    -   **Upcoming Reminders**: Users can view their upcoming reminders using `/open_reminders` command.
-   **Shopping List Management**:
    -   **Add Item**: Users can add an item to their shopping list using `/add_item` command.
    -   **Remove Item**: Users can remove an item from their shopping list using `/remove_item` command.
    -   **List Items**: Users can view all items in their shopping list using `/list_items` command, with each item displaying its status (purchased or not).
    -   **Mark as Purchased**: Users can mark an item as purchased using `/mark_purchased` command.
    -   **Unmark as Purchased**: Users can unmark an item as purchased using `/unmark_purchased` command.
    -   **Bulk Remove**: Users can remove multiple items using `/bulk_remove` command.

### Planned Features

Planned improvements include additional functionalities to help shape this bot into a comprehensive personal assistant. Future updates may incorporate more productivity tools and integrations with external APIs.

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
