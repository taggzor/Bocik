import * as Discord from "discord.js";

export interface IBotCommand{
    help(): string;
    itc(command: string): boolean;
    rc(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void>;
}