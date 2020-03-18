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
      else if (message.content === "!d") this.showRollSum(message, 1, 6);
      else if (message.content === "!dd") this.showRollSum(message, 2, 6);
      else if (message.content.match(/^!nerco dice [1-9][0-9]*d[1-9][0-9]*$/)) {
        const line = message.content.split(" ")[2].split("d");
        const before = parseInt(line[0]);
        const after = parseInt(line[1]);
        this.showRollSum(message, before, after);
      }
    });
  }

  private showRollSum(
    message: Message | PartialMessage,
    numDice: number,
    numFace: number
  ): void {
    if (numDice > 999) numDice = 999;
    if (numFace > 999) numFace = 999;
    const sum = this.rollDice(numDice, numFace);
    message
      .reply(
        " は " + numDice + "d" + numFace + "を振って **" + sum + "** を出した。"
      )
      .then(() => {
        this.logger.log(
          LogType.Dice,
          message.author.username + " " + numDice + "d" + numFace + " : " + sum
        );
      });
  }

  private rollDice(numDice: number, numFace: number): number {
    let sum = 0;
    for (let i = 0; i < numDice; i++) {
      sum += Math.trunc(Math.random() * numFace) + 1;
    }
    return sum;
  }
}
