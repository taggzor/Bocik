const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ".";
const YTDL = require("ytdl-core");
const superagent= require("superagent")

const lolchamp = ['Aatrox', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Ashe', 'Aurelion Sol', 'Azir', 'Bard', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', 'Cho\'Gath', 'Corki', 'Darius', 'Diana', 'Dr Mundo', 'Draven', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gankplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern', 'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kai\'Sa', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', 'Kha\'Zix', 'Kindred', 'Kled', 'Kog\'Maw', 'LeBlanc', 'Lee Sin', 'Leona', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Malphite', 'Malzahar', 'Maokai', 'Master Yi', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Neeko', 'Nidalee', 'Nocturne', 'Nunu i Willump', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Pyke', 'Qiyana', 'Quinn', 'Rakan', 'Rammus', 'Rek\'Sai', 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Sejuani', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Sylas', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Vel\'Koz', 'Vi', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao', 'Yasuo', 'Yorick', 'Yummi', 'Zac', 'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra'];



function play(connection,msg){
  var server = servers[msg.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  server.queue.shift();
  server.dispatcher.on("end", function(){
    if (server.queue[0]) play(connection,msg);
    else connection.disconnect();
  })
}

var servers = {};




client.on('ready', () => {
console.log('Gotowy!');
});

client.on("guildMemberAdd", function(member)  {
  console.log("Nowy user na "+member.guild.name);

  if(member.guild.name = "Owcza Zagroda")member.addRole(member.guild.roles.find("name", "Zwykłe żółte lunty"));

});

client.on('message', msg => {



if (!msg.content.startsWith(prefix)) return;

var args = msg.content.substring(prefix.length).split(" ");

switch (args[0].toLowerCase()){
  case "ping":
      msg.reply('pong');
      break;
  case "lolpick":
      msg.reply(lolchamp[Math.floor(Math.random()* lolchamp.length)]);
      break;
  case "play" || 'p' :
      if(!args[1]){
        msg.channel.sendMessage("Podasz link?");return;
      }
      if(!msg.member.voiceChannel){
        msg.channel.sendMessage('Dołącz do jakiegoś kanału');return;
      }
      if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        queue: []
      };
      var server = servers[msg.guild.id];
      server.queue.push(args[1]);
      if(!msg.guild.voiceConnection) msg.member.voiceChannel.join().then(function(connection){
        play(connection, msg);
      });
      break;
  case "skip":
      var server = servers[msg.guild.id];
      if(server.dispatcher) server.dispatcher.end();
      break;
  case "stop":
      var server = servers[msg.guild.id];
      if(msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
  case "meme":
      let mem = await msg.channel.sendMessage("Ładuję...")
      let {body} = await superagent
      .get("https://apis.duncte123.me/meme")
      if(!{body}) return MessageChannel.channel.sendMessage("Coś popsułem...")
      let memEmbed = new Discord.RichEmbed()
      .setColor(colours.orange)
      .setAuthor("Bot Tagorz", msg.guild.iconURL)
      .setImage(body.file)
      .setTimestamp()
      msg.channel.sendMessage({embed: memEmbed})
      break;
  default: msg.channel.sendMessage("Nani?");
}


console.log(msg.content);

});


client.login(process.env.BOT_TOKEN);
