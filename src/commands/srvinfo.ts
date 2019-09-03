import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class srvinfoCommand implements IBotCommand{
    
    private readonly _command = "srvinfo";

    help(): string {
        return "Informacje o serwerze";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        msg.delete();
        let embed = new Discord.RichEmbed()
            .setColor('AQUA')
            .setTitle("Informacje o serwerze")
            .setFooter("Serwer stworzony przez "+ msg.guild.owner.displayName)
            .setThumbnail(msg.guild.displayAvatarURL)
            .setDescription("Nazwa serwera: "+msg.guild.name)
            .addField("Liczba użytkowników: ",`${msg.guild.memberCount}`);
            
        msg.channel.send(embed)
            .catch(console.error);
        //console.log(msg);

    }


}
