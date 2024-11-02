const { HelpMessages } = require('../../../enumerators/messages');

function getRemindersHelp() {
    return [
        HelpMessages.HELP_REMINDER,
        HelpMessages.HELP_WHATS_FOR_THE_DAY,
        HelpMessages.HELP_OPEN_REMINDERS,
        HelpMessages.HELP_OTHER,
    ].join('\n');
}

module.exports = getRemindersHelp;
