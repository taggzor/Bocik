import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class stopCommand implements IBotCommand{
    
    private readonly _command = "stop";

    help(): string {
        return "Wyłącza muzyka w bocie";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        
      if(msg.guild.voiceConnection) msg.guild.voiceConnection.disconnect();
        msg.delete();
    }


}