const ErrorMessages = require('../../../enumerators/messages/errors');
const ShoppingListMessages = require('../../../enumerators/messages/shopping_list');
const ShoppingListNotFoundError = require('../../../errors/shopping_list_not_found_error');

class ShoppingListRemoveHandler {
    constructor(shoppingListService, logger) {
        this.shoppingListService = shoppingListService;
        this.logger = logger;
    }

    async handle(ctx) {
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
}

module.exports = ShoppingListRemoveHandler;
