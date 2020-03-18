import { Client, Message, PartialMessage } from "discord.js";
import { Logger, LogType } from "./logger";

export class Dice {
  client: Client;
  logger: Logger;

  constructor(client: Client, logger: Logger) {
    this.client = client;
    this.logger = logger;

    this.client.on("message", message => {
      if (message.author.bot) return;
      else if (message.content === "!d") this.d1(message);
      else if (message.content === "!dd") this.d2(message);
      else if (
        message.content.match(/^!nerco dice [1-9]+[0-9]*d[1-9]+[0-9]*$/)
      ) {
        this.prodice(message);
      }
    });
  }

  private async d1(message: Message | PartialMessage) {
    const rand = Math.floor(Math.random() * 6 + 1);
    await message.reply(" は 1d6を振って **" + rand + "** を出した。");
    this.logger.log(LogType.Dice, message.author.username + " 1d6 : " + rand);
  }

  private async d2(message: Message | PartialMessage) {
    const rand = Math.floor(Math.random() * 6 + Math.random() * 6 + 2);
    await message.reply(" は 2d6を振って **" + rand + "** を出した。");
    this.logger.log(LogType.Dice, message.author.username + " 2d6 : " + rand);
  }

  private async prodice(message: Message | PartialMessage) {
    const line = message.content.split(" ")[2].split("d");
    let before = parseInt(line[0]);
    let after = parseInt(line[1]);
    if (before > 999) before = 999;
    if (after > 999) after = 999;
    let sum = 0.0;
    let i: number;
    for (i = 0; i < before; i++) {
      sum += Math.random() * after + 1;
    }
    sum = Math.floor(sum);
    await message.reply(
      " は " + before + "d" + after + "を振って **" + sum + "** を出した。"
    );
    this.logger.log(
      LogType.Dice,
      message.author.username + " " + before + "d" + after + " : " + sum
    );
  }
}
