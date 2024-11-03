const ShoppingListMessages = Object.freeze({
    ITEM_ADDED: '🛒 Yay! *{{item}}* has been added to your shopping list! 🎉',
    ITEM_REMOVED:
        '🗑️ Item with ID *{{itemId}}* has been removed from your shopping list. Bye-bye, clutter! 🧹',
    NO_ITEMS: 'Your shopping list is empty! Time to add some goodies! 😊',
    ITEM_LIST: '📝 Here are the treasures in your shopping list:\n\n{{items}}',
    ITEM_LIST_FORMAT: '{{index}}. *{{item}}* (ID: {{itemId}}) - {{status}}',
    ITEM_MARKED:
        '✅ Great! Item with ID *{{itemId}}* has been marked as purchased. 🛍️',
    ITEM_UNMARKED:
        '🔄 Item with ID *{{itemId}}* is back on the list as "not purchased." Ready for the next trip! 🚶‍♂️',
    ITEM_PURCHASED: '✅ Purchased',
    ITEM_NOT_PURCHASED: '❌ Not purchased',
    ITEMS_REMOVED:
        'Success! I’ve cleared out *{{itemCount}}* items from your list. Nice and tidy! ✨',
    ALL_ITEMS_REMOVED:
        '🎉 All set! Your shopping list is completely clear. Fresh start! 🧼',
});

module.exports = ShoppingListMessages;
