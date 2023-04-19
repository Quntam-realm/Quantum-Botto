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
    {buttonId: 'id1', buttonText: {displayText: 'Button 1'}, type: 1},
    {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1},
    {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1}
  ]
  
  const buttonMessage = {
      text: "Hi it's button message",
      footer: 'Hello World',
      buttons: buttons,
      headerType: 1
  }
  
  await this.client.sendMessage(m.from, buttonMessage)

    }
}
