import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class purgeCommand implements IBotCommand{
    
    private readonly _command = "purge";

    help(): string {
        return "Usun podaną liczbę wiadomości";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        msg.delete();
        if(!msg.member.hasPermission("ADMINISTRATOR")|| (msg.author.username!="Taggzor")){
            msg.channel.send(`${msg.author.username}, nie masz uprawnień :P`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000);
            });
            return;
        }
        if(!args[0]){
            msg.channel.send(`${msg.author.username}, nie podałeś liczby wiadomości do usunięcia`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000);
            });
            return;
        }
        let nm = Number(args[0]);
        if(isNaN(nm)){
            msg.channel.send(`${msg.author.username}, to nie liczba`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000);
            });
        }
        nm = Math.round(nm+1);
        msg.channel.bulkDelete(nm)
            .catch(console.error);
            
    }


}