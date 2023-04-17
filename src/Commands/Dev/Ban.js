const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const UserModel = require('../../Database/Models/User')
module.exports = class command extends Command {
    constructor() {
        super('ban', {
            description: 'Ban/unban users',
            category: 'dev',
            usage: 'ban [tag/quote users] --action=[ban/unban]',
            cooldown: 5
        })
    }

    /**
     * @param {Message} M
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (M, reply, quoted, mentioned, from, sender, groupMetadata, args) => {
      let { context } = args[0]
      const users = M.mentioned
      if (quoted && !users.includes(quoted.sender.jid)) users.push(quoted.sender.jid)

      if (users.length <= 0) return void M.reply('Tag or quote a user to ban with the reason')

      const { ban } = await this.helper.DB.getUser(users[0])

      if (ban?.banned)

          return void M.reply(

              `🟥 *@${users[0].split('@')[0]}* is already banned by *${ban.bannedBy}* in *${ban.bannedIn} ${
                  ban.time
              } (GMT)*. ❓ Reason: *${ban.reason}*`,

              'text',

              undefined,

              undefined,

              undefined,

              [users[0]]

          )

      if (!context)

          return void M.reply(`Provide the reason to ban. Example - *${this.helper.config.prefix}ban @user | reason*`)

      const reason = context.trim().split('|')[1]

      if (!reason)

          return void M.reply(`Provide the reason to ban. Example - *${this.helper.config.prefix}ban @user | reason*`)

      const { subject } = 

      await this.helper.DB.banUser(users[0], sender.username, subject, reason.trim())

      return void M.reply(

          `*@${users[0].split('@')[0]}* is now banned from using commands. Reason: *${reason.trim()}*`,

          'text',

          undefined,

          undefined,

          undefined,

          [users[0]]

      )

  }

}