import * as Discord from "discord.js";
import {Logger, LogType} from "./logger";
import {Talk} from "./talk";

export class Nerco {
  client: Discord.Client;
  logger: Logger;
  talk: Talk;

  constructor(client: Discord.Client) {
    this.client = client;
    this.logger = new Logger();
    this.talk = new Talk(this.client, this.logger);
    this.init();
  }

  init(): void {
    this.logger.log(LogType.Server, "Server Initializing...");
    this.client.on("ready", () => {
      this.logger.log(LogType.Server, "Ready.")
    });
  }
}