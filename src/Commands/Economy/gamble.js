const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('gamble left/right', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'gamble',

            aliases: ['gamble'],

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

        const amount = parseInt(args[0]);

        if (!amount || amount <= 0) {

            return void m.reply(`Invalid amount. Usage: ${this.client.config.prefix} ${command} <amount>`);

        }

        let economy = await economyJs.findOne({ userId });

        if (!economy) {

            economy = new economyJs({ userId });

            await economy.save();

        }

        if (economy.wallet < amount) {

            return void m.reply('You do not have enough coins to gamble!');

        }

        // Simulate rolling two dice

        const left = Math.floor(Math.random() * 6) + 1;

        const right = Math.floor(Math.random() * 6) + 1;

        const total = left + right;

        if (total >= 7) {

            // Win condition: roll a total of 7 or higher

            economy.wallet += amount;

          return void m.reply(`You won ${amount} coins! 🎉🎉🎉\n\nDice Roll: 🎲 ${left} | ${right} 🎲\nTotal: ${total}`);

        } else {

            // Lose condition: roll a total of less than 7

            economy.wallet -= amount;

          return void m.reply(`You lost ${amount} coins. 😢😢😢\n\nDice Roll: 🎲 ${left} | ${right} 🎲\nTotal: ${total}`);

        }

        await economy.save();

    }

}
