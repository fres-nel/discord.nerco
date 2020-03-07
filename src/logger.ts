import * as fs from "fs";

export class Logger {
  private date: DateManager;
  private readonly path: string;

  constructor() {
    this.date = new DateManager();
    this.path = "./log/" + this.date.getDateTimePath() + ".log";
    try {
      fs.statSync("./log/")
    } catch (error) {
      if(error.code === "ENOENT") {
        fs.mkdirSync("./log/");
      } else {
        throw error;
      }
    }
  }
  
  public log(type :LogType, msg: string): void {
    msg = this.date.getDateTime() + " [" + LogType[type] + "] " + msg;
    console.log(msg);
    this.write(msg);
  }

  public error(type :LogType, msg: string): void {
    msg = this.date.getDateTime() + " [" + LogType[type] + ":ERR] " + msg;
    console.log("\u001b[31m" + msg + "\u001b[0m");
    this.write(msg);
  }

  private write(data: string): void {
    fs.appendFileSync(this.path, data + "\n");
  }
}

export enum LogType {
  Server,
  Talk,
  Dice
}

export class DateManager {
  private dateClass: Date;
  private year: number;
  private month: number;
  private date: number;
  private hour: number;
  private minute: number;
  private second: number;

  constructor() {
    this.dateClass = new Date();
  }

  private now(): void {
    this.year = this.dateClass.getFullYear();
    this.month = this.dateClass.getMonth() + 1;
    this.date = this.dateClass.getDate();
    this.hour = this.dateClass.getHours();
    this.minute = this.dateClass.getMinutes();
    this.second = this.dateClass.getSeconds();
  }

  public getDateTime(): string {
    this.now();
    return this.year + "/" +
      (this.month < 10 ? "0" + this.month : "" + this.month) + "/" +
      (this.date < 10 ? "0" + this.date : "" + this.date) + " " +
      (this.hour < 10 ? "0" + this.hour : "" + this.hour) + ":" +
      (this.minute < 10 ? "0" + this.minute : "" + this.minute) + ":" +
      (this.second < 10 ? "0" + this.second : "" + this.second);
  }

  public getDateTimePath(): string {
    this.now();
    return this.year +
      (this.month < 10 ? "0" + this.month : "" + this.month) +
      (this.date < 10 ? "0" + this.date : "" + this.date) + "_" +
      (this.hour < 10 ? "0" + this.hour : "" + this.hour) +
      (this.minute < 10 ? "0" + this.minute : "" + this.minute) +
      (this.second < 10 ? "0" + this.second : "" + this.second);
  }
}