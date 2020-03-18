import * as Discord from "discord.js";
import * as fs from "fs";
import * as Nerco from "./nerco";

class Main {
  client: Discord.Client;
  token: string;
  nerco: Nerco.Nerco;

  constructor() {
    this.client = new Discord.Client();
    this.token = fs.readFileSync(".token", "utf-8");
    this.nerco = new Nerco.Nerco(this.client);
  }

  start(): void {
    this.client.login(this.token);
  }
}

const main = new Main();
main.start();
