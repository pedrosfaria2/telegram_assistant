const ErrorMessages = require('../../../enumerators/messages/errors');
const ShoppingListMessages = require('../../../enumerators/messages/shopping_list');
const ShoppingListCreationError = require('../../../errors/shopping_list_creation_error');

class ShoppingListAddHandler {
    constructor(shoppingListService, logger) {
        this.shoppingListService = shoppingListService;
        this.logger = logger;
    }

    async handle(ctx) {
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
}

module.exports = ShoppingListAddHandler;
