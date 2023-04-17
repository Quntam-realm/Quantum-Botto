
const Command = require('../../Structures/Command')
const economyJs = require("../../Database/Models/Economy")
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('leaderboard', {
            description: 'Ban/unban users',
            category: 'economy',
            usage: 'ban [tag/quote users] --action=[ban/unban]',
            cooldown: 5
        })
    }

    
  /**

  * @param {Message} M

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */
  execute = async (M, args) => {
    let users = await this.helper.DB.user.find({});

    if (flags.includes('--group')) {
        if (!M.groupMetadata)
        return void setTimeout(async () => await this.execute(M, flags, []), 3000)


        const users = [];
        const { participants } = M.groupMetadata;

        for (const participant of participants)
            users.push(await this.helper.DB.getUser(participant.id));

        flags.splice(flags.indexOf('--group'), 1);
    }

    let text = `♕︎ *LEADERBOARD* ♕︎`;
    const n = users.length < 10 ? users.length : 10;

    for (let i = 0; i < n; i++) {
        let { username } = this.helper.contact.getContact(users[i].jid);

        text += `\n🎉 *#${i + 1}*\n🌀 *Username:* ${username}#${users[i].tag}\n🎉 *Experience:* ${users[i].experience}\n🎐 *Rank:* ${getStats(users[i].level).rank}\n🪙 *Gold:* ${users[i].wallet + users[i].bank}`;
    }

    return void M.reply(text);
};
}