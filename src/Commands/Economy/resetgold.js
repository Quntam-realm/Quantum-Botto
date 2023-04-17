const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')


const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('rg', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'rg',

            aliases: ['rg'],

            cooldown: 10

        })

    }

  /**

  * @param {Message} M

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */

 execute = async (M, args) => {

  /*

  * Fetch username and jid

  * Important if pushing username on command

  */

    // Get user ID from mention

    const userId =M.mentioned

    if (!userId) return M.reply('Please mention a user to reset their economy data.');

    let economy = await economyJs.findOne({ userId: userId });

    if (!economy) {

      economy = new economyJs({ userId: userId });

    }

    // Reset all data

    if (args[1] === 'all') {

      economy.wallet = 0;

      economy.bank = 0;

    }

    // Reset specified amount

    else if (!isNaN(args[1])) {

      const amount = parseInt(args[1]);

      economy.wallet -= amount;

    //   economy.bank -= amount;

      if (economy.wallet < 0) economy.wallet = 0;

    //   if (economy.bank < 0) economy.bank = 0;

    }

    // Invalid argument

    else {

      return void M.reply(`Invalid argument: ${args[1]}. Usage: ${this.helper.config.prefix}reset @user [all/amount]`);

    }

    await economy.save();

    return void M.reply(`Successfully reset ${args[1]} coins for user ${userId}.`);

  }

}

