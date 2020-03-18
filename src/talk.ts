import { Client, Message, PartialMessage } from "discord.js";
import { Logger, LogType } from "./logger";
import * as fs from "fs";
import axios from "axios";

export class Talk {
  private client: Client;
  private channels: string[];
  private logger: Logger;
  private readonly key: string;

  constructor(client: Client, logger: Logger) {
    this.client = client;
    this.logger = logger;
    this.key = fs.readFileSync(".a3rtkey", "utf-8");
    this.channels = new Array(0);
    client.on("message", message => {
      if (message.author.bot) {
        return;
      } else if (message.content === "!nerco talk start") {
        this.activate(message);
      } else if (message.content === "!nerco talk end") {
        this.deactivate(message);
      } else {
        this.talk(message);
      }
    });
  }

  private activate(message: Message | PartialMessage): void {
    const id = message.channel.id;
    if (this.channels.indexOf(id) === -1) {
      this.channels.push(id);
      message.reply("\nおしゃべりしよ！");
      this.logger.log(LogType.Talk, "Activated in " + id);
    } else {
      message.reply("\nもうお話してるよ～");
      this.logger.log(LogType.Talk, "Already activated in " + id);
    }
  }

  private deactivate(message: Message | PartialMessage): void {
    const id = message.channel.id;
    if (this.channels.indexOf(id) !== -1) {
      this.channels.splice(this.channels.indexOf(id), 1);
      message.reply("\nばいばーい");
      this.logger.log(LogType.Talk, "Deactivated in " + id);
    } else {
      message.reply("\nここではお話してないよ。");
      this.logger.log(LogType.Talk, "Already inactive in " + id);
    }
  }

  private async talk(message: Message | PartialMessage) {
    const id = message.channel.id;
    let result = "...";
    if (this.channels.indexOf(id) === -1) return;

    const sentence = message.content;
    const url = "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk";
    const params = new URLSearchParams();
    params.append("apikey", this.key);
    params.append("query", sentence);
    await axios
      .post(url, params)
      .then(res => {
        if (res.data.status === 0) {
          result = res.data.results[0].reply;
        }
      })
      .catch(error => {
        console.error(error);
      });
    await message.channel.send(result);
    this.logger.log(LogType.Talk, sentence + " => " + result);
  }
}
