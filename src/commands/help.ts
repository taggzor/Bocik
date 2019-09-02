import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class helpCommand implements IBotCommand{
    
    private readonly _command = "help";

    help(): string {
        return "Sprawdź połączenie";
    }    

    itc(command: string): boolean {
        return command === this._command;
    }

    async rc(args: string[], msg: Discord.Message, client: Discord.Client): Promise<void> {
        let embed = new Discord.RichEmbed()
        .setColor("LUMINOUS_VIVID_PINK")
        .setDescription("Pomoc do bota Tagorz")
        .addField(".ping","Sprawdza połączenie bota")
        .addField(".srvinfo","Informacje o serwerze")
        .addField(".purge [LICZBA]","Czyści podaną ilość wiadomości")
        .addField(".play [LINK] | [FRAZA DO WYSZUKANIA]","Odtwarza audio z youtube (można użyć .p)")
        .addField(".skip","Pomija bierzące audio")
        .addField(".stop","Wyłącza audio")
        .addField(".kick [@user] [POWÓD(domyślnie brak)]","(Admin) Wyrzuca użytkownika z serwera")
        .addField(".ban [@user] [POWÓD(domyślnie brak)]","(Admin) Banuje użytkownika z serwera")
        

        .setThumbnail(client.user.displayAvatarURL)
        .setFooter("Bot stworzony przez Taggzor#3700");
        msg.delete();
        msg.channel.send(embed);
    }


}