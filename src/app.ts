import * as Discord from "discord.js";
import * as Nerco from "./nerco";

class Main {
  client: Discord.Client;
  token: string;
  nerco: Nerco.Nerco;

  constructor() {
    this.client = new Discord.Client();
    this.token = process.env.NELCO_TOKEN;
    this.nerco = new Nerco.Nerco(this.client);
  }

  start(): void {
    this.client.login(this.token);
  }
}

const main = new Main();
main.start();
