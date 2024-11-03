const HelpHandler = require('../bot/handlers/help/help_handler');
const ReminderHandler = require('../bot/handlers/reminder/reminder_handler');
const ShoppingListAddHandler = require('../bot/handlers/shopping_list/shopping_list_add_handler');
const ShoppingListRemoveHandler = require('../bot/handlers/shopping_list/shopping_list_remove_handler');
const ShoppingListListHandler = require('../bot/handlers/shopping_list/shopping_list_view_handler');
const ShoppingListStatusHandler = require('../bot/handlers/shopping_list/shopping_list_status_handler');
const OpenRemindersHandler = require('../bot/handlers/reminder/open_reminds_handler');
const WhatsForTheDayHandler = require('../bot/handlers/reminder/whats_for_the_day_handler');
const ShoppingListBulkRemoveHandler = require('../bot/handlers/shopping_list/shpping_list_bulk_remove_handler');
const { callGPT } = require('../../app/services/gpt/gpt_service');
const chrono = require('chrono-node');
const moment = require('moment');

class MessageInterpreter {
    constructor(bot, shoppingListService, reminderService, logger) {
        this.bot = bot;
        this.logger = logger;
        this.handlers = {
            helpHandler: new HelpHandler(bot, logger),
            reminderHandler: new ReminderHandler(bot, reminderService, logger),
            shoppingListAddHandler: new ShoppingListAddHandler(
                shoppingListService,
                logger
            ),
            shoppingListRemoveHandler: new ShoppingListRemoveHandler(
                shoppingListService,
                logger
            ),
            shoppingListBulkRemoveHandler: new ShoppingListBulkRemoveHandler(
                shoppingListService,
                logger
            ),
            shoppingListListHandler: new ShoppingListListHandler(
                shoppingListService,
                logger
            ),
            shoppingListStatusHandler: new ShoppingListStatusHandler(
                shoppingListService,
                logger
            ),
            openRemindersHandler: new OpenRemindersHandler(
                bot,
                reminderService,
                logger
            ),
            whatsForTheDayHandler: new WhatsForTheDayHandler(
                bot,
                reminderService,
                logger
            ),
        };
    }

    async interpret(ctx) {
        const userMessage = ctx.message.text;
        const userId = ctx.message.from.id;

        const prompt = `
You are an assistant that helps users manage shopping lists, reminders, and provide help information.

Interpret the user's message and identify the 'intent' and any 'entities' in a pure JSON format without any additional text or formatting. The 'intent' should be one of the following:

- 'add_reminder' (entities: date, time, message)
- 'list_reminders'
- 'add_shopping_item' (entities: item)
- 'remove_shopping_item' (entities: itemId)
- 'list_shopping_items'
- 'bulk_remove_shopping_items' (entities: itemIds; itemIds can be an array of IDs or the string "all" if the user wants to remove all items)
- 'mark_shopping_item' (entities: itemId)
- 'unmark_shopping_item' (entities: itemId)
- 'help' (entities: topic; valid topics: 'reminders', 'shoppinglist')
- 'open_reminders'
- 'whats_for_day' (entities: date)

Include any specific details in an 'entities' field using the specified entity names.

Do not include any code snippets or additional formatting; just return the JSON object.

Message: "${userMessage}"
        `;

        try {
            console.log('Sending prompt to GPT...');
            const gptResponse = await callGPT(prompt);
            console.log('Received GPT response:', gptResponse);

            let content = gptResponse.trim();

            if (content.startsWith('```') && content.endsWith('```')) {
                content = content.substring(
                    content.indexOf('\n') + 1,
                    content.lastIndexOf('\n')
                );
            }

            let parsedResponse;
            try {
                parsedResponse = JSON.parse(content);
            } catch (parseError) {
                console.error('Failed to parse GPT response:', parseError);
                return { error: 'Failed to parse GPT response' };
            }

            const intent = parsedResponse.intent?.toLowerCase();
            let entities = parsedResponse.entities || {};

            console.log(
                `Intent extracted: ${intent}, Entities extracted:`,
                entities
            );

            if (entities.date) {
                const parsedDate = chrono.parseDate(entities.date);
                if (parsedDate) {
                    entities.date = moment(parsedDate).format('YYYY-MM-DD');
                } else {
                    console.warn(`Could not parse date: ${entities.date}`);
                }
            }

            switch (intent) {
                case 'add_reminder':
                    console.log('Handling add_reminder intent');
                    ctx.message.text =
                        `/reminder ${entities.date || ''} ${entities.time || ''} ${entities.message || ''}`.trim();
                    await this.handlers.reminderHandler.handleReminder(ctx);
                    break;
                case 'list_reminders':
                    console.log('Handling list_reminders intent');
                    ctx.message.text = '/open_reminders';
                    await this.handlers.openRemindersHandler.handleOpenReminders(
                        ctx
                    );
                    break;
                case 'add_shopping_item':
                    console.log('Handling add_shopping_item intent');
                    ctx.message.text =
                        `/add_item ${entities.item || ''}`.trim();
                    await this.handlers.shoppingListAddHandler.handle(ctx);
                    break;
                case 'remove_shopping_item':
                    console.log('Handling remove_shopping_item intent');
                    ctx.message.text =
                        `/remove_item ${entities.itemId || ''}`.trim();
                    await this.handlers.shoppingListRemoveHandler.handle(ctx);
                    break;
                case 'list_shopping_items':
                    console.log('Handling list_shopping_items intent');
                    ctx.message.text = '/list_items';
                    await this.handlers.shoppingListListHandler.handle(ctx);
                    break;
                case 'bulk_remove_shopping_items':
                    console.log('Handling bulk_remove_shopping_items intent');
                    let itemIds = entities.itemIds || [];
                    if (
                        itemIds === 'all' ||
                        itemIds === 'All' ||
                        itemIds === 'ALL'
                    ) {
                        ctx.message.text = '/bulk_remove all';
                    } else if (Array.isArray(itemIds)) {
                        ctx.message.text =
                            `/bulk_remove ${itemIds.join(' ')}`.trim();
                    } else if (typeof itemIds === 'string') {
                        ctx.message.text = `/bulk_remove ${itemIds}`.trim();
                    } else {
                        ctx.message.text = '/bulk_remove';
                    }
                    await this.handlers.shoppingListBulkRemoveHandler.handle(
                        ctx
                    );
                    break;
                case 'mark_shopping_item':
                    console.log('Handling mark_shopping_item intent');
                    ctx.message.text =
                        `/mark_purchased ${entities.itemId || ''}`.trim();
                    await this.handlers.shoppingListStatusHandler.handleMarkAsPurchased(
                        ctx
                    );
                    break;
                case 'unmark_shopping_item':
                    console.log('Handling unmark_shopping_item intent');
                    ctx.message.text =
                        `/unmark_purchased ${entities.itemId || ''}`.trim();
                    await this.handlers.shoppingListStatusHandler.handleUnmarkAsPurchased(
                        ctx
                    );
                    break;
                case 'help':
                    console.log('Handling help intent');
                    const knownHelpTopics = ['reminders', 'shoppinglist'];
                    let topic = entities.topic?.toLowerCase();
                    if (topic && knownHelpTopics.includes(topic)) {
                        ctx.message.text = `/help ${topic}`;
                    } else {
                        ctx.message.text = '/help';
                    }
                    await this.handlers.helpHandler.handleHelp(ctx);
                    break;
                case 'open_reminders':
                    console.log('Handling open_reminders intent');
                    ctx.message.text = '/open_reminders';
                    await this.handlers.openRemindersHandler.handleOpenReminders(
                        ctx
                    );
                    break;
                case 'whats_for_day':
                    console.log('Handling whats_for_day intent');
                    ctx.message.text =
                        `/whats_for_day ${entities.date || ''}`.trim();
                    await this.handlers.whatsForTheDayHandler.handleWhatsForTheDay(
                        ctx
                    );
                    break;
                default:
                    console.error('Unhandled intent:', intent);
                    await ctx.reply(
                        "I couldn’t understand your request. Please try using commands like 'add reminder', 'add item', etc."
                    );
                    break;
            }
        } catch (error) {
            console.error(`Error interpreting message: ${error.message}`);
            await ctx.reply(
                'There was an issue interpreting your message. Please try again.'
            );
        }
    }
}

module.exports = MessageInterpreter;
