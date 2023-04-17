/*

* All three variable declaration are important on every commands

*/
const moment = require('moment-timezone');

const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('beg', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'beh',

            aliases: ['beg'],

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

 const minCoins = 1;

    const maxCoins = 100;

    const earnedCoins = Math.floor(Math.random() * (maxCoins - minCoins + 1)) + minCoins;

    const userId = m.sender;

    const economy = await economyJs.findOne({ userId });

    if (!economy) return m.reply('❌You don\'t have an economy profile.');

    const lastBegTime = economy.lastBegTime;

    const now = moment().tz('Asia/Kolkata');

    const diffInMinutes = now.diff(lastBegTime, 'minutes');

    if (diffInMinutes < 60) {

      const remainingTime = moment.duration(60 - diffInMinutes, 'minutes').humanize();
        

                                                                                                                    
   return void m.reply(`❌You can only beg once per hour Please wait ${remainingTime} before begging again.`);

    }

    economy.wallet += earnedCoins;

    economy.lastBegTime = now;

    await economy.save();

  return void m.reply(`You begged 🙏 and received ${earnedCoins} coins!`);

  }

}
