class ShoppingListCreationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShoppingListCreationError';
    }
}

module.exports = ShoppingListCreationError;
