const Command = require('../../Structures/Command')
const axios  = require('axios')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('blowjob', {

            description: 'Sends random animal image',

            category: 'nsfw',

            usage: 'animal',

            exp: 20,

            cooldown: 5

        })

    }

    /**

     * @param {Message} m

     * @returns {Promise<void>}

     */

    execute = async (m) => {
        let blowjob = await axios.get ("https://api.waifu.pics/nsfw/blowjob")
    let buffer = await this.helper.utils.getBuffer(blowjob);
    let gifToMp4 = await this.helper.utils.buffergif(buffer);
    return void (await this.client.sendMessage(m.from , 
        {
            video: gifToMp4 , 
            gifPlayback: true
        }, 
        {
            quoted: m.message
        }
        ))
}
}