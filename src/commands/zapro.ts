import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class zaproCommand implements IBotCommand{
    
    private readonly _command = "zapro";

    help(): string {
        return "Wygeneruj zaproszenie";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        
        console.log(msg.guild.channels.find("name","Rodzinka"));
        
    
    }


}