import { APIApplicationCommand } from "discord.js";

export interface CommandFile {
  data: APIApplicationCommand,
  execute: () => void,
}
