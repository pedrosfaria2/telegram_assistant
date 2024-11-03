const ErrorMessages = require('../../../enumerators/messages/errors');
const ShoppingListMessages = require('../../../enumerators/messages/shopping_list');

class ShoppingListListHandler {
    constructor(shoppingListService, logger) {
        this.shoppingListService = shoppingListService;
        this.logger = logger;
    }

    async handle(ctx) {
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
                        .replace('{{itemId}}', String(item.getId()))
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
}

module.exports = ShoppingListListHandler;
