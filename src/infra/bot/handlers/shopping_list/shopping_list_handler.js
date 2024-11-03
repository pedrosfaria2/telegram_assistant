const ShoppingListAddHandler = require('./shopping_list_add_handler');
const ShoppingListRemoveHandler = require('./shopping_list_remove_handler');

const ShoppingListListHandler = require('./shopping_list_view_handler');
const ShoppingListStatusHandler = require('./shopping_list_status_handler');
const ShoppingListBulkRemoveHandler = require('./shpping_list_bulk_remove_handler');

class ShoppingListHandler {
    constructor(bot, shoppingListService, logger) {
        this.bot = bot;
        this.logger = logger;
        this.addHandler = new ShoppingListAddHandler(
            shoppingListService,
            logger
        );
        this.removeHandler = new ShoppingListRemoveHandler(
            shoppingListService,
            logger
        );
        this.bulkRemoveHandler = new ShoppingListBulkRemoveHandler(
            shoppingListService,
            logger
        );
        this.viewHandler = new ShoppingListListHandler(
            shoppingListService,
            logger
        );
        this.statusHandler = new ShoppingListStatusHandler(
            shoppingListService,
            logger
        );
    }

    register() {
        this.bot.command(
            'add_item',
            this.addHandler.handle.bind(this.addHandler)
        );
        this.bot.command(
            'remove_item',
            this.removeHandler.handle.bind(this.removeHandler)
        );
        this.bot.command(
            'bulk_remove',
            this.bulkRemoveHandler.handle.bind(this.bulkRemoveHandler)
        );
        this.bot.command(
            'list_items',
            this.viewHandler.handle.bind(this.viewHandler)
        );
        this.bot.command(
            'mark_purchased',
            this.statusHandler.handleMarkAsPurchased.bind(this.statusHandler)
        );
        this.bot.command(
            'unmark_purchased',
            this.statusHandler.handleUnmarkAsPurchased.bind(this.statusHandler)
        );
    }
}

module.exports = ShoppingListHandler;
