class ShoppingListNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShoppingListNotFoundError';
    }
}

module.exports = ShoppingListNotFoundError;
