import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class pingCommand implements IBotCommand{
    
    private readonly _command = "ping";

    help(): string {
        return "Sprawdź połączenie";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        msg.channel.send(`Pong!(${client.ping}ms)`);
    }


}