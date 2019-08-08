
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ".";


client.on('ready', () => {
console.log('I am ready!');
});

client.on('message', msg => {



if (!msg.content.startsWith(prefix)) return;

var args = msg.content.substring(prefix.length).split(" ");

switch (args[0].toLowerCase()){
  case "ping":
      msg.reply('pong');
      break;
  default: msg.channel.sendMessage("Nani?");
}


console.log(msg.content);

});


client.login(process.env.BOT_TOKEN);
