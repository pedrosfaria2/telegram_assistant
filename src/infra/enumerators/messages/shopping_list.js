const ShoppingListMessages = Object.freeze({
    ITEM_ADDED: '🛒 Successfully added *{{item}}* to your shopping list!',
    ITEM_REMOVED:
        '🗑️ Successfully removed item with ID *{{itemId}}* from your shopping list.',
    NO_ITEMS: 'Your shopping list is empty! Add some items to get started. 😊',
    ITEM_LIST: '📝 Here are the items in your shopping list:\n\n{{items}}',
    ITEM_MARKED:
        '✅ Successfully marked item with ID *{{itemId}}* as purchased.',
    ITEM_UNMARKED:
        '🔄 Successfully unmarked item with ID *{{itemId}}* as purchased.',
});

module.exports = ShoppingListMessages;
