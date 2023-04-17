/*

* All three variable declaration are important on every commands

*/

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('wallet', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'wallet',

            aliases: ['wallet'],

            cooldown: 10

        })

    }

  /**

  * @param {Message} M

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */

 execute = async (M, reply, sender, args) => {

  /*

  * Fetch username and jid

  * Important if pushing username on command

  */

     const { wallet, tag } = await this.helper.DB.getUser(M.sender.jid)

        const text = `👛 *Wallet* 👛\n\n⛩️ *Name: ${M.sender.username}*\n\n 💮 *tag: #${tag}*\n\n🪙 *Gold: ${wallet}*`

        return void (await M.reply(text))

    }

}

 


