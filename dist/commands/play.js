"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../index"));
var index_2 = require("../index");
var yts = require("youtube-search");
require("yt-player");
var playCommand = /** @class */ (function () {
    function playCommand() {
        this._command = "play";
        this.ytplayer = require("yt-player");
    }
    playCommand.prototype.help = function () {
        return "Odtwórz muzyke z linkiem youtube";
    };
    playCommand.prototype.itc = function (command) {
        return command === this._command;
    };
    playCommand.prototype.rc = function (args, msg, client) {
        return __awaiter(this, void 0, void 0, function () {
            function play(conn, msg) {
                var server = index_2.servers[parseInt(msg.guild.id)];
                //let embed = new Discord.RichEmbed()
                //.setColor([255,0,0])
                //.addField("Teraz leci:",server.queue[0]);
                //msg.channel.send(embed);
                //server.dispatcher = conn.playStream(ytdl(server.queue[0],{filter:"audioonly"}));
                player.load(server.queue[0]);
                player.play();
                server.queue.shift();
                player.on("ended", function () {
                    if (server.queue[0]) {
                        play(conn, msg);
                    }
                    else
                        conn.disconnect();
                });
            }
            var player, gildia, server, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        player = new this.ytplayer(process.env.YT_TOKEN);
                        if (!msg.member.voiceChannelID) {
                            index_1.default.napisz(msg, "Musisz dołączyć do czatu głowowego");
                            return [2 /*return*/];
                        }
                        if (!args[0]) {
                            index_1.default.napisz(msg, "Musisz podać link z youtube");
                            return [2 /*return*/];
                        }
                        gildia = parseInt(msg.guild.id);
                        if (!index_2.servers[gildia]) {
                            index_2.servers[gildia] = {
                                queue: []
                            };
                        }
                        server = index_2.servers[gildia];
                        if (!!args[0].startsWith("https://www.youtube.com/watch?v=")) return [3 /*break*/, 2];
                        msg.delete();
                        opts = {
                            maxResults: 1,
                            key: process.env.YT_TOKEN
                        };
                        return [4 /*yield*/, yts(args.join(" "), opts, function (err, results) {
                                if (err)
                                    return console.log("err z play");
                                if (results == undefined)
                                    return;
                                server.queue.push(results[0].id);
                                if (!msg.guild.voiceConnection) {
                                    msg.member.voiceChannel.join()
                                        .then(function (conn) {
                                        play(conn, msg);
                                    });
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        args[0].replace("https://www.youtube.com/watch?v=", "");
                        msg.delete();
                        server.queue.push(args[0]);
                        if (!msg.guild.voiceConnection) {
                            msg.member.voiceChannel.join()
                                .then(function (conn) {
                                play(conn, msg);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return playCommand;
}());
exports.default = playCommand;
