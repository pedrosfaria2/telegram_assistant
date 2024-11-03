const DatabaseError = require('../../infra/errors/database_error');
const ShoppingList = require('../db/models/shopping_list');
const ShoppingListItem = require('../../domain/entities/shopping_list_item');

class ShoppingListRepository {
    async save(shoppingListItem) {
        try {
            const savedItem = await ShoppingList.create({
                userId: shoppingListItem.getUserId(),
                item: shoppingListItem.getItem(),
                purchased: shoppingListItem.isPurchased(),
            });
            return this._mapToDomainEntity(savedItem);
        } catch (error) {
            console.error(
                `Failed to save shopping list item: ${error.message}`
            );
            return null;
        }
    }

    async searchAll() {
        try {
            const items = await ShoppingList.findAll();
            return items.map(item => this._mapToDomainEntity(item));
        } catch (error) {
            console.error(
                `Failed to fetch shopping list items: ${error.message}`
            );
            return [];
        }
    }

    async findByFilters(userId, filters) {
        try {
            const whereClause = { userId, ...filters };
            const items = await ShoppingList.findAll({ where: whereClause });
            return items.map(item => this._mapToDomainEntity(item));
        } catch (error) {
            console.error(
                `Failed to fetch filtered shopping list items: ${error.message}`
            );
            return [];
        }
    }

    async remove(userId, itemId) {
        try {
            const whereClause = {
                id: itemId,
                userId: userId,
            };
            console.log(`Attempting to delete with whereClause:`, whereClause);

            const deletedCount = await ShoppingList.destroy({
                where: whereClause,
            });

            if (deletedCount === 0) {
                console.warn(`Item with ID ${itemId} not found for removal`);
                return false;
            }

            console.info(`Item with ID ${itemId} successfully deleted.`);
            return true;
        } catch (error) {
            console.error(
                `Failed to remove shopping list item: ${error.message}`
            );
            return false;
        }
    }

    async bulkRemove(userId, itemIds = []) {
        try {
            const whereClause = { userId };
            if (itemIds.length > 0) {
                whereClause.id = itemIds;
            }

            const deletedCount = await ShoppingList.destroy({
                where: whereClause,
            });

            if (deletedCount === 0) {
                console.warn(`No items found for removal`);
                return false;
            }

            console.info(
                `Items successfully deleted. Removed ${deletedCount} items.`
            );
            return true;
        } catch (error) {
            console.error(
                `Failed to remove shopping list items: ${error.message}`
            );
            return false;
        }
    }

    async update(shoppingListItem) {
        try {
            const updateData = {
                item: shoppingListItem.getItem(),
                purchased: shoppingListItem.isPurchased(),
            };
            const whereClause = {
                id: shoppingListItem.getId(),
                userId: shoppingListItem.getUserId(),
            };
            const [updated] = await ShoppingList.update(updateData, {
                where: whereClause,
            });

            if (updated === 0) {
                console.warn(
                    `Item with ID ${shoppingListItem.getId()} not found for update`
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error(
                `Failed to update shopping list item: ${error.message}`
            );
            return false;
        }
    }

    async listItems(userId) {
        try {
            const whereClause = { userId };
            const items = await ShoppingList.findAll({
                where: whereClause,
                order: [['id', 'ASC']],
            });
            return items.map(item => this._mapToDomainEntity(item));
        } catch (error) {
            console.error(
                `Failed to list shopping list items: ${error.message}`
            );
            return [];
        }
    }

    async markAsPurchased(userId, itemId) {
        try {
            const updateData = { purchased: true };
            const whereClause = { id: itemId, userId };
            const [updated] = await ShoppingList.update(updateData, {
                where: whereClause,
            });

            if (updated === 0) {
                console.warn(
                    `Item with ID ${itemId} not found to mark as purchased`
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error(`Failed to mark item as purchased: ${error.message}`);
            return false;
        }
    }

    async unmarkAsPurchased(userId, itemId) {
        try {
            const updateData = { purchased: false };
            const whereClause = { id: itemId, userId };
            const [updated] = await ShoppingList.update(updateData, {
                where: whereClause,
            });

            if (updated === 0) {
                console.warn(
                    `Item with ID ${itemId} not found to unmark as purchased`
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error(
                `Failed to unmark item as purchased: ${error.message}`
            );
            return false;
        }
    }

    _mapToDomainEntity(dbItem) {
        return new ShoppingListItem({
            id: dbItem.id,
            userId: dbItem.userId,
            item: dbItem.item,
            purchased: dbItem.purchased,
        });
    }
}

module.exports = ShoppingListRepository;
