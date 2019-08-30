const commando = require('discord.js-commando');

class ping extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: 'ping',
            group: 'simple',
            memberName: 'ping',
            description: 'Sprawdza połączenie'
        });
    }

    async run(message, args)
    {
        message.reply("pong");
    }


}

module.exports = ping;