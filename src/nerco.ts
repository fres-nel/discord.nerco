import * as Discord from "discord.js";
import {Logger, LogType} from "./logger";

export class Nerco {
  client: Discord.Client;
  logger: Logger;

  constructor(client: Discord.Client) {
    this.client = client;
    this.logger = new Logger();
    this.init();
  }

  init(): void {
    this.logger.log(LogType.Server, "Server Initializing...");
    this.client.on("ready", () => {
      this.logger.log(LogType.Server, "Ready.")
    });
  }
}