const ShoppingListCreationError = require('../../../errors/shopping_list_creation_error');
const ShoppingListNotFoundError = require('../../../errors/shopping_list_not_found_error');
const ErrorMessages = require('../../../enumerators/messages/errors');
const ShoppingListMessages = require('../../../enumerators/messages/shopping_list');

class ShoppingListHandler {
    constructor(bot, shoppingListService, logger) {
        this.bot = bot;
        this.shoppingListService = shoppingListService;
        this.logger = logger;
    }

    register() {
        this.bot.command('add_item', this.handleAddItem.bind(this));
        this.bot.command('remove_item', this.handleRemoveItem.bind(this));
        this.bot.command('list_items', this.handleListItems.bind(this));
        this.bot.command(
            'mark_purchased',
            this.handleMarkAsPurchased.bind(this)
        );
        this.bot.command(
            'unmark_purchased',
            this.handleUnmarkAsPurchased.bind(this)
        );
    }

    async handleAddItem(ctx) {
        const args = ctx.message.text.split(' ').slice(1);

        if (args.length < 1) {
            return ctx.reply(ErrorMessages.SHOPPING_LIST_ADD_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        const item = args.join(' ');
        const userId = ctx.message.from.id;

        try {
            const shoppingListItem = await this.shoppingListService.addItem(
                userId,
                item
            );
            if (!shoppingListItem) {
                this.logger.error('Failed to create shopping list item');
                ctx.reply(ErrorMessages.SHOPPING_LIST_CREATION_ERROR);
                return;
            }
            const formattedMessage = ShoppingListMessages.ITEM_ADDED.replace(
                '{{item}}',
                shoppingListItem.getItem()
            );
            ctx.reply(formattedMessage, { parse_mode: 'Markdown' });
            this.logger.info(
                `Item '${item}' added to shopping list for user ${userId}`
            );
        } catch (error) {
            if (error instanceof ShoppingListCreationError) {
                this.logger.error(
                    `Failed to add item for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.SHOPPING_LIST_CREATION_ERROR);
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
            }
        }
    }

    async handleRemoveItem(ctx) {
        const args = ctx.message.text.split(' ').slice(1);

        if (args.length < 1) {
            return ctx.reply(ErrorMessages.SHOPPING_LIST_REMOVE_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        const itemId = parseInt(args[0]?.toString(), 10);
        const userId = ctx.message.from.id;

        if (isNaN(itemId)) {
            return ctx.reply(ErrorMessages.INVALID_ITEM_ID, {
                parse_mode: 'Markdown',
            });
        }

        try {
            const removed = await this.shoppingListService.removeItem(
                userId,
                itemId
            );
            if (!removed) {
                this.logger.warn('Item not found');
                ctx.reply(ErrorMessages.ITEM_NOT_FOUND);
                return;
            }
            ctx.reply(
                ShoppingListMessages.ITEM_REMOVED.replace(
                    '{{itemId}}',
                    String(itemId)
                ),
                { parse_mode: 'Markdown' }
            );
            this.logger.info(
                `Item with ID '${itemId}' removed from shopping list for user ${userId}`
            );
        } catch (error) {
            if (error instanceof ShoppingListNotFoundError) {
                this.logger.warn(
                    `Item not found for user ${userId} with ID: ${itemId}`
                );
                ctx.reply(ErrorMessages.ITEM_NOT_FOUND, {
                    parse_mode: 'Markdown',
                });
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
            }
        }
    }

    async handleListItems(ctx) {
        const userId = ctx.message.from.id;

        try {
            const items = await this.shoppingListService.listAllItems(userId);
            if (items.length === 0) {
                return ctx.reply(ShoppingListMessages.NO_ITEMS, {
                    parse_mode: 'Markdown',
                });
            }

            const itemList = items
                .map((item, index) =>
                    ShoppingListMessages.ITEM_LIST_FORMAT.replace(
                        '{{index}}',
                        index + 1
                    )
                        .replace('{{item}}', item.getItem())
                        .replace('{{itemId}}', item.getId())
                        .replace(
                            '{{status}}',
                            item.isPurchased()
                                ? ShoppingListMessages.ITEM_PURCHASED
                                : ShoppingListMessages.ITEM_NOT_PURCHASED
                        )
                )
                .join('\n');

            const message = ShoppingListMessages.ITEM_LIST.replace(
                '{{items}}',
                itemList
            );
            ctx.reply(message, { parse_mode: 'Markdown' });
            this.logger.info(`Listed ${items.length} items for user ${userId}`);
        } catch (error) {
            this.logger.error(
                `Failed to list items for user ${userId}: ${error.message}`
            );
            ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
        }
    }

    async handleMarkAsPurchased(ctx) {
        const args = ctx.message.text.split(' ').slice(1);

        if (args.length < 1) {
            return ctx.reply(ErrorMessages.SHOPPING_LIST_MARK_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        const itemId = parseInt(args[0]?.toString(), 10);
        const userId = ctx.message.from.id;

        if (isNaN(itemId)) {
            return ctx.reply(ErrorMessages.INVALID_ITEM_ID, {
                parse_mode: 'Markdown',
            });
        }

        try {
            const marked = await this.shoppingListService.markItemAsPurchased(
                userId,
                itemId
            );
            if (!marked) {
                this.logger.warn('Item not found');
                ctx.reply(ErrorMessages.ITEM_NOT_FOUND);
                return;
            }
            ctx.reply(
                ShoppingListMessages.ITEM_MARKED.replace(
                    '{{itemId}}',
                    String(itemId)
                ),
                { parse_mode: 'Markdown' }
            );
            this.logger.info(
                `Item with ID '${itemId}' marked as purchased for user ${userId}`
            );
        } catch (error) {
            if (error instanceof ShoppingListNotFoundError) {
                this.logger.warn(
                    `Item not found for user ${userId} with ID: ${itemId}`
                );
                ctx.reply(ErrorMessages.ITEM_NOT_FOUND, {
                    parse_mode: 'Markdown',
                });
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
            }
        }
    }

    async handleUnmarkAsPurchased(ctx) {
        const args = ctx.message.text.split(' ').slice(1);

        if (args.length < 1) {
            return ctx.reply(ErrorMessages.SHOPPING_LIST_UNMARK_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        const itemId = parseInt(args[0]?.toString(), 10);
        const userId = ctx.message.from.id;

        if (isNaN(itemId)) {
            return ctx.reply(ErrorMessages.INVALID_ITEM_ID, {
                parse_mode: 'Markdown',
            });
        }

        try {
            const unmarked =
                await this.shoppingListService.unmarkItemAsPurchased(
                    userId,
                    itemId
                );
            if (!unmarked) {
                this.logger.warn('Item not found');
                ctx.reply(ErrorMessages.ITEM_NOT_FOUND);
                return;
            }
            ctx.reply(
                ShoppingListMessages.ITEM_UNMARKED.replace(
                    '{{itemId}}',
                    String(itemId)
                ),
                { parse_mode: 'Markdown' }
            );
            this.logger.info(
                `Item with ID '${itemId}' unmarked as purchased for user ${userId}`
            );
        } catch (error) {
            if (error instanceof ShoppingListNotFoundError) {
                this.logger.warn(
                    `Item not found for user ${userId} with ID: ${itemId}`
                );
                ctx.reply(ErrorMessages.ITEM_NOT_FOUND, {
                    parse_mode: 'Markdown',
                });
            } else {
                this.logger.error(
                    `Unexpected error for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
            }
        }
    }
}

module.exports = ShoppingListHandler;
