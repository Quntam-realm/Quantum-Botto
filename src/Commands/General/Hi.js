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
        const hello =[
            {buttonId: `${this.helper.config.prefix}help`, buttonText: {displayText: 'Commands'}, types: 2},
            {buttonId: `${this.helper.config.prefix}profile`, buttonText: {displayText: 'Profile'}, types: 1},
     
        ]
        let buttonMessageds = {
         image: {url:"https://telegra.ph/file/75368c6fe4abb9d0f2bb9.png"},
         caption: `Hello! ${m.sender.username}` ,
         footer: `${this.helper.config.name}`,
         buttons: hello,
         headerType: 4
     }
     await this.client.sendMessage(m.from,buttonMessageds,{quoted:m.message})

    }
}
