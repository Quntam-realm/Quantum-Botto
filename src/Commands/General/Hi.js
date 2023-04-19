Command = require('../../Structures/Command')
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

  try{

const buttons = [
    {buttonId: `help`, buttonText: {displayText: 'Button 1'}, type: 1}
  ]
  
  const buttonMessage = {
      text: `Hi it's button message  ${m.sender.username}`,
      image: 'https://images6.alphacoders.com/103/1037400.png',
      footer: 'Hello World',
      buttons: buttons,
      headerType: 1
  }
  
  return void (await this.client.sendMessage(m.from, buttonMessage))
  }
  catch(err){
    m.reply(err)
  }
    }
}
