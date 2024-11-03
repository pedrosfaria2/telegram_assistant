const ShoppingListItem = require('../../../domain/entities/shopping_list_item');

class ShoppingListService {
    constructor(shoppingListRepository, logger) {
        this.shoppingListRepository = shoppingListRepository;
        this.logger = logger;
    }

    async addItem(userId, item) {
        try {
            const shoppingListItem = new ShoppingListItem({
                userId: Number(userId),
                item,
            });
            await this.shoppingListRepository.save(shoppingListItem);
            this.logger.info(
                `Item '${item}' added to shopping list for user ${userId}`
            );
            return shoppingListItem;
        } catch (error) {
            this.logger.error(
                `Failed to add item to shopping list for user ${userId}: ${error.message}`
            );
            throw error;
        }
    }

    async removeItem(userId, itemId) {
        try {
            const deleted = await this.shoppingListRepository.remove(
                Number(userId),
                itemId
            );

            if (!deleted) {
                this.logger.warn(`Item not found for deletion: ${itemId}`);
                return false;
            }

            this.logger.info(
                `Item with ID '${itemId}' removed from shopping list for user ${userId}`
            );
            return true;
        } catch (error) {
            this.logger.error(
                `Failed to remove item from shopping list: ${error.message}`
            );
            throw error;
        }
    }

    async listAllItems(userId) {
        try {
            const items = await this.shoppingListRepository.listItems(
                Number(userId)
            );
            this.logger.info(
                `Fetched ${items.length} items from shopping list for user ${userId}`
            );
            return items;
        } catch (error) {
            this.logger.error(
                `Failed to fetch shopping list items for user ${userId}: ${error.message}`
            );
            throw error;
        }
    }

    async markItemAsPurchased(userId, itemId) {
        try {
            const updated = await this.shoppingListRepository.markAsPurchased(
                Number(userId),
                itemId
            );
            if (!updated) {
                this.logger.warn(
                    `Item with ID ${itemId} not found for marking as purchased`
                );
                return false;
            }
            this.logger.info(
                `Item with ID ${itemId} marked as purchased for user ${userId}`
            );
            return true;
        } catch (error) {
            this.logger.error(
                `Failed to mark item as purchased for user ${userId}: ${error.message}`
            );
            throw error;
        }
    }

    async unmarkItemAsPurchased(userId, itemId) {
        try {
            const updated = await this.shoppingListRepository.unmarkAsPurchased(
                Number(userId),
                itemId
            );
            if (!updated) {
                this.logger.warn(
                    `Item with ID ${itemId} not found for unmarking as purchased`
                );
                return false;
            }
            this.logger.info(
                `Item with ID ${itemId} unmarked as purchased for user ${userId}`
            );
            return true;
        } catch (error) {
            this.logger.error(
                `Failed to unmark item as purchased for user ${userId}: ${error.message}`
            );
            throw error;
        }
    }
}

module.exports = ShoppingListService;
