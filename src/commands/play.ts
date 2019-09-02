
import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import tagg from "../index";
import {servers} from "../index";
import ytdl = require('ytdl-core');
import yts = require('youtube-search');
//import yt = require("yt-search");

export default class playCommand implements IBotCommand{
    
    private readonly _command = "play";
    

    help(): string {
        return "Odtwórz muzyke z linkiem youtube";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        
        if(!msg.member.voiceChannelID){
            tagg.napisz(msg,"Musisz dołączyć do czatu głowowego");
            return;
        }
        if(!args[0]){
            tagg.napisz(msg,"Musisz podać link z youtube");
            return;
        }


        var gildia = parseInt(msg.guild.id);
        if(!servers[gildia]){
            servers[gildia] = {
                queue: [],
                words: []
            };
        }
        var server = servers[gildia];
        if(!args[0].startsWith("https://www.youtube.com/watch?v=")){
            msg.delete();
            var opts: yts.YouTubeSearchOptions = {
                maxResults: 1,
                key: process.env.YT_TOKEN
              };
            await yts(args.join(" "), opts, (err, results:yts.YouTubeSearchResults[]|undefined) => {
                if(err) return console.log("err z play");
                if(results==undefined)return;
                
                server.queue.push(results[0].link);
                if(!msg.guild.voiceConnection){
                msg.member.voiceChannel.join()
                .then(function(conn){
                    play(conn,msg);
                    })
                }
            });
            
            

            
            
            

            return;
        }
        
        msg.delete();
        server.queue.push(args[0]);





        if(!msg.guild.voiceConnection){
            msg.member.voiceChannel.join()
            .then(function(conn){
                play(conn,msg);
            })
        }

        

    function play(conn:any,msg:Discord.Message){
        var server = servers[parseInt(msg.guild.id)];
        //let embed = new Discord.RichEmbed()
        //.setColor([255,0,0])
        //.addField("Teraz leci:",server.queue[0]);
        //msg.channel.send(embed);
        server.dispatcher = conn.playStream(ytdl(server.queue[0],{filter:"audioonly"}));
        server.queue.shift();
        
        
        
        server.dispatcher.on("end", function(){
            if(server.queue[0]) {
                play(conn,msg);
            }
            else conn.disconnect();
        });
    }

    }
    
    
}