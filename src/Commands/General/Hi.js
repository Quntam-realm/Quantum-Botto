const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('hi', {
            description: 'Says hi to the bot',
            category: 'general',
            usage: 'hi',
            aliases: ['hello'],
            exp: 15,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m) => {
        // return void m.reply(`Hello! ${m.sender.username}`)
        // send a buttons message!
        const buttons = [
            {
                buttonId: 'id1',
                buttonText: { displayText: `${this.client.config.prefix}help` },
                type: 1
            }
        ]
        const buttonMessage = {
image: {url:"https://telegra.ph/file/75368c6fe4abb9d0f2bb9.png"},
            caption: `👋🏻 Hi *${sender.username}*, I'm ${this.client.config.name}.`,
            footer: 'Aku 2023',

            buttons: buttons,
            headerType: 1
        }
        return void (await this.client.sendMessage(from, buttonMessage, {
            quoted: m.message
        }))
    }
}
