import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { APIApplicationCommand, Collection } from "discord.js";
import { CommandFile } from "../types";

// For deploy-commands
export const isArrayOfComands = <K, V>(
  comands: Collection<K, V> | APIApplicationCommand[]
): comands is APIApplicationCommand[] => {
  return Array.isArray(comands);
};

export const isCollemtionsOfComands = <K, V>(
  comands: Collection<K, V> | APIApplicationCommand[]
): comands is Collection<K, V> => {
  return comands instanceof Collection;
};

export const getAllComands = async (asArray = false) => {
  const commands = new Collection<unknown, CommandFile>();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const commandPromise = await import(filePath);
    const command: CommandFile = commandPromise.default;

    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  if (asArray) {
    const array = Array.from(commands.values());
    return array.map((command) => command.data);
  }

  return commands;
};
