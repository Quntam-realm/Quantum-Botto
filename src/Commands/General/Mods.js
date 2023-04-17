const Command = require('../../Structures/Command')

module.exports = class command extends Command {
   constructor() {
   super('mods', {
   description: 'Shows bot owner',
   category: 'general',
   usage: 'mods',
   exp: 15,
   cooldown: 5,
   aliases: ['mod', 'owner', 'moderators']

        })
   }

  /**

     * @param {Message} M
     * @returns {Promise<void>}
     */

     execute = async (M, reply) => {
     if (!this.helper.config.mods.length) return void reply('*[MODS]*')
        let text = `🤖 *${this.helper.config.name} Moderators* \n`
        for (let i = 0; i < this.client.config.mods.length; i++)
            text += `\n*#${i + 1}*\n🎐 *Username:* ${
                this.helper.contact.getContact(this.helper.config.mods[i]).username
            }\n♦️ *Contact: https://wa.me/+${this.helper.config.mods[i].split('@')[0]}*`
        return void (await reply(text))
    }
}
