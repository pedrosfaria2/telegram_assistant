const {
    ErrorMessages,
    ShoppingListMessages,
} = require('../../../enumerators/messages');
const ShoppingListNotFoundError = require('../../../errors/shopping_list_not_found_error');

class ShoppingListStatusHandler {
    constructor(shoppingListService, logger) {
        this.shoppingListService = shoppingListService;
        this.logger = logger;
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
                return ctx.reply(ErrorMessages.ITEM_NOT_FOUND);
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
                return ctx.reply(ErrorMessages.ITEM_NOT_FOUND);
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

module.exports = ShoppingListStatusHandler;
