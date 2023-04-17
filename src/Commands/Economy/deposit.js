





const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('deposit', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'deposit',

            aliases: ['deposit'],

            cooldown: 10

        })

    }

  /**

  * @param {Message} M

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */

  execute = async (M, user, args) => {

    if (M.numbers.length < 1) return void M.reply('Specify the amount of gold to deposit')

       const { wallet } = await this.helper.DB.getUser(M.sender.jid)

       if (M.numbers[0] > wallet) return void M.reply(`Check your wallet`)

       await this.helper.DB.setGold(M.sender.jid, M.numbers[0], 'bank')

       await this.helper.DB.setGold(M.sender.jid, -M.numbers[0])



 const text = `${M.numbers[0]} to your bank`

 return void (await M.reply(text))

}
   }