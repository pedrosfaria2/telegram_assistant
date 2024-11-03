const { HelpMessages } = require('../../../enumerators/messages');

function getShoppingListHelp() {
    return [
        HelpMessages.HELP_SHOPPING_LIST_ADD,
        HelpMessages.HELP_SHOPPING_LIST_REMOVE,
        HelpMessages.HELP_SHOPPING_LIST_LIST,
        HelpMessages.HELP_SHOPPING_LIST_MARK,
        HelpMessages.HELP_SHOPPING_LIST_UNMARK,
        HelpMessages.HELP_OTHER,
    ].join('\n');
}

module.exports = getShoppingListHelp;
