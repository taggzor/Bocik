import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {servers} from "../index";
export default class skipCommand implements IBotCommand{
    
    private readonly _command = "skip";

    help(): string {
        return "Następna muzyka w bocie";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        var server = servers[parseInt(msg.guild.id)];
      if(server.dispatcher) server.dispatcher.end();
        msg.delete();
    }


}