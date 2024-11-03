class ShoppingListItem {
    constructor({ id = null, userId, item, purchased = false }) {
        if (!item || typeof item !== 'string' || item.trim() === '') {
            throw new Error(
                'Item name is required and must be a non-empty string'
            );
        }
        if (!userId || typeof userId !== 'number' || userId <= 0) {
            throw new Error(
                'User ID is required and must be a positive number'
            );
        }
        if (typeof purchased !== 'boolean') {
            throw new Error('Purchased status must be a boolean');
        }

        this._id = id;
        this._userId = userId;
        this._item = item;
        this._purchased = purchased;
    }

    getId() {
        return this._id;
    }

    getUserId() {
        return this._userId;
    }

    getItem() {
        return this._item;
    }

    isPurchased() {
        return this._purchased;
    }

    setItem(newItem) {
        if (!newItem || typeof newItem !== 'string' || newItem.trim() === '') {
            throw new Error('New item name must be a non-empty string');
        }
        this._item = newItem;
    }

    setPurchased(status) {
        if (typeof status !== 'boolean') {
            throw new Error('Purchased status must be a boolean');
        }
        this._purchased = status;
    }
}

module.exports = ShoppingListItem;
