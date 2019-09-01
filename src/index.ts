import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";
const prefix = ConfigFile.config.prefix;
const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

var servers:any[]= [];
export {servers};



client.on("ready", () =>{
    console.log('Gotowy na '+client.guilds.size+' serverach!');
    client.user.setActivity("kodowanie Taggzora", {type: "WATCHING"});
})



client.on("message", msg =>{
    
    
    
    

    
      
    



    if(msg.author.bot)return;
    if(!msg.content.startsWith(prefix))return;
    var dsfa = msg.content.substring(prefix.length).split(" ");
    console.log(`${msg.author.username} użył komendy |${dsfa[0]}| na serwerze ${msg.guild.name}!`);
    //console.log(msg);


    






    if(msg.channel.type == "dm")return;


    
   
    







    handleCommand(msg);
    
})

async function handleCommand(msg: Discord.Message){
    let command = msg.content.split(" ")[0].replace(prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);
    for(const commandClass of commands){

        try{
            if(!commandClass.itc(command)){
                continue;
            }
            await commandClass.rc(args, msg, client);
        }
        catch(e){
            console.log(e);
        }
    }
    
}

function loadCommands(commandsPath: string){
    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0 ){return;}



    for(const commandName of ConfigFile.config.commands as string[]){
        const commandsClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandsClass() as IBotCommand;
        commands.push(command);
    }
}

export default class tagg {

    public static napisz(msg:Discord.Message,tekst:string){
        msg.delete();
        msg.channel.startTyping();
        msg.channel.send(tekst)
        .then(msg =>{
            (msg as Discord.Message).delete(5000);
        });
        msg.channel.stopTyping();
    }



}


    



client.login(ConfigFile.config.token);