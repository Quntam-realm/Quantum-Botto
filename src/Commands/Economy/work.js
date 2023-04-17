const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('work', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'work',

            aliases: ['work'],

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

const minCoins = 100;

    const maxCoins = 1000;

    const earnedCoins = Math.floor(Math.random() * (maxCoins - minCoins + 1)) + minCoins;

    const economy = await economyJs.findOne({ userId: m.sender });

    if (!economy) return void m.reply('You don\'t have an economy profile.');

    economy.wallet += earnedCoins;

    await economy.save();

   return void m.reply(`You worked hard and earned ${earnedCoins} coins!`);

  

      

    }

}
