const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('blowjob', {
            description: 'Sends random blowjob image',
            category: 'nsfw',
            usage: 'blowjob',
            exp: 20,
            cooldown: 5
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const { url } = await this.helper.utils.fetch('https://api.waifu.pics/nsfw/blowjob')
        return void (await M.reply(await this.helper.utils.getBuffer(url), 'image'))
    }
}
