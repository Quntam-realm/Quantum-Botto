/*

* All three variable declaration are important on every commands

*/

const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('withdraw', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'withdraw',

            aliases: ['withdraw'],

            cooldown: 10

        })

    }

  /**

  * @param {Message} M

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */

 execute = async (m, args) => {

  /*

  * Fetch username and jid

  * Important if pushing username on command

  */
const userId = m.sender;

    let economy = await economyJs.findOne({ userId: userId });

    if (!economy) {

      economy = new economyJs({ userId: userId });

      await economy.save();

    }

    const wallet = economy.wallet;

    const bank = economy.bank;

    if (isNaN(args[0])) return m.reply('❌ Please provide a valid number to withdraw.');

    const amount = parseInt(args[0]);

    if (amount > bank) return m.reply( '❌You don\'t have enough coins in your bank account to withdraw.');

    if (amount <= 0) return m.reply('❌ Please provide a valid amount to withdraw.');

    economy.bank -= amount;

    economy.wallet += amount;

    await economy.save();

    return void m.reply(`🏧Successfully withdrew ${amount} coins from your bank account.`);

    }
  
}
