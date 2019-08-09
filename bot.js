const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ".";
const YTDL = require("ytdl-core");
const superagent= require("superagent");
const randomPuppy = require("random-puppy");
const league_api = require('league-api');

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
console.log('Gotowy na '+client.guilds.size+' serverach!');
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
      break;
  case ".stat":
      var league = new league_api(process.env.LOL_TOKEN);
      league.getRecentGames('na', '5908', function(data) {
        console.log(data);
    });
    break;
  default: msg.channel.sendMessage("Nani?");
}

console.log(msg.content);

});
client.on("message", async msg =>     {
  if(msg.content === ".meme"){
    let reddit = [
      "meme",
      "animemes",
      "MemesOfAnime",
      "animememes",
      "AnimeFunny",
      "dankmemes",
      "dankmeme",
      "wholesomememes",
      "MemeEconomy",
      "techsupportanimals",
      "meirl",
      "me_irl",
      "2meirl4meirl",
      "AdviceAnimals"
  ]
  let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
  msg.channel.startTyping();
  randomPuppy(subreddit).then(async url => {
    await msg.channel.send({
        files: [{
            attachment: url,
            name: 'meme.png'
        }]
    }).then(() => msg.channel.stopTyping());
}).catch(err => console.error(err));
}});

client.login(process.env.BOT_TOKEN);
