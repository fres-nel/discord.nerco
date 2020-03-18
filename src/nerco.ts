import { Client } from "discord.js";
import { Logger, LogType } from "./logger";
import { Talk } from "./talk";
import { Dice } from "./dice";

export class Nerco {
  client: Client;
  logger: Logger;
  talk: Talk;
  dice: Dice;

  constructor(client: Client) {
    this.client = client;
    this.logger = new Logger();
    this.talk = new Talk(this.client, this.logger);
    this.dice = new Dice(this.client, this.logger);
    this.init();
  }

  init(): void {
    this.logger.log(LogType.Server, "Server Initializing...");
    this.client.on("ready", () => {
      this.logger.log(LogType.Server, "Ready.");
    });
  }
}
