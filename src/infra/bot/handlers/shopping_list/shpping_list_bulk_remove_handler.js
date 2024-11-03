const ShoppingListNotFoundError = require('../../../errors/shopping_list_not_found_error');
const {
    ErrorMessages,
    ShoppingListMessages,
} = require('../../../enumerators/messages');

class ShoppingListBulkRemoveHandler {
    constructor(shoppingListService, logger) {
        this.shoppingListService = shoppingListService;
        this.logger = logger;
    }

    async handle(ctx) {
        const args = ctx.message.text.split(' ').slice(1);
        const userId = ctx.message.from.id;

        if (args.length === 0) {
            return ctx.reply(ErrorMessages.SHOPPING_LIST_BULK_REMOVE_USAGE, {
                parse_mode: 'Markdown',
            });
        }

        let itemIds;
        if (args[0].toLowerCase() === 'all') {
            itemIds = [];
        } else {
            itemIds = args.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

            if (itemIds.length === 0) {
                return ctx.reply(ErrorMessages.INVALID_ITEM_IDS, {
                    parse_mode: 'Markdown',
                });
            }
        }

        try {
            const removed = await this.shoppingListService.bulkRemoveItems(
                userId,
                itemIds
            );
            if (!removed) {
                this.logger.warn('No items found for bulk removal');
                ctx.reply(ErrorMessages.NO_ITEMS_FOUND, {
                    parse_mode: 'Markdown',
                });
                return;
            }

            const message = itemIds.length
                ? ShoppingListMessages.ITEMS_REMOVED.replace(
                      '{{itemCount}}',
                      itemIds.length
                  )
                : ShoppingListMessages.ALL_ITEMS_REMOVED;

            ctx.reply(message, { parse_mode: 'Markdown' });
            this.logger.info(
                `Items removed from shopping list for user ${userId}: ${itemIds.length ? itemIds.join(', ') : 'all items'}`
            );
        } catch (error) {
            if (error instanceof ShoppingListNotFoundError) {
                this.logger.warn(
                    `Items not found for bulk removal for user ${userId}`
                );
                ctx.reply(ErrorMessages.NO_ITEMS_FOUND, {
                    parse_mode: 'Markdown',
                });
            } else {
                this.logger.error(
                    `Unexpected error during bulk removal for user ${userId}: ${error.message}`
                );
                ctx.reply(ErrorMessages.UNEXPECTED_ERROR);
            }
        }
    }
}

module.exports = ShoppingListBulkRemoveHandler;
