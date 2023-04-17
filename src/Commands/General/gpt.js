const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
 const { chat } = require('../../lib/openAi')
module.exports = class command extends Command {
    constructor() {
        super('gpt', {
            description: 'Says hi to the bot',
            category: 'general',
            usage: 'hi',
            aliases: ['hello'],
            exp: 15,
            cooldown: 5
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M , args) => {
        // if (!client.config.openai.apiKey) return M.reply('You have not provided an OpenAI API key in the config file')
        
        let {context} = args
        // const input = args.join(' ')
        if (context === null) return M.reply('Please provide some text to prompt the AI')
        
        try {
            const response = await chat(context)
            let res = response.response;

            let text = `Q. ${context}\n\nA. ${res.trim().replace(/\n\n/, '\n')}`;

            // let text = `Q. ${context}\n\n${'A.'+res}`
            await this.client.sendMessage(M.from , {text: text})
        
        } catch (err) {
            M.reply(`Error: ${err}`)
        }
    }
}
