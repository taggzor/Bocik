import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class kickCommand implements IBotCommand{
    
    private readonly _command = "kick";

    help(): string {
        return "Wyrzuć z serwera";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        let mU = msg.mentions.users.first();
        let reason = args.slice(1).join(" ") || "(brak powodu)";
        let klog = `${msg.author.username} wyrzucił za ${reason}`;
        msg.delete();
        if(!msg.member.hasPermission("ADMINISTRATOR")){
            msg.channel.send(`Niezła próba ${msg.author.username}, ale nie masz uprawnień :P`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000);
            });
            return;
        }
        if(!mU){
            msg.channel.send(`Sorry ${msg.author.username}. Nie moge znaleść użytkownika o tej nazwie`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000);
            });
            return;
        }
        
        
        msg.guild.member(mU).kick(klog)
            .catch(console.error)
    }


}